<template>
  <q-page class="q-pa-md">
    <data-table :columns="columns" end-point="job" selection="none" :hide-top="true" :show-search="true"></data-table>
  </q-page>
</template>

<script>
  import {DataTable} from '../../components'

  const {DateTime} = require('luxon')

  export default {
    components: {
      DataTable
    },
    data: () => ({
      columns: [
        {
          name: "user.displayName",
          label: "姓名",
          align: "left",
          field: row => row.user.displayName,
          sortable: true
        },
        {
          name: "organ",
          label: "部门",
          align: "left",
          field: row => row.user.organ.name,
          sortable: true
        },
        {
          name: "jobType",
          label: "类型",
          align: "left",
          field: row => row.type.alias
        },
        {
          name: "jobProject",
          label: "关联项目",
          align: "left",
          field: row => row.project.name
        },
        {
          name: "title",
          label: "标题",
          align: "left",
          field: 'title'
        },
        {
          name: "start",
          label: "开始时间",
          align: "left",
          field: 'startTime',
          sortable: true,
          format: val => {
            let dateObject = DateTime.fromJSDate(new Date(val))
            return dateObject.toFormat('yyyy-MM-dd HH:mm:ss')
          }
        },
        {
          name: "end",
          label: "结束时间",
          align: "left",
          field: 'endTime',
          sortable: true,
          format: val => {
            let dateObject = DateTime.fromJSDate(new Date(val))
            return dateObject.toFormat('yyyy-MM-dd HH:mm:ss')
          }
        },
        {
          name: "content",
          label: "详细内容",
          align: "left",
          field: 'content'
        }, {
          name: "updateAt",
          label: "最近更新",
          align: "left",
          field: 'updateAt',
          sortable: true
        }
      ]

    })
  }
</script>

<style>
</style>
