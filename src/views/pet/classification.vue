<template>
    <div class="classification-list-container">
        <!-- 新增与查询 -->
        <el-form :inline="true">
            <el-form-item>
                <el-select
                        v-model="searchParams.name"
                        placeholder="请选择宠物分类"
                        clearable
                        filterable>
                    <el-option
                            v-for="item in classificationList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"/>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="initClassification()">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetClassification()">清空</el-button>
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="addClassification()">新增分类</el-button>
        </el-form>

        <!-- 表格 -->
        <el-table
                v-loading="listLoading"
                :data="classificationData"
                border
                @sort-change="changeTableSort"
                element-loading-text="数据加载中"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="分类编号"
                    sortable="custom"
                    align="center"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="分类名"
                    align="center"
                    width="450">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="updateClassification(scope.row.id)" type="success" size="mini" icon="el-icon-edit">
                        修改分类信息
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
                @current-change="initClassification"
        />

        <!-- 修改宠物分类表单对话框-->
        <classification-update-form
                ref="classificationUpdateForm"
                @onSaveSuccess="refreshList"/>

        <!-- 新增宠物分类表单对话框-->
        <classification-create-form
                ref="classificationCreateForm"
                @onSaveSuccess="refreshList"/>
    </div>
</template>

<script>
  import classificationUpdateForm from '@/components/Pet/classificationUpdateForm'
  import classificationCreateForm from '@/components/Pet/classificationCreateForm'
  import { getClassification } from '@/api/pet'
  import { getClassificationList } from '@/api/main'

  export default {
    name: 'classification',
    components: {
      classificationUpdateForm,
      classificationCreateForm
    },
    data() {
      return {
        classificationData: [],
        classificationList: [],
        listLoading: true,  //是否显示loading信息
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数,
        searchParams: {}    // 查询条件
      }
    },
    created() {
      this.initClassification()
    },
    methods: {
      initClassification(page = 1) {
        this.page = page
        this.listLoading = true
        getClassification(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.classificationData = result.data.classificationInfo.rows
            this.total = result.data.classificationInfo.count
          }
          this.listLoading = false
        })
        this.classificationList = []
        getClassificationList().then(result => {
          result.data.classificationInfo.forEach(classification => {
            this.classificationList.push(classification)
          })
        })
      },
      refreshList() {
        this.initClassification(this.page)
      },
      resetClassification() {
        this.searchParams = {}
        this.refreshList()
      },
      addClassification() {
        this.$refs.classificationCreateForm.open()
      },
      updateClassification(id) {
        this.$refs.classificationUpdateForm.open(id)
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
    .classification-list-container {
        margin: 15px 15px;
    }

    .el-form-item {
        margin-bottom: 15px;
    }
</style>
