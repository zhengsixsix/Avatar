<template>
  <div class="setting-section">
    <div class="section-title">{{ props.title }}</div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title?: string }>();
</script>
<style lang="scss" scoped>
.section-title {
  display: flex;
}
</style>
