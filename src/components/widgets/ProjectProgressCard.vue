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
            color: var(--text-secondary);
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
      window.addEventListener("theme-change", this.handleThemeChange);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("theme-change", this.handleThemeChange);
    if (this.chart) this.chart.dispose();
  },
  methods: {
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    handleThemeChange() {
      this.initChart();
    },
    initChart() {
      if (!this.$refs.chart) return;
      let chart = echarts.getInstanceByDom(this.$refs.chart);
      if (!chart) chart = echarts.init(this.$refs.chart);
      this.chart = chart;

      const isDark = document.body.classList.contains("dark-theme");
      const textColor = isDark ? "#ffffff" : "#333";
      const bgBarColor = isDark ? "rgba(255, 255, 255, 0.1)" : "#e8eef5"; // Light transparent for dark mode

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
          right: 60,
          bottom: 10,
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
          // Background Bar (轨道)
          {
            name: "Background",
            type: "bar",
            z: 1,
            barGap: "-100%",
            barCategoryGap: "35%",
            data: projects.map((p) => 100),
            barWidth: 16,
            itemStyle: {
              color: isDark ? "rgba(57, 90, 139, 0.3)" : "#e8eef5",
              borderRadius: 8,
            },
            silent: true,
          },
          // Progress Bar (主进度条)
          {
            name: "Progress",
            type: "bar",
            z: 2,
            barCategoryGap: "35%",
            data: projects.map((p, index) => ({
              value: p.value,
              itemStyle: {
                color: isDark
                  ? new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 0, color: "#00E5FF" },
                      { offset: 0.5, color: "#00D4FF" },
                      { offset: 1, color: "#00BFFF" },
                    ])
                  : new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 0, color: "#4A7BF7" },
                      { offset: 1, color: "#2B3674" },
                    ]),
                borderRadius: 8,
                shadowColor: isDark
                  ? "rgba(0, 229, 255, 0.6)"
                  : "rgba(74, 123, 247, 0.3)",
                shadowBlur: 15,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
              },
            })),
            barWidth: 16,
            label: { show: false },
          },
          // 高光条 (顶部光泽效果)
          {
            name: "Highlight",
            type: "bar",
            z: 3,
            barGap: "-100%",
            barCategoryGap: "35%",
            data: projects.map((p) => ({
              value: p.value,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: isDark
                      ? "rgba(255, 255, 255, 0.4)"
                      : "rgba(255, 255, 255, 0.6)",
                  },
                  { offset: 0.3, color: "rgba(255, 255, 255, 0)" },
                ]),
                borderRadius: [8, 8, 0, 0],
              },
            })),
            barWidth: 16,
            silent: true,
          },
          // 项目名称标签
          {
            name: "Labels",
            type: "scatter",
            z: 4,
            symbolSize: 0,
            data: projects.map((p, index) => [0, index]),
            label: {
              show: true,
              position: "left",
              formatter: (params) => {
                const name = projects[params.data[1]].name;
                return `{icon|●} ${name}`;
              },
              rich: {
                icon: {
                  color: isDark ? "#00E5FF" : "#4A7BF7",
                  fontSize: 10,
                  fontWeight: "bold",
                },
              },
              color: textColor,
              fontSize: 11,
              fontWeight: 500,
              align: "left",
              verticalAlign: "bottom",
              offset: [0, -18],
            },
          },
          // 百分比标签（更醒目）
          {
            name: "Percentage",
            type: "scatter",
            z: 4,
            symbolSize: 0,
            data: projects.map((p, index) => [100, index]),
            label: {
              show: true,
              position: "right",
              formatter: (params) => {
                const value = projects[params.data[1]].value;
                return `{percent|${value}%}`;
              },
              rich: {
                percent: {
                  color: isDark ? "#00E5FF" : "#2B3674",
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif",
                  textShadowColor: isDark
                    ? "rgba(0, 229, 255, 0.8)"
                    : "rgba(43, 54, 116, 0.3)",
                  textShadowBlur: isDark ? 10 : 5,
                },
              },
              align: "left",
              offset: [12, 0],
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
  color: var(--primary-color);
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.3);
  display: flex;
  align-items: center;
}

.chart-header h3::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 14px;
  background: var(--primary-color);
  box-shadow: 0 0 8px var(--primary-color);
  margin-right: 8px;
  border-radius: 2px;
}

.chart-body {
  flex: 1;
  min-height: 150px; /* Adjust as needed */
  width: 100%;
}

/* 暗黑模式下的图表卡片增强 */
.dark-theme .chart-card {
  border-color: #1e293b;
  box-shadow: var(--shadow-xs);
}

.dark-theme .chart-card:hover {
  border-color: var(--hover-border);
  box-shadow: var(--shadow-sm);
  transform: translateY(-3px);
}

.dark-theme .chart-header h3 {
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.4);
}

.dark-theme .chart-header h3::before {
  box-shadow: 0 0 12px var(--primary-color);
}
</style>
