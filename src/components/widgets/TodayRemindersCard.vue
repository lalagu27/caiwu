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
        :class="reminder.type"
      >
        <div class="reminder-content">
          <div class="reminder-time-badge" v-if="reminder.time">
            {{ reminder.time }}
          </div>
          <div class="reminder-text">{{ reminder.event }}</div>
        </div>
        <div class="reminder-status-icon">
          <i
            :class="
              reminder.type === 'urgent'
                ? 'el-icon-warning'
                : 'el-icon-chat-dot-round'
            "
          ></i>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "TodayRemindersCard",
  data() {
    return {
      // Separating time and event for better styling control
      reminders: [
        {
          time: "10:00",
          event: "部门周会",
          type: "urgent",
          fullText: "上午10:00 部门周会",
        },
        {
          time: "14:00",
          event: "项目评审",
          type: "normal",
          fullText: "下午2:00 项目评审",
        },
        {
          time: "16:30",
          event: "客户沟通",
          type: "normal",
          fullText: "下午4:30 客户沟通",
        },
      ],
    };
  },
};
</script>

<style scoped>
.today-reminders-card {
  background: linear-gradient(to bottom, #e3f2fd, #f5f9ff);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #ebeef5;
  height: 100%;
}

.today-reminders-card:hover {
  box-shadow: var(--shadow-md);
}

.today-reminders-card ::v-deep .el-card__header {
  padding: 0 12px;
  height: 48px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;
  background: transparent;
}

.today-reminders-card ::v-deep .el-card__body {
  flex: 1;
  padding: 12px;
  background: transparent;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.header-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: linear-gradient(135deg, #409eff 0%, #79bbff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.3);
}

.header-text {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 14px;
  font-weight: 700;
  color: #303133;
}

.reminder-count {
  font-size: 12px;
  color: #409eff;
  margin-top: 0;
  font-weight: 600;
}

.reminders-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}

.reminder-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #f0f2f5;
  border-left-width: 4px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
  cursor: default;
}

.reminder-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.reminder-item.urgent {
  border-left-color: #ff7875; /* Red accent for urgent */
  background: linear-gradient(to right, #fff5f5, #fff);
}

.reminder-item.normal {
  border-left-color: #69c0ff; /* Blue accent for normal */
}

.reminder-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.reminder-time-badge {
  font-size: 12px;
  font-weight: 700;
  color: #555;
  background: #f0f2f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Roboto Mono", monospace;
}

.reminder-item.urgent .reminder-time-badge {
  color: #ff7875;
  background: rgba(255, 120, 117, 0.1);
}

.reminder-item.normal .reminder-time-badge {
  color: #409eff;
  background: rgba(64, 158, 255, 0.1);
}

.reminder-text {
  font-size: 13px;
  color: #303133;
  font-weight: 500;
}

.reminder-status-icon {
  color: #c0c4cc;
  font-size: 16px;
}

.reminder-item.urgent .reminder-status-icon {
  color: #ff7875;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
