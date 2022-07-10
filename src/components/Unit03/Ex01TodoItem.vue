<template >
    <div class="wrap">
        <div class="iputwrap">
            <input type="checkbox" v-model="checked">
            <span class="title" :class="task.isComplete ? 'complete' : ''">{{task.title}}</span>
        </div>
        <button
            v-if="task.isComplete"
            class="deleteButton"
            @click="onDelete"
        >
            Xóa
        </button>
    </div>
</template>
<script>
    export default {
    name: 'TodoItem',
    props: ['task'],
    data () {
      return {
        checked: false,
      }
    },
    methods: {
      onDelete () {
        this.$emit('onDeleteItem')
      }
    },
    watch: {
      checked (value) {
        this.$emit('changeStatus', value)
      }
    }
  }
</script>
<style lang="scss">
    $colorStroke: #d8e0ea;
    $colorDefault: #253036;
    $colorRed: #f54b5e;
    $colorWhite: #fff;

    .wrap {
        
        display: flex;
        // align-items: left;
        justify-content: space-between;
        height: 80px;
        padding: 12px;
        border-bottom: 1px solid $colorStroke;

        .inputwrap{
            float: left;
           
            .title {
                float: left;
                margin-left: 12px;
                color: $colorDefault;

                &.complete {
                    text-decoration: line-through;
                }
            }
        }

        .deleteButton {
            background: $colorRed;
            border: unset;
            font-size: 14px;
            font-weight: bold;
            color: $colorWhite;
            width: 60px;
            height: 40px;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 8px;
        }
    }
</style>