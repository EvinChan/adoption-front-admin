<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="修改机构信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="省份">
                <el-select
                        v-model="form.orgProvince.name"
                        placeholder="请选择省份"
                        filterable
                        @change="provinceChanged">
                    <el-option
                            v-for="item in provinceList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.name"/>
                </el-select>
            </el-form-item>
            <el-form-item label="市">
                <el-select
                        v-model="form.orgCity.name"
                        placeholder="请选择市"
                        filterable>
                    <el-option
                            v-for="item in cityList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.name"/>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.detail"
                          maxlength="100"
                          show-word-limit
                          type="textarea"
                          :rows="4"
                          placeholder="请输入详细地址"
                          auto-complete="off"
                          style="width: 470px;"/>
            </el-form-item>
            <el-form-item label="描述" style="margin-bottom: 0;">
                <tinymce :height="300" v-model="form.desc" v-if="dialogFormVisible"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确认修改</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getOneOrganization, updateOrganizationInfo } from '@/api/organization'
  import { getProvinceList, getCityList } from '@/api/main'
  import Tinymce from '@/components/Tinymce'

  export default {
    name: 'orgUpdateForm',
    components: {
      Tinymce
    },
    data() {
      return {
        dialogFormVisible: false,
        form: {
          detail: '',
          orgProvince: {
            name: ''
          },
          orgCity: {
            name: ''
          }
        },
        provinceList: [],
        cityList: []
      }
    },
    created() {
      this.InitOptionList()
    },
    methods: {
      InitOptionList() {
        getProvinceList().then(result => {
          result.data.provinceInfo.forEach(province => {
            this.provinceList.push(province)
          })
        })
      },
      provinceChanged(label) {
        this.form.orgCity.name = ''
        this.cityList = []
        for (let i = 0; i < this.provinceList.length; i++) {
          if (this.provinceList[i].name === label) {
            getCityList(label).then(result => {
              result.data.cityInfo.forEach(city => {
                this.cityList.push(city)
              })
            })
          }
        }
      },
      saveOrUpdate() {
        if (this.form.orgProvince.name.length === 0) {
          this.$message.error('请选择省份！')
        } else if (this.form.orgCity.name.length === 0) {
          this.$message.error('请选择市！')
        } else if (this.form.detail.length === 0) {
          this.$message.error('请输入详细地址！')
        } else if (this.form.desc.length === 0) {
          this.$message.error('请输入描述！')
        } else {
          updateOrganizationInfo(this.form).then(result => {
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
          getOneOrganization(id).then(result => {
            this.form = result.data.organizationInfo
            this.form.id = id
            const regex = new RegExp('<img', 'gi')
            this.form.desc = this.form.desc.replace(regex, `<img style="max-width: 100%; height: auto"`)
            this.cityList = []
            getCityList(this.form.orgProvince.name).then(result => {
              result.data.cityInfo.forEach(city => {
                this.cityList.push(city)
              })
            })
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.orgProvince.name = ''
        this.form.orgCity.name = ''
        this.form.detail = ''
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
