<template>
  <main class="main">
    <Container>
      <div class="content-warpper">
        <div class="content-view">
          <Header />
          <div class="playground">
            <div class="avatar-wrapper">
              <VueColorAvatar
                ref="colorAvatarRef"
                :option="avatarOption"
                :size="280"
              />
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
  
<script setup lang='ts'>
import Container from "@/layouts/Container.vue";
import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";
import Sider from "@/layouts/Sider.vue";
import Configurator from "@/components/Configurator.vue";
import VueColorAvatar from "@/components/VueColorAvatar.vue";
import { useAvatarOption } from "./hooks";
import { TRIGGER_PROBABILITY } from "./utils/constant";
import { getSpecialAvatarOption, showConfetti } from "./utils";
import { getRandomAvatarOption } from "./utils/index";
const [avatarOption, setAvatarOption] = useAvatarOption();
const handleGenerate = () => {
  if (Math.random() <= TRIGGER_PROBABILITY) {
    let colorfulOption = getSpecialAvatarOption();
    while (
      JSON.stringify(colorfulOption) === JSON.stringify(avatarOption.value)
    ) {
      colorfulOption = getSpecialAvatarOption();
    }
    colorfulOption.wrapperShape = avatarOption.value.wrapperShape;
    setAvatarOption(colorfulOption);
    showConfetti();
  } else {
    const randomOption = getRandomAvatarOption(avatarOption.value);
    setAvatarOption(randomOption);
  }
};
</script>
  
<style lang="scss" scoped>
@use "src/styles/var";
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: var.$color-text;
  background-color: var.$color-page-bg;
}
</style>
