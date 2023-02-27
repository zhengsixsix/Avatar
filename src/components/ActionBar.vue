<template>
  <div class="action-menu">
    <div
      class="menu-item"
      v-for="item of actions"
      :key="item.type"
      :title="item.tip"
      :class="{ disabled: item.disabled }"
    >
      <img :src="item.Icon" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconBack from "@/assets/icons/icon-back.svg";
import IconCode from "@/assets/icons/icon-code.svg";
import IconFlip from "@/assets/icons/icon-flip.svg";
import IconNext from "@/assets/icons/icon-next.svg";
import { ActionType } from "@/enums";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store/index";
const store = useStore();
const { t } = useI18n();

const emit = defineEmits<{ (e: "action", actionType: ActionType): void }>();
const canUndo = computed(() => store.history.past.length > 0);
const canRedo = computed(() => store.history.future.length > 0);
const actions = computed(() => [
  {
    type: ActionType.Undo,
    Icon: IconBack,
    tip: t("action.undo"),
    disabled: !canUndo.value,
  },
  {
    type: ActionType.Undo,
    Icon: IconNext,
    tip: t("action.redo"),
    disabled: !canRedo.value,
  },
  {
    type: ActionType.Undo,
    Icon: IconFlip,
    tip: t("action.flip"),
  },
  {
    type: ActionType.Undo,
    Icon: IconCode,
    tip: t("action.code"),
  },
]);
</script>

<style lang="scss" scoped>
@use "src/styles/var";
.action-menu {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: var.$color-gray;
  border-radius: 2rem;
  margin-top: 50px;
}
.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  transform: opacity 0.2s;
  &:hover img {
    transform: scale(1.2);
    transition: 0.2s;
  }
  &.disabled {
    cursor: default;
    opacity: 0.6;
  }
}
</style>
