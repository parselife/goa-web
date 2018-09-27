<template>
  <div class="alter-wrapper">
    <q-field
      icon="lock_open"
      class="q-mt-lg"
      label="当前密码"
      label-width="2"
      :error-label="oldPwd.$errorMsg">
      <q-input
        no-pass-toggle
        v-model="oldPwd.value"
        @blur="touch(oldPwd)"
        :error="oldPwd.$error"
        type="password"/>
    </q-field>
    <q-field
      icon="lock"
      class="q-mt-lg"
      label="新密码"
      label-width="2"
      :error-label="newPwd.$errorMsg"
      helper="密码长度不少于6位">
      <q-input
        v-model="newPwd.value"
        @blur="touch(newPwd)"
        :error="newPwd.$error"
        type="password"/>
    </q-field>
    <q-field
      icon="lock"
      class="q-mt-lg"
      label="确认密码"
      label-width="2"
      :error-label="repeatNewPassword.$errorMsg">
      <q-input
        no-pass-toggle
        v-model="repeatNewPassword.value"
        @blur="touch(repeatNewPassword)"
        :error="repeatNewPassword.$error"
        type="password"/>
    </q-field>
    <div class="text-center">
      <q-btn icon="done" color="primary" outline class="q-mt-xl q-mx-xl" style="width: 15rem" @click="submit">
        确认
      </q-btn>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      user: Object
    },
    data() {
      return {
        notNullLbl: '该信息不能为空',
        lengthErrorLbl: '密码长度不能少于 6 位',
        repeatErrorLbl: '两次密码输入不一致',
        oldPwd: {
          value: ''
        },
        newPwd: {
          value: ''
        },
        repeatNewPassword: {
          value: ''
        },
        allValid: true
      }
    },
    methods: {
      touch(obj) {
        let valid = true
        if (obj.value === '') {
          this.$set(obj, '$error', true)
          this.$set(obj, '$errorMsg', this.notNullLbl)
          valid = false
        } else {
          // 验证新密码长度
          if (obj === this.newPwd) {
            if (obj.value.length < 6) {
              this.$set(obj, '$error', true)
              this.$set(obj, '$errorMsg', this.lengthErrorLbl)
              valid = false
            }
          } else if (obj === this.repeatNewPassword && obj.value != this.newPwd.value) {
            this.$set(obj, '$error', true)
            this.$set(obj, '$errorMsg', this.repeatErrorLbl)
            valid = false
          }
        }
        if (valid === true) {
          this.$set(obj, '$error', false)
          this.$delete(obj, '$errorMsg')
        }

        this.allValid = this.allValid && valid
      },
      submit() {
        if (this.allValid && this.newPwd.value !== '') {
          // 通过所有验证后 请求后台接口
          this.$axios.get('/user/alter', {
            params: {oldPwd: this.oldPwd.value, newPwd: this.newPwd.value}
          }).then(({data}) => {
            if (data.hasOwnProperty('success')) {
              this.$alert.negative(data.msg)
              return
            }
            this.$alert.positive("修改成功,下次登录生效")
          }).catch(err => {
            console.error(err)
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .alter-wrapper
    width 30rem
</style>
