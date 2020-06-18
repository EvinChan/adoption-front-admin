<template>
    <el-dialog :visible.sync="dialogFormVisible" title="修改公告信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="公告标题">
                <el-input v-model="form.title"
                          maxlength="50"
                          show-word-limit
                          type="textarea"
                          :rows=2
                          style="width: 470px"/>
            </el-form-item>
            <el-form-item label="公告内容">
                <tinymce :height="300" v-model="form.content" v-if="dialogFormVisible"/>
            </el-form-item>
            <el-form-item label="公告状态" style="margin-bottom: 0;">
                <el-radio-group v-model="form.status">
                    <el-radio :label="0">上线</el-radio>
                    <el-radio :label="1">下线</el-radio>
                </el-radio-group>
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
  import { getOneNotice, updateNotice } from '@/api/notice'

  export default {
    name: 'noticeUpdateForm',
    components: {
      Tinymce
    },
    data() {
      return {
        dialogFormVisible: false,
        form: {
          title: '',
          content: '',
          status: ''
        },
      }
    },
    methods: {
      saveOrUpdate() {
        if (this.form.title.length === 0) {
          this.$message.error('请输入公告标题！')
        } else if (this.form.content.length === 0) {
          this.$message.error('请输入公告内容！')
        } else {
          updateNotice(this.form).then(result => {
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
          getOneNotice(id).then(result => {
            this.form = result.data.noticeInfo
            this.form.id = id
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.title = ''
        this.form.content = ''
        this.form.status = ''
      }
    }
  }
</script>

<style scoped>
    /*富文本*/
    .tinymce-container {
        position: relative;
        line-height: normal;
        width: 470px;
    }
</style>
