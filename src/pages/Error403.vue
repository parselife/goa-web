<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <strong class="q-py-sm">Forbidden!</strong>
    <p class="text-faded q-mt-sm"> 貌似权限不足~ <strong>(403)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >返回主页</q-btn>
  </div>
</template>

<script>
  export default {
    name: 'Error403'
  }
</script>
