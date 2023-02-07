<template>
  <div class="scrollWrapper" style="position: relative; overflow: hidden">
    <slot />
  </div>
</template>
    
<script setup lang='ts'>
import PerfectScrollbar from "perfect-scrollbar";
import { onMounted, onUnmounted, ref } from "vue";
const props = defineProps<{ options?: PerfectScrollbar.Options }>();
const scrollWrapper = ref<HTMLDivElement>();
let ps: PerfectScrollbar;
onMounted(() => {
  if (!scrollWrapper.value) {
    return console.warn(`No valid 'PerfectScrollbar' container found`);
  }
  ps = new PerfectScrollbar(scrollWrapper.value, {
    minScrollbarLength: 20,
    maxScrollbarLength: 160,
    ...props.options,
  });
});
onUnmounted(() => {
  ps.destroy();
});
</script>
    
<style>
</style>