<template>
  <el-card
    class="center-visual chart-card"
    :body-style="{
      padding: '12px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
    }"
  >
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

.center-visual ::v-deep .el-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
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
