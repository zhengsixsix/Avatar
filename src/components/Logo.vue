<template>
  <img
    :src="LogoSvg"
    alt="logo"
    style="width: 40px; height: 40px"
    :style="{ width: `${props.size}rem`, height: `${props.size}rem` }"
  />
</template>
    
<script setup lang='ts'>
import LogoSvg from "@/assets/vue.svg";
const props = withDefaults(defineProps<{ size?: number }>(), {
  size: 2.5,
});
</script>
    
<style>
</style>