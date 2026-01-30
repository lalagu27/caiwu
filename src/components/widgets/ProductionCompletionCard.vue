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
        <span
          style="
            font-size: 12px;
            color: var(--text-secondary);
            margin-left: 8px;
          "
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
      const textColor = isDark ? "#A3AED0" : "#666";
      const axisLineColor = isDark ? "#2B3674" : "#999";
      const splitLineColor = isDark ? "#112240" : "#eee";

      // Configuration for Scaling
      const OIL_MAX = 35000;
      const GAS_MAX = 1200;
      const RATIO = OIL_MAX / GAS_MAX;

      const rawData = {
        planOil: [19000, 18000],
        actOil: [20000, 18500],
        planGas: [450, 420],
        actGas: [350, 300],
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
              if (param.seriesName.includes("气")) {
                val = Math.round(val / RATIO);
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
          textStyle: { fontSize: 11, color: textColor },
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
          axisLine: { lineStyle: { color: axisLineColor } },
          axisLabel: { color: textColor, fontSize: 12 },
          axisTick: { show: false },
        },
        yAxis: [
          {
            type: "value",
            name: "(方)",
            min: 0,
            max: OIL_MAX,
            interval: 5000,
            axisLabel: { color: textColor },
            splitLine: {
              show: true,
              lineStyle: { type: "dashed", color: splitLineColor },
            },
            nameTextStyle: {
              align: "right",
              padding: [0, 10, 0, 0],
              color: textColor,
            },
          },
          {
            type: "value",
            name: "(万方)",
            min: 0,
            max: GAS_MAX,
            interval: 200,
            axisLabel: { color: textColor },
            splitLine: { show: false },
            nameTextStyle: {
              align: "left",
              padding: [0, 0, 0, 10],
              color: textColor,
            },
          },
        ],
        series: [
          {
            name: "计划产量(油)",
            type: "bar",
            stack: "plan",
            data: rawData.planOil,
            itemStyle: { color: "#A3AED0" },
            barWidth: "25%",
          },
          {
            name: "计划产量(气)",
            type: "bar",
            stack: "plan",
            data: scaledData.planGas,
            itemStyle: { color: "#D3D9E6" },
            barWidth: "25%",
          },
          {
            name: "实际产量(油)",
            type: "bar",
            stack: "act",
            data: rawData.actOil,
            itemStyle: { color: "#2B3674" },
            barWidth: "25%",
          },
          {
            name: "实际产量(气)",
            type: "bar",
            stack: "act",
            data: scaledData.actGas,
            itemStyle: { color: "#4318FF" },
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
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
  min-height: 250px;
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

.chart-header h3::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 16px;
  background: var(--primary-color);
  box-shadow: 0 0 8px var(--primary-color);
  margin-right: 8px;
  border-radius: 2px;
}

.chart-body {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
