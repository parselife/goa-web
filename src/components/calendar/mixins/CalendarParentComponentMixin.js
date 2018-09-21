const { DateTime } = require('luxon')
export default {
  props: {
    // 日历开始时间 默认是 now
    startDate: {
      type: [Object, Date],
      default: () => { return new Date() }
    },
    // 所有的事件/日志
    eventArray: {
      type: Array,
      default: () => []
    },
    parsedEvents: {
      type: Object,
      default: () => {}
    },
    eventRef: {
      type: String,
      default: 'cal-' + Math.random().toString(36).substring(2, 15)
    },
    preventEventDetail: {
      type: Boolean,
      default: false
    },
    // 设置时间区域 zh-CN
    calendarLocale: {
      type: String,
      default: () => { return DateTime.local().locale }
    },
    //设置时间区间 Asia/Shanghai
    calendarTimezone: {
      type: String,
      default: () => { return DateTime.local().zoneName }
    },
    // 周日是否作为一周的第一天
    sundayFirstDayOfWeek: {
      type: Boolean,
      default: false
    },
    // 是否允许编辑
    allowEditing: {
      type: Boolean,
      default: false
    }
  }
}
