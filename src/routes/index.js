import { createRouter, createWebHistory } from 'vue-router'
import root from '../views/index.vue'

import defaults from '../layouts/defaultLayout.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'root',
            component: root,
            meta: {
                layout: defaults
            },
        },
        {
            path: '/detail-surah/:id',
            name: 'detail-surah',
            component: () =>  import('../views/surah/detail.vue'),
            props: true,
            meta: {
                layout: defaults
            }
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     (to.matched[0].props.default && !to.params) ? next(false) : next(true)
// })

export default router