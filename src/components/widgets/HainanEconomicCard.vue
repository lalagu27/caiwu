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
      <h3>在琼经济贡献 <span class="year-label">[2026]</span></h3>
    </div>

    <div class="economic-content">
      <!-- 海南公司 -->
      <div class="section">
        <div class="section-title">海南公司</div>
        <div class="indicators-grid">
          <div
            class="indicator-item"
            v-for="(item, index) in hainanCompany"
            :key="index"
          >
            <div class="circle-wrapper">
              <img :src="item.image" alt="指标" />
              <div class="circle-content">
                <span class="value-number">{{ item.value }}</span>
              </div>
            </div>
            <div class="text-wrapper">
              <div
                class="indicator-name"
                :style="{ color: getItemColor(index) }"
              >
                {{ item.label }}
              </div>
              <div class="indicator-desc">{{ item.unit }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="section-divider"></div>

      <!-- 区域单位整体 -->
      <div class="section">
        <div class="section-title">区域单位整体</div>
        <div class="indicators-grid">
          <div
            class="indicator-item"
            v-for="(item, index) in regionalUnits"
            :key="index"
          >
            <div class="circle-wrapper">
              <img :src="item.image" alt="指标" />
              <div class="circle-content">
                <span class="value-number">{{ item.value }}</span>
              </div>
            </div>
            <div class="text-wrapper">
              <div
                class="indicator-name"
                :style="{ color: getItemColor(index) }"
              >
                {{ item.label }}
              </div>
              <div class="indicator-desc">{{ item.unit }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import zhibiao1 from "@/assets/zhibiao1.png";
import zhibiao2 from "@/assets/zhibiao2.png";
import zhibiao3 from "@/assets/zhibiao3.png";

export default {
  name: "HainanEconomicCard",
  data() {
    return {
      hainanCompany: [
        {
          label: "固投",
          value: "46",
          unit: "亿",
          desc: "固定资产投资",
          image: zhibiao1,
        },
        {
          label: "产值",
          value: "140",
          unit: "亿",
          desc: "工业总产值",
          image: zhibiao2,
        },
        {
          label: "纳税",
          value: "4.1",
          unit: "亿元",
          desc: "税收贡献",
          image: zhibiao3,
        },
      ],
      regionalUnits: [
        {
          label: "固投",
          value: "60",
          unit: "亿元",
          desc: "固定资产投资",
          image: zhibiao1,
        },
        {
          label: "产值",
          value: "1333",
          unit: "亿元",
          desc: "工业总产值",
          image: zhibiao2,
        },
        {
          label: "纳税",
          value: "53",
          unit: "亿元",
          desc: "税费总额",
          image: zhibiao3,
        },
      ],
    };
  },
  methods: {
    getItemColor(index) {
      const colors = ["#FFA500", "#52C41A", "#00F0FF"];
      return colors[index % colors.length];
    },
  },
};
</script>

<style scoped>
.chart-card {
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
  padding: 0;
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

.year-label {
  font-size: 12px;
  color: #8f9bba;
  margin-left: 8px;
  font-weight: normal;
}

.economic-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  gap: 8px;
  overflow: hidden;
}

.section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.section-title {
  font-size: 16px; /* 字体变大 */
  font-weight: bold;
  padding-left: 8px;
  border-left: 3px solid var(--primary-color);
  margin-bottom: 8px;
  line-height: 1.2;
  background: linear-gradient(90deg, #ffffff 0%, #00f0ff 100%); /* 渐变色 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block; /* 确保背景裁剪生效 */
  width: fit-content;
}

.indicators-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  align-items: center;
  min-height: 0;
}

.indicator-item {
  display: flex;
  align-items: center;
  gap: 0; /* 移除 gap，让图片和文字紧凑 */
  min-width: 0;
  padding: 0;
  position: relative;
}

.circle-wrapper {
  position: relative;
  width: 160px; /* 大幅放大图片宽度 */
  height: 110px; /* 增加高度 */
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 图片靠左 */
}

.circle-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* 图片本身包含右侧线条，所以需要调整定位 */
  transform: translateX(-10px);
}

.circle-content {
  position: absolute;
  top: 50%;
  left: 30px; /* 随图片放大，数字稍右移居中 */
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 2;
}

.value-number {
  font-size: 24px; /* 加大数字 */
  font-weight: bold;
  color: #fff;
  line-height: 1;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
  font-family: "DIN Alternate", sans-serif;
}

.value-unit {
  font-size: 10px;
  color: #fff;
  margin-top: -2px;
  opacity: 0.8;
}

.text-wrapper {
  position: absolute;
  left: 80px;
  top: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  z-index: 2;
}

.indicator-name {
  font-size: 14px;
  font-weight: 600;
  color: #00f0ff;
  line-height: 1.1;
  margin-bottom: 2px;
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.3);
}

.indicator-desc {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1;
  font-weight: normal;
}

.section-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 240, 255, 0.3) 50%,
    transparent 100%
  );
  margin: 4px 0;
  flex-shrink: 0;
}
</style>
