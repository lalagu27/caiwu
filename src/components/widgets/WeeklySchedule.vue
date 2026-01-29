<template>
  <div class="card widget-schedule">
    <div class="card-header">
      <div class="header-icon">📅</div>
      <h3>本周安排</h3>
    </div>
    <div class="card-body">
      <div class="timeline">
        <!-- 周一 -->
        <div class="timeline-item">
          <div class="date-indicator">
            <span class="day-name">周一</span>
            <span class="day-num">28</span>
          </div>
          <div class="events">
            <div class="event meeting">
              <span class="event-dot"></span>
              <span class="event-time">10:00</span>
              <span class="event-title">部门周例会</span>
            </div>
          </div>
        </div>

        <!-- 周二 (今天) -->
        <div class="timeline-item current">
          <div class="date-indicator">
            <span class="day-name">周二</span>
            <span class="day-num">29</span>
            <span class="today-badge">今天</span>
          </div>
          <div class="events">
            <div class="event travel">
              <span class="event-dot"></span>
              <span class="event-time">全天</span>
              <span class="event-title">✈️ 出差：上海分公司调研</span>
            </div>
          </div>
        </div>

        <!-- 周三 -->
        <div class="timeline-item">
          <div class="date-indicator">
            <span class="day-name">周三</span>
            <span class="day-num">30</span>
          </div>
          <div class="events">
            <div class="event meeting">
              <span class="event-dot"></span>
              <span class="event-time">14:00</span>
              <span class="event-title">产品评审会</span>
            </div>
            <div class="event meeting">
              <span class="event-dot"></span>
              <span class="event-time">16:30</span>
              <span class="event-title">HR面试</span>
            </div>
          </div>
        </div>

        <!-- 周四 -->
        <div class="timeline-item">
          <div class="date-indicator">
            <span class="day-name">周四</span>
            <span class="day-num">31</span>
          </div>
          <div class="events">
            <div class="empty-slot">无安排</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeeklySchedule",
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
  gap: 8px;
}

.header-icon {
  font-size: 16px;
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.card-body {
  flex: 1;
  padding: 8px;
  overflow-y: auto;
  min-height: 0;
}

/* 时间线 */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-item {
  display: flex;
  gap: 8px;
  position: relative;
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: 24px;
  top: 36px;
  bottom: -12px;
  width: 2px;
  background: var(--border-color);
}

.timeline-item:last-child::before {
  display: none;
}

.timeline-item.current::before {
  background: var(--primary-color);
}

.date-indicator {
  width: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  flex-shrink: 0;
  padding: 4px;
  border-radius: var(--radius-md);
  background: var(--bg-hover);
  position: relative;
  z-index: 1;
}

.timeline-item.current .date-indicator {
  background: var(--primary-color);
  color: white;
}

.day-name {
  font-size: var(--font-xs);
  font-weight: 500;
  color: var(--text-tertiary);
}

.timeline-item.current .day-name {
  color: rgba(255, 255, 255, 0.8);
}

.day-num {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.timeline-item.current .day-num {
  color: white;
}

.today-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--accent-color);
  color: white;
  font-size: var(--font-xs);
  font-weight: 600;
  padding: 1px 4px;
  border-radius: 6px;
}

.events {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 2px;
}

.event {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: var(--bg-hover);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.event:hover {
  background: var(--bg-card);
  border-color: var(--border-color);
  transform: translateX(2px);
}

.event.meeting {
  background: #f0fdfa;
  border-color: #99f6e4;
}

.event.travel {
  background: #fff7ed;
  border-color: #fdba74;
}

.event-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--primary-color);
  flex-shrink: 0;
}

.event.meeting .event-dot {
  background: #0d9488;
}

.event.travel .event-dot {
  background: #ea580c;
}

.event-time {
  font-size: var(--font-xs);
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 32px;
}

.event-title {
  font-size: var(--font-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.empty-slot {
  padding: 4px;
  font-size: var(--font-sm);
  color: var(--text-tertiary);
  font-style: italic;
}
</style>
