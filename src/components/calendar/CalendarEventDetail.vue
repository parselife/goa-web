<template>
  <q-modal
    v-model="modalIsOpen"
    no-backdrop-dismiss
    class="calendar-event-detail"
    @hide="__close()"
    @escape-key="__close()"
  >
    <div :class="getTopColorClasses">
      <div class="absolute-top-right row justify-end items-start ced-toolbar">
        <q-btn
          flat
          icon="close"
          @click="__close()"
        />
      </div>
      <div
        v-if="isEditingAllowed && inEditMode"
        class="ced-top-title"
      >
        <div
          v-if="isEditingAllowed && inEditMode"
          class="ced-toolbar-edit-spacer">
          {{dayTitle}}
        </div>
        <q-field>
          <q-input
            v-model="editEventObject.title"
            float-label="标题"
            inverted-light
            color="white"
            class="no-shadow"
          />
        </q-field>
      </div>
      <div
        v-else-if="eventObject.title"
        class="ced-top-title">
        {{ eventObject.title }}
      </div>
    </div>
    <!--列表和编辑按钮-->
    <div class="ced-content text-center">
      <q-list no-border>

        <!--时间-->
        <q-item multiline>
          <q-item-main v-if="isEditingAllowed && inEditMode">
            <div class="row items-center justify-between gutter-xs">
              <q-field icon="access_time">
                <q-datetime
                  v-model="startTimeObject"
                  type="time"
                  inverted-light
                  :color="fieldColor"
                  class="no-shadow time-field"
                  format24h
                />
              </q-field>
              <q-icon name="trending flat" class="arrow-icon"></q-icon>
              <q-field>
                <q-datetime
                  v-model="endTimeObject"
                  type="time"
                  inverted-light
                  :color="fieldColor"
                  class="no-shadow time-field"
                  format24h
                />
              </q-field>
            </div>
          </q-item-main>

          <template v-else>
            <q-item-side>
              <q-item-tile icon="access_time"/>
            </q-item-side>
            <q-item-main>
              <div
                v-if="eventObject.start && eventObject.start.dateObject"
                class="ced-list-title">
                {{ formatDate(eventObject.start.dateObject, 'DATE_HUGE', true) }}
              </div>
              <div
                v-if="eventObject.end &&
                eventObject.end.dateObject"
                class="ced-list-subtitle"
              >
                {{ formatDate(eventObject.start.dateObject, 'TIME_SIMPLE', true)
                }}
                -
                {{ formatDate(eventObject.end.dateObject, 'TIME_SIMPLE', true) }}
              </div>
            </q-item-main>
          </template>
        </q-item>

        <!--工作类型-->
        <q-item>
          <q-item-main class="ced-list-title" v-if="isEditingAllowed && inEditMode">
            <q-field icon="bookmark border">
              <q-select
                v-model="editEventObject.type.id"
                :options="jobTypes"
                float-label="工作类型"
                inverted-light
                :color="fieldColor"
                class="no-shadow"
              />
            </q-field>
          </q-item-main>
          <template v-else>
            <q-item-side>
              <q-item-tile icon="bookmark border"/>
            </q-item-side>
            <q-item-main class="ced-list-title">
              <q-chip tag color="primary" small>
                {{ eventObject.type.alias }}
              </q-chip>
            </q-item-main>
          </template>
        </q-item>

        <!-- 项目名称 -->
        <q-item>
          <q-item-main class="ced-list-title" v-if="isEditingAllowed && inEditMode">
            <q-field icon="card travel">
              <q-select
                v-model="editEventObject.project.id"
                :options="jobPros"
                float-label="关联项目"
                inverted-light
                :color="fieldColor"
                class="no-shadow"
              />
            </q-field>
          </q-item-main>
          <template v-else>
            <q-item-side>
              <q-item-tile icon="card travel"/>
            </q-item-side>
            <q-item-main class="ced-list-title">
              {{ eventObject.project.name }}
            </q-item-main>
          </template>
        </q-item>

        <!-- 完成进度 -->
        <q-item>
          <q-item-main class="ced-list-title" v-if="isEditingAllowed && inEditMode">
            <q-field icon="data usage">
              <span style="width: 20%;font-size: .75rem;line-height: 28px;">工作进度:</span>
              <q-slider
                style="width: 80%;float: right"
                v-model="eventObject.progress"
                :min="0"
                :max="1"
                :step=".1"
                :label-value="`${eventObject.progress*100}%`"
                label
                snap
              />
            </q-field>
          </q-item-main>
          <template v-else>
            <q-item-side>
              <q-item-tile icon="data usage"/>
            </q-item-side>
            <q-item-main class="ced-list-title">
              {{eventObject.progress*100}} %
            </q-item-main>
          </template>
        </q-item>

        <!-- 详细 -->
        <q-item multiline>
          <q-item-main v-if="isEditingAllowed && inEditMode">
            <q-field icon="notes">
              <q-input
                v-model="editEventObject.content"
                type="textarea"
                :max-height="100"
                rows="4"
                float-label="详细内容"
                inverted-light
                :color="fieldColor"
                class="no-shadow"
              />
            </q-field>
          </q-item-main>
          <template v-else>
            <q-item-side>
              <q-item-tile icon="notes"/>
            </q-item-side>
            <q-item-main class="ced-list-title">
              {{ eventObject.content }}
            </q-item-main>
          </template>
        </q-item>
      </q-list>

      <q-btn-group v-if="isEditingAllowed && !inEditMode"
                   rounded class="q-my-sm">
        <q-btn rounded label="编辑"
               icon="edit"
               :color="getEventColor(eventObject, 'color')"
               :text-color="getEventColor(eventObject, 'textColor')"
               @click="startEditMode"/>
        <q-btn rounded label="删除" icon="delete outline" color="negative" @click="openDelConfirm"/>
      </q-btn-group>
    </div>
    <!-- 保存按钮 -->
    <div
      v-if="isEditingAllowed && inEditMode"
      class="row justify-center q-py-sm q-mb-sm gutter-sm">
      <div>
        <q-btn
          color="positive"
          icon="check"
          label="保存"
          @click="__save()"/>
      </div>
      <div class="q-ml-md">
        <q-btn
          color="warning"
          icon="cancel"
          label="取消"
          @click="__close()"/>
      </div>
    </div>
  </q-modal>

</template>

<script>
  import dashHas from 'lodash/has'

  import {CalendarMixin} from './mixins'

  const {DateTime} = require('luxon')

  export default {
    name: 'CalendarEventDetail',
    props: {
      eventObject: {
        type: Object,
        default: () => {
        }
      },
      eventRef: {
        type: String,
        default: 'cal-' + Math.random().toString(36).substring(2, 15)
      },
      allowEditing: {
        type: Boolean,
        default: false
      },
      fieldColor: {
        type: String,
        default: 'grey-2'
      }
    },
    mixins: [CalendarMixin],
    data() {
      return {
        // 所有的工作类型
        jobTypes: [],
        // 所有的关联项目/产品
        jobPros: [],
        modalIsOpen: false,
        inEditMode: false,
        editEventObject: {},
        startTimeObject: new Date(),
        endTimeObject: new Date()
      }
    },
    watch: {
      eventObject: function (val) {
        debugger
        if (val.startEditNow === true && !this.inEditMode) {
          this.startEditMode()
        }
      }
    },
    computed: {
      dayTitle() {
        return this.formatDate(this.eventObject.start.dateObject, 'yyyy-MM-dd')
      },
      getTopColorClasses: function () {
        return this.addCssColorClasses({
            'ced-top': true,
            'q-pr-md': true,
            'q-py-md': true,
            'relative-position': true
          },
          this.eventObject)
      },
      getEventClass: function () {
        return this.addCssColorClasses(
          {
            'calendar-event': true,
            'calendar-event-month': this.monthStyle
          },
          this.eventObject
        )
      },
      isEditingAllowed: function () {
        // 单条数据可禁止修改
        if (dashHas(this.eventObject, 'allowEditing')) {
          return this.eventObject.allowEditing
        }
        return this.allowEditing
      }
    },
    mounted() {
      this.getSelectOptions()
    },
    methods: {
      __open: function () {
        this.modalIsOpen = true
      },
      __close: function () {
        this.modalIsOpen = false
        this.inEditMode = false
      },
      getSelectOptions() {
        this.$axios
          .get(`/rest/types`)
          .then(({data}) => {
            if (data.hasOwnProperty('success')) {
              console.warn(data.msg)
            } else {
              this.jobTypes = data.map(d => {
                return Object.assign(d, {label: d.alias, value: d.id})
              })
            }
          })
          .catch(err => {
            console.error(err)
          })
        this.$axios
          .get(`/rest/pros`)
          .then(({data}) => {
            if (data.hasOwnProperty('success')) {
              console.warn(data.msg)
            } else {
              this.jobPros = data.map(d => {
                return Object.assign(d, {label: d.name, value: d.id})
              })
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      startEditMode: function () {
        this.editEventObject = this.eventObject
        let dateObj = {}
        if (typeof this.editEventObject.start.dateObject.toJSDate === 'function') {
          dateObj = this.editEventObject.start.dateObject.toJSDate()
        } else {
          dateObj = this.editEventObject.start.dateObject
        }
        this.startTimeObject = dateObj
        if (dashHas(this.editEventObject, 'end.dateObject')) {
          if (typeof this.editEventObject.end.dateObject.toJSDate === 'function') {
            dateObj = this.editEventObject.end.dateObject.toJSDate()
          } else {
            dateObj = this.editEventObject.end.dateObject
          }
          this.endTimeObject = dateObj
        }
        this.inEditMode = true
      },
      // 确认删除?
      openDelConfirm() {
        this.$q.dialog({
          title: '提示',
          message: '确认删除此条记录吗',
          ok: {
            flat: true,
            color: 'secondary',
            label: '确认'
          },
          cancel: {
            flat: true,
            label: '取消',
            color: 'warning'
          }
        }).then(() => {
          this.__del()
        })
      },
      __save: function () {
        let valid = this.validate()
        if (valid.hasOwnProperty('valid')) {
          this.$alert.negative(valid.msg)
          return
        }
        let stepList = ['start', 'end']
        for (let step of stepList) {
          let dateObj = DateTime.fromJSDate(this[step + 'TimeObject'])
          this.editEventObject[step] = {
            dateObject: dateObj,
            dateTime: dateObj.toISO()
          }
          this.editEventObject[step + 'Time'] = dateObj.toISO()
        }
        // 触发修改事件
        this.eventObject = this.editEventObject
        this.$root.$emit(
          'update-event-' + this.eventRef,
          this.eventObject
        )
        this.__close()
      },
      // 触发删除事件
      __del() {
        this.$root.$emit(
          'delete-event-' + this.eventRef,
          this.eventObject
        )
        this.__close()
      },
      // 验证填写的内容是否符合要求
      validate() {
        let title = this.editEventObject.title
        let hasType = this.editEventObject.type.id
        let hasPro = this.editEventObject.project.id
        let content = this.editEventObject.content
        if (title === undefined || title === '') {
          return {
            valid: false,
            msg: '标题不可为空!'
          }
        }
        if (hasType === undefined) {
          return {
            valid: false,
            msg: '选个工作类型吧'
          }
        }

        if (hasPro === undefined) {
          return {
            valid: false,
            msg: '关联一个项目（产品）吧'
          }
        }
        if (content === undefined || content === '') {
          return {
            valid: false,
            msg: '填写一些详细的工作描述'
          }
        }
        return {}
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../css/calendar.vars.styl'

  $forcedLeftMargin = 24px

  .time-field
    width 100px

  .arrow-icon
    width 40px
    height 28px
    min-width 28px
    font-size 40px
    margin-top 10px
    color #979797

  .q-input-target
    font-size .8em !important

  .calendar-event-detail
    .modal-content
      min-width 400px
      min-height 220px
      overflow hidden
    .ced-list-title
      font-size 1em
      max-width 30rem
    .ced-list-subtitle
      font-size .8em
      opacity 0.8
    .ced-top
      /*padding .25em 0 1em*/
      .ced-top-title
        font-size 1.25em
        margin-left $forcedLeftMargin
        .ced-toolbar-edit-spacer
          min-height 1em
          height 1em
      .ced-edit-button-container
        position relative
        .ced-edit-button
          position absolute
          left 8px
          bottom -32px
    .ced-content
      font-size 1em
      .ced-edit-button-content-spacer
        min-height 1em
        height 1em
    .ced-nested-item
      padding-left 0
    .ced-small-inverted-icon
      font-size 20px
      padding 2px
      border-radius 50%
      min-width 24px
      .q-item-icon-inverted
        background lighten($light, 25%)
</style>
