<template>
  <div class="calendar-header col-auto row justify-between items-center">
    <div class="calendar-header-left col-auto">
      <q-btn
        @click="doMoveTimePeriod(timePeriodUnit, -timePeriodAmount)"
        icon="chevron_left"
        color="primary"
        round
        flat
        v-if="!showLabelOnly"
      />
    </div>
    <div class="calendar-header-label">
      <slot/>
    </div>
    <div class="calendar-header-right col-auto">
      <q-btn
        @click="doMoveTimePeriod(timePeriodUnit, timePeriodAmount)"
        icon="chevron_right"
        color="primary"
        round
        flat
        v-if="!showLabelOnly"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CalendarHeaderNav',
    props: {
      // 仅仅显示标题
      showLabelOnly: {
        type: Boolean,
        default: false
      },
      timePeriodUnit: {
        type: String,
        default: 'days'
      },
      timePeriodAmount: {
        type: Number,
        default: 1
      },
      moveTimePeriodFunction: Object,
      moveTimePeriodEmit: {
        type: String,
        default: 'calendar:navMovePeriod'
      }
    },
    data() {
      return {}
    },
    methods: {
      doMoveTimePeriod(timePeriodUnit, timePeriodAmount) {
        this.$root.$emit(
          this.moveTimePeriodEmit,
          {
            unitType: timePeriodUnit,
            amount: timePeriodAmount
          }
        )
      }
    }
  }
</script>

<style lang="stylus">
  .calendar-header
    .calendar-month-year
      font-size 1.25em
      font-weight bold
</style>
