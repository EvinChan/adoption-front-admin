<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="查看用户订单" width="40%" center>
        <el-form ref="form" :model="form" label-width="100px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="收货人姓名">
                        <div class="formText">{{ form.orderAddress.name }}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收货人号码">
                        <div class="formText">{{ form.orderAddress.mobile }}</div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="省">
                        <div class="formText">{{ form.orderAddress.addressProvince.name }}</div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="市">
                        <div class="formText">{{ form.orderAddress.addressCity.name }}</div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="详细地址">
                <div class="formText">{{ form.orderAddress.detail }}</div>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="配送方式">
                        <div class="formText" v-if="form.shipping === 0">托运</div>
                        <div class="formText" v-if="form.shipping === 1">自提</div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="运费(元)">
                        <div class="formText">{{ form.freight }}</div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="备注" style="margin-bottom: 0;">
                <div class="formText">{{ form.remark }}</div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getOneOrder } from '@/api/order'

  export default {
    name: 'orderSelectForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          orderAddress: {
            name: '',
            mobile: '',
            addressProvince: {
              name: ''
            },
            addressCity: {
              name: ''
            },
            detail: ''
          },
          shipping: '',
          freight: '',
          remark: ''
        }
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getOneOrder(id).then(result => {
            this.form = result.data.orderInfo
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.orderAddress.name = ''
        this.form.orderAddress.mobile = ''
        this.form.orderAddress.addressProvince.name = ''
        this.form.orderAddress.addressCity.name = ''
        this.form.orderAddress.detail = ''
        this.form.shipping = ''
        this.form.freight = ''
        this.form.remark = ''
      }
    }
  }
</script>

<style scoped>
    .formText {
        padding: 0 15px;
    }
</style>
