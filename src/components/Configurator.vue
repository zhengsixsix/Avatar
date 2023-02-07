<template>
  <PerfectScrollbar class="configurator-scroll">
    <div class="configurator">
      <SectionWrapper :title="t('label.wrapperShape')">
        <ul class="wrapper-shape">
          <li
            v-for="wrapperShape in SETTINGS.wrapperShape"
            :key="wrapperShape"
            class="wrapper-shape__item"
          >
            <div class="shape" :class="[wrapperShape]"></div>
          </li>
        </ul>
      </SectionWrapper>
      <SectionWrapper :title="t('label.backgroundColor')">
        <ul class="color-list">
          <li
            v-for="bgColor in SETTINGS.backgroundColor"
            :key="bgColor"
            class="color-list__item"
          >
            <div
              class="bg-color"
              :style="{ background: bgColor }"
              :class="[bgColor]"
            ></div>
          </li>
        </ul>
      </SectionWrapper>
      <SectionWrapper :title="t('label.wrapperShape')">
        <ul class="wrapper-shape">
          <li
            v-for="wrapperShape in SETTINGS.wrapperShape"
            :key="wrapperShape"
            class="wrapper-shape__item"
          >
            <div class="shape" :class="[wrapperShape]"></div>
          </li>
        </ul>
      </SectionWrapper>
    </div>
  </PerfectScrollbar>
</template>
    
<script setup lang='ts'>
import { useI18n } from "vue-i18n";
import PerfectScrollbar from "./PerfectScrollbar.vue";
import SectionWrapper from "./SectionWrapper.vue";
import { SETTINGS } from "../utils/constant";
import { onMounted, reactive, ref } from "vue";
import { WidgetShape, WidgetType } from "../enums/index";
const { t } = useI18n();
const sectionList = reactive(Object.values(WidgetType));
const sections = ref<
  {
    WidgetShape: WidgetShape;
    widgetList: {
      WidgetType: WidgetType;
      WidgetShape: WidgetShape;
      svgRaw: string;
    }[];
  }[]
>([]);
onMounted(() => {});
</script>
    
<style lang="scss" scoped>
@use "src/styles/var";
.configurator-scroll {
  width: var.$layout-sider-width;
  height: 100%;
  @media screen and (max-width: var.$screen-lg) {
    background-color: var.$color-configurator;
  }
}
.configurator {
  width: 100%;
  color: var.$color-text;

  .wrapper-shape {
    display: flex;
    align-items: center;

    .wrapper-shape__item {
      padding: 0.4rem 0.5rem;
      cursor: pointer;

      .shape {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background-color: var.$color-text;
        transition: background-color 0.2s;

        &.circle {
          border-radius: 50%;
        }

        &.squircle {
          border-radius: 20%;
        }

        &.active {
          background-color: var.$color-accent;
        }
      }
    }
  }
  .color-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .color-list__item {
      position: relative;
      z-index: 1;
      width: calc(100% / 7);
      padding: 0.6rem 0;
      cursor: pointer;
      transition: transform 0.2s;

      .bg-color {
        position: relative;
        box-sizing: content-box;
        width: 1.3em;
        height: 1.3em;
        margin: 0 auto;
        font-size: 16px;
        border-radius: 50%;
        box-shadow: 0 0 0.05em 0.2em var.$color-configurator;

        &.transparent {
          background: #fff !important;

          &::after {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            color: #ff4757;
            font-weight: bold;
            font-size: 1.8rem;
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
            content: "\\";
          }
        }

        &::before {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: -1;
          width: 100%;
          height: 100%;
          background: inherit;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.5;
          transition: width 0.15s, height 0.15s;
          content: "";
        }

        &::after {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          color: var.$color-configurator;
          font-size: 1.5rem;
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 0;
          transition: opacity 0.15s;
          content: "\2714";
        }

        &.active::before {
          width: 160%;
          height: 160%;
        }

        &.active::after {
          opacity: 1;
        }
      }
    }
  }
}
</style>