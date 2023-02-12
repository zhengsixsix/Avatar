<template>
  <div
    class="vue-color-avatar"
    :style="{ width: `${avatarSize}px`, height: `${avatarSize}px` }"
  >
    <div class="avatar-payload" v-html="svgContent"></div>
  </div>
</template>
    
<script lang='ts'>
import { AvatarOption } from "@/types";
import { getRandomAvatarOption } from "@/utils";
import { AVATAR_LAYER, NONE } from "@/utils/constant";
import { ref, toRefs, watchEffect } from "vue";
import { widgetData } from '@/utils/dynamic-data'

export interface VueColorAvatarRef {
  avatarRef: HTMLDivElement;
}
</script>
<script setup lang="ts">
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
    
<style>
</style>