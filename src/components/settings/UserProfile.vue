<template>
  <q-list class="profile-list q-mt-md" no-border>
    <q-item inset-separator>
      <q-item-side class="profile-label">
        姓名
      </q-item-side>
      <q-item-main :label="user.displayName"/>
    </q-item>
    <q-item inset-separator>
      <q-item-side class="profile-label">
        用户名
      </q-item-side>
      <q-item-main :label="user.name"/>
    </q-item>
    <q-item inset-separator>
      <q-item-side class="profile-label">
        部门
      </q-item-side>
      <q-item-main :label="user.organ.name"/>
    </q-item>
    <q-item inset-separator>
      <q-item-side class="profile-label">
        创建时间
      </q-item-side>
      <q-item-main :label="user.createAt"/>
    </q-item>
    <q-item inset-separator>
      <q-item-side class="profile-label">
        最近更新
      </q-item-side>
      <q-item-main :label="user.updateAt"/>
    </q-item>
    <q-inner-loading :visible="loading">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading>
  </q-list>
</template>

<script>
  export default {
    props: {
      user: Object,
      default: () => ({})
    },
    watch: {
      user: function (newVal) {
        if (newVal.hasOwnProperty('name')) {
          this.loading = false
        }
      }
    },
    data() {
      return {
        loading: true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .profile-list
    width: 30rem
    .profile-label
      font-size .8rem
      width 52px
      text-align right

</style>
