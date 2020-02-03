<template>
  <div class="chartDiv">
    <Chart :option="chartOption"  :style="{height:chartHeight}"></Chart>
  </div>
</template>
<script>
import Chart from '@/components/Chart'
export default {
  components: {
    Chart
  },
  data() {
    return {
      chartHeight:100,
      chartOption: {}
    }
  },
  beforeMount() {
    const height = 100
    //获取屏幕高度
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    this.chartHeight = (h - height)+'px'; //减去页面上固定高度height
  },
  mounted() {
    this.getChartData()
    // this.interval = setInterval(() =>{
    //   this.getChartData();
    // }, 3000);
  },
  methods: {
    getChartData() {
      this.getTestData();
      return;
      // request({
      //   url: '/api/dashboard/chart',
      //   //url: '/dashboard/analysis1',
      //   method: "get",
      //   params: { ID: 12345}
      // }).then(response => {
      //     this.chartOption = {
      //       title: {
      //           text: 'ECharts 入门示例'
      //       },
      //       tooltip: {},
      //       xAxis: {
      //           data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      //       },
      //       yAxis: {},
      //       series: [{
      //           name: '销量',
      //           type: 'bar',
      //           data: response.data// [5, 20, 36, 10, 10, 20]
      //       }]
      //     }
      //   })
    },
    getTestData() {
      this.chartOption = {
              title: {
                  text: 'ECharts 入门示例'
              },
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross',
                      crossStyle: {
                          color: '#999'
                      }
                  }
              },
              toolbox: {
                  feature: {
                      dataView: {show: true, readOnly: false},
                      magicType: {show: true, type: ['line', 'bar']},
                      restore: {show: true},
                      saveAsImage: {show: true}
                  }
              },
              legend: {               left:'50%',
                data: ['增量', '总量']
              },       
              grid: {
                  left:50
              } ,    
              xAxis: [
                {
                  type: 'category',
                  axisPointer: {
                    type: 'shadow'
                  },
                  data: ['1.23', '1.24', '1.25', '1.26', '1.27', '1.28']
                }
              ],
              yAxis: [
                {
                    type: 'value',
                    name: '增量',
                    min: 0,
                    max: 500,
                    interval: 100,
                    axisLabel: {
                        formatter: '{value} 人'
                    }
                },
                // {
                //     type: 'value',
                //     name: '总量',
                //     min: 0,
                //     max: 3000,
                //     interval: 500,
                //     axisLabel: {
                //         formatter: '{value} 人'
                //     }
                // }
              ],
              series: [
                {
                  name: '增量',
                  type: 'bar',
                  data: [50, 200, 360, 300, 100, 500]
                },
                // {
                //   name: '总量',
                //   type: 'line',
                //   yAxisIndex: 1,
                //   data: [100, 150, 500, 1000, 1500, 2000]
                // }
              ]
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  
}
</script>
<style scoped>
.chartDiv{
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>