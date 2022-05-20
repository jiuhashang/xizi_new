<template>
  <!-- 图片上传组件 -->
  <div class="custom-upload-images">
    <el-upload
      ref="imageUpload"
      :action="uploadUrl"
      :on-preview="handlePictureCardPreview"
      :before-remove="beforeRemove"
      :on-remove="(file,filelist)=>{return handleImgRemove(file,filelist)}"
      :on-success="(res,file,filelist)=>{return uploadSuccess(res,file,filelist)}"
      :on-exceed="exceed"
      :on-change="change"
      :on-error="handleError"
      :limit="limit"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      :show-file-list="showFileList"
      :data="data"
      :style="{
        '--width': width,
        '--height': height,
        '--margin': margin
      }"
      :file-list="files"
      :headers="headers"
      list-type="picture-card"
      :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
    >
      <img
        :src="dialogImageUrl"
        width="100%"
        alt="图片获取失败..."
        class="visibleImg"
      >
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import nth from 'lodash/nth'
import split from 'lodash/split'
import { Message } from 'element-ui'

export default {
  props: {
    // 图片上传的接口地址
    action: {
      type: String,
      // default: process.env.VUE_APP_BASE_API + '/huawei/uploadFile'
      default: 'http://123.60.52.140:7800/huawei/uploadFile'
    },
    // 组件是否可编辑
    disabled: {
      type: Boolean,
      default: false
    },

    // 组件是否支持多选上传(默认不支持)
    multiple: {
      type: Boolean,
      default: false
    },

    // 上传图片的数量限制
    limit: {
      type: Number,
      default: 1
    },

    // 允许上传的文件类型
    accept: {
      type: String,
      default: '.jpg,.png,.jpeg,.webp'
    },

    // 上传按钮的宽度
    width: {
      type: String,
      default: '100px'
    },

    // 上传按钮的高度
    height: {
      type: String,
      default: '100px'
    },

    // 文件缩略图列表(该数组的每一项只能是字符串或者对象)
    fileList: {
      type: [Array, String],
      default() {
        return []
      }
    },

    // 如果fileList有数组项是对象则指定对象的一个属性作为文件对象url属性值(默认是该对象的url属性表示文件路径)
    fileKey: {
      type: String,
      default: 'url'
    },

    // 组件每张图片的margin值
    margin: {
      type: String,
      default: '0px 8px 8px 0px'
    },

    showFileList: {
      type: Boolean,
      default: true
    },

    // 上传额外带的参数
    data: {
      type: Object,
      default() {
        return {
          'priFix': 'adminImage'
        }
      }
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_IMAGE_URL,
      headers: {
        'token': getToken()
      }, // 上传的请求头部
      dialogImageUrl: '', // 当前查看图片的路径
      dialogVisible: false, // 图片查看框的显示状态
      currentList: [] // 已上传的文件
    }
  },
  computed: {
    // 计算组件需要展示的文件缩略图列表数据
    files() {
      // 缩略图列表
      const files = []

      // 如果父组件没有传入缩略图列表数据
      if (this.fileList.length === 0) {
        return []
      }

      // 如果父组件没有传入缩略图列表数据
      if (typeof (this.fileList) === 'string' && this.fileList === '') {
        return []
      }

      // 若父组件传入了一个字符串作为缩略图列表的显示数据
      if (typeof (this.fileList) === 'string') {
        // 判断该字符串是否是由多张图片的地址拼接而成
        if (this.fileList.includes(',')) {
          const fileList = this.fileList.split(',')
          for (const file of fileList) {
            files.push(this.pathToFile(file))
          }
          return files
        } else {
          // 将其作为数组项加入数组并直接返回结果
          files.push(this.pathToFile(this.fileList))
          return files
        }
      }

      // 若父组件传入缩略图列表的显示数据是一个数组
      for (let item of this.fileList) {
        // 判断传入的数组每一项是否是一个字符串
        if (typeof (item) === 'string') {
          // 将字符串转成数组(处理/单个数组项/为多张图片的地址拼接,并以逗号分隔的字符串/的情况)
          item = item.split(',')
          for (const file of item) {
            files.push(this.pathToFile(file))
          }
        } else if (typeof (item) === 'object') {
          // 如果数组的每一项是对象,则指定对象的一个属性作为文件对象url属性值
          files.push(this.pathToFile(item[this.fileKey]))
        } else {
          const error = new Error()
          // 数组中某些项的数据类型不正确(既不是String也不是Object)
          error.message = 'Incorrect data type for some items in the array!'
          throw (error)
        }
      }
      return files
    },

    // 已上传的文件数量
    listLength() {
      return this.currentList.length
    },

    // 初始的文件数量
    filesLength() {
      // console.log(this.files)
      return this.files.length
    },

    // 图片上传的接口地址
    uploadUrl() {
      return this.action || `${this.baseUrl}`
    }
  },
  watch: {
    // 监听当前已上传文件的数量是否超过限制数量(控制上传按钮的显示和隐藏)
    listLength: {
      handler(nv, ov) {
        if (nv < this.limit) {
          this.$nextTick(() => {
            this.showPictureCardUpload()
          })
        } else {
          this.$nextTick(() => {
            this.hidePictureCardUpload()
          })
        }
      },
      immediate: true,
      deep: true
    },

    // 监听组件初始文件的数量是否超过限制数量(控制上传按钮的显示和隐藏)
    filesLength: {
      handler(nv, ov) {
        if (nv < this.limit) {
          this.$nextTick(() => {
            this.showPictureCardUpload()
          })
        } else {
          this.$nextTick(() => {
            this.hidePictureCardUpload()
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleError(errInfo, file, fileList) {
      // console.log(err, file, fileList)
      Message({
        type: 'error',
        message: `${file.name}上传失败，请稍后再试`
      })
    },
    // 查看已选图片
    handlePictureCardPreview(file) {
      // 查看图片的路径(file.response也能显示，url是文件的本地路径，response是上传服务器之后接口返回的线上地址)
      this.dialogImageUrl = file.url
      // 显示图片查看框
      this.dialogVisible = true
    },

    // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
    beforeRemove(file, fileList) {
      if (file && file.status === 'success') {
        // 成功时候的方法
        return this.$confirm(`确定移除 ${file.name}？`)
      }
    },

    beforeAvatarUpload(file) {
      // console.log(file)
      const isLt10M = file.size / 1024 / 1024 <= 10

      if (!isLt10M) {
        this.$message({
          message: '上传文件大小不能超过10MB!',
          type: 'warning'
        })
      }
      return isLt10M
    },

    // 文件列表移除文件时的钩子
    handleImgRemove(file, filelist) {
      // 更新已上传的文件列表
      this.currentList = filelist
      // 通过数组对象的静态方法"from"得到剩余图片的线上地址(response)组成的数组
      let array = Array.from(filelist, ({ response }) => response)
      // response为接口返回的响应体对象时,从响应体中取出图片地址再组成数组(若接口直接返回图片地址可注释此处代码)
      array = Array.from(array, ({ data }) => data)
      // file:删除的文件对象; filelist:删除完成之后剩下的文件列表(删完了就是个空数组)
      this.$emit('remove', array, file, filelist)
      // 同时触发自定义的change事件
      this.$emit('change', array, file, filelist)
    },

    // 上传成功
    uploadSuccess(res, file, filelist) {
      // 更新已上传的文件列表
      this.currentList = filelist
      // 通过数组对象的静态方法"from"得到所有图片的线上地址(response)组成的数组
      let array = Array.from(filelist, ({ response }) => response)
      // response为接口返回的响应体对象时,从响应体中取出图片地址再组成数组(若接口直接返回图片地址可注释此处代码)
      array = Array.from(array, (response) => response?.data)
      // res:后端接口的返回值; file:上传的文件对象; filelist:上传完成之后的文件列表
      this.$emit('success', array, res, file, filelist)
      // 同时触发自定义的change事件
      this.$emit('change', array, file, filelist)
    },

    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    change(file, filelist) {
      // console.log(file, filelist)
    },

    // 上传文件超出个数限制时的钩子
    exceed(files, filelist) {
      this.$message.warning(`最多上传${this.limit}张图片`)
    },

    // 隐藏上传按钮
    hidePictureCardUpload() {
      const nodes = this.$refs.imageUpload.$el.childNodes
      const length = nodes.length
      nodes[length - 1].style.display = 'none'
    },

    // 显示上传按钮
    showPictureCardUpload() {
      const nodes = this.$refs.imageUpload.$el.childNodes
      const length = nodes.length
      nodes[length - 1].style.display = 'inline-flex'
    },

    // 将文件路径字符串转为文件对象
    pathToFile(str) {
      let file = {}
      // 使用lodash.js提供的方法获取文件名
      const fileFullName = nth(split(str, '/'), -1)
      // 反解析文件名
      let fileName = decodeURIComponent(nth(split(fileFullName, '.')))
      fileName = fileName.replace(new RegExp(`^${this.data.preFix}\/[0-9]{13}`), '')
      // 截取文件后缀
      const fileSuffix = nth(split(fileFullName, '.'), -1)
      file = {
        url: str,
        response: { 'data': { name: fileName, url: str }},
        name: `${fileName}.${fileSuffix}`,
        status: 'success'
      }
      return file
    }
  }
}
</script>

<style lang="scss" scoped deep>
  .custom-upload-images {

    ::v-deep .el-upload {
      justify-content: center;
      align-items: center;
      width: var(--width);
      height: var(--height);
      line-height: var(--height);
      box-sizing: border-box;
      margin: var(--margin);
    }

    ::v-deep .el-upload-list__item {
      width: var(--width);
      height: var(--height);
      line-height: var(--height);
    }

    /* -- 上传成功后右上角小图标样式(status-label-start) -- */
    .el-upload-list__item-status-label {
      position: relative;
    }

    ::v-deep.el-icon-upload-success {
      position: absolute;
      top: 0%;
      left: 40%;
      transform: rotate(-45deg);
    }
    /* -- status-label-end -- */

    .visibleImg {
      font-size: 16px;
      color: #999999;
    }
  }
</style>
