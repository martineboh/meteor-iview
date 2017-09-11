import NotFound from '../../client/pages/NotFound.vue';
import Login from '../../client/pages/Login.vue';
import Index from '../../client/pages/Index.vue';
import Home from '../../client/pages/Home.vue';

import Post from '../../client/pages/Post.vue';
import PostNew from '../../client/pages/PostNew.vue';
import PostEdit from '../../client/pages/PostEdit.vue';

const routes = [
    // Not Found
    {
        path: '*',
        component: NotFound,
        meta: {
            pageTitle: 'Not Found',
        },
    },
    // Login
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            layout: 'login',
            notRequiresAuth: true,
            pageTitle: 'Login',
        },
    },
    // Main
    {
        path: '/',
        component: Index,
        meta: {
            pageTitle: 'Home',
            breadcrumb: {
                title: 'Home',
                icon: 'home'
            }
        },
        children: [
            // Home
            {
                path: '',
                name: 'home',
                component: Home,
                meta: {
                    pageTitle: 'Home',
                    // ignore breadcrumb
                },
            },
            // Post
            {
                path: 'post',
                name: 'post',
                component: Post,
                meta: {
                    pageTitle: 'Post',
                    breadcrumb: {
                        title: 'Post',
                        // icon: 'social-facebook'
                    }
                },
                children: [
                    {
                        path: 'new',
                        name: 'postNew',
                        component: PostNew,
                        meta: {
                            routerView: true,
                            pageTitle: 'New Post',
                            linkActiveClass: 'post',
                            breadcrumb: {
                                title: 'New',
                                // icon: 'plus-round'
                            }
                        },
                    },
                    {
                        path: ':_id/edit',
                        name: 'postEdit',
                        component: PostEdit,
                        meta: {
                            routerView: true,
                            pageTitle: 'Edit Post',
                            linkActiveClass: 'post',
                            breadcrumb: {
                                title: 'Edit',
                                // icon: 'edit',
                                params: ['_id'],
                                // query: ['show', 'color'],
                            }
                        },
                    },
                ]
            },
        ]
    },
];

export default routes;
