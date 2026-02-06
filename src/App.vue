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
  height: 100vh;
  width: 100%;
  background-color: var(--bg-main);
  color: var(--text-primary);
  overflow: hidden;
}

.main-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 0;
  overflow: hidden;
}

.content-body {
  flex: 1;
  padding: 0;
  width: 100%;
  /* Removed max-width */
  margin: 0; /* Consistent margin */
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
