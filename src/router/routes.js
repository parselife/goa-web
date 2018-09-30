const routes = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    redirect: '/main',
    children: [
      {
        path: '/main',
        component: () => import('pages/MainPage.vue'),
        meta: {
          title: '我的工时'
        }
      },
      {
        path: '/setting',
        component: () => import('pages/SettingPage.vue'),
        meta: {
          title: '应用设置'
        }
      },
      {
        path: '/doc',
        component: () => import('pages/MyDocPage.vue'),
        meta: {
          title: '文档编辑'
        }
      },
      {
        path: '/admin',
        component: () => import('pages/admin/Index.vue'),
        redirect: '/admin/users',
        children: [
          {path: 'users', component: () => import('pages/admin/Users.vue')},
          {path: 'joblogs', component: () => import('pages/admin/JobLogs.vue')},
          {path: 'organs', component: () => import('pages/admin/Organs.vue')},
          {path: 'pros', component: () => import('pages/admin/Pros.vue')},
          {path: 'types', component: () => import('pages/admin/Types.vue')}
        ],
        meta: {
          title: '系统管理',
          needAdmin: true
        }
      }
    ]
  }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '/403',
    component: () => import('pages/Error403.vue')
  })
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
