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
        <span class="year-label">[2026]</span>
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
      const textColor = isDark ? "#ffffff" : "#666";
      const lineColor = isDark ? "rgba(255, 255, 255, 0.15)" : "#eee";

      // 模拟数据 (万方)
      const months = Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
      const data = {
        planOil: [55, 50, 56, 48, 58, 62, 60, 62, 65, 62, 60, 61],
        planGas: [38, 35, 36, 35, 32, 30, 38, 38, 35, 40, 42, 41],
        actOil: [58, 60, 58, 50, 60, 65, 62, 0, 0, 0, 0, 0], // Mock some actual data
        actGas: [42, 38, 40, 36, 35, 32, 40, 0, 0, 0, 0, 0],
        planCum: [
          100, 200, 310, 420, 550, 680, 810, 950, 1080, 1220, 1350, 1480,
        ],
        actCum: [
          110,
          215,
          320,
          430,
          560,
          690,
          820,
          null,
          null,
          null,
          null,
          null,
        ],
      };

      // 3D Cylinder Configuration
      const barWidth = 14;
      const barGap = "30%";
      // Calculcated Offset for PictorialBar:
      // Group width = 14 + 14*0.3 + 14 = 32.2
      // Center 0. Left Bar Center = -9.1px. Right Bar Center = +9.1px.
      // 9.1px relative to 14px width is approx 65%
      const symbolOffsetLeft = ["-65%", 0];
      const symbolOffsetRight = ["65%", 0];

      // Colors
      const planColorStr = {
        top: "#00F0FF",
        bottom: "#00ADC0",
        bodyStart: "rgba(0, 240, 255, 1)",
        bodyEnd: "rgba(0, 140, 160, 0.8)",
      };

      const actColorStr = {
        top: "#3B82F6",
        bottom: "#1E40AF",
        bodyStart: "rgba(59, 130, 246, 1)",
        bodyEnd: "rgba(30, 64, 175, 0.8)",
      };

      const option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(10, 25, 50, 0.9)",
          borderColor: "#00F0FF",
          borderWidth: 1,
          textStyle: { color: "#fff", fontSize: 12 },
          axisPointer: { type: "shadow" },
          formatter: function (params) {
            let res = params[0].name + "<br/>";
            params.forEach((item) => {
              if (
                item.seriesName &&
                (item.seriesName.includes("产量") ||
                  item.seriesName.includes("累产"))
              ) {
                res +=
                  item.marker + item.seriesName + ": " + item.value + "<br/>";
              }
            });
            return res;
          },
        },
        legend: {
          top: 10,
          left: "center",
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 15,
          textStyle: { color: textColor, fontSize: 10 },
          data: ["计划月产量", "实际月产量", "计划累产", "实际累产"],
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
          axisTick: { show: false },
          axisLine: { lineStyle: { color: lineColor } },
          axisLabel: { color: textColor, fontSize: 10, interval: 0 },
        },
        yAxis: [
          {
            type: "value",
            name: "月产气 亿方",
            nameTextStyle: {
              color: textColor,
              align: "left",
              padding: [0, 0, 5, -30],
              fontSize: 10,
            },
            splitLine: {
              lineStyle: { color: lineColor, type: "dashed", opacity: 0.3 },
            },
            axisLabel: { color: textColor, fontSize: 10 },
          },
          {
            type: "value",
            name: "年产气 亿方",
            nameTextStyle: {
              color: textColor,
              align: "right",
              padding: [0, -30, 5, 0],
              fontSize: 10,
            },
            splitLine: { show: false },
            axisLabel: { color: textColor, fontSize: 10 },
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
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "rgba(0, 173, 192, 0.8)" },
                { offset: 0.5, color: "rgba(0, 240, 255, 1)" },
                { offset: 1, color: "rgba(0, 173, 192, 0.8)" },
              ]),
            },
            data: data.planGas,
          },
          // Top Cap
          {
            name: "计划月产量",
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, barWidth * 0.45],
            symbolOffset: symbolOffsetLeft,
            symbolPosition: "end",
            z: 12,
            itemStyle: { color: "#00F0FF" },
            data: data.planGas,
          },

          // ========== 实际月产量 (3D Cylinder - Blue) ==========
          // Body
          {
            name: "实际月产量",
            type: "bar",
            barWidth: barWidth,
            barGap: barGap,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "rgba(30, 64, 175, 0.8)" },
                { offset: 0.5, color: "rgba(59, 130, 246, 1)" },
                { offset: 1, color: "rgba(30, 64, 175, 0.8)" },
              ]),
            },
            data: data.actGas,
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
            data: data.actGas,
          },

          // --- Lines ---
          {
            name: "计划累产",
            type: "line",
            yAxisIndex: 1,
            symbol: "circle",
            symbolSize: 8,
            smooth: true,
            lineStyle: { color: "#FFD700", width: 2 },
            itemStyle: {
              color: "#FFD700", // Yellow-ish
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 5,
              shadowColor: "rgba(255, 215, 0, 0.5)",
            },
            data: data.planCum,
          },
          {
            name: "实际累产",
            type: "line",
            yAxisIndex: 1,
            symbol: "circle",
            symbolSize: 8,
            smooth: true,
            lineStyle: { color: "#FF8C00", width: 2 },
            itemStyle: {
              color: "#FF8C00", // Orange
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 5,
              shadowColor: "rgba(255, 140, 0, 0.5)",
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
  display: none;
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
  background: transparent;
  border: none;
}

.chart-body {
  width: 100%;
  height: 100%;
}
</style>
