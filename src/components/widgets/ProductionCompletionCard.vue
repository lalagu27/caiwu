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
        油气产量完成情况
        <span style="font-size: 12px; color: #999; margin-left: 8px"
          >[{{ currentDate }}]</span
        >
      </h3>
      <div class="header-actions">
        <!-- Optional icons if needed, mimicking image -->
      </div>
    </div>
    <div class="chart-body" ref="chart"></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "ProductionCompletionCard",
  data() {
    const today = new Date();
    const dateStr = `${today.getFullYear()}/${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}`;
    return {
      chart: null,
      currentDate: dateStr,
    };
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

      // Configuration for Scaling
      // Left Axis (Oil): 0 - 35,000
      // Right Axis (Gas): 0 - 1,200
      // Scale Ratio = 35000 / 1200 = 29.16666
      const OIL_MAX = 35000;
      const GAS_MAX = 1200;
      const RATIO = OIL_MAX / GAS_MAX;

      // Data (Estimated from image)
      // Today: Plan Oil ~19k, Act Oil ~20k. Plan Gas ~4.5mm(scaled) -> ~150 visual? No.
      // Look at image:
      // Today Plan Bar: Green part ~19k. Red part adds up to ~32k. So Red part height is ~13k.
      // Real Gas Value = 13000 / RATIO = 13000 / 29.16 = ~445 万方.
      // Today Act Bar: Green part ~20k. Red part adds up to ~30k. Red height ~10k.
      // Real Gas Value = 10000 / 29.16 = ~340 万方.

      // Year Plan Bar: Green ~18k. Red adds to ~30k (height ~12k).
      // Real Gas ~ 12000/29.16 = ~410.
      // Year Act Bar: Green ~18k. Red adds to ~27k (height ~9k).
      // Real Gas ~ 308.

      const rawData = {
        planOil: [19000, 18000],
        actOil: [20000, 18500],
        planGas: [450, 420], // Real values in WanFang
        actGas: [350, 300], // Real values in WanFang
      };

      const scaledData = {
        planGas: rawData.planGas.map((v) => v * RATIO),
        actGas: rawData.actGas.map((v) => v * RATIO),
      };

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: function (params) {
            let res = params[0].name + "<br/>";
            params.forEach((param) => {
              let val = param.value;
              // If it's Gas (series name contains '气'), divide by RATIO for display
              if (param.seriesName.includes("气")) {
                val = Math.round(val / RATIO); // Restore original value
              }
              res +=
                param.marker +
                param.seriesName +
                ": " +
                val +
                (param.seriesName.includes("油") ? " 方" : " 万方") +
                "<br/>";
            });
            return res;
          },
        },
        legend: {
          data: [
            "计划产量(油)",
            "实际产量(油)",
            "计划产量(气)",
            "实际产量(气)",
          ],
          top: 5,
          left: "center",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { fontSize: 11 },
        },
        grid: {
          top: 40,
          right: 60,
          bottom: 20,
          left: 50,
        },
        xAxis: {
          type: "category",
          data: ["当日产量", "当年产量"],
          axisLine: { lineStyle: { color: "#999" } },
          axisLabel: { color: "#666", fontSize: 12 },
          axisTick: { show: false },
        },
        yAxis: [
          {
            type: "value",
            name: "(方)",
            min: 0,
            max: OIL_MAX,
            interval: 5000,
            axisLabel: { color: "#666" },
            splitLine: { show: true, lineStyle: { type: "dashed" } },
            nameTextStyle: { align: "right", padding: [0, 10, 0, 0] },
          },
          {
            type: "value",
            name: "(万方)",
            min: 0,
            max: GAS_MAX,
            interval: 200,
            axisLabel: { color: "#666" },
            splitLine: { show: false },
            nameTextStyle: { align: "left", padding: [0, 0, 0, 10] },
          },
        ],
        series: [
          // Stack 1: Plan
          {
            name: "计划产量(油)",
            type: "bar",
            stack: "plan",
            data: rawData.planOil,
            itemStyle: { color: "#9ef7ba" }, // Light Green
            barWidth: "25%",
          },
          {
            name: "计划产量(气)",
            type: "bar",
            stack: "plan",
            data: scaledData.planGas, // Scaled data
            itemStyle: { color: "#f59da1" }, // Light Red
            barWidth: "25%",
          },
          // Stack 2: Actual
          {
            name: "实际产量(油)",
            type: "bar",
            stack: "act",
            data: rawData.actOil,
            itemStyle: { color: "#00e600" }, // Bright Green
            barWidth: "25%",
          },
          {
            name: "实际产量(气)",
            type: "bar",
            stack: "act",
            data: scaledData.actGas, // Scaled data
            itemStyle: { color: "#ff0000" }, // Red
            barWidth: "25%",
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
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  min-height: 250px;
}

.chart-card ::v-deep .el-card__header {
  padding: 0 12px;
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
}

.chart-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  display: flex;
  align-items: center;
}

.chart-header h3::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 16px;
  background: #4a7bf7;
  margin-right: 8px;
  border-radius: 2px;
}

.chart-body {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
