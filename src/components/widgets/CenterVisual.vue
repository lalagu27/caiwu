<template>
  <el-card
    class="center-visual"
    :body-style="{
      padding: '12px',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
  height: auto;
  background: #fff;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

.visual-content {
  width: 100%;
  height: 100%;
}

.kpi-overlay {
  width: 100%;
}
</style>
