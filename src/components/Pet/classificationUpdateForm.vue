<template>
    <el-dialog :visible.sync="dialogFormVisible" title="修改宠物分类" width="40%" center>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="分类名" style="margin-bottom: 0;">
                <el-input
                        v-model="form.name"
                        maxlength="30"
                        show-word-limit/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确认修改</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getOneClassification, updateClassification } from '@/api/pet'
  import { validChinese } from '@/utils/validate'

  export default {
    name: 'classificationUpdateForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: ''
        },
      }
    },
    methods: {
      saveOrUpdate() {
        if (this.form.name.length === 0) {
          this.$message.error('请输入分类名！')
        } else if (!validChinese(this.form.name)) {
          this.$message.error('分类名请输入汉字！')
        } else {
          updateClassification(this.form).then(result => {
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
          getOneClassification(id).then(result => {
            this.form = result.data.classificationInfo
            this.form.id = id
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.name = ''
      }
    }
  }
</script>

<style scoped>
    .el-input {
        width: 407.6px;
    }
</style>
