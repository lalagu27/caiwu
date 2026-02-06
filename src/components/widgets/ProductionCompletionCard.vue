<template>
  <el-card
    class="chart-card"
    :body-style="{
      padding: '0px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }"
  >
    <div slot="header" class="chart-header">
      <h3>
        <span class="header-icon"></span>
        产量完成情况
        <span
          style="
            font-size: 12px;
            color: var(--text-secondary);
            margin-left: 8px;
            font-weight: normal;
          "
          >[2026]</span
        >
      </h3>
      <div class="header-actions">
        <!-- Styled Radio Group-like buttons -->
        <div class="custom-toggle">
          <span
            class="toggle-item"
            :class="{ active: type === 'gas' }"
            @click="type = 'gas'"
            >天然气</span
          >
          <span
            class="toggle-item"
            :class="{ active: type === 'oil' }"
            @click="type = 'oil'"
            >凝析油</span
          >
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
  name: "ProductionCompletionCard",
  data() {
    return {
      chart: null,
      type: "gas", // 'gas' or 'oil'
      resizeObserver: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener("resize", this.handleResize);

      // Upgrade: Use ResizeObserver for container size changes
      if (this.$refs.chart) {
        this.resizeObserver = new ResizeObserver(() => {
          this.handleResize();
        });
        // We observe the wrapper or chart div
        this.resizeObserver.observe(this.$refs.chart.parentNode);
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.chart) this.chart.dispose();
  },
  watch: {
    type() {
      this.initChart();
    },
  },
  methods: {
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    initChart() {
      if (!this.$refs.chart) return;
      let chart = echarts.getInstanceByDom(this.$refs.chart);
      if (!chart) chart = echarts.init(this.$refs.chart);
      this.chart = chart;

      const months = Array.from({ length: 12 }, (_, i) => `${i + 1}月`);

      // Data Config
      const isGas = this.type === "gas";
      const currentData = isGas
        ? {
            planMonth: [
              10.2, 9.8, 10.1, 9.5, 10.3, 11.0, 10.8, 11.2, 11.5, 12.0, 12.5,
              13.0,
            ],
            actMonth: [
              10.3,
              10.5,
              10.2,
              9.8,
              10.0,
              11.2,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            planCum: [
              10.2, 20.0, 30.1, 39.6, 49.9, 60.9, 71.7, 82.9, 94.4, 106.4,
              118.9, 131.9,
            ],
            actCum: [
              10.3,
              20.8,
              31.0,
              40.8,
              50.8,
              62.0,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            y1Name: "月产气 (亿方)",
            y2Name: "年产气 (亿方)",
            y1Max: 15,
            y2Max: 150,
          }
        : {
            planMonth: [
              8.5, 8.2, 8.6, 8.0, 8.8, 9.5, 9.2, 9.6, 10.0, 10.5, 11.0, 11.5,
            ],
            actMonth: [
              8.6,
              8.8,
              8.5,
              8.2,
              9.0,
              9.6,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            planCum: [
              8.5, 16.7, 25.3, 33.3, 42.1, 51.6, 60.8, 70.4, 80.4, 90.9, 101.9,
              113.4,
            ],
            actCum: [
              8.6,
              17.4,
              25.9,
              34.1,
              43.1,
              52.7,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            y1Name: "月产油 (万吨)",
            y2Name: "年产油 (万吨)",
            y1Max: 12,
            y2Max: 120,
          };

      const isDark = document.body.classList.contains("dark-theme");
      const textColor = isDark ? "#ffffff" : "#666";
      const headingColor = isDark ? "#ffffff" : "#333";
      const axisLineColor = isDark ? "#1a8fff" : "#E1E8ED";
      const splitLineColor = isDark ? "rgba(255, 255, 255, 0.15)" : "#F0F4F9";

      // --- 3D Cylinder Settings ---
      const barWidth = 12;
      const barGap = "10%";
      // Calculcated Offset for PictorialBar:
      // Gap 10%. Total Width = 2.1 * barWidth. Center = 1.05.
      // Left Bar Center = 0.5. Distance = 0.55 = 55%.
      const symbolOffsetLeft = ["-55%", 0];
      const symbolOffsetRight = ["55%", 0];

      // Colors definitions
      // Plan (Cyan)
      const planColorStr = {
        top: "#00F0FF",
        bottom: "#00ADC0",
        bodyStart: "rgba(0, 240, 255, 1)",
        bodyEnd: "rgba(0, 140, 160, 0.8)",
      };
      // Actual (Blue)
      const actColorStr = {
        top: "#3B82F6",
        bottom: "#1E40AF",
        bodyStart: "rgba(59, 130, 246, 1)",
        bodyEnd: "rgba(30, 64, 175, 0.8)",
      };

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          backgroundColor: isDark
            ? "rgba(15, 22, 41, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          borderColor: isDark ? "#334155" : "#ddd",
          borderWidth: 1,
          textStyle: { color: isDark ? "#cbd5e1" : "#333" },
          formatter: (params) => {
            let res = `<div style="font-weight:600;margin-bottom:4px;">${params[0].name}</div>`;
            params.forEach((p) => {
              if (
                !p.seriesName ||
                p.seriesName.includes("Cap") ||
                p.seriesName.includes("Bottom") ||
                p.value === null ||
                typeof p.value === "undefined"
              ) {
                return;
              }
              const marker = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
                p.color && p.color.colorStops
                  ? p.color.colorStops[0].color
                  : p.color || "#fff"
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
          data: ["计划月产量", "实际月产量", "计划累产", "实际累产"],
          top: 10,
          left: "center",
          textStyle: { color: textColor, fontSize: 10 },
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 15,
        },
        grid: {
          top: 80,
          left: 10,
          right: 10,
          bottom: 10,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: months,
          axisLine: { lineStyle: { color: axisLineColor } },
          axisLabel: { color: textColor, fontSize: 10, interval: 0 },
          axisTick: { show: false },
        },
        yAxis: [
          {
            type: "value",
            name: currentData.y1Name,
            min: 0,
            max: currentData.y1Max,
            interval: currentData.y1Max / 5,
            position: "left",
            splitLine: {
              show: true,
              lineStyle: { type: "dashed", color: splitLineColor },
            },
            axisLabel: { color: textColor, fontSize: 10 },
            nameTextStyle: {
              color: textColor,
              padding: [0, 0, 5, -30],
              align: "left",
              fontSize: 10,
            },
          },
          {
            type: "value",
            name: currentData.y2Name,
            min: 0,
            max: currentData.y2Max,
            interval: currentData.y2Max / 5,
            position: "right",
            splitLine: { show: false },
            axisLabel: { color: textColor, fontSize: 10 },
            nameTextStyle: {
              color: textColor,
              padding: [0, -30, 5, 0],
              align: "right",
              fontSize: 10,
            },
          },
        ],
        series: [
          // ========== 计划月产量 (3D Cylinder - Cyan) ==========
          // Body
          {
            name: "计划月产量",
            type: "bar",
            barWidth: barWidth,
            barGap: barGap,
            data: currentData.planMonth,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "rgba(0, 173, 192, 0.8)" },
                { offset: 0.5, color: "rgba(0, 240, 255, 1)" },
                { offset: 1, color: "rgba(0, 173, 192, 0.8)" },
              ]),
            },
          },
          // Top Cap
          {
            name: "计划月产量", // Same name for legend handling
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, barWidth * 0.45],
            symbolOffset: symbolOffsetLeft,
            symbolPosition: "end",
            z: 12,
            itemStyle: { color: "#00F0FF" },
            data: currentData.planMonth,
            tooltip: { show: false },
          },

          // ========== 实际月产量 (3D Cylinder - Blue) ==========
          // Body
          {
            name: "实际月产量",
            type: "bar",
            barWidth: barWidth,
            barGap: barGap,
            data: currentData.actMonth,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "rgba(30, 64, 175, 0.8)" },
                { offset: 0.5, color: "rgba(59, 130, 246, 1)" },
                { offset: 1, color: "rgba(30, 64, 175, 0.8)" },
              ]),
            },
          },
          // Top Cap
          {
            name: "实际月产量",
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, barWidth * 0.45],
            symbolOffset: symbolOffsetRight,
            symbolPosition: "end",
            z: 12,
            itemStyle: { color: "#3B82F6" },
            data: currentData.actMonth,
            tooltip: { show: false },
          },

          // 累产线 (Plan)
          {
            name: "计划累产",
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
          // 累产线 (Actual)
          {
            name: "实际累产",
            type: "line",
            yAxisIndex: 1,
            z: 20,
            data: currentData.actCum,
            connectNulls: true,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              color: "#FF8C00", // Orange
              borderColor: "#fff",
              borderWidth: 2,
              shadowBlur: 10,
              shadowColor: "rgba(255, 140, 0, 0.5)",
            },
            lineStyle: { color: "#FF8C00", width: 3 },
          },
        ],
      };

      this.chart.setOption(option, true);
    },
  },
};
</script>

<style scoped>
/* Card Base */
.chart-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
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

/* Header */
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px; /* Fixed height for consistency */
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
  display: none;
}

/* Header Actions */
.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* Custom Toggle Switch for Oil/Gas */
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

/* Chart Body */
.chart-wrapper {
  flex: 1;
  min-height: 0;
  position: relative;
  width: 100%;
  background: transparent;
  border: none;
}

.chart-body {
  width: 100%;
  height: 100%;
}
</style>
