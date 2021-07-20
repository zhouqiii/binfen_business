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
  //---团队管理---
  {
    path: '/group',
    component: Layout,
    redirect: '/group/groupList',
    name: 'group',
    meta: {
      title: '团队管理',
      icon: 'ums'
    },
    children: [
      {
        path: 'groupList',
        name: 'groupList',
        component: () => import('@/views/group/groupList/index'),
        meta: {
          title: '团队管理',
          icon: 'ums-admin'
        }
      }
    ]
  },
  //---产品管理---
  {
    path: '/product',
    component: Layout,
    redirect: '/product/productList',
    name: 'product',
    meta: {
      title: '产品管理',
      icon: 'product'
    },
    children: [
      {
        path: 'productList',
        name: 'productList',
        component: () => import('@/views/product/productList/index'),
        meta: {
          title: '产品管理',
          icon: 'product'
        }
      }
    ]
  },

  //---用户管理start---
  {
    path: '/account',
    component: Layout,
    redirect: '/account/accountList',
    name: 'account',
    meta: {
      title: '用户管理',
      icon: 'order'
    },
    children: [
      {
        path: 'accountPower',
        name: 'accountPower',
        component: () => import('@/views/account/accountPower/index'),
        meta: {
          title: '角色配置'
        }
      },
      {
        path: 'accountList',
        name: 'accountList',
        component: () => import('@/views/account/accountList/index'),
        meta: {
          title: '用户信息'
        }
      },
      {
        path: 'accountAdd',
        name: 'accountAdd',
        component: () =>
          import('@/views/account/accountList/components/accountAdd'),
        meta: {
          title: '新增账号'
        },
        hidden: true
      },
      {
        path: 'accountSet',
        name: 'accountSet',
        component: () =>
          import('@/views/account/accountList/components/accountSet'),
        meta: {
          title: '编辑账号'
        },
        hidden: true
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () =>
          import('@/views/account/accountPower/components/allocateMenu'),
        meta: {
          title: '分配菜单'
        },
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () =>
          import('@/views/account/accountPower/components/allocataResource'),
        meta: {
          title: '分配资源'
        },
        hidden: true
      }
    ]
  },
  //------用户管理end--
  //---项目管理start---
  {
    path: '/project',
    component: Layout,
    redirect: '/project/projectList',
    name: 'project',
    meta: {
      title: '项目管理',
      icon: 'product-list'
    },
    children: [
      {
        path: 'projectList',
        name: 'projectList',
        component: () => import('@/views/project/index'),
        meta: {
          title: '项目管理',
          icon: 'product-list'
        }
      },
      {
        path: 'projectAdd',
        name: 'projectAdd',
        component: () => import('@/views/project/projectAdd'),
        meta: {
          title: '新增项目'
        },
        hidden: true
      },
      {
        path: 'projectInfo',
        name: 'projectInfo',
        component: () => import('@/views/project/projectInfo'),
        meta: {
          title: '项目详情'
        },
        hidden: true
      },
      {
        path: 'projectEdit',
        name: 'projectEdit',
        component: () => import('@/views/project/projectEdit'),
        meta: {
          title: '项目修改'
        },
        hidden: true
      }
    ]
  },

  //---方案管理start---
  {
    path: '/programme',
    component: Layout,
    redirect: '/programme/programmeList',
    name: 'programme',
    meta: {
      title: '方案管理',
      icon: 'ums'
    },
    children: [
      {
        path: 'programmeList',
        name: 'programmeList',
        component: () => import('@/views/programme/programmeList/index'),
        meta: {
          title: '方案管理',
          icon: 'ums-admin'
        }
      },
      {
        path: 'programmeAdd',
        name: 'programmeAdd',
        component: () => import('@/views/programme/programmeAdd'),
        meta: {
          title: '新增方案'
        },
        hidden: true
      },
      {
        path: 'programmeEdit',
        name: 'programmeEdit',
        component: () => import('@/views/programme/programmeEdit'),
        meta: {
          title: '修改方案'
        },
        hidden: true
      },
      {
        path: 'programmeInfo',
        name: 'programmeInfo',
        component: () => import('@/views/programme/programmeInfo'),
        meta: {
          title: '方案详情'
        },
        hidden: true
      }
    ]
  },
  //------方案管理end---

  //---任务管理start---
  {
    path: '/task',
    component: Layout,
    redirect: '/task/taskList',
    name: 'task',
    meta: {
      title: '任务管理',
      icon: 'ums'
    },
    children: [
      {
        path: 'taskList',
        name: 'taskList',
        component: () => import('@/views/task/index'),
        meta: {
          title: '任务管理',
          icon: 'ums-admin'
        }
      },
      {
        path: 'taskMember',
        name: 'taskMember',
        component: () => import('@/views/task/taskMember'),
        meta: {
          title: '设置参与人员'
        },
        hidden: true
      },
      {
        path: 'taskAdd',
        name: 'taskAdd',
        component: () => import('@/views/task/taskAdd'),
        meta: {
          title: '新增任务'
        },
        hidden: true
      },
      {
        path: 'taskInfo',
        name: 'taskInfo',
        component: () => import('@/views/task/taskInfo'),
        meta: {
          title: '任务详情'
        },
        hidden: true
      },
      {
        path: 'taskEdit',
        name: 'taskEdit',
        component: () => import('@/views/task/taskEdit'),
        meta: {
          title: '任务修改'
        },
        hidden: true
      }
    ]
  },
  //------任务管理end---

  //---团队人员管理start---
  {
    path: '/team',
    component: Layout,
    redirect: '/team/teamList',
    name: 'team',
    meta: {
      title: '团队人员管理',
      icon: 'ums'
    },
    children: [
      {
        path: 'teamList',
        name: 'teamList',
        component: () => import('@/views/team/index'),
        meta: {
          title: '团队人员管理',
          icon: 'order'
        }
      },
      {
        path: 'teamAdd',
        name: 'teamAdd',
        component: () => import('@/views/team/teamAdd'),
        meta: {
          title: '新增/编辑团队人员'
        },
        hidden: true
      }
    ]
  },
  //团队人员管理end

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
      // {
      //   path: 'workDailyAdd',
      //   name: 'workDailyAdd',
      //   component: () => import('@/views/workDaily/workDailyAdd'),
      //   meta: {
      //     title: '新增日报'
      //   },
      //   hidden: true
      // },
      // {
      //   path: 'workDailyInfo',
      //   name: 'workDailyInfo',
      //   component: () => import('@/views/workDaily/workDailyInfo'),
      //   meta: {
      //     title: '查看日报详情'
      //   },
      //   hidden: true
      // }
    ]
  },
  //日报管理end

  //---延时工作管理start---
  {
    path: '/workLate',
    component: Layout,
    redirect: '/workLate/workLateList',
    name: 'workLate',
    meta: {
      title: '延时工作管理',
      icon: 'ums'
    },
    children: [
      {
        path: 'workLateList',
        name: 'workLateList',
        component: () => import('@/views/workLate/index'),
        meta: {
          title: '延时工作管理',
          icon: 'order'
        }
      },
      {
        path: 'workLateAdd',
        name: 'workLateAdd',
        component: () => import('@/views/workLate/workLateAdd'),
        meta: {
          title: '新增延时工作'
        },
        hidden: true
      },
      {
        path: 'workLateInfo',
        name: 'workLateInfo',
        component: () => import('@/views/workLate/workLateInfo'),
        meta: {
          title: '查看延时工作申请'
        },
        hidden: true
      }
    ]
  },
  //延时工作管理end

  //---休假管理start---
  {
    path: '/workLeave',
    component: Layout,
    redirect: '/workLeave/workLeaveList',
    name: 'workLeave',
    meta: {
      title: '休假管理',
      icon: 'ums'
    },
    children: [
      {
        path: 'workLeaveList',
        name: 'workLeaveList',
        component: () => import('@/views/workLeave/index'),
        meta: {
          title: '休假管理',
          icon: 'order'
        }
      },
      // {
      //   path: 'workLeaveAdd',
      //   name: 'workLeaveAdd',
      //   component: () => import('@/views/workLeave/workLeaveAdd'),
      //   meta: {
      //     title: '新增休假'
      //   },
      //   hidden: true
      // },
      {
        path: 'workLeaveInfo',
        name: 'workLeaveInfo',
        component: () => import('@/views/workLeave/workLeaveInfo'),
        meta: {
          title: '查看休假申请'
        },
        hidden: true
      }
    ]
  },
  //休假管理end

  //---月结管理start---
  {
    path: '/monthlySettlement',
    component: Layout,
    redirect: '/monthlySettlement/monthlySettlementList',
    name: 'monthlySettlement',
    meta: {
      title: '月结管理',
      icon: 'ums'
    },
    children: [
      {
        path: 'monthlySettlementList',
        name: 'monthlySettlementList',
        component: () => import('@/views/monthlySettlement/index'),
        meta: {
          title: '月结管理',
          icon: 'order'
        }
      },
      {
        path: 'monthlySettlementInfo',
        name: 'monthlySettlementInfo',
        component: () => import('@/views/monthlySettlement/monthlySettlementInfo'),
        meta: {
          title: '查看详情'
        },
        hidden: true
      }
    ]
  },
  //月结管理end

  //---报表管理start---
  {
    path: '/report',
    component: Layout,
    redirect: '/report/reportList',
    name: 'report',
    meta: {
      title: '报表管理',
      icon: 'ums'
    },
    children: [
      {
        path: 'reportList',
        name: 'reportList',
        component: () => import('@/views/report/project'),
        meta: {
          title: '项目报表',
          icon: 'ums'
        }
      },
      {
        path: 'staffList',
        name: 'staffList',
        component: () => import('@/views/report/staff'),
        meta: {
          title: '人员投入报表',
          icon: 'ums'
        }
      }
    ]
  },
  //报表管理end

  //---订单管理start---
  {
    path: '/order',
    component: Layout,
    redirect: '/order/orderList',
    name: 'order',
    meta: {
      title: '订单管理',
      icon: 'ums'
    },
    children: [
      {
        path: 'orderList',
        name: 'orderList',
        component: () => import('@/views/order/index'),
        meta: {
          title: '订单管理',
          icon: 'order'
        }
      },
      {
        path: 'orderAdd',
        name: 'orderAdd',
        component: () => import('@/views/order/orderAdd'),
        meta: {
          title: '新增订单'
        },
        hidden: true
      },
      {
        path: 'orderInfo',
        name: 'orderInfo',
        component: () => import('@/views/order/orderInfo'),
        meta: {
          title: '订单详情'
        },
        hidden: true
      },
      {
        path: 'orderEdit',
        name: 'orderEdit',
        component: () => import('@/views/order/orderEdit'),
        meta: {
          title: '修改订单'
        },
        hidden: true
      }
    ]
  },
  //订单管理end
  //---动态报表start---
  // {
  //   path: '/check',
  //   component: Layout,
  //   redirect: '/check/checkList',
  //   name: 'check',
  //   meta: {
  //     title: '数据管理',
  //     icon: 'ums'
  //   },
  //   children: [
  //     {
  //       path: 'checkList',
  //       name: 'checkList',
  //       component: () => import('@/views/check/index'),
  //       meta: {
  //         title: '数据管理',
  //       }
  //     },
  //   ]
  // },
  //---动态报表end---

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
///
//用户名密码:
//admin
//admin123
///
