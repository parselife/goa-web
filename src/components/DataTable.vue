<template>
  <div class="relative-position">
    <q-table
      :loading="loading"
      :data="tableData"
      :columns="columns"
      :visible-columns="visibleColumns"
      row-key="id"
      :selection="selection"
      :selected.sync="selected"
      hide-bottom
    >
      <!-- 插槽名称语法: body-cell-<column_name> -->
      <q-td slot="body-cell-isAdmin" slot-scope="props" :props="props">
        <q-chip v-if="props.value" dense color="primary" tag>管理员</q-chip>
        <q-chip v-else dense color="grey" tag>普通用户</q-chip>
      </q-td>
      <!--操作按钮-->
      <template slot="top" slot-scope="props">
        <q-btn color="primary" flat round icon="add" @click="openForm"/>
        <q-btn color="primary" flat round icon="edit" @click="openDetail"/>
        <q-btn color="negative" flat round delete icon="delete"
               @click="deleteData"/>
        <div class="col"/>
        <!-- 只有当至少有一行被选中时才会显示 -->
        <div class="q-ml-xl" v-if="selected.length > 0">
          <q-alert
            type="warning"
            :actions="[{ label: '清空', handler: () => { selected=[] } }]"
            class="data-selection"
          >
            已选择 {{ selected.length }} 行数据
          </q-alert>
        </div>
      </template>
    </q-table>
    <data-form-modal :ref="formRef" title="添加用户" :form-ref="formRef"/>
    <q-inner-loading :visible="requestLoading">
      <q-spinner-gears size="50px" color="teal"></q-spinner-gears>
      <span class="q-mt-sm" style="color: #009688">通信中...</span>
    </q-inner-loading>
  </div>
</template>

<script>
  import DataFormModal from './DataFormModal'

  export default {
    components: {
      DataFormModal
    },
    props: {
      // user/pro/type/organ ...
      endPoint: String,
      // 数据列
      columns: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 是否可选
      selection: {
        type: String,
        default: 'single'
      }
    },
    data: () => ({
      loading: false,
      // 选中数据
      selected: [],
      tableData: [],
      // 表单是否打开
      formOpened: false,
      requestLoading: false
    }),
    computed: {
      formRef() {
        return this.endPoint + 'Modal'
      },
      visibleColumns() {
        return this.columns.map(c => {
          return c.visible !== false ? c.name : null
        })
      }
    },
    watch: {
      $route: "fetchData"
    },
    created() {
      this.fetchData();
    },
    mounted() {
      let that = this
      this.$root.$on('event-save-' + this.formRef, function (data) {
        that.$refs[that.formRef]._close()
        that.postData(data)
      })
    },
    methods: {
      fetchData() {
        this.selected = []
        this.loading = true;
        this.$axios
          .get(`/rest/${this.endPoint}s`)
          .then(({data}) => {
            this.loading = false
            if (data.hasOwnProperty('success')) {
              console.warn(data.msg)
            } else {
              this.tableData = data
            }
          })
          .catch(err => {
            this.loading = false
            console.error(err)
          })
      },
      postData(model) {
        this.requestLoading = true
        this.$axios.post(`/rest/${this.endPoint}`, JSON.stringify(model)).then(({data}) => {
          this.requestLoading = false
          if (data.hasOwnProperty('success')) {
            console.warn(data.msg)
          } else {
            this.$alert.positive('提交成功!')
            this.fetchData()
          }
        }).catch(err => {
          this.requestLoading = false
          console.error(err)
        })
      },
      deleteData() {
        if (this.selected.length === 0) {
          this.$alert.warning('至少选择一条数据!')
          return
        }
        let id = this.selected[0].id
        this.requestLoading = true
        this.$axios.delete(`/rest/${this.endPoint}/${id}`)
          .then(({data}) => {
            this.requestLoading = false
            this.$alert.positive('删除成功!')
            this.fetchData()
          })
          .catch(err => {
            console.error(err)
          })
      },
      openForm() {
        // 打开 新建的表单
        this.$refs[this.formRef]._open(this.provideFields())
      },
      openDetail() {
        if (this.selected.length === 0) {
          this.$alert.warning('至少选择一条数据!')
          return
        }
        // 只取第一条选中的数据
        let row = this.selected[0]
        if (row !== undefined) {
          console.log('编辑数据: %o', row)
          this.$refs[this.formRef]._open(this.provideFields(row))
        }
      },
      provideFields(rowData) {
        let editFields = this.columns.filter(c => {
          if (rowData !== undefined && c.name === 'password') {
            return false
          } else
            return c.editable === true
        })
        editFields.forEach(f => {
          if (rowData !== undefined) {
            f.value = rowData[f.name]
          } else {
            f.value = ''
          }
          if (f.hasOwnProperty('options')) {
            f.options = f.options.map(val => {
              return {label: val.label || val.name, value: val.value || val.ID}
            })
          }
        })
        console.log(editFields)
        return editFields
      }
    },

  }
</script>

<style lang="stylus">
  .data-selection
    .q-alert
      box-shadow none !important
      .q-alert-content
        font-size .8em
</style>
