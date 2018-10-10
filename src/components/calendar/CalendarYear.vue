<!--
年份展示日历组件
-->
<template>
  <div class="calendar-year">
    <calendar-header-nav
      time-period-unit="year"
      :time-period-amount="1"
      :move-time-period-emit="eventRef + ':navMovePeriod'">
      {{ formatDate(workingDate, 'yyyy 年') }}
    </calendar-header-nav>

    <div class="calendar-year-content q-mt-sm">
      <div class="months row no-wrap items-start justify-end" v-for="item in monthArray">
        <div class="month-cell col q-pa-xs"
             :class="getCellClass(thisMonth.month, thisMonth.dateObject)"
             v-for="thisMonth in item">
          <quantity-bubble
            v-if="isCurrentYearAndMonth(thisMonth.dateObject)"
            :quantity="thisMonth.month"
            suffix-text="月"
            :offset="false"
          />
          <span v-else>
              {{thisMonth.month}} 月
          </span>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {CalendarMixin, CalendarParentComponentMixin} from "./mixins"
  import QuantityBubble from "./QuantityBubble"

  import CalendarHeaderNav from "./CalendarHeaderNav"

  const {DateTime} = require("luxon")

  export default {
    components: {
      CalendarHeaderNav,
      QuantityBubble
    },
    mixins: [CalendarParentComponentMixin, CalendarMixin],
    data() {
      return {
        workingDate: new Date(),
        monthArray: []
      }
    },
    created() {
      this.$root.$on(this.eventRef + ":navMovePeriod", this.handleNavMove);
      // this.$root.$on("click-event-" + this.eventRef, this.handleEventDetailEvent);
      // this.$root.$on("update-event-" + this.eventRef, this.handleEventUpdate);
      // this.$root.$on("delete-event-" + this.eventRef, this.handleEventDelete);
    },
    mounted() {
      this.doUpdate();
      // this.handlePassedInEvents();
    },
    beforeDestroy() {
      this.$root.$off(this.eventRef + ":navMovePeriod", this.handleNavMove);
      // this.$root.$off("click-event-" + this.eventRef, this.handleEventDetailEvent);
      // this.$root.$off("update-event-" + this.eventRef, this.handleEventUpdate);
      // this.$root.$off("delete-event-" + this.eventRef, this.handleEventDelete);
    },
    methods: {
      // 更新视图
      doUpdate() {
        this.mountSetDate()
        this.generateMonthArray()
      },
      handleNavMove(params) {
        this.moveTimePeriod(params);
        this.$emit(this.eventRef + ":navMovePeriod", {
          unitType: params.unitType,
          amount: params.amount
        })
        this.generateMonthArray()
      },
      // 组织月份的数组
      generateMonthArray() {
        this.monthArray = []
        let dt = this.makeDT(this.workingDate)
        let year = dt.year
        for (let i = 1; i < 4; i++) {
          let fourMonths = []
          for (let j = (i - 1) * 4; j < i * 4; j++) {
            fourMonths.push({
              month: j + 1,
              dateObject: DateTime.fromObject({
                year: year,
                month: j + 1,
                day: 1
              })
            })
          }
          this.monthArray.push(fourMonths)
        }
      },
      getCellClass(monthNo, dateObject) {
        let cls = {}
        if ([1, 2, 3, 4].findIndex((n) => n === monthNo) < 0) {
          cls['no-border-top'] = true
        }
        if ([1, 5, 9].findIndex(n => n === monthNo) < 0) {
          cls['no-border-left'] = true
        }
        if (this.isCurrentYearAndMonth(dateObject)) {
          cls['calendar-month-current'] = true
        }
        return cls
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../css/calendar.vars.styl';

  .month-cell {
    height: 15em;
    max-height: 15em;
    overflow: hidden;
    border: 1px solid #e0e0e0;
    background: none;
  }

  .no-border-left {
    border-left: none !important;
  }

  .no-border-top {
    border-top: none !important;
  }

  .calendar-month-current {
    background-color: $currentDayBackgroundColor;
  }
</style>
