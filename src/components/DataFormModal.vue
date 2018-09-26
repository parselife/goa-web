<template>
  <q-modal v-model="opened"
           no-backdrop-dismiss
           @escape-key="opened=false" class="form-modal">
    <q-card class="no-shadow form-card">
      <q-card-title>
        {{title}}
      </q-card-title>
      <q-card-separator/>
      <q-card-main class="q-mb-md q-px-sm">
        <template v-for="item in fields">
          <q-select v-if="item.type==='select'"
                    v-model="item.value"
                    @change="change"
                    :float-label="item.label"
                    :options="item.options"
          />
          <q-input
            v-else-if="item.type==='textarea'"
            v-model.trim="item.value"
            type="textarea"
            :max-height="100"
            rows="2"
            :float-label="item.label"
            class="no-shadow"/>
          <q-input v-else
                   v-model.trim="item.value"
                   :float-label="item.label"
                   :type="item.type||'text'"/>
        </template>
      </q-card-main>
      <!--<q-card-separator/>-->
      <q-card-actions class="row justify-center q-ma-sm">
        <q-btn color="primary" label="提交" class="q-mr-md" @click="okHandle"/>
        <q-btn label="取消" @click="opened=false"/>
      </q-card-actions>
    </q-card>
  </q-modal>
</template>

<script>
  const needValidateFieldNames = ['name', 'password', 'displayName', 'alias']

  export default {
    props: {
      title: String,
      formRef: String
    },
    data() {
      return {
        opened: false,
        fields: [],
        primaryKey: undefined
      }
    },
    methods: {
      change(val) {
        console.log(val)

      },
      _open(fields, pk) {
        this.fields = fields
        this.primaryKey = pk
        this.opened = true
      },
      _close() {
        this.opened = false
      },
      /**
       * 组织对象数据 触发事件
       */
      okHandle() {
        let model = {}
        let isValid = true
        this.fields.forEach(field => {
          let val = field.value
          let name = field.name
          isValid = isValid && this.validate(field)
          if (isValid && val !== '') {
            let tmp = name.split(".")
            if (tmp.length === 1) {
              model[tmp[0]] = val
            } else {
              let t = {}
              t[tmp[0]] = {}
              t[tmp[0]][tmp[1]] = val
              Object.assign(model, t)
            }
          }
        })
        if (isValid) {
          if (this.primaryKey !== undefined) {
            model.id = this.primaryKey
          }
          console.log('提交数据: %o', model)
          this.$root.$emit('event-save-' + this.formRef, model)
        }
      },
      /**
       * 非空字段简单验证
       */
      validate(f) {
        let fName = f.name
        let fVal = f.value
        let fLbl = f.label
        if (needValidateFieldNames.findIndex(n => n === fName) > -1) {
          if (fVal === undefined || fVal === '') {
            this.$alert.negative(`${fLbl} 不可为空!`)
            return false
          }
        }
        return true
      }
    }
  }
</script>

<style lang="stylus">
  .form-modal
    .q-card-container
      padding .5rem 1rem
      overflow hidden

</style>
