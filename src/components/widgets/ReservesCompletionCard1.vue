<template>
  <el-card
    class="chart-card"
    :body-style="{
      padding: '0px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <div slot="header" class="chart-header">
      <h3>人才队伍</h3>
    </div>
    <div class="image-gallery">
      <div class="image-item" v-for="(item, index) in items" :key="index">
        <div class="image-wrapper">
          <img src="@/assets/dizuo2.png" alt="指标数" />
          <span class="image-number">
            {{ item.value
            }}<span v-if="item.unit" class="image-unit">{{ item.unit }}</span>
          </span>
        </div>
        <span class="image-label">{{ item.label }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "ReservesCompletionCard",
  data() {
    return {
      currentDate: "",
      items: [
        { value: "1413", unit: "人", label: "在岗员工" },
        { value: "36.6", unit: "岁", label: "平均年龄" },
        { value: "96.6", unit: "%", label: "本科及以上" },
        { value: "64.3", unit: "%", label: "党员占比" },
        { value: "9", unit: "人", label: "集团人才" },
        { value: "25", unit: "人", label: "所属单位人才" },
        { value: "301", unit: "人", label: "高级职称" },
      ],
    };
  },
  created() {
    const today = new Date();
    this.currentDate = `${today.getFullYear()}`;
  },
};
</script>

<style scoped>
.chart-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-xs);
  flex: 1;
  /* ... existing styles ... */
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* ... existing styles ... */

.chart-card:hover {
  box-shadow: var(--shadow-sm);
  border-color: #d0d7e8;
}
.chart-card ::v-deep .el-card__header {
  padding: 8px 12px !important;
  height: auto !important;
  min-height: 38px !important;
  display: flex;
  align-items: center;
  border-bottom: none;
  margin: 0 !important;
}

.chart-card ::v-deep .el-card__body {
  padding: 0 !important;
  margin: 0 !important;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0; /* 移除 padding，el-card__header 已经有了 */
  border-bottom: none;
  width: 100%;
  margin: 0;
}

.chart-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-color);
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.3);
  display: flex;
  align-items: center;
}

.chart-header h3::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 14px;
  background: var(--primary-color);
  box-shadow: 0 0 8px var(--primary-color);
  margin-right: 8px;
  border-radius: 2px;
}

.image-gallery {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center; /* 改为居中对齐 */
  padding: 15px 10px; /* 增加上下内边距 */
  gap: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

.image-gallery {
  justify-content: center;
}

.image-item {
  width: calc((100% - 30px) / 4);
  height: auto; /* Changed from 45% to auto to remove vertical gap */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.image-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}

.image-wrapper img {
  width: 60%; /* 进一步缩小图片 */
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.2));
  transition: transform 0.3s ease;
}

.image-wrapper:hover img {
  transform: scale(1.1);
  filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.4));
}

.image-number {
  position: absolute;
  top: -20%; /* Moved higher again per user request */
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px; /* 缩小数字字号 */
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff;
  pointer-events: none;
  z-index: 10;
  white-space: nowrap; /* Prevent wrapping for longer text */
}

.image-unit {
  font-size: 0.5em; /* Half size of the number */
  margin-left: 2px;
}

.image-label {
  font-size: 12px; /* 缩小标签字号 */
  color: #fff; /* Changed to white */
  text-align: center;
  white-space: normal; /* Allow wrapping */
  margin-top: -5px; /* Pull up slightly closer to image */
}
</style>
