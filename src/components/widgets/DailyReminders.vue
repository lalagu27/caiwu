<template>
  <div class="card widget-reminders chart-card">
    <div class="card-header">
      <div class="header-left">
        <div class="header-icon">🔔</div>
        <h3>今日提醒</h3>
      </div>
      <span class="badge">3</span>
    </div>
    <div class="card-body">
      <div class="reminder-list">
        <div class="reminder-item priority-high">
          <div class="reminder-icon warning">⚠️</div>
          <div class="reminder-content">
            <div class="reminder-title">需提交第一季度OKR</div>
            <div class="reminder-time">截止时间: 今天 18:00</div>
          </div>
          <button class="quick-btn">处理</button>
        </div>

        <div class="reminder-item">
          <div class="reminder-icon info">📝</div>
          <div class="reminder-content">
            <div class="reminder-title">参加部门周会</div>
            <div class="reminder-time">今天 14:00 - 15:30</div>
          </div>
          <button class="quick-btn">查看</button>
        </div>

        <div class="reminder-item">
          <div class="reminder-icon success">🎂</div>
          <div class="reminder-content">
            <div class="reminder-title">员工李四生日</div>
            <div class="reminder-time">别忘了送上祝福</div>
          </div>
          <button class="quick-btn">祝福</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyReminders",
};
</script>

<style scoped>
.card {
  background: var(--bg-card);
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
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.header-icon {
  font-size: 16px;
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.badge {
  background: var(--danger-color);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: var(--font-xs);
  font-weight: 600;
}

.card-body {
  flex: 1;
  padding: var(--space-md);
  overflow-y: auto;
}

/* 提醒列表 */
.reminder-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.reminder-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--bg-hover);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.reminder-item:hover {
  background: var(--bg-card);
  border-color: var(--border-color);
  box-shadow: var(--shadow-sm);
}

.reminder-item.priority-high {
  background: #fffbeb;
  border-color: #fcd34d;
}

.dark-theme .reminder-item.priority-high {
  background: rgba(252, 211, 77, 0.15);
  border-color: rgba(252, 211, 77, 0.4);
  color: #fbbf24;
}

.dark-theme .reminder-item.priority-high .reminder-title {
  color: #fbbf24;
}

.reminder-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  background: var(--bg-card);
}

.reminder-content {
  flex: 1;
  min-width: 0;
}

.reminder-title {
  font-size: var(--font-base);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.reminder-time {
  font-size: var(--font-sm);
  color: var(--text-tertiary);
}

.quick-btn {
  padding: 6px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.quick-btn:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}
</style>
