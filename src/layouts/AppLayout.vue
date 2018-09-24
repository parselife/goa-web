<template>
  <q-layout view="hHr LpR lFf">
    <!-- 头部 -->
    <q-layout-header class="no-shadow">
      <q-toolbar>
        <!-- <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        /> -->
        <q-toolbar-title class="col-auto q-mr-xl">
          WH &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </q-toolbar-title>
        <q-tabs class="q-ml-xl col">
            <q-route-tab
              label="我的工时"
              to="/main"
              exact
              slot="title"
            />
            <q-route-tab
              label="系统设置"
              to="/setting"
              exact
              slot="title"
            />
          <!-- 管理员页面 -->
             <q-route-tab
              label="系统管理"
              to="/admin"
              exact
              slot="title"
            />
          </q-tabs>

        <q-btn flat dense icon="fullscreen"/>
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
  import * as coms from 'components'

  export default {
    // name: 'LayoutName',
    components: {
      ...coms
    },
    data() {
      return {
        leftDrawer: false,
        activeAsideCom: 'Stat'
      }
    }
  }
</script>

<style>
</style>
