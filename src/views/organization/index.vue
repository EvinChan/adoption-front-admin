<template>
    <div class="organization-list-container">
        <!-- 新增与查询 -->
        <el-form :inline="true">
            <el-form-item>
                <!-- 账号或者昵称 -->
                <el-input v-model="searchParams.userMobile"
                          placeholder="请输入用户账号"
                          maxlength="11"
                          clearable
                          style="width: 170px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchParams.userName"
                          placeholder="请输入用户昵称"
                          maxlength="20"
                          clearable
                          style="width: 170px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-select
                        v-model="searchParams.provinceName"
                        placeholder="请选择机构省份"
                        style="width: 170px"
                        clearable
                        filterable>
                    <el-option
                            v-for="item in provinceList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select
                        v-model="searchParams.status"
                        placeholder="请选择申请表状态"
                        style="width: 160px"
                        clearable
                        filterable>
                    <el-option value="0" label="未审核"/>
                    <el-option value="1" label="审核失败"/>
                    <el-option value="2" label="审核通过"/>
                    <el-option value="3" label="用户取消"/>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="initOrganization()">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetOrganization()">清空</el-button>
            <div>
                <span style="color: #303133;margin-right: 10px">注册日期</span>
                <el-date-picker
                        v-model="time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="请选择开始日期"
                        end-placeholder="请选择结束日期"
                        style="width: 400px;margin: 0 0 15px;"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </div>
        </el-form>

        <!-- 表格 -->
        <el-table
                :data="orgData"
                border
                @sort-change="changeTableSort"
                element-loading-text="数据加载中"
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="机构编号"
                    sortable="custom"
                    align="center"
                    width="105">
            </el-table-column>
            <el-table-column
                    prop="organizationName.mobile"
                    label="用户账号"
                    align="center"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="organizationName.name"
                    label="用户昵称"
                    align="center"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="orgProvince.name"
                    label="省份"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="orgCity.name"
                    label="市"
                    align="center"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="申请表状态"
                    align="center"
                    width="100">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0" type="danger">未审核</el-tag>
                    <el-tag v-if="scope.row.status === 1">审核失败</el-tag>
                    <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
                    <el-tag v-if="scope.row.status === 3" type="warning">用户取消</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="gmt_create"
                    label="注册时间"
                    align="center"
                    width="155">
            </el-table-column>
            <el-table-column
                    prop="gmt_modified"
                    label="修改时间"
                    align="center"
                    width="155">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    width="200">
                <template slot-scope="scope">
                    <el-button @click="selectOrg(scope.row.id)"
                               type="primary"
                               size="mini"
                               style="margin: 0 0 5px;">
                        查看
                    </el-button>
                    <el-button @click="updateOrg(scope.row.id)"
                               type="primary"
                               size="mini"
                               style="margin: 0 0 5px 10px;">
                        修改
                    </el-button>
                    <div>
                        <el-button v-if="scope.row.status === 0"
                                   @click="messageBoxOpen(scope.row.id, 2)"
                                   type="success"
                                   size="mini">
                            审核通过
                        </el-button>
                        <el-button v-if="scope.row.status === 0"
                                   @click="messageBoxOpen(scope.row.id, 1)"
                                   type="danger"
                                   size="mini">
                            审核失败
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
                :current-page="page"
                :page-size="limit"
                :total="total"
                layout="total, prev, pager, next, jumper"
                @current-change="initOrganization"/>

        <!-- 查看机构信息表单对话框-->
        <org-select-form
                ref="orgSelectForm"/>

        <!-- 修改机构信息表单对话框-->
        <org-update-form
                ref="orgUpdateForm"
                @onSaveSuccess="refreshList"/>
    </div>
</template>

<script>
  import orgSelectForm from '@/components/Organization/orgSelectForm'
  import orgUpdateForm from '@/components/Organization/orgUpdateForm'
  import { getOrganization, updateOrganization } from '@/api/organization'
  import { getProvinceList } from '@/api/main'

  export default {
    name: 'organization',
    components: {
      orgSelectForm,
      orgUpdateForm
    },
    data() {
      return {
        // 设置选择今天以及今天以前的日期
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        orgData: [],
        listLoading: true,  //是否显示loading信息
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        provinceList: [],   //省份列表
        cityList: [],       //市列表
        searchParams: {},   //查询条件
        time: []
      }
    },
    created() {
      this.initOrganization()
    },
    methods: {
      initOrganization(page = 1) {
        this.page = page
        if (this.time) {
          this.searchParams.time1 = this.time[0]
          this.searchParams.time2 = this.time[1]
        } else {
          this.searchParams.time1 = ''
          this.searchParams.time2 = ''
        }
        this.listLoading = true
        getOrganization(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.orgData = result.data.organizationInfo.rows
            this.total = result.data.organizationInfo.count
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
        this.initOrganization(this.page)
      },
      resetOrganization() {
        this.searchParams = {}
        this.time = []
        this.refreshList()
      },
      selectOrg(id) {
        this.$refs.orgSelectForm.open(id)
      },
      updateOrg(id) {
        this.$refs.orgUpdateForm.open(id)
      },
      messageBoxOpen(id, status) {
        this.$confirm(`确认要对该机构申请表进行审核操作吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.updateOrgBtn(id, status)
        }).catch((result) => {
          if (result === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消审核！'
            })
          }
        })
      },
      updateOrgBtn(id, status) {
        updateOrganization(id, status).then(result => {
          if (result.code === 200) {
            this.dialogFormVisible = false
            this.$message.success('修改成功')
            this.refreshList()
          }
        })
      },
      changeTableSort(column) {
        if (column.order === 'descending') {
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
    .organization-list-container {
        margin: 15px 15px;
    }

    .el-form-item {
        margin-bottom: 15px;
    }
</style>
