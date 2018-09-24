<template>
  <q-page class="q-pa-md">
    <q-table
     :loading="loading"
    :data="tableData"
    :columns="columns"
    row-key="name"
    hide-bottom
  />
  </q-page>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    columns: [
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: "calcium",
        sortable: true
      },
      {
        name: "organ",
        required: true,
        label: "部门",
        align: "left",
        sortable: true,
        field: row => row.organ.name,
        // format: val => `${val}%`
      }
    ],
    tableData: [
    ]
  }),
  watch: {
    $route: "fetchData"
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.$axios
        .get("/rest/types")
        .then(({ data }) => {
          // todo
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style>
</style>
