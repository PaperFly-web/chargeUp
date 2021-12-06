import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import AddData from '../components/addData.vue'
import Setting from '../components/setting.vue'
import Main from '../components/main.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
        title: 'login',
        type: 'login' // 不需要鉴权
    }
}, {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        title: '首页',
        type: 'main' // 是否需要判断是否登录,这里是需要判断
    },
    children: [{
        path: '/addData',
        components: { addData: AddData },
        meta: {
            title: '首页',
            type: 'main' // 是否需要判断是否登录,这里是需要判断
        },
    }, {
        path: '/',
        components: { main: Main },
        meta: {
            title: '首页',
            type: 'main' // 是否需要判断是否登录,这里是需要判断
        },
    }, {
        path: '/main',
        components: { main: Main },
        meta: {
            title: '首页',
            type: 'main' // 是否需要判断是否登录,这里是需要判断
        },
    }, {
        path: '/setting',
        components: { setting: Setting },
        meta: {
            title: '首页',
            type: 'main' // 是否需要判断是否登录,这里是需要判断
        },
    }]
}]

const router = new VueRouter({
        routes
    })
    // 修改页面路由重复报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    //获取要跳转页面的类型，来判断他是否要登录
    const type = to.meta.type
        // 判断该路由是否需要登录权限
    if (type === 'main') {
        var login = JSON.parse(localStorage.getItem("login"));
        if (!login) {
            next('/login')
        } else {
            if (login.expTime >= new Date().getTime()) {
                //还是登录状态，就延长登录凭证有效期
                var login = {
                    state: 1,
                    expTime: new Date().getTime() + 24 * 60 * 60 * 1000
                }
                localStorage.setItem("login", JSON.stringify(login))
                next()
            } else {
                next('/login')
            }
        }

    } else if (type === "login") {
        next() // 确保一定要有next()被调用
    } else {
        if (to.path == "/logout") {
            console.log(to.path)
                //清除登录状态
            localStorage.removeItem('login');
        }
        next("/login")
    }
})
export default router