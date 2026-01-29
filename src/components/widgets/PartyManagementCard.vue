<template>
  <el-card
    class="party-management-card"
    :body-style="{ padding: '10px', height: 'calc(100% - 60px)' }"
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
  border-radius: var(--radius-md);
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
  border-bottom: 1px solid #dcdfe6; /* Revert to solid separator */
}

.party-management-card ::v-deep .el-card__body {
  flex: 1;
}

.party-management-card:hover {
  box-shadow: var(--shadow-sm);
  border-color: #d0d7e8;
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px; /* Reduced gap */
  width: 100%; /* Ensure full width */
}

.header-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #f4f7fe; /* Uniform Neutral */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #2b3674; /* Uniform Navy */
  box-shadow: none;
}

.header-text {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 14px; /* Reduced from 16px */
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
}

.card-subtitle {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 0;
  font-weight: 500;
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
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 42px; /* Reduced to 42px */
  box-sizing: border-box;
}
/* ... existing module-item::before styles ... */
/* ... existing module-item:hover styles ... */
/* ... existing animation ... */

.icon-wrapper {
  width: 32px; /* Reduced from 40px */
  height: 32px; /* Reduced from 40px */
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* Reduced from 20px */
  transition: all 0.3s ease;
}

/* Strict De-noising: Unified Icons */
.module-item .icon-wrapper {
  background: #f4f7fe; /* Light Grey/Blue */
  color: #2b3674; /* Navy Blue */
}

.module-item:hover .icon-wrapper {
  background: #2b3674;
  color: #fff;
  transform: scale(1.05); /* Subtle scale */
}

.module-item:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.module-name {
  font-size: 13px; /* 统一内容字体 */
  font-weight: 600;
  color: #4b5563;
  transition: color 0.3s;
}

.module-item:hover .module-name {
  color: #1f2937;
}
</style>
