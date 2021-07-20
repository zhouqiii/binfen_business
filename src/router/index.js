import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout';

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/changePwd',
    name: 'changePwd',
    component: () => import('@/views/layout/components/changePwd'),
    meta: {
      title: '更改密码'
    }
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () =>
        import('@/views/home/index'),
      meta: {
        title: '项目管理',
        icon: 'home',
      },
    }],
  }
];

/**
 * （重要）children:只有一个时，一级菜单不显示
 * @type {({redirect: string, path: string, component: {components: {Navbar: {components: {Hamburger: *, changePw: *, Breadcrumb: *}, computed: {[p: string]: () => any}, data(): {formLabelWidth: string, form: {}, dialogFormVisible: boolean}, methods: {changePwd(): void, toggleSideBar(): void, LogOut(): void}}, AppMain: {computed: {}, name: string}, Sidebar: {components: {SidebarItem: {data(): {}, methods: {hasOneShowingChildren(*): boolean}, name: string, props: {routes: {type: ArrayConstructor}, isNest: {default: boolean, type: BooleanConstructor}}}, ScrollBar: *}, computed: {[p: string]: () => any, routes(): default.computed.routers, isCollapse(): *}}}, mixins: [{watch: {$route(*): void}, methods: {resizeHandler(): void, isMobile(): boolean}, beforeMount(): void, mounted(): void}], computed: {sidebar(): *, classObj(): {hideSidebar, mobile: boolean, withoutAnimation: default.computed.sidebar.withoutAnimation}, device(): *}, name: string}, children: ({path: string, component: (function(): *), meta: {title: string}, name: string}|{path: string, component: (function(): *), meta: {title: string}, name: string}|{path: string, component: (function(): *), hidden: boolean, meta: {title: string}, name: string}|{path: string, component: (function(): *), hidden: boolean, meta: {title: string}, name: string}|{path: string, component: (function(): *), hidden: boolean, meta: {title: string}, name: string})[], meta: {icon: string, title: string}, name: string}|{redirect: string, path: string, component: {components: {Navbar: {components: {Hamburger: *, changePw: *, Breadcrumb: *}, computed: {[p: string]: () => any}, data(): {formLabelWidth: string, form: {}, dialogFormVisible: boolean}, methods: {changePwd(): void, toggleSideBar(): void, LogOut(): void}}, AppMain: {computed: {}, name: string}, Sidebar: {components: {SidebarItem: {data(): {}, methods: {hasOneShowingChildren(*): boolean}, name: string, props: {routes: {type: ArrayConstructor}, isNest: {default: boolean, type: BooleanConstructor}}}, ScrollBar: *}, computed: {[p: string]: () => any, routes(): default.computed.routers, isCollapse(): *}}}, mixins: [{watch: {$route(*): void}, methods: {resizeHandler(): void, isMobile(): boolean}, beforeMount(): void, mounted(): void}], computed: {sidebar(): *, classObj(): {hideSidebar, mobile: boolean, withoutAnimation: default.computed.sidebar.withoutAnimation}, device(): *}, name: string}, children: ({path: string, component: (function(): *), meta: {icon: string, title: string}, name: string}|{path: string, component: (function(): *), meta: {icon: string, title: string}, name: string}|{path: string, component: (function(): *), hidden: boolean, meta: {title: string}, name: string}|{path: string, component: (function(): *), hidden: boolean, meta: {title: string}, name: string}|{path: string, component: (function(): *), meta: {icon: string, title: string}, name: string})[], meta: {icon: string, title: string}, name: string}|{redirect: string, path: string, hidden: boolean})[]}
 */
export const asyncRouterMap = [

  //---日报管理start---
  {
    path: '/workDaily',
    component: Layout,
    redirect: '/workDaily/workDailyList',
    name: 'workDaily',
    meta: {
      title: '日报管理',
      icon: 'ums'
    },
    children: [
      {
        path: 'workDailyList',
        name: 'workDailyList',
        component: () => import('@/views/workDaily/index'),
        meta: {
          title: '日报管理',
          icon: 'order'
        }
      },
    ]
  },
  //日报管理end



  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});
