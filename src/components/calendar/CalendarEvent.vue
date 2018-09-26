<template>
  <div
    :class="getEventClass()"
    :style="getEventStyle()"
    @click="handleClick">
      <span v-if="showTime" class="calendar-event-start-time">
        {{ formatTime(eventObject.start.dateObject) }}
      </span>
    <span v-if="monthStyle">~</span>
    <span v-if="monthStyle" class="q-mr-xs">
       {{ formatTime(eventObject.end.dateObject) }}
    </span>
    <span v-if="isEmptySlot()" class="calendar-event-summary"></span>
    <span v-else class="calendar-event-summary">
        {{ eventObject.title }}
    </span>
  </div>
</template>

<script>
  import {CalendarEventMixin, CalendarMixin} from './mixins'

  const {DateTime} = require('luxon')
  export default {
    name: 'CalendarEvent',
    props: {
      eventObject: {
        type: Object,
        default: () => {
        }
      },
      color: {
        type: String,
        default: 'primary'
      },
      textColor: {
        type: String,
        default: 'white'
      },
      showTime: {
        type: Boolean,
        default: true
      },
      monthStyle: {
        type: Boolean,
        default: false
      },
      eventRef: String,
      preventEventDetail: {
        type: Boolean,
        default: false
      },
      forceAllDay: Boolean,
      currentCalendarDay: Object,
      hasPreviousDay: Boolean,
      hasNextDay: Boolean,
      firstDayOfWeek: Boolean,
      lastDayOfWeek: Boolean,
      calendarLocale: {
        type: String,
        default: () => {
          return DateTime.local().locale
        }
      },
      allowEditing: {
        type: Boolean,
        default: false
      }
    },
    mixins: [CalendarMixin, CalendarEventMixin],
    data() {
      return {}
    },
    computed: {},
    methods: {
      getEventStyle: function () {
        return {
          // 'background-color': this.backgroundColor,
          // 'color': this.textColor
        }
      },
      getEventClass: function () {
        return this.addCssColorClasses(
          {
            'calendar-event': true,
            'calendar-event-month': this.monthStyle,
            'calendar-event-multi': !this.monthStyle,
            'calendar-event-empty-slot': this.isEmptySlot(),
          },
          this.eventObject
        )
      },
      isEmptySlot: function () {
        return this.eventObject.start.isEmptySlot
      },
      isLastDayOfMonth: function (dateObject) {
        if (typeof dateObject === 'undefined' || dateObject === null) {
          return false
        }
        return this.makeDT(this.currentCalendarDay).toISODate() === this.makeDT(dateObject).endOf('month').toISODate()
      },
      isFirstDayOfMonth: function (dateObject) {
        if (typeof dateObject === 'undefined' || dateObject === null) {
          return false
        }
        return this.makeDT(this.currentCalendarDay).toISODate() === this.makeDT(dateObject).startOf('month').toISODate()
      },
      formatTime: function (startTime) {
        // let returnString = this.makeDT(startTime).toLocaleString(DateTime.TIME_SIMPLE)
        let returnString = this.makeDT(startTime).toFormat('T')

        return returnString
      },
      handleClick: function (e) {
        this.eventObject.allowEditing = this.allowEditing
        this.$emit('click', this.eventObject)
        this.triggerEventClick(this.eventObject, this.eventRef)
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus">

  $nextPrevEdgeVal = 5%

  .calendar-event
    /*width 100%*/
    height 100%
    padding 2px
    text-overflow clip
    border-radius .25em
    margin 1px 0
    font-size 0.8em
    cursor pointer

  .calendar-event-month
    white-space nowrap
    margin 1px 2px

  .calendar-event-multi-allday
    margin-right 1em

  .calendar-event-has-next-day
    border-top-right-radius 0
    border-bottom-right-radius 0
    margin-right 0

  .calendar-event-has-previous-day
    border-top-left-radius 0
    border-bottom-left-radius 0
    margin-left 0

  .calendar-event-empty-slot
    background-color transparent !important
    cursor inherit
    border-radius 0

  .calendar-event-continues-next-week
    padding-right $nextPrevEdgeVal
    clip-path polygon(0% 100%, 0% 0%, (100% - $nextPrevEdgeVal) 0%, 100% 50%, (100% - $nextPrevEdgeVal) 100%)

  .calendar-event-continues-from-last-week
    padding-left $nextPrevEdgeVal
    clip-path polygon($nextPrevEdgeVal 100%, 0% 50%, $nextPrevEdgeVal 0, 100% 0, 100% 100%)

  .calendar-event-continues-next-week.calendar-event-continues-from-last-week
    padding-left $nextPrevEdgeVal
    padding-right $nextPrevEdgeVal
    clip-path polygon($nextPrevEdgeVal 100%, 0% 50%, $nextPrevEdgeVal 0, (100% - $nextPrevEdgeVal) 0%, 100% 50%, (100% - $nextPrevEdgeVal) 100%)
</style>
