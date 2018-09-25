<template>
  <q-page class="q-pa-md">
    <data-table :columns="columns" end-point="user"></data-table>
  </q-page>
</template>

<script>
  import {DataTable} from '../../components'

  export default {
    components: {
      DataTable
    },
    data: () => ({
      columns: [
        {
          name: "name",
          label: "用户名",
          align: "left",
          field: "name",
          sortable: true,
          editable: true
        },
        {
          name: "displayName",
          label: "姓名",
          align: "left",
          field: "displayName",
          editable: true
        },
        {
          name: "password",
          label: "密码",
          align: "left",
          field: "password",
          editable: true,
          type: 'password',
          visible: false
        },
        {
          name: "organ.id",
          label: "部门",
          align: "left",
          sortable: true,
          field: row => row.organ.name,
          editable: true,
          type: 'select',
          options: []
        },
        {
          name: "isAdmin",
          label: "角色",
          align: "left",
          field: 'isAdmin'
        },
        {
          name: "updateAt",
          label: "更新时间",
          align: "left",
          field: "updateAt",
          sortable: true
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
    mounted() {
      this.$axios.get('/rest/organs').then(({data}) => {
        this.columns.find(f => f.name === 'organ.id').options = data
      })
    },
    methods: {}
  }
</script>

<style>
</style>
