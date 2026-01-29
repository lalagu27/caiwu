<template>
  <el-card
    class="gauge-dashboard-card"
    :body-style="{
      padding: '8px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <div slot="header" class="card-header">
      <h3>关键指标</h3>
    </div>
    <div class="gauges-grid">
      <div class="gauge-item" ref="gauge1"></div>
      <div class="gauge-item" ref="gauge2"></div>
      <div class="gauge-item" ref="gauge3"></div>
      <div class="gauge-item" ref="gauge4"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "GaugeDashboard",
  data() {
    return {
      charts: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initGauges();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
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
    initGauges() {
      this.initGauge1(); // 税前利润
      this.initGauge2(); // 桶油五项
      this.initGauge3(); // 战新投资
      this.initGauge4(); // 战新收入
    },
    initGauge1() {
      if (!this.$refs.gauge1) return;
      const chart = echarts.init(this.$refs.gauge1);

      chart.setOption({
        series: [
          {
            type: "gauge",
            min: 0,
            max: 150,
            splitNumber: 5,
            radius: "70%",
            axisLine: {
              lineStyle: {
                width: 8,
                color: [
                  [0.6, "#91cc75"],
                  [0.8, "#fac858"],
                  [1, "#ee6666"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "auto",
              },
              width: 4,
            },
            axisTick: {
              distance: -8,
              length: 4,
              lineStyle: {
                color: "#fff",
                width: 1,
              },
            },
            splitLine: {
              distance: -12,
              length: 8,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            axisLabel: {
              color: "auto",
              distance: 16,
              fontSize: 10,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}亿元",
              color: "auto",
              fontSize: 12,
              offsetCenter: [0, "70%"],
            },
            title: {
              fontSize: 11,
              color: "#333",
              offsetCenter: [0, "90%"],
            },
            data: [
              {
                value: 112.5,
                name: "税前利润",
              },
            ],
          },
        ],
      });

      this.charts.gauge1 = chart;
    },
    initGauge2() {
      if (!this.$refs.gauge2) return;
      const chart = echarts.init(this.$refs.gauge2);

      chart.setOption({
        series: [
          {
            type: "gauge",
            min: 0,
            max: 30,
            splitNumber: 5,
            radius: "70%",
            axisLine: {
              lineStyle: {
                width: 8,
                color: [
                  [0.5, "#91cc75"],
                  [0.7, "#fac858"],
                  [1, "#ee6666"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "auto",
              },
              width: 4,
            },
            axisTick: {
              distance: -8,
              length: 4,
              lineStyle: {
                color: "#fff",
                width: 1,
              },
            },
            splitLine: {
              distance: -12,
              length: 8,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            axisLabel: {
              color: "auto",
              distance: 16,
              fontSize: 10,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}$/桶",
              color: "auto",
              fontSize: 12,
              offsetCenter: [0, "70%"],
            },
            title: {
              fontSize: 11,
              color: "#333",
              offsetCenter: [0, "90%"],
            },
            data: [
              {
                value: 19.14,
                name: "桶油五项",
              },
            ],
          },
        ],
      });

      this.charts.gauge2 = chart;
    },
    initGauge3() {
      if (!this.$refs.gauge3) return;
      const chart = echarts.init(this.$refs.gauge3);

      chart.setOption({
        series: [
          {
            type: "gauge",
            min: 0,
            max: 50,
            splitNumber: 5,
            radius: "70%",
            axisLine: {
              lineStyle: {
                width: 8,
                color: [
                  [0.6, "#91cc75"],
                  [0.8, "#fac858"],
                  [1, "#ee6666"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "auto",
              },
              width: 4,
            },
            axisTick: {
              distance: -8,
              length: 4,
              lineStyle: {
                color: "#fff",
                width: 1,
              },
            },
            splitLine: {
              distance: -12,
              length: 8,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            axisLabel: {
              color: "auto",
              distance: 16,
              fontSize: 10,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}亿元",
              color: "auto",
              fontSize: 12,
              offsetCenter: [0, "70%"],
            },
            title: {
              fontSize: 11,
              color: "#333",
              offsetCenter: [0, "90%"],
            },
            data: [
              {
                value: 30,
                name: "战新投资",
              },
            ],
          },
        ],
      });

      this.charts.gauge3 = chart;
    },
    initGauge4() {
      if (!this.$refs.gauge4) return;
      const chart = echarts.init(this.$refs.gauge4);

      chart.setOption({
        series: [
          {
            type: "gauge",
            min: 0,
            max: 100,
            splitNumber: 5,
            radius: "70%",
            axisLine: {
              lineStyle: {
                width: 8,
                color: [
                  [0.6, "#91cc75"],
                  [0.8, "#fac858"],
                  [1, "#ee6666"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "auto",
              },
              width: 4,
            },
            axisTick: {
              distance: -8,
              length: 4,
              lineStyle: {
                color: "#fff",
                width: 1,
              },
            },
            splitLine: {
              distance: -12,
              length: 8,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            axisLabel: {
              color: "auto",
              distance: 16,
              fontSize: 10,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}亿元",
              color: "auto",
              fontSize: 12,
              offsetCenter: [0, "70%"],
            },
            title: {
              fontSize: 11,
              color: "#333",
              offsetCenter: [0, "90%"],
            },
            data: [
              {
                value: 75,
                name: "战新收入",
              },
            ],
          },
        ],
      });

      this.charts.gauge4 = chart;
    },
  },
};
</script>

<style scoped>
.gauge-dashboard-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.gauge-dashboard-card ::v-deep .el-card__header {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-color);
}

.gauge-dashboard-card ::v-deep .el-card__body {
  padding: 8px !important;
  flex: 1;
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-header h3::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 14px;
  background: #4a7bf7;
  border-radius: 2px;
  flex-shrink: 0;
}

.gauges-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
  height: 100%;
}

.gauge-item {
  min-height: 120px;
  height: auto;
}
</style>
