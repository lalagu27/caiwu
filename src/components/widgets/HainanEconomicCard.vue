<template>
  <el-card class="hainan-card">
    <div slot="header" class="card-header">
      <h3>
        <div class="header-icon"></div>
        在琼经济贡献
        <span class="year-label">[2026]</span>
      </h3>
    </div>

    <div class="content-wrapper">
      <!-- 海南公司 -->
      <div class="data-group">
        <div class="group-title">海南公司</div>
        <div class="data-row">
          <div class="data-item">
            <span class="label">固投</span>
            <span class="value">46<span class="unit">亿</span></span>
          </div>
          <div class="data-item">
            <span class="label">产值</span>
            <span class="value">140<span class="unit">亿</span></span>
          </div>
          <div class="data-item">
            <span class="label">纳税</span>
            <span class="value">4.1<span class="unit">亿元</span></span>
          </div>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="divider"></div>

      <!-- 区域单位整体 -->
      <div class="data-group">
        <div class="group-title">区域单位整体</div>
        <div class="data-row">
          <div class="data-item">
            <span class="label">固投</span>
            <span class="value">60<span class="unit">亿元</span></span>
          </div>
          <div class="data-item">
            <span class="label">产值</span>
            <span class="value">1333<span class="unit">亿元</span></span>
          </div>
          <div class="data-item">
            <span class="label">上缴税费</span>
            <span class="value">53<span class="unit">亿元</span></span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "HainanEconomicCard",
};
</script>

<style scoped>
.hainan-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.hainan-card ::v-deep .el-card__header {
  padding: 0 12px;
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-color);
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.3);
  display: flex;
  align-items: center;
}

.year-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-left: 8px;
  font-weight: normal;
}

.header-icon {
  display: none;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  justify-content: space-between;
  min-height: 0;
}

.data-group {
  display: flex;
  flex-direction: column;
  gap: 4px; /* Maintain gap between title and row */
}

.group-title {
  font-size: 13px;
  color: var(--primary-color);
  font-weight: 600;
  padding-left: 8px;
  border-left: 3px solid var(--primary-color);
  line-height: 1;
  margin-bottom: 2px;
}

.data-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.03);
  padding: 6px 8px; /* Reduced vertical padding */
  border-radius: 6px;
}

.data-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.value {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
  font-family: "D-DIN", sans-serif;
}

.unit {
  font-size: 10px;
  font-weight: normal;
  color: var(--text-secondary);
  margin-left: 2px;
  text-shadow: none;
}

.divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  margin: 2px 0; /* Reduced margin */
}
</style>
