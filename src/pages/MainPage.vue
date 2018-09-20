<!--
主页面
- 显示工时 按  日 周 月 列表等方式展示工时
- 快速切换到今日填写工时
-
-->
<template>
  <q-page class="q-pa-lg">

    <calendar-header-nav class="q-mb-xs"
                         :show-label-only="true">
      <div class="row">
        <q-btn-toggle
          v-model="mode"
          toggle-color="primary"
          :options="options"
        />
        <q-btn icon="date range" class="q-ml-lg q-pl-sm q-pr-sm" outline dense color="primary" size="md" label="今天"/>
      </div>
    </calendar-header-nav>

    <!--<calendar-month-->
    <!--:event-array="events"-->
    <!--:allow-editing="true"/>-->

    <calendar-multi-day
      ref="week-calendar"
      :event-array="events"
      :num-days="7"
      :nav-days="7"
      :allow-editing="true"
    />

  </q-page>
</template>

<script>
  import {CalendarMonth, CalendarMultiDay, CalendarHeaderNav} from 'components/calendar'

  const {DateTime} = require('luxon')

  export default {
    // name: 'PageName',
    components: {
      CalendarMonth,
      CalendarMultiDay,
      CalendarHeaderNav
    },
    data() {
      return {
        parsed: {
          byAllDayStartDate: {},
          byStartDate: {},
          byId: {}
        },
        events: [
          {
            id: 1,
            summary: 'Test event',
            description: 'Some extra info goes here',
            location: 'Office of the Divine Randomness, 1232 Main St., Denver, CO',
            startTime: '2018-09-20T14:00:00+0800', // ISO 8601 formatted
            endTime: '2018-09-20T16:30:00+0800',
            color: 'positive'
          },
          {
            id: 2,
            summary: 'Test  event',
            description: 'Some extra info goes here',
            startTime: '2018-09-16T14:00:00+0800', // A date variable indicates an all-day event
            endTime: '2018-09-19T20:00:00+0800',
            color: 'negative'
          },
          {
            id: 3,
            summary: 'Some other test event',
            description: 'Some extra info goes here',
            startTime: '2018-09-20T10:00:00+0800', // timezone embedded in dateTime
            endTime: '2018-09-20T12:30:00+0800'
          },
        ],
        mode: 'monthly',
        options: [
          {
            label: '月',
            value: 'monthly'
          },
          {
            label: '周',
            value: 'weekly'
          },
          {
            label: '日',
            value: 'daily'
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

<style>
</style>
