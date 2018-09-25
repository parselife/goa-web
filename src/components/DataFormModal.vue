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
          <q-input v-else
                   v-model="item.value"
                   :float-label="item.label"
                   :type="item.type||'text'"/>
        </template>
      </q-card-main>
      <q-card-separator/>
      <q-card-actions class="row justify-center q-ma-sm">
        <q-btn color="primary" label="提交" class="q-mr-md" @click="okHandle"/>
        <q-btn label="取消" @click="opened=false"/>
      </q-card-actions>
    </q-card>
  </q-modal>
</template>

<script>
  export default {
    props: {
      title: String,
      formRef: String
    },
    data() {
      return {
        opened: false,
        fields: []
      }
    },
    methods: {
      change(val) {
        console.log(val)

      },
      _open(fields) {
        this.fields = fields
        this.opened = true
      },
      _close() {
        this.opened = false
      },
      // 组织对象数据 触发事件
      okHandle() {
        let model = {}
        this.fields.forEach(field => {
          let val = field.value
          let name = field.name
          if (val !== undefined && val !== '') {
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
        debugger
        console.log('提交数据: %o', model)
        this.$root.$emit('event-save-' + this.formRef, model)
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
