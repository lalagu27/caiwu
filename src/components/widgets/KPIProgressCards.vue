<template>
  <el-card
    class="kpi-cards-container chart-card"
    :body-style="{
      padding: '8px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <div class="kpi-cards-grid">
      <!-- 税前利润 -->
      <div class="kpi-card">
        <div class="kpi-header">
          <div class="kpi-icon profit">💰</div>
          <div class="kpi-title">
            税前利润
            <span
              style="
                font-size: 12px;
                color: #999;
                margin-left: 4px;
                font-weight: normal;
              "
              >[2026]</span
            >
          </div>
        </div>
        <div class="kpi-value">
          <span class="current">10.6</span>
          <span class="unit">亿元</span>
        </div>
        <div class="kpi-target">年目标: 112.5亿元</div>
        <div class="kpi-progress">
          <div class="progress-bar segmented">
            <div v-for="n in 12" :key="n" class="segment-wrapper">
              <div
                class="segment-fill"
                :style="{
                  width: getSegmentFillWidth(n, 9.42),
                  background: getSegmentColor(n),
                }"
              ></div>
            </div>
          </div>
          <span class="progress-text">9.42%</span>
        </div>
        <div class="kpi-chart" ref="chart1"></div>
      </div>

      <!-- 桶油五项 -->
      <div class="kpi-card">
        <div class="kpi-header">
          <div class="kpi-icon cost">⚡</div>
          <div class="kpi-title">
            桶油五项
            <span
              style="
                font-size: 12px;
                color: #999;
                margin-left: 4px;
                font-weight: normal;
              "
              >[2026]</span
            >
          </div>
        </div>
        <div class="kpi-value">
          <span class="current">19.14</span>
          <span class="unit">$/桶</span>
        </div>
        <div class="kpi-target">今年价格</div>
        <div class="kpi-progress">
          <div class="trend-indicator down">
            <span>↓ 0.8</span>
            <span class="label">同比下降</span>
          </div>
        </div>
        <div class="kpi-chart" ref="chart2"></div>
      </div>

      <!-- 战新业务 (合并后的卡片) -->
      <div class="kpi-card merged-card">
        <div class="merged-header">
          <div class="kpi-header">
            <div class="kpi-icon strategic">🚀</div>
            <div class="kpi-title">
              战新业务 <span class="year-label">[2026]</span>
            </div>
          </div>
        </div>

        <div class="merged-body">
          <div class="metrics-side">
            <!-- 投资子项 -->
            <div class="sub-metric">
              <div class="sub-label">战新投资</div>
              <div class="kpi-value">
                <span class="current">2.82</span>
                <span class="unit">亿元</span>
              </div>
              <div class="kpi-target">年目标: 30亿元</div>
              <div class="kpi-progress">
                <div class="progress-bar segmented">
                  <div
                    v-for="n in 12"
                    :key="'inv-' + n"
                    class="segment-wrapper"
                  >
                    <div
                      class="segment-fill"
                      :style="{
                        width: getSegmentFillWidth(n, 9.4),
                        background: '#00F0FF',
                      }"
                    ></div>
                  </div>
                </div>
                <span class="progress-text" style="color: #00f0ff">9.4%</span>
              </div>
            </div>

            <div class="divider"></div>

            <!-- 收入子项 -->
            <div class="sub-metric">
              <div class="sub-label">战新收入</div>
              <div class="kpi-value">
                <span class="current">7.15</span>
                <span class="unit">亿元</span>
              </div>
              <div class="kpi-target">年目标: 75亿元</div>
              <div class="kpi-progress">
                <div class="progress-bar segmented">
                  <div
                    v-for="n in 12"
                    :key="'rev-' + n"
                    class="segment-wrapper"
                  >
                    <div
                      class="segment-fill"
                      :style="{
                        width: getSegmentFillWidth(n, 9.53),
                        background: '#4A7BF7',
                      }"
                    ></div>
                  </div>
                </div>
                <span class="progress-text" style="color: #4a7bf7">9.53%</span>
              </div>
            </div>
          </div>

          <div class="chart-side">
            <div class="kpi-chart" ref="chart3"></div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "KPIProgressCards",
  // Component for displaying KPI progress
  data() {
    return {
      charts: {},
      currentYear: new Date().getFullYear(),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
      window.addEventListener("resize", this.handleResize);
      window.addEventListener("theme-change", this.handleThemeChange);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("theme-change", this.handleThemeChange);
    Object.values(this.charts).forEach((chart) => {
      if (chart) chart.dispose();
    });
  },
  methods: {
    handleResize() {
      Object.values(this.charts).forEach((chart) => {
        if (chart) chart.resize();
      });
    },
    handleThemeChange() {
      // Re-init charts with new theme colors
      this.initCharts();
    },
    initCharts() {
      const isDark = document.body.classList.contains("dark-theme");
      const textColor = isDark ? "#ffffff" : "#999"; // Force white text in dark mode
      const lineColor = isDark ? "#2B3674" : "#E1E8ED";
      const themeBlue = isDark ? "#00F0FF" : "#2B3674";

      // 通用tooltip配置
      const tooltipConfig = {
        backgroundColor: isDark
          ? "rgba(15, 22, 41, 0.95)"
          : "rgba(255, 255, 255, 0.95)",
        borderColor: isDark ? "#334155" : "#ddd",
        borderWidth: 1,
        textStyle: {
          color: isDark ? "#ffffff" : "#333", // Tooltip text white
          fontStyle: "normal",
        },
      };

      this.initChart1(textColor, lineColor, themeBlue, tooltipConfig);
      this.initChart2(textColor, lineColor, themeBlue, tooltipConfig);
      this.initChartCombined(textColor, lineColor, tooltipConfig);
    },
    getActiveSegments(percentage) {
      return Math.round((percentage / 100) * 12);
    },
    getSegmentFillWidth(n, percentage) {
      const segmentSize = 100 / 12;
      const start = (n - 1) * segmentSize;
      const end = n * segmentSize;

      if (percentage >= end) {
        return "100%";
      } else if (percentage <= start) {
        return "0%";
      } else {
        return ((percentage - start) / segmentSize) * 100 + "%";
      }
    },
    getSegmentColor(n) {
      // De-noised: Use Theme Blue gradient or single color
      // Opacity change or single color for clean look
      return "var(--primary-color)";
    },
    initChart1(textColor, lineColor, themeBlue, tooltipConfig) {
      if (!this.$refs.chart1) return;
      // Dispose old instance to apply new clean state or just setOption with merge?
      // Dispose is safer for complete theme switch if needed, but setOption is faster.
      // Let's rely on setOption merging, but for colors we might want to be explicit.
      let chart = echarts.getInstanceByDom(this.$refs.chart1);
      if (!chart) chart = echarts.init(this.$refs.chart1);

      chart.setOption({
        title: {
          text: "亿元",
          textStyle: {
            color: textColor,
            fontSize: 10,
            fontWeight: "normal",
          },
          top: 0,
          left: 30,
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b}: {c}亿元",
          ...tooltipConfig,
        },
        grid: { top: 10, right: 10, bottom: 35, left: 35 },
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
          show: true,
          axisLine: { show: true, lineStyle: { color: lineColor } },
          axisTick: { show: false },
          axisLabel: {
            color: textColor,
            fontSize: 10,
            interval: 0,
            rotate: 0,
          },
        },
        yAxis: {
          type: "value",
          show: true,
          splitLine: {
            show: true,
            lineStyle: { type: "dashed", color: lineColor },
          },
          axisLabel: { color: textColor, fontSize: 10 },
        },
        series: [
          {
            data: [
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
            type: "bar",
            barWidth: "60%",
            itemStyle: {
              color: themeBlue, // Theme Blue
              borderRadius: [2, 2, 0, 0],
            },
          },
        ],
      });

      this.charts.chart1 = chart;
    },
    initChart2(textColor, lineColor, themeBlue, tooltipConfig) {
      if (!this.$refs.chart2) return;
      let chart = echarts.getInstanceByDom(this.$refs.chart2);
      if (!chart) chart = echarts.init(this.$refs.chart2);

      chart.setOption({
        title: {
          text: "$/桶",
          textStyle: {
            color: textColor,
            fontSize: 10,
            fontWeight: "normal",
          },
          top: 0,
          left: 30,
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b}: {c}$/桶",
          ...tooltipConfig,
        },
        grid: { top: 15, right: 10, bottom: 35, left: 35 },
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
          show: true,
          axisLine: { show: true, lineStyle: { color: lineColor } },
          axisTick: { show: false },
          axisLabel: {
            color: textColor,
            fontSize: 10,
            interval: 0,
            rotate: 0,
          },
        },
        yAxis: {
          type: "value",
          show: true,
          min: 18.5,
          max: 19.14,
          splitLine: {
            show: true,
            lineStyle: { type: "dashed", color: lineColor },
          },
          axisLabel: { color: textColor, fontSize: 10 },
        },
        series: [
          {
            data: [
              18.95,
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
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 6,
            lineStyle: { color: themeBlue, width: 2 }, // Navy Blue (Neutral/Corporate)
            itemStyle: {
              color: themeBlue,
              borderWidth: 2,
              borderColor: "#fff",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(43, 54, 116, 0.2)" },
                { offset: 1, color: "rgba(43, 54, 116, 0.05)" },
              ]),
            },
            markLine: {
              symbol: ["none", "none"],
              label: {
                show: true,
                position: "insideEndTop",
                formatter: "年挑战目标: {c}",
                color: "#ff4d4f",
                fontSize: 10,
              },
              lineStyle: {
                color: "#ff4d4f",
                type: "dashed",
                width: 1,
              },
              data: [
                {
                  yAxis: 19.14,
                },
              ],
            },
          },
        ],
      });

      this.charts.chart2 = chart;
    },
    initChartCombined(textColor, lineColor, tooltipConfig) {
      if (!this.$refs.chart3) return;
      let chart = echarts.getInstanceByDom(this.$refs.chart3);
      if (!chart) chart = echarts.init(this.$refs.chart3);

      chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          ...tooltipConfig,
        },
        legend: {
          data: ["战新投资", "战新收入"],
          top: 0,
          right: 30,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { color: textColor, fontSize: 10 },
        },
        grid: { top: 25, right: 10, bottom: 30, left: 35 },
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
          axisLine: { lineStyle: { color: lineColor } },
          axisLabel: { color: textColor, fontSize: 10, rotate: 0 },
        },
        yAxis: {
          type: "value",
          name: "亿元",
          nameTextStyle: { color: textColor, fontSize: 10, align: "right" },
          splitLine: { lineStyle: { type: "dashed", color: lineColor } },
          axisLabel: { color: textColor, fontSize: 10 },
        },
        series: [
          {
            name: "战新投资",
            data: [
              2.82,
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
            type: "bar",
            barWidth: "25%",
            itemStyle: { color: "#00F0FF", borderRadius: [2, 2, 0, 0] },
          },
          {
            name: "战新收入",
            data: [
              7.15,
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
            type: "bar",
            barWidth: "25%",
            itemStyle: { color: "#4A7BF7", borderRadius: [2, 2, 0, 0] },
          },
        ],
      });
      this.charts.chart3 = chart;
    },
  },
};
</script>

<style scoped>
.kpi-cards-container {
  background: transparent;
  border: none;
  box-shadow: none;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.kpi-cards-container ::v-deep .el-card__header {
  padding: 8px 12px;
  border-bottom: none; /* Remove separator line */
}

.kpi-cards-container ::v-deep .el-card__body {
  padding: 0px !important;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card-header h3 {
  margin: 0;
  display: flex;
  align-items: center;
}

/* ::before handled by global */

.kpi-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 4px;
  flex: 1;
  overflow: hidden;
  padding: 4px;
}

.kpi-card {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.3s ease;
  min-height: 0;
  height: 100%;
}

.kpi-card:hover {
  box-shadow: var(--shadow-sm);
  border-color: #d0d7e8;
  transform: translateY(-2px);
}

.kpi-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.kpi-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

/* Unified Icon Backgrounds - De-noised */
/* Strict De-noising: Unified Icons */
.kpi-icon.profit,
.kpi-icon.cost,
.kpi-icon.investment,
.kpi-icon.revenue {
  background: var(--primary-light); /* Light Grey/Blue Background */
  color: var(--primary-color); /* Deep Navy Blue Icon */
}

.kpi-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.year-label {
  font-size: 12px;
  color: #999;
  margin-left: 4px;
  font-weight: normal;
}

.merged-card {
  grid-column: span 2;
  min-height: 0 !important;
}

.merged-header {
  margin-bottom: 8px;
}

.merged-body {
  display: flex;
  gap: 20px;
  flex: 1;
  min-height: 0;
}

.metrics-side {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-right: 15px;
}

.chart-side {
  flex: 1;
  min-width: 0;
  height: 100%;
}

.sub-metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sub-label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
}

.divider {
  height: 1px;
  background: var(--border-color);
  margin: 8px 0;
  opacity: 0.5;
}

.kpi-icon.strategic {
  background: rgba(0, 240, 255, 0.1);
  color: #00f0ff;
}

.merged-card .kpi-chart {
  height: 170px;
  margin-top: 0;
  background: transparent;
  border: none;
}

.kpi-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.kpi-value .current {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.kpi-value .unit {
  font-size: 12px;
  color: var(--text-secondary);
}

.kpi-target {
  font-size: 11px;
  color: var(--text-tertiary);
}

.kpi-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar.segmented {
  background: var(--bg-hover); /* 整体灰底 */
  display: flex;
  gap: 0; /* 无间隙 */
  overflow: hidden;
  height: 8px;
  border-radius: 4px; /* 整体圆角 */
}

.segment-wrapper {
  flex: 1;
  height: 100%;
  background: transparent;
  position: relative;
  /* border-right: 1px solid rgba(255,255,255,0.2); 可选：微弱的分隔线 */
}

.segment-fill {
  height: 100%;
  width: 0;
  transition: width 0.5s ease;
}

.segment-wrapper:last-child {
  border-right: none;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4a90e2, #52c41a);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 11px;
  font-weight: 600;
  color: #52c41a;
  min-width: 35px;
  text-align: right;
}

.trend-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
}

.trend-indicator.down {
  color: #52c41a;
}

.trend-indicator .label {
  font-size: 10px;
  font-weight: 500;
  color: var(--text-secondary);
}

.kpi-chart {
  height: 120px;
  margin-top: 8px;
  width: 100%;
  background: transparent;
  border: none;
}
</style>
