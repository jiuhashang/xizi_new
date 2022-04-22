<template>
  <image-upload
    :file-list="fileListArr"
    :limit="limit"
    :multiple="multiple"
    :disabled="disabled"
    @change="handleChange"
  />
</template>
<script>
import ImageUpload from './index.vue'
import Emitter from 'element-ui/src/mixins/emitter'

export default {
  components: {
    ImageUpload
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
  created() {
    if (this.fileList) {
      this.fileListArr = this.fileList ? this.fileList.split(',') : []
      this.fileArrStrFromChild = this.fileList
    }
  },
  methods: {
    handleChange(fileArr) {
      const str = fileArr.filter(v => !!v).map(({ url }) => url).join(',')
      this.fileArrStrFromChild = str
      this.$emit('change', str)
      this.dispatch('ElFormItem', 'el.form.change', [str])
    }
  }
}
</script>
