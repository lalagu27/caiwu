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
        新增经济可采储量
        <span
          style="
            font-size: 12px;
            color: var(--text-secondary);
            margin-left: 8px;
          "
          >[{{ currentDate }}]</span
        >
      </h3>
      <div class="chart-tabs">
        <button
          class="tab"
          :class="{ active: period === '日' }"
          @click="period = '日'"
        >
          日
        </button>
        <button
          class="tab"
          :class="{ active: period === '月' }"
          @click="period = '月'"
        >
          月
        </button>
        <button
          class="tab"
          :class="{ active: period === '年' }"
          @click="period = '年'"
        >
          年
        </button>
      </div>
    </div>
    <div class="chart-body" ref="chart"></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "ReservesCompletionCard",
  data() {
    return {
      chart: null,
      period: "月",
      currentDate: "",
    };
  },
  created() {
    const today = new Date();
    this.currentDate = `${today.getFullYear()}`;
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
      const axisLineColor = isDark ? "rgba(255, 255, 255, 0.1)" : "#E1E8ED";
      const splitLineColor = isDark ? "rgba(255, 255, 255, 0.05)" : "#F0F4F9";

      // Target has full 12 months data, Actual has only Jan/Feb
      const displayDataTarget = [
        100, 100, 100, 120, 120, 120, 120, 110, 110, 110, 100, 100,
      ];
      const displayDataActual = [
        105,
        108,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];

      const option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: isDark
            ? "rgba(10, 20, 40, 0.95)"
            : "rgba(255, 255, 255, 0.9)",
          borderColor: isDark ? "#4A7BF7" : "#ccc",
          textStyle: { color: textColor },
          formatter: (params) => {
            let res = `<div style="font-weight:bold;margin-bottom:5px;">${params[0].name}</div>`;
            params.forEach((item) => {
              res += `<div style="display:flex;justify-content:space-between;gap:15px;margin-bottom:3px;">
                          <span>${item.marker} ${item.seriesName}</span>
                          <span style="font-weight:bold;">${item.value}</span>
                        </div>`;
            });
            return res;
          },
        },
        legend: {
          data: ["目标", "已完成"],
          top: 0,
          right: 10,
          itemWidth: 10,
          itemHeight: 10,
          icon: "circle",
          textStyle: { fontSize: 12, color: textColor },
        },
        grid: {
          top: 40,
          right: 20,
          bottom: 20,
          left: 15,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false, // Line chart usually starts from axis
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          axisLine: { lineStyle: { color: axisLineColor } },
          axisLabel: { color: textColor, fontSize: 12, interval: 0 },
          axisTick: { show: false },
        },
        yAxis: {
          type: "value",
          name: "万吨",
          nameTextStyle: {
            align: "right",
            padding: [0, 8, 0, 0],
            color: textColor,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: splitLineColor,
              type: "dashed",
            },
          },
          axisLabel: { color: textColor, fontSize: 11 },
        },
        series: [
          // Series 1: Purple/Blue (Target) - Matching "Blacklist/Redlist" vibe from image
          {
            name: "目标",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            showSymbol: false, // Show on hover usually, or always? Image shows always.
            data: displayDataTarget,
            itemStyle: {
              color: "#7B4DFF", // Purple
              borderColor: "#fff",
              borderWidth: 1,
            },
            lineStyle: {
              width: 3,
              color: "#7B4DFF",
            },
            areaStyle: {
              opacity: 0.3,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(123, 77, 255, 0.6)" },
                { offset: 1, color: "rgba(123, 77, 255, 0.0)" },
              ]),
            },
          },
          // Series 2: Cyan/Green (Actual) - Matching "Focus List" vibe from image
          {
            name: "已完成",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            showSymbol: true, // Let's show symbols for Actual to make it pop
            data: displayDataActual,
            itemStyle: {
              color: "#00F0FF", // Cyan
              borderColor: "#fff",
              borderWidth: 2,
              shadowColor: "#00F0FF",
              shadowBlur: 5,
            },
            lineStyle: {
              width: 3,
              color: "#00F0FF",
              shadowColor: "rgba(0, 240, 255, 0.5)",
              shadowBlur: 10,
            },
            areaStyle: {
              opacity: 0.4,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(0, 240, 255, 0.5)" },
                { offset: 1, color: "rgba(0, 240, 255, 0.0)" },
              ]),
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
  /* transform: translateY(-2px); Removed per user request */
}
.chart-card ::v-deep .el-card__header {
  padding: 0 12px;
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: none; /* Keep no border as requested */
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: none; /* Separator removed */
  width: 100%; /* Ensure full width for justification */
}

.chart-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-color);
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.3); /* Slight glow */
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
  min-height: 200px;
  width: 100%;
  height: 100%; /* 确保容器有明确高度供ECharts使用 */
}

.chart-tabs {
  display: flex;
  gap: 4px;
}

.tab {
  padding: 1px 6px; /* Matched to Dashboard */
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  line-height: 1.5;
}

.tab.active {
  background: var(--primary-color);
  color: var(--primary-dark); /* 改为深色文字，提升对比度 */
  border-color: var(--primary-color);
  font-weight: 600;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
}
</style>
