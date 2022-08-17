import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 在这里配置所有路由路径
// 不同的路由将通过component引入不同的页面
// 配置路由
const routes = [
    {
        path:'/',
        name: 'Main',
        component: () => import('../views/Main'),
        children:[
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: () => import('../views/Home')
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: () => import('../views/User')
            // },
            // {
            //     path: '/mall',
            //     name: 'mall',
            //     component: () => import('../views/mall')
            // },
            // {
            //     path: '/pageone',
            //     name: 'pageone',
            //     component: () => import('../views/other/pageOne')
            // },
            // {
            //     path: '/pagetwo',
            //     name: 'pagetwo',
            //     component: () => import('../views/other/pageTwo')
            // },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/Login.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router