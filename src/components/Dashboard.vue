<template>
  <div class="dashboard">
    <!-- Top Stats Cards Row - 5 cards -->
    <div class="stats-row">
      <user-info-card name="XXX" position="公司领导" />
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

        <!-- 销量情况运行 (替换油气销售对比) -->
        <sales-comparison-card class="chart-card production-card" />

        <!-- 完成率统计 - 多色环形图（延伸到底部）-->
        <!-- 月度产值 - 替换油气产量分月对比 -->
        <monthly-output-value-card class="chart-card chart-tall" />
      </div>

      <!-- Center Column - 3D Visual + Bottom Chart -->
      <div class="center-col">
        <!-- 3D可视化 -->
        <center-visual class="center-visual" />

        <!-- 油气产量对比图 -->
        <oil-gas-production-monthly-card class="chart-card chart-bottom" />
      </div>

      <!-- Right Column -->
      <div class="right-col">
        <!-- 新增经济可采储量 - 替换原来的部门数据对比 -->
        <reserves-completion-card />
        <reserves-completion-card1 />

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
import ReservesCompletionCard1 from "./widgets/ReservesCompletionCard1.vue";
import ProjectProgressCard from "./widgets/ProjectProgressCard.vue";
import CenterVisual from "./widgets/CenterVisual.vue";
import DrillingDynamicsCard from "./widgets/DrillingDynamicsCard.vue";
import SalesComparisonCard from "./widgets/SalesComparisonCard.vue";
import MonthlyOutputValueCard from "./widgets/MonthlyOutputValueCard.vue";
import OilGasProductionMonthlyCard from "./widgets/OilGasProductionMonthlyCard.vue";

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
    ReservesCompletionCard1,
    ProjectProgressCard,
    CenterVisual,
    DrillingDynamicsCard,
    SalesComparisonCard,
    MonthlyOutputValueCard,
    OilGasProductionMonthlyCard,
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
  data() {
    return {
      charts: {},
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
    handleThemeChange() {
      // Re-init charts with new theme colors
      this.initCharts();
    },
    initCharts() {
      const isDark = document.body.classList.contains("dark-theme");
      const textColor = isDark ? "#A3AED0" : "#666";
      const lineColor = isDark ? "#2B3674" : "#E1E8ED";
      const themeBlue = isDark ? "#00F0FF" : "#2B3674";
      const techBlue = isDark ? "#2B65F0" : "#4A7BF7";

      const tooltipConfig = {
        backgroundColor: isDark
          ? "rgba(15, 22, 41, 0.95)"
          : "rgba(255, 255, 255, 0.95)",
        borderColor: isDark ? "#334155" : "#ddd",
        borderWidth: 1,
        textStyle: {
          color: isDark ? "#CBD5E1" : "#333",
        },
      };

      // 盈利能力目前使用 inline 或静态展示，移除过时的 init 调用
    },

    // initChart6 已移除
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  overflow-y: auto; /* 允许垂直滚动 */
  overflow-x: hidden; /* 隐藏水平滚动 */
  box-sizing: border-box;
}

/* Stats Row - 5 cards */
.stats-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1.8fr 1fr 1fr;
  gap: 4px;
  height: 200px; /* Reduced further per user request */
  flex-shrink: 0;
}

/* Main Grid - 3 Columns */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 4px;
  flex: 1;
  min-height: fit-content; /* 允许内容撑开高度 */
}

.left-col,
.right-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 0;
  height: 100%;
}

/* 左右列的高度分配 */
.left-col > .chart-card {
  min-height: calc(33.33vh + 30px); /* 每个卡片基础高度加30px */
  flex: 1;
}

.right-col > .chart-card:nth-child(1),
.right-col > .chart-card:nth-child(2) {
  flex: 0.6;
}

.center-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 0;
  height: auto;
}

.center-col .center-visual {
  flex: 2; /* 占2份，形成2:1比例 */
  min-height: 0;
}

.center-col .chart-bottom {
  flex: 1; /* 占1份，形成2:1比例 */
  min-height: 0;
}

/* Chart Cards */
.chart-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.chart-card ::v-deep .el-card__header {
  height: 38px;
  display: flex;
  align-items: center;
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
  display: flex;
  align-items: center;
}

/* h3::before handled by global main.css */

.chart-tabs {
  display: flex;
  gap: 4px;
}

.tab {
  padding: 1px 6px;
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
  background: var(--primary-color);
  color: var(--primary-dark); /* 使用深色文字提升对比度 */
  border-color: var(--primary-color);
  font-weight: 600;
  box-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
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
