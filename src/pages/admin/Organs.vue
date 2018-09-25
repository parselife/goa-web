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
    methods: {}
  }
</script>

<style>
</style>
