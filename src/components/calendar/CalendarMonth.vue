<template>
  <div class="calendar-month">
    <!-- 头部 -->
    <calendar-header-nav
      time-period-unit="month"
      :time-period-amount="1"
      :move-time-period-emit="eventRef + ':navMovePeriod'"
    >
      {{ formatDate(workingDate, 'yyyy 年 MMMM 月') }}
    </calendar-header-nav>

    <!--月日历-->
    <div class="calendar-content">
      <!--日期标签-->
      <calendar-day-labels
        :number-of-days="7"
        :start-date="workingDate"
        :force-start-of-week="true"
        :sunday-first-day-of-week="sundayFirstDayOfWeek"
        :calendar-locale="calendarLocale"
      />
      <div
        v-for="(thisWeek, index) in weekArray"
        :key="index"
        :class="{
          'calendar-multi-day': true,
          'row': true,
          'no-wrap': true,
          'items-start': true,
          'justify-end': index < (weekArray.length - 1),
          'justify-start': index === (weekArray.length - 1)
        }"
      >
        <div
          :class="{
            'calendar-day': true,
            'calendar-cell': true,
            'calendar-day-not-this': thisDay.month!==makeDT(workingDate).month,
            'calendar-day-weekend': isWeekendDay(thisDay.dateObject),
            'calendar-day-current': isCurrentDate(thisDay.dateObject)
          }"
          v-for="(thisDay, weekDayIndex) in thisWeek"
          :key="makeDT(thisDay.dateObject).toISODate()"
        >
          <div
            v-if="isCurrentDate(thisDay.dateObject)"
            :class="{ 'cursor-pointer': calendarDaysAreClickable }"
            @click="handleDayClick(thisDay.dateObject)"
          >
            <quantity-bubble
              :quantity="thisDay.dateObject.day"
              :offset="false"
            />
          </div>
          <div
            v-else
            :class="{
              'calendar-day-number': true,
              'cursor-pointer': calendarDaysAreClickable
            }"
            class="row items-center q-mr-sm"
          >
            <div class="col"
                 @click="handleDayClick(thisDay.dateObject)">
              {{ thisDay.dateObject.day }}
            </div>
            <!--todo-->
            <div class="col text-right" v-if="true">
              <q-btn icon="add"
                     flat dense color="primary" size="sm"
                     @click="triggerEventAdd(eventRef)">
                <q-tooltip anchor="bottom middle" self="top middle">
                  填写工时
                </q-tooltip>
              </q-btn>
            </div>
          </div>
          <div class="calendar-day-content">
            <template v-if="hasAnyEvents(thisDay.dateObject)">
              <div
                v-for="thisEvent in monthGetDateEvents(thisDay.dateObject)"
                :key="thisEvent.id"
              >
                <calendar-event
                  :event-object="thisEvent"
                  :month-style="true"
                  :event-ref="eventRef"
                  :prevent-event-detail="preventEventDetail"
                  :current-calendar-day="thisDay.dateObject"
                  :has-previous-day="thisEvent.hasPrev"
                  :has-next-day="thisEvent.hasNext"
                  :first-day-of-week="(weekDayIndex === 0)"
                  :last-day-of-week="(weekDayIndex === (thisWeek.length -1))"
                  :allow-editing="allowEditing"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <calendar-event-detail
      ref="defaultEventDetail"
      v-if="!preventEventDetail"
      :event-object="eventDetailEventObject"
      :calendar-locale="calendarLocale"
      :calendar-timezone="calendarTimezone"
      :event-ref="eventRef"
      :allow-editing="allowEditing"
    />
  </div>
</template>

<script>
  import {
    CalendarMixin,
    CalendarEventMixin,
    CalendarParentComponentMixin
  } from "./mixins";
  import QuantityBubble from "./QuantityBubble";
  import CalendarEvent from "./CalendarEvent";
  import CalendarDayLabels from "./CalendarDayLabels";
  import CalendarHeaderNav from "./CalendarHeaderNav";
  import CalendarEventDetail from "./CalendarEventDetail";

  const {DateTime} = require("luxon");

  export default {
    name: "CalendarMonth",
    components: {
      QuantityBubble,
      CalendarEvent,
      CalendarDayLabels,
      CalendarHeaderNav,
      CalendarEventDetail
    },
    mixins: [CalendarParentComponentMixin, CalendarMixin, CalendarEventMixin],
    props: {
      fullComponentRef: String
    },
    data() {
      return {
        dayCellHeight: 5,
        dayCellHeightUnit: "rem",
        workingDate: new Date(),
        weekArray: [],
        parsed: this.getDefaultParsed(),
        eventDetailEventObject: {}
      };
    },
    computed: {
      calendarDaysAreClickable: function () {
        return false;
      }
    },
    methods: {
      monthGetDateEvents: function (dateObject) {
        return this.dateGetEvents(dateObject);
      },
      doUpdate: function () {
        this.mountSetDate();
        this.generateCalendarCellArray();
      },
      getCalendarCellArray: function (monthNumber, yearNumber) {
        let currentDay = this.makeDT(
          DateTime.fromObject({
            year: yearNumber,
            month: monthNumber,
            day: 1
          })
        );
        let currentWeekOfYear = this.getWeekNumber(
          currentDay,
          this.sundayFirstDayOfWeek
        );
        let weekArray = [];
        let currentWeekArray = [];
        let thisDayObject = {};

        let weekDayCurrent = currentDay.weekday;
        // 如果不是周一 则需要取前一个月的最后一周 补到前面
        if (weekDayCurrent !== 1) {
          let yearNo = monthNumber === 1 ? yearNumber - 1 : yearNumber;
          let monthNo = monthNumber === 1 ? 12 : monthNumber - 1;
          let preMonthFirstDay = this.makeDT(
            DateTime.fromObject({
              year: yearNo,
              month: monthNo
            })
          );
          // 获取上个月最后一天在的周
          let daysInPreMonth = preMonthFirstDay.daysInMonth;
          for (let i = 0; i < weekDayCurrent - 1; i++) {
            let day = this.makeDT(
              DateTime.fromObject({
                year: yearNo,
                month: monthNo,
                day: daysInPreMonth - i
              })
            );
            if (day.isValid) {
              currentWeekArray.push({
                dateObject: day,
                year: day.year,
                month: day.month,
                date: day.day,
                dayName: day.toFormat("EEEE"),
                dayNumber: day.weekday
              });
            }
          }
        }

        for (
          let thisDateOfMonth = 1;
          thisDateOfMonth <= currentDay.daysInMonth;
          thisDateOfMonth++
        ) {
          currentDay = this.makeDT(
            DateTime.fromObject({
              year: yearNumber,
              month: monthNumber,
              day: thisDateOfMonth
            })
          );
          if (
            currentDay.year === yearNumber &&
            currentDay.month === monthNumber
          ) {
            if (
              this.getWeekNumber(currentDay, this.sundayFirstDayOfWeek) !==
              currentWeekOfYear
            ) {
              weekArray.push(currentWeekArray);
              currentWeekOfYear = this.getWeekNumber(
                currentDay,
                this.sundayFirstDayOfWeek
              );
              currentWeekArray = [];
            }
            thisDayObject = {
              dateObject: currentDay,
              year: currentDay.year,
              month: currentDay.month,
              date: currentDay.day,
              dayName: currentDay.toFormat("EEEE"),
              dayNumber: currentDay.weekday
            };
            currentWeekArray.push(thisDayObject);
          }
        }
        if (weekArray.length > 0) {
          weekArray.push(currentWeekArray);
        }
        return weekArray;
      },
      // 生成每单元格的日期
      generateCalendarCellArray: function () {
        this.weekArray = this.getCalendarCellArray(
          this.makeDT(this.workingDate).month,
          this.makeDT(this.workingDate).year
        );
      },

      handleNavMove: function (params) {
        this.moveTimePeriod(params);
        this.$emit(this.eventRef + ":navMovePeriod", {
          unitType: params.unitType,
          amount: params.amount
        });
        this.generateCalendarCellArray();
      },
      handleDayClick: function (dateObject) {
        if (this.fullComponentRef) {
          this.fullMoveToDay(dateObject);
        }
      }
    },
    mounted() {
      this.doUpdate();
      this.handlePassedInEvents();
      this.$root.$on(this.eventRef + ":navMovePeriod", this.handleNavMove);
      this.$root.$on("click-event-" + this.eventRef, this.handleEventDetailEvent);
      this.$root.$on("update-event-" + this.eventRef, this.handleEventUpdate);
      this.$root.$on("delete-event-" + this.eventRef, this.handleEventDelete);
    },
    watch: {
      startDate: "handleStartChange",
      eventArray: function () {
        this.getPassedInEventArray();
      },
      parsedEvents: function () {
        this.getPassedInParsedEvents();
      }
    }
  };
</script>

<style lang="stylus">
  @import '../../css/calendar.vars.styl';

  .calendar-month {
    .calendar-day-content {
      height: 75%;
    }

    .calendar-time-width {
      width: $dayTimeLabelWidth;
    }

    .calendar-time-margin {
      margin-left: $dayTimeLabelWidth;
    }

    .calendar-header {
      .calendar-header-label {
        font-size: 1.25em;
        font-weight: bold;
      }
    }

    .calendar-content {
      padding: 4px 12px;

      .calendar-cell {
        width: $cellWidth;
        max-width: $cellWidth;
        padding: 0;
      }

      .calendar-day-labels {
        .calendar-day-label {
          font-size: 1.1em;
        }

        .calendar-day-label-current {
          font-weight: bold;
        }
      }

      .calendar-multi-day {
        border-top: 1px solid $borderColor;
        :last-child {
          border-bottom: none;
        }
      }

      .calendar-day {
        border-left: 1px solid $borderColor;
        background: none;
        height: $cellHeight;
        max-height: $cellHeight;
        overflow: hidden;
        width: $sevenCellWidth;
        .calendar-day-number {
          font-size: 0.9em;
          height: 2em;
          // width 2em
          vertical-align: middle;
          padding-top: 0.25em;
          padding-left: 0.25em;
        }
      }

      .calendar-day-current {
        background-color: $currentDayBackgroundColor;
      }

      .calendar-day-weekend {
        background-color: $weekendDayBackgroundColor;
      }

      .calendar-day-not-this {
        color: $grey-6;
      }
    }
  }
</style>
