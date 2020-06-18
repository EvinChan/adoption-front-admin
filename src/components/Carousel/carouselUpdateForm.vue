<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="修改轮播图信息" width="50%" center>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="轮播图">
                <span style="margin-left: 235px;">点击图片修改</span>
                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:3000/admin/uploadCarousel"
                        accept="image/jpeg,image/png"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="form.src" :src="srcBase64" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确认修改</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getOneCarousel, updateCarousel } from '@/api/carousel'

  export default {
    name: 'carouselUpdateForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          src: ''
        },
        srcBase64: ''
      }
    },
    methods: {
      saveOrUpdate() {
        updateCarousel(this.form).then(result => {
          if (result.code === 200) {
            this.dialogFormVisible = false
            this.$message.success('修改成功')
            // 调用父组件监听函数
            this.$emit('onSaveSuccess')
          }
        })
      },
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getOneCarousel(id).then(result => {
            this.form = result.data.carouselInfo
            this.form.id = id
            this.srcBase64 = this.form.src
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.src = ''
      },
      handleAvatarSuccess(res, file) {
        this.srcBase64 = URL.createObjectURL(file.raw)     // base64编码
        this.form.src = res.data.src
      },
      beforeAvatarUpload(file) {
        const isIMAGE = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isIMAGE) {
          this.$message.error('上传文件只能是图片格式！')
          return isIMAGE
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB！')
          return isLt2M
        }
      }
    }
  }
</script>

<style scoped>
    /*头像*/
    .avatar-uploader {
        width: 560px;
        height: 155px;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 560px;
        height: 155px;
        line-height: 560px;
        text-align: center;
        border: 1px solid #eaeaea;
    }

    .avatar {
        width: 560px;
        height: 155px;
        display: block;
    }
</style>
