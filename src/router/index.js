import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login'),
    meta: { title: '登录' }
  },
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
    meta: { title: '整体页面布局'},
    redirect: '/dashboard',
    children: [
      // 首页
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/index.vue'),
        meta: { title: '首页' }
      },
      // 项目开发
      {
        path: '/data',
        component: () => import(/* webpackChunkName: "data" */ '../views/data/index.vue'),
        meta: { id: '11', title: '项目开发' },
        redirect: '/data/launch',
        children:[
          // 项目开发
          {
            path: 'launch',
            name: 'Launch',
            component: () => import(/* webpackChunkName: "launch" */ '../views/data/launch'),
            meta: { title: '项目发起' }
          },
          {
            path: 'launchDetail',
            name: 'LaunchDetail',
            component: () => import(/* webpackChunkName: "launchDetail" */ '../views/data/launch/launchDetail'),
            meta: { title: '项目发起详情' }
          },

          {
            path: 'material',
            name: 'Material',
            component: () => import(/* webpackChunkName: "material" */ '../views/data/material'),
            meta: { title: '材料补充' }
          },
          {
            path: 'materialDetail',
            name: 'MaterialDetail',
            component: () => import(/* webpackChunkName: "materialDetail" */ '../views/data/material/materialDetail'),
            meta: { title: '材料补充详情' }
          },

          {
            path: 'added',
            name: 'Added',
            component: () => import(/* webpackChunkName: "added" */ '../views/data/added'),
            meta: { title: '立项补充' }
          },
          {
            path: 'addedDetail',
            name: 'AddedDetail',
            component: () => import(/* webpackChunkName: "addedDetail" */ '../views/data/added/addedDetail'),
            meta: { title: '立项补充详情' }
          },
          // 审批管理
          {
            path: 'first',
            name: 'First',
            component: () => import(/* webpackChunkName: "first" */ '../views/center/first'),
            meta: { title: '项目初审' }
          },
          {
            path: 'firstDetail',
            name: 'FirstDetail',
            component: () => import(/* webpackChunkName: "firstDetail" */ '../views/center/first/firstDetail'),
            meta: { title: '项目初审详情' }
          },

          {
            path: 'review',
            name: 'Review',
            component: () => import(/* webpackChunkName: "review" */ '../views/center/review'),
            meta: { title: '图纸复核' }
          },
          {
            path: 'reviewDetail',
            name: 'ReviewDetail',
            component: () => import(/* webpackChunkName: "reviewDetail" */ '../views/center/review/reviewDetail'),
            meta: { title: '图纸复核详情' }
          },
    
          {
            path: 'final',
            name: 'Final',
            component: () => import(/* webpackChunkName: "final" */ '../views/center/final'),
            meta: { title: '项目终审' }
          },
          {
            path: 'finalDetail',
            name: 'FinalDetail',
            component: () => import(/* webpackChunkName: "finalDetail" */ '../views/center/final/finalDetail'),
            meta: { title: '项目终审详情' }
          },

          {
            path: 'overview',
            name: 'Overview',
            component: () => import(/* webpackChunkName: "overview" */ '../views/center/overview'),
            meta: { title: '项目总览' }
          },
          {
            path: 'overviewDetail',
            name: 'OverviewDetail',
            component: () => import(/* webpackChunkName: "overviewDetail" */ '../views/center/overview/overviewDetail'),
            meta: { title: '项目总览详情' }
          },
          // 其他管理
          {
            path: 'share',
            name: 'Share',
            component: () => import(/* webpackChunkName: "share" */ '../views/center/share'),
            meta: { title: '项目分享' }
          },
          {
            path: 'shareDetail',
            name: 'ShareDetail',
            component: () => import(/* webpackChunkName: "shareDetail" */ '../views/center/share/shareDetail'),
            meta: { title: '项目分享详情' }
          },

          {
            path: 'statist',
            name: 'Statist',
            component: () => import(/* webpackChunkName: "statist" */ '../views/center/statist'),
            meta: { title: '项目统计' }
          },
          {
            path: 'statistDetail',
            name: 'StatistDetail',
            component: () => import(/* webpackChunkName: "statistDetail" */ '../views/center/statist/statistDetail'),
            meta: { title: '项目明细' }
          }
        ]
      },
      // epc管理
      {
        path: '/epc',
        component: () => import(/* webpackChunkName: "epc" */ '../views/epc/index'),
        meta: { title: 'EPC管理' },
        redirect: '/epc/kanban',
        children: [ // 系统设置
          {
            path: 'kanban',
            name: 'KanBan',
            component: () => import(/* webpackChunkName: "kanban" */ '../views/epc/kanban'),
            meta: { title: '项目看板'}
          },
          {
            path: 'all',
            name: 'All',
            component: () => import(/* webpackChunkName: "all" */ '../views/epc/all'),
            meta: { title: '全部项目'}
          },
          {
            path: 'register',
            name: 'Register',
            component: () => import(/* webpackChunkName: "register" */ '../views/epc/register'),
            meta: { title: '立项登记'}
          },
          {
            path: 'my',
            name: 'My',
            component: () => import(/* webpackChunkName: "my" */ '../views/epc/my'),
            meta: { title: '我的项目'}
          },
          {
            path: 'detail',
            name: 'Detail',
            component: () => import(/* webpackChunkName: "detail" */ '../views/epc/detail'),
            meta: { title: '我的项目'}
          },
          {
            path: 'team',
            name: 'Team',
            component: () => import(/* webpackChunkName: "team" */ '../views/epc/team'),
            meta: { title: '团队情况'}
          },
          {
            path: 'insurance',
            name: 'Insurance',
            component: () => import(/* webpackChunkName: "insurance" */ '../views/epc/insurance'),
            meta: { title: '保险数据'}
          },
        ]
      },
      // 系统设置
      {
        path: '/integrated',
        component: () => import(/* webpackChunkName: "integrated" */ '../views/integrated/index'),
        meta: { title: '系统设置' },
        redirect: '/integrated/user',
        children: [ // 系统设置
          {
            path: 'user',
            name: 'User',
            component: () => import(/* webpackChunkName: "user" */ '../views/integrated/user'),
            meta: { title: '个人中心'}
          },
          {
            path: 'role',
            name: 'Role',
            component: () => import(/* webpackChunkName: "role" */ '../views/integrated/role'),
            meta: { title: '角色管理' }
          },
          {
            path: 'roleDetail',
            name: 'RoleDetail',
            component: () => import(/* webpackChunkName: "roleDetail" */ '../views/integrated/role/roleDetail'),
            meta: { title: '编辑角色' }
          },
          
          {
            path: 'account',
            name: 'Account',
            component: () => import(/* webpackChunkName: "account" */ '../views/integrated/account'),
            meta: { title: '账号管理' }
          },
          {
            path: 'organization',
            name: 'Organization',
            component: () => import(/* webpackChunkName: "organization" */ '../views/integrated/organization'),
            meta: { title: '机构管理' }
          },
          {
            path: 'download',
            name: 'Download',
            component: () => import(/* webpackChunkName: "download" */ '../views/integrated/download'),
            meta: { title: '下载管理' }
          },
          {
            path: 'task',
            name: 'Task',
            component: () => import(/* webpackChunkName: "task" */ '../views/integrated/task'),
            meta: { title: '任务模板' }
          },
          {
            path: 'taskDetail',
            name: 'TaskDetail',
            component: () => import(/* webpackChunkName: "taskDetail" */ '../views/integrated/task/taskDetail'),
            meta: { title: '模板管理' }
          },
        ]
      }
    ]
  },

  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
    meta: { title: '404' }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach(( to, from, next ) => {
  if ( to.path === '/login' ) {
    next()
  } else {
    const token = sessionStorage.getItem( 'token' )
    if( !token ) {
      next( '/login' )
    } else {
      next()
    }
  }
})

// router.afterEach((to, from) => {
//   document.title = to.meta.title || 智慧能源管理平台
// })

export default router
