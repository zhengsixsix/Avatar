<style src="./styles/bg.css" />
<Style scoped src="./styles/button.scss" />
<template>
  <main class="main">
    <Container>
      <div class="content-warpper">
        <div class="content-view">
          <input type="checkbox" id="day-night" /><label
            for="day-night"
          ></label>
          <div class="content">
            <div class="moon-sun"></div>
          </div>
          <Header />
          <div class="playground">
            <div class="avatar-wrapper">
              <VueColorAvatar
                ref="colorAvatarRef"
                :option="avatarOption"
                :size="280"
              />
              <ActionBar />
              <div class="action-group">
                <button class="bubbly-button" @click="animateButton">
                  随机生成
                </button>
                <button
                  class="bubbly-button"
<<<<<<< HEAD
                  @click="animateButton"
                  title="下载"
=======
                  @click="downLoadImg"
>>>>>>> c7858d77c28e6d5df639437d6be102ca97407497
                >
                  下载头像
                </button>
                <button class="bubbly-button" @click="animateButton">
                  批量生成
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </Container>
    <Sider>
      <Configurator />
    </Sider>
    <PositionWeather></PositionWeather>
  </main>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { ref } from "vue";
import Container from "@/layouts/Container.vue";
import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";
import Sider from "@/layouts/Sider.vue";
import Configurator from "@/components/Configurator.vue";
import ActionBar from "./components/ActionBar.vue";
import PositionWeather from "./components/PositionWeather.vue";
import { useAvatarOption } from "./hooks";
import { TRIGGER_PROBABILITY } from "./utils/constant";
import { getSpecialAvatarOption, showConfetti } from "./utils";
import { getRandomAvatarOption } from "./utils/index";
import { recordEvent } from "./utils/ga";
import VueColorAvatar, {
  type VueColorAvatarRef,
} from "./components/VueColorAvatar.vue";
const [avatarOption, setAvatarOption] = useAvatarOption();
const colorAvatarRef = ref<VueColorAvatarRef>();
=======
import Container from "@/layouts/Container.vue"
import Header from "@/layouts/Header.vue"
import Footer from "@/layouts/Footer.vue"
import Sider from "@/layouts/Sider.vue"
import Configurator from "@/components/Configurator.vue"
import VueColorAvatar from "@/components/VueColorAvatar.vue"
import ActionBar from "./components/ActionBar.vue"
import PositionWeather from "@/components/PositionWeather.vue"

import { useAvatarOption } from "./hooks"
import { TRIGGER_PROBABILITY } from "./utils/constant"
import { getSpecialAvatarOption, showConfetti } from "./utils"
import { getRandomAvatarOption } from "./utils/index"
import { ref, getCurrentInstance } from "vue"
const [avatarOption, setAvatarOption] = useAvatarOption()
>>>>>>> c7858d77c28e6d5df639437d6be102ca97407497
const handleGenerate = () => {
  let avatarOptionValue = avatarOption.value;
  if (Math.random() <= TRIGGER_PROBABILITY) {
    let colorfulOption = getSpecialAvatarOption();
    while (
      JSON.stringify(colorfulOption) === JSON.stringify(avatarOptionValue)
    ) {
      colorfulOption = getSpecialAvatarOption();
    }
    colorfulOption.wrapperShape = avatarOptionValue.wrapperShape;
    setAvatarOption(colorfulOption);
    showConfetti();
  } else {
    const randomOption = getRandomAvatarOption(avatarOptionValue);
    setAvatarOption(randomOption);
  }
};
const animateButton = (e) => {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");
  e.target.classList.add("animate");
  setTimeout(function () {
<<<<<<< HEAD
    e.target.classList.remove("animate");
  }, 700);
  if (e.target.title === "下载") {
    handleDownload();
  }
};
const downloading = ref<boolean>(false);
const handleDownload = async () => {
  try {
    downloading.value = true;
    const avatarEle = colorAvatarRef.value?.avatarRef;
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (avatarEle) {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(avatarEle, {
        backgroundColor: null,
      });
      const dataURL = canvas.toDataURL();
      const trigger = document.createElement("a");
      trigger.href = dataURL;
      trigger.download = `123.png`;
      trigger.click();
      recordEvent("click_download", {
        event_category: "click",
      });
    }
  } finally {
    downloading.value = false;
  }
};
=======
    e.target.classList.remove("animate")
  }, 700)
}
// 下载头像的函数
const downLoadImg = function () {
  // 先获取页面对象实例
  const pageInstance = getCurrentInstance()
  // 获取dom节点
  const tagDomObj = pageInstance?.refs.downLoadImg
  // 添加一个a标签，获取图片流
  const downloadA = document.createElement("a")
  // 这句话有问题，要获取到图片的src,但是目前没获取到
  // 网上说有一个专门下载svg标签的插件 SVG Crowbar，点击就可以下载
  // downloadA.setAttribute("href", URL.createObjectURL(tagDomObj.src))
  downloadA.setAttribute("download", new Date().valueOf() + ".png")
  downloadA.click()
}
>>>>>>> c7858d77c28e6d5df639437d6be102ca97407497
</script>

<style lang="scss" scoped>
@use "src/styles/var";

.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: var.$color-text;
  // background-color: var.$color-page-bg;
  .content-warpper {
    height: 100%;
    .content-view {
      width: 100%;
      height: 100%;
      .playground {
        margin-top: 50px;
      }
      .action-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 22rem;
      }
    }
  }
  .avatar-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
