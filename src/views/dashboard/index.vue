<template>
    <div class="dashboard-container">
        <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-peoples">
                        <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            用户总数
                        </div>
                        <span class="card-panel-num">{{ dashboardData.user }}</span>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-user">
                        <svg-icon icon-class="user" class-name="card-panel-icon"/>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            机构总数
                        </div>
                        <span class="card-panel-num">{{ dashboardData.organization }}</span>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-star">
                        <svg-icon icon-class="star" class-name="card-panel-icon"/>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            宠物总数
                        </div>
                        <span class="card-panel-num">{{ dashboardData.pet }}</span>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-shopping">
                        <svg-icon icon-class="shopping" class-name="card-panel-icon"/>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            订单总数
                        </div>
                        <span class="card-panel-num">{{ dashboardData.order }}</span>
                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- 为ECharts准备一个具备宽高的Dom -->
        <div class="chart-container">
            <div id="chart" style="height:480px;width:100%"></div>
        </div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts/theme/macarons.js'
  import { getDashBoard, getChart } from '@/api/dashboard'

  export default {
    name: 'Dashboard',
    data() {
      return {
        dashboardData: {},
        chart: null,
        xData: [],
        userData: [],
        organizationData: [],
        petData: [],
        orderData: []
      }
    },
    created() {
      this.getDashBoardData()
    },
    mounted() {
      this.showChart()
    },
    methods: {
      getDashBoardData() {
        getDashBoard().then(result => {
          if (result.code === 200) {
            this.dashboardData = result.data
          }
        })
      },
      showChart() {
        this.initChartData()
      },
      // 图表数据
      initChartData() {
        getChart().then(result => {
          if (result.code === 200) {
            // x轴时间
            this.xData = result.data.dateInfo
            this.userData = result.data.userInfo
            this.organizationData = result.data.organizationInfo
            this.petData = result.data.petInfo
            this.orderData = result.data.orderInfo
            this.setChart()
          }
        })
      },
      // 设置图标参数
      setChart() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(document.getElementById('chart'), 'macarons')

        // 指定图表的配置项和数据
        let option = {
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: 'category',
            data: this.xData,
            axisLine: {
              lineStyle: {
                color: '#409EFF' // x轴及其文字颜色
              }
            }
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#409EFF' // y轴及其文字颜色
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          legend: {
            data: ['用户注册数', '机构注册数', '宠物新增数', '订单新增数']
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [
            {
              name: '用户注册数',
              // 系列中的数据内容数组
              data: this.userData,
              // 折线图
              type: 'line',
              color: ['#839DD8'],
              itemStyle: { normal: { label: { show: true } } }
            },
            {
              name: '机构注册数',
              // 系列中的数据内容数组
              data: this.organizationData,
              // 折线图
              type: 'line',
              color: ['#42B983'],
              itemStyle: { normal: { label: { show: true } } }
            },
            {
              name: '宠物新增数',
              // 系列中的数据内容数组
              data: this.petData,
              // 折线图
              type: 'line',
              color: ['#FFCD42'],
              itemStyle: { normal: { label: { show: true } } }
            },
            {
              name: '订单新增数',
              // 系列中的数据内容数组
              data: this.orderData,
              // 折线图
              type: 'line',
              color: ['#F74B83'],
              itemStyle: { normal: { label: { show: true } } }
            }
          ]
        }
        this.chart.setOption(option)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .dashboard-container {
        padding: 20px;
        background-color: rgb(240, 242, 245);
        position: relative;

        .panel-group {
            .card-panel-col {
                margin-bottom: 20px;
            }

            .card-panel {
                height: 108px;
                font-size: 12px;
                position: relative;
                overflow: hidden;
                color: #666;
                background: #fff;
                box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
                border-color: rgba(0, 0, 0, .05);

                .icon-peoples {
                    color: #839DD8;
                }

                .icon-user {
                    color: #42B983;
                }

                .icon-star {
                    color: #FFCD42;
                }

                .icon-shopping {
                    color: #F74B83
                }

                .card-panel-icon-wrapper {
                    float: left;
                    margin: 14px 0 14px 40px;
                    padding: 16px;
                    transition: all 0.38s ease-out;
                    border-radius: 6px;
                }

                .card-panel-icon {
                    float: left;
                    font-size: 48px;
                }

                .card-panel-description {
                    float: right;
                    font-weight: bold;
                    margin: 28px 40px 28px 0px;

                    .card-panel-text {
                        line-height: 18px;
                        color: rgba(0, 0, 0, 0.45);
                        font-size: 16px;
                        margin-bottom: 12px;
                    }

                    .card-panel-num {
                        font-size: 20px;
                    }
                }
            }
        }
    }

    .chart-container {
        background-color: #ffffff;
        padding-top: 20px;
    }

    @media (max-width: 550px) {
        .card-panel-description {
            display: none;
        }

        .card-panel-icon-wrapper {
            float: none !important;
            width: 100%;
            height: 100%;
            margin: 0 !important;

            .svg-icon {
                display: block;
                margin: 14px auto !important;
                float: none !important;
            }
        }
    }
</style>

