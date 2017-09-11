<template>
    <div>
        <h2>Modal</h2>
        <Button type='primary' @click='modal = true'>Modal</Button>
        <Modal v-model='modal' title='Modal Title' @on-ok='ok' @on-cancel='cancel'>
            <p>HI</p>
            <p>Welcome</p>
            <p>Hello</p>
        </Modal>

        <!-- iView Spin -->
        <h2>Spin</h2>
        <div class="demo-spin-article" ref="test">
            <h3>登金陵凤凰台</h3>
            <address>李白</address>
            <article>
                <p>凤凰台上凤凰游，凤去台空江自流。</p>
                <p>吴宫花草埋幽径，晋代衣冠成古丘。</p>
                <p>三山半落青天外，二水中分白鹭洲。</p>
                <p>总为浮云能蔽日，长安不见使人愁。</p>
                <p>总为浮云能蔽日，长安不见使人愁。</p>
                <p>总为浮云能蔽日，长安不见使人愁。</p>
                <p>总为浮云能蔽日，长安不见使人愁。</p>
                <p>总为浮云能蔽日，长安不见使人愁。</p>
                <p>总为浮云能蔽日，长安不见使人愁。</p>
                <p>总为浮云能蔽日，长安不见使人愁。</p>
                <p>总为浮云能蔽日，长安不见使人愁。</p>
            </article>
            <Spin size="large" fix v-show="spinShow"></Spin>
        </div>
        <br> 切换显示状态：
        <i-switch @on-change="spinShow = !spinShow"></i-switch>

        <h2>Loadingbar...</h2>
        <Button @click='lodingbar'>Lodingbar</Button>
    </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';

export default {
    components: {
        Spinner
    },
    data() {
        return {
            modal: false,
            spinShow: true
        };
    },
    mounted() {
        this.$nextTick(() => {
            console.log(this.$ref.test.$el.clientHeight);
        })
    },
    methods: {
        lodingbar() {
            this.$Loading.start();
            setTimeout(() => {
                this.$Loading.finish();
            }, 500);
        },
        ok() {
            this.$Message.info('OK is clicked!');
        },
        cancel() {
            this.$Message.info('Cancel is clicked!');
        },
    }
};
</script>

<style scoped>
.demo-spin-article {
    /* width: 400px; */
    height: 200px;
    padding: 10px;
    text-align: center;
    position: relative;
    border: 1px solid #eee;
}
</style>