<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="查看用户信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="用户账号">
                <div class="formText">{{ form.mobile }}</div>
            </el-form-item>
            <el-form-item label="用户昵称">
                <div class="formText">{{ form.name }}</div>
            </el-form-item>
            <el-form-item label="身份证号">
                <div class="formText" v-if="form.idcard">{{ form.idcard }}</div>
                <div class="formText" v-else>未知</div>
            </el-form-item>
            <el-form-item label="性别">
                <div class="formText" v-if="form.sex === 0">男</div>
                <div class="formText" v-if="form.sex === 1">女</div>
            </el-form-item>
            <el-form-item label="头像">
                <img :src="form.heading" class="avatar">
            </el-form-item>
            <el-form-item label="是否机构" style="margin-bottom: 0;">
                <div class="formText" v-if="form.isOrg === 0">否</div>
                <div class="formText" v-if="form.isOrg === 1">是</div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getOneUser } from '@/api/user'

  export default {
    name: 'userSelectForm1',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          mobile: '',
          name: '',
          idcard: '',
          sex: '',
          heading: '',
          isOrg: ''
        }
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getOneUser(id).then(result => {
            this.form = result.data.userInfo
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.mobile = ''
        this.form.name = ''
        this.form.idcard = ''
        this.form.sex = ''
        this.form.heading = ''
        this.form.isOrg = ''
      }
    }
  }
</script>

<style scoped>
    /*头像*/
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .formText {
        padding: 0 15px;
    }
</style>
