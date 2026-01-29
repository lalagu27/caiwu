<template>
  <div class="card widget-approvals">
    <div class="card-header">
      <div class="header-left">
        <div class="header-icon">⚡</div>
        <h3>待办审批</h3>
      </div>
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-btn', { active: currentTab === tab.id }]"
          @click="currentTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="approval-list">
        <div
          v-for="item in filteredApprovals"
          :key="item.id"
          class="approval-item"
        >
          <div
            class="approval-avatar"
            :style="{ backgroundColor: item.avatarColor }"
          >
            {{ item.applicant[0] }}
          </div>
          <div class="approval-info">
            <div class="approval-header">
              <span class="applicant">{{ item.applicant }}</span>
              <span class="type-badge">{{ item.type }}</span>
            </div>
            <div class="approval-summary">{{ item.summary }}</div>
            <div class="approval-time">{{ item.time }}</div>
          </div>
          <div class="approval-actions">
            <button class="btn-approve">✓</button>
            <button class="btn-reject">✗</button>
          </div>
        </div>
      </div>

      <div v-if="filteredApprovals.length === 0" class="empty-state">
        暂无待办事项
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PendingApprovals",
  data() {
    return {
      currentTab: "personnel",
      tabs: [
        { id: "personnel", name: "人事" },
        { id: "project", name: "项目" },
        { id: "policy", name: "制度" },
      ],
      approvals: [
        {
          id: 1,
          category: "personnel",
          applicant: "王小红",
          avatarColor: "#FCA5A5",
          type: "请假",
          summary: "年假 3天 (01-29 ~ 01-31)",
          time: "10分钟前",
        },
        {
          id: 2,
          category: "personnel",
          applicant: "张建国",
          avatarColor: "#93C5FD",
          type: "出差",
          summary: "前往北京参加行业峰会",
          time: "2小时前",
        },
        {
          id: 3,
          category: "project",
          applicant: "项目组A",
          avatarColor: "#86EFAC",
          type: "立项",
          summary: "Q1新产品研发项目立项书",
          time: "30分钟前",
        },
        {
          id: 4,
          category: "project",
          applicant: "李雷",
          avatarColor: "#FDBA74",
          type: "报销",
          summary: "1月差旅费用报销",
          time: "4小时前",
        },
        {
          id: 5,
          category: "policy",
          applicant: "行政部",
          avatarColor: "#D8B4FE",
          type: "发布",
          summary: "2026年春节放假通知",
          time: "1天前",
        },
      ],
    };
  },
  computed: {
    filteredApprovals() {
      return this.approvals.filter((item) => item.category === this.currentTab);
    },
  },
};
</script>

<style scoped>
.card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  overflow: hidden;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-header {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: nowrap; /* Prevent wrap */
}

.header-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.header-icon {
  font-size: 16px;
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.tabs {
  display: flex;
  background: var(--bg-hover);
  border-radius: var(--radius-md);
  padding: 2px;
  gap: 2px;
}

.tab-btn {
  padding: 4px 8px;
  border: none;
  background: transparent;
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-btn.active {
  background: var(--bg-card);
  color: var(--primary-color);
  box-shadow: var(--shadow-xs);
}

.card-body {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: 0; /* Remove padding */
}

/* 审批列表 */
.approval-list {
  display: flex;
  flex-direction: column;
}

.approval-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.approval-item:hover {
  background: var(--bg-hover);
}

.approval-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: var(--font-md);
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
}

.approval-info {
  flex: 1;
  min-width: 0;
}

.approval-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}

.applicant {
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--text-primary);
}

.type-badge {
  padding: 1px 6px;
  background: var(--primary-light);
  color: var(--primary-color);
  font-size: var(--font-xs);
  font-weight: 500;
  border-radius: var(--radius-sm);
}

.approval-summary {
  font-size: var(--font-sm);
  color: var(--text-secondary);
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.approval-time {
  font-size: var(--font-xs);
  color: var(--text-tertiary);
  display: none; /* Hide time to save space if needed, or keep smaller */
}

.approval-actions {
  display: flex;
  gap: 6px;
}

.btn-approve,
.btn-reject {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  border: none;
  font-size: var(--font-md);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-approve {
  background: var(--success-color);
  color: white;
}

.btn-approve:hover {
  background: #059669;
  transform: scale(1.1);
}

.btn-reject {
  background: var(--bg-hover);
  color: var(--text-tertiary);
  border: 1px solid var(--border-color);
}

.btn-reject:hover {
  background: var(--danger-color);
  color: white;
  border-color: var(--danger-color);
  transform: scale(1.1);
}

.empty-state {
  padding: var(--space-xl);
  text-align: center;
  color: var(--text-tertiary);
  font-size: var(--font-base);
}
</style>
