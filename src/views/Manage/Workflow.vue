<template>
   <div class="workflow-wrap">
      <draggable class="list-group" tag="ul" v-model="workflow" v-bind="dragOptions" :disabled="!enabled"
                 @start="drag = true" @end="drag = false" @change="changeIndexDirectory">
         <transition-group class="draggable-transition" type="transition" :name="!drag ? 'flip-list' : null">
            <div class="list-group-item" v-for="(work, workIndex) in workflow" :key="workIndex">
               <div class="section" :id="work.id">
                  <div class="section-box-header">
                     <div class="section-title" @click="showRename(workIndex)">
                        <span v-if="work.isRenameWork">{{ work.title }}</span>
                        <div class="box-scp" v-else>
                           <input type="text" class="css-rename" v-focus v-model="work.title"
                                  @keypress.enter="renameWork(work.id, work.title)"
                                  @blur="renameWork(work.id, work.title)">
                           <span></span>
                        </div>
                     </div>
                     <div class="section-action">
                        <div class="section-action-box" @click="showNewCard(workIndex)">
                           <i class="el-icon-plus section-action-icon"></i>
                        </div>
                        <div class="section-action-box" @click="handleDeleteList(work.id, work.title)">
                           <i class="el-icon-delete section-action-icon"></i>
                        </div>
                     </div>
                  </div>
                  <div class="section-box-content-wrap">
                     <div :class="{task_group_item: true, content_task: true, flag_new_card: true,
                                   animation_card_open: !work.isNewCard}" v-if="!work.isNewCard">
                        <div class="task-info other-new-card">
                           <div class="task-name">
                              <div class="box-scp">
                                 <input type="text" placeholder="Nhập tên thẻ" v-focus
                                        v-model="newCard" @keypress.enter="handleCreateCard(workIndex)"
                                        @blur="handleCreateCard(workIndex)">
                                 <span></span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <draggable class="task-group section-box-content" :list="work.cards" group="task"
                                :move="changeIndexCard">
                        <div class="task_group_item content_task" v-for="(card) in work.cards" :key="card.id"
                             :id="`toCard${card.id}`" @click="detailCard(card.id)">
                           <el-image :src="card.image" v-if="card.image"></el-image>
                           <div class="task-info">
                              <div class="task-name">
                                 <span v-if="card.status === 3" style="color: limegreen; font-weight: bold;">
                                    <i class="el-icon-success"></i>
                                    {{ card.title }}
                                 </span>
                                 <span v-else>{{ card.title }}</span>
                              </div>
                              <div class="tag-list" v-if="card.labels.length > 0">
                              <span v-for="(label) in card.labels" :key="label.id"
                                    :style="{background: label.color}" class="tag-item">
                                 {{ label.name }}
                              </span>
                              </div>
                              <div class="task-other-info">
                                 <div class="deadline" v-if="card.deadline && card.deadline.length > 0">
                                    <i class="el-icon-date date-picker deadline-picker"></i>
                                    <span class="deadline-info">{{ formatDate(card.deadline) }}</span>
                                 </div>
                                 <div class="todo-attach" v-if="card.files > 0 || card.list !== 0">
                                    <i class="el-icon-paperclip todo-attach-item" v-if="card.files > 0">
                                       <span class="todo-attach-item-info">{{ card.files }}</span>
                                    </i>
                                    <i class="el-icon-star-off todo-attach-item" v-if="card.list !== 0">
                                       <span class="todo-attach-item-info">{{ card.list }}</span>
                                    </i>
                                 </div>
                              </div>
                              <div style="clear: both;"></div>
                           </div>
                        </div>
                     </draggable>
                  </div>
               </div>
            </div>
         </transition-group>
      </draggable>

      <div class="other-new-work" id="todo">
         <div class="add-new-list" @click="showNewWork()" v-if="isNewWork">
            <i class="el-icon-plus add-card-icon"></i>
            Thêm danh sách
         </div>
         <div class="allb" v-else>
            <div class="box-scp">
               <input type="text" placeholder="Nhập tên danh sách" class="css-rename" v-focus v-model="newWork"
                      @keypress.enter="addNewWork()" @blur="resetNewWork()">
               <span></span>
            </div>
         </div>
      </div>
      <el-drawer
          size="35%"
          :withHeader="false"
          :visible.sync="drawer"
          direction="rtl">
         <TaskDetail @change="getAllData()" @close="drawer = false"/>
      </el-drawer>
   </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import draggable from "vuedraggable";
//import 'animate.css';
import TaskDetail from "../../components/TaskDetail";
import api from '../../api'
import moment from 'moment';
import _ from 'lodash';

export default {
   name: "WorkFlow",
   components: {
      draggable,
      TaskDetail
   },
   data() {
      return {
         drawer: false,
         enabled: true,
         newWork: '',
         isNewWork: true,
         newCard: '',
         workflow: [],
         drag: false,
         dialogTableVisible: false,
         typeImage: [
            'jpg',
            'jpeg',
            'png',
            'PNG'
         ],
         test: ''

      };
   },
   computed: {
      ...mapState('workflow', [
         'isShow',
         'isDsNone',
         'cardId'
      ]),
      dragOptions() {
         return {
            animation: 500,
            group: "description",
            disabled: false,
            ghostClass: "ghost"
         };
      }
   },
   methods: {
      ...mapMutations('workflow', [
         'updateIsShow',
         'updateIsDsNone',
         'updateCardId'
      ]),
      refreshData() {
         this.workflow.push([])
         this.workflow.pop()
      },
      getAllData() {
         api.getListDirectory().then(res => {
            this.workflow = res.data.data
            this.workflow.forEach((el) => {
               el.isRenameWork = true
               el.isNewCard = true

               el.cards.forEach((elm) => {
                  let total = 0
                  api.getCardDetail(elm.id).then((res) => {
                     let data = res.data.data
                     let child = 0
                     let childDone = 0
                     if (data.check_lists.length > 0) {
                        data.check_lists.forEach((elm) => {
                           if (elm.check_list_childs.length > 0) {
                              child += elm.check_list_childs.length
                              childDone += _.filter(elm.check_list_childs, {'status': 1}).length;
                              total = childDone + '/' + child
                           }
                        })
                     }
                     let fileNumber = 0
                     if (data.files.length > 0) {
                        fileNumber = data.files.length
                        for (let i = 0; i < fileNumber; i++) {
                           if (this.handleCheckFile(data.files[i].path)) {
                              elm.image = `http://vuecourse.zent.edu.vn/storage/${data.files[i].path}`
                              break
                           }
                        }
                     }
                     elm.files = fileNumber
                     elm.list = total
                  })
               })
            })
            setTimeout(() => {
               this.refreshData()
            }, 500)
         })
      },
      showRename(index) {
         this.workflow[index].isRenameWork = false
         this.refreshData()
      },
      showNewWork() {
         this.isNewWork = false
         this.workflow.forEach((el) => {
            el.isNewCard = true
         })
      },
      resetNewWork() {
         this.isNewWork = true
         this.newWork = ''
      },
      addNewWork() {
         let index = 1;
         (this.workflow.length > 0) ? index = this.workflow.length : ''
         api.createDirectory({
            title: this.newWork,
            index: index
         }).then(() => {
            this.getAllData()
            this.scrollEnd()
         }).catch(() => {
            this.$notify.error({
               title: 'Hệ thống',
               message: 'Thêm danh sách thất bại'
            });
         })
         this.resetNewWork()
      },
      showNewCard(value) {
         this.newCard = ''
         this.workflow.forEach((el, index) => {
            el.isNewCard = true
            if (index === value) {
               el.isNewCard = false
            }
         })
         this.refreshData()

         this.isNewWork = true
      },
      detailCard(value) {
         this.drawer = true
         this.updateCardId(JSON.parse(JSON.stringify(value)))
      },
      handleDeleteList(id, name) {
         this.$confirm(`Bạn có chắc chắn muốn xóa danh sách "${name}" hay không?`, 'Xóa danh sách', {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Đóng',
            type: 'warning'
         }).then(() => {
            api.deleteDirectory(id).then(() => {
               this.getAllData()
            }).catch(() => {
               this.$notify.error({
                  title: 'Hệ thống',
                  message: 'Xóa danh sách thất bại'
               });
            })

         });
      },
      log(evt) {
         window.console.log(evt);
      },
      scrollEnd(value = 'todo') {
         setTimeout(function () {
            document.getElementById(value).scrollIntoView()
         }, 100)
      },
      renameWork(id, title) {
         api.updateDirectory({
            title: title
         }, id).then(() => {
            this.resetRenameWork()
         }).catch(() => {
            this.getAllData()
            this.$notify.error({
               title: 'Hệ thống',
               message: 'Thay đổi thất bại'
            });
         })
      },
      resetRenameWork() {
         this.workflow.forEach((el) => {
            el.isRenameWork = true
         })
         this.refreshData()
      },
      changeIndexDirectory(evt) {
         api.changeIndexDirectory({
            index: evt.moved.newIndex
         }, evt.moved.element.id).then(() => {}).catch(() => {
            this.getAllData()
            this.$message.error('Thay đổi thất bại.');
         })
      },
      handleCreateCard(indexDirectory) {
         if (this.newCard !== '') {
            let directory = this.workflow[indexDirectory]
            let index = (directory.cards.length > 0) ? directory.cards.length : 0
            api.createCard({
               title: this.newCard,
               index: index,
               directory_id: directory.id
            }).then(() => {
               this.newCard = ''
               this.getAllData()
            })
         } else {
            this.workflow[indexDirectory].isNewCard = true
            this.refreshData()
         }
      },
      changeIndexCard(e) {
         let cardId = e.draggedContext.element.id
         let index = e.draggedContext.futureIndex
         let directoryId = e.to.parentElement.parentElement.getAttribute('id')
         api.changeIndexCardDirectory({
            index: index,
            directory_id: directoryId
         }, cardId)
      },
      formatDate(value) {
         return moment(value).format('DD-MM-YYYY')
      },
      handleCheckFile(name) {
         let bool = false
         let lastIndex = name.lastIndexOf('.')
         let type = name.substring(lastIndex + 1)
         this.typeImage.forEach((el) => {
            if (el === type) {
               bool = true
            }
         })

         return bool
      },
   },
   directives: {
      focus: {
         inserted: function (el) {
            el.focus()
         }
      }
   },
   mounted() {
      this.getAllData()
   },
   watch: {
      isShow(value) {
         this.updateIsDsNone(!value)
      }
   }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/Workflow";
</style>