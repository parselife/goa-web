<template>
  <q-layout view="hHr LpR lFf">
    <!-- 头部 -->
    <q-layout-header class="no-shadow">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          我的工时
        </q-toolbar-title>
        <q-btn flat dense icon="fullscreen"/>
      </q-toolbar>
    </q-layout-header>

    <!--左侧功能栏-->
    <q-layout-drawer
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

        <!--<q-route-tab-->
          <!--slot="title"-->
          <!--icon="assignment"-->
          <!--name="Setting"-->
          <!--to="setting"-->
          <!--replace/>-->
      </q-tabs>
    </q-layout-drawer>

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
        leftDrawer: true,
        activeAsideCom: 'Stat'
      }
    }
  }
</script>

<style>
</style>
