<!--
主页面
- 显示工时 按  日 周 月 列表等方式展示工时
- 快速切换到今日填写工时
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
        events: [
          {
            id: 11,
            userId: 1,
            project: {
              id: 1,
              name: "学校管理系统",
              status: 2

            },
            type: {
              id: 4,
              name: "code",
              alias: "编码"
            },
            title: "写代码",
            content: "详细地写代码",
            startTime: "2018-09-19T13:32:50+08:00",
            endTime: "2018-09-19T17:00:50+08:00"
          },
          {
            id: 1,
            project: {
              id: 1,
              name: "学校管理系统",
              status: 2

            },
            type: {
              id: 4,
              name: "code",
              alias: "编码"
            },
            title: 'Test event',
            content: 'Some extra info goes here',
            location: 'Office of the Divine Randomness, 1232 Main St., Denver, CO',
            startTime: '2018-09-21T14:00:00+0800', // ISO 8601 formatted
            endTime: '2018-09-21T16:30:00+0800',
            color: 'positive'
          },
          {
            id: 2,
            project: {
              id: 1,
              name: "学校管理系统",
              status: 2

            },
            type: {
              id: 4,
              name: "code",
              alias: "编码"
            },
            title: 'Test  event',
            content: 'Some extra info goes here',
            startTime: '2018-09-16T14:00:00+0800', // A date variable indicates an all-day event
            endTime: '2018-09-16T18:00:00+0800',
            color: 'negative'
          },
          {
            id: 3,
            project: {
              id: 1,
              name: "学校管理系统",
              status: 2

            },
            type: {
              id: 4,
              name: "code",
              alias: "编码"
            },
            title: 'Some other test event',
            content: 'Some extra info goes here',
            startTime: '2018-09-20T10:00:00+0800', // timezone embedded in dateTime
            endTime: '2018-09-20T12:30:00+0800'
          },
        ],
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
    created() {
      console.log(DateTime.local().locale)
      console.log(DateTime.local().zoneName)
    }
  }
</script>

<style lang="stylus">
  .q-tabs-panes
    border-top 0 !important
</style>
