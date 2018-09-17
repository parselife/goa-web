<!--
主页面
- 显示工时 按  日 周 月 列表等方式展示工时
- 快速切换到今日填写工时
-
-->
<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <q-btn-toggle
        v-model="mode"
        toggle-color="primary"
        :options="options"
      />
      <q-btn icon="date range" class="q-ml-lg q-pl-sm q-pr-sm" outline dense color="primary" size="md" label="今天"/>

      <div class="col q-ml-lg">
        <q-btn icon="keyboard arrow left" outline round size="md" color="primary"></q-btn>
        <q-btn icon="keyboard arrow right" class="q-ml-sm" outline round size="md" color="primary"></q-btn>
      </div>
    </div>

  </q-page>
</template>

<script>
  export default {
    // name: 'PageName',
    data() {
      return {
        mode: 'monthly',
        options: [
          {
            label: '月',
            value: 'monthly'
          },
          {
            label: '周',
            value: 'weekly'
          },
          {
            label: '日',
            value: 'daily'
          }
        ]
      }
    }
  }
</script>

<style>
</style>
