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
    <div class="date-badge">
      <i class="el-icon-date"></i>
      <span>{{ currentDate }}</span>
    </div>
    <div
      class="theme-toggle"
      @click="toggleTheme"
      :title="isDark ? '切换亮色' : '切换暗色'"
    >
      <span class="toggle-icon">{{ isDark ? "🌙" : "☀️" }}</span>
    </div>
    <div class="avatar-container">
      <div class="avatar">
        <i
          class="el-icon-user-solid"
          style="font-size: 40px; color: var(--primary-color)"
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
      currentDate: "",
      isDark: false,
    };
  },
  created() {
    const today = new Date();
    this.currentDate = `${today.getFullYear()}/${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}`;

    // Initialize theme from local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      this.isDark = true;
      document.body.classList.add("dark-theme");
    } else {
      this.isDark = false;
      document.body.classList.remove("dark-theme");
    }
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
    toggleTheme() {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
      }
      window.dispatchEvent(new Event("theme-change"));
    },
  },
};
</script>

<style scoped>
.user-info-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.user-info-card:hover {
  box-shadow: var(--shadow-sm);
  border-color: #d0d7e8;
  transform: translateY(-2px);
}

.date-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  font-family: -apple-system, sans-serif;
  z-index: 10;
}

.theme-toggle {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  border: 1px solid var(--border-color);
}

.theme-toggle:hover {
  transform: scale(1.1);
  background: var(--primary-light);
  border-color: var(--primary-color);
}

.toggle-icon {
  font-size: 16px;
  line-height: 1;
}

.date-badge i {
  font-size: 14px;
}

.avatar-container {
  position: relative;
  margin-bottom: 8px; /* Reduced from 12px */
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: 0;
  background: var(--bg-hover); /* Light Tech Grey */
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color); /* Navy Blue/Cyan */
  font-size: 32px;
}

/* ... existing styles ... */

.welcome-message {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.welcome-text {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 600;
}

.welcome-icon {
  font-size: 16px;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px; /* Reduced from 6px */
  text-align: center;
}

.user-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.user-position {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
}

/* ... existing styles ... */

.user-stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 8px 8px 4px 8px; /* Reduced padding */
  margin-top: 4px; /* Reduced margin */
  border-top: 1px solid var(--border-color);
  gap: 8px;
}

.stat-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: var(--text-secondary);
  white-space: nowrap;
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: var(--border-color);
}
</style>
