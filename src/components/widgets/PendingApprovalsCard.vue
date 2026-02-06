<template>
  <el-card
    class="pending-approvals-card chart-card"
    :body-style="{ padding: '12px', display: 'flex', flexDirection: 'column' }"
  >
    <div slot="header" class="card-header">
      <div class="header-icon">✓</div>
      <div class="header-text">
        <div class="card-title">待办审批</div>
        <div class="card-subtitle">{{ totalCount }}条待办审批</div>
      </div>
      <div class="header-action">
        <!-- Optional: Action button like 'View All' -->
      </div>
    </div>
    <div class="approvals-list">
      <div
        v-for="(approval, index) in approvals"
        :key="index"
        class="approval-container"
      >
        <div
          class="approval-item"
          :class="['approval-' + index, { expanded: approval.expanded }]"
          @click="toggleExpand(index)"
        >
          <div class="icon-wrapper">
            <div class="approval-icon">📄</div>
          </div>
          <div class="approval-info">
            <div class="approval-name">{{ approval.name }}</div>
          </div>

          <div class="approval-badge">{{ approval.count }}</div>
          <div
            class="expand-icon"
            :class="{ 'is-expanded': approval.expanded }"
          >
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
        <transition name="el-zoom-in-top">
          <div v-show="approval.expanded" class="approval-details">
            <div
              class="detail-row"
              v-for="d in Math.min(approval.count, 3)"
              :key="d"
            >
              <span class="detail-dot"></span>
              <span class="detail-text"
                >单据编号：202601{{
                  (1000 + index * 100 + d).toString().slice(1)
                }}</span
              >
              <el-button type="text" size="mini" class="detail-action"
                >处理</el-button
              >
            </div>
            <div v-if="approval.count > 3" class="detail-more">查看更多...</div>
          </div>
        </transition>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "PendingApprovalsCard",
  data() {
    return {
      approvals: [
        { name: "人事审批", count: 5, expanded: false },
        { name: "开发项目实施审批", count: 3, expanded: false },
        { name: "制度审批", count: 2, expanded: false },
        { name: "资金审批", count: 8, expanded: false },
        { name: "科研项目管理审批", count: 4, expanded: false },
        { name: "勘探作业审批", count: 6, expanded: false },
        { name: "应急采购项目审批", count: 3, expanded: false },
      ],
    };
  },
  methods: {
    toggleExpand(index) {
      if (this.approvals[index].expanded) {
        this.approvals[index].expanded = false;
      } else {
        this.approvals.forEach((item) => (item.expanded = false));
        this.approvals[index].expanded = true;
      }
    },
  },
  computed: {
    totalCount() {
      return this.approvals.reduce((sum, item) => sum + item.count, 0);
    },
  },
};
</script>


<style scoped>
.pending-approvals-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xs);
}

.pending-approvals-card ::v-deep .el-card__header {
  padding: 8px 12px;
  height: 48px; /* Fixed height for alignment */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: none; /* Revert to solid separator */
}

.pending-approvals-card ::v-deep .el-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.pending-approvals-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px; /* Reduced gap */
  flex-shrink: 0;
  width: 100%; /* Ensure full width */
}

.header-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--primary-light); /* Uniform Neutral */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  font-weight: 700;
  color: var(--primary-color); /* Uniform Navy */
  box-shadow: 0 0 8px var(--primary-color);
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
  color: var(--primary-color);
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.3);
  line-height: 1.2;
}

.card-subtitle {
  font-size: 12px;
  color: var(--primary-color); /* Navy */
  margin-top: 0;
  font-weight: 600;
}

.approvals-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px; /* Reduced to 8px */
  flex: 1;
  overflow-y: auto;
  padding-right: 2px;
  margin-top: 0;
  align-content: start;
  padding-bottom: 4px;
}

.approval-container {
  display: flex;
  flex-direction: column;
}

.approval-item {
  background: var(--bg-hover);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  height: 42px; /* Reduced to 42px */
  box-sizing: border-box;
}

.approval-item:hover {
  background: var(--bg-card);
  border-color: #bfdbfe;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.approval-item.expanded {
  background: var(--bg-hover);
  border-color: #bfdbfe;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s ease;
}

/* Strict De-noising: Unified Icons */
.approval-item .icon-wrapper {
  background: var(--primary-light); /* Light Grey/Blue */
  color: var(--primary-color); /* Navy Blue */
}

.approval-item:hover .icon-wrapper {
  background: #2b3674;
  color: #ffffff;
  /* 移除缩放效果，保持稳定 */
}

.approval-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.approval-name {
  font-size: 13px; /* 统一内容字体 */
  color: var(--text-primary);
  font-weight: 600;
}

.approval-subtips {
  font-size: 11px;
  color: #9ca3af;
}

.approval-badge {
  background: var(--bg-hover);
  color: var(--text-secondary);
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
  border: 1px solid var(--border-color);
}

.approval-item:hover .approval-badge {
  background: #2b3674; /* Navy */
  color: #fff;
  border-color: #2b3674;
}

.expand-icon {
  font-size: 12px;
  color: #94a3b8;
  transition: transform 0.3s;
  margin-left: 4px;
}

.expand-icon.is-expanded {
  transform: rotate(180deg);
  color: #3b82f6;
}

.approval-details {
  background: var(--bg-card);
  border: 1px solid #bfdbfe;
  border-top: none;
  margin-top: -1px;
  padding: 12px 16px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-row {
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 6px 0;
  color: var(--text-secondary);
  border-bottom: 1px dashed var(--border-color);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #cbd5e1;
  margin-right: 10px;
}

.detail-row:hover .detail-dot {
  background: #3b82f6;
}

.detail-text {
  flex: 1;
}

.detail-action {
  color: #3b82f6;
  font-weight: 500;
}

.detail-more {
  font-size: 11px;
  color: #94a3b8;
  text-align: center;
  padding-top: 8px;
  cursor: pointer;
}
.detail-more:hover {
  color: #3b82f6;
}
</style>
