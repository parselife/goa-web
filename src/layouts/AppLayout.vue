<template>
  <q-layout view="hHr LpR lFf">
    <!-- 头部 -->
    <q-layout-header class="no-shadow">
      <q-toolbar>
        <img src="statics/logo.png" style="width: 32px;">
        <q-toolbar-title class="col-auto q-mr-xl">
          众越科技
        </q-toolbar-title>
        <q-tabs class="q-ml-xl col">
          <q-route-tab
            v-for="m in routeMenu"
            :label="m.label"
            :to="m.path"
            exact
            slot="title"
          />
        </q-tabs>
        <q-btn-dropdown v-if="loginUser.hasOwnProperty('displayName')"
                        :label="profileTitle"
                        no-caps
                        no-wrap
                        no-ripple
                        flat>
          <q-list no-border link>
            <q-item style="font-size: .8rem" to="/setting">
              <q-item-main>
                应用设置
              </q-item-main>
            </q-item>
            <q-item style="font-size: .8rem">
              <q-item-main tag="a" class="logout-a" href="/logout">
                退出系统
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn flat
               dense
               :icon="$q.fullscreen.isActive?'fullscreen_exit':'fullscreen'"
               v-if="$q.fullscreen.isCapable"
               @click="$q.fullscreen.toggle()"/>
      </q-toolbar>
    </q-layout-header>

    <!--左侧功能栏-->
    <!-- <q-layout-drawer
      side="left"
      v-model="leftDrawer">
      <component :is="activeAsideCom"></component>
      <q-tabs class="fixed-bottom no-border"
              align="center" position="bottom"
              v-model="activeAsideCom">
        <q-route-tab
          slot="title"
          icon="card travel"
          to="/"
          replace
          name="Stat"/>

        <q-route-tab
          slot="title"
          icon="send"
          name="FilterCom"
          to="main"
          replace
        />
      </q-tabs>
    </q-layout-drawer> -->

    <!--中间页面-->
    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
  import {SessionStorage, openURL} from 'quasar'

  export default {
    data() {
      return {
        leftDrawer: false,
        routeMenu: [],
        isAdmin: false,
        loginUser: {}
      }
    },
    created() {
      this.detectUser()
      this.provideMenus()
    },
    watch: {
      'isAdmin': 'provideMenus'
    },
    computed: {
      profileTitle() {
        return this.loginUser.displayName + (this.isAdmin ? '(管理员)' : '')
      }
    },
    methods: {
      detectUser() {
        this.$axios.get('/user/me').then(({data}) => {
          if (data.hasOwnProperty('success')) {
            console.warn('get user error: %s', data.msg)
            return
          }
          this.loginUser = data
          this.isAdmin = data.isAdmin || false
          if (this.isAdmin) {
            SessionStorage.set('isAdmin', true)
          } else {
            if (SessionStorage.has('isAdmin')) {
              SessionStorage.remove('isAdmin')
            }
          }
        }).catch(err => {
          console.error('get user error: %o', err)
        })
      },
      provideMenus() {
        this.routeMenu = []
        let routes = this.$router.options.routes.filter(r => r.path !== '*')
        routes.forEach(r => {
          let {children} = r
          if (children !== undefined && children.length > 0) {
            children.forEach(c => {
              // 权限过滤
              if (c.meta !== undefined) {
                let meta = c.meta
                if (meta.needAdmin) {
                  if (this.isAdmin) {
                    this.routeMenu.push({label: meta.title, path: c.path})
                  }
                } else {
                  this.routeMenu.push({label: meta.title, path: c.path})
                }

              }
            })
          }
        })
        console.log('menus: %o', this.routeMenu)
      }
    }
  }
</script>

<style scoped>
  .logout-a {
    text-decoration: none;
  }
</style>
