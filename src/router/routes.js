const routes = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      {path: '/main', component: () => import('pages/MainPage.vue')},
      {path: '/setting', component: () => import('pages/SettingPage.vue')}
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
