<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="修改宠物基础信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="宠物昵称">
                <el-input v-model="form.name" maxlength="10" style="width: 407.6px"/>
            </el-form-item>
            <el-form-item label="品种">
                <el-select
                        v-model="form.category.classification.name"
                        placeholder="请选择宠物分类"
                        filterable
                        @change="classificationChanged">
                    <el-option
                            v-for="item in classificationList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"/>
                </el-select>
                <el-select
                        v-model="form.category.name"
                        placeholder="请选择宠物品种"
                        filterable>
                    <el-option
                            v-for="item in categoryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"/>
                </el-select>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio :label="0">公</el-radio>
                    <el-radio :label="1">母</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄">
                <el-select
                        v-model="form.age"
                        placeholder="请选择年龄"
                        filterable>
                    <el-option
                            v-for="item in ageList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="体重(kg)">
                <el-input v-model="form.weight" maxlength="5"/>
            </el-form-item>
            <el-form-item label="疫苗情况">
                <el-radio-group v-model="form.isVaccine">
                    <el-radio :label="0">不详</el-radio>
                    <el-radio :label="1">未接种</el-radio>
                    <el-radio :label="2">接种中</el-radio>
                    <el-radio :label="3">已接种</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="驱虫情况">
                <el-radio-group v-model="form.isRepellant">
                    <el-radio :label="0">不详</el-radio>
                    <el-radio :label="1">未驱虫</el-radio>
                    <el-radio :label="2">已驱虫</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="绝育情况">
                <el-radio-group v-model="form.isSterilization">
                    <el-radio :label="0">不详</el-radio>
                    <el-radio :label="1">未绝育</el-radio>
                    <el-radio :label="2">已绝育</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="宠物状态" style="margin-bottom: 0px;">
                <el-radio-group v-model="form.status">
                    <el-radio :label="0">已上架</el-radio>
                    <el-radio :label="1">已下架</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0px 0px 10px;">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确认修改</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getOnePet, updatePet } from '@/api/pet'
  import { getCategoryList2, getClassificationList } from '@/api/main'
  import { validChineseAlphabet, validFloat1 } from '@/utils/validate'

  export default {
    name: 'petUpdateForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          sex: '',
          age: '',
          weight: '',
          isVaccine: '',
          isRepellant: '',
          isSterilization: '',
          status: '',
          category: {
            name: '',
            classification: {
              name: ''
            }
          }
        },
        classificationList: [], //分类列表
        categoryList: [],       //品种列表
        ageList: [
          {
            value: 0,
            label: '0-3个月'
          }, {
            value: 1,
            label: '4-6个月'
          }, {
            value: 2,
            label: '7-12个月'
          }, {
            value: 3,
            label: '1岁'
          }, {
            value: 4,
            label: '2岁'
          }, {
            value: 5,
            label: '3岁'
          }, {
            value: 6,
            label: '4岁'
          }, {
            value: 7,
            label: '5岁'
          }, {
            value: 8,
            label: '6岁'
          }, {
            value: 9,
            label: '7岁'
          }, {
            value: 10,
            label: '8岁'
          }, {
            value: 11,
            label: '9岁'
          }, {
            value: 12,
            label: '10岁'
          }, {
            value: 13,
            label: '11岁'
          }, {
            value: 14,
            label: '12岁'
          }, {
            value: 15,
            label: '13岁'
          }, {
            value: 16,
            label: '14岁'
          }, {
            value: 17,
            label: '15岁'
          }, {
            value: 18,
            label: '16岁'
          }, {
            value: 19,
            label: '17岁'
          }, {
            value: 20,
            label: '18岁'
          }, {
            value: 21,
            label: '19岁'
          }, {
            value: 22,
            label: '20岁'
          }]
      }
    },
    created() {
      this.InitOptionList()
    },
    methods: {
      InitOptionList() {
        getClassificationList().then(result => {
          result.data.classificationInfo.forEach(classification => {
            this.classificationList.push(classification)
          })
        })
      },
      classificationChanged(label) {
        this.form.category.name = ''
        this.categoryList = []
        for (let i = 0; i < this.classificationList.length; i++) {
          if (this.classificationList[i].name === label) {
            getCategoryList2(label).then(result => {
              result.data.categoryInfo.forEach(category => {
                this.categoryList.push(category)
              })
            })
          }
        }
      },
      saveOrUpdate() {
        this.ageList.forEach((item) => {
          if (item.label === this.form.age) {
            this.form.age = item.value
          }
        })
        if (this.form.name.length === 0) {
          this.$message.error('请输入宠物昵称！')
        } else if (!validChineseAlphabet(this.form.name)) {
          this.$message.error('昵称请输入中文或英文！')
        } else if (this.form.category.classification.name.length === 0) {
          this.$message.error('请选择宠物分类！')
        } else if (this.form.category.name.length === 0) {
          this.$message.error('请选择宠物品种！')
        } else if (this.form.age.length === 0) {
          this.$message.error('请选择年龄！')
        } else if (!validFloat1(this.form.weight)) {
          this.$message.error('体重请输入0.1-100.0的整数或小数！')
        } else {
          updatePet(this.form).then(result => {
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
          getOnePet(id).then(result => {
            this.form = result.data.petInfo
            this.form.id = id
            this.ageList.forEach((item) => {
              if (item.value === result.data.petInfo.age) {
                this.form.age = item.label
              }
            })
            this.categoryList = []
            getCategoryList2(this.form.category.classification.name).then(result => {
              result.data.categoryInfo.forEach(category => {
                this.categoryList.push(category)
              })
            })
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.name = ''
        this.form.sex = ''
        this.form.age = ''
        this.form.weight = ''
        this.form.isVaccine = ''
        this.form.isRepellant = ''
        this.form.isSterilization = ''
        this.form.status = ''
        this.form.category.name = ''
        this.form.category.classification.name = ''
      }
    }
  }
</script>

<style scoped>
    .el-input {
        width: 203.8px;
    }
</style>
