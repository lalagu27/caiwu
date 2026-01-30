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
        <el-button
          type="text"
          size="mini"
          class="detail-btn"
          @click.stop="viewDetail(reminder)"
          >详情</el-button
        >
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
  methods: {
    viewDetail(reminder) {
      this.$alert(
        `<strong>${reminder.event}</strong><br>时间：${
          reminder.time
        }<br>状态：${reminder.type === "urgent" ? "紧急" : "普通"}`,
        "提醒详情",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "知道了",
        }
      );
    },
  },
};
</script>

<style scoped>
.today-reminders-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
}

.today-reminders-card:hover {
  box-shadow: var(--shadow-sm);
  border-color: #d0d7e8;
  transform: translateY(-2px);
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
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--primary-light); /* Uniform Neutral Background */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--primary-color); /* Uniform Navy Icon */
  box-shadow: none;
}

.header-text {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 14px; /* 统一标题字体 */
  font-weight: 700;
  color: var(--text-primary);
}

.reminder-count {
  font-size: 12px;
  color: var(--primary-color); /* Navy */
  margin-top: 0;
  font-weight: 600;
}

.reminders-list {
  display: flex;
  flex-direction: column;
  gap: 8px; /* Standardized to 8px */
  height: 100%;
}

.reminder-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid #f0f2f5;
  border-left-width: 4px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.01); /* Reduced shadow */
  cursor: default;
  height: 42px; /* Reduced to fit */
  box-sizing: border-box;
}

.reminder-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.reminder-item.urgent {
  border-left-color: #ff7875; /* Red accent for urgent */
  background: var(--bg-card); /* Removed gradient */
}

.reminder-item.normal {
  border-left-color: #2b3674; /* Navy for normal */
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
  color: #ee5d50; /* Red only for Urgent */
  background: rgba(238, 93, 80, 0.1);
}

.reminder-item.normal .reminder-time-badge {
  color: #8f9bba; /* Grey for normal */
  background: #f4f7fe;
}

.reminder-text {
  font-size: 13px; /* 统一内容字体 */
  color: var(--text-primary);
  font-weight: 600; /* 统一字重 */
}

.detail-btn {
  padding: 0 4px;
  font-size: 12px;
  margin-left: 8px;
  color: #409eff; /* Element Blue */
  flex-shrink: 0;
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
