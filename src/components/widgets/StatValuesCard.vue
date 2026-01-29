<template>
  <el-card
    class="stat-values-card"
    :body-style="{ padding: '8px', flex: '1', display: 'flex' }"
  >
    <div slot="header" class="card-header">
      <h3>统计结果</h3>
    </div>
    <div class="values-row">
      <div class="value-item">
        <div class="value-icon blue">💰</div>
        <div class="value-content">
          <div class="value-number">1095.89</div>
          <div class="value-label">万元</div>
          <div class="value-trend up">↑ 15.89%</div>
        </div>
      </div>
      <div class="value-item">
        <div class="value-icon purple">📊</div>
        <div class="value-content">
          <div class="value-number">1095.89</div>
          <div class="value-label">万元</div>
          <div class="value-trend down">↓ 10.12%</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "StatValuesCard",
};
</script>

<style scoped>
.stat-values-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.stat-values-card ::v-deep .el-card__header {
  padding: 8px;
  border-bottom: 1px solid var(--border-color);
}

.stat-values-card ::v-deep .el-card__body {
  padding: 0;
  height: 100%;
}

.card-header {
  flex-shrink: 0;
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-header h3::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 14px;
  background: #4a7bf7;
  border-radius: 2px;
  flex-shrink: 0;
}

.values-row {
  display: flex;
  gap: 20px;
  flex: 1;
}

.value-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.value-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.value-icon.blue {
  background: var(--card-blue-bg);
}

.value-icon.purple {
  background: var(--card-purple-bg);
}

.value-content {
  flex: 1;
}

.value-number {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 2px;
}

.value-label {
  font-size: var(--font-xs);
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.value-trend {
  font-size: var(--font-xs);
  font-weight: 600;
}

.value-trend.up {
  color: var(--success-color);
}

.value-trend.down {
  color: var(--danger-color);
}
</style>
