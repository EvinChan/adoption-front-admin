<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <el-upload
        ref="upload"
        :multiple="true"
        :file-list="fileList"
        :limit="5"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :on-exceed = "handleExceed"
        class="editor-slide-upload"
        accept=".jpg,.png"
        :action="BASE_API +'/user/tinymceUpload'"
        list-type="picture-card">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      BASE_API: 'http://localhost:3000',
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },

    handleExceed(){
      this.$message.error('最多只能上传 5 张图片！')
    },

    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      // this.listObj = {}
      // this.fileList = []
      this.dialogVisible = false
    },

    handleSuccess(response,file) {

      //图片转base64
      let reader = new FileReader();
      reader.readAsDataURL(file.raw)
      reader.onload = () => {
        file.url = reader.result
        const uid = file.uid
        const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            this.listObj[objKeyArr[i]].url = file.url
            this.listObj[objKeyArr[i]].hasSuccess = true
            return
          }
        }
      }
    },

    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },

    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isPIC = (isJPG || isPNG)

      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB！');
        return isLt1M
      }

      if (!isPIC) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式！');
        return isPIC
      }

      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style scoped>
  .editor-slide-upload {
    margin-bottom: 20px;
  }
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
</style>
