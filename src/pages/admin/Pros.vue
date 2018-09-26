<template>
  <q-page class="q-pa-md">
    <data-table end-point="pro" :columns="columns"/>
  </q-page>
</template>

<script>
  import {DataTable} from '../../components'

  export default {
    components: {
      DataTable
    },
    data: () => ({
      loading: false,
      columns: [
        {
          name: "name",
          required: true,
          label: "项目名称",
          align: "left",
          field: "name",
          sortable: true,
          editable: true
        },
        {
          name: "status",
          required: true,
          label: "项目状态",
          align: "left",
          field: 'status',
          sortable: true,
          format: val => {
            switch (val) {
              case 1:
                return '已暂停'
              case 2:
                return '已完成'
              case 0:
              default:
                return '进行中'
            }
          },
          editable: true,
          type: 'select',
          options: [{label: '进行中', value: 0}, {label: '已暂停', value: 1}, {label: '已完成', value: 2}]
        },
        {
          name: "desc",
          required: true,
          label: "项目描述",
          align: "left",
          field: 'desc',
          editable: true,
          type: 'textarea'
        },
        {
          name: "createAt",
          label: "创建时间",
          align: "left",
          field: "createAt",
          sortable: true
        }
      ]
    }),
    methods: {}
  }
</script>

<style>
</style>
