<template>
    <div class="order-list-container">
        <!-- 新增与查询 -->
        <el-form :inline="true">
            <el-form-item>
                <el-input v-model="searchParams.userMobile"
                          placeholder="请输入用户账号"
                          maxlength="11"
                          clearable
                          style="width: 150px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchParams.petName"
                          placeholder="请输入宠物昵称"
                          maxlength="10"
                          clearable
                          style="width: 160px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchParams.orderName"
                          placeholder="请输入收货人姓名"
                          maxlength="20"
                          clearable
                          style="width: 160px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchParams.orderMobile"
                          placeholder="请输入收货人号码"
                          maxlength="11"
                          clearable
                          style="width: 160px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-select
                        v-model="searchParams.status"
                        placeholder="请选择订单状态"
                        style="width: 150px"
                        clearable
                        filterable>
                    <el-option value="0" label="未付款"/>
                    <el-option value="1" label="未发货"/>
                    <el-option value="2" label="已发货"/>
                    <el-option value="3" label="已完成"/>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="initOrder()">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetOrder()">清空</el-button>
            <div>
                <span style="color: #303133;margin-right: 5px;">创建日期</span>
                <el-date-picker
                        v-model="time1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="请选择开始日期"
                        end-placeholder="请选择结束日期"
                        style="width: 400px;margin: 0 0 15px 0;"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                </el-date-picker>
                <span style="color: #303133;margin: 0 5px 0 10px;">成交日期</span>
                <el-date-picker
                        v-model="time2"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="请选择开始日期"
                        end-placeholder="请选择结束日期"
                        style="width: 400px;margin: 0 0 15px 0;"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </div>
        </el-form>

        <!-- 表格 -->
        <el-table
                :data="orderData"
                border
                @sort-change="changeTableSort"
                element-loading-text="数据加载中"
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="订单编号"
                    sortable="custom"
                    align="center"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="orderUser.mobile"
                    label="用户账号"
                    align="center"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="orderPet.name"
                    label="宠物昵称"
                    align="center"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="adopId"
                    label="申请表编号"
                    align="center"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="orderAddress.name"
                    label="收货人姓名"
                    align="center"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="orderAddress.mobile"
                    label="收货人号码"
                    align="center"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="shipping"
                    label="配送方式"
                    align="center">
                <template slot-scope="scope">
                    {{ scope.row.shipping === 0 ? '托运' : '自提' }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="订单状态"
                    align="center"
                    width="85">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0" type="danger">未付款</el-tag>
                    <el-tag v-if="scope.row.status === 1" type="warning">未发货</el-tag>
                    <el-tag v-if="scope.row.status === 2">已发货</el-tag>
                    <el-tag v-if="scope.row.status === 3" type="success">已完成</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="gmt_create"
                    label="创建时间"
                    align="center"
                    width="155">
            </el-table-column>
            <el-table-column
                    prop="gmt_transaction"
                    label="成交时间"
                    align="center"
                    width="155">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    width="120">
                <template slot-scope="scope">
                    <el-button @click="selectOrder(scope.row.id)" type="primary" size="mini" icon="el-icon-view">
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
                :current-page="page"
                :page-size="limit"
                :total="total"
                layout="total, prev, pager, next, jumper"
                @current-change="initOrder"
        />

        <!-- 查看用户订单表单对话框-->
        <order-select-form
                ref="orderSelectForm"/>
    </div>
</template>

<script>
  import orderSelectForm from '@/components/Order/orderSelectForm'
  import { getOrder } from '@/api/order'

  export default {
    name: 'order',
    components: {
      orderSelectForm
    },
    data() {
      return {
        // 设置选择今天以及今天以前的日期
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6;
          },
        },
        orderData: [],
        listLoading: true,  //是否显示loading信息
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        searchParams: {},    // 查询条件
        time1: [],
        time2: []
      }
    },
    created() {
      this.initOrder()
    },
    methods: {
      initOrder(page = 1) {
        this.page = page
        if(this.time1) {
          this.searchParams.time1 = this.time1[0]
          this.searchParams.time2 = this.time1[1]
        } else {
          this.searchParams.time1 = ''
          this.searchParams.time2 = ''
        }
        if(this.time2) {
          this.searchParams.time3 = this.time2[0]
          this.searchParams.time4 = this.time2[1]
        } else {
          this.searchParams.time3 = ''
          this.searchParams.time4 = ''
        }
        this.listLoading = true
        getOrder(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.orderData = result.data.orderInfo.rows
            this.total = result.data.orderInfo.count
          }
          this.listLoading = false
        })
      },
      refreshList() {
        this.initOrder()
      },
      resetOrder() {
        this.searchParams = {}
        this.time1 = []
        this.time2 = []
        this.refreshList()
      },
      selectOrder(id) {
        this.$refs.orderSelectForm.open(id)
      },
      changeTableSort(column) {
        if(column.order === 'descending') {
          this.searchParams.sort = 'desc'
        } else {
          this.searchParams.sort = 'asc'
        }
        this.refreshList()
      }
    }
  }
</script>

<style scoped>
    .order-list-container {
        margin: 15px 15px;
    }

    .el-form-item {
        margin-bottom: 15px;
    }
</style>
