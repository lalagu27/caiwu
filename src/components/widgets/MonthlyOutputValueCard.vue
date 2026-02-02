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
        月度产值
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
            :class="{ active: viewType === 'management' }"
            @click="viewType = 'management'"
          >
            管理口径
          </div>
          <div
            class="toggle-item"
            :class="{ active: viewType === 'asset' }"
            @click="viewType = 'asset'"
          >
            资产口径
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
  name: "MonthlyOutputValueCard",
  data() {
    return {
      chart: null,
      viewType: "management", // management | asset
      resizeObserver: null,
    };
  },
  watch: {
    viewType() {
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

      // 模拟产值数据 (亿元) - 仅给出一月份数据
      const dataMapping = {
        management: {
          gasMonth: [
            8.5,
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
          gasCum: [
            8.5,
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
          oilMonth: [
            10.2,
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
          oilCum: [
            10.2,
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
        },
        asset: {
          gasMonth: [
            7.8,
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
          gasCum: [
            7.8,
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
          oilMonth: [
            9.5,
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
          oilCum: [
            9.5,
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
        },
      };

      const currentData = dataMapping[this.viewType];

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
                p.value !== null &&
                typeof p.value !== "undefined" &&
                p.seriesName !== ""
              ) {
                const marker = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
                  p.color.colorStops ? p.color.colorStops[1].color : p.color
                };"></span>`;
                res += `<div style="display:flex;justify-content:space-between;gap:20px;">
                  <span>${marker}${p.seriesName}</span>
                  <span style="font-weight:600;">${p.value} 亿元</span>
                </div>`;
              }
            });
            return res;
          },
        },
        legend: {
          data: [
            "天然气产值",
            "天然气累计产值",
            "凝析油产值",
            "凝析油累计产值",
          ],
          top: 10,
          left: "center",
          itemWidth: 25,
          itemHeight: 12,
          textStyle: { color: textColor, fontSize: 10 },
          itemGap: 15,
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
            name: "月产 (亿元)",
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
            name: "年产 (亿元)",
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
          // ========== 天然气产值 (2D Bar) ==========
          {
            name: "天然气产值",
            type: "bar",
            barWidth: 10,
            barGap: "20%",
            data: currentData.gasMonth,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00F0FF" },
                { offset: 1, color: "rgba(0, 240, 255, 0.1)" },
              ]),
              borderRadius: [2, 2, 0, 0],
              shadowBlur: 10,
              shadowColor: "rgba(0, 240, 255, 0.3)",
            },
          },
          // ========== 凝析油产值 (2D Bar) ==========
          {
            name: "凝析油产值",
            type: "bar",
            barWidth: 10,
            data: currentData.oilMonth,
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

          // 天然气累计产值 (Line)
          {
            name: "天然气累计产值",
            type: "line",
            yAxisIndex: 1,
            z: 20,
            data: currentData.gasCum,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              color: "#FFD700",
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: "rgba(255, 215, 0, 0.5)",
            },
            lineStyle: { color: "#FFD700", width: 3 },
          },
          // 凝析油累计产值 (Line)
          {
            name: "凝析油累计产值",
            type: "line",
            yAxisIndex: 1,
            z: 20,
            data: currentData.oilCum,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              color: "#38BDF8",
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: "rgba(56, 189, 248, 0.5)",
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
