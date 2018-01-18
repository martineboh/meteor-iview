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
        <div class="demo-spin-article">
            <article>
                <p>Hi Spinner!</p>
                <p>Hi Spinner!</p>
                <p>Hi Spinner!</p>
                <p>Hi Spinner!</p>
                <p>Hi Spinner!</p>
            </article>
            <Spin fix v-if="!spinShow"></Spin>
        </div>
        <br> Switch status:
        <i-switch @on-change="spinShow = !spinShow"></i-switch>

        <h2>Loadingbar...</h2>
        <Button @click='lodingbar'>Lodingbar</Button>
    </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';

export default {
    components: {
        Spinner,
    },
    data() {
        return {
            modal: false,
            spinShow: true,
            center: { lat: 10.0, lng: 10.0 },
            markers: [{
                position: { lat: 10.0, lng: 10.0 }
            }, {
                position: { lat: 11.0, lng: 11.0 }
            }]
        };
    },
    mounted() {
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
    /* text-align: center; */
    position: relative;
    /* border: 1px solid #eee; */
}
</style>