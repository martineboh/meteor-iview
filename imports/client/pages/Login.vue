<template>
    <div>
        <Form :model="form" ref="form" :label-width="150">
            <Input v-model="form.email" :autofocus="true" ref="email" @on-focus="selectAll" placeholder="Username / Email">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
            <div class="line-space"></div>

            <Input type="password" v-model="form.password" ref="password" @focus="selectAll" placeholder="*******" @keyup.enter.native="submitForm">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
            <div class="line-space"></div>

            <Button type="primary" @click="submitForm" long>
                <i class="fa fa-sign-in"></i> Login
            </Button>
            <div class="line-space"></div>
        </Form>
    </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

export default {
    data() {
        return {
            loading: false,
            form: {
                email: '',
                password: '',
            },
        };
    },
    methods: {
        selectAll(event) {
            this.$nextTick(() => {
                event.target.select();
            });
        },
        submitForm() {
            if (!(this.form.email && this.form.password)) {
                this.$Message.warning('Please input username/email and password!');
            } else {
                Meteor.loginWithPassword(this.form.email, this.form.password, (err) => {
                    if (err) {
                        this.$Message.error('Username/Email or password is invalid!');
                        this.$refs.email.$el.querySelector('input').focus();
                    } else {
                        this.$Message.success('You were logged!');
                        this.$router.push({ name: 'home' });
                    }
                });
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.line-space {
    margin-bottom: 20px;
}
</style>
