<template >
    <div class="container">
        <div class="todoWrap">
            <div class="appTitle">Todo App</div>
            <input
                type="text"
                placeholder="Nhập công việc và bấm enter để thêm"
                v-model="title"
                @keyup="handleKeyup"
            >
            <div class="listWrap" v-if="tasks.length > 0">
                <TodoItem
                    v-for="(task, index) in tasks"
                    :task="task"
                    :key="task.id"
                    @changeStatus="(value) => handleChangeStatus(value, index)"
                    @onDeleteItem="handleDeleteItem(index)"
                />
            </div>
            <div v-else class="emptyWrap">
                Chưa có task nào được thêm
            </div>
        </div>
    </div>
</template>
<script>
    import TodoItem from './Ex01TodoItem.vue'
    export default {
    name: 'Ex01Todo',
    components: {
      TodoItem
    },
    data () {
      return {
        tasks: [],
        title: ''
      }
    },
    methods: {
      handleKeyup (e) {
        if (e.code === 'Enter') {
          this.tasks.push({
            id: new Date().getTime(),
            title: this.title,
            isComplete: false
          })
          this.title = ''
        }
      },
      handleChangeStatus (value, index) {
        this.tasks[index].isComplete = value
      },
      handleDeleteItem (index) {
        this.tasks.splice(index, 1)
      }
    },
  }
</script>
<style lang="scss">
    $colorStroke: #d8e0ea;
    $colorMain: #0080dd;
    $colorDefault: #253036;
    $colorGreen: #39cd74;
    $colorRed: #f54b5e;
    $colorTableHeader: #f2f6fe;
    $colorWhite: #fff;
    $colorOrange: #f2994a;

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        background: $colorMain;
        height: 100vh;

        .todoWrap {
            width: 500px;
            height: 500px;
            background: $colorWhite;
            border-radius: 10px;
            padding: 24px;

            .appTitle {
                font-size: 24px;
                font-weight: bold;
                color: $colorGreen;
                text-align: center;
                margin-bottom: 20px;
            }

            input {
                width: 100%;
                height: 40px;
                border: 1px solid $colorStroke;
                border-radius: 5px;
                outline: unset;
                font-size: 14px;
                margin-bottom: 24px;

                &:hover,
                &:active,
                &:focus {
                    border: 1px solid $colorMain;
                }
            }

            .listWrap {
                height: 350px;
                overflow-y: scroll;
                overflow-x: hidden;
            }

            .emptyWrap {
                height: 350px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: $colorRed;
            }
        }
    }
</style>