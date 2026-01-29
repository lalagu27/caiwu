<template>
  <div class="dashboard">
    <!-- Top Stats Cards Row - 5 cards -->
    <div class="stats-row">
      <user-info-card name="张明" position="产品经理" />
      <today-reminders-card />
      <pending-approvals-card />
      <weekly-schedule-card />
      <party-management-card />
    </div>

    <!-- Main Content - 3 Columns Layout -->
    <div class="main-grid">
      <!-- Left Column -->
      <div class="left-col">
        <!-- 油气产量完成情况 (New) -->
        <production-completion-card class="chart-card production-card" />

        <!-- 数据分析 - 折线图 -->
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
              油气销售对比
              <span style="font-size: 12px; color: #999; margin-left: 8px"
                >[{{ currentDate }}]</span
              >
            </h3>
            <div class="chart-tabs">
              <button
                class="tab"
                :class="{ active: periodChart1 === '日' }"
                @click="periodChart1 = '日'"
              >
                日
              </button>
              <button
                class="tab"
                :class="{ active: periodChart1 === '月' }"
                @click="periodChart1 = '月'"
              >
                月
              </button>
              <button
                class="tab"
                :class="{ active: periodChart1 === '年' }"
                @click="periodChart1 = '年'"
              >
                年
              </button>
            </div>
          </div>
          <div class="chart-body" ref="chart1"></div>
        </el-card>

        <!-- 完成率统计 - 多色环形图（延伸到底部）-->
        <el-card
          class="chart-card chart-tall"
          :body-style="{
            padding: '0px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }"
        >
          <div slot="header" class="chart-header">
            <h3>
              油气产量分月对比
              <span style="font-size: 12px; color: #999; margin-left: 8px"
                >[2025/11]</span
              >
            </h3>
            <div class="chart-tabs">
              <button
                class="tab"
                :class="{ active: periodChart2 === '日' }"
                @click="periodChart2 = '日'"
              >
                日
              </button>
              <button
                class="tab"
                :class="{ active: periodChart2 === '月' }"
                @click="periodChart2 = '月'"
              >
                月
              </button>
              <button
                class="tab"
                :class="{ active: periodChart2 === '年' }"
                @click="periodChart2 = '年'"
              >
                年
              </button>
            </div>
          </div>
          <div class="chart-body" ref="chart2"></div>
        </el-card>
      </div>

      <!-- Center Column - 3D Visual + Bottom Chart -->
      <div class="center-col">
        <!-- 3D可视化 -->
        <center-visual class="center-visual" />

        <!-- 底部图表 - 盈利能力 -->
        <el-card
          class="chart-card chart-bottom"
          :body-style="{
            padding: '8px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }"
        >
          <div slot="header" class="chart-header">
            <h3>
              盈利能力
              <span style="font-size: 12px; color: #999; margin-left: 8px"
                >[2025]</span
              >
            </h3>
          </div>
          <div class="chart-body" ref="chart6"></div>
        </el-card>
      </div>

      <!-- Right Column -->
      <div class="right-col">
        <!-- 新增经济可采储量 - 替换原来的部门数据对比 -->
        <reserves-completion-card />

        <!-- 重点项目执行进度 - 替换原来的分类占比 -->
        <project-progress-card />

        <!-- 钻井动态 - 替换原来的部门排名 -->
        <drilling-dynamics-card class="chart-tall" />
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import UserInfoCard from "./widgets/UserInfoCard.vue";
import TodayRemindersCard from "./widgets/TodayRemindersCard.vue";
import PendingApprovalsCard from "./widgets/PendingApprovalsCard.vue";
import WeeklyScheduleCard from "./widgets/WeeklyScheduleCard.vue";
import PartyManagementCard from "./widgets/PartyManagementCard.vue";
import KPIProgressCards from "./widgets/KPIProgressCards.vue";
import ProductionCompletionCard from "./widgets/ProductionCompletionCard.vue";
import ReservesCompletionCard from "./widgets/ReservesCompletionCard.vue";
import ProjectProgressCard from "./widgets/ProjectProgressCard.vue";
import CenterVisual from "./widgets/CenterVisual.vue";
import DrillingDynamicsCard from "./widgets/DrillingDynamicsCard.vue";

export default {
  name: "Dashboard",
  components: {
    UserInfoCard,
    TodayRemindersCard,
    PendingApprovalsCard,
    WeeklyScheduleCard,
    PartyManagementCard,
    "kpi-progress-cards": KPIProgressCards,
    KPIProgressCards,
    ProductionCompletionCard,
    ReservesCompletionCard,
    ProjectProgressCard,
    CenterVisual,
    DrillingDynamicsCard,
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    Object.values(this.charts).forEach((chart) => {
      if (chart) chart.dispose();
    });
  },
  data() {
    return {
      charts: {},
      periodChart1: "月",
      periodChart2: "月",
      currentDate: "",
    };
  },
  created() {
    const today = new Date();
    this.currentDate = `${today.getFullYear()}/${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  },
  methods: {
    handleResize() {
      Object.values(this.charts).forEach((chart) => {
        if (chart) chart.resize();
      });
    },
    initCharts() {
      this.initChart1();
      this.initChart2();
      this.initChart3();
      this.initChart4();
      this.initChart5();
      this.initChart6();
    },
    initChart1() {
      if (!this.$refs.chart1) return;
      const chart = echarts.init(this.$refs.chart1);

      chart.setOption({
        title: {
          text: "油当量(万方)",
          textStyle: {
            fontSize: 12,
            color: "#666",
            fontWeight: "normal",
          },
          top: 10,
          left: 10,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["销售油量", "销售气量"],
          top: 10,
          right: 10,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 20,
        },
        grid: { top: 40, right: 20, bottom: 20, left: 15, containLabel: true },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
          axisLine: { lineStyle: { color: "#E1E8ED" } },
          axisLabel: { color: "#666", fontSize: 11 },
          axisTick: { show: true, alignWithLabel: true },
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 700000,
          interval: 100000,
          splitLine: { lineStyle: { color: "#F0F4F9", type: "dashed" } },
          axisLabel: { color: "#666", fontSize: 11 },
        },
        series: [
          {
            name: "销售油量",
            data: [
              480000, 500000, 520000, 560000, 550000, 650000, 450000, 650000,
              520000, 560000, 520000,
            ],
            type: "line",
            smooth: false,
            symbol: "circle",
            symbolSize: 4,
            lineStyle: { color: "#00C292", width: 2 },
            itemStyle: { color: "#00C292" },
          },
          {
            name: "销售气量",
            data: [
              380000, 320000, 360000, 340000, 330000, 280000, 360000, 360000,
              340000, 350000, 340000,
            ],
            type: "line",
            smooth: false,
            symbol: "circle",
            symbolSize: 4,
            lineStyle: { color: "#FF5252", width: 2 },
            itemStyle: { color: "#FF5252" },
          },
        ],
      });

      this.charts.chart1 = chart;
    },
    initChart2() {
      if (!this.$refs.chart2) return;
      const chart = echarts.init(this.$refs.chart2);

      const months = Array.from({ length: 12 }, (_, i) => i + 1);

      // 模拟数据
      const planOil = [53, 48, 54, 45, 57, 52, 59, 61, 62, 61, 58, 59];
      const planGas = [39, 35, 36, 36, 31, 38, 37, 37, 36, 40, 42, 41];
      const actOil = [56, 49, 56, 59, 62, 55, 56, 53, 49, 62, 60, null]; // 12月无数据
      const actGas = [42, 36, 40, 38, 37, 32, 40, 40, 36, 38, 39, null];

      // 计算年累
      let planTotal = 0;
      const planAcc = [];
      for (let i = 0; i < 12; i++) {
        planTotal += planOil[i] + planGas[i];
        planAcc.push(planTotal);
      }

      let actTotal = 0;
      const actAcc = [];
      for (let i = 0; i < 11; i++) {
        // 只有前11个月
        actTotal += actOil[i] + actGas[i];
        actAcc.push(actTotal);
      }

      chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          confine: true, // Prevent tooltip clipping
        },
        legend: {
          data: [
            "计划月产油",
            "计划月产气",
            "实际月产油",
            "实际月产气",
            "计划年产油气",
            "实际年产油气",
          ],
          type: "scroll",
          top: "auto",
          bottom: 0,
          left: "center",
          width: "90%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { fontSize: 10 },
          itemGap: 15,
        },
        grid: { top: 45, right: 50, bottom: 40, left: 35 },
        xAxis: {
          type: "category",
          data: months,
          axisLine: { lineStyle: { color: "#999" } },
          axisLabel: { color: "#333", fontSize: 11 },
          axisTick: { show: false },
        },
        yAxis: [
          {
            type: "value",
            name: "月产(万方)",
            min: 0,
            max: 120,
            interval: 20,
            axisLabel: { color: "#333" },
            nameTextStyle: { align: "left", padding: [0, 0, 0, -30] },
            splitLine: { show: true, lineStyle: { type: "dashed" } },
          },
          {
            type: "value",
            name: "年累(万方)",
            min: 0,
            max: 1200,
            interval: 200,
            axisLabel: { color: "#333" },
            splitLine: { show: false },
          },
        ],
        series: [
          // 计划堆叠柱
          {
            name: "计划月产油",
            type: "bar",
            stack: "plan",
            data: planOil,
            itemStyle: { color: "#b2f7c9" },
            barWidth: "30%",
          },
          {
            name: "计划月产气",
            type: "bar",
            stack: "plan",
            data: planGas,
            itemStyle: { color: "#f7b2b2" },
            barWidth: "30%",
          },
          // 实际堆叠柱
          {
            name: "实际月产油",
            type: "bar",
            stack: "act",
            data: actOil,
            itemStyle: { color: "#00e600" },
            barWidth: "30%",
          },
          {
            name: "实际月产气",
            type: "bar",
            stack: "act",
            data: actGas,
            itemStyle: { color: "#ff0000" },
            barWidth: "30%",
          },
          // 折线图
          {
            name: "计划年产油气",
            type: "line",
            yAxisIndex: 1,
            data: planAcc,
            itemStyle: { color: "#ff8c00" },
            lineStyle: { width: 2 },
          },
          {
            name: "实际年产油气",
            type: "line",
            yAxisIndex: 1,
            data: actAcc,
            itemStyle: { color: "#800080" },
            lineStyle: { width: 2 },
            symbol: "diamond",
            symbolSize: 8,
          },
        ],
      });

      this.charts.chart2 = chart;
    },
    initChart3() {
      if (!this.$refs.chart3) return;
      const chart = echarts.init(this.$refs.chart3);

      chart.setOption({
        grid: { top: 10, right: 10, bottom: 20, left: 30 },
        xAxis: {
          type: "category",
          data: ["甲部", "乙部", "丙部", "丁部"],
          axisLine: { lineStyle: { color: "#E1E8ED" } },
          axisLabel: { color: "#BDC3C7", fontSize: 10 },
          axisTick: { show: false },
        },
        yAxis: {
          type: "value",
          splitLine: { lineStyle: { color: "#F0F4F9", type: "dashed" } },
          axisLabel: { color: "#BDC3C7", fontSize: 10 },
        },
        series: [
          {
            data: [
              { value: 120, itemStyle: { color: "#5B8FF9" } },
              { value: 180, itemStyle: { color: "#FF9F43" } },
              { value: 150, itemStyle: { color: "#5B8FF9" } },
              { value: 80, itemStyle: { color: "#FF9F43" } },
            ],
            type: "bar",
            barWidth: "40%",
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
            },
          },
        ],
      });

      this.charts.chart3 = chart;
    },
    initChart4() {
      if (!this.$refs.chart4) return;
      const chart = echarts.init(this.$refs.chart4);

      chart.setOption({
        grid: { top: 10, right: 10, bottom: 20, left: 30 },
        xAxis: {
          type: "category",
          data: ["01", "02", "03", "04", "05", "06", "07"],
          axisLine: { lineStyle: { color: "#E1E8ED" } },
          axisLabel: { color: "#BDC3C7", fontSize: 10 },
          axisTick: { show: false },
        },
        yAxis: {
          type: "value",
          splitLine: { lineStyle: { color: "#F0F4F9", type: "dashed" } },
          axisLabel: { color: "#BDC3C7", fontSize: 10 },
        },
        series: [
          {
            data: [100, 200, 180, 250, 230, 280, 320],
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 4,
            lineStyle: { color: "#52C41A", width: 2 },
            itemStyle: { color: "#52C41A" },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(82, 196, 26, 0.15)" },
                { offset: 1, color: "rgba(82, 196, 26, 0.02)" },
              ]),
            },
          },
        ],
      });

      this.charts.chart4 = chart;
    },
    initChart5() {
      if (!this.$refs.chart5) return;
      const chart = echarts.init(this.$refs.chart5);

      chart.setOption({
        grid: { top: 10, right: 40, bottom: 10, left: 60 },
        yAxis: {
          type: "category",
          data: ["采购部", "行政部", "财务部", "市场部", "销售部"],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: "#7F8C8D", fontSize: 11 },
        },
        xAxis: {
          type: "value",
          show: false,
          max: 100,
        },
        series: [
          {
            data: [60, 68, 72, 78, 85],
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              color: "#4A7BF7",
              borderRadius: [0, 4, 4, 0],
            },
            label: {
              show: true,
              position: "right",
              formatter: "{c}%",
              color: "#2C3E50",
              fontSize: 11,
              fontWeight: 600,
            },
          },
        ],
      });

      this.charts.chart5 = chart;
    },
    initChart6() {
      if (!this.$refs.chart6) return;
      const chart = echarts.init(this.$refs.chart6);

      chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        legend: {
          data: ["本年", "上年"],
          top: 0,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 12,
        },
        grid: {
          top: 30,
          right: 30,
          bottom: 10,
          left: 30,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "现金流",
            "盈亏平衡价",
            "现金流平衡价",
            "桶油五项成本",
            "桶油综合成本",
          ],
          axisLine: { lineStyle: { color: "#E1E8ED" } },
          axisLabel: { color: "#7F8C8D", fontSize: 10, interval: 0 },
          axisTick: { show: false },
        },
        yAxis: [
          {
            type: "value",
            name: "(百万元)",
            min: 0,
            max: 35,
            interval: 5,
            axisLabel: { color: "#7F8C8D" },
            splitLine: { show: true, lineStyle: { type: "dashed" } },
            nameTextStyle: {
              color: "#7F8C8D",
              align: "left",
              padding: [0, 0, 0, -30],
            },
          },
          {
            type: "value",
            name: "(美元/桶)",
            min: 0,
            max: 60,
            interval: 10,
            axisLabel: { color: "#7F8C8D" },
            splitLine: { show: false },
            nameTextStyle: { color: "#7F8C8D" },
          },
        ],
        series: [
          // 本年 - 现金流 (左轴)
          {
            name: "本年",
            type: "bar",
            data: [33, null, null, null, null],
            barWidth: 15,
            itemStyle: { color: "#EF6C00" }, // 橙色
            yAxisIndex: 0,
          },
          // 本年 - 其他 (右轴)
          {
            name: "本年",
            type: "bar",
            data: [null, 17, 29, 15, 17],
            barWidth: 15,
            itemStyle: { color: "#EF6C00" },
            yAxisIndex: 1,
          },
          // 上年 - 现金流 (左轴)
          {
            name: "上年",
            type: "bar",
            data: [32.5, null, null, null, null],
            barWidth: 15,
            itemStyle: { color: "#AB47BC" }, // 紫色
            yAxisIndex: 0,
          },
          // 上年 - 其他 (右轴)
          {
            name: "上年",
            type: "bar",
            data: [null, 20, 16, 18, 20],
            barWidth: 15,
            itemStyle: { color: "#AB47BC" },
            yAxisIndex: 1,
          },
        ],
      });

      this.charts.chart6 = chart;
    },
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px;
  overflow-y: auto;
  box-sizing: border-box;
}

/* Stats Row - 5 cards */
.stats-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1.8fr 1fr 1fr;
  gap: 6px;
  height: 270px;
  flex-shrink: 0;
}

/* Main Grid - 3 Columns */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 6px;
  flex: 1;
  min-height: 0;
}

.left-col,
.right-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 0;
  height: 100%;
}

/* 左右列的高度分配 */
.left-col .stat-values {
  flex: 0 0 80px;
}

.left-col > .chart-card:nth-child(2),
.right-col > .chart-card:nth-child(1) {
  flex: 1;
}

.left-col .production-card {
  flex: 0 0 280px;
}

.left-col > .chart-card:nth-child(3),
.right-col > .chart-card:nth-child(2) {
  flex: 1;
}

.left-col .chart-tall {
  flex: 1.5;
}

.center-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 0;
  height: auto;
}

.center-col .center-visual {
  flex: 0 0 auto;
}

.center-col .chart-bottom {
  flex: 1 0 280px;
}

/* Chart Cards */
.chart-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.chart-card ::v-deep .el-card__header {
  padding: 0 12px;
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.chart-card ::v-deep .el-card__body {
  padding: 8px !important;
}

.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}

.chart-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.chart-header h3::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 14px;
  background: #4a7bf7;
  border-radius: 2px;
  flex-shrink: 0;
}

.chart-tabs {
  display: flex;
  gap: 4px;
}

.tab {
  padding: 2px 8px;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.chart-body {
  flex: 1;
  min-height: 100px;
  width: 100%;
  position: relative;
}

.chart-legend {
  display: flex;
  gap: 16px;
  padding-top: 4px;
  flex-shrink: 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-xs);
  color: var(--text-secondary);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.blue {
  background: #4a7bf7;
}

.dot.orange {
  background: #ff9f43;
}
</style>
