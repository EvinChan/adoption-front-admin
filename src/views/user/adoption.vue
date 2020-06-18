<template>
    <div class="adoption-list-container">
        <!-- 新增与查询 -->
        <el-form :inline="true">
            <el-form-item>
                <el-input v-model="searchParams.petName"
                          placeholder="请输入宠物昵称"
                          maxlength="10"
                          clearable
                          style="width: 150px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchParams.userMobile"
                          placeholder="请输入用户账号"
                          maxlength="11"
                          clearable
                          style="width: 190px">
                </el-input>
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
            <el-form-item>
                <el-select
                        v-model="searchParams.orgName"
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
            <el-button type="primary" icon="el-icon-search" @click="initAdoption()">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetAdoption()">清空</el-button>

        </el-form>

        <!-- 表格 -->
        <el-table
                :data="adoptionData"
                border
                @sort-change="changeTableSort"
                element-loading-text="数据加载中"
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="申请表编号"
                    sortable="custom"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="adoptionPet.name"
                    label="宠物昵称"
                    align="center"
                    width="140">
            </el-table-column>
            <el-table-column
                    label="宠物信息"
                    align="center"
                    width="140">
                <template slot-scope="scope">
                    <el-button @click="selectPet(scope.row.id)" type="primary" size="mini">
                        查看宠物信息
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="adoptionUser.mobile"
                    label="用户账号"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="用户信息"
                    align="center"
                    width="140">
                <template slot-scope="scope">
                    <el-button @click="selectUser(scope.row.id)" type="primary" size="mini">
                        查看用户信息
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    align="center"
                    width="80">
                <template slot-scope="scope">
                    {{ scope.row.sex === 0 ? '男' : '女'}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄"
                    align="center"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    label="手机号"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="申请表状态"
                    align="center"
                    width="110">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0" type="danger">未审核</el-tag>
                    <el-tag v-if="scope.row.status === 1">审核失败</el-tag>
                    <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
                    <el-tag v-if="scope.row.status === 3" type="warning">用户取消</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="adoptionOrg.organizationName.name"
                    label="所属机构"
                    align="center"
                    width="110">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="selectAdoption(scope.row.id)" type="primary" size="mini" icon="el-icon-view">
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
                @current-change="initAdoption"
        />

        <!-- 查看用户信息表单对话框-->
        <user-select-form2
                ref="userSelectForm2"/>

        <!-- 查看宠物信息表单对话框-->
        <pet-select-form
                ref="petSelectForm"/>

        <!-- 查看领养申请表表单对话框-->
        <adoption-select-form
                ref="adoptionSelectForm"/>
    </div>
</template>

<script>
  import userSelectForm2 from '@/components/User/userSelectForm2'
  import petSelectForm from '@/components/User/petSelectForm'
  import adoptionSelectForm from '@/components/User/adoptionSelectForm'
  import { getAdoption } from '@/api/user'
  import { getOrganizationList } from '@/api/main'

  export default {
    name: 'adoption',
    components: {
      userSelectForm2,
      petSelectForm,
      adoptionSelectForm
    },
    data() {
      return {
        adoptionData: [],
        listLoading: true,  //是否显示loading信息
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        searchParams: {},    // 查询条件
        organizationList: []
      }
    },
    created() {
      this.initAdoption()
    },
    methods: {
      initAdoption(page = 1) {
        this.page = page
        this.listLoading = true
        getAdoption(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.adoptionData = result.data.adoptionInfo.rows
            this.total = result.data.adoptionInfo.count
          }
          this.listLoading = false
        })
        this.organizationList = []
        getOrganizationList().then(result => {
          result.data.organizationInfo.forEach(organization => {
            this.organizationList.push(organization)
          })
        })
      },
      refreshList() {
        this.initAdoption()
      },
      resetAdoption() {
        this.searchParams = {}
        this.refreshList()
      },
      selectUser(id) {
        this.$refs.userSelectForm2.open(id)
      },
      selectPet(id) {
        this.$refs.petSelectForm.open(id)
      },
      selectAdoption(id) {
        this.$refs.adoptionSelectForm.open(id)
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
    .adoption-list-container {
        margin: 15px 15px;
    }

    .el-form-item {
        margin-bottom: 15px;
    }
</style>
