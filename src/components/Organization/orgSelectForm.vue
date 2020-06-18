<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="查看机构信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户账号">
                <div class="formText">{{ form.organizationName.mobile }}</div>
            </el-form-item>
            <el-form-item label="用户昵称">
                <div class="formText">{{ form.organizationName.name }}</div>
            </el-form-item>
            <el-form-item label="省份">
                <div class="formText">{{ form.orgProvince.name }}</div>
            </el-form-item>
            <el-form-item label="市">
                <div class="formText">{{ form.orgCity.name }}</div>
            </el-form-item>
            <el-form-item label="详细地址">
                <div class="formText">{{ form.detail }}</div>
            </el-form-item>
            <el-form-item label="描述" style="margin-bottom: 0;">
                <div class="formText" v-html="form.desc"></div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getOneOrganization } from '@/api/organization'

  export default {
    name: 'orgSelectForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          organizationName: {
            mobile: '',
            name: ''
          },
          orgProvince: {
            name: ''
          },
          orgCity: {
            name: ''
          },
          detail: ''
        }
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getOneOrganization(id).then(result => {
            this.form = result.data.organizationInfo
            const regex = new RegExp('<img', 'gi')
            this.form.desc = this.form.desc.replace(regex, `<img style="max-width: 100%; height: auto"`)
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.organizationName.mobile = ''
        this.form.organizationName.name = ''
        this.form.orgProvince.name = ''
        this.form.orgCity.name = ''
        this.form.detail = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
    .formText {
        padding: 0 15px;
    }
</style>
