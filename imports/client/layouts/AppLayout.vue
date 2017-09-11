<template>
    <div>
        <div v-if="$route.meta.layout == 'login'">
            <login-layout></login-layout>
        </div>
        <div v-else>
            <main-layout></main-layout>
        </div>
    </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import MainLayout from './MainLayout.vue';
import LoginLayout from './LoginLayout.vue';

export default {
    metaInfo: {
        title: 'Rabbit Tech',
    },
    components: {
        MainLayout,
        LoginLayout,
    },
    meteor: {
    },
    mounted() {
    },
    computed: {
    }
}
</script>

<style lang="scss">
.line-spacing {
    margin-bottom: 15px;
}

.word-spacing {
    margin-bottom: 10px;
}
</style>
