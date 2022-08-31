<template>
   <div class="card-container">
      <div class="card-title-wrap">
         <div class="card-title">
            <input type="text" class="card-title-name" placeholder="Nhập tên thẻ"
                   v-model="card.title" @blur="handleUpdateCard()">
         </div>
         <div class="card-utilities">
            <el-tooltip class="item" effect="dark" content="Đánh dấu hoàn thành" placement="bottom"
                        v-if="card.status !== 3">
               <i class="el-icon-check card-attach-item" @click="handleComplete()"
                  v-if="card.status !== 3"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Đính kèm" placement="bottom">
               <i class="el-icon-paperclip card-attach-item"  @click="showUpload()"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Việc cần làm" placement="bottom">
               <el-popover
                   placement="bottom"
                   title="Thêm việc cần làm"
                   width="200"
                   trigger="click"
                   v-model="visibleCheckList">
                  <i class="el-icon-star-off card-attach-item" slot="reference"></i>
                  <div class="box-scp">
                     <input type="text" placeholder="Nhập tên công việc" v-focus v-model="newCheckList">
                     <span></span>
                  </div>
                  <el-button type="primary" plain size="mini" class="scp-001" @click="handleCreateCheckList()">Thêm
                  </el-button>
               </el-popover>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Xóa thẻ" placement="bottom">
               <i class="el-icon-delete card-attach-item" @click="handleDeleteCard()"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Đóng" placement="bottom">
               <i class="el-icon-close card-attach-item" @click="closeCard()"></i>
            </el-tooltip>
         </div>
      </div>
      <div class="card-content">
         <div class="content">
            <div class="left-box">
               <i class="el-icon-date"></i>
               <label>Thời hạn</label>
            </div>
            <div class="right-box">
               <i class="el-icon-date" @click="showDatePicker()"></i>
               <el-date-picker class="deadline-item" ref="openDatePicker" size="mini" type="date" align="right"
                               v-model="deadline" @change="changeDeadline()"
                               @blur="deadline = ''">
               </el-date-picker>
               <span class="time-span" v-if="deadlineDisplay.length > 0">
                  {{ deadlineDisplay }}
                  <i class="el-icon-close" @click="changeDeadline(false)"></i>
                  <b :class="{
                     bg_success: calculateDeadline() === 'Đã hoàn thành',
                     bg_danger: calculateDeadline() === 'Quá hạn',
                     bg_primary: calculateDeadline() === 'Gần hết hạn',
                     display_none: calculateDeadline() === '',
                  }">
                     {{ calculateDeadline() }}
                  </b>
               </span>
               <span class="time-span" v-else>Đang cập nhật</span>
            </div>
         </div>
         <div class="content">
            <div class="left-box">
               <i class="el-icon-collection-tag"></i>
               <label>Nhãn</label>
            </div>
            <div class="right-box">
               <div class="pill-wrap">
                  <div class="pill" v-for="item in card.labels" :key="item.id" :style="{background: item.color}">
                     {{ item.name }}
                  </div>
                  <el-popover placement="bottom" width="320" trigger="click" @hide="resetCPNTag()">
                     <i slot="reference" class="el-icon-edit"></i>
                     <Tag @changeColor="handleRefreshTag()" :resetTag="resetTag"/>
                  </el-popover>
               </div>
            </div>
         </div>
         <div class="content content-other">
            <div class="left-box">
               <i class="el-icon-sunny"></i>
               <label>Mô tả</label>
            </div>
            <div class="right-box">
               <el-input
                   type="textarea"
                   @blur="handleUpdateCard()"
                   :autosize="{ minRows: 5}"
                   placeholder="Nhập mô tả"
                   v-model="card.description">
               </el-input>
            </div>
         </div>
         <div class="todo-wrap">
            <div class="todo-box" v-for="(element, index) in card.check_lists" :key="element.id">
               <div class="todo-parent">
                  <div class="todo-parent-title">
                     <i class="el-icon-star-off ico-scp">
                        <input type="text" v-model="element.title" @blur="handleUpdateCheckList(index)">
                        <span></span>
                     </i>
                     <div class="todo-parent-action" @click="handleDeleteCheckList(element.title, element.id)">Xóa</div>
                  </div>
                  <el-progress :percentage="handleCalculatePercent(element)" color="#409eff"
                               v-if="element.check_list_childs.length > 0"></el-progress>
               </div>
               <div class="todo-children" v-for="item in element.check_list_childs" :key="item.id">
                  <el-checkbox @change="changeStatusCheckListChild(item.id, $event)" :checked="item.status === 1">
                     <el-input placeholder="Please input" v-model="item.title" size="mini"
                               @blur="handleUpdateCheckListChild(item.title, item.id)"></el-input>
                  </el-checkbox>
                  <div class="edit-children">
                     <i class="el-icon-close" @click="handleDeleteCheckListChild(item.title, item.id)"></i>
                  </div>
               </div>
               <div class="list-btn-new-children">
                  <div class="new-children">
                     <div class="inp_new_children">
                        <el-button type="primary" icon="el-icon-plus" plain size="mini" class="btn-oop oop-1"
                                   v-if="element.show" @click="toggleNewChildren(index, true)">
                           Thêm
                        </el-button>
                        <el-button type="primary" icon="el-icon-plus" plain size="mini" class="btn-oop oop-1"
                                   v-else @click="handleCreateCheckListChild(element.id)">
                           Thêm
                        </el-button>
                        <el-input placeholder="Nhập tên công việc con" size="mini" v-focus
                                  v-model="newCheckListChild" v-if="!element.show"></el-input>
                     </div>
                     <i class="el-icon-close" v-if="!element.show" @click="toggleNewChildren(index, false)"></i>
                  </div>
               </div>
            </div>
            <input type="file" class="attach-file" ref="upload" @change="upload">
            <el-button size="small" type="primary" @click="showUpload()">Đính kèm</el-button>

            <CoolLightBox
                :items="items"
                :index="index"
                @close="index = null">
            </CoolLightBox>

            <div class="images-wrapper">
               <div class="preview-file" v-for="(file, fileIndex) in items" :key="fileIndex">
                  <div class="document-file">
                     <div class="download-file">
                        <div v-if="handleCheckFile(file.thumb)"
                             class="image"
                             @click="index = fileIndex"
                             :style="{ backgroundImage: 'url(' + file.thumb + ')' }">
                        </div>
                        <div class="ico-file" v-else>
                           <i class="el-icon-document"></i>
                        </div>
                     </div>
                     <div class="info-file">
                        <div class="file-name">
                           {{file.name}}
                        </div>
                        <div class="file-content">
                           <div class="time-upload">
                              {{formatDate(file.created_at)}}
                           </div>
                           <div class="file-action">
                              <a :href="file.src" target="_blank" download="myimage">Tải xuống</a>
                              <span>-</span>
                              <el-popover
                                  placement="bottom"
                                  title="Sửa tệp"
                                  width="300"
                                  trigger="click"
                                  v-model="file.toggle">
                                 <div slot="reference">Sửa</div>
                                 <el-input placeholder="" v-model="file.name"></el-input>
                                 <el-button type="primary" size="small" class="gcc"
                                            @click="handleRenameFile(file.name, file.id, fileIndex)">
                                    Thay đổi
                                 </el-button>
                              </el-popover>
                              <span>-</span>
                              <div @click="handleDeleteFile(file.id)">Xóa</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import moment from 'moment';
import _ from "lodash";
//import 'animate.css';
// eslint-disable-next-line no-unused-vars
import Tag from "./Tag";
import api from "../api";
//import CoolLightBox from 'vue-cool-lightbox'
//import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
   name: "TaskDetail",
   components: {
      Tag,
      // eslint-disable-next-line vue/no-unused-components
      //CoolLightBox,
   },
   computed: {
      ...mapState('workflow', [
         'isShow',
         'isDsNone',
         'cardId',
      ]),
   },
   mounted() {
      this.getData()
   },
   data() {
      return {
         visibleCheckList: false,
         deadline: '',
         deadlineDisplay: '',
         card: '',
         newCheckList: '',
         newCheckListChild: '',
         items: [
            {
               name: 'In nature, nothing is perfect and everything is perfect',
               thumb: 'https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-galaxy-dep-chat.jpg',
               src: 'https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-galaxy-dep-chat.jpg',
            },
         ],
         index: null,
         typeImage: [
             'jpg',
             'jpeg',
             'png',
             'PNG'
         ],
         resetTag: true
      }
   },
   methods: {
      ...mapMutations('workflow', [
         'updateIsShow',
         'updateIsDsNone',
         'updateCardId'
      ]),
      refreshData() {
         this.newCheckList = ''
         this.newCheckListChild = ''
      },
      getData() {
         if (this.cardId !== '') {
            api.getCardDetail(this.cardId).then((res) => {
               let data = res.data.data
               this.deadlineDisplay = ''
               if (data.deadline !== null) {
                  this.deadlineDisplay = moment(data.deadline).format('DD-MM-YYYY')
               }
               data.check_lists.forEach((el) => {
                  el.show = true
               })

               this.items = []
               data.files.forEach((el) => {
                  let data = {
                     id: el.id,
                     name: el.name,
                     toggle: false,
                     thumb: `http://vuecourse.zent.edu.vn/storage/${el.path}`,
                     src: `http://vuecourse.zent.edu.vn/storage/${el.path}`,
                     created_at: el.created_at
                  }
                  this.items.push(data)
               })
               this.card = data
            })
         }
      },
      handleRefreshTag(){
         setTimeout(() => {
            this.getData()
            this.$emit('change', 1)
         }, 500)
      },
      closeCard() {
         this.$emit('close', 1)
      },
      showDatePicker() {
         this.$refs.openDatePicker.showPicker()
      },
      changeDeadline(value = true) {
         let date = null
         this.deadlineDisplay = ''
         if (value) {
            date = moment(this.deadline).format('YYYY-MM-DD HH:mm:ss')
            this.deadlineDisplay = moment(this.deadline).format('DD-MM-YYYY')
         }
         api.changeDeadlineCard({
            deadline: date
         }, this.card.id).then(() => {
            this.getData()
            this.$emit('change', 1)
         })
      },
      handleUpdateCard() {
         if (this.card.title !== '') {
            let data = {
               title: this.card.title,
               description: this.card.description
            }

            api.updateCard(data, this.card.id).then(() => {
               this.$emit('change', 1)
            }).catch(() => {
               this.$message.error('Cập nhật thẻ thất bại');
            })
         } else {
            this.$message.error('Tên thẻ không được để trống')
         }
      },
      handleDeleteCard() {
         this.$confirm(`Bạn có chắc chắn muốn xóa thẻ "${this.card.title}" hay không?`, 'Xóa thẻ', {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Đóng',
            type: 'warning'
         }).then(() => {
            api.deleteCard(this.card.id).then(() => {
               this.closeCard()
               this.$emit('change', 1)
            }).catch(() => {
               this.$message.error('Xóa thẻ thất bại');
            })
         });
      },
      handleCreateCheckList() {
         if (this.newCheckList !== '') {
            api.createCheckList({
               title: this.newCheckList,
               card_id: this.card.id
            }).then(() => {
               this.visibleCheckList = false
               this.refreshData()
               this.getData()
            }).catch(() => {
               this.$message.error('Tạo công việc thất bại');
            })
         }
      },
      handleUpdateCheckList(index) {
         let data = this.card.check_lists[index]
         if (data.title !== '') {
            api.updateCheckList({
               title: data.title,
            }, data.id).then(() => {
               this.refreshData()
               this.getData()
            }).catch(() => {
               this.$message.error('Cập nhật công việc thất bại');
            })
         }
      },
      handleDeleteCheckList(name, id) {
         this.$confirm(`Bạn có chắc chắn muốn xóa "${name}" hay không?`, 'Xóa việc cần làm', {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Đóng',
            type: 'warning'
         }).then(() => {
            api.deleteCheckList(id).then(() => {
               this.refreshData()
               this.getData()
               this.$emit('change', 1)
            })
         }).catch(() => {
            this.$message.error('Xóa công việc thất bại');
         });
      },
      handleCreateCheckListChild(checkListId) {
         if (this.newCheckListChild !== '') {
            api.createCheckListChild({
               title: this.newCheckListChild,
               check_list_id: checkListId
            }).then(() => {
               this.refreshData()
               this.getData()
               this.$emit('change', 1)
            }).catch(() => {
               this.$message.error('Tạo công việc con thất bại');
            });
         }
      },
      handleUpdateCheckListChild(name, id) {
         if (name !== '') {
            api.updateCheckListChild({
               title: name
            }, id).then().catch(() => {
               this.$message.error('Cập nhật công việc con thất bại');
            })
         } else {
            this.getData()
            this.$message.error('Tiêu đề không được để trống');
         }
      },
      handleDeleteCheckListChild(name, id) {
         this.$confirm(`Bạn có chắc chắn muốn xóa công việc "${name}" hay không?`, 'Xóa công việc con', {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Đóng',
            type: 'warning'
         }).then(() => {
            api.deleteCheckListChild(id).then(() => {
               this.$message({
                  type: 'success',
                  message: 'Xóa công việc con thành công'
               });
               this.getData()
               this.$emit('change', 1)
            }).catch(() => {
               this.$message.error('Xóa công việc con thất bại');
            })
         });
      },
      changeStatusCheckListChild(id, event) {
         let status = (event) ? 1 : 0

         api.updateStatusCheckListChild({
            status: status
         }, id).then(() => {
            this.$message({
               message: 'Thay đổi trạng thái công việc con làm thành công.',
               type: 'success'
            });
            this.refreshData()
            this.getData()
            this.$emit('change', 1)
         })
      },
      handleCalculatePercent(value) {
         let percent = _.filter(value.check_list_childs, {'status': 1}).length / value.check_list_childs.length * 100
         return Math.round(percent)
      },
      toggleNewChildren(index, bool) {
         this.card.check_lists[index].show = !bool
         this.card.check_lists.push([])
         this.card.check_lists.pop()
      },
      showUpload() {
         this.$refs.upload.click()
      },
      upload(e) {
         let data = new FormData();
         data.append('file', e.target.files[0]);
         api.createFile(data, this.card.id).then(() => {
            this.getData()
            this.$emit('change', 1)
         }).catch(() => {
            this.$message.error('Định dạng tệp tin không được hỗ trợ');
         })
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
      handleRenameFile(name, id, index) {
         if (name !== '') {
            api.updateFile({
               name: name
            }, id).then(() => {
               this.items[index].toggle = false
            }).catch(() => {
               this.$message.error('Đổi tên thất bại');
               this.getData()
            })
         }
      },
      handleDeleteFile(id) {
         this.$confirm(`Bạn có chắc chắn muốn xóa hay không?`, 'Xóa tệp tin', {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Đóng',
            type: 'warning'
         }).then(() => {
            api.deleteFile(id).then(() => {
               this.$message({
                  type: 'success',
                  message: 'Xóa tệp tin thành công'
               });
               this.getData()
            }).catch(() => {
               this.$message.error('Xóa tệp tin thất bại');
            })
         });
      },
      formatDate(value) {
         return moment(value).format('HH:mm | DD-MM-YYYY')
      },
      resetCPNTag(){
         this.resetTag = !this.resetTag
      },
      handleComplete() {
         api.changeStatusCard({
            status: 3,
         }, this.cardId).then(() => {
            this.getData()
            this.$emit('change', 1)
         }).catch(() => {
            this.$message.error('Thất bại');
         })
      },
      calculateDeadline() {
         let text = ''
         if (this.card.status !== 3) {
            let now = new Date()
            let data = moment(this.card.deadline)
            if (moment(now).isSame(data, 'day')) {
               text = 'Gần hết hạn'
            } else if(data.diff(now, 'days') < 0) {
               text = 'Quá hạn'
            }
         } else {
            text = 'Đã hoàn thành'
         }
         return text
      }
   },
   watch: {
      show(value) {
         this.hide = !value
      },
      cardId() {
         this.getData()
         this.refreshData()
      },
   },
   directives: {
      focus: {
         inserted: function (el) {
            el.focus()
         }
      }
   },
}
</script>

<style scoped lang="scss">
@import "../assets/styles/TaskDetail";
</style>