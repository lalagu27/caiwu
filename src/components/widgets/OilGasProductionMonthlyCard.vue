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
        <div class="header-icon"></div>
        油气产量分月对比
        <span class="year-label">[2026/01]</span>
      </h3>
      <div class="header-actions">
        <div class="custom-toggle">
          <div
            class="toggle-item"
            :class="{ active: timeType === 'day' }"
            @click="timeType = 'day'"
          >
            日
          </div>
          <div
            class="toggle-item"
            :class="{ active: timeType === 'month' }"
            @click="timeType = 'month'"
          >
            月
          </div>
          <div
            class="toggle-item"
            :class="{ active: timeType === 'year' }"
            @click="timeType = 'year'"
          >
            年
          </div>
        </div>
      </div>
    </div>

    <div class="chart-wrapper">
      <div class="chart-body" ref="chart"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "OilGasProductionMonthlyCard",
  data() {
    return {
      chart: null,
      timeType: "month",
      resizeObserver: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener("resize", this.handleResize);
      if (this.$refs.chart) {
        this.resizeObserver = new ResizeObserver(() => {
          this.handleResize();
        });
        this.resizeObserver.observe(this.$refs.chart.parentNode);
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.chart) {
      this.chart.dispose();
    }
  },
  watch: {
    timeType() {
      this.initChart();
    },
  },
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    initChart() {
      if (!this.$refs.chart) return;
      if (this.chart) {
        this.chart.dispose();
      }
      this.chart = echarts.init(this.$refs.chart);

      const isDark = document.body.classList.contains("dark-theme");
      const textColor = isDark ? "#A3AED0" : "#666";
      const lineColor = isDark ? "rgba(255, 255, 255, 0.05)" : "#eee";

      // 模拟数据 (万方)
      const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
      const data = {
        planOil: [55, 50, 56, 48, 58, 62, 60, 62, 65, 62, 60, 61],
        planGas: [38, 35, 36, 35, 32, 30, 38, 38, 35, 40, 42, 41],
        actOil: [
          58,
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
          null,
        ],
        actGas: [
          42,
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
          null,
        ],
        planCum: [
          100, 200, 310, 420, 550, 680, 810, 950, 1080, 1220, 1350, 1480,
        ],
        actCum: [
          110,
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
          null,
        ],
      };

      const option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: isDark
            ? "rgba(15, 22, 41, 0.9)"
            : "rgba(255, 255, 255, 0.9)",
          borderColor: isDark ? "#334155" : "#ddd",
          borderWidth: 1,
          textStyle: { color: isDark ? "#CBD5E1" : "#333", fontSize: 12 },
          axisPointer: { type: "shadow" },
        },
        legend: {
          bottom: 5,
          left: "center",
          itemWidth: 12,
          itemHeight: 12,
          textStyle: { color: textColor, fontSize: 10 },
          data: [
            "计划月产油",
            "计划月产气",
            "实际月产油",
            "实际月产气",
            "计划年产油气",
            "实际年产油气",
          ],
        },
        grid: {
          top: 60,
          left: 10,
          right: 10,
          bottom: 45,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: months,
          axisTick: { show: false },
          axisLine: { lineStyle: { color: lineColor } },
          axisLabel: { color: textColor, fontSize: 10 },
        },
        yAxis: [
          {
            type: "value",
            name: "月产(万方)",
            nameTextStyle: {
              color: textColor,
              fontSize: 10,
              align: "left",
              padding: [0, 0, 8, 0],
            },
            splitLine: { lineStyle: { color: lineColor, type: "dashed" } },
            axisLabel: { color: textColor, fontSize: 10 },
          },
          {
            type: "value",
            name: "年累(万方)",
            nameTextStyle: {
              color: textColor,
              fontSize: 10,
              align: "right",
              padding: [0, 0, 8, 0],
            },
            splitLine: { show: false },
            axisLabel: { color: textColor, fontSize: 10 },
          },
        ],
        series: [
          // 计划
          {
            name: "计划月产油",
            type: "bar",
            stack: "计划",
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(163, 174, 208, 0.4)" },
                { offset: 1, color: "rgba(163, 174, 208, 0.1)" },
              ]),
            },
            data: data.planOil,
          },
          {
            name: "计划月产气",
            type: "bar",
            stack: "计划",
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(163, 174, 208, 0.2)" },
                { offset: 1, color: "rgba(163, 174, 208, 0.05)" },
              ]),
              borderRadius: [2, 2, 0, 0],
            },
            data: data.planGas,
          },
          // 实际
          {
            name: "实际月产油",
            type: "bar",
            stack: "实际",
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#4A7BF7" },
                { offset: 1, color: "rgba(74, 123, 247, 0.1)" },
              ]),
            },
            data: data.actOil,
          },
          {
            name: "实际月产气",
            type: "bar",
            stack: "实际",
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00F0FF" },
                { offset: 1, color: "rgba(0, 240, 255, 0.1)" },
              ]),
              borderRadius: [2, 2, 0, 0],
              shadowBlur: 8,
              shadowColor: "rgba(0, 240, 255, 0.3)",
            },
            data: data.actGas,
          },
          // 累计线
          {
            name: "计划年产油气",
            type: "line",
            yAxisIndex: 1,
            symbol: "circle",
            symbolSize: 6,
            smooth: true,
            lineStyle: { color: "#FFD700", width: 2 },
            itemStyle: {
              color: "#FFD700",
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 5,
              shadowColor: "rgba(255, 215, 0, 0.5)",
            },
            data: data.planCum,
          },
          {
            name: "实际年产油气",
            type: "line",
            yAxisIndex: 1,
            symbol: "circle",
            symbolSize: 8,
            smooth: true,
            lineStyle: { color: "#4A7BF7", width: 3 },
            itemStyle: {
              color: "#4A7BF7",
              borderColor: "#fff",
              borderWidth: 2,
              shadowBlur: 10,
              shadowColor: "rgba(74, 123, 247, 0.5)",
            },
            data: data.actCum,
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
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  box-shadow: none;
}

.chart-card ::v-deep .el-card__header {
  padding: 0 12px;
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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

.header-icon {
  width: 4px;
  height: 14px;
  background: var(--primary-color);
  box-shadow: 0 0 8px var(--primary-color);
  margin-right: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}

.year-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-left: 8px;
  font-weight: normal;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.custom-toggle {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 2px;
  border: 1px solid var(--border-color);
}

.toggle-item {
  font-size: 12px;
  color: var(--text-secondary);
  padding: 2px 8px;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.3s;
}

.toggle-item:hover {
  color: var(--text-primary);
}

.toggle-item.active {
  background: var(--primary-color);
  color: var(--primary-dark);
  font-weight: 600;
  box-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
}

.chart-wrapper {
  flex: 1;
  min-height: 0;
  position: relative;
  width: 100%;
}

.chart-body {
  width: 100%;
  height: 100%;
}
</style>
