<!-- 我的汇报 页面-->
<template>
  <q-page padding>
    <q-tabs inverted no-pane-border>
      <q-tab label="周报" name="weekly" slot="title" default icon="view week"></q-tab>
      <q-tab label="月报" name="monthly" slot="title" icon="view list"></q-tab>
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

<style scoped>
</style>
