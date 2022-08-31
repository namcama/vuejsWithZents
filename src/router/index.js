import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../layouts/Admin'
import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: 'user',
                name: 'User',
                component: () => import('../views/Manage/User'),
            },
            {
                path: 'workflow',
                name: 'Workflow',
                component: () => import('../views/Manage/Workflow'),
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../layouts/Login')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !store.state.auth.isAuthenticated) {
        next({ name: 'Login'})
    } else if(to.name === 'Login' && store.state.auth.isAuthenticated) {
        next({ name: 'Workflow' })
    } else if (to.path === '/' && store.state.auth.isAuthenticated) {
        next({ name: 'Workflow' })
    } else if (to.name === null) {
        next({ name: 'Workflow' })
    } else {
        next()
    }
})

export default router
