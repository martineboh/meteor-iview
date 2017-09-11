import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import _ from 'lodash';

//---------- Router ----------
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//---------- iView UI ----------
import iView from 'iview';
// import iView from 'iview/dist/iview.min.js';
import 'iview/dist/styles/iview.css';
import locale from 'iview/dist/locale/en-US';
Vue.use(iView, { locale });

//---------- Tracker ----------
import VueMeteorTracker from 'vue-meteor-tracker';
Vue.use(VueMeteorTracker);

//---------- Meta ----------
import Meta from 'vue-meta';
Vue.use(Meta);

//---------- Click Outside ----------
import vOutsideEvents from 'vue-outside-events';
Vue.use(vOutsideEvents);

//---------- Vuex Store ----------
// import Vuex from 'vuex';
// Vue.use(Vuex);
// import coreStore from '../../ui/vuex/store';
// const store = new Vuex.Store({
//     modules: {
//         core: coreStore,
//     }
// });

// Spinner
import Spinner from 'vue-simple-spinner';
Vue.use(Spinner);

// Animation
import 'vue2-animate/dist/vue2-animate.min.css';

// import AnimatedVue from 'animated-vue';
// import 'animate.css/animate.min.css';
// Vue.use(AnimatedVue);

//----------- App layout component -------------
import AppLayout from '../../client/layouts/AppLayout.vue';

// Create router
import routes from './routes';

const router = new VueRouter({
    mode: 'history',
    routes: routes,
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         // savedPosition is only available for popstate navigations.
    //         return savedPosition;
    //     } else {
    //         const position = {};
    //         // new navigation.
    //         // scroll to anchor by returning the selector
    //         if (to.hash) {
    //             position.selector = to.hash;
    //         }
    //         // check if any matched route config has meta that requires scrolling to top
    //         if (to.matched.some(m => m.meta.scrollToTop)) {
    //             // cords will be used if no selector is provided,
    //             // or if the selector didn't match any element.
    //             position.x = 0;
    //             position.y = 0;
    //         }
    //         // if the returned position is falsy or an empty object,
    //         // will retain current scroll position.
    //         return position;
    //     }
    // },
});

/******************
 * Meteor Startup
 *****************/
Meteor.startup(() => {
    // Before each
    router.beforeEach((to, from, next) => {
        // router.beforeResolve((to, from, next) => {
        iView.LoadingBar.start();

        if (!to.meta.notRequiresAuth) {
            // Check user
            if (!Meteor.loggingIn() && !Meteor.userId()) {
                next({ path: '/login' });
            } else {
                next();

                // Check role
                // if (to.meta.role) {
                //     userIsInRole.callPromise({ role: to.meta.role }).then((result) => {
                //         next();
                //     }).catch((err) => {
                //         if (err.reason) {
                //             Notification({
                //                 type: 'warning',
                //                 message: err.reason
                //             });

                //             // NProgress.done();
                //         }
                //     });
                // } else {
                //     next();
                // }
            }
        } else {
            next();
        }
    });

    // After each
    router.afterEach((to, from) => {
        iView.LoadingBar.finish();
    });

    // Start the vue app
    new Vue({
        router,
        // store,
        ...AppLayout,
    }).$mount('app');
});
