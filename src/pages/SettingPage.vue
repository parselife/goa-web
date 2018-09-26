<template>
  <q-page padding>
    <q-btn-toggle
      v-model="model"
      toggle-color="primary"
      :options="[
    {label: 'One', value: 'one'},
    {label: 'Two', value: 'two'},
    {label: 'Three', value: 'three'}
  ]"
    />
  </q-page>
</template>

<script>
  export default {
    data() {
      return {
        model: 'one',
        options: [
          {
            label: '',
            value: ''
          }
        ]
      }
    }
  }
</script>

<style>
</style>
