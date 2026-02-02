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
        销量情况运行
        <span
          style="
            font-size: 12px;
            color: var(--text-secondary);
            margin-left: 8px;
            font-weight: normal;
          "
          >[2016]</span
        >
      </h3>
      <div class="header-actions">
        <div class="custom-toggle">
          <div
            class="toggle-item"
            :class="{ active: type === 'gas' }"
            @click="type = 'gas'"
          >
            天然气
          </div>
          <div
            class="toggle-item"
            :class="{ active: type === 'oil' }"
            @click="type = 'oil'"
          >
            凝析油
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
  name: "SalesComparisonCard",
  data() {
    return {
      chart: null,
      type: "gas", // gas | oil
      resizeObserver: null,
    };
  },
  watch: {
    type() {
      this.initChart();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener("resize", this.handleResize);
      window.addEventListener("theme-change", this.handleThemeChange);
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
    window.removeEventListener("theme-change", this.handleThemeChange);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    handleThemeChange() {
      this.initChart();
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

      // 模拟数据 (销量数据)
      const dataMapping = {
        gas: {
          planMonth: [
            9.5, 8.5, 9.8, 8.2, 9.2, 9.7, 10.1, 9.9, 10.2, 10.5, 10.8, 11.2,
          ],
          actMonth: [
            9.3,
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
            9.5, 17.88, 27.68, 35.88, 45.08, 54.78, 64.88, 74.78, 84.98, 95.48,
            106.28, 117.48,
          ],
          actCum: [
            9.3,
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
          y1Max: 15,
          y2Max: 150,
          unitLeft: "月销气 (亿方)",
          unitRight: "年销气 (亿方)",
        },
        oil: {
          planMonth: [12, 11, 13, 10, 11.5, 12, 12.5, 12.2, 13, 13.5, 14, 14.5],
          actMonth: [
            11.8,
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
            12, 23, 36, 46, 57.5, 69.5, 82, 94.2, 107.2, 120.7, 134.7, 149.2,
          ],
          actCum: [
            11.8,
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
          y1Max: 20,
          y2Max: 200,
          unitLeft: "月销油 (万吨)",
          unitRight: "年销油 (万吨)",
        },
      };

      const currentData = dataMapping[this.type];

      const option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(15, 22, 41, 0.9)",
          borderColor: "#334155",
          borderWidth: 1,
          textStyle: { color: "#CBD5E1", fontSize: 12 },
          axisPointer: { type: "shadow" },
          formatter: (params) => {
            let res = `<div style="font-weight:600;margin-bottom:4px;">${params[0].name}</div>`;
            params.forEach((p) => {
              if (
                p.value === null ||
                p.seriesName === "" ||
                typeof p.value === "undefined"
              ) {
                return;
              }
              const marker = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
                p.color.colorStops ? p.color.colorStops[1].color : p.color
              };"></span>`;
              res += `<div style="display:flex;justify-content:space-between;gap:20px;">
                <span>${marker}${p.seriesName}</span>
                <span style="font-weight:600;">${p.value}</span>
              </div>`;
            });
            return res;
          },
        },
        legend: {
          data: ["计划月销量", "实际月销量", "计划销量", "实际销量"],
          top: 10,
          left: "center",
          itemWidth: 25, // 统一宽度以展示线段
          itemHeight: 12,
          textStyle: { color: textColor, fontSize: 10 },
          itemGap: 20,
        },
        grid: {
          top: 100,
          left: 10,
          right: 10,
          bottom: 10,
          containLabel: true,
        },
        xAxis: {
          type: "category",
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
          axisTick: { show: false },
          axisLine: { lineStyle: { color: lineColor } },
          axisLabel: { color: textColor, fontSize: 10 },
        },
        yAxis: [
          {
            type: "value",
            name: currentData.unitLeft,
            max: currentData.y1Max,
            interval: currentData.y1Max / 5,
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
            name: currentData.unitRight,
            max: currentData.y2Max,
            interval: currentData.y2Max / 5,
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
          // ========== 计划月销量 (2D Bar) ==========
          {
            name: "计划月销量",
            type: "bar",
            barWidth: 10,
            barGap: "20%",
            data: currentData.planMonth,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(163, 174, 208, 0.5)" },
                { offset: 1, color: "rgba(163, 174, 208, 0.1)" },
              ]),
              borderRadius: [2, 2, 0, 0],
            },
          },
          // ========== 实际月销量 (2D Bar) ==========
          {
            name: "实际月销量",
            type: "bar",
            barWidth: 10,
            data: currentData.actMonth,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#4A7BF7" },
                { offset: 1, color: "rgba(74, 123, 247, 0.1)" },
              ]),
              borderRadius: [2, 2, 0, 0],
              shadowBlur: 10,
              shadowColor: "rgba(74, 123, 247, 0.3)",
            },
          },

          // 累销线 (Plan)
          {
            name: "计划销量",
            type: "line",
            yAxisIndex: 1,
            z: 20,
            data: currentData.planCum,
            smooth: true,
            showSymbol: false,
            lineStyle: { color: "#FFD700", width: 3 },
            itemStyle: {
              color: "#FFD700",
              shadowBlur: 5,
              shadowColor: "rgba(255, 215, 0, 0.5)",
            },
          },
          // 累销线 (Actual)
          {
            name: "实际销量",
            type: "line",
            yAxisIndex: 1,
            z: 20,
            data: currentData.actCum,
            connectNulls: true,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              color: "#4A7BF7",
              borderColor: "#fff",
              borderWidth: 2,
              shadowBlur: 10,
              shadowColor: "rgba(74, 123, 247, 0.5)",
            },
            lineStyle: { color: "#4A7BF7", width: 3 },
          },
        ],
      };

      this.chart.setOption(option, true);
    },
  },
};
</script>

<style scoped>
.chart-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: none; /* 移除阴影以对齐整体风格 */
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
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
  padding: 2px 10px;
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
