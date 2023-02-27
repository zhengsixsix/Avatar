<template>
  <div
    class="vue-color-avatar"
    :style="{
      width: `${avatarSize}px`,
      height: `${avatarSize}px`,
      background: avatarOption.background.color,
    }"
    :class="getWrapperShapeClassName()"
  >
    <img
      :src="LogoSvg"
      alt=""
      class="hoverImage"
      :style="{
        width: `${avatarSize}px`,
        height: `${avatarSize}px`,
      }"
    />
    <div class="avatar-payload" v-html="svgContent"></div>
  </div>
</template>

<script lang="ts">
import LogoSvg from "@/assets/vue.svg";
import { AvatarOption } from "@/types";
import { getRandomAvatarOption } from "@/utils";
import { AVATAR_LAYER, NONE } from "@/utils/constant";
import { ref, toRefs, watchEffect } from "vue";
import { widgetData } from "@/utils/dynamic-data";

export interface VueColorAvatarRef {
  avatarRef: HTMLDivElement;
}
</script>
<script setup lang="ts">
import { WrapperShape } from "@/enums";
interface VueColorAvatarProps {
  option: AvatarOption;
  size?: number;
}
const props = withDefaults(defineProps<VueColorAvatarProps>(), {
  option: () => getRandomAvatarOption(),
  size: 280,
});
const { option: avatarOption, size: avatarSize } = toRefs(props);
const svgContent = ref("");
const getWrapperShapeClassName = () => {
  return {
    [WrapperShape.Circle]:
      avatarOption.value.wrapperShape === WrapperShape.Circle,
    [WrapperShape.Square]:
      avatarOption.value.wrapperShape === WrapperShape.Square,
    [WrapperShape.Squircle]:
      avatarOption.value.wrapperShape === WrapperShape.Squircle,
  };
};
watchEffect(async () => {
  const sortedList = Object.entries(avatarOption.value.widgets).sort(
    ([prevShape, prev], [nextShape, next]) => {
      const ix = prev.zIndex ?? AVATAR_LAYER[prevShape]?.zIndex ?? 0;
      const iix = next.zIndex ?? AVATAR_LAYER[nextShape]?.zIndex ?? 0;
      return ix - iix;
    }
  );
  const promises: Promise<string>[] = sortedList.map(
    async ([widgetType, opt]) => {
      if (opt.shape !== NONE && widgetData?.[widgetType]?.[opt.shape]) {
        return (await widgetData[widgetType][opt.shape]()).default;
      }
      return "";
    }
  );
  const svgRawList = await Promise.all(promises).then((raw) => {
    return raw.map((svgRaw, i) => {
      const widgetFillColor = sortedList[i][1].fillColor;
      const content = svgRaw
        .slice(svgRaw.indexOf(">", svgRaw.indexOf("<svg")) + 1)
        .replace("</svg>", "")
        .replaceAll("$fillColor", widgetFillColor || "transparent");
      return ` <g id="vue-color-avatar-${sortedList[i][0]}">
          ${content}
        </g>`;
    });
  });

  svgContent.value = `
    <svg
      width="${avatarSize.value}"
      height="${avatarSize.value}"
      viewBox="0 0 ${avatarSize.value / 0.7} ${avatarSize.value / 0.7}"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(100, 65)">
        ${svgRawList.join("")}
      </g>
    </svg>
  `;
});
</script>

<style lang="scss" scoped>
@use "src/styles/var";
.hoverImage {
  transition: all 0.5s;
  opacity: 0;
  position: absolute;
  left: 0px;
}
.vue-color-avatar:hover .hoverImage {
  opacity: 1;
  transform: translate3d(0%, -25%, 100px);
}
.vue-color-avatar {
  transition: all 0.5s;
  &:hover {
    transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
    box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  }

  &.circle {
    border-radius: 50%;
    background-color: var.$color-text;
    overflow: hidden;
  }
  &.squircle {
    border-radius: 25px;
    background-color: var.$color-text;
  }
  &.square {
    background-color: var.$color-text;
  }
  .avatar-payload {
    z-index: 999;
    transition: all 0.5s;
  }
}
</style>
