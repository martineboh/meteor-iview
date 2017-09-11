<template>
    <div>
        <!-- route outlet -->
        <router-view v-if="routerView"></router-view>

        <div v-else>
            <div class="line-spacing">
                <Button type="primary" icon="plus-round" @click="addNew">New</Button>
            </div>

            <Table ref='tableData' :columns="tableCols" :data="tableData"></Table>
        </div>
    </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import Posts from '../../api/posts/posts';

export default {
    data() {
        return {
            tableCols: [
                {
                    title: 'Title',
                    key: 'title',
                },
                {
                    title: 'Body',
                    key: 'body'
                },
                {
                    title: 'Private',
                    key: 'private'
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.update(params.row);
                                    }
                                }
                            }, 'Edit'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row);
                                    }
                                }
                            }, 'Delete')
                        ]);
                    }
                }
            ],
            tableData: []
        };
    },
    meteor: {
        $subscribe: {
            posts: []
        },
        tableData() {
            return Posts.find().fetch();
        }
    },
    computed: {
        routerView() {
            return this.$route.meta.routerView;
        }
    },
    methods: {
        addNew() {
            this.$router.push({ name: 'postNew' });
        },
        update(row) {
            this.$router.push({ name: 'postEdit', params: { _id: row._id } });
        },
        remove(row) {
            this.$Modal.confirm({
                title: 'Delete',
                content: '<p>Do you want to delete this?</p>',
                loading: true,
                onOk: () => {
                    Meteor.call('removePost', { _id: row._id }, (error, result) => {
                        if (error) {
                            console.log(error.resean);
                        } else {
                            this.$Modal.remove();
                            this.$Notice.success({ title: 'Success', desc: '' });
                        }
                    });
                },
                onCancel: () => {
                    this.$Notice.warning({ title: 'Delete Canceled!', desc: '' });
                }
            });
        },
        goBack() {
            this.$router.go(-1);
        },
    }
};
</script>

<style lang="scss" scoped>
@import '~imports/client/styles/main.scss';
</style>
