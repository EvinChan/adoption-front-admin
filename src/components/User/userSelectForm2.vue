<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="查看用户信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="用户编号">
                <div class="formText">{{ form.userId }}</div>
            </el-form-item>
            <el-form-item label="用户账号">
                <div class="formText">{{ form.adoptionUser.mobile }}</div>
            </el-form-item>
            <el-form-item label="用户昵称">
                <div class="formText">{{ form.adoptionUser.name }}</div>
            </el-form-item>
            <el-form-item label="身份证号">
                <div class="formText">{{ form.adoptionUser.idcard }}</div>
            </el-form-item>
            <el-form-item label="性别" style="margin-bottom: 0;">
                <div class="formText" v-if="form.adoptionUser.sex === 0">男</div>
                <div class="formText" v-if="form.adoptionUser.sex === 1">女</div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getAdoptionUser } from '@/api/user'

  export default {
    name: 'userSelectForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          userId: '',
          adoptionUser: {
            mobile: '',
            name: '',
            idcard: '',
            sex: ''
          }
        }
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getAdoptionUser(id).then(result => {
            this.form = result.data.userInfo
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.userId = ''
        this.form.adoptionUser.mobile = ''
        this.form.adoptionUser.name = ''
        this.form.adoptionUser.idcard = ''
        this.form.adoptionUser.sex = ''
      }
    }
  }
</script>

<style scoped>
    .formText {
        padding: 0 15px;
    }
</style>
