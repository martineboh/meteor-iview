<template>
    <div>
        <Form ref="form" :model="form" :rules="rules" :label-width="100">
            <FormItem label="Title" prop="title">
                <Input v-model="form.title" placeholder="Title"></Input>
            </FormItem>
            <FormItem label="Body" prop="body">
                <Input type="textarea" v-model="form.body" placeholder="Body"></Input>
            </FormItem>
            <FormItem label="Private" prop="private">
                <i-switch v-model="form.private"></i-switch>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('form')">Save</Button>
                <Button type="ghost" @click="handleReset('form')">Reset</Button>
                <Button type="ghost" @click="goBack">Cancel</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';

export default {
    data() {
        return {
            form: {
                title: '',
                body: '',
                private: true,
            },
            rules: {
                title: [
                    { required: true, message: 'Title is required', trigger: 'blur' }
                ],
                body: [
                    { required: true, message: 'Body is required', trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Loading.start();

                    Meteor.call('insertPost', this.form, (error, result) => {
                        if (error) {
                            console.log(error.resean);
                        } else {
                            this.$Loading.finish();
                            this.$Message.success('Success!');
                        }
                    });
                } else {
                    this.$Message.error('Please check again!');
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        goBack() {
            this.$router.go(-1);
        },
    }
};
</script>

<style scoped>

</style>