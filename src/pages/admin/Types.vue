<template>
  <q-page class="q-pa-md">
    <data-table end-point="type" :columns="columns"/>
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
          label: "名称",
          align: "left",
          field: "name",
          sortable: true,
          editable: true
        },
        {
          name: "alias",
          required: true,
          label: "别名",
          align: "left",
          field: "alias",
          editable: true
        },
        {
          name: "desc",
          required: true,
          label: "描述",
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
