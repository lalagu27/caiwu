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
    <div slot="header" class="card-header">
      <h3>
        核心指标
        <span
          style="
            font-size: 12px;
            color: #8f9bba;
            margin-left: 8px;
            font-weight: normal;
          "
          >[2026]</span
        >
      </h3>
    </div>
    <div class="kpi-cards-grid">
      <!-- 增储上产 (3D Cylinders) -->
      <div class="kpi-card gauge-card active-well-chart">
        <div class="kpi-header">
          <div class="kpi-icon profit">🛢️</div>
          <div class="kpi-title">
            增储上产
            <span class="year-label">[2026]</span>
          </div>
        </div>
        <div class="chart-container-full">
          <div class="kpi-chart" ref="cylinderChart"></div>
        </div>
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
      reserveIndicators: [
        {
          name: "新增份额经济可采储量",
          unit: "百万桶",
          target: 112,
          completed: 10.6,
          rate: 9.46,
          icon: "🛢️",
        },
        {
          name: "原油总产量",
          unit: "万吨",
          target: 76,
          completed: 6.5,
          rate: 8.55,
          icon: "⛽",
        },
        {
          name: "天然气总产量",
          unit: "亿方",
          target: 114.8,
          completed: 9.8,
          rate: 8.54,
          icon: "🔥",
        },
        {
          name: "基本设计项目设计产能",
          unit: "万吨油当量",
          target: 300,
          completed: 35,
          rate: 11.67,
          icon: "🏗️",
        },
      ],
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
      // Resize all charts
      Object.keys(this.charts).forEach((key) => {
        const chart = this.charts[key];
        if (chart) chart.resize();
      });
    },
    handleThemeChange() {
      // Re-init charts with new theme colors
      this.initCharts();
    },
    initCharts() {
      const isDark = document.body.classList.contains("dark-theme");
      const textColor = isDark ? "#ffffff" : "#999";
      const lineColor = isDark ? "#2B3674" : "#E1E8ED";
      const themeBlue = isDark ? "#00F0FF" : "#2B3674";

      const tooltipConfig = {
        backgroundColor: isDark
          ? "rgba(15, 22, 41, 0.95)"
          : "rgba(255, 255, 255, 0.95)",
        borderColor: isDark ? "#334155" : "#ddd",
        borderWidth: 1,
        textStyle: {
          color: isDark ? "#ffffff" : "#333",
          fontStyle: "normal",
        },
      };

      // Init 3D Cylinder Chart
      this.initCylinderChart(textColor, lineColor);

      this.initChart2(textColor, lineColor, themeBlue, tooltipConfig);
      this.initChartCombined(textColor, lineColor, tooltipConfig);
    },
    // New function to initialize the 4 gauge charts
    initGaugeCharts(textColor, lineColor, themeBlue) {
      this.reserveIndicators.forEach((item, index) => {
        this.$nextTick(() => {
          const refName = `gaugeChart_${index}`;
          // Handle v-for ref array
          const el = this.$refs[refName] && this.$refs[refName][0];
          if (el) {
            this.initSingleGauge(el, item, `gauge_${index}`);
          }
        });
      });
    },
    initSingleGauge(dom, item, chartKey) {
      if (this.charts[chartKey]) {
        this.charts[chartKey].dispose();
      }
      let chart = echarts.init(dom);

      chart.setOption({
        series: [
          // 0. Outermost Blue Arc Wrapper
          {
            type: "gauge",
            radius: "82%",
            startAngle: 210,
            endAngle: -30,
            min: 0,
            max: 100,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 0, color: "rgba(30, 144, 255, 0.4)" },
                      { offset: 0.5, color: "rgba(0, 212, 255, 0.8)" },
                      { offset: 1, color: "rgba(30, 144, 255, 0.4)" },
                    ]),
                  ],
                ],
              },
            },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            pointer: { show: false },
            detail: { show: false },
          },
          // 1. Outer Blue Tick Ring
          {
            type: "gauge",
            radius: "88%",
            startAngle: 210,
            endAngle: -30,
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 3,
                color: [[1, "rgba(0,0,0,0)"]], // Hidden line
              },
            },
            axisTick: {
              show: true,
              splitNumber: 5,
              length: 8,
              lineStyle: {
                color: "#1E90FF",
                width: 2,
                shadowColor: "rgba(30, 144, 255, 0.8)",
                shadowBlur: 5,
              },
            },
            splitLine: {
              show: true,
              length: 12,
              lineStyle: {
                color: "#00D4FF",
                width: 3,
                shadowColor: "rgba(0, 212, 255, 0.8)",
                shadowBlur: 8,
              },
            },
            axisLabel: { show: false },
            pointer: { show: false },
            detail: { show: false },
          },
          // 2. Inner Gold Ring Background
          {
            type: "gauge",
            radius: "72%",
            startAngle: 210,
            endAngle: -30,
            min: 0,
            max: 100,
            axisLine: {
              show: true,
              lineStyle: {
                width: 25,
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 0, color: "rgba(218, 165, 32, 0.3)" },
                      { offset: 0.5, color: "rgba(218, 165, 32, 0.6)" },
                      { offset: 1, color: "rgba(218, 165, 32, 0.3)" },
                    ]),
                  ],
                ],
              },
            },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: {
              show: true,
              distance: -12,
              color: "#fff",
              fontSize: 10, // Small font
              fontWeight: "bold",
            },
            pointer: { show: false },
            detail: { show: false },
          },
          // 3. Main Data Gauge (Inner)
          {
            type: "gauge",
            radius: "60%",
            startAngle: 210,
            endAngle: -30,
            min: 0,
            max: 100,
            axisLine: {
              show: false,
            },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            pointer: {
              show: true,
              icon: "path://M0,-75 L-6,-60 L6,-60 Z M0,0 Z",
              width: 14,
              length: "75%",
              offsetCenter: [0, 0],
              itemStyle: {
                color: "#FF3333",
                shadowColor: "rgba(255, 51, 51, 0.8)",
                shadowBlur: 8,
              },
            },
            title: {
              show: true,
              offsetCenter: [0, "25%"],
              color: "#aaa",
              fontSize: 11,
            },
            detail: {
              valueAnimation: true,
              offsetCenter: [0, "-5%"],
              fontSize: 18,
              fontWeight: "bold",
              formatter: "{value}%",
              color: "#fff",
              textShadowBlur: 8,
              textShadowColor: "#00E5FF",
            },
            data: [
              {
                value: item.rate,
                name: "完成率",
              },
            ],
          },
        ],
      });
      this.charts[chartKey] = chart;
    },
    initCylinderChart(textColor, lineColor) {
      if (!this.$refs.cylinderChart) return;

      // Dispose old if exists
      if (this.charts.cylinderChart) {
        this.charts.cylinderChart.dispose();
      }

      let chart = echarts.init(this.$refs.cylinderChart);

      // Prepare data
      // Use rates for height (max 100 for background), but clamping visual height
      // Colors: 1st is Gold, others Blue
      const categories = this.reserveIndicators.map((i) =>
        i.name.length > 5 ? i.name.substring(0, 4) + ".." : i.name
      );
      const rates = this.reserveIndicators.map((i) => i.rate);
      const completedValues = this.reserveIndicators.map((i) => i.completed);

      // Define colors
      const colors = [
        {
          top: "#E6A23C",
          bottom: "rgba(230, 162, 60, 0.4)",
          bg: "rgba(230, 162, 60, 0.1)",
        }, // Gold
        {
          top: "#00F0FF",
          bottom: "rgba(0, 240, 255, 0.4)",
          bg: "rgba(0, 240, 255, 0.1)",
        }, // Blue
        {
          top: "#00F0FF",
          bottom: "rgba(0, 240, 255, 0.4)",
          bg: "rgba(0, 240, 255, 0.1)",
        }, // Blue
        {
          top: "#4A7BF7",
          bottom: "rgba(74, 123, 247, 0.4)",
          bg: "rgba(74, 123, 247, 0.1)",
        }, // Darker Blue
      ];

      const barWidth = 30;

      // Generate series data with specific styles per bar
      const bgData = rates.map((rate, index) => {
        return {
          value: 100, // Full height background
          itemStyle: { color: colors[index].bg },
        };
      });

      const contentData = rates.map((rate, index) => {
        return {
          value: rate,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colors[index].top },
              { offset: 1, color: colors[index].bottom },
            ]),
          },
        };
      });

      const topSymbolData = rates.map((rate, index) => {
        return {
          value: rate,
          itemStyle: { color: colors[index].top },
          symbolPosition: "end",
        };
      });

      const bottomSymbolData = rates.map((rate, index) => {
        return {
          value: rate, // Just for x-axis placement, y is 0
          itemStyle: { color: colors[index].bottom },
        };
      });

      // Background tops/bottoms
      const bgTopData = rates.map((rate, index) => {
        return {
          value: 100,
          itemStyle: { color: colors[index].bg, opacity: 0.5 },
        };
      });
      const bgBottomData = rates.map((rate, index) => {
        return {
          value: 100,
          itemStyle: { color: colors[index].bg, opacity: 0.5 },
        };
      });

      chart.setOption({
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            const index = params[0].dataIndex;
            const item = this.reserveIndicators[index];
            return `${item.name}<br/>
                    目标: ${item.target} ${item.unit}<br/>
                    完成: ${item.completed} ${item.unit} (${item.rate}%)`;
          },
          backgroundColor: "rgba(15, 22, 41, 0.95)",
          borderColor: "#334155",
          textStyle: { color: "#fff" },
        },
        grid: {
          top: 30,
          bottom: 20,
          left: 10,
          right: 10,
          containLabel: true,
        },
        xAxis: {
          data: categories,
          axisLabel: {
            interval: 0,
            color: textColor,
            fontSize: 10,
            width: 60,
            overflow: "break",
          },
          axisTick: { show: false },
          axisLine: { show: false },
        },
        yAxis: {
          show: false,
          max: 100,
        },
        series: [
          // 1. Background Cylinder Body
          {
            z: 1,
            type: "bar",
            barWidth: barWidth,
            barGap: "-100%",
            data: bgData,
            itemStyle: { opacity: 0.6 },
          },
          // 2. Background Cylinder Top
          {
            z: 2,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 10],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            data: bgTopData,
          },
          // 3. Background Cylinder Bottom
          {
            z: 2,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 10],
            symbolOffset: [0, 5],
            symbolPosition: "start",
            data: bgBottomData,
          },
          // 4. Liquid Content Body
          {
            z: 3,
            type: "bar",
            barWidth: barWidth,
            data: contentData,
            label: {
              show: true,
              position: "top",
              distance: 10,
              color: "#fff",
              fontSize: 12,
              fontWeight: "bold",
              formatter: (params) => {
                return completedValues[params.dataIndex];
              },
            },
          },
          // 5. Liquid Content Top
          {
            z: 4,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 10],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            data: topSymbolData,
          },
          // 6. Liquid Content Bottom
          {
            z: 4,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 10],
            symbolOffset: [0, 5], // Align with bottom of bar
            symbolPosition: "start",
            data: bottomSymbolData,
          },
        ],
      });

      this.charts.cylinderChart = chart;
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
      let chart = echarts.getInstanceByDom(this.$refs.chart1);
      if (!chart) chart = echarts.init(this.$refs.chart1);

      const val = 9.42;

      chart.setOption({
        legend: {
          show: true,
          data: ["计划", "实际"],
          top: 5,
          left: "center",
          itemGap: 20,
          itemWidth: 12,
          itemHeight: 12,
          icon: "circle",
          textStyle: {
            color: "#fff",
            fontSize: 11,
          },
        },
        series: [
          // 0. Outermost Blue Arc Wrapper
          {
            type: "gauge",
            radius: "82%", // 调整半径使其贴合刻度值外侧
            startAngle: 210,
            endAngle: -30,
            min: 0,
            max: 100,
            axisLine: {
              lineStyle: {
                width: 6, // 加宽蓝色包裹圈
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 0, color: "rgba(30, 144, 255, 0.4)" },
                      { offset: 0.5, color: "rgba(0, 212, 255, 0.8)" },
                      { offset: 1, color: "rgba(30, 144, 255, 0.4)" },
                    ]),
                  ],
                ],
              },
            },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            pointer: { show: false },
            detail: { show: false },
          },
          // 1. Outer Blue Tick Ring
          {
            type: "gauge",
            radius: "88%",
            startAngle: 210,
            endAngle: -30,
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 3,
                color: [[1, "rgba(0,0,0,0)"]], // Hidden line
              },
            },
            axisTick: {
              show: true,
              splitNumber: 5,
              length: 8, // 减小长度，避免覆盖金色环
              lineStyle: {
                color: "#1E90FF", // Brighter Blue
                width: 2,
                shadowColor: "rgba(30, 144, 255, 0.8)",
                shadowBlur: 5,
              },
            },
            splitLine: {
              show: true,
              length: 12, // 减小长度，避免覆盖金色环
              lineStyle: {
                color: "#00D4FF", // Brighter Cyan
                width: 3,
                shadowColor: "rgba(0, 212, 255, 0.8)",
                shadowBlur: 8,
              },
            },
            axisLabel: { show: false },
            pointer: { show: false },
            detail: { show: false },
          },
          // 2. Inner Gold Ring Background with Labels
          {
            type: "gauge",
            radius: "72%",
            startAngle: 210,
            endAngle: -30,
            min: 0,
            max: 100,
            axisLine: {
              show: true,
              lineStyle: {
                width: 25,
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 0, color: "rgba(218, 165, 32, 0.3)" }, // Goldenrod - Brighter
                      { offset: 0.5, color: "rgba(218, 165, 32, 0.6)" }, // More saturated
                      { offset: 1, color: "rgba(218, 165, 32, 0.3)" },
                    ]),
                  ],
                ],
              },
            },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: {
              show: true,
              distance: -12, // 负值使数字向内，覆盖在金色环上
              color: "#fff",
              fontSize: 11,
              fontWeight: "bold",
            },
            pointer: { show: false },
            detail: { show: false },
          },
          // 3. Main Data Gauge (Inner)
          {
            type: "gauge",
            radius: "60%",
            startAngle: 210,
            endAngle: -30,
            min: 0,
            max: 100,
            axisLine: {
              show: false, // 隐藏内层轮廓线，避免在金色环内显示多余的环
            },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            pointer: {
              show: true,
              icon: "path://M0,-75 L-6,-60 L6,-60 Z M0,0 Z",
              width: 14,
              length: "75%",
              offsetCenter: [0, 0],
              itemStyle: {
                color: "#FF3333", // Brighter Red
                shadowColor: "rgba(255, 51, 51, 0.8)",
                shadowBlur: 8,
              },
            },
            title: {
              show: true,
              offsetCenter: [0, "25%"],
              color: "#aaa",
              fontSize: 11,
            },
            detail: {
              valueAnimation: true,
              offsetCenter: [0, "-5%"],
              fontSize: 18,
              fontWeight: "bold",
              formatter: "{value}%",
              color: "#fff",
              textShadowBlur: 8,
              textShadowColor: "#00E5FF", // Brighter Cyan glow
            },
            data: [
              {
                value: val,
                name: "完成率",
              },
            ],
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
  grid-template-columns: 3fr 1fr;
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

.carousel-card {
  padding: 0 !important; /* Remove padding for carousel */
}

/* Force carousel to take full space */
.carousel-card ::v-deep .el-carousel,
.carousel-card ::v-deep .el-carousel__container {
  height: 100% !important;
}

.kpi-slide-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px; /* Restore padding inside slide */
  box-sizing: border-box;
}

.chart-container-full {
  flex: 1;
  width: 100%;
  min-height: 0;
  display: flex;
}

.kpi-card:hover {
  box-shadow: var(--shadow-sm);
  border-color: #d0d7e8;
  /* transform: translateY(-2px); Removed per user request */
}

.kpi-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.kpi-icon {
  width: auto;
  height: auto;
  background: transparent;
  font-size: 18px;
  margin-right: 4px;
}

/* Unified Icon Backgrounds - De-noised */
/* Strict De-noising: Unified Icons */
.kpi-icon.profit,
.kpi-icon.cost,
.kpi-icon.investment,
.kpi-icon.revenue {
  background: transparent;
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
  flex: 1; /* 使用flex布局自适应 */
  height: 100%; /* 填充父容器 */
  min-height: 0; /* 允许收缩 */
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
  flex: 1; /* 使用flex布局自适应 */
  height: 100%; /* 填充父容器 */
  min-height: 80px; /* 设置最小高度避免过小 */
  margin-top: 8px;
  width: 100%;
  background: transparent;
  border: none;
}

/* Gauge Card Specific Styles */
.gauge-card .gauge-layout {
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 0;
  padding-top: 4px;
}

.gauge-chart {
  flex: 1;
  height: 100%;
  min-width: 0;
}

.gauge-data {
  width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding-right: 8px;
}

.data-row {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05); /* Slight card bg */
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.data-icon-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.circle-icon {
  background: rgba(74, 123, 247, 0.2);
  color: #4a7bf7;
  border: 1px solid rgba(74, 123, 247, 0.4);
  box-shadow: 0 0 10px rgba(74, 123, 247, 0.2);
}

.triangle-icon {
  background: rgba(0, 240, 255, 0.2);
  color: #00f0ff;
  border: 1px solid rgba(0, 240, 255, 0.4);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
}

.data-content {
  display: flex;
  flex-direction: column;
}

.data-label {
  font-size: 11px;
  color: #999;
  margin-bottom: 2px;
}

.data-value {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  font-family: "DIN Alternate", sans-serif;
}

.highlight-green {
  color: #00f0ff;
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.5);
}

.num-font {
  font-family: "DIN Alternate", "Helvetica Neue", Helvetica, sans-serif; /* Use tech font if available */
}
</style>
