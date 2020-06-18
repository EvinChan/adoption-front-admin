<template>
    <div class="user-list-container">
        <!-- 新增与查询 -->
        <el-form :inline="true">
            <el-form-item>
                <el-input v-model="searchParams.mobile"
                          placeholder="请输入用户账号"
                          maxlength="11"
                          clearable
                          style="width: 150px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchParams.name"
                          placeholder="请输入用户昵称"
                          maxlength="20"
                          clearable
                          style="width: 150px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchParams.idcard"
                          placeholder="请输入用户身份证号"
                          maxlength="18"
                          clearable
                          style="width: 190px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-select
                        v-model="searchParams.status"
                        placeholder="请选择用户状态"
                        style="width: 150px"
                        clearable
                        filterable>
                    <el-option value="0" label="正常"/>
                    <el-option value="1" label="禁止登陆"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select
                        v-model="searchParams.isOrg"
                        placeholder="是否机构"
                        style="width: 150px"
                        clearable
                        filterable>
                    <el-option value="0" label="否"/>
                    <el-option value="1" label="是"/>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="initUser()">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetUser()">清空</el-button>
            <div>
                <span style="color: #303133;margin-right: 5px">注册日期</span>
                <el-date-picker
                        v-model="time"
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
                :data="userData"
                border
                @sort-change="changeTableSort"
                element-loading-text="数据加载中"
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="用户编号"
                    sortable="custom"
                    align="center"
                    width="105">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    label="用户账号"
                    align="center"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="昵称"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="idcard"
                    label="身份证号"
                    align="center"
                    width="170">
                <template slot-scope="scope">
                    {{ scope.row.idcard === null ? '未知' : scope.row.idcard }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    align="center"
                    width="80">
                <template slot-scope="scope">
                    {{ scope.row.sex === 0 ? '男' : '女' }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="用户状态"
                    align="center"
                    width="95">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0">正常</el-tag>
                    <el-tag v-if="scope.row.status === 1" type="danger">禁止登录</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="isOrg"
                    label="是否机构"
                    align="center"
                    width="80">
                <template slot-scope="scope">
                    {{ scope.row.isOrg === 0 ? '否' : '是' }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="gmt_create"
                    label="注册时间"
                    align="center"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="gmt_modified"
                    label="修改时间"
                    align="center"
                    width="160">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="selectUser(scope.row.id)" type="primary" size="mini" icon="el-icon-view">
                        查看
                    </el-button>
                    <el-button @click="updateUser(scope.row.id)" type="success" size="mini" icon="el-icon-edit">
                        修改
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
                @current-change="initUser"
        />

        <!-- 查看用户信息表单对话框-->
        <user-select-form1
                ref="userSelectForm1"/>

        <!-- 修改用户信息表单对话框-->
        <user-update-form
                ref="userUpdateForm"
                @onSaveSuccess="refreshList"/>
    </div>
</template>

<script>
  import userSelectForm1 from '@/components/User/userSelectForm1'
  import userUpdateForm from '@/components/User/userUpdateForm'
  import { getUser } from '@/api/user'

  export default {
    name: 'information',
    components: {
      userSelectForm1,
      userUpdateForm
    },
    data() {
      return {
        // 设置选择今天以及今天以前的日期
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6;
          },
        },
        userData: [],
        listLoading: true,  //是否显示loading信息
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        searchParams: {},    // 查询条件
        time: []
      }
    },
    created() {
      this.initUser()
    },
    methods: {
      initUser(page = 1) {
        this.page = page
        if(this.time) {
          this.searchParams.time1 = this.time[0]
          this.searchParams.time2 = this.time[1]
        } else {
          this.searchParams.time1 = ''
          this.searchParams.time2 = ''
        }
        this.listLoading = true
        getUser(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.userData = result.data.userInfo.rows
            this.total = result.data.userInfo.count
          }
          this.listLoading = false
        })
      },
      refreshList() {
        this.initUser(this.page)
      },
      resetUser() {
        this.searchParams = {}
        this.time = []
        this.refreshList()
      },
      selectUser(id) {
        this.$refs.userSelectForm1.open(id)
      },
      updateUser(id) {
        this.$refs.userUpdateForm.open(id)
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
    .user-list-container {
        margin: 15px 15px;
    }

    .el-form-item {
        margin-bottom: 15px;
    }
</style>
