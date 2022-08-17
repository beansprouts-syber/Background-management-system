<template>
    <div class="tabs">
        <el-tag
        v-for="(tag, index) in tags"
        :key="tag.name"
        :closable="tag.name !== 'home'"
        :effect="$route.name === tag.name ? 'dark' : 'plain'"
        @click="changeMenu(tag)"
        @close="handleClose(tag, index)"
        size="small">
            {{ tag.label }}
        </el-tag>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    export default{
        name: 'CommonTag',
        data() {
            return {

            }
        },
        computed: {
            ...mapState({
                tags: state => state.tab.tabsList
            })
        },
        methods:{
            ...mapMutations({
                close: 'closeTag'
            }),
            changeMenu(item) {
                this.$router.push({name: item.name})
            },
            handleClose(tag, index) {
                const length = this.tags.length - 1
                this.close(tag)
                // 如果关闭的标签不是本页标签，则无需做焦点跳转处理
                if(tag.name !== this.$route.name) {
                    return
                }
                // 如果关闭标签是最右侧标签，关闭之后焦点向左跳转
                if(index === length) {
                    this.$router.push({
                        name: this.tags[index - 1].name
                    })
                }
                else{
                    this.$router.push({
                        name: this.tags[index].name
                    })
                }
            }
        }
    }
</script>
<style>
    .tabs {
        padding: 20px;
    }
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
</style>