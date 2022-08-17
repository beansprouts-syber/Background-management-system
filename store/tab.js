import Cookie from 'js-cookie'


export default {
    state:{
        isCollapse: false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if(val.name !== 'home') {
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                // 当前点击菜单不存在于列表中时，向其中添加
                if(result === -1) {
                    state.tabsList.push(val)
                }
            else{
                state.currentMenu = null
            }
            }
        },
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        // 将menu数据缓存到Cookie中
        setMenu(state, val) {
            state.menu = val
            // Cookie名称，存入数组（stringify序列化数组0）
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            // 如果cookie中没有menu数据，return
            if (!Cookie.get('menu')) {
                return
            }
            // 将cookie中数据转为对象
            const menu = JSON.parse(Cookie.get('menu'))
            // 拿到数据之后进行更新
            state.menu = menu
            // 动态添加路由
            const menuArray = []
            // 对menu数据进行遍历
            menu.forEach(item => {
                // 先判断是否有二级菜单
                // 有二级菜单
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    // 通过...扩展运算符将二维数组扁平化
                    menuArray.push(...item.children)
                }
                // 无二级菜单
                else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 路由的动态添加
            menuArray.forEach(item => {
                // 根据router文件可知,当前所有路由在layout main之下,因此在main中添加当前路由
                router.addRoute('Main', item)
            })
        }
    }
}