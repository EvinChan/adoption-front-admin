<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="查看领养申请表" width="40%" center>
        <el-form ref="form" :model="form" label-width="100px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户性别">
                        <div class="formText" v-if="form.sex === 0">男</div>
                        <div class="formText" v-if="form.sex === 1">女</div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户年龄">
                        <div class="formText">{{ form.age }}</div>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号">
                        <div class="formText">{{ form.mobile }}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="养宠经验">
                        <div class="formText" v-if="form.isExp === 0">无</div>
                        <div class="formText" v-if="form.isExp === 1">有</div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="住房情况">
                        <div class="formText" v-if="form.housing === 0">合租</div>
                        <div class="formText" v-if="form.housing === 1">整租</div>
                        <div class="formText" v-if="form.housing === 2">自有房</div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="婚姻状况">
                        <div class="formText" v-if="form.marital === 0">单身</div>
                        <div class="formText" v-if="form.marital === 1">恋爱中</div>
                        <div class="formText" v-if="form.marital === 2">已婚</div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="职业">
                <div class="formText">{{ form.profession }}</div>
            </el-form-item>
            <el-form-item label="个人简介" style="margin-bottom: 0;">
                <div class="formText">{{ form.profile }}</div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getOneAdoption } from '@/api/user'

  export default {
    name: 'adoptionSelectForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          sex: '',
          age: '',
          mobile: '',
          isExp: '',
          housing: '',
          marital: '',
          profession: '',
          profile: ''
        }
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getOneAdoption(id).then(result => {
            this.form = result.data.adoptionInfo
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.sex = ''
        this.form.age = ''
        this.form.mobile = ''
        this.form.isExp = ''
        this.form.housing = ''
        this.form.marital = ''
        this.form.profession = ''
        this.form.profile = ''
      }
    }
  }
</script>

<style scoped>
    .formText {
        padding: 0 15px;
    }
</style>
