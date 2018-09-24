<template>
  <q-page class="row q-pa-sm">
    <q-list no-border link class="col-2">
      <q-item to="/admin/users">
        <q-item-side icon="school" />
        <q-item-main label="用户管理"/>
      </q-item>
      <q-item to="/admin/organs">
        <q-item-side icon="school" />
        <q-item-main label="部门管理"/>
      </q-item>
      <q-item to="/admin/pros">
        <q-item-side icon="school" />
        <q-item-main label="项目管理"/>
      </q-item>
      <q-item to="/admin/types">
        <q-item-side icon="school" />
        <q-item-main label="类型管理"/>
      </q-item>
      <q-item to="/admin/joblogs">
        <q-item-side icon="record_voice_over" />
        <q-item-main label="工时查看"/>
      </q-item>
    </q-list>
    <router-view class="col-10">
    </router-view>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>

<style>
</style>
