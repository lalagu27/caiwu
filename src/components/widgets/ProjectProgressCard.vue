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

      const projects = [
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
        // Add dummy projects if needed to match the visual density,
        // but for now keeping the real 3 items.
      ];

      // Alternating Colors
      const colors = [
        {
          // Cyan
          main: "#00F0FF",
          track: "rgba(0, 240, 255, 0.2)",
          shadow: "rgba(0, 240, 255, 0.6)",
        },
        {
          // Blue
          main: "#4A7BF7",
          track: "rgba(74, 123, 247, 0.2)",
          shadow: "rgba(74, 123, 247, 0.6)",
        },
      ];

      // Pulse Icon Path (approximate)
      const pulsePath = "path://M0,5 L3,5 L5,1 L7,9 L9,5 L12,5";

      const option = {
        grid: {
          top: 30,
          right: 50,
          bottom: 10,
          left: 20, // Increase space for icon
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
          data: projects.map((p) => p.name),
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
          inverse: true, // Top to bottom
        },
        series: [
          // 1. Background Track (Thin Line)
          {
            name: "Track",
            type: "bar",
            z: 1,
            barGap: "-100%",
            barCategoryGap: "60%", // More space between projects
            data: projects.map((p, i) => ({
              value: 100,
              itemStyle: {
                color: colors[i % 2].track,
                borderRadius: 2,
              },
            })),
            barWidth: 3, // Thin line
            silent: true,
          },
          // 2. Progress Bar (Thin Line with Shadow)
          {
            name: "Progress",
            type: "bar",
            z: 2,
            barCategoryGap: "60%",
            data: projects.map((p, i) => ({
              value: p.value,
              itemStyle: {
                color: colors[i % 2].main,
                borderRadius: 2,
                shadowColor: colors[i % 2].shadow,
                shadowBlur: 10,
              },
            })),
            barWidth: 3,
            label: { show: false },
          },
          // 3. Glowing Knob (Knob at tip)
          {
            name: "Knob",
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: 12, // Glow size
            symbolOffset: [0, 0],
            z: 3,
            symbolPosition: "end",
            data: projects.map((p, i) => ({
              value: p.value,
              itemStyle: {
                color: "#fff", // White center
                borderWidth: 3,
                borderColor: colors[i % 2].main, // Colored border
                shadowColor: colors[i % 2].shadow,
                shadowBlur: 10,
              },
            })),
          },
          // 4. Project Label (Top Left with Pulse Icon)
          {
            name: "Label",
            type: "scatter",
            symbol: pulsePath,
            symbolSize: [15, 12],
            symbolOffset: [0, -20], // Centered horizontally
            clip: false, // Prevent cutting off
            z: 4,
            data: projects.map((p, i) => ({
              value: [0, i],
              name: p.name,
              itemStyle: {
                color: colors[i % 2].main,
              },
              label: {
                show: true,
                position: "right",
                formatter: `{p|${p.name}}`,
                align: "left",
                verticalAlign: "middle",
                offset: [5, 0],
                rich: {
                  p: {
                    color: isDark ? "#fff" : "#333",
                    fontSize: 13,
                    fontWeight: 500,
                  },
                },
              },
            })),
          },
          // 5. Value Label (Right Side)
          {
            name: "Value",
            type: "scatter", // Use scatter to position effectively
            symbolSize: 0,
            z: 4,
            data: projects.map((p, i) => [100, i]), // Right edge
            label: {
              show: true,
              position: "right",
              formatter: (params) => {
                const val = projects[params.data[1]].value;
                // Simulate underline with rich text border/decoration if possible,
                // or just styled bold italic.
                // ECharts rich text doesn't support text-decoration: underline comfortably without hacks.
                // We will use a borderBottom.
                return `{val|${val}}{unit|%}\n{line|}`;
              },
              rich: {
                val: {
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "bold",
                  fontStyle: "italic",
                  padding: [0, 2, 0, 0],
                },
                unit: {
                  color: colors[0].shadow, // Just use a color
                  fontSize: 12,
                  padding: [0, 0, 5, 0],
                },
                line: {
                  height: 2,
                  width: "100%",
                  backgroundColor: colors[0].main, // Use first color for lines or dynamic?
                  // Dynamic color in rich text is hard.
                  // Let's simplify: Just style the number nicely.
                  backgroundColor: "transparent",
                },
              },
              // Dynamic color override
              color: (params) => colors[params.data[1] % 2].main,
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
  height: 100%; /* 确保容器有明确高度供ECharts使用 */
}

/* 暗黑模式下的图表卡片增强 */
.dark-theme .chart-card {
  border-color: #1e293b;
  box-shadow: var(--shadow-xs);
}

.dark-theme .chart-card:hover {
  border-color: var(--hover-border);
  box-shadow: var(--shadow-sm);
  /* transform: translateY(-3px); Removed per user request */
}

.dark-theme .chart-header h3 {
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.4);
}

.dark-theme .chart-header h3::before {
  box-shadow: 0 0 12px var(--primary-color);
}
</style>
