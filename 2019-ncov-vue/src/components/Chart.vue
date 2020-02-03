<template>
    <div ref="chartDom" style="height:600px;"></div>
</template>

<script>
//下面三行echarts按需加载
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/title";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    }
    //或深度监听
    // option: {
    //     handler(val) {
    //         this.chart.setOption(val);
    //     },
    //     deep: true
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    //var echarts = require('echarts');

    // 基于准备好的dom，初始化echarts实例
    //var myChart = echarts.init(document.getElementById('main'));
    //this.chart = echarts.init(this.$refs.chartDom);
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
    // 绘制图表
    //this.chart.setOption();
  },
  beforeDestroy() {
    //销毁事件，防止内存泄漏
    if (this.$refs && this.$refs.chartDom){
        removeListener(this.$refs.chartDom, this.resize);
        this.chart.dispose();
        this.chart = null;
    }
  },
  methods: {
    resize() {
      //console.log('resize')
      if (this.chart)
        this.chart.resize();
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
    }
  }
};
</script>

<style>

</style>