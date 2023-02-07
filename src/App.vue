<template>
  <main class="main">
    <Container>
      <div class="content-warpper">
        <div class="content-view">
          <Header />
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
