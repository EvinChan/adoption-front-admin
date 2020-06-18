<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="查看地址信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="收货人姓名">
                <div class="formText">{{ form.name }}</div>
            </el-form-item>
            <el-form-item label="收货人号码">
                <div class="formText">{{ form.mobile }}</div>
            </el-form-item>
            <el-form-item label="省份">
                <div class="formText">{{ form.addressProvince.name }}</div>
            </el-form-item>
            <el-form-item label="市">
                <div class="formText">{{ form.addressCity.name }}</div>
            </el-form-item>
            <el-form-item label="详细地址" style="margin-bottom: 0;">
                <div class="formText">{{ form.detail }}</div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getOneAddress } from '@/api/user'

  export default {
    name: 'addressSelectForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          mobile: '',
          detail: '',
          addressProvince: {
            name: ''
          },
          addressCity: {
            name: ' '
          }
        }
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getOneAddress(id).then(result => {
            this.form = result.data.addressInfo
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.name = ''
        this.form.mobile = ''
        this.form.detail = ''
        this.form.addressProvince.name = ''
        this.form.addressCity.name = ''
      }
    }
  }
</script>

<style scoped>
    .formText {
        padding: 0 15px;
    }
</style>
