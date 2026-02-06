<template>
  <el-card
    class="weekly-schedule-card chart-card"
    :body-style="{
      padding: '10px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <div slot="header" class="card-header">
      <div class="header-left">
        <div
          class="header-icon"
          @click="showCalendar = !showCalendar"
          title="切换视图"
        >
          📅
        </div>
        <div class="header-text">
          <div class="card-title">本周计划</div>
          <div class="schedule-count" v-if="!showCalendar">
            {{ schedules.length }}项安排
          </div>
          <div class="schedule-count" v-else>日历视图</div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-if="!showCalendar" class="schedule-list">
      <div
        v-for="(item, index) in schedules"
        :key="index"
        class="schedule-item"
        :class="item.type"
      >
        <div class="timeline-dot">
          {{ (item.time.match(/周([一二三四五六日])/) || [])[1] || "" }}
        </div>
        <div class="schedule-card-inner">
          <div class="schedule-icon">
            {{ item.type === "meeting" ? "👥" : "✈️" }}
          </div>
          <div class="schedule-info">
            <div class="schedule-title">{{ item.title }}</div>
            <div class="schedule-time">{{ item.time }}</div>
          </div>
          <el-button
            type="text"
            size="mini"
            class="detail-btn"
            @click.stop="viewDetail(item)"
            >详情</el-button
          >
        </div>
      </div>
    </div>

    <!-- Calendar View -->
    <div v-else class="calendar-wrapper">
      <el-calendar v-model="currentDate">
        <template slot="dateCell" slot-scope="{ data }">
          <el-tooltip
            v-if="hasSchedule(data.day)"
            class="item"
            effect="dark"
            :content="getScheduleContent(data.day)"
            placement="top"
          >
            <div class="custom-date-cell has-event">
              <span :class="{ 'is-today': data.isSelected }">{{
                data.day.split("-").slice(2).join("-")
              }}</span>
              <div class="schedule-dot"></div>
            </div>
          </el-tooltip>
          <div v-else class="custom-date-cell">
            <span :class="{ 'is-today': data.isSelected }">{{
              data.day.split("-").slice(2).join("-")
            }}</span>
          </div>
        </template>
      </el-calendar>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "WeeklyScheduleCard",
  data() {
    return {
      showCalendar: false,
      currentDate: new Date(),
      schedules: [
        {
          title: "有限海南分公司总办会",
          time: "周一 08:30",
          location: "办公楼1912会议室",
          type: "meeting",
          date: "2026-02-02",
        },
        {
          title: "广州出差",
          time: "周三-周四",
          type: "trip",
          date: "2026-01-28",
        },
        {
          title: "先进表彰大会",
          time: "周五 14:00",
          location: "303室",
          type: "meeting",
          date: "2026-02-06",
        },
      ],
    };
  },
  methods: {
    hasSchedule(day) {
      // Simple mock check: check if any schedule matches the date string YYYY-MM-DD
      // Ideally we compare full dates.
      // For demo, let's just mark the dates in specific range or user provided dates.
      // Since 'schedules' has text time like "周一", let's assume we map them to current week.
      // For simplicity in this demo, I added 'date' field to mock data above matching current week.
      return this.schedules.some((s) => s.date === day);
    },
    getScheduleContent(day) {
      const item = this.schedules.find((s) => s.date === day);
      return item ? `${item.time} ${item.title}` : "";
    },
    viewDetail(item) {
      this.$alert(
        `<strong>${item.title}</strong><br>时间：${item.time}${
          item.location ? "<br>地点：" + item.location : ""
        }<br>类型：${item.type === "meeting" ? "会议" : "差旅"}`,
        "日程详情",
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
.weekly-schedule-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-xs);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
}

.weekly-schedule-card ::v-deep .el-card__header {
  padding: 8px 12px;
  height: 48px; /* Fixed height for alignment */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: none; /* Revert to solid separator */
}

.weekly-schedule-card ::v-deep .el-card__body {
  flex: 1;
}

.weekly-schedule-card:hover {
  box-shadow: var(--shadow-sm);
  border-color: #d0d7e8;
  /* transform: translateY(-2px); Removed per user request */
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Split left and right */
  gap: 8px; /* Reduced gap */
  flex-shrink: 0;
  width: 100%; /* Ensure full width */
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px; /* Reduced gap */
  flex: 1; /* Take remaining space */
}

.header-icon {
  width: auto;
  height: auto;
  background: transparent;
  font-size: 18px;
  flex-shrink: 0;
  color: var(--primary-color);
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 4px;
}

.header-icon:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: scale(1.05);
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
}

.schedule-count {
  font-size: 12px; /* Reduced from 13px */
  color: #ffffff;
  margin-top: 0;
  font-weight: normal;
  opacity: 0.9;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 8px; /* Reduced to 8px */
  flex: 1;
  position: relative;
  padding-left: 45px;
  padding-top: 0;
  padding-bottom: 0;
  border: none;
  margin: 0;
  overflow-y: hidden;
}

/* ... existing timeline styles ... */

.schedule-card-inner {
  display: flex;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 8px;
  background: var(--bg-hover);
  transition: all 0.2s;
  align-items: center; /* Better vertical alignment */
  border: 1px solid var(--border-color);
  height: 100%; /* Fill wrapper */
  box-sizing: border-box;
}

/* Calendar Styles */
.calendar-wrapper {
  flex: 1;
  /* overflow: hidden; removed to allow scrolling */
  font-size: 12px;
  margin: -10px; /* Counteract padding to use full width */
  margin-top: 0;
  display: flex;
  flex-direction: column;
}

.calendar-wrapper ::v-deep .el-calendar__header {
  padding: 2px 10px;
  font-size: 12px;
  display: flex;
  justify-content: center;
}

.calendar-wrapper ::v-deep .el-calendar__header .el-calendar__title {
  font-size: 13px;
}

.calendar-wrapper ::v-deep .el-calendar__header .el-button {
  font-size: 12px;
  padding: 4px 8px;
  transform: scale(0.9);
}

.calendar-wrapper ::v-deep .el-calendar__body {
  padding: 0 5px 5px 5px;
}

.calendar-wrapper ::v-deep .el-calendar-table thead th {
  padding: 2px 0;
  font-size: 12px;
  color: #909399;
}

.calendar-wrapper ::v-deep .el-calendar-table .el-calendar-day {
  height: 28px; /* Even compacted height */
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.calendar-wrapper ::v-deep .el-calendar-table td.is-selected .text {
  background: #2b3674; /* Navy */
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-date-cell {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.schedule-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #f56c6c;
  position: absolute;
  bottom: 2px;
}

.is-today {
  color: #2b3674; /* Navy */
  font-weight: normal;
}

/* ... existing styles for list view ... */

/* 绘制时间轴底线 */
.schedule-list::before {
  content: "";
  position: absolute;
  left: 24px; /* Aligned with dot center (45px padding - 32px offset + 12px radius = 25px center for dot. Line at 24px + 1px center = 25px) */
  top: 12px;
  bottom: 0px;
  width: 2px;
  background: var(--border-color);
}

/* Dark mode timeline line enhancement */
.dark-theme .schedule-list::before {
  background: rgba(60, 100, 160, 0.4);
}

.schedule-item {
  position: relative;
  transition: all 0.2s;
  height: 41px; /* Increased from 38px to fill space */
  box-sizing: border-box;
}

.timeline-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ccc;
  border: 2px solid var(--bg-card);
  position: absolute;
  left: -32px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2; /* Ensure on top of line */
  box-shadow: 0 0 0 1px var(--border-color);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px; /* Reduced from 13px */
  font-weight: normal; /* Make text clearer */
}

/* Dark mode dot border to match card bg */
.dark-theme .timeline-dot {
  border-color: #082147;
  box-shadow: 0 0 0 1px #1e3a5f;
}

/* Soft color variants for different types */
.schedule-item.meeting .timeline-dot {
  background: #2b3674; /* Navy */
  box-shadow: 0 0 0 2px rgba(43, 54, 116, 0.1);
}

.dark-theme .schedule-item.meeting .timeline-dot {
  background: #1e90ff;
  box-shadow: 0 0 5px rgba(30, 144, 255, 0.4);
}

.schedule-item.trip .timeline-dot {
  background: #a3aed0; /* Grey for trip */
  box-shadow: 0 0 0 2px rgba(163, 174, 208, 0.2);
}

.dark-theme .schedule-item.trip .timeline-dot {
  background: #64748b;
  box-shadow: none;
}

.schedule-item:hover .timeline-dot {
  transform: translateY(-50%) scale(1.15);
}

.schedule-card-inner {
  display: flex;
  gap: 8px; /* Reduced gap from 12px */
  padding: 4px 8px; /* Reduced padding from 6px */
  border-radius: 8px;
  background: #fafbfc;
  transition: all 0.2s;
  align-items: center; /* Better vertical alignment */
  border: 1px solid #f0f2f5;
  height: 41px; /* Increased from 38px to fill space */
  box-sizing: border-box;
}

.schedule-item.meeting .schedule-card-inner {
  background: var(--bg-hover);
  border-color: var(--border-color);
}

.schedule-item.trip .schedule-card-inner {
  background: var(--bg-hover);
  border-color: var(--border-color);
}

.schedule-item:hover .schedul.week-day.active {
  background: #2b3674; /* Navy */
  color: #fff;
  box-shadow: 0 4px 10px rgba(43, 54, 116, 0.2);
}
.schedule-item:hover .schedule-card-inner {
  background: var(--bg-card);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transform: translateX(2px);
}

/* ... existing variants ... */

.schedule-icon {
  font-size: 16px; /* Reduced from 20px */
  flex-shrink: 0;
  padding-top: 0;
}

.schedule-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.schedule-title {
  font-size: 13px; /* Reduced from 15px */
  font-weight: normal;
  color: var(--text-primary);
}

.schedule-time {
  font-size: 12px; /* Reduced from 13px */
  color: var(--text-secondary);
}

.detail-btn {
  padding: 0 4px;
  font-size: 12px; /* Reduced from 14px */
  margin-left: auto; /* Push to right */
  color: #409eff; /* Element Blue */
}
</style>
