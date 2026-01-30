<template>
  <el-card
    class="chart-card"
    :body-style="{
      padding: '0px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <div slot="header" class="chart-header">
      <h3>
        重点项目执行进度
        <span
          style="
            font-size: 12px;
            color: #999;
            margin-left: 8px;
            font-weight: normal;
          "
          >[{{ currentYear }}年]</span
        >
      </h3>
    </div>
    <div class="chart-body" ref="chart"></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "ProjectProgressCard",
  data() {
    return {
      chart: null,
      currentYear: new Date().getFullYear(),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.chart) this.chart.dispose();
  },
  methods: {
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    initChart() {
      if (!this.$refs.chart) return;
      this.chart = echarts.init(this.$refs.chart);

      const projects = [
        {
          name: "《1500米级水下采油树设计、制造及测试技术》",
          shortName: "1500米级水下采油树技术",
          value: 45,
        },
        {
          name: "《海上超高温高压钻完井关键技术研究及示范应用》",
          shortName: "海上超高温高压钻完井技术",
          value: 78,
        },
        {
          name: "《超深水超浅层气田开发关键技术研究及工程示范》",
          shortName: "超深水超浅层气田开发技术",
          value: 92,
        },
      ];

      const option = {
        grid: {
          top: 25,
          right: 50, // Increase right padding to prevent label cutoff
          bottom: 0,
          left: 10,
          containLabel: false,
        },
        xAxis: {
          type: "value",
          min: 0,
          max: 100,
          show: false,
        },
        yAxis: {
          type: "category",
          data: projects.map((p) => ""),
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
          inverse: true,
        },
        series: [
          // Background Bar
          {
            name: "Background",
            type: "bar",
            z: 1,
            barGap: "-100%",
            barCategoryGap: "35%",
            data: projects.map((p) => 100),
            barWidth: 12, // Thicker bars
            itemStyle: {
              color: "#e8eef5",
              borderRadius: 6, // Slightly more round
            },
            silent: true,
          },
          // Progress Bar
          {
            name: "Progress",
            type: "bar",
            z: 2,
            barCategoryGap: "35%",
            data: projects.map((p, index) => ({
              value: p.value,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#2B3674", // Theme Blue
                  },
                  {
                    offset: 1,
                    color: "#4A7BF7", // Lighter Tech Blue
                  },
                ]),
                borderRadius: 6,
              },
            })),
            barWidth: 12, // Thicker bars
            label: { show: false },
          },
          // 项目名称标签（使用scatter类型在左侧显示）
          {
            name: "Labels",
            type: "scatter",
            z: 3,
            symbolSize: 0,
            data: projects.map((p, index) => [0, index]),
            label: {
              show: true,
              position: "left",
              formatter: (params) => {
                const name = projects[params.data[1]].name;
                return name;
              },
              color: "#333",
              fontSize: 12,
              fontWeight: 500,
              align: "left",
              verticalAlign: "bottom",
              offset: [0, -12],
            },
          },
          // 百分比标签（右侧）
          {
            name: "Percentage",
            type: "scatter",
            z: 3,
            symbolSize: 0,
            data: projects.map((p, index) => [100, index]),
            label: {
              show: true,
              position: "right",
              formatter: (params) => projects[params.data[1]].value + "%",
              color: "#333",
              fontSize: 14, // Larger font
              fontWeight: 600,
              align: "left",
              offset: [10, 0],
            },
          },
        ],
      };

      this.chart.setOption(option);
    },
  },
};
</script>

<style scoped>
.chart-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.chart-card:hover {
  box-shadow: var(--shadow-sm);
  border-color: #d0d7e8;
  transform: translateY(-2px);
}
.chart-card ::v-deep .el-card__header {
  padding: 0 12px;
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.chart-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}

.chart-header h3::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 14px;
  background: #4a7bf7;
  margin-right: 8px;
  border-radius: 2px;
}

.chart-body {
  flex: 1;
  min-height: 150px; /* Adjust as needed */
  width: 100%;
}
</style>
