<template>
    <div class="address-list-container">
        <!-- 新增与查询 -->
        <el-form :inline="true">
            <el-form-item>
                <!-- 账号或者昵称 -->
                <el-input v-model="searchParams.userMobile"
                          placeholder="请输入用户账号"
                          maxlength="11"
                          clearable
                          style="width: 160px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchParams.userName"
                          placeholder="请输入用户昵称"
                          maxlength="20"
                          clearable
                          style="width: 160px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchParams.addressName"
                          placeholder="请输入收货人姓名"
                          maxlength="20"
                          clearable
                          style="width: 160px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchParams.addressMobile"
                          placeholder="请输入收货人号码"
                          maxlength="11"
                          clearable
                          style="width: 160px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-select
                        v-model="searchParams.provinceName"
                        placeholder="请选择收货人省份"
                        style="width: 165px"
                        clearable
                        filterable>
                    <el-option
                            v-for="item in provinceList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"/>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="initAddress()">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetAddress()">清空</el-button>
        </el-form>

        <!-- 表格 -->
        <el-table
                :data="addressData"
                border
                @sort-change="changeTableSort"
                element-loading-text="数据加载中"
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="地址编号"
                    sortable="custom"
                    align="center"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="addressUser.mobile"
                    label="用户账号"
                    align="center"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="addressUser.name"
                    label="用户昵称"
                    align="center"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="收货人姓名"
                    align="center"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    label="收货人号码"
                    align="center"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="addressProvince.name"
                    label="省份"
                    align="center"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="addressCity.name"
                    label="市"
                    align="center"
                    width="190">
            </el-table-column>
            <el-table-column
                    prop="isDefault"
                    label="默认地址"
                    align="center"
                    width="110">
                <template slot-scope="scope">
                    {{ scope.row.isDefault === 0 ? '否' : '是' }}
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="selectAddress(scope.row.id)" type="primary" size="mini" icon="el-icon-view">
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
                @current-change="initAddress"/>

        <!-- 查看地址信息表单对话框-->
        <address-select-form
                ref="addressSelectForm"/>
    </div>
</template>

<script>
  import addressSelectForm from '@/components/User/addressSelectForm'
  import { getAddress } from '@/api/user'
  import { getProvinceList } from '@/api/main'

  export default {
    // name: 'address',
    components: {
      addressSelectForm
    },
    data() {
      return {
        addressData: [],
        listLoading: true,  //是否显示loading信息
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        provinceList: [],   //省份列表
        searchParams: {}    // 查询条件
      }
    },
    created() {
      this.initAddress()
    },
    methods: {
      initAddress(page = 1) {
        this.page = page
        this.listLoading = true
        getAddress(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.addressData = result.data.addressInfo.rows
            this.total = result.data.addressInfo.count
          }
          this.listLoading = false
        })
        this.provinceList = []
        getProvinceList().then(result => {
          result.data.provinceInfo.forEach(province => {
            this.provinceList.push(province)
          })
        })
      },
      refreshList() {
        this.initAddress()
      },
      resetAddress() {
        this.searchParams = {}
        this.refreshList()
      },
      selectAddress(id) {
        this.$refs.addressSelectForm.open(id)
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
    .address-list-container {
        margin: 15px 15px;
    }

    .el-form-item {
        margin-bottom: 15px;
    }
</style>
