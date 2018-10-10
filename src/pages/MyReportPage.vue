<!-- 我的汇报 页面-->
<template>
  <q-page padding>
    <q-tabs inverted no-pane-border>
      <q-tab label="周报" name="weekly" slot="title" default icon="view week"></q-tab>
      <q-tab label="月报" name="monthly" slot="title" icon="view list"></q-tab>
      <q-tab-pane name="weekly">
        <calendar-week></calendar-week>
      </q-tab-pane>
      <q-tab-pane name="monthly">
        <calendar-year></calendar-year>
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<script>
  import {CalendarWeek, CalendarYear} from '../components/calendar'

  export default {
    // name: 'PageName',
    components: {
      CalendarYear,
      CalendarWeek
    }
  }
</script>

<style scoped>
</style>
