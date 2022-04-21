<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0">
      <div slot="header" class="clearfix">
        <!-- 头部左侧内容 -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visite"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧内容 -->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <!-- 
            v-model="value1"
           -->
          <el-date-picker
            v-model="date"
            class="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <!-- 容器 -->
            <div class="charts" ref="charts"></div>

          </el-col>
          <el-col :span="6">
            <h3>门店{{ title }}排名</h3>
            <ul>
              <li>
                <span class="rindex">1</span>
                <span>肯德基</span>
                <span class="rvalue">323,234</span>
              </li>
              <li>
                <span class="rindex">2</span>
                <span>麦当劳</span>
                <span class="rvalue">299,132</span>
              </li>
              <li>
                <span class="rindex">3</span>
                <span>肯德基</span>
                <span class="rvalue">283,998</span>
              </li>
              <li>
                <span>4</span>
                <span>海底捞</span>
                <span class="rvalue">266,233</span>
              </li>
              <li>
                <span>5</span>
                <span>西八</span>
                <span class="rvalue">223,445</span>
              </li>
              <li>
                <span>6</span>
                <span>汉堡王</span>
                <span class="rvalue">219,663</span>
              </li>
              <li>
                <span>7</span>
                <span>真功夫</span>
                <span class="rvalue">200,997</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "",
  data() {
    return {
      activeName: "sale",
      mycharts: null,
      // 收集日历的数据
      date: [],

    };
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    // 配置数据
    this.mycharts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 60, 80, 90, 60, 44],
          color: "pink",
        },
      ],
    });

  },
  computed: {
    //计算属性之标题
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
    list(){
        return this.activeName == "sale" ?[10, 52, 200, 334, 390, 330, 220, 60, 80, 90, 60, 44]:[1320, 5232, 2300, 3334, 3905, 3630, 2202, 6150, 80322, 9120, 640, 444]
    },
    color(){
        return this.activeName == "sale" ? "pink" : "blue";
    }
  },
  // 监听属性
  watch: {
    title() {
      // 重新修改图表的配置数据
      // 图表配置数据可以再次修改 如果有新的数值 新的数值 没有新的数值 还是用以前的
      this.mycharts.setOption({
        title: {
          text: this.title,
        },
        series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.list,
          color: this.color
        },
      ],
      });
    },
  },
  methods: {
    //   今天
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0 10px;
}
.date {
  width: 250px;
  margin: 0 20px;
}
.charts {
  width: 95%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px 0;
}
span {
  margin-right: 25px;
  margin-left: 6px;
}
.rindex {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: #fff;
  text-align: center;
  float: left;
  margin: 0;
  margin-right: 20px;
}
.rvalue {
  float: right;
}
</style>