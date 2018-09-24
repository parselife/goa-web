const routes = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      {path: '/main', component: () => import('pages/MainPage.vue')},
      {path: '/setting', component: () => import('pages/SettingPage.vue')},
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
        meta:{
          needAdmin: true
        }
      }
    ]
  }
  
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
