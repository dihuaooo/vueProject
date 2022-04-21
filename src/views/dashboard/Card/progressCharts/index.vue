<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
export default {
  name: "",
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        // 最小值与最大值的设置
        min: 0,
        max: 100,
      },
      yAxis: {
        // 隐藏y轴
        show: false,
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "green",
          //   柱状图的宽度的设置
          barWidth: 10,
          //  背景颜色的设置
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          // 文本的设置
          label: {
            show: true,
            // 改变文本的内容
            formatter: "|",
            // 文本标签位置的调试
            position: "right",
          },
        },
      ],
      // 布局的调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>