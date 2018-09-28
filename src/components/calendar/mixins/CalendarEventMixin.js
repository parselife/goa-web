import dashHas from 'lodash/has'
import {
  date,
  Loading,
  QSpinnerGears
} from 'quasar'

const defaultParsed = {
  byAllDayStartDate: {},
  byAllDayObject: {},
  byStartDate: {},
  byId: {}
}
const {DateTime} = require('luxon')
export default {
  computed: {},
  methods: {
    formatToSqlDate: function (dateObject) {
      return this.makeDT(dateObject).toISODate()
    },
    getEventById: function (eventId) {
      return this.parsed.byId[eventId]
    },
    dateGetEvents: function (thisDate, skipSlotIndicators) {
      let hasEvents = this.hasEvents(thisDate)
      let returnArray = []
      let sqlDate = this.makeDT(thisDate).toISODate()

      if (hasEvents) {
        for (let thisEvent of this.parsed.byStartDate[sqlDate]) {
          returnArray.push(this.getEventById(thisEvent))
        }
      }
      return returnArray
    },
    hasAnyEvents: function (thisDateObject) {
      return (
        this.hasEvents(thisDateObject) ||
        this.hasAllDayEvents(thisDateObject)
      )
    },
    hasAllDayEvents: function (thisDateObject) {
      return dashHas(
        this.parsed.byAllDayObject,
        this.formatToSqlDate(thisDateObject)
      )
    },
    hasEvents: function (thisDateObject) {
      return dashHas(
        this.parsed.byStartDate,
        this.formatToSqlDate(thisDateObject)
      )
    },

    clearParsed: function () {
      this.parsed = {}
      this.parsed = {
        byAllDayStartDate: {},
        byAllDayObject: {},
        byStartDate: {},
        byId: {}
      }
      return true
    },
    moveToDisplayZone: function (dateObject) {
      return this.makeDT(dateObject, this.calendarTimezone)
    },
    // 解析事件（日志）
    parseEventList: function () {
      this.clearParsed()
      for (let event of this.eventArray) {
        this.parsed.byId[event.id] = event
        // 处理开始时间
        if (!dashHas(event, 'start')) {
          event.start = {}
        }
        event.start.dateObject = this.moveToDisplayZone(DateTime.fromISO(event.startTime))
        // 处理结束时间
        if (!dashHas(event, 'end')) {
          event.end = {}
        }
        event.end.dateObject = this.moveToDisplayZone(DateTime.fromISO(event.endTime))
        let thisStartDate = event.start.dateObject.toISODate()
        event.durationMinutes = this.parseGetDurationMinutes(event)
        if (!dashHas(this.parsed.byStartDate, thisStartDate)) {
          this.parsed.byStartDate[thisStartDate] = []
        }
        this.parsed.byStartDate[thisStartDate].push(event.id)
      }
      let that = this
      Object.keys(this.parsed.byStartDate).forEach(k => {
        that.parsed.byStartDate[k] = that.sortDateEvents(that.parsed.byStartDate[k])
        that.parseDateEvents(that.parsed.byStartDate[k])
      })
    },

    sortPairOfDateEvents: function (a, b) {
      return date.getDateDiff(
        date.addToDate(a.start.dateObject, {milliseconds: a.durationMinutes}),
        date.addToDate(b.start.dateObject, {milliseconds: b.durationMinutes})
      )
    },

    sortDateEvents: function (eventArray) {
      let tempArray = []
      for (let eventId of eventArray) {
        tempArray.push(this.parsed.byId[eventId])
      }
      tempArray.sort(this.sortPairOfDateEvents)
      let returnArray = []
      for (let thisEvent of tempArray) {
        returnArray.push(thisEvent.id)
      }
      return returnArray
    },
    parseDateEvents: function (eventArray) {
      let overlapSegment = 1
      let overlapIteration = 1
      for (let eventId of eventArray) {
        let numberOfOverlaps = 0
        for (let compareEventId of eventArray) {
          let thisEvent = this.parsed.byId[eventId]
          let compareEvent = this.parsed.byId[compareEventId]
          if (
            eventId !== compareEventId &&
            this.parseHasOverlap(thisEvent, compareEvent)
          ) {
            numberOfOverlaps++
          }
        }
        this.parsed.byId[eventId]['numberOfOverlaps'] = numberOfOverlaps
        if (numberOfOverlaps > 0) {
          this.parsed.byId[eventId]['overlapSegment'] = overlapSegment
          this.parsed.byId[eventId]['overlapIteration'] = overlapIteration
          overlapIteration++
        }
        else {
          this.parsed.byId[eventId]['overlapSegment'] = 0
          overlapSegment++
          overlapIteration = 1
        }
      }
    },
    parseGetDurationMinutes: function (eventObj) {
      if (eventObj.start.isAllDay) {
        return 24 * 60
      }
      else {
        return eventObj.end.dateObject.diff(
          eventObj.start.dateObject,
          'minutes'
        )
      }
    },
    parseHasOverlap: function (event1, event2) {
      return (event1.start.dateObject <= event2.end.dateObject) &&
        (event1.end.dateObject >= event2.start.dateObject)
    },
    getPassedInParsedEvents: function () {
      this.parsed = defaultParsed
      if (
        this.parsedEvents !== undefined &&
        this.parsedEvents.byId !== undefined &&
        Object.keys(this.parsedEvents).length > 0
      ) {
        this.parsed = this.parsedEvents
        return true
      }
      else {
        return false
      }
    },
    getPassedInEventArray: function () {
      this.parsed = defaultParsed
      if (this.eventArray !== undefined && this.eventArray.length > 0) {
        this.parseEventList()
        return true
      } else {
        return false
      }
    },
    getDefaultParsed: function () {
      return defaultParsed
    },
    isParsedEventsEmpty: function () {
      return !(
        this.parsedEvents !== undefined &&
        this.parsedEvents.byId !== undefined &&
        Object.keys(this.parsedEvents).length > 0
      )
    },
    isEventArrayEmpty: function () {
      return !(this.eventArray !== undefined && this.eventArray.length > 0)
    },
    handlePassedInEvents: function () {
      if (!this.isParsedEventsEmpty()) {
        this.getPassedInParsedEvents()
      }
      else if (!this.isEventArrayEmpty()) {
        this.getPassedInEventArray()
      }
    },
    // 更新事件 todo
    handleEventUpdate: function (eventObject) {
      debugger
      let thisEventId = eventObject.id
      for (let thisEventIndex in this.eventArray) {
        if (this.eventArray[thisEventIndex].id === thisEventId) {
          this.eventArray[thisEventIndex] = eventObject
          this.parseEventList()
        }
      }
    },
    handleEventDelete(eventObject) {
      if (eventObject.id !== undefined) {
        Loading.show({spinner: QSpinnerGears, message: '操作中...', spinnerColor: 'blue-grey'})
        this.$axios.delete(`/rest/job/${eventObject.id}`)
          .then(({data}) => {
            Loading.hide()
            this.$alert.positive('删除成功!')
            this.$root.$emit('refresh-event')
          }).catch(err => {
          Loading.hide()
          this.$alert.warning('删除失败!')
          console.error(err)
        })
      }
    },
    handleEventAdd(dateObject) {
      // todo 添加事件
      //

    }
  },
  mounted() {
  }
}
