<template>
  <div class="custom-upload-files" :class="required ? 'custom-upload-files-required': ''">
    <slot />
    <el-button class="fake-btn" type="primary" size="mini" @click.prevent.stop="handleClick">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    <file-upload
      ref="fileUploader"
      :file-list="fileListArr"
      :limit="limit"
      :multiple="multiple"
      :disabled="disabled"
      :accept="accept"
      @change="handleChange"
      @success="handleSuccess"
    />
  </div>
</template>
<script>
import FileUpload from './index.vue'
import Emitter from 'element-ui/src/mixins/emitter'

export default {
  components: {
    FileUpload
  },
  mixins: [Emitter],
  model: {
    prop: 'fileList',
    event: 'change'
  },
  props: {
    fileList: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 组件是否支持多选上传(默认不支持)
    multiple: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: '上传'
    },
    accept: {
      type: String,
      default: '.*'
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileArrStrFromChild: '',
      fileListArr: []
    }
  },
  watch: {
    fileList(newVal) {
      if (newVal !== this.fileArrStrFromChild) {
        this.fileListArr = newVal ? newVal.split(',') : []
      }
    }
  },
  methods: {
    handleChange(fileArr) {
      const str = fileArr.filter(v => !!v).map(({ url }) => url).join(',')
      this.fileArrStrFromChild = str
      this.$emit('change', str)
      this.dispatch('ElFormItem', 'el.form.change', [str])
    },
    handleClick() {
      this.$refs.fileUploader.$refs.imageUpload.$el.querySelector('.el-upload__input').click()
    }
  }
}
</script>

<style lang="scss" scoped deep>
  /deep/ .el-upload-list__item .el-icon-close-tip {
    display: none !important;
  }
  .custom-upload-files {
    
    .fake-btn {
      position: relative;
      z-index: 2;
    }

    &.custom-upload-files-required:before {
      content: '*';
      color: #F56C6C;
      margin-right: 4px;
    }

    ::v-deep .el-upload {
      display: none;
    }

    ::v-deep .el-upload-list {
      min-width: 50%;
      max-width: 400px;
      flex-direction: column;
      // margin-left: 20px;

      .el-upload-list__item:first-child {
        margin-top: 0;
      }
    }
  }
  
</style>
