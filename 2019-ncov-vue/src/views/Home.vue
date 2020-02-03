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
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }]
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