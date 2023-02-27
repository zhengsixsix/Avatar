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
                <button class="bubbly-button" @click="animateButton">
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
  </main>
</template>

<script setup lang="ts">
import Container from "@/layouts/Container.vue";
import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";
import Sider from "@/layouts/Sider.vue";
import Configurator from "@/components/Configurator.vue";
import VueColorAvatar from "@/components/VueColorAvatar.vue";
import ActionBar from "./components/ActionBar.vue";
import { useAvatarOption } from "./hooks";
import { TRIGGER_PROBABILITY } from "./utils/constant";
import { getSpecialAvatarOption, showConfetti } from "./utils";
import { getRandomAvatarOption } from "./utils/index";
const [avatarOption, setAvatarOption] = useAvatarOption();
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
var animateButton = function (e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");
  e.target.classList.add("animate");
  setTimeout(function () {
    e.target.classList.remove("animate");
  }, 700);
};
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
