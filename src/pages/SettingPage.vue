<template>
  <q-page padding class="setting-page">
    <q-btn-toggle
      v-model="model"
      toggle-color="primary"
      :options="options"
    />
    <keep-alive>
      <component :is="model" :user="loginUser"></component>
    </keep-alive>
  </q-page>
</template>

<script>
  import * as coms from '../components/settings'

  export default {
    components: {
      ...coms
    },
    computed: {},
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
        ],
        loginUser: {}
      }
    },
    watch: {
      '$route': 'fecthUser'
    },
    created() {
      this.fetchUser()
    },
    methods: {
      fetchUser() {
        this.$axios.get('/user/me').then(({data}) => {
          if (data.hasOwnProperty('success')) {
            console.warn('get user error: %s', data.msg)
            return
          }
          this.loginUser = data
        }).catch(err => {
          console.error('get user error: %o', err)
        })
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
