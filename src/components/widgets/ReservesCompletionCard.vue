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
        新增经济可采储量
        <span style="font-size: 12px; color: #999; margin-left: 8px"
          >[{{ currentDate }}]</span
        >
      </h3>
      <div class="chart-tabs">
        <button
          class="tab"
          :class="{ active: period === '日' }"
          @click="period = '日'"
        >
          日
        </button>
        <button
          class="tab"
          :class="{ active: period === '月' }"
          @click="period = '月'"
        >
          月
        </button>
        <button
          class="tab"
          :class="{ active: period === '年' }"
          @click="period = '年'"
        >
          年
        </button>
      </div>
    </div>
    <div class="chart-body" ref="chart"></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "ReservesCompletionCard",
  data() {
    return {
      chart: null,
      period: "月",
      currentDate: "",
    };
  },
  created() {
    const today = new Date();
    this.currentDate = `${today.getFullYear()}/${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.chart) this.chart.dispose();
  },
  methods: {
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    initChart() {
      if (!this.$refs.chart) return;
      this.chart = echarts.init(this.$refs.chart);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        legend: {
          data: ["目标", "已完成"],
          top: 10,
          right: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { fontSize: 11, color: "#666" },
        },
        grid: {
          top: 40,
          right: 20,
          bottom: 20,
          left: 20,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月", "6月"],
          axisLine: { lineStyle: { color: "#E1E8ED" } },
          axisLabel: { color: "#666", fontSize: 11 },
          axisTick: { show: false },
        },
        yAxis: {
          type: "value",
          name: "万吨",
          nameTextStyle: {
            padding: [0, 0, 0, -20],
            color: "#999",
          },
          splitLine: { lineStyle: { color: "#F0F4F9", type: "dashed" } },
          axisLabel: { color: "#666", fontSize: 11 },
        },
        series: [
          {
            name: "目标",
            type: "bar",
            data: [100, 100, 100, 120, 120, 120],
            barWidth: 12,
            itemStyle: {
              color: "#e0e0e0", // Grey for target
              borderRadius: [4, 4, 0, 0],
            },
            barGap: "-100%", // Overlap bars if desired, or separte. Typical Target/Actual is overlapping or side-by-side.
            // Let's do side-by-side for clarity first, or better:
            // "Target" as a background bar or line?
            // User asked for "Target vs Completed". Side-by-side is clearest.
          },
          {
            name: "已完成",
            type: "bar",
            data: [85, 92, 105, 110, 125, 118],
            barWidth: 12,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2B3674" }, // Theme Blue for Completed
                { offset: 1, color: "#4A7BF7" },
              ]),
              borderRadius: [4, 4, 0, 0],
            },
          },
        ],
      };

      // Update config for side-by-side (remove barGap/barCategoryGap if I set them)
      option.series[0].barGap = "20%"; // Default gap

      this.chart.setOption(option);
    },
  },
};
</script>

<style scoped>
.chart-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
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
  transform: translateY(-2px);
}
.chart-card ::v-deep .el-card__header {
  padding: 0 12px;
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: none; /* Keep no border as requested */
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: none; /* Separator removed */
  width: 100%; /* Ensure full width for justification */
}

.chart-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}

.chart-header h3::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 14px;
  background: #4a7bf7;
  margin-right: 8px;
  border-radius: 2px;
}

.chart-body {
  flex: 1;
  min-height: 200px;
  width: 100%;
}

.chart-tabs {
  display: flex;
  gap: 4px;
}

.tab {
  padding: 1px 6px; /* Matched to Dashboard */
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  line-height: 1.5;
}

.tab.active {
  background: var(--primary-color); /* Navy Blue */
  color: white;
  border-color: var(--primary-color);
}
</style>
