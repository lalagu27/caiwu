<template>
  <el-card
    class="user-info-card chart-card"
    :body-style="{
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
    }"
  >
    <!-- Top Row: Avatar & Identity -->
    <div class="user-main-info">
      <div class="avatar-section">
        <div class="avatar">
          <i class="el-icon-user-solid"></i>
        </div>
        <div class="online-indicator"></div>
      </div>
      <div class="identity-section">
        <div class="name-row">
          <span class="user-name">{{ name }}</span>
          <div
            class="theme-toggle"
            @click="toggleTheme"
            :title="isDark ? '切换亮色' : '切换暗色'"
          >
            {{ isDark ? "🌙" : "☀️" }}
          </div>
        </div>
        <div class="user-position">{{ position }}</div>
        <div class="welcome-row">
          <span class="welcome-icon">{{ greetingIcon }}</span>
          <span class="welcome-text">{{ greetingText }}</span>
        </div>
      </div>
    </div>

    <!-- Middle Row: Date & Time as a sub-header -->
    <div class="meta-info">
      <div class="date-badge">
        <i class="el-icon-date"></i>
        <span>{{ currentDate }}</span>
      </div>
    </div>

    <!-- Bottom Row: Stats -->
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
      default: "XXX",
    },
    position: {
      type: String,
      default: "公司领导",
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
    // Initialize theme from local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    // Default to dark mode if no theme is saved, or if saved theme is 'dark'
    if (savedTheme === "light") {
      this.isDark = false;
      document.body.classList.remove("dark-theme");
    } else {
      this.isDark = true;
      document.body.classList.add("dark-theme");
      // Optionally save it if it wasn't valid
      if (!savedTheme) localStorage.setItem("theme", "dark");
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
/* User Info Card New Layout */
.user-info-card {
  height: 100%;
}

.user-main-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar-section {
  position: relative;
}

.avatar {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  background: rgba(30, 144, 255, 0.1);
  border: 1px solid rgba(30, 144, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #1e90ff;
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: #00ffa3;
  border-radius: 50%;
  border: 2px solid #082147;
  box-shadow: 0 0 5px #00ffa3;
}

.identity-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.name-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-name {
  font-size: 20px; /* Increased from 16px */
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.theme-toggle {
  cursor: pointer;
  font-size: 14px;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.theme-toggle:hover {
  opacity: 1;
}

.user-position {
  font-size: 14px; /* Increased from 12px */
  color: #b0c4de; /* Brighter grey-blue */
  font-weight: 500;
}

.welcome-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
}

.welcome-text {
  font-size: 14px; /* Increased from 11px */
  color: #ffffff; /* Brighter */
  font-weight: 500;
}

.meta-info {
  margin: 8px 0;
  padding: 4px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.date-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px; /* Increased from 11px */
  color: #b0c4de; /* Brighter */
  font-weight: 500;
}

.user-stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 22px; /* Increased from 16px */
  font-weight: 800;
  color: #00f0ff;
  text-shadow: 0 0 12px rgba(0, 240, 255, 0.6);
  margin-bottom: 2px;
}

.stat-label {
  font-size: 12px; /* Increased from 10px */
  color: #e0e6ed; /* Brighter white */
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
}
</style>
