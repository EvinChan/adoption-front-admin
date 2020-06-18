<template>
    <div>
        <div class="dashboard-container">
            <div class="container">
                <el-form :inline="true">
                    <el-form-item label="查询某月宠物新增数量" style="margin-bottom: 0;">
                        <el-date-picker
                                v-model="value1"
                                type="month"
                                value-format="yyyy-MM"
                                placeholder="请选择选择月份"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-button
                            type="primary"
                            icon="el-icon-search"
                            @click="showChart()">查询
                    </el-button>
                </el-form>
            </div>
            <div class="chart-container">
                <div class="chart" id="chart1"></div>
            </div>
        </div>
        <div class="dashboard-container" style="padding-top: 0;">
            <div class="container">
                <el-form :inline="true">
                    <el-form-item label="查询某月订单数量" style="margin-bottom: 0;">
                        <el-date-picker
                                v-model="value2"
                                type="month"
                                value-format="yyyy-MM"
                                placeholder="请选择选择月份"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-button
                            type="primary"
                            icon="el-icon-search"
                            @click="showChart()">查询
                    </el-button>
                </el-form>
            </div>
            <div class="chart-container">
                <div class="chart" id="chart2"></div>
            </div>
        </div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts/theme/macarons.js'
  import { getStatementChart1, getStatementChart2 } from '@/api/dashboard'

  export default {
    name: 'Dashboard',
    data() {
      return {
        // 设置选择今天以及今天以前的日期
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6;
          },
        },
        chart1: null,
        chart2: null,
        xData1: [],
        petData: [],
        xData2: [],
        orderData: [],
        value1: '',
        value2: ''
      }
    },
    mounted() {
      this.showChart()
    },
    methods: {
      showChart() {
        this.initChartData()
      },
      // 图表数据
      initChartData() {
        getStatementChart1(this.value1).then(result => {
          if (result.code === 200) {
            // x轴时间
            this.xData1 = result.data.dateInfo
            this.petData = result.data.petInfo
            this.setChart1()
          }
        })
        getStatementChart2(this.value2).then(result => {
          if (result.code === 200) {
            // x轴时间
            this.xData2 = result.data.dateInfo
            this.orderData = result.data.orderInfo
            this.setChart2()
          }
        })
      },
      // 设置图标参数
      setChart1() {
        // 基于准备好的dom，初始化echarts实例
        this.chart1 = echarts.init(document.getElementById('chart1'), 'macarons')
        // 指定图表的配置项和数据
        let option = {
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: 'category',
            data: this.xData1,
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
            data: ['宠物新增数']
          },
          // 数据区缩放组件
          dataZoom: [{
            show: true,
            height: 30,
            xAxisIndex: [
              0
            ],
            bottom: 30,
            start: 0,
            end: 100,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5'
            },
            textStyle: {
              color: '#fff'
            },
            borderColor: '#90979c'
          }, {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }],
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [
            {
              name: '宠物新增数',
              // 系列中的数据内容数组
              data: this.petData,
              // 折线图
              type: 'line',
              color: ['#FFCD42'],
              itemStyle: { normal: { label: { show: true } } }
            }
          ]
        }
        this.chart1.setOption(option)
      },
      setChart2() {
        // 基于准备好的dom，初始化echarts实例
        this.chart2 = echarts.init(document.getElementById('chart2'), 'macarons')
        // 指定图表的配置项和数据
        let option = {
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: 'category',
            data: this.xData2,
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
            data: ['订单数量']
          },
          // 数据区缩放组件
          dataZoom: [{
            show: true,
            height: 30,
            xAxisIndex: [
              0
            ],
            bottom: 30,
            start: 0,
            end: 100,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5'
            },
            textStyle: {
              color: '#fff'
            },
            borderColor: '#90979c'
          }, {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }],
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [
            {
              name: '订单数量',
              // 系列中的数据内容数组
              data: this.orderData,
              // 折线图
              type: 'line',
              color: ['#F74B83'],
              itemStyle: { normal: { label: { show: true } } }
            }
          ]
        }
        this.chart2.setOption(option)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .dashboard-container {
        padding: 20px;
        background-color: rgb(240, 242, 245);
        position: relative;

        .container {
            background-color: #ffffff;
            padding: 10px 0 0 20px;
        }

        .chart-container {
            background-color: #ffffff;
            padding-top: 10px;

            .chart {
                height:400px;
                width:100%;
            }
        }
    }
</style>
