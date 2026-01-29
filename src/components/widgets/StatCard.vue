<template>
  <el-card
    class="stat-card"
    :class="type"
    :body-style="{
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      height: '100%',
      position: 'relative',
    }"
  >
    <div class="card-icon">
      <span>{{ icon }}</span>
    </div>
    <div class="card-content">
      <div class="card-label">{{ label }}</div>
      <div class="card-value">
        {{ value }}
        <span class="unit" v-if="unit">{{ unit }}</span>
      </div>
      <div class="card-trend" :class="trendClass">
        <span class="arrow">{{ trendArrow }}</span>
        <span>{{ trend }}</span>
      </div>
    </div>
    <div class="card-chart" ref="chartRef"></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "StatCard",
  props: {
    type: {
      type: String,
      default: "blue", // blue, orange, green, purple
    },
    icon: {
      type: String,
      default: "📊",
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    unit: {
      type: String,
      default: "",
    },
    trend: {
      type: String,
      default: "+0%",
    },
    chartData: {
      type: Array,
      default: () => [30, 40, 35, 50, 49, 60, 70, 91],
    },
  },
  computed: {
    trendClass() {
      return this.trend.startsWith("+") ? "up" : "down";
    },
    trendArrow() {
      return this.trend.startsWith("+") ? "↑" : "↓";
    },
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    initChart() {
      if (!this.$refs.chartRef) return;

      this.chart = echarts.init(this.$refs.chartRef);

      const colors = {
        blue: "#4A90E2",
        orange: "#FF9F43",
        green: "#52C41A",
        purple: "#9C27B0",
      };

      const color = colors[this.type] || colors.blue;

      const option = {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        xAxis: {
          type: "category",
          show: false,
          data: this.chartData.map((_, i) => i),
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: this.chartData,
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: {
              color: color,
              width: 2,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: color.replace(")", ", 0.3)").replace("rgb", "rgba"),
                },
                {
                  offset: 1,
                  color: color.replace(")", ", 0)").replace("rgb", "rgba"),
                },
              ]),
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
.stat-card {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  height: 100%;
}

/* 添加彩色背景 */
.stat-card.blue {
  background: linear-gradient(135deg, #e3f0ff 0%, #f0f7ff 100%);
  border-color: #d0e4ff;
}

.stat-card.orange {
  background: linear-gradient(135deg, #ffe9d9 0%, #fff3e8 100%);
  border-color: #ffd9be;
}

.stat-card.purple {
  background: linear-gradient(135deg, #f3e8ff 0%, #f9f3ff 100%);
  border-color: #e5d4ff;
}

.stat-card.red {
  background: linear-gradient(135deg, #ffe4e8 0%, #fff0f2 100%);
  border-color: #ffcdd5;
}

.stat-card.green {
  background: linear-gradient(135deg, #e8f5e9 0%, #f1f8f1 100%);
  border-color: #d0e9d1;
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-color);
}

.stat-card.blue::before {
  background: linear-gradient(90deg, #4a7bf7, #5fc9f8);
}

.stat-card.orange::before {
  background: linear-gradient(90deg, #ff9f43, #ff6b6b);
}

.stat-card.green::before {
  background: linear-gradient(90deg, #52c41a, #73d13d);
}

.stat-card.purple::before {
  background: linear-gradient(90deg, #9c27b0, #ba68c8);
}

.stat-card.red::before {
  background: linear-gradient(90deg, #f5222d, #ff4d4f);
}

.card-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.stat-card.blue .card-icon {
  background: rgba(74, 123, 247, 0.15);
}

.stat-card.orange .card-icon {
  background: rgba(255, 159, 67, 0.15);
}

.stat-card.green .card-icon {
  background: rgba(82, 196, 26, 0.15);
}

.stat-card.purple .card-icon {
  background: rgba(156, 39, 176, 0.15);
}

.stat-card.red .card-icon {
  background: rgba(245, 34, 45, 0.15);
}

.card-content {
  flex: 1;
  min-width: 0;
}

.card-label {
  font-size: var(--font-xs);
  color: var(--text-secondary);
  margin-bottom: 2px;
}

.card-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2px;
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.unit {
  font-size: var(--font-xs);
  font-weight: 400;
  color: var(--text-secondary);
}

.card-trend {
  font-size: var(--font-xs);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 2px;
}

.card-trend.up {
  color: var(--success-color);
}

.card-trend.down {
  color: var(--danger-color);
}

.arrow {
  font-size: var(--font-sm);
}

.card-chart {
  width: 60px;
  height: 30px;
  flex-shrink: 0;
}
</style>

