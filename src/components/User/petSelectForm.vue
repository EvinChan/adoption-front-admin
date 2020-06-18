<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="查看宠物信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="宠物编号">
                <div class="formText">{{ form.petId }}</div>
            </el-form-item>
            <el-form-item label="宠物昵称">
                <div class="formText">{{ form.adoptionPet.name }}</div>
            </el-form-item>
            <el-form-item label="宠物分类">
                <div class="formText">{{ form.adoptionPet.category.classification.name }}</div>
            </el-form-item>
            <el-form-item label="宠物品种">
                <div class="formText">{{ form.adoptionPet.category.name }}</div>
            </el-form-item>
            <el-form-item label="性别">
                <div class="formText" v-if="form.adoptionPet.sex === 0">公</div>
                <div class="formText" v-if="form.adoptionPet.sex === 1">母</div>
            </el-form-item>
            <el-form-item label="体重(kg)" style="margin-bottom: 0;">
                <div class="formText">{{ form.adoptionPet.weight }}</div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getAdoptionPet } from '@/api/user'

  export default {
    name: 'petSelectForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          petId: '',
          adoptionPet: {
            name: '',
            sex: '',
            weight: '',
            category: {
              name: '',
              classification: {
                name: ''
              }
            }
          }
        }
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getAdoptionPet(id).then(result => {
            this.form = result.data.petInfo
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.petId = ''
        this.form.adoptionPet.name = ''
        this.form.adoptionPet.sex = ''
        this.form.adoptionPet.weight = ''
        this.form.adoptionPet.category.name = ''
        this.form.adoptionPet.category.classification.name = ''
      }
    }
  }
</script>

<style scoped>
    .formText {
        padding: 0 15px;
    }
</style>
