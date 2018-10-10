<!--我的消息页面-->
<template>
  <q-page padding>
    <q-tabs no-pane-border inverted>
      <q-tab label="系统消息" name="app" slot="title" default count="5" icon="mail"></q-tab>
      <q-tab label="工作消息" name="work" slot="title" alert icon="announcement" count="2"></q-tab>
      <q-tab-pane name="weekly">
        week
      </q-tab-pane>
      <q-tab-pane name="monthly">
        month
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>

<style>
</style>
