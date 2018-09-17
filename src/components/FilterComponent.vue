<!--工时筛选
- 按类型筛选 eg 编码/设计/开会 等
- 按项目筛选 eg 学校系统（后期会读取禅道的接口直接获取到 项目）
-->
<template>
  <div>
    <q-list no-border link>
      <q-list-header>类型标记</q-list-header>
      <!--<q-item-separator></q-item-separator>-->
      <q-item to="/docs">
        <q-item-side icon="school" />
        <q-item-main label="Docs"/>
      </q-item>
      <q-item to="/forum">
        <q-item-side icon="record_voice_over" />
        <q-item-main label="Forum"/>
      </q-item>
      <q-item to="/chat">
        <q-item-side icon="chat" />
        <q-item-main label="Discord Chat Channel" />
      </q-item>
      <q-item to="/twitter">
        <q-item-side icon="rss feed" />
        <q-item-main label="Twitter" />
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>

<style>
</style>
