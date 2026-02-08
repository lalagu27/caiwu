<template>
  <el-card
    class="drilling-dynamics-card chart-card"
    :body-style="{
      padding: '0px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <div slot="header" class="wrapper-header">
      <!-- 蓝色装饰条 -->
      <div class="blue-decoration"></div>

      <!-- Tab 区域 -->
      <div class="tabs-container">
        <div class="arrow-left">&lt;&lt;&lt;</div>
        <div class="tabs-list">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            class="tab-item"
            :class="{ active: currentTab === tab.value }"
            @click="currentTab = tab.value"
          >
            {{ tab.label }}
          </div>
        </div>
        <div class="arrow-right">&gt;&gt;&gt;</div>
      </div>

      <!-- 右侧信息 -->
      <div class="header-right">
        <span class="header-date">{{ currentDate }}</span>
        <i class="el-icon-full-screen fullscreen-icon"></i>
      </div>

      <!-- 底部发光线 -->
      <div class="bottom-glow-line"></div>
    </div>

    <div
      class="table-container"
      ref="tableContainer"
      @mouseenter="stopScroll"
      @mouseleave="startScroll"
    >
      <table class="custom-table">
        <thead>
          <tr>
            <th width="25%">活动井名称</th>
            <th width="15%">设计井深(m)</th>
            <th width="15%">当前井深(m)</th>
            <th width="15%">进度(%)</th>
            <th width="30%">24小时作业内容</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td class="well-name" :title="item.name">{{ item.name }}</td>
            <td :title="item.designDepth">{{ item.designDepth }}</td>
            <td :title="item.currentDepth">{{ item.currentDepth }}</td>
            <td :title="item.progress">{{ item.progress }}</td>
            <td class="activity-content" :title="item.activity">
              {{ item.activity }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "DrillingDynamicsCard",
  data() {
    return {
      currentTab: "exploration",
      tabs: [
        { label: "勘探", value: "exploration" },
        { label: "开发生产", value: "development" },
        { label: "工程", value: "engineering" },
      ],
      currentDate: "",
      tableData: [
        {
          name: "WC9-2-A1H",
          designDepth: 5943,
          currentDepth: 5784.71,
          progress: 97.34,
          activity: '下钻完，圆开8-3/8" 水平段钻进',
        },
        {
          name: "WC19-1-A6S1",
          designDepth: 3444.4,
          currentDepth: 3394,
          progress: 98.54,
          activity: '8-1/2 "井眼钻进作业',
        },
        {
          name: "LD10-1-13",
          designDepth: 4361,
          currentDepth: 4311.5,
          progress: 98.86,
          activity: "测试作业",
        },
        {
          name: "WZ11-4N-B24H",
          designDepth: 4165.64,
          currentDepth: 3514.34,
          progress: 84.36,
          activity: "侧钻跟进靶点",
        },
        {
          name: "WC10-3S-1d",
          designDepth: 4007,
          currentDepth: 3900,
          progress: 97.33,
          activity: "电缆测井",
        },
        {
          name: "BZ19-4-A2",
          designDepth: 3800,
          currentDepth: 1200,
          progress: 31.58,
          activity: "一开钻进",
        },
      ],
      scrollTimer: null,
      isScrolling: false,
    };
  },
  created() {
    const today = new Date();
    this.currentDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
  },
  mounted() {
    // Duplicate data to enable seamless scrolling
    // Ensure we have enough data to exceed container height significantly
    // Duplicate until we have at least 20 items, then double it for the loop buffer
    let baseData = [...this.tableData];
    while (baseData.length < 20) {
      baseData = [...baseData, ...this.tableData];
    }
    // Now double the base data for the seamless loop (first half -> second half)
    this.tableData = [...baseData, ...baseData];

    this.$nextTick(() => {
      this.startScroll();
    });
  },
  beforeDestroy() {
    this.stopScroll();
  },
  methods: {
    startScroll() {
      if (this.isScrolling) return;
      this.isScrolling = true;
      const container = this.$refs.tableContainer;

      // Clear any existing timer
      if (this.scrollTimer) clearInterval(this.scrollTimer);

      this.scrollTimer = setInterval(() => {
        if (!container) return;

        const rowHeight = 44; // Approximate row height
        const halfHeight = container.scrollHeight / 2;

        // Check if we need to reset position for seamless loop
        if (container.scrollTop >= halfHeight) {
          // Reset instantly to the equivalent position in the first set
          container.scrollTo({
            top: container.scrollTop - halfHeight,
            behavior: "auto",
          });
        }

        // Smooth scroll to next row
        container.scrollBy({
          top: rowHeight,
          behavior: "smooth",
        });
      }, 2000); // Scroll every 2 seconds
    },
    stopScroll() {
      this.isScrolling = false;
      if (this.scrollTimer) {
        clearInterval(this.scrollTimer);
        this.scrollTimer = null;
      }
    },
  },
};
</script>

<style scoped>
.drilling-dynamics-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-xs);
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.drilling-dynamics-card:hover {
  box-shadow: var(--shadow-sm);
  border-color: #d0d7e8;
  transform: translateY(-2px);
}

.drilling-dynamics-card ::v-deep .el-card__header {
  padding: 0 !important;
  height: 48px !important;
  min-height: 48px !important;
  max-height: 48px !important;
  border-bottom: none; /* Removed default border, using custom glow line */
  box-sizing: border-box;
  background-color: transparent;
  flex-shrink: 0 !important;
  position: relative;
}

.drilling-dynamics-card ::v-deep .el-card__body {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  min-height: 0 !important;
  overflow: hidden !important;
}

/* Wrapper Header */
.wrapper-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  position: relative;
  /* background: linear-gradient(90deg, rgba(0, 42, 102, 0.4) 0%, rgba(0,0,0,0) 100%); */
  background: transparent;
  padding: 0 12px;
  box-sizing: border-box;
}

/* Blue Decoration Bar */
.blue-decoration {
  width: 4px;
  height: 12px;
  background: #00f0ff;
  box-shadow: 0 0 12px #00f0ff;
  border-radius: 4px;
  transform: skewX(-15deg); /* Slanted style */
  margin-right: 12px;
  flex-shrink: 0;
}

/* Tabs Container */
.tabs-container {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.arrow-left,
.arrow-right {
  font-family: "Arial", sans-serif;
  color: #00f0ff;
  font-size: 12px;
  opacity: 0.6;
  letter-spacing: -2px;
  font-style: italic;
  font-weight: bold;
}

.tabs-list {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin: 0 8px;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}
.tabs-list::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.tab-item {
  font-size: 14px;
  color: #8f9bba; /* Muted color */
  cursor: pointer;
  font-style: italic; /* Italic style */
  transition: all 0.3s;
  font-weight: 500;
  position: relative;
  white-space: nowrap;
}

.tab-item:hover {
  color: #ccd6ea;
}

.tab-item.active {
  font-size: 18px; /* Larger active font */
  color: #ffffff;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
}

/* Header Right */
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  white-space: nowrap;
}

.header-date {
  font-size: 13px;
  color: #a0aec0;
  font-family: "DIN Alternate", sans-serif;
}

.fullscreen-icon {
  font-size: 16px;
  color: #00f0ff;
  cursor: pointer;
  border: 1px solid rgba(0, 240, 255, 0.3);
  padding: 4px;
  border-radius: 4px;
  background: rgba(0, 240, 255, 0.1);
  box-shadow: 0 0 5px rgba(0, 240, 255, 0.2) inset;
  transition: all 0.2s;
}

.fullscreen-icon:hover {
  background: rgba(0, 240, 255, 0.2);
  box-shadow: 0 0 8px rgba(0, 240, 255, 0.4) inset;
}

/* Bottom Glow Line */
.bottom-glow-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(0, 240, 255, 0) 0%,
    rgba(0, 240, 255, 0.8) 50%,
    rgba(0, 240, 255, 0) 100%
  );
  box-shadow: 0 -1px 3px rgba(0, 240, 255, 0.3);
}

.table-container {
  flex: 1;
  overflow-y: hidden; /* Hide scrollbar for auto-scroll visual */
  padding: 0;
}

/* Manual scroll support if user wants to drag (optional), mostly handled by overflow-y hidden to force auto scroll look, 
   but 'auto' is safer if JS fails. Let's stick to 'hidden' to force the clean look 
   and rely on JS. Or use 'auto' and hide scrollbar via CSS. */
.table-container:hover {
  overflow-y: overlay; /* Show scrollbar on hover if supported, or auto */
}
.table-container::-webkit-scrollbar {
  display: none; /* Hide scrollbar */
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  table-layout: fixed;
}

.custom-table th {
  position: sticky; /* Sticky header */
  top: 0;
  z-index: 10;
  background-color: rgba(0, 70, 120, 0.8); /* Lighter blue background */
  color: #cbd5e1; /* Lighter text color */
  font-weight: 600;
  padding: 8px 4px;
  text-align: center;
  white-space: normal; /* Allow wrap */
  line-height: 1.2;
  border-bottom: 1px solid rgba(0, 240, 255, 0.2);
  backdrop-filter: blur(4px);
}

.custom-table td {
  padding: 10px 8px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #e2e8f0; /* Light text for content */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-table tr:hover td {
  background-color: rgba(0, 240, 255, 0.1); /* Hover highlight */
}

.well-name {
  color: #00f0ff; /* Bright Cyan */
  font-weight: 600; /* Reduced from 700 */
}

.activity-content {
  text-align: left;
  padding-left: 12px;
  color: #cbd5e1;
}
</style>
