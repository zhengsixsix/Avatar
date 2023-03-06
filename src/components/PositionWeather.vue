<template>
  <div class="pos-wea-box">
    <img
      src="../assets/position/positionIcon.svg"
      class="position-img"
    />
    <div class="pos-pro">{{ userProvince }}</div>
    <div class="pos-city">{{ userCity }}</div>
    <div class="wea-info">{{ nowWeather }}</div>
    <div class="weather">
      <div v-if="weatherIcon == 'sunny'">
        <div class="sunny">
          <span class="sun"></span>
        </div>
      </div>
      <div v-if="weatherIcon == 'cloudy'">
        <div class="cloudy">
          <span class="cloud"></span>
          <span class="cloud"></span>
        </div>
      </div>
      <div v-if="weatherIcon == 'snowy'">
        <div class="snowy">
          <span class="snowman"></span>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <div v-if="weatherIcon == 'stormy'">
        <div class="stormy">
          <span class="cloud"></span>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getNowPosition, getWeather } from "../Http/position"

//记录当前所在城市的变量
const userIP = ref("")
const userProvince = ref("")
const userCity = ref("")
const userLng = ref(0)
const userLat = ref(0)
const nowWeather = ref("")
const weatherIcon = ref("sunny")
// 获取城市定位信息的请求
async function getPosition() {
  let posRes = await getNowPosition()
  if (posRes.message == "Success") {
    userIP.value = posRes.result.ip
    userProvince.value = posRes.result.ad_info.province
    userCity.value = posRes.result.ad_info.city
    userLng.value = posRes.result.location.lng
    userLat.value = posRes.result.location.lat
  } else {
    userProvince.value = "湖北省"
    userCity.value = "武汉市"
    userLng.value = 114
    userLat.value = 30
  }
  let weaRes = await getWeather(userLng.value, userLat.value)
  if (weaRes.code == "200") {
    nowWeather.value = weaRes.now.text
    switch (weaRes.now.text) {
      case "晴":
        weatherIcon.value = "sunny"
        break
      case "多云":
      case "少云":
      case "晴间多云":
      case "阴":
        weatherIcon.value = "cloudy"
        break
      case "阵雨":
      case "强阵雨":
      case "雷阵雨":
      case "强雷阵雨":
      case "雷阵雨伴有冰雹":
      case "小雨":
      case "中雨":
      case "大雨":
      case "极端阵雨":
      case "毛毛雨/细雨":
      case "暴雨":
      case "大暴雨":
      case "特大暴雨":
      case "冻雨":
      case "小到中雨":
      case "中到大雨":
      case "大到暴雨":
      case "暴雨到大暴雨":
      case "大暴雨到特大暴雨":
      case "暴雨":
      case "雨":
        weatherIcon.value = "stormy"
        break
      case "小雪":
      case "中雪":
      case "大雪":
      case "暴雪":
      case "雨夹雪":
      case "雨雪天气":
      case "阵雨夹雪":
      case "阵雪":
      case "小到中雪":
      case "中到大雪":
      case "大到暴雪":
      case "阵雪":
      case "雪":
        weatherIcon.value = "snowy"
        break
      default:
        weatherIcon.value = "sunny"
        break
    }
  } else {
    nowWeather.value = "小雪"
  }
}
onMounted(() => {
  getPosition()
})
</script>
<style lang="scss" scoped>
.pos-wea-box {
  position: absolute;
  bottom: 15px;
  left: 20px;
  height: 34px;
  padding: 7px 25px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 17px;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  .position-img {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
  .pos-pro {
    margin-right: 10px;
  }
  .pos-city {
    margin-right: 10px;
  }
  .wea-info {
    margin-right: 10px;
  }
  .weather {
    width: 20px;
    font-size: -webkit-calc(1em);
    font-size: calc(1em);
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
    display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: space-around;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -webkit-flex-flow: row wrap;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    font-family: "Work Sans", sans-serif;
    /* background: #212125; */
    color: #e6e8db;
    .sunny {
      /* -webkit-box-flex: 0;
  -webkit-flex: none;
      -ms-flex: none;
          flex: none; */
      -webkit-flex: 1; /* Chrome */
      -ms-flex: 1; /* IE 10 */
      flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
      -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
      -moz-box-flex: 1; /* OLD - Firefox 19- */
      display: block;
      position: relative;
      font-size: -webkit-calc(11em);
      font-size: calc(1em);
      width: 1em;
      height: 1em;
      //   margin: 0.3em;
      border-radius: 100%;
      -webkit-box-shadow: 0 0 0 0.05em currentColor inset,
        0 0 0.3em -0.03em #fd6f21;
      box-shadow: 0 0 0 0.05em currentColor inset, 0 0 0.3em -0.03em #fd6f21;
      background: -webkit-linear-gradient(top right, #fc5830 0%, #f98c24 65%);
      background: linear-gradient(to top right, #fc5830 0%, #f98c24 65%);
      .sun {
        position: absolute;
        top: 20%;
        left: 80%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 40%;
        height: 40%;
        border-radius: 100%;
        background: #ffeb3b;
        -webkit-box-shadow: 0 0 0 0.02em currentColor inset,
          0 0 0.3em -0.03em #fd6f21;
        box-shadow: 0 0 0 0.02em currentColor inset, 0 0 0.3em -0.03em #fd6f21;
        -webkit-transform-origin: 0.1em 0.1em;
        -ms-transform-origin: 0.1em 0.1em;
        transform-origin: 0.1em 0.1em;
      }
      .sun::after {
        content: "";
        position: absolute;
        top: 0.1em;
        left: 0;
        will-change: transform;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 0.1em;
        height: 0.1em;
        border-radius: 100%;
        background: rgba(255, 255, 255, 0.1);
        -webkit-box-shadow: 0 0 0.1em 0 rgba(255, 255, 255, 0.3) inset,
          -0.1em -0.1em 0 0.2em rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 0.1em 0 rgba(255, 255, 255, 0.3) inset,
          -0.1em -0.1em 0 0.2em rgba(255, 255, 255, 0.1);
        -webkit-animation: flare 12000ms infinite alternate linear;
        animation: flare 12000ms infinite alternate linear;
      }
      @-webkit-keyframes flare {
        to {
          -webkit-transform: translate(-0.3em, 0.3em);
          transform: translate(-0.3em, 0.3em);
          opacity: 0.4;
          font-size: 0.2em;
        }
      }
      @keyframes flare {
        to {
          -webkit-transform: translate(-0.3em, 0.3em);
          transform: translate(-0.3em, 0.3em);
          opacity: 0.4;
          font-size: 0.2em;
        }
      }
    }
    .cloudy {
      -webkit-box-flex: 0;
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      display: block;
      position: relative;
      font-size: -webkit-calc(11em);
      font-size: calc(1em);
      width: 1em;
      height: 1em;
      //   margin: 0.3em;
      border-radius: 100%;
      -webkit-box-shadow: 0 0 0 0.05em currentColor inset,
        0 0 0.3em -0.03em #c9e8de;
      box-shadow: 0 0 0 0.05em currentColor inset, 0 0 0.3em -0.03em #c9e8de;
      background: -webkit-linear-gradient(linear, from(#1b9ce2), to(#e0e2e5));
      background: -webkit-linear-gradient(top right, #1b9ce2 0%, #e0e2e5 90%);
      background: linear-gradient(to top right, #1b9ce2 0%, #e0e2e5 90%);
      .cloud {
        position: absolute;
        top: 0.1em;
        left: 65%;
        width: 0.37em;
        height: 0.13em;
        border-radius: 0.1em;
        background-color: #fff;
        -webkit-box-shadow: 0 0 0.1em 0.02em #f0f2f0 inset,
          0 0 0.3em -0.03em #c9e8de;
        box-shadow: 0 0 0.1em 0.02em #f0f2f0 inset, 0 0 0.3em -0.03em #c9e8de;
        -webkit-animation: move 3000ms infinite ease-in-out;
        animation: move 3000ms infinite ease-in-out;
      }
      .cloud + .cloud {
        top: 25%;
        left: 40%;
        -webkit-animation: move 3700ms infinite linear;
        animation: move 3700ms infinite linear;
      }
      .cloud::before,
      .cloud::after {
        content: "";
        position: inherit;
        border-radius: inherit;
        background-color: inherit;
        -webkit-box-shadow: inherit;
        box-shadow: inherit;
        bottom: 30%;
      }
      .cloud::before {
        left: 0.05em;
        width: 0.2em;
        height: 0.2em;
      }
      .cloud::after {
        left: 0.15em;
        width: 0.15em;
        height: 0.15em;
      }
      @-webkit-keyframes move {
        50% {
          -webkit-transform: translateX(-0.05em);
          transform: translateX(-0.05em);
        }
      }
      @keyframes move {
        50% {
          -webkit-transform: translateX(-0.05em);
          transform: translateX(-0.05em);
        }
      }
    }
    .snowy {
      -webkit-box-flex: 0;
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      display: block;
      position: relative;
      font-size: -webkit-calc(11em);
      font-size: calc(1em);
      width: 1em;
      height: 1em;
      //   margin: 0.3em;
      border-radius: 100%;
      -webkit-box-shadow: 0 0 0 0.05em currentColor inset,
        0 0 0.3em -0.03em #c9e8de;
      box-shadow: 0 0 0 0.05em currentColor inset, 0 0 0.3em -0.03em #c9e8de;
      background: -webkit-gradient(linear, from(#758595), to(#e0e2e5));
      background: -webkit-linear-gradient(bottom left, #758595 0%, #e0e2e5 90%);
      background: linear-gradient(to bottom left, #758595 0%, #e0e2e5 90%);
      .snowy ul {
        position: absolute;
        list-style: none;
        top: 0%;
        left: 10%;
        right: 0%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
      .snowy li::before,
      .snowy li::after {
        content: "";
        position: absolute;
        list-style: none;
        width: 0.015em;
        height: 0.01em;
        border-radius: 100%;
        background-color: currentColor;
        will-change: transform, opacity;
        -webkit-animation: snow 3700ms infinite ease-out;
        animation: snow 3700ms infinite ease-out;
        opacity: 0;
      }
      .snowy li:nth-child(2n + 1)::before,
      .snowy li:nth-child(13n + 11)::after {
        top: -7%;
        left: 40%;
      }
      .snowy li:nth-child(3n + 2)::before,
      .snowy li:nth-child(11n + 7)::after {
        top: 5%;
        left: 90%;
        -webkit-animation-delay: 1000ms;
        animation-delay: 1000ms;
      }
      .snowy li:nth-child(5n + 3)::before,
      .snowy li:nth-child(7n + 5)::after {
        top: -10%;
        left: 80%;
        -webkit-animation-delay: 2000ms;
        animation-delay: 2000ms;
      }
      .snowy li:nth-child(7n + 5)::before,
      .snowy li:nth-child(5n + 3)::after {
        top: 10%;
        left: 10%;
        -webkit-animation-delay: 1300ms;
        animation-delay: 1300ms;
      }
      .snowy li:nth-child(11n + 7)::before,
      .snowy li:nth-child(3n + 2)::after {
        top: 20%;
        left: 70%;
        -webkit-animation-delay: 1500ms;
        animation-delay: 1500ms;
      }
      .snowy li:nth-child(13n + 11)::before,
      .snowy li:nth-child(2n + 1)::after {
        top: 35%;
        left: 20%;
        -webkit-animation-delay: 500ms;
        animation-delay: 500ms;
      }
      .snowman {
        position: absolute;
        bottom: 30%;
        left: 40%;
        width: 0.15em;
        height: 0.15em;
        opacity: 0.9;
        background: currentColor;
        border-radius: 100%;
      }
      .snowman::after {
        content: "";
        position: absolute;
        top: 90%;
        left: 30%;
        -webkit-transform: translate(-50%, 0%);
        -ms-transform: translate(-50%, 0%);
        transform: translate(-50%, 0%);
        width: 0.275em;
        height: 0.3em;
        border-radius: inherit;
        background-color: currentColor;
      }
      .snowman::before {
        content: "";
        position: absolute;
        top: 0%;
        left: 50%;
        -webkit-transform: translate(-55%, -50%);
        -ms-transform: translate(-55%, -50%);
        transform: translate(-55%, -50%);
        width: 0.45em;
        height: 0.4em;
        border-radius: 60%;
        border: 0.02em solid transparent;
        border-bottom-color: #758595;
        will-change: border-radius;
        -webkit-animation: snowman 9000ms infinite ease-in;
        animation: snowman 9000ms infinite ease-in;
      }
      @-webkit-keyframes snow {
        50% {
          opacity: 1;
        }
        100% {
          -webkit-transform: translate(-0.1em, 15vmin);
          transform: translate(-0.1em, 15vmin);
        }
      }
      @keyframes snow {
        50% {
          opacity: 1;
        }
        100% {
          -webkit-transform: translate(-0.1em, 15vmin);
          transform: translate(-0.1em, 15vmin);
        }
      }
      @-webkit-keyframes snowman {
        50% {
          border-radius: 60% 60% 30% 50%;
        }
      }
      @keyframes snowman {
        50% {
          border-radius: 60% 60% 30% 50%;
        }
      }
    }
    .stormy {
      -webkit-box-flex: 0;
      -webkit-flex: block;
      -ms-flex: block;
      flex: block;
      display: block;
      position: relative;
      font-size: -webkit-calc(11em);
      font-size: calc(1em);
      width: 1em;
      height: 1em;
      //   margin: 0.3em;
      border-radius: 100%;
      -webkit-box-shadow: 0 0 0 0.05em currentColor inset,
        0 0 0.3em -0.03em #34c6d8;
      box-shadow: 0 0 0 0.05em currentColor inset, 0 0 0.3em -0.03em #34c6d8;
      background: -webkit-gradient(linear, from(#4b9cc2), to(#9adbd9));
      background: -webkit-linear-gradient(top right, #4b9cc2 0%, #9adbd9 100%);
      background: linear-gradient(to top right, #4b9cc2 0%, #9adbd9 100%);
      .stormy::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0.05em;
        border-radius: 100%;
        opacity: 0.4;
        will-change: background-color;
        -webkit-animation: flash 2300ms infinite linear 80ms;
        animation: flash 2300ms infinite linear 80ms;
      }
      .cloud {
        position: absolute;
        top: 0.1em;
        width: 0.37em;
        height: 0.13em;
        border-radius: 0.1em;
        background-color: #c9e8de;
        font-size: 1.3em;
        left: 50%;
        box-shadow: 0 0 0.1em 0.02em #f0f2f0 inset, 0 0 0.3em -0.03em #c9e8de;
        will-change: background-color, transform, opacity;
        -webkit-animation: cloudflash 2300ms infinite linear,
          move 3700ms infinite linear;
        animation: cloudflash 2300ms infinite linear,
          move 3700ms infinite linear;
      }
      .cloud::before,
      .cloud::after {
        content: "";
        position: inherit;
        border-radius: inherit;
        background-color: inherit;
        -webkit-box-shadow: inherit;
        box-shadow: inherit;
        bottom: 30%;
      }
      .cloud::before {
        left: 0.05em;
        width: 0.2em;
        height: 0.2em;
      }
      .cloud::after {
        left: 0.15em;
        width: 0.15em;
        height: 0.15em;
      }
      .stormy ul {
        position: absolute;
        list-style: none;
        top: 0%;
        left: 70%;
        right: 0%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
      .stormy li,
      .stormy li::before,
      .stormy li::after {
        position: absolute;
        width: 0.005em;
        height: 0.02em;
        border-radius: 10%;
        background-color: #eee;
        opacity: 0;
        will-change: transform, opacity;
        -webkit-animation: rain 2000ms infinite linear;
        animation: rain 2000ms infinite linear;
        -webkit-transform: rotate(25deg);
        -ms-transform: rotate(25deg);
        transform: rotate(25deg);
      }
      .stormy li::before,
      .stormy li::after {
        content: "";
      }
      .stormy li:nth-child(5n + 3)::before,
      .stormy li:nth-child(11n + 7)::after,
      .stormy li:nth-child(2n + 1) {
        top: 10%;
        left: 68%;
        -webkit-animation-delay: 500ms;
        animation-delay: 500ms;
      }
      .stormy li:nth-child(3n + 2)::after,
      .stormy li:nth-child(7n + 5)::after,
      .stormy li:nth-child(3n + 2) {
        top: 5%;
        left: 45%;
        -webkit-animation-delay: 1250ms;
        animation-delay: 1250ms;
      }
      .stormy li:nth-child(2n + 1)::before,
      .stormy li:nth-child(5n + 3)::after,
      .stormy li:nth-child(7n + 5) {
        top: 4%;
        left: 82%;
        -webkit-animation-delay: 750ms;
        animation-delay: 750ms;
      }
      .stormy li:nth-child(11n + 7)::before,
      .stormy li:nth-child(3n + 2)::after,
      .stormy li:nth-child(7n + 5) {
        top: 15%;
        left: 15%;
        -webkit-animation-delay: 2000ms;
        animation-delay: 2000ms;
      }
      .stormy li:nth-child(7n + 5)::before,
      .stormy li:nth-child(2n + 1)::after,
      .stormy li:nth-child(11n + 7) {
        top: 10%;
        left: 33%;
        -webkit-animation-delay: 2500ms;
        animation-delay: 2500ms;
      }
      @-webkit-keyframes flash {
        49% {
          background-color: rgba(255, 255, 255, 0);
        }
        51% {
          background-color: currentColor;
        }
        53% {
          background-color: rgba(255, 255, 255, 0);
        }
        57% {
          background-color: currentColor;
        }
        85% {
          background-color: rgba(255, 255, 255, 0);
        }
      }
      @keyframes flash {
        49% {
          background-color: rgba(255, 255, 255, 0);
        }
        51% {
          background-color: currentColor;
        }
        53% {
          background-color: rgba(255, 255, 255, 0);
        }
        57% {
          background-color: currentColor;
        }
        85% {
          background-color: rgba(255, 255, 255, 0);
        }
      }
      @-webkit-keyframes cloudflash {
        49% {
          background-color: #c9e8de;
        }
        51% {
          background-color: #f0f2f0;
        }
        53% {
          background-color: #c9e8de;
        }
        57% {
          background-color: #f0f2f0;
        }
        85% {
          background-color: #c9e8de;
        }
      }
      @keyframes cloudflash {
        49% {
          background-color: #c9e8de;
        }
        51% {
          background-color: #f0f2f0;
        }
        53% {
          background-color: #c9e8de;
        }
        57% {
          background-color: #f0f2f0;
        }
        85% {
          background-color: #c9e8de;
        }
      }
      @-webkit-keyframes rain {
        10% {
          opacity: 0.4;
        }
        50% {
          opacity: 1;
        }
        100% {
          -webkit-transform: translate(-0.1em, 0.5em);
          transform: translate(-0.1em, 0.5em);
        }
      }
      @keyframes rain {
        10% {
          opacity: 0.4;
        }
        50% {
          opacity: 1;
        }
        100% {
          -webkit-transform: translate(-0.1em, 0.5em);
          transform: translate(-0.1em, 0.5em);
        }
      }
      @-webkit-keyframes move {
        50% {
          -webkit-transform: translateX(-0.05em);
          transform: translateX(-0.05em);
        }
      }
      @keyframes move {
        50% {
          -webkit-transform: translateX(-0.05em);
          transform: translateX(-0.05em);
        }
      }
    }
  }
}
</style>
