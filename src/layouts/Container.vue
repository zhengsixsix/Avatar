<template>
  <section class="container" :class="{ full: isCollapsed }">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { useSider } from "@/hooks";
import { SCREEN } from "@/utils/constant";
const { isCollapsed, openSider, closeSider } = useSider();
const handleWindowResize = () => {
  if (window.innerWidth <= SCREEN.lg) {
    closeSider();
  } else {
    openSider();
  }
};
</script>

<style lang="scss" scoped>
@use "src/styles/var";
.container {
  height: 100%;
  padding-right: var.$layout-sider-width;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  &.full {
    padding-right: 0;
  }
}
</style>
