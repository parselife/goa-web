<template>
  <div class="calendar-multi-day-component column fit no-wrap">
    <!-- 最顶部的日期显示与导航 -->
    <template v-if="numDays === 1">
      <calendar-header-nav
        time-period-unit="days"
        :time-period-amount="navDays"
        :move-time-period-emit="eventRef + ':navMovePeriod'"
        :calendar-locale="calendarLocale"
      >
        {{ formatDate(workingDate, 'yyyy 年 MMMM 月 d EEEE')}}
      </calendar-header-nav>
    </template>
    <template v-else>
      <calendar-header-nav
        time-period-unit="days"
        :time-period-amount="navDays"
        :move-time-period-emit="eventRef + ':navMovePeriod'"
      >
        {{ getHeaderLabel() }}
      </calendar-header-nav>
    </template>

    <!--顶部的日期 星期几 选择单天显示时 隐藏此部分内容-->
    <div v-if="numDays > 1" class="calendar-time-margin">
      <calendar-day-labels
        :number-of-days="numDays"
        :show-dates="true"
        :start-date="workingDate"
        :force-start-of-week="forceStartOfWeek"
        :full-component-ref="fullComponentRef"
        :sunday-first-day-of-week="sundayFirstDayOfWeek"
        :calendar-locale="calendarLocale"
      />
    </div>

    <!-- 中间的展示内容 -->
    <q-scroll-area :style="getScrollStyle"
                   :thumb-style="scrollThumbStyle"
                   :delay="1500">
      <div class="col">
        <div class="calendar-day row">
          <!--左侧的24小时展示列-->
          <calendar-time-label-column day-cell-height="3rem"/>
          <!--渲染日志/事件内容-->
          <div class="calendar-multiple-days col row">
            <calendar-day-column
              :day-cell-height="3"
              v-for="thisDate in weekDateArray"
              :key="makeDT(thisDate).toISODate()"
              :start-date="thisDate"
              :date-events="dateGetEvents(thisDate, true)"
              column-css-class="calendar-day-column-content"
              :style="{ 'width': dayCellWidth }"
              :event-ref="eventRef"
              :prevent-event-detail="preventEventDetail"
              :allow-editing="allowEditing"
            />
          </div>
        </div>
      </div>
    </q-scroll-area>
    <calendar-event-detail
      :ref="'eventDetail'+eventRef"
      v-if="!preventEventDetail"
      :event-object="eventDetailEventObject"
      :event-ref="eventRef"
      :allow-editing="allowEditing"
    />

  </div>
</template>

<script>
  import {CalendarMixin, CalendarEventMixin, CalendarParentComponentMixin} from './mixins'
  import CalendarEvent from './CalendarEvent'
  import CalendarDayColumn from './CalendarDayColumn'
  import CalendarTimeLabelColumn from './CalendarTimeLabelColumn'
  import CalendarDayLabels from './CalendarDayLabels'
  import CalendarHeaderNav from './CalendarHeaderNav'
  import CalendarEventDetail from './CalendarEventDetail'

  export default {
    name: 'CalendarMultiDay',
    mixins: [CalendarParentComponentMixin, CalendarMixin, CalendarEventMixin],
    props: {
      numDays: {
        type: Number,
        default: 7
      },
      navDays: {
        type: Number,
        default: 7
      },
      forceStartOfWeek: {
        type: Boolean,
        default: true
      },
      dayCellHeight: {
        type: Number,
        default: 5
      },
      dayCellHeightUnit: {
        type: String,
        default: 'rem'
      },
      scrollThumbStyle: {
        type: Object,
        default: function () {
          return {
            right: '2px',
            borderRadius: '2px',
            background: '#027be3',
            width: '4px',
            opacity: .7
          }
        }
      },
      fullComponentRef: String
    },
    components: {
      CalendarEvent,
      CalendarDayColumn,
      CalendarTimeLabelColumn,
      CalendarDayLabels,
      CalendarHeaderNav,
      CalendarEventDetail
    },
    data() {
      return {
        workingDate: new Date(),
        weekDateArray: [],
        dayRowArray: [],
        parsed: this.getDefaultParsed(),
        thisNavRef: this.createNewNavEventName(),
        eventDetailEventObject: {}
      }
    },
    computed: {
      dayCellWidth: function () {
        return this.calculateDayCellWidth(this.numDays)
      },
      getScrollStyle() {
        return {
          'height': (window.innerHeight - 236) + 'px'
        }
      }
    },
    methods: {
      // 显示标题
      getHeaderLabel: function () {
        let label = ''
        let bookendDates = this.getForcedWeekBookendDates(this.numDays)
        label += bookendDates.first.toFormat('yyyy.MM.dd')
        label += ' ~ '
        if (bookendDates.first.year !== bookendDates.last.year) {
          label += bookendDates.last.toFormat('yyyy.MM.dd')
        } else {
          label += bookendDates.last.toFormat('MM.dd')
        }
        return label
      }
      ,
      doUpdate: function () {
        this.mountSetDate()
        this.buildWeekDateArray(this.numDays, this.sundayFirstDayOfWeek)
      }
      ,
      handleNavMove: function (unitType, amount) {
        this.moveTimePeriod(unitType, amount)
        this.$emit(
          this.eventRef + ':navMovePeriod',
          {
            unitType: unitType,
            amount: amount
          }
        )
        this.buildWeekDateArray()
      }
    },
    created() {
      this.$root.$on(
        this.eventRef + ':navMovePeriod',
        this.handleNavMove
      )
      this.$root.$on(
        'click-event-' + this.eventRef,
        this.handleEventDetailEvent
      )
      this.$root.$on(
        'update-event-' + this.eventRef,
        this.handleEventUpdate
      )
      this.$root.$on(
        'delete-event-' + this.eventRef,
        this.handleEventDelete
      )
    },
    mounted() {
      this.doUpdate()
      this.handlePassedInEvents()
    },
    beforeDestroy() {
      this.$root.$off(this.eventRef + ":navMovePeriod", this.handleNavMove);
      this.$root.$off("click-event-" + this.eventRef, this.handleEventDetailEvent);
      this.$root.$off("update-event-" + this.eventRef, this.handleEventUpdate);
      this.$root.$off("delete-event-" + this.eventRef, this.handleEventDelete);
    },
    watch: {
      startDate: 'handleStartChange',
      eventArray:
        'getPassedInEventArray',
      parsedEvents:
        'getPassedInParsedEvents'
    }
  }
</script>

<style lang="stylus">
  @import '../../css/calendar.vars.styl'

  .calendar-multi-day-component
    .calendar-time-margin
      margin-left $dayTimeLabelWidth
    .calendar-header
      .calendar-header-label
        font-size 1.25em
        font-weight bold
    .calendar-day
      .calendar-day-column-label
        width $dayTimeLabelWidth
      .calendar-day-column-content
        border-right $borderThin
        position relative
      .calendar-day-time
        padding-right .5em
        border-right $borderOuter
        padding-top 1rem
      .calendar-day-time-content
        border-top $borderThin

</style>
