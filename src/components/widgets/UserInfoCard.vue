<template>
  <el-card
    class="user-info-card"
    :body-style="{
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: '12px',
    }"
  >
    <div class="avatar-container">
      <div class="avatar">
        <i
          class="el-icon-user-solid"
          style="font-size: 40px; color: #7986cb"
        ></i>
      </div>
      <div class="online-indicator"></div>
    </div>
    <div class="welcome-message">
      <span class="welcome-icon">{{ greetingIcon }}</span>
      <span class="welcome-text">{{ greetingText }}</span>
    </div>
    <div class="user-details">
      <div class="user-name">{{ name }}</div>
      <div class="user-position">{{ position }}</div>
    </div>

    <!-- 统计信息 -->
    <div class="user-stats">
      <div class="stat-item">
        <div class="stat-value">{{ stats.reminders }}</div>
        <div class="stat-label">今日提醒</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ stats.approvals }}</div>
        <div class="stat-label">待办审批</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ stats.schedules }}</div>
        <div class="stat-label">本周计划</div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UserInfoCard",
  props: {
    name: {
      type: String,
      default: "张明",
    },
    position: {
      type: String,
      default: "产品经理",
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      stats: {
        reminders: 3, // 今日提醒数量
        approvals: 28, // 待办审批总数 (5+3+2+8+4+6)
        schedules: 3, // 本周计划数量
      },
    };
  },
  computed: {
    avatarUrl() {
      if (this.avatar) {
        return this.avatar;
      }
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        this.name
      )}&background=random&color=fff&size=128&rounded=true&bold=true`;
    },
    greetingText() {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        return "早上好";
      } else if (hour >= 12 && hour < 18) {
        return "下午好";
      } else if (hour >= 18 && hour < 22) {
        return "晚上好";
      } else {
        return "夜深了，注意休息";
      }
    },
    greetingIcon() {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        return "🌅";
      } else if (hour >= 12 && hour < 18) {
        return "☀️";
      } else if (hour >= 18 && hour < 22) {
        return "🌙";
      } else {
        return "🌃";
      }
    },
  },
  methods: {
    handleImageError(e) {
      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        this.name
      )}&background=random&color=fff&size=128&rounded=true&bold=true`;
    },
  },
};
</script>

<style scoped>
.user-info-card {
  background: linear-gradient(to bottom, #e3f2fd, #f5f9ff);
  border-top: 3px solid #2196f3;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #ebeef5;
  /* border-left removed for cleaner look */
}

.user-info-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.avatar-container {
  position: relative;
  margin-bottom: 8px; /* Reduced from 12px */
}

.avatar {
  width: 70px; /* Reduced from 90px */
  height: 70px; /* Reduced from 90px */
  border-radius: 50%;
  padding: 4px;
  background: rgba(103, 58, 183, 0.1);
  box-shadow: 0 4px 12px rgba(103, 58, 183, 0.15);
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Ensure circle shape */
}

/* ... existing styles ... */

.user-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px; /* Reduced from 6px */
  text-align: center;
}

.user-name {
  font-size: 18px; /* Reduced from 22px */
  font-weight: 700;
  color: #303133;
  letter-spacing: 0.5px;
}

/* ... existing styles ... */

.user-stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 8px 8px 4px 8px; /* Reduced padding */
  margin-top: 4px; /* Reduced margin */
  border-top: 1px solid #f0f0f0;
  gap: 8px;
}

.stat-value {
  font-size: 16px; /* Reduced from 18px */
  font-weight: 700;
  color: #3b82f6;
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: #909399;
  white-space: nowrap;
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: #e4e7ed;
}
</style>
