<template>
  <aside class="sider" :class="{ collapsed: isCollapsed }">
    <slot />
    <div class="trigger" @click="clickCollapsed">
      <img :src="IconRight" class="icon-right" alt="arrow" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import IconRight from "@/assets/icons/icon-right.svg";
import { useSider } from "@/hooks";
const { isCollapsed, openSider, closeSider } = useSider();

const clickCollapsed = () => {
  if (isCollapsed.value) {
    openSider();
  } else {
    closeSider();
  }
};
</script>

<style lang="scss" scoped>
@use "src/styles/var";
.sider {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 200;
  height: 100%;
  background-color: var.$color-dark;
  &.collapsed {
    transform: translateX(100%);

    .icon-right {
      transform: rotateY(-180deg);
    }
  }
  .trigger {
    width: 1.2rem;
    height: 4rem;
    position: absolute;
    top: 50%;
    left: 1px;
    display: flex;
    background-color: var.$color-configurator;
    transform: translate(-100%, -50%);
    cursor: pointer;
    transition: width 0.2s, background-color 0.2s;
    &:hover {
      width: 1.5rem;
      background: lighten(var.$color-configurator, 5);
    }
  }
}
</style>
