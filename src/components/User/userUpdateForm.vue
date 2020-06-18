<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="修改用户信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="用户状态">
                <el-radio-group v-model="form.status" style="margin-bottom: 0;">
                    <el-radio :label="0">正常</el-radio>
                    <el-radio :label="1">禁止登录</el-radio>
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
  import { getOneUser, updateUser } from '@/api/user'

  export default {
    name: 'userUpdateForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          status: ''
        }
      }
    },
    methods: {
      saveOrUpdate() {
          updateUser(this.form).then(result => {
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
          getOneUser(id).then(result => {
            this.form = result.data.userInfo
            this.form.id = id
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.status = ''
      }
    }
  }
</script>

<style scoped>

</style>
