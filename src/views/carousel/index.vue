<template>
    <div class="carousel-list-container">
        <!-- 新增与查询 -->
        <el-form :inline="true">
            <span style="color: #303133;margin: 0 5px 0 5px">修改日期</span>
            <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="请选择开始日期"
                    end-placeholder="请选择结束日期"
                    style="width: 400px;margin: 0 10px 15px 0;"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="initCarousel()">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetCarousel()">清空</el-button>
            <span style="color: #303133;margin-left: 15px">轮播图建议尺寸：1519px * 420px</span>
        </el-form>

        <!-- 表格 -->
        <el-table
                :data="carouselData"
                border
                element-loading-text="数据加载中"
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="轮播图顺序"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="src"
                    label="轮播图"
                    align="center"
                    width="627.6">
                <template slot-scope="scope">
                    <div>
                        <img :src="scope.row.src" width="607.6px" height="168px">
                    </div>
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
                    <el-button @click="updateCarousel(scope.row.id)" type="success" size="mini" icon="el-icon-edit">
                        修改轮播图
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
                @current-change="initCarousel"
        />

        <!-- 修改轮播图信息表单对话框-->
        <carousel-update-form
                ref="carouselUpdateForm"
                @onSaveSuccess="refreshList"/>
    </div>
</template>

<script>
  import carouselUpdateForm from '@/components/Carousel/carouselUpdateForm'
  import { getCarousel } from '@/api/carousel'

  export default {
    name: 'index',
    components: {
      carouselUpdateForm
    },
    data() {
      return {
        // 设置选择今天以及今天以前的日期
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6;
          },
        },
        carouselData: [],
        listLoading: true,  //是否显示loading信息
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        searchParams: {},    // 查询条件
        time: []
      }
    },
    created() {
      this.initCarousel()
    },
    methods: {
      initCarousel(page = 1) {
        this.page = page
        if(this.time) {
          this.searchParams.time1 = this.time[0]
          this.searchParams.time2 = this.time[1]
        } else {
          this.searchParams.time1 = ''
          this.searchParams.time2 = ''
        }
        this.listLoading = true
        getCarousel(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.carouselData = result.data.carouselInfo.rows
            this.total = result.data.carouselInfo.count
          }
          this.listLoading = false
        })
      },
      refreshList() {
        this.initCarousel()
      },
      resetCarousel() {
        this.searchParams = {}
        this.time = []
        this.refreshList()
      },
      updateCarousel(id) {
        this.$refs.carouselUpdateForm.open(id)
      }
    }
  }
</script>

<style scoped>
    .carousel-list-container {
        margin: 15px 15px;
    }
</style>
