<template>
    <div class="category-list-container">
        <!-- 新增与查询 -->
        <el-form :inline="true">
            <el-form-item>
                <el-select
                        v-model="searchParams.classificationName"
                        placeholder="请选择宠物分类"
                        clearable
                        filterable
                        @change="classificationChanged">
                    <el-option
                            v-for="item in classificationList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select
                        v-model="searchParams.categoryName"
                        placeholder="请选择宠物品种"
                        clearable
                        filterable>
                    <el-option
                            v-for="item in categoryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"/>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="initCategory()">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetCategory()">清空</el-button>
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="addCategory()">新增品种</el-button>
        </el-form>

        <!-- 表格 -->
        <el-table
                v-loading="listLoading"
                :data="categoryData"
                border
                @sort-change="changeTableSort"
                element-loading-text="数据加载中"
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="品种编号"
                    sortable="custom"
                    align="center"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="品种名"
                    align="center"
                    width="350">
            </el-table-column>
            <el-table-column
                    prop="classification.name"
                    label="分类名"
                    align="center"
                    width="300">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="updateCategory(scope.row.id)" type="success" size="mini" icon="el-icon-edit">
                        修改品种信息
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
                @current-change="initCategory"
        />

        <!-- 修改宠物品种表单对话框-->
        <category-update-form
                ref="categoryUpdateForm"
                @onSaveSuccess="refreshList"/>

        <!-- 新增宠物品种表单对话框-->
        <category-create-form
                ref="categoryCreateForm"
                @onSaveSuccess="refreshList"/>
    </div>
</template>

<script>
  import categoryUpdateForm from '@/components/Pet/categoryUpdateForm'
  import categoryCreateForm from '@/components/Pet/categoryCreateForm'
  import { getCategory } from '@/api/pet'
  import { getCategoryList, getClassificationList } from '@/api/main'

  export default {
    name: 'category',
    components: {
      categoryUpdateForm,
      categoryCreateForm
    },
    data() {
      return {
        categoryData: [],
        classificationList: [], //分类列表
        categoryList: [],       //品种列表
        listLoading: true,  //是否显示loading信息
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        searchParams: {}    // 查询条件
      }
    },
    created() {
      this.initCategory()
    },
    methods: {
      initCategory(page = 1) {
        this.page = page
        this.listLoading = true
        getCategory(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.categoryData = result.data.categoryInfo.rows
            this.total = result.data.categoryInfo.count
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
      classificationChanged(label) {
        this.categoryList = []
        for (let i = 0; i < this.classificationList.length; i++) {
          if (this.classificationList[i].id === label) {
            getCategoryList(label).then(result => {
              result.data.categoryInfo.forEach(category => {
                this.categoryList.push(category)
              })
            })
          }
        }
      },
      refreshList() {
        this.initCategory(this.page)
      },
      resetCategory() {
        this.searchParams = {}
        this.refreshList()
      },
      addCategory() {
        this.$refs.categoryCreateForm.open()
      },
      updateCategory(id) {
        this.$refs.categoryUpdateForm.open(id)
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
    .category-list-container {
        margin: 15px 15px;
    }

    .el-form-item {
        margin-bottom: 15px;
    }
</style>
