<template>
  <div class="card widget-profile">
    <div class="card-body">
      <!-- 头像区 -->
      <div class="avatar-section">
        <img
          src="https://ui-avatars.com/api/?name=ZS&background=1E3A8A&color=fff&size=80"
          alt="Avatar"
          class="avatar"
        />
        <div class="status-dot"></div>
      </div>

      <!-- 信息区 -->
      <div class="info-section">
        <h3 class="name">张三</h3>
        <div class="role">公司领导</div>
        <div class="dept">互联网事业部 · 创新研发组</div>
      </div>

      <!-- 统计指标 -->
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-icon">📋</div>
          <div class="stat-content">
            <div class="stat-value">12</div>
            <div class="stat-label">待办任务</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">📅</div>
          <div class="stat-content">
            <div class="stat-value">5</div>
            <div class="stat-label">今日日程</div>
          </div>
        </div>
        <div class="stat-item highlight">
          <div class="stat-icon">⭐</div>
          <div class="stat-content">
            <div class="stat-value">98%</div>
            <div class="stat-label">本月绩效</div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <button class="action-btn">查看详情 →</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
};
</script>

<style scoped>
.card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
}

/* 头像区 */
.avatar-section {
  position: relative;
  width: 56px; /* Smaller avatar */
  height: 56px;
  margin: 0 auto;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  object-fit: cover;
}

.status-dot {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 14px;
  height: 14px;
  background: var(--success-color);
  border: 3px solid var(--bg-card);
  border-radius: 50%;
}

/* 信息区 */
.info-section {
  text-align: center;
}

.name {
  font-size: var(--font-md);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 2px 0;
}

.role {
  background: var(--primary-light);
  color: var(--primary-color);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 500;
  display: inline-block;
  margin-bottom: 2px;
}

.dept {
  font-size: var(--font-sm);
  color: var(--text-tertiary);
}

/* 统计指标 */
.stats-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  flex: 1;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: var(--bg-hover);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.stat-item:hover {
  background: var(--bg-main);
  transform: translateX(2px);
}

.stat-item.highlight {
  background: var(--accent-light);
  border: 1px solid var(--accent-color);
}

.stat-icon {
  font-size: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
  min-width: 0;
}

.stat-value {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 2px;
}

.stat-label {
  font-size: var(--font-sm);
  color: var(--text-secondary);
}

/* 操作按钮 */
.action-btn {
  width: 100%;
  padding: var(--space-md);
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-lg);
  font-weight: 500;
  color: #409eff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}
</style>
