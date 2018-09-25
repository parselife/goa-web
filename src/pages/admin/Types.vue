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
          label: "工作类型",
          align: "left",
          field: "alias",
          sortable: true
        },
        {
          name: "desc",
          required: true,
          label: "工作描述",
          align: "left",
          field: 'desc'
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
