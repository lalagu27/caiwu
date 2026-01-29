<template>
  <el-card
    class="chart-card"
    :class="{ featured: isHighlight }"
    :body-style="{
      padding: '8px',
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '0',
    }"
  >
    <div slot="header" class="card-header">
      <h3>{{ chartTitle }}</h3>
      <div class="chart-badge" v-if="isHighlight">重点监控</div>
    </div>
    <div class="chart-container" ref="chartRef"></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "LeadershipCharts",
  props: {
    chartId: {
      type: Number,
      default: 1,
    },
    isHighlight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    chartTitle() {
      const titles = [
        "各部门Q1预算执行率",
        "各部门人员流失率",
        "项目交付及时率",
        "客户满意度调查",
        "年度培训覆盖率",
        "市场份额增长趋势",
        "研发投入占比",
        "季度营收完成情况",
      ];
      return titles[this.chartId - 1] || `图表指标 ${this.chartId}`;
    },
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    initChart() {
      if (!this.$refs.chartRef) return;

      this.chart = echarts.init(this.$refs.chartRef);

      const colors = [
        "#1E3A8A",
        "#F59E0B",
        "#10B981",
        "#3B82F6",
        "#8B5CF6",
        "#EC4899",
        "#06B6D4",
        "#EF4444",
      ];
      const baseColor = colors[(this.chartId - 1) % colors.length];

      const randomData = () => Math.floor(Math.random() * 60) + 40;

      const option = {
        grid: {
          top: "20%",
          left: "5%",
          right: "5%",
          bottom: "10%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#E5E7EB",
          borderWidth: 1,
          textStyle: {
            color: "#1F2937",
          },
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: "rgba(30, 58, 138, 0.1)",
            },
          },
        },
        xAxis: {
          type: "category",
          data: ["研发部", "市场部", "销售部", "人事部", "财务部"],
          axisLine: {
            lineStyle: {
              color: "#E5E7EB",
            },
          },
          axisLabel: {
            color: "#6B7280",
            fontSize: 11,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          max: 120,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: "{value}%",
            color: "#9CA3AF",
            fontSize: 11,
          },
          splitLine: {
            lineStyle: {
              color: "#F3F4F6",
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: "完成率",
            type: "bar",
            data: [
              { value: randomData(), itemStyle: { color: baseColor } },
              { value: randomData(), itemStyle: { color: baseColor } },
              { value: randomData(), itemStyle: { color: baseColor } },
              { value: randomData(), itemStyle: { color: baseColor } },
              { value: randomData(), itemStyle: { color: baseColor } },
            ],
            barWidth: this.isHighlight ? "45%" : "50%",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(0, 0, 0, 0.02)",
              borderRadius: 4,
            },
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(30, 58, 138, 0.3)",
              },
            },
          },
        ],
      };

      this.chart.setOption(option);
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    },
  },
};
</script>

<style scoped>
.chart-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  height: 100%;
  min-height: 0; /* Important for flex shrink */
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  overflow: hidden;
}

.chart-card ::v-deep .el-card__header {
  padding: 0;
  border-bottom: 1px solid var(--border-color);
}

.chart-card ::v-deep .el-card__body {
  height: 100%;
  box-sizing: border-box;
}

.chart-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.chart-card.featured {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.card-header {
  padding: var(--space-md) var(--space-lg); /* Reduced padding */
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.chart-badge {
  padding: 4px 10px;
  background: var(--primary-color);
  color: white;
  font-size: var(--font-xs);
  font-weight: 500;
  border-radius: var(--radius-sm);
}

.card-body {
  flex: 1;
  padding: 8px; /* Reduced padding */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

.chart-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
