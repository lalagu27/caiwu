<template>
  <div id="app">
    <main class="main-content">
      <div class="content-body">
        <dashboard-view />
      </div>
    </main>
  </div>
</template>

<script>
import DashboardView from "./components/Dashboard.vue";

export default {
  name: "App",
  components: {
    DashboardView,
  },
};
</script>

<style scoped>
#app {
  min-height: 100vh;
  width: 100vw;
  background-color: var(--bg-main);
  color: var(--text-primary);
}

.main-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 0;
  overflow-y: auto;
}

.content-body {
  flex: 1;
  padding: 8px 12px;
  width: 100%;
  /* Removed max-width */
  margin: 0; /* Consistent margin */
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
