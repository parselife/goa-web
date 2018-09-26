<!--
主页面
- 显示工时 按  日 周 月 列表等方式展示工时
[ ] 快速切换到今日填写工时
-
-->
<template>
  <q-page class="q-py-sm">
    <!--<q-btn icon="date range" class="q-ml-lg q-pl-sm q-pr-sm" outline dense color="primary" size="md" label="今天"/>-->
    <q-tabs inverted animated align="center" no-pane-border>
      <q-tab v-for="(m,idx) in options" :label="m.label" :name="m.value" slot="title" :default="idx===0"
             :key="idx"></q-tab>
      <q-tab-pane name="month">
        <calendar-month
          :event-array="events"
          :allow-editing="true"/>
      </q-tab-pane>
      <q-tab-pane name="week">
        <calendar-multi-day
          :event-array="events"
          :num-days="7"
          :nav-days="7"
          :allow-editing="true"
        />
      </q-tab-pane>
      <q-tab-pane name="day">
        <calendar-multi-day
          :event-array="events"
          :num-days="1"
          :nav-days="1"
          :allow-editing="true"
          :force-start-of-week="false"
        />
      </q-tab-pane>
    </q-tabs>
    <q-inner-loading :visible="loading">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading>
  </q-page>
</template>

<script>
  import {CalendarMonth, CalendarMultiDay, CalendarHeaderNav} from 'components/calendar'

  const {DateTime} = require('luxon')

  export default {
    components: {
      CalendarMonth,
      CalendarMultiDay,
      CalendarHeaderNav
    },
    data() {
      return {
        loading: false,
        events: [],
        options: [
          {
            label: '月',
            value: 'month'
          },
          {
            label: '周',
            value: 'week'
          },
          {
            label: '日',
            value: 'day'
          }
        ]
      }
    },
    watch: {
      $route: "fetchData"
    },
    created() {
      console.log(DateTime.local().locale)
      console.log(DateTime.local().zoneName)
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.loading = true
        this.$axios
          .get('/rest/job/me')
          .then(({data}) => {
            this.loading = false
            if (data.hasOwnProperty('success')) {
              console.warn(data.msg)
            } else {
              this.events = data
            }
          })
          .catch(err => {
            this.loading = false
            console.error(err)
          })

      }
    }
  }
</script>

<style lang="stylus">
  .q-tabs-panes
    border-top 0 !important
</style>
