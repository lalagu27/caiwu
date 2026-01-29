<template>
  <el-card
    class="today-reminders-card"
    :body-style="{
      padding: '10px',
      height: 'calc(100% - 60px)',
      overflowY: 'auto',
    }"
  >
    <div slot="header" class="card-header">
      <div class="header-icon">🔔</div>
      <div class="header-text">
        <div class="card-title">今日提醒</div>
        <div class="reminder-count">{{ reminders.length }}条待办</div>
      </div>
    </div>
    <div class="reminders-list">
      <div
        v-for="(reminder, index) in reminders.slice(0, 3)"
        :key="index"
        class="reminder-item"
      >
        <div class="reminder-dot" :class="reminder.type"></div>
        <div class="reminder-text">{{ reminder.text }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "TodayRemindersCard",
  data() {
    return {
      reminders: [
        { text: "上午10:00 部门周会", type: "urgent" },
        { text: "下午2:00 项目评审", type: "normal" },
        { text: "下午4:30 客户沟通", type: "normal" },
      ],
    };
  },
};
</script>

<style scoped>
.today-reminders-card {
  background: linear-gradient(to bottom, #e3f2fd, #f5f9ff);
  border-top: 3px solid #2196f3;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #ebeef5;
  /* border-left removed */
  height: 100%;
}

.today-reminders-card ::v-deep .el-card__header {
  padding: 8px 12px;
  height: 48px; /* Fixed height for alignment */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 2px dashed #dcdfe6; /* Dashed separator */
}

.today-reminders-card ::v-deep .el-card__body {
  flex: 1;
}

.today-reminders-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px; /* Reduced gap */
}

.header-icon {
  width: 30px; /* Reduced from 36px */
  height: 30px; /* Reduced from 36px */
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* Reduced font size */
  flex-shrink: 0;
  color: #3b82f6;
}

.header-text {
  flex: 1;
  color: #333;
}

.card-title {
  font-size: 14px; /* Reduced from 16px */
  font-weight: 700;
  color: #303133;
}

.reminder-count {
  font-size: 12px;
  color: #909399;
  margin-top: 2px;
}

.reminders-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.reminder-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #eff6ff; /* 浅蓝背景 */
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.reminder-item:hover {
  background: #fff;
  border-color: #bfdbfe; /* 蓝色边框 */
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}

.reminder-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.reminder-dot.urgent {
  background: #2563eb; /* 深蓝色 */
  box-shadow: 0 0 6px rgba(37, 99, 235, 0.4);
}

.reminder-dot.normal {
  background: #60a5fa; /* 中蓝色 */
}

.reminder-text {
  font-size: 13px;
  color: #606266;
  line-height: 1.4;
  font-weight: 500;
  flex: 1;
}
</style>
