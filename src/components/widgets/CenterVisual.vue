<template>
  <el-card
    class="center-visual chart-card"
    :body-style="{
      padding: '0px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
    }"
  >
    <div slot="header" class="chart-header">
      <h3>
        核心指标
        <span
          style="
            font-size: 12px;
            color: var(--text-secondary);
            margin-left: 8px;
            font-weight: normal;
          "
          >[2026]</span
        >
      </h3>
    </div>
    <div class="visual-content">
      <div class="kpi-overlay">
        <KPIProgressCards />
      </div>
    </div>
  </el-card>
</template>

<script>
import KPIProgressCards from "./KPIProgressCards.vue";

export default {
  name: "CenterVisual",
  components: {
    KPIProgressCards,
  },
};
</script>

<style scoped>
.center-visual {
  position: relative;
  height: 100%; /* 响应父容器flex高度 */
  background: var(--bg-card);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.center-visual ::v-deep .el-card__header {
  padding: 0 12px;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.chart-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--primary-color);
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.3);
  display: flex;
  align-items: center;
}

.center-visual ::v-deep .el-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0 !important;
}

.visual-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.kpi-overlay {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
