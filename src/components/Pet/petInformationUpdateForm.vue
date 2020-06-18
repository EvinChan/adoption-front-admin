<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="修改宠物详细信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="详细图片">
                <span style="margin-left: 40px;">点击图片修改</span>
                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:3000/admin/uploadHeading"
                        accept="image/jpeg,image/png"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="form.petInformation.imageSrc" :src="imageSrcBase64" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="宠物描述" style="margin-bottom: 0;">
                <tinymce :height="300" v-model="form.petInformation.petDesc" v-if="dialogFormVisible"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确认修改</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import { getOnePetInformation, updatePetInformation } from '@/api/pet'

  export default {
    name: 'petInformationUpdateForm',
    components: {
      Tinymce
    },
    data() {
      return {
        dialogFormVisible: false,
        form: {
          petInformation: {
            imageSrc: '',
            petDesc: ''
          }
        },
        imageSrcBase64: ''
      }
    },
    methods: {
      saveOrUpdate() {
        if (this.form.petInformation.petDesc.length === 0) {
          this.$message.error('请输入宠物描述！')
        } else {
          updatePetInformation(this.form).then(result => {
            if (result.code === 200) {
              this.dialogFormVisible = false
              this.$message.success('修改成功')
              // 调用父组件监听函数
              this.$emit('onSaveSuccess')
            }
          })
        }
      },
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getOnePetInformation(id).then(result => {
            this.form = result.data.petInfo
            this.form.id = id
            this.imageSrcBase64 = this.form.petInformation.imageSrc
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.petInformation.imageSrc = ''
        this.form.petInformation.petDesc = ''
      },
      handleAvatarSuccess(res, file) {
        this.imageSrcBase64 = URL.createObjectURL(file.raw)     // base64编码
        this.form.petInformation.imageSrc = res.data.heading
      },
      beforeAvatarUpload(file) {
        const isIMAGE = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isIMAGE) {
          this.$message.error('上传文件只能是图片格式！');
          return isLt1M
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB！');
          return  isLt1M
        }
      }
    }
  }
</script>

<style scoped>
    /*头像*/
    .avatar-uploader {
        width: 178px;
        height: 178px;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px solid #eaeaea;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    /*富文本*/
    .tinymce-container {
        position: relative;
        line-height: normal;
        width: 470px;
    }
</style>
