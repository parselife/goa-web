<!--
markdown 编辑器
-->
<template>
  <div class="editor-wrapper">
    <q-field
      v-if="!previewerOnly"
      :count="20"
      class="title-field q-mb-md"
    >
      <q-input max-length="20" float-label="标题" v-model="title"/>
    </q-field>
    <h5 v-else>{{title}}</h5>
    <div id="editorContainer" />
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
      title: String,
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

  .title-field {
    width: 50%;
    margin: 0 auto
  }

</style>
