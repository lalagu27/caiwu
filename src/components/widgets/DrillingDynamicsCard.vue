<template>
  <el-card
    class="drilling-dynamics-card"
    :body-style="{
      padding: '0px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <div slot="header" class="chart-header">
      <h3>
        <span>钻井动态</span>
        <span class="header-date" style="margin-left: 8px">[2026/1/28]</span>
      </h3>
    </div>
    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th width="20%">活动井名称</th>
            <th width="15%">设计井深(m)</th>
            <th width="15%">当前井深(m)</th>
            <th width="10%">进度(%)</th>
            <th width="40%">24小时作业内容</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td class="well-name">{{ item.name }}</td>
            <td>{{ item.designDepth }}</td>
            <td>{{ item.currentDepth }}</td>
            <td>{{ item.progress }}</td>
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
    };
  },
};
</script>

<style scoped>
.drilling-dynamics-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
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
  padding: 0 12px !important;
  height: 48px !important;
  min-height: 48px !important;
  max-height: 48px !important;
  display: flex !important;
  align-items: center !important;
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;
  background-color: transparent;
  flex-shrink: 0 !important;
}

.drilling-dynamics-card ::v-deep .el-card__body {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  min-height: 0 !important;
  overflow: hidden !important;
}

/* Inner header container */
.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.chart-header h3 {
  display: flex;
  align-items: center;
  gap: 8px; /* Standard gap */
  margin: 0;
  font-size: 14px; /* Standard font */
  font-weight: 600;
  color: var(--text-primary);
}

.chart-header h3::before {
  content: "";
  display: inline-block;
  width: 4px; /* Standard marker */
  height: 14px; /* Standard marker height */
  background: #4a7bf7;
  border-radius: 2px;
}

.header-date {
  font-size: 12px; /* Standard date font */
  color: #999;
  font-weight: normal;
}

.table-container {
  flex: 1;
  overflow-y: auto; /* Keep scroll */
  padding: 0;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  table-layout: fixed;
}

.custom-table th {
  background-color: var(--bg-hover); /* Very light grey, almost white */
  color: var(--text-secondary); /* Slate Grey for headers */
  font-weight: 600;
  padding: 10px 8px; /* Slightly more padding */
  text-align: center;
  white-space: nowrap;
  border-bottom: 1px solid var(--border-color);
}

.custom-table td {
  padding: 10px 8px;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary); /* Dark grey for content */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-table tr:hover td {
  background-color: var(--bg-hover);
}

.well-name {
  color: var(--primary-color); /* Navy Blue */
  font-weight: 600; /* Reduced from 700 */
}

.activity-content {
  text-align: left;
  padding-left: 12px;
  color: var(--text-secondary);
}
</style>
