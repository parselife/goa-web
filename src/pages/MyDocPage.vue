<!--我的文档-->
<template>
  <q-page padding>
    <!-- content -->
    <marked-editor edit-text="# Hello Vue" previewer-only></marked-editor>
  </q-page>
</template>

<script>
  import {MarkedEditor} from '../components'

  export default {
    // name: 'PageName',
    components: {
      MarkedEditor
    }
  }
</script>

<style>
</style>
