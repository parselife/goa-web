<!--
markdown 编辑器
-->
<template>
  <div class="editor-wrapper">
    <div id="editorContainer"></div>
    <div class="editor-opt text-center q-mt-md" v-if="!previewerOnly">
      <q-btn label="保存" color="primary" @click="save"></q-btn>
    </div>
  </div>
</template>

<script>
  import * as Editor from 'tui-editor'
  import 'tui-editor/dist/tui-editor-extChart'
  import 'tui-editor/dist/tui-editor-extTable'
  import 'tui-editor/dist/tui-editor-extScrollSync'

  export default {
    props: {
      editText: String,
      previewerOnly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        editor: {},
        // 编辑模式参数
        editOptions: {
          initialEditType: 'markdown',
          previewStyle: 'vertical',
          exts: ['chart', 'table', 'scrollSync'],
        }
      }
    },
    created() {

    },
    mounted() {
      this.editor = Editor.factory(Object.assign({
        el: document.querySelector('#editorContainer'),
        language: 'zh',
        initialValue: this.editText,
        height: '80vh',
        usageStatistics: false
      }, this.previewerOnly ? {viewer: true} : this.editOptions));
    },
    methods: {
      save() {
        // todo
        console.log(this.editor.getMarkdown())
      }
    }
  }
</script>

<style scoped>
  @import "../css/codemirror.css";
  @import "~tui-editor/dist/tui-editor.css";
  @import "~tui-editor/dist/tui-editor-contents.css";

  .editor-wrapper {
    width: 100%;
  }

</style>
