<template>
    <el-dialog :visible.sync="dialogFormVisible" title="新增宠物品种" width="40%" center @close="close">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="品种名">
                <el-input
                        v-model="form.name"
                        maxlength="30"
                        show-word-limit
                        style="width: 407.6px"/>
            </el-form-item>
            <el-form-item label="分类名" style="margin-bottom: 0;">
                <el-select
                        v-model="form.classificationName"
                        placeholder="请选择宠物分类"
                        filterable>
                    <el-option
                            v-for="item in classificationList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"/>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="saveOrUpdate">新增</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { createCategory } from '@/api/pet'
  import { getClassificationList } from '@/api/main'
  import { validChinese } from '@/utils/validate'

  export default {
    name: 'categoryCreateForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          classificationName: ''
        },
        classificationList: []
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
      saveOrUpdate() {
        if (this.form.name.length === 0) {
          this.$message.error('请输入品种名！')
        } else if (!validChinese(this.form.name)) {
          this.$message.error('品种名请输入汉字！')
        } else if(this.form.classificationName.length === 0) {
          this.$message.error('请选择分类名！')
        } else {
          createCategory(this.form).then(result => {
            if (result.code === 200) {
              this.dialogFormVisible = false
              this.$message.success('新增成功')
              // 调用父组件监听函数
              this.$emit('onSaveSuccess')
            }
          })
        }
      },
      open() {
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
        this.form.name = ''
        this.form.classificationName = ''
      }
    }
  }
</script>

<style scoped>

</style>
