<template>
  <div class="card widget-party">
    <div class="card-header">
      <div class="header-icon">🚩</div>
      <h3>党群管理</h3>
    </div>
    <div class="card-body">
      <!-- 活动列表 -->
      <div class="activity-list">
        <div class="activity-item">
          <span class="activity-tag study">学习</span>
          <span class="activity-text">二十大精神专题学习会</span>
          <span class="activity-date">今日 14:00</span>
        </div>
        <div class="activity-item">
          <span class="activity-tag event">活动</span>
          <span class="activity-text">七一主题党日活动报名</span>
          <span class="activity-date">本周五</span>
        </div>
        <div class="activity-item">
          <span class="activity-tag notice">公示</span>
          <span class="activity-text">2026年度优秀党员评选</span>
          <span class="activity-date">截止3/31</span>
        </div>
      </div>

      <!-- 底部统计 -->
      <div class="footer-stats">
        <div class="footer-stat">
          <div class="stat-label">党员总数</div>
          <div class="stat-value">42人</div>
        </div>
        <div class="divider"></div>
        <div class="footer-stat">
          <div class="stat-label">本月党费</div>
          <div class="stat-value success">已缴</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PartyManagement",
};
</script>

<style scoped>
.card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-header {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: linear-gradient(135deg, #fef2f2 0%, var(--bg-card) 100%);
}

.header-icon {
  font-size: 18px;
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-lg);
  font-weight: 600;
  color: #dc2626;
}

.card-body {
  flex: 1;
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* 活动列表 */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  flex: 1;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--bg-hover);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.activity-item:hover {
  background: var(--bg-card);
  border-color: #fca5a5;
  transform: translateX(2px);
}

.activity-tag {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 600;
  flex-shrink: 0;
  text-transform: uppercase;
}

.activity-tag.study {
  background: #dbeafe;
  color: #1e40af;
}

.activity-tag.event {
  background: #d1fae5;
  color: #047857;
}

.activity-tag.notice {
  background: #fef3c7;
  color: #92400e;
}

.activity-text {
  flex: 1;
  font-size: var(--font-base);
  color: var(--text-primary);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.activity-date {
  font-size: var(--font-sm);
  color: var(--text-tertiary);
  flex-shrink: 0;
}

/* 底部统计 */
.footer-stats {
  display: flex;
  align-items: center;
  padding-top: var(--space-md);
  border-top: 1px dashed #fca5a5;
}

.footer-stat {
  flex: 1;
  text-align: center;
}

.footer-stat .stat-label {
  font-size: var(--font-sm);
  color: var(--text-tertiary);
  margin-bottom: 4px;
}

.footer-stat .stat-value {
  font-size: var(--font-lg);
  font-weight: 700;
  color: #dc2626;
}

.footer-stat .stat-value.success {
  color: var(--success-color);
}

.divider {
  width: 1px;
  height: 32px;
  background: var(--border-color);
}
</style>
