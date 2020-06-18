<template>
    <div class="notice-list-container">
        <!-- 新增与查询 -->
        <el-form :inline="true">
            <el-form-item>
                <el-input v-model="searchParams.title"
                          placeholder="请输入公告标题"
                          maxlength="50"
                          clearable
                          style="width: 160px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchParams.adminMobile"
                          placeholder="请输入公告发布者"
                          maxlength="11"
                          clearable
                          style="width: 160px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-select
                        v-model="searchParams.status"
                        placeholder="请选择公告状态"
                        style="width: 160px"
                        clearable
                        filterable>
                    <el-option value="0" label="上线"/>
                    <el-option value="1" label="下线"/>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="initNotice()">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetNotice()">清空</el-button>
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="addNotice()">新增公告</el-button>
            <div>
                <span style="color: #303133;margin-right: 5px">创建日期</span>
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
                <span style="color: #303133;margin: 0 5px 0 10px">修改日期</span>
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
                :data="noticeData"
                border
                @sort-change="changeTableSort"
                element-loading-text="数据加载中"
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="公告编号"
                    sortable="custom"
                    align="center"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="公告标题"
                    align="center"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="noticeAdmin.mobile"
                    label="公告发布者"
                    align="center"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="公告状态"
                    align="center"
                    width="120">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0">上线</el-tag>
                    <el-tag v-if="scope.row.status === 1" type="danger">下线</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="gmt_create"
                    label="创建时间"
                    align="center"
                    width="170">
            </el-table-column>
            <el-table-column
                    prop="gmt_modified"
                    label="修改时间"
                    align="center"
                    width="170">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="updateNotice(scope.row.id)" type="success" size="mini" icon="el-icon-edit">
                        修改公告信息
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
                @current-change="initNotice"
        />

        <!-- 新增公告信息表单对话框-->
        <notice-create-form
                ref="noticeCreateForm"
                @onSaveSuccess="refreshList"/>

        <!-- 修改公告信息表单对话框-->
        <notice-update-form
                ref="noticeUpdateForm"
                @onSaveSuccess="refreshList"/>
    </div>
</template>

<script>
  import noticeCreateForm from '@/components/Notice/noticeCreateForm'
  import noticeUpdateForm from '@/components/Notice/noticeUpdateForm'
  import { getNotice } from '@/api/notice'

  export default {
    name: 'notice',
    components: {
      noticeCreateForm,
      noticeUpdateForm
    },
    data() {
      return {
        // 设置选择今天以及今天以前的日期
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6;
          },
        },
        noticeData: [],
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
      this.initNotice()
    },
    methods: {
      initNotice(page = 1) {
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
        getNotice(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.noticeData = result.data.noticeInfo.rows
            this.total = result.data.noticeInfo.count
          }
          this.listLoading = false
        })
      },
      refreshList() {
        this.initNotice(this.page)
      },
      resetNotice() {
        this.searchParams = {}
        this.time1 = []
        this.time2 = []
        this.refreshList()
      },
      addNotice() {
        this.$refs.noticeCreateForm.open()
      },
      updateNotice(id) {
        this.$refs.noticeUpdateForm.open(id)
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
    .notice-list-container {
        margin: 15px 15px;
    }

    .el-form-item {
        margin-bottom: 15px;
    }
</style>
