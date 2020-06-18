<template>
    <div class="pet-list-container">
        <!-- 新增与查询 -->
        <el-form :inline="true">
            <el-form-item>
                <el-select
                        v-model="searchParams.classificationName"
                        placeholder="请选择宠物分类"
                        style="width: 150px"
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
                        style="width: 190px"
                        clearable
                        filterable>
                    <el-option
                            v-for="item in categoryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"/>
                </el-select>
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
                <el-select
                        v-model="searchParams.sex"
                        placeholder="请选择性别"
                        style="width: 140px"
                        clearable
                        filterable>
                    <el-option value="0" label="公"/>
                    <el-option value="1" label="母"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select
                        v-model="searchParams.provinceName"
                        placeholder="请选择发布省份"
                        style="width: 160px"
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
                <el-select v-model="searchParams.organizationName"
                           placeholder="请选择所属机构"
                           style="width: 160px"
                           clearable
                           filterable>
                    <el-option
                            v-for="item in organizationList"
                            :key="item.id"
                            :label="item.organizationName.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="initPet()">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetPet()">清空</el-button>
            <div>
                <span style="color: #303133;margin-right: 5px">创建日期</span>
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
                <el-form-item>
                    <el-select
                            v-model="searchParams.status"
                            placeholder="请选择宠物状态"
                            style="width: 150px;margin-left: 10px"
                            clearable
                            filterable>
                        <el-option value="0" label="已上架"/>
                        <el-option value="1" label="已下架"/>
                        <el-option value="2" label="已领养"/>
                    </el-select>
                </el-form-item>
            </div>
        </el-form>

        <!-- 表格 -->
        <el-table
                :data="petData"
                border
                @sort-change="changeTableSort"
                element-loading-text="数据加载中"
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="宠物编号"
                    sortable="custom"
                    align="center"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="宠物昵称"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="category.name"
                    label="品种"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    align="center"
                    width="80">
                <template slot-scope="scope">
                    {{ scope.row.sex === 0 ? '公' : '母'}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="provinceName.name"
                    label="发布省份"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="organization.organizationName.name"
                    label="所属机构"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="宠物状态"
                    align="center"
                    width="90">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0">已上架</el-tag>
                    <el-tag v-if="scope.row.status === 1" type="danger">已下架</el-tag>
                    <el-tag v-if="scope.row.status === 2" type="success">已领养</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="gmt_create"
                    label="创建时间"
                    align="center"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="gmt_modified"
                    label="修改时间"
                    align="center"
                    width="160">
            </el-table-column>
            <el-table-column label="操作" align="center" width="160">
                <template slot-scope="scope">
                    <el-button @click="updatePet(scope.row.id)" type="success" size="mini" icon="el-icon-edit">
                        修改基础信息
                    </el-button>
                    <el-button @click="updatePetInformation(scope.row.id)" type="success" size="mini"
                               icon="el-icon-edit" style="margin: 5px 0 0;">
                        修改详细信息
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
                @current-change="initPet"
        />

        <!-- 修改宠物基础信息表单对话框-->
        <pet-update-form
                ref="petUpdateForm"
                @onSaveSuccess="refreshList"/>

        <!-- 修改宠物详细信息表单对话框-->
        <pet-information-update-form
                ref="petInformationUpdateForm"
                @onSaveSuccess="refreshList"/>
    </div>
</template>

<script>
  import petUpdateForm from '@/components/Pet/petUpdateForm'
  import petInformationUpdateForm from '@/components/Pet/petInformationUpdateForm'
  import { getPet } from '@/api/pet'
  import { getCategoryList, getClassificationList, getProvinceList, getOrganizationList } from '@/api/main'

  export default {
    name: 'information',
    components: {
      petUpdateForm,
      petInformationUpdateForm,
    },
    data() {
      return {
        // 设置选择今天以及今天以前的日期
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6;
          },
        },
        petData: [],
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        searchParams: {},       // 查询条件
        time: [],
        classificationList: [], //分类列表
        categoryList: [],       //品种列表
        provinceList: [],       //省份列表
        organizationList: []    //机构列表
      }
    },
    created() {
      this.initPet()
    },
    methods: {
      initPet(page = 1) {
        this.page = page
        if(this.time) {
          this.searchParams.time1 = this.time[0]
          this.searchParams.time2 = this.time[1]
        } else {
          this.searchParams.time1 = ''
          this.searchParams.time2 = ''
        }
        getPet(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.petData = result.data.petInfo.rows
            this.total = result.data.petInfo.count
          }
        })
        this.classificationList = []
        getClassificationList().then(result => {
          result.data.classificationInfo.forEach(classification => {
            this.classificationList.push(classification)
          })
        })
        this.provinceList = []
        getProvinceList().then(result => {
          result.data.provinceInfo.forEach(province => {
            this.provinceList.push(province)
          })
        })
        this.organizationList = []
        getOrganizationList().then(result => {
          result.data.organizationInfo.forEach(organization => {
            this.organizationList.push(organization)
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
        this.initPet(this.page)
      },
      resetPet() {
        this.searchParams = {}
        this.time = []
        this.refreshList()
      },
      updatePet(id) {
        this.$refs.petUpdateForm.open(id)
      },
      updatePetInformation(id) {
        this.$refs.petInformationUpdateForm.open(id)
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
    .pet-list-container {
        margin: 15px 15px;
    }

    .el-form-item {
        margin-bottom: 15px;
    }
</style>
