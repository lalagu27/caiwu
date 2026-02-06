<template>
  <el-card
    class="party-management-card chart-card"
    :body-style="{ padding: '10px' }"
  >
    <div slot="header" class="card-header">
      <div class="header-icon">★</div>
      <div class="header-text">
        <div class="card-title">党群管理</div>
      </div>
    </div>
    <div class="modules-grid">
      <div
        v-for="(module, index) in modules"
        :key="index"
        class="module-item"
        :class="'module-' + index"
      >
        <div class="icon-wrapper">
          <div class="module-icon">{{ module.icon }}</div>
        </div>
        <div class="module-name">{{ module.name }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "PartyManagementCard",
  data() {
    return {
      modules: [
        { name: "党组织管理", icon: "🏛️" },
        { name: "党员管理", icon: "👥" },
        { name: "党费管理", icon: "💰" },
        { name: "党群活动", icon: "🎯" },
        { name: "在线学习", icon: "📚" },
        { name: "考核评估", icon: "📊" },
      ],
    };
  },
};
</script>

<style scoped>
.party-management-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-xs);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;
}

.party-management-card ::v-deep .el-card__header {
  padding: 8px 12px;
  height: 48px; /* Fixed height for alignment */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: none; /* Revert to solid separator */
}

.party-management-card ::v-deep .el-card__body {
  flex: 1;
}

.party-management-card:hover {
  box-shadow: var(--shadow-sm);
  border-color: #d0d7e8;
  /* transform: translateY(-2px); Removed per user request */
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px; /* Reduced gap */
  width: 100%; /* Ensure full width */
}

.header-icon {
  width: auto;
  height: auto;
  background: transparent;
  font-size: 18px;
  color: var(--primary-color);
  margin-right: 4px;
}

.header-text {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 14px; /* Reduced from 16px */
  font-weight: normal;
  color: var(--primary-color);
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.3);
  line-height: 1.2;
}

.card-subtitle {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 0;
  font-weight: normal;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px; /* Reduced to 8px */
  align-content: start;
}

.module-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: var(--bg-hover);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: auto; /* Increased from 38px to fill space */
  min-height: 41px;
  box-sizing: border-box;
}

.dark-theme .module-item {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dark-theme .module-item:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
/* ... existing module-item::before styles ... */
/* ... existing module-item:hover styles ... */
/* ... existing animation ... */

.icon-wrapper {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* Reduced from 20px */
  transition: all 0.3s ease;
  margin-right: 4px;
}

/* Strict De-noising: Unified Icons */
.module-item .icon-wrapper {
  background: transparent;
  color: var(--primary-color); /* Navy Blue */
}

.module-item:hover .icon-wrapper {
  background: transparent;
  color: #fff;
  transform: scale(1.05); /* Subtle scale */
}

.module-item:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.module-name {
  font-size: 13px; /* Reduced from 15px */
  font-weight: normal;
  color: var(--text-primary);
  transition: color 0.3s;
}

.module-item:hover .module-name {
  color: var(--primary-color);
}
</style>
