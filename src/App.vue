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
  width: 100%;
  height: 100%;
  background-color: var(--bg-main);
  color: var(--text-primary);
  overflow: hidden;
}

.main-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.content-body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
