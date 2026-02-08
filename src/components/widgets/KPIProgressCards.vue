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
          <div class="kpi-title">增储上产</div>
        </div>
        <div class="chart-container-full">
          <div class="kpi-chart" ref="cylinderChart"></div>
        </div>
      </div>

      <!-- 成本效益指标 -->
      <div class="kpi-card gauge-card cost-benefit-chart">
        <div class="kpi-header">
          <div class="kpi-icon cost">💰</div>
          <div class="kpi-title">成本效益指标</div>
        </div>
        <div class="chart-container-full">
          <div class="kpi-chart" ref="costBenefitChart"></div>
        </div>
      </div>

      <!-- 科技创新 -->
      <div class="kpi-card gauge-card tech-innovation-chart">
        <div class="kpi-header">
          <div class="kpi-icon innovation">🔬</div>
          <div class="kpi-title">科技创新</div>
        </div>
        <div class="tech-split-layout">
          <div class="tech-chart-side">
            <div class="kpi-chart-image-wrapper">
              <img
                :src="require('@/assets/baifenbi.png')"
                class="kpi-chart-img"
              />
              <div class="chart-overlay-value">
                <span class="num">{{ techInnovationIndicators[0].rate }}</span>
                <span class="unit">%</span>
              </div>
              <div class="kpi-chart-label">
                完成 {{ techInnovationIndicators[0].completed }}亿元 / 目标
                {{ techInnovationIndicators[0].target }}亿元
              </div>
              <div class="kpi-chart-title-bottom">研发经费投入目标完成率</div>
            </div>
          </div>
          <div class="tech-project-side">
            <div class="project-header">
              <span class="project-title">重大科技项目任务完成率</span>
              <span class="year-label">[{{ currentYear }}年]</span>
            </div>
            <div class="projects-list-html">
              <div
                v-for="(project, index) in projects"
                :key="index"
                class="project-item-box"
              >
                <!-- Decorative Corners -->
                <div class="corner top-right"></div>
                <div class="corner bottom-left"></div>

                <div class="project-info-row">
                  <span class="p-icon">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path
                        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span class="p-name">{{ project.name }}</span>
                </div>
                <div class="project-track-row">
                  <div class="p-progress-track">
                    <div
                      class="p-progress-bar"
                      :style="{ width: project.value + '%' }"
                    >
                      <div class="p-progress-glow"></div>
                    </div>
                  </div>
                  <div class="p-value">
                    {{ project.value }}<span class="unit">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 战新产业 -->
      <div class="kpi-card gauge-card strategic-industry-chart">
        <div class="kpi-header">
          <div class="kpi-icon strategic">🚀</div>
          <div class="kpi-title">战新产业</div>
        </div>
        <div class="chart-container-full">
          <div class="kpi-chart" ref="industryChart"></div>
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
      costBenefitIndicators: [
        {
          name: "利润总额",
          unit: "亿元",
          target: 112.5,
          completed: 35.2,
          rate: 31.29,
        },
        {
          name: "桶油五项成本",
          unit: "$/B",
          target: 19.14,
          completed: 16.95,
          rate: 88.56,
        },
      ],
      strategicIndustryIndicators: [
        {
          name: "投资完成",
          unit: "亿元",
          target: 30,
          completed: 2.82,
          rate: 9.4,
        },
        {
          name: "营业收入",
          unit: "亿元",
          target: 75,
          completed: 7.15,
          rate: 9.53,
        },
      ],
      techInnovationIndicators: [
        {
          name: "研发经费投入",
          unit: "亿元",
          target: 8.03,
          completed: 3.25,
          rate: 40.47,
        },
      ],
      projects: [
        {
          name: "《1500米级水下采油树设计、制造及测试技术》",
          value: 45,
        },
        {
          name: "《海上超高温高压钻完井关键技术研究及示范应用》",
          value: 78,
        },
        {
          name: "《超深水超浅层气田开发关键技术研究及工程示范》",
          value: 92,
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

      // Init Cost Benefit Chart
      this.initCostBenefitChart(textColor, lineColor);

      // this.initTechChart(textColor, lineColor, tooltipConfig); // Removed as per user request to use image
      this.initIndustryChart(textColor, lineColor, tooltipConfig);
      // this.initProjectsChart(textColor, lineColor); // Replaced by HTML/CSS
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
      const categories = this.reserveIndicators.map(
        (i) => `${i.name}\n(${i.unit})`
      );
      const rates = this.reserveIndicators.map((i) => i.rate);
      const completedValues = this.reserveIndicators.map((i) => i.completed);

      // 定义更鲜艳的颜色方案，增加发光效果
      const colors = [
        {
          top: "#FFD770", // 更亮的金色
          middle: "#E6A23C", // 中间色
          bottom: "#B8860B", // 深金色
          bg: "rgba(230, 162, 60, 0.15)",
          bgTop: "#5C4A1E",
          glow: "rgba(255, 215, 112, 0.6)", // 发光色
        }, // Gold
        {
          top: "#7FFFFF", // 更亮的青色
          middle: "#00F0FF", // 中间色
          bottom: "#006B6B", // 深青色
          bg: "rgba(0, 240, 255, 0.15)",
          bgTop: "#0A4A52",
          glow: "rgba(0, 240, 255, 0.6)",
        }, // Cyan
        {
          top: "#D8B4FE", // 更亮的紫色
          middle: "#A855F7", // 中间色
          bottom: "#5B21B6", // 深紫色
          bg: "rgba(168, 85, 247, 0.15)",
          bgTop: "#3B1886",
          glow: "rgba(168, 85, 247, 0.6)",
        }, // Purple
        {
          top: "#93C5FD", // 更亮的蓝色
          middle: "#4A7BF7", // 中间色
          bottom: "#1E40AF", // 深蓝色
          bg: "rgba(74, 123, 247, 0.15)",
          bgTop: "#1E3A8A",
          glow: "rgba(74, 123, 247, 0.6)",
        }, // Royal Blue
      ];

      const barWidth = 45; // 增加宽度使圆柱更明显

      // Generate series data with specific styles per bar
      const bgData = rates.map((rate, index) => {
        return {
          value: 100, // Full height background
          itemStyle: { color: colors[index].bg },
        };
      });

      // 液体内容 - 使用三层渐变和阴影发光
      const contentData = rates.map((rate, index) => {
        return {
          value: rate,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colors[index].top },
              { offset: 0.3, color: colors[index].middle },
              { offset: 1, color: colors[index].bottom },
            ]),
            // 添加内发光效果
            shadowColor: colors[index].glow,
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
          },
        };
      });

      // 液面顶部 - 增加发光效果
      const topSymbolData = rates.map((rate, index) => {
        return {
          value: rate,
          itemStyle: {
            color: colors[index].top,
            shadowColor: colors[index].glow,
            shadowBlur: 12,
          },
          symbolPosition: "end",
        };
      });

      const bottomSymbolData = rates.map((rate, index) => {
        return {
          value: rate, // Just for x-axis placement, y is 0
          itemStyle: { color: colors[index].bottom },
        };
      });

      // 背景顶部/底部
      const bgTopData = rates.map((rate, index) => {
        return {
          value: 100,
          itemStyle: { color: colors[index].bgTop, opacity: 0.9 },
        };
      });
      const bgBottomData = rates.map((rate, index) => {
        return {
          value: 100,
          itemStyle: { color: colors[index].bottom, opacity: 0.5 },
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
          top: 25,
          bottom: 25,
          left: 10,
          right: 10,
          containLabel: true,
        },
        xAxis: {
          data: categories,
          axisLabel: {
            interval: 0,
            color: textColor,
            fontSize: 14,
            width: 70, // Slightly increase width
            overflow: "break",
            margin: 28,
          },
          axisTick: { show: false },
          axisLine: { show: false },
        },
        yAxis: {
          show: false,
          max: 120, // Increase max to prevent top label clipping
        },
        series: [
          // 1. 背景圆柱体
          {
            z: 1,
            type: "bar",
            barWidth: barWidth,
            barGap: "-100%",
            data: bgData,
            itemStyle: {
              opacity: 0.5,
              borderRadius: [4, 4, 0, 0], // 增加圆角
            },
            label: { show: false },
          },
          // 2. 背景圆柱顶部
          {
            z: 2,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 14], // 增加椭圆高度增强3D感
            symbolOffset: [0, -7],
            symbolPosition: "end",
            data: bgTopData,
            label: {
              show: true,
              position: "top",
              offset: [0, -4],
              align: "center",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "DIN Alternate, Arial",
              textShadowColor: "rgba(0, 0, 0, 0.7)",
              textShadowBlur: 4,
              formatter: (params) => {
                const item = this.reserveIndicators[params.dataIndex];
                return `目标 ${item.target}`;
              },
            },
          },
          // 3. 背景圆柱底部
          {
            z: 2,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 14],
            symbolOffset: [0, 7],
            symbolPosition: "start",
            data: bgBottomData,
          },
          // 4. 液体内容主体
          {
            z: 3,
            type: "bar",
            barWidth: barWidth,
            data: contentData,
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
            },
            label: {
              show: true,
              position: "top",
              distance: 8,
              color: "#fff",
              fontSize: 20, // 增大字号
              fontWeight: "bold",
              fontFamily: "DIN Alternate, Arial",
              textShadowColor: "rgba(0, 240, 255, 0.8)",
              textShadowBlur: 10,
              formatter: (params) => {
                return rates[params.dataIndex] + "%";
              },
            },
            markPoint: {
              symbol: "path://M100 0 L75 25 L0 25 L0 28 L75 28 L100 3 Z", // 更高的指示线
              symbolSize: [70, 30], // 更高以容纳两行文字
              symbolOffset: [-50, 16], // 向右调整
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "rgba(0, 240, 255, 0.8)" },
                  { offset: 1, color: "rgba(0, 240, 255, 0.3)" },
                ]),
                shadowColor: "rgba(0, 240, 255, 0.8)",
                shadowBlur: 8,
              },
              label: {
                show: true,
                position: "insideBottomLeft",
                offset: [-6, 2],
                color: "#ffffff",
                fontSize: 13,
                fontWeight: "500",
                lineHeight: 16,
                formatter: (params) => {
                  const item = this.reserveIndicators[params.dataIndex];
                  return `完成\n${item.completed}`;
                },
              },
              data: rates.map((rate, idx) => ({ xAxis: idx, yAxis: rate })),
            },
          },
          // 5. 液面顶部 (发光椭圆)
          {
            z: 5,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 14],
            symbolOffset: [0, -7],
            symbolPosition: "end",
            data: topSymbolData,
            label: { show: false },
          },
          // 6. 液面内部高光 (更小的椭圆，制造高光效果)
          {
            z: 6,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth * 0.6, 8],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            data: rates.map((rate, index) => ({
              value: rate,
              itemStyle: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  { offset: 0, color: "rgba(255, 255, 255, 0.8)" },
                  { offset: 1, color: "rgba(255, 255, 255, 0)" },
                ]),
              },
            })),
          },
          // 7. 液体底部
          {
            z: 4,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 14],
            symbolOffset: [0, 7],
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
    initCostBenefitChart(textColor, lineColor) {
      if (!this.$refs.costBenefitChart) return;

      // Dispose old if exists
      if (this.charts.costBenefitChart) {
        this.charts.costBenefitChart.dispose();
      }

      let chart = echarts.init(this.$refs.costBenefitChart);

      // 准备数据
      const categories = this.costBenefitIndicators.map(
        (i) => `${i.name}\n(${i.unit})`
      );
      const rates = this.costBenefitIndicators.map((i) => i.rate);
      const completedValues = this.costBenefitIndicators.map(
        (i) => i.completed
      );

      // 定义更鲜艳的颜色方案，与增储上产保持一致风格
      const colors = [
        {
          top: "#FFD770", // 更亮的金色
          middle: "#E6A23C", // 中间色
          bottom: "#B8860B", // 深金色
          bg: "rgba(230, 162, 60, 0.15)",
          bgTop: "#5C4A1E",
          glow: "rgba(255, 215, 112, 0.6)",
        }, // 金色 - 利润
        {
          top: "#7FFFFF", // 更亮的青色
          middle: "#00F0FF", // 中间色
          bottom: "#006B6B", // 深青色
          bg: "rgba(0, 240, 255, 0.15)",
          bgTop: "#0A4A52",
          glow: "rgba(0, 240, 255, 0.6)",
        }, // 青色 - 成本
      ];

      const barWidth = 45; // 与增储上产卡片保持一致

      // 生成系列数据 - 背景
      const bgData = rates.map((rate, index) => {
        return {
          value: 100,
          itemStyle: { color: colors[index].bg },
        };
      });

      // 液体内容 - 使用三层渐变和阴影发光
      const contentData = rates.map((rate, index) => {
        return {
          value: rate,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colors[index].top },
              { offset: 0.3, color: colors[index].middle },
              { offset: 1, color: colors[index].bottom },
            ]),
            shadowColor: colors[index].glow,
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
          },
        };
      });

      // 液面顶部 - 增加发光效果
      const topSymbolData = rates.map((rate, index) => {
        return {
          value: rate,
          itemStyle: {
            color: colors[index].top,
            shadowColor: colors[index].glow,
            shadowBlur: 12,
          },
          symbolPosition: "end",
        };
      });

      const bottomSymbolData = rates.map((rate, index) => {
        return {
          value: rate,
          itemStyle: { color: colors[index].bottom },
        };
      });

      // 背景顶部/底部
      const bgTopData = rates.map((rate, index) => {
        return {
          value: 100,
          itemStyle: { color: colors[index].bgTop, opacity: 0.9 },
        };
      });

      const bgBottomData = rates.map((rate, index) => {
        return {
          value: 100,
          itemStyle: { color: colors[index].bottom, opacity: 0.5 },
        };
      });

      chart.setOption({
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            const index = params[0].dataIndex;
            const item = this.costBenefitIndicators[index];
            return `${item.name}<br/>
                    挑战目标: ${item.target} ${item.unit}<br/>
                    完成数: ${item.completed} ${item.unit}<br/>
                    完成率: ${item.rate}%`;
          },
          backgroundColor: "rgba(15, 22, 41, 0.95)",
          borderColor: "#334155",
          textStyle: { color: "#fff" },
        },
        grid: {
          top: 25,
          bottom: 25,
          left: 5,
          right: 5,
          containLabel: true,
        },
        xAxis: {
          data: categories,
          axisLabel: {
            interval: 0,
            color: textColor,
            fontSize: 14,
            width: 80,
            overflow: "break",
            margin: 28,
          },
          axisTick: { show: false },
          axisLine: { show: false },
        },
        yAxis: {
          show: false,
          max: 120,
        },
        series: [
          // 1. 背景圆柱体
          {
            z: 1,
            type: "bar",
            barWidth: barWidth,
            barGap: "-100%",
            data: bgData,
            itemStyle: {
              opacity: 0.5,
              borderRadius: [4, 4, 0, 0],
            },
            label: { show: false },
          },
          // 2. 背景圆柱顶部
          {
            z: 2,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 16], // 增加椭圆高度
            symbolOffset: [0, -8],
            symbolPosition: "end",
            data: bgTopData,
            label: {
              show: true,
              position: "top",
              offset: [0, -4],
              align: "center",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "DIN Alternate, Arial",
              textShadowColor: "rgba(0, 0, 0, 0.7)",
              textShadowBlur: 4,
              formatter: (params) => {
                const item = this.costBenefitIndicators[params.dataIndex];
                return `目标 ${item.target}`;
              },
            },
          },
          // 3. 背景圆柱底部
          {
            z: 2,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 16],
            symbolOffset: [0, 8],
            symbolPosition: "start",
            data: bgBottomData,
          },
          // 4. 液体内容主体
          {
            z: 3,
            type: "bar",
            barWidth: barWidth,
            data: contentData,
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
            },
            label: {
              show: true,
              position: "top",
              distance: 10,
              color: "#fff",
              fontSize: 22, // 增大字号
              fontWeight: "bold",
              fontFamily: "DIN Alternate, Arial",
              textShadowColor: "rgba(0, 240, 255, 0.8)",
              textShadowBlur: 10,
              formatter: (params) => {
                return rates[params.dataIndex] + "%";
              },
            },
            markPoint: {
              symbol: "path://M100 0 L75 25 L0 25 L0 28 L75 28 L100 3 Z", // 更高的指示线
              symbolSize: [80, 32], // 更高以容纳两行文字
              symbolOffset: [-50, 16], // 向左偏移更多
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "rgba(0, 240, 255, 0.8)" },
                  { offset: 1, color: "rgba(0, 240, 255, 0.3)" },
                ]),
                shadowColor: "rgba(0, 240, 255, 0.8)",
                shadowBlur: 8,
              },
              label: {
                show: true,
                position: "insideBottomLeft",
                offset: [-8, 2],
                color: "#ffffff",
                fontSize: 13,
                fontWeight: "500",
                lineHeight: 16,
                formatter: (params) => {
                  const item = this.costBenefitIndicators[params.dataIndex];
                  return `完成\n${item.completed}`;
                },
              },
              data: rates.map((rate, idx) => ({ xAxis: idx, yAxis: rate })),
            },
          },
          // 5. 液面顶部 (发光椭圆)
          {
            z: 5,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 16],
            symbolOffset: [0, -8],
            symbolPosition: "end",
            data: topSymbolData,
            label: { show: false },
          },
          // 6. 液面内部高光
          {
            z: 6,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth * 0.6, 10],
            symbolOffset: [0, -6],
            symbolPosition: "end",
            data: rates.map((rate, index) => ({
              value: rate,
              itemStyle: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  { offset: 0, color: "rgba(255, 255, 255, 0.8)" },
                  { offset: 1, color: "rgba(255, 255, 255, 0)" },
                ]),
              },
            })),
          },
          // 7. 液体底部
          {
            z: 4,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 16],
            symbolOffset: [0, 8],
            symbolPosition: "start",
            data: bottomSymbolData,
          },
        ],
      });

      this.charts.costBenefitChart = chart;
    },
    initTechChart(textColor, lineColor, tooltipConfig) {
      if (!this.$refs.techChart) return;

      if (this.charts.techChart) {
        this.charts.techChart.dispose();
      }

      let chart = echarts.init(this.$refs.techChart);

      const item = this.techInnovationIndicators[0];
      const rate = item.rate;

      chart.setOption({
        tooltip: { show: false },
        series: [
          // 1. Outer Thin Ring (Decoration)
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            radius: "90%",
            axisLine: {
              lineStyle: {
                width: 1,
                color: [[1, "rgba(0, 240, 255, 0.3)"]],
              },
            },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            detail: { show: false },
            pointer: { show: false },
          },
          // 2. Main Progress Ring
          {
            type: "gauge",
            startAngle: 270, // Start from bottom
            endAngle: -89.9,
            radius: "75%",
            axisLine: {
              lineStyle: {
                width: 10, // Thicker track
                color: [[1, "rgba(255, 255, 255, 0.08)"]], // Visible dark track
              },
            },
            progress: {
              show: true,
              width: 10,
              roundCap: false, // Flat ends as per target
              itemStyle: {
                color: "#05CD99", // Pure Green
                shadowColor: "rgba(5, 205, 153, 0.3)",
                shadowBlur: 5,
              },
            },
            pointer: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            detail: {
              valueAnimation: true,
              fontSize: 24,
              fontWeight: "bold",
              fontFamily: "DIN Alternate",
              color: "#05CD99",
              offsetCenter: [0, 0],
              formatter: "{value}%",
            },
            data: [{ value: rate }], // No name, just value
          },
        ],
        graphic: [
          {
            type: "text",
            left: "center",
            bottom: "5%",
            style: {
              text: `完成 ${item.completed} / 目标 ${item.target}`,
              fill: "#00F0FF",
              fontSize: 12,
              fontFamily: "Microsoft YaHei",
            },
          },
        ],
      });

      this.charts.techChart = chart;
    },
    initIndustryChart(textColor, lineColor, tooltipConfig) {
      if (!this.$refs.industryChart) return;

      // Dispose old if exists
      if (this.charts.industryChart) {
        this.charts.industryChart.dispose();
      }

      let chart = echarts.init(this.$refs.industryChart);

      // 准备数据
      const categories = this.strategicIndustryIndicators.map(
        (i) => `${i.name}\n(${i.unit})`
      );
      const rates = this.strategicIndustryIndicators.map((i) => i.rate);
      const completedValues = this.strategicIndustryIndicators.map(
        (i) => i.completed
      );

      // 定义更鲜艳的颜色方案，与成本效益指标保持一致风格
      const colors = [
        {
          top: "#7FFFFF", // 更亮的青色
          middle: "#00F0FF", // 中间色
          bottom: "#006B6B", // 深青色
          bg: "rgba(0, 240, 255, 0.15)",
          bgTop: "#0A4A52",
          glow: "rgba(0, 240, 255, 0.6)",
        }, // 青色 - 投资
        {
          top: "#93C5FD", // 更亮的蓝色
          middle: "#4A7BF7", // 中间色
          bottom: "#1E40AF", // 深蓝色
          bg: "rgba(74, 123, 247, 0.15)",
          bgTop: "#1E3A8A",
          glow: "rgba(74, 123, 247, 0.6)",
        }, // 蓝色 - 收入
      ];

      const barWidth = 45; // 与成本效益指标保持一致

      // 生成系列数据 - 背景
      const bgData = rates.map((rate, index) => {
        return {
          value: 100,
          itemStyle: { color: colors[index].bg },
        };
      });

      // 液体内容 - 使用三层渐变和阴影发光
      const contentData = rates.map((rate, index) => {
        return {
          value: rate,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colors[index].top },
              { offset: 0.3, color: colors[index].middle },
              { offset: 1, color: colors[index].bottom },
            ]),
            shadowColor: colors[index].glow,
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
          },
        };
      });

      // 液面顶部 - 增加发光效果
      const topSymbolData = rates.map((rate, index) => {
        return {
          value: rate,
          itemStyle: {
            color: colors[index].top,
            shadowColor: colors[index].glow,
            shadowBlur: 12,
          },
          symbolPosition: "end",
        };
      });

      const bottomSymbolData = rates.map((rate, index) => {
        return {
          value: rate,
          itemStyle: { color: colors[index].bottom },
        };
      });

      // 背景顶部/底部
      const bgTopData = rates.map((rate, index) => {
        return {
          value: 100,
          itemStyle: { color: colors[index].bgTop, opacity: 0.9 },
        };
      });

      const bgBottomData = rates.map((rate, index) => {
        return {
          value: 100,
          itemStyle: { color: colors[index].bottom, opacity: 0.5 },
        };
      });

      chart.setOption({
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            const index = params[0].dataIndex;
            const item = this.strategicIndustryIndicators[index];
            return `${item.name}<br/>
                    挑战目标: ${item.target} ${item.unit}<br/>
                    完成数: ${item.completed} ${item.unit}<br/>
                    完成率: ${item.rate}%`;
          },
          backgroundColor: "rgba(15, 22, 41, 0.95)",
          borderColor: "#334155",
          textStyle: { color: "#fff" },
        },
        grid: {
          top: 25,
          bottom: 25,
          left: 5,
          right: 5,
          containLabel: true,
        },
        xAxis: {
          data: categories,
          axisLabel: {
            interval: 0,
            color: textColor,
            fontSize: 14,
            width: 80,
            overflow: "break",
            margin: 28,
          },
          axisTick: { show: false },
          axisLine: { show: false },
        },
        yAxis: {
          show: false,
          max: 120,
        },
        series: [
          // 1. 背景圆柱体
          {
            z: 1,
            type: "bar",
            barWidth: barWidth,
            barGap: "-100%",
            data: bgData,
            itemStyle: {
              opacity: 0.5,
              borderRadius: [4, 4, 0, 0],
            },
            label: { show: false },
          },
          // 2. 背景圆柱顶部
          {
            z: 2,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 16], // 增加椭圆高度
            symbolOffset: [0, -8],
            symbolPosition: "end",
            data: bgTopData,
            label: {
              show: true,
              position: "top",
              offset: [0, -4],
              align: "center",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "DIN Alternate, Arial",
              textShadowColor: "rgba(0, 0, 0, 0.7)",
              textShadowBlur: 4,
              formatter: (params) => {
                const item = this.strategicIndustryIndicators[params.dataIndex];
                return `目标 ${item.target}`;
              },
            },
          },
          // 3. 背景圆柱底部
          {
            z: 2,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 16],
            symbolOffset: [0, 8],
            symbolPosition: "start",
            data: bgBottomData,
          },
          // 4. 液体内容主体
          {
            z: 3,
            type: "bar",
            barWidth: barWidth,
            data: contentData,
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
            },
            label: {
              show: true,
              position: "top",
              distance: 10,
              color: "#fff",
              fontSize: 22, // 增大字号
              fontWeight: "bold",
              fontFamily: "DIN Alternate, Arial",
              textShadowColor: "rgba(0, 240, 255, 0.8)",
              textShadowBlur: 10,
              formatter: (params) => {
                return rates[params.dataIndex] + "%";
              },
            },
            markPoint: {
              symbol: "path://M100 0 L75 25 L0 25 L0 28 L75 28 L100 3 Z", // 更高的指示线
              symbolSize: [80, 32], // 更高以容纳两行文字
              symbolOffset: [-50, 16],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "rgba(0, 240, 255, 0.8)" },
                  { offset: 1, color: "rgba(0, 240, 255, 0.3)" },
                ]),
                shadowColor: "rgba(0, 240, 255, 0.8)",
                shadowBlur: 8,
              },
              label: {
                show: true,
                position: "insideBottomLeft",
                offset: [-8, 2],
                color: "#ffffff",
                fontSize: 13,
                fontWeight: "500",
                lineHeight: 16,
                formatter: (params) => {
                  const item =
                    this.strategicIndustryIndicators[params.dataIndex];
                  return `完成\n${item.completed}`;
                },
              },
              data: rates.map((rate, idx) => ({ xAxis: idx, yAxis: rate })),
            },
          },
          // 5. 液面顶部 (发光椭圆)
          {
            z: 5,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 16],
            symbolOffset: [0, -8],
            symbolPosition: "end",
            data: topSymbolData,
            label: { show: false },
          },
          // 6. 液面内部高光
          {
            z: 6,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth * 0.6, 10],
            symbolOffset: [0, -6],
            symbolPosition: "end",
            data: rates.map((rate, index) => ({
              value: rate,
              itemStyle: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  { offset: 0, color: "rgba(255, 255, 255, 0.8)" },
                  { offset: 1, color: "rgba(255, 255, 255, 0)" },
                ]),
              },
            })),
          },
          // 7. 液体底部
          {
            z: 4,
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [barWidth, 16],
            symbolOffset: [0, 8],
            symbolPosition: "start",
            data: bottomSymbolData,
          },
        ],
      });

      this.charts.industryChart = chart;
    },
    // 初始化重点项目执行进度图表
    initProjectsChart(textColor, lineColor) {
      if (!this.$refs.projectsChart) return;

      // Dispose old if exists
      if (this.charts.projectsChart) {
        this.charts.projectsChart.dispose();
      }

      let chart = echarts.init(this.$refs.projectsChart);

      const isDark = document.body.classList.contains("dark-theme");

      // 交替颜色
      const colors = [
        {
          // 青色
          main: "#00F0FF",
          track: "rgba(0, 240, 255, 0.2)",
          shadow: "rgba(0, 240, 255, 0.6)",
        },
        {
          // 蓝色
          main: "#4A7BF7",
          track: "rgba(74, 123, 247, 0.2)",
          shadow: "rgba(74, 123, 247, 0.6)",
        },
      ];

      // 脉冲图标路径
      const pulsePath = "path://M0,5 L3,5 L5,1 L7,9 L9,5 L12,5";

      const option = {
        grid: {
          top: 35, // 增加顶部距离
          right: 55, // 增加右侧距离防止数值被截断
          bottom: 10,
          left: 5,
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
          data: this.projects.map((p) => p.name),
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
          inverse: true,
        },
        series: [
          // 1. 背景轨道
          {
            name: "Track",
            type: "bar",
            z: 1,
            barGap: "-100%",
            barCategoryGap: "50%", // 增加行间距
            data: this.projects.map((p, i) => ({
              value: 100,
              itemStyle: {
                color: colors[i % 2].track,
                borderRadius: 3, //稍微圆润一点
              },
            })),
            barWidth: 4, // 稍微加粗
            silent: true,
          },
          // 2. 进度条
          {
            name: "Progress",
            type: "bar",
            z: 2,
            data: this.projects.map((p, i) => ({
              value: p.value,
              itemStyle: {
                color: "#00F0FF",
                shadowColor: "rgba(0, 240, 255, 0.4)",
                shadowBlur: 4,
              },
            })),
            barWidth: 4,
            label: { show: false },
          },
          // 3. 发光端点
          {
            name: "Knob",
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: 10, // 稍微加大
            symbolOffset: [0, 0],
            z: 3,
            symbolPosition: "end",
            data: this.projects.map((p, i) => ({
              value: p.value,
              itemStyle: {
                color: "#fff",
                borderWidth: 2,
                borderColor: "#00F0FF",
                shadowColor: "rgba(0, 240, 255, 0.4)",
                shadowBlur: 6,
              },
            })),
          },
          // 4. 项目名称标签 (位于进度条上方)
          {
            name: "Label",
            type: "scatter",
            symbol: pulsePath,
            symbolSize: [10, 8],
            symbolOffset: [-5, -18], // 向上移动，位于进度条上方
            clip: false,
            z: 4,
            data: this.projects.map((p, i) => ({
              value: [0, i],
              name: p.name,
              itemStyle: {
                color: "#00F0FF",
              },
              label: {
                show: true,
                position: "right",
                formatter: `{p|${p.name}}`,
                align: "left",
                verticalAlign: "middle",
                offset: [5, 0], // 图标和文字的间距
                rich: {
                  p: {
                    color: isDark ? "#e0e6ed" : "#333", // 稍微柔和的白色
                    fontSize: 12,
                    fontFamily: "Microsoft YaHei",
                    fontWeight: 400,
                    textShadowBlur: 0,
                  },
                },
              },
            })),
          },
          // 5. 百分比数值 (右侧跟随)
          {
            name: "Value",
            type: "scatter",
            symbolSize: 0,
            z: 4,
            data: this.projects.map((p, i) => [100, i]),
            label: {
              show: true,
              position: "right",
              offset: [10, 0], // 向右偏移
              color: "#00F0FF",
              formatter: (params) => {
                const val = this.projects[params.data[1]].value;
                return `{val|${val}}{unit|%}`;
              },
              rich: {
                val: {
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: "bold",
                  fontFamily: "DIN Alternate", // 数字字体
                  padding: [0, 2, 0, 0],
                },
                unit: {
                  color: colors[0].shadow, // 使用淡色
                  fontSize: 11,
                  padding: [0, 0, 2, 0],
                },
              },
            },
          },
        ],
      };

      this.chart = chart;
      chart.setOption(option);
      this.charts.projectsChart = chart;
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
  grid-template-columns: 2fr 1fr;
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
  font-size: 20px;
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
  font-size: 15px;
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
  background: transparent;
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

/* 科技创新卡片的分栏布局 */
.tech-split-layout {
  flex: 1;
  display: flex;
  gap: 12px; /* Adjusted gap */
  min-height: 0;
  padding-right: 8px;
}

.tech-chart-side {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding-right: 16px; /* Add padding for separator */
  border-right: 1px dashed rgba(0, 240, 255, 0.2); /* Dashed separator */
}

.tech-project-side {
  flex: 1.8; /* Give more width to the project list */
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: transparent; /* No box background */
  border-radius: 0;
  padding: 0;
  border: none;
}

.project-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 6px 12px; /* Increased padding */
  border-bottom: 1px solid rgba(0, 240, 255, 0.3);
  /* Dark Blue/Cyan Gradient Background */
  background: linear-gradient(
    90deg,
    rgba(0, 70, 110, 0.6) 0%,
    rgba(0, 40, 80, 0.3) 60%,
    transparent 100%
  );
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.project-title {
  font-size: 13px;
  font-weight: 600;
  color: #00f0ff; /* Bright Cyan */
  letter-spacing: 0.5px;
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.4); /* Glow effect */
}

.projects-list-html {
  flex: 1; /* Fill remaining height */
  display: flex;
  flex-direction: column;
  justify-content: space-around; /* Distribute items evenly */
  padding: 0 4px;
}

.project-item-box {
  position: relative;
  background: rgba(0, 40, 80, 0.2);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 8px; /* Spacing between items */
  transition: all 0.3s ease;
}

.project-item-box:hover {
  background: rgba(0, 40, 80, 0.4);
  border-color: rgba(0, 240, 255, 0.5);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.1);
}

/* Corner Decorations */
.project-item-box .corner {
  position: absolute;
  width: 8px;
  height: 8px;
  border: 2px solid #00f0ff;
  opacity: 0.8;
}

.project-item-box .corner.top-right {
  top: -1px;
  right: -1px;
  border-bottom: none;
  border-left: none;
  border-top-right-radius: 6px;
}

.project-item-box .corner.bottom-left {
  bottom: -1px;
  left: -1px;
  border-top: none;
  border-right: none;
  border-bottom-left-radius: 6px;
}

.project-info-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #fff;
}

.p-icon {
  color: #00f0ff;
  margin-right: 6px;
  font-size: 14px;
  filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.5));
}

.p-name {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #e2e8f0;
}

.project-track-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.p-progress-track {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: visible; /* Allow glow to spill if needed */
  position: relative;
}

.p-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 240, 255, 0.4) 0%, #00f0ff 100%);
  border-radius: 4px;
  position: relative;
  box-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
}

/* Optional glow/knob at the end */
.p-progress-glow {
  position: absolute;
  right: -4px;
  top: -2px;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff;
  opacity: 1;
}

.p-value {
  font-family: "DIN Alternate", sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #00f0ff;
  min-width: 45px;
  text-align: right;
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.4);
}

.p-value .unit {
  font-size: 12px;
  margin-left: 2px;
  opacity: 0.8;
}

.kpi-chart-image-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  /* Ensure it fills the side */
  height: 100%;
}

.kpi-chart-img {
  max-width: 70%;
  max-height: 70%; /* Slightly smaller to fit label */
  object-fit: contain;
  /* Add a subtle glow to image */
  filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.3));
}

.chart-overlay-value {
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: baseline;
  z-index: 5;
  /* Removed blur for clarity */
}

.chart-overlay-value .num {
  font-family: "DIN Alternate", "Helvetica Neue", Arial, sans-serif;
  font-size: 30px; /* Larger */
  font-weight: bold;
  /* Brighter gradient */
  background: linear-gradient(180deg, #e0f7ff 0%, #00a0ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #00a0ff;
  letter-spacing: 1px;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5)); /* Sharp shadow */
}

.chart-overlay-value .unit {
  font-family: "DIN Alternate", "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-left: 2px;
  color: #00a0ff;
}

.kpi-chart-label {
  margin-top: 4px;
  font-size: 13px; /* Clearer */
  color: #00f0ff;
  font-family: "Microsoft YaHei", sans-serif;
  text-align: center;
  font-weight: 500;
  z-index: 5;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8); /* Better readability */
}

.kpi-chart-title-bottom {
  margin-top: 6px;
  font-size: 13px;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.5);
  font-weight: bold;
  text-align: center;
  z-index: 5;
  position: relative;
}
</style>
