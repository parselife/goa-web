<template>
  <q-page padding class="setting-page no-shadow">
    <q-btn-toggle
      v-model="model"
      toggle-color="primary"
      :options="options"
    />
  </q-page>
</template>

<script>
  export default {
    data() {
      return {
        model: 'UserProfile',
        options: [
          {
            label: '基本资料',
            value: 'UserProfile'
          }, {
            label: '修改密码',
            value: 'UserAlter'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .setting-page {
    padding-left: 16rem !important;
    padding-right: 16rem !important;
  }
</style>
