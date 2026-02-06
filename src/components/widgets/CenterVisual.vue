<template>
  <div class="center-visual-wrapper">
    <KPIProgressCards />
  </div>
</template>

<script>
import KPIProgressCards from "./KPIProgressCards.vue";

export default {
  name: "CenterVisual",
  components: {
    KPIProgressCards,
  },
};
</script>

<style scoped>
.center-visual-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
