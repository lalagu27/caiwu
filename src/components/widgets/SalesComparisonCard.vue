<template>
  <el-card
    class="kpi-card"
    :body-style="{
      padding: '0px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }"
  >
    <div slot="header" class="card-header">
      <h3>
        <div class="header-icon"></div>
        国资委"一利五率"
        <span
          style="
            font-size: 12px;
            color: var(--text-secondary);
            margin-left: 8px;
            font-weight: normal;
          "
          >[2026]</span
        >
      </h3>
    </div>

    <div class="kpi-container">
      <div class="kpi-item" v-for="(item, index) in kpiData" :key="index">
        <div class="image-wrapper">
          <img :src="item.img" alt="kpi-ring" />
          <div class="kpi-content-overlay">
            <div
              class="kpi-value"
              :style="{ textShadow: '0 0 10px ' + item.shadowColor }"
            >
              {{ item.val }}
            </div>
            <div class="kpi-unit">{{ item.unit }}</div>
          </div>
        </div>
        <div class="kpi-label">{{ item.label }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
import imgC1 from "@/assets/c1.png";
import imgC2 from "@/assets/c2.png";
import imgC3 from "@/assets/c3.png";

export default {
  name: "SASACKPICard",
  data() {
    return {
      kpiData: [
        {
          label: "全员劳动生产率",
          val: 1194,
          unit: "万元/人年",
          img: imgC1,
          shadowColor: "#00F0FF", // Cyan Blue
        },
        {
          label: "研发投入强度",
          val: 3.94,
          unit: "%",
          img: imgC2,
          shadowColor: "#35E56B", // Bright Green
        },
        {
          label: "营业收现率",
          val: 100,
          unit: "%",
          img: imgC3,
          shadowColor: "#FFD700", // Gold
        },
      ],
    };
  },
};
</script>

<style scoped>
.kpi-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.kpi-card ::v-deep .el-card__header {
  padding: 0 12px;
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-color);
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.3);
  display: flex;
  align-items: center;
}

.header-icon {
  display: none;
}

.kpi-container {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  gap: 10px;
}

.kpi-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 8px;
}

.image-wrapper img {
  width: 70%; /* 缩小图片 */
  height: auto;
  object-fit: contain;
}

.kpi-content-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 4px; /* 微调垂直居中 */
}

.kpi-value {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  line-height: 1.2;
}

.kpi-unit {
  font-size: 12px;
  color: #fff;
  line-height: 1;
  margin-top: 2px;
}

.kpi-label {
  font-size: 16px;
  color: #fff;
  margin-top: 4px;
  text-align: center;
}
</style>
