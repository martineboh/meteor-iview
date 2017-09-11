<template>
    <div class="layout">
        <div class="login-header">
            <!-- <img src="/img/vue.png" style="width: 100px; height: 100px;"> -->
            <span style="font-size: 46px; font-weight: bold;">Rabbit Tech</span>
        </div>

        <div class="login-content">
            <Menu mode="horizontal" theme="dark" active-name="1" class="header">
                <span class="title">Login Form</span>
            </Menu>

            <div class="login-router-view">
                <!-- route outlet -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';

export default {
    metaInfo: {
        title: 'Login',
    },
    mounted() {
        // document.body.style.backgroundColor = "#f5f7f9";
    },
    computed: {
    },
    destroyed() {
        // document.body.style.backgroundColor = null;
    }
}
</script>

<style lang="scss" scoped>
.layout {
    border: 0px solid #d7dde4;
    margin: 70px auto;
}

.login-header {
    text-align: center;
    width: 100%;
    .log {
        width: 50px;
        height: 50px;
    }
}

.login-content {
    margin: 20px auto;
    width: 350px;
    text-align: center;
    border: 1px solid #324157;
    background-color: white;

    .header {
        border-radius: 0px;
        padding: 0 20px 0 20px;
        margin-bottom: 20px;
    }

    .title {
        font-size: 24px;
        color: white;
        margin-right: 20px;
        line-height: 54px;
        float: left;
    }
}

.login-router-view {
    padding: 0px 20px 0px 20px;
}
</style>