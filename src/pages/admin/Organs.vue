<template>
  <q-page class="q-pa-md">
    <data-table end-point="organ" :columns="columns"/>
  </q-page>
</template>

<script>
  import {DataTable} from '../../components'

  export default {
    components: {
      DataTable
    },
    data: () => ({
      users: [],
      columns: [
        {
          name: "name",
          required: true,
          label: "部门名称",
          align: "left",
          field: "name",
          sortable: true,
          editable: true
        },
        {
          name: "manager",
          required: true,
          label: "部门主管",
          align: "left",
          field: "head",
          editable: true,
          type: 'select',
          options: []
        },
        {
          name: "desc",
          required: true,
          label: "职责描述",
          align: "left",
          field: 'desc',
          editable: true,
          type: 'textarea'
        }
      ]
    }),
    mounted() {
      this.$axios.get('/rest/users').then(({data}) => {
        this.columns.find(f => f.name === 'manager').options = data
      })
    },
    methods: {}
  }
</script>

<style>
</style>
