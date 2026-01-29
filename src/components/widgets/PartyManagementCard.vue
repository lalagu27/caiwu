<template>
  <el-card
    class="party-management-card"
    :body-style="{ padding: '10px', height: 'calc(100% - 60px)' }"
  >
    <div slot="header" class="card-header">
      <div class="header-icon">★</div>
      <div class="header-text">
        <div class="card-title">党群管理</div>
        <div class="card-subtitle">Party Management</div>
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
  background: linear-gradient(to bottom, #e3f2fd, #f5f9ff);
  border-top: 3px solid #2196f3;
  border-radius: var(--radius-md);
  border: 1px solid #ebeef5;
  /* border-left removed */
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.party-management-card ::v-deep .el-card__header {
  padding: 8px 12px;
  border-bottom: 1px solid #f2f6fc;
}

.party-management-card ::v-deep .el-card__body {
  flex: 1;
}

.party-management-card:hover {
  box-shadow: var(--shadow-lg);
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
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* Reduced from 18px */
  color: #fff;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
}

.header-text {
  flex: 1;
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
  margin-top: 2px;
  font-weight: 500;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px; /* Reduced from 12px */
  height: 100%;
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
  height: 46px; /* Reduced to fit 3 rows snugly */
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

/* Individual Colors for Icons */
.module-0 .icon-wrapper {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #2563eb;
}
.module-1 .icon-wrapper {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  color: #16a34a;
}
.module-2 .icon-wrapper {
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  color: #ea580c;
}
.module-3 .icon-wrapper {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #dc2626;
}
.module-4 .icon-wrapper {
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  color: #9333ea;
}
.module-5 .icon-wrapper {
  background: linear-gradient(135deg, #ecfeff 0%, #cffafe 100%);
  color: #0891b2;
}

.module-item:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.module-name {
  font-size: 13px;
  font-weight: 600;
  color: #4b5563;
  transition: color 0.3s;
}

.module-item:hover .module-name {
  color: #1f2937;
}
</style>
