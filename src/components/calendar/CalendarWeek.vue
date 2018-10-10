<template>
  <div class="calendar-week">
    <calendar-header-nav
      time-period-unit="month"
      :time-period-amount="1"
      :move-time-period-emit="eventRef + ':navMovePeriod'"
    >
      {{ formatDate(workingDate, 'yyyy 年 MMMM 月') }}
    </calendar-header-nav>
    <div class="calendar-week-content q-mt-sm">
      <div class="weeks row no-wrap items-start justify-center">
        <div class="week-cell col q-pa-xs"
             v-for="i in 4">
         第 {{i}} 周
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    CalendarMixin,
    CalendarParentComponentMixin
  } from "./mixins"
  import CalendarHeaderNav from "./CalendarHeaderNav"

  const {DateTime} = require("luxon")

  export default {

    components: {
      CalendarHeaderNav
    },
    mixins: [
      CalendarParentComponentMixin, CalendarMixin
    ],
    data() {
      return {
        workingDate: new Date(),
      }
    },
    created() {
      this.$root.$on(this.eventRef + ":navMovePeriod", this.handleNavMove)
      // this.$root.$on("click-event-" + this.eventRef, this.handleEventDetailEvent);
      // this.$root.$on("update-event-" + this.eventRef, this.handleEventUpdate);
      // this.$root.$on("delete-event-" + this.eventRef, this.handleEventDelete);
    },
    mounted() {
      this.doUpdate()
      // this.handlePassedInEvents();
    },
    beforeDestroy() {
      this.$root.$off(this.eventRef + ":navMovePeriod", this.handleNavMove)
      // this.$root.$off("click-event-" + this.eventRef, this.handleEventDetailEvent);
      // this.$root.$off("update-event-" + this.eventRef, this.handleEventUpdate);
      // this.$root.$off("delete-event-" + this.eventRef, this.handleEventDelete);
    },
    methods: {
      doUpdate(){
        this.mountSetDate()
      },
      handleNavMove(params) {
        debugger
        console.log(this.workingDate.month)
        this.moveTimePeriod(params);
        this.$emit(this.eventRef + ":navMovePeriod", {
          unitType: params.unitType,
          amount: params.amount
        })
        // this.generateMonthArray()
      },
    }
  }
</script>

<style>
</style>
