<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import aiaLogo from '@/assets/x2/aia_logo.png'
import arrowDown from '@/assets/arrow-right.svg'
import alayaPro from '@/assets/x2/aia_pro_normal.png'
import alayaProHover from '@/assets/x2/aia_pro_hover.png'
import alayaProNormal from '@/assets/x2/aia_pro_normal.png'
import menu from '@/assets/small/menu.png'
import close from '@/assets/small/close.png'

import {useRouter} from 'vue-router';

// 导入 epic-spinners 组件
import {HalfCircleSpinner} from 'epic-spinners'

const router = useRouter();

const platformShow = ref(false)
const goHome = () => {
  selectedIndex.value = 0;
  router.push('/')
}

const isHovered = ref(false)
const toggleHover = (show) => {
  const width = window.innerWidth
  if (width > 719) {
    isHovered.value = show
  }
}

const togglePlatform = (show) => {
  const width = window.innerWidth
  if (width > 719) {
    platformShow.value = show;
  }

}

const mediaShow = ref(false)
const toggleMedia = (show) => {
  const width = window.innerWidth
  if (width > 719) {
    mediaShow.value = show
  }
}

const communityShow = ref(false)

const toggleCommunity = (show) => {
  const width = window.innerWidth
  if (width > 719) {
    communityShow.value = show
  }
}

const goAialaya = () => {
  // window.open('https://www.aialaya.io/web/alaya/game.html', '_blank');
}

const toggleDoc = () => {
  window.open('https://alaya-ai.gitbook.io/alaya-ai', '_blank');
  selectedIndex.value = 0;
}

const goX = () => {
  window.open('https://x.com/Alaya_AI', '_blank');
}
const goTelegram = () => {
  window.open('https://t.me/Alaya_AI', '_blank');
}

const goAgt = () => {
  window.open('https://alaya-ai.gitbook.io/alaya-ai/user-manual/usdagt-token', '_blank');
}

const menuHeight = ref(0)
const menuContentRef = ref(null)

// 计算菜单实际高度
onMounted(() => {
  menuHeight.value = menuContentRef.value?.scrollHeight || 400
})

const menuShow = ref(false)
const isAnimating = ref(false)

const toggleMenu = () => {
  isAnimating.value = true
  if (!menuShow.value) {
    menuShow.value = true
    setTimeout(() => {
      isAnimating.value = false
    }, 300)
  } else {
    setTimeout(() => {
      menuShow.value = false
      isAnimating.value = false
    }, 200)
  }
  toggleMenuItem('')
}

// 添加菜单项展开状态控制
const menuStates = ref({
  platform: false,
  media: false,
  doc: false
})

const selectedIndex = ref(0)
const toggleAuto = () => {
  menuShow.value = false
  selectedIndex.value = 4 // 设置为 Data Auto-Labelling 的索引
  router.push('/labeling')
}

const toggleMenuItem = (item) => {
  // 遍历 menuStates 的所有属性
  for (const key in menuStates.value) {
    if (key === item) {
      // 如果是当前点击的项，切换其状态
      menuStates.value[key] = !menuStates.value[key];
    } else {
      // 其他项的状态设置为 false
      menuStates.value[key] = false;
    }
  }

}

const selectItem = (index) => {
  if (index === 2) {
    router.push('/annotation')
  }
  if (index === 3) {
    router.push('/platform')
  }
  if (index === 5) {
    router.push('/media')
  }
  if (index === 6) {
    router.push('/video')
  }
  if (index === 7) {
    window.open('https://x.com/Alaya_AI', '_blank');
    selectedIndex.value = 0;
  }
  if (index === 8) {
    window.open('https://t.me/Alaya_AI.com/', '_blank');
    selectedIndex.value = 0;
  }
  toggleMenuItem('')
  menuShow.value = false;
  selectedIndex.value = index;
};

// 添加点击处理函数
const handleContentClick = (e) => {
  // 如果点击的不是菜单内容
  if (!e.target.closest('.menu_box') && !e.target.closest('.logo_end_small')) {
    menuShow.value = false
    toggleMenuItem('')
  }
}


// 添加视口宽度监听
const baseWidth = 1200 // 基准宽度
const scale = ref(1)

const updateScale = () => {
  const width = window.innerWidth
  scale.value = Math.min(width / baseWidth, 1) // 限制最大缩放为1
}

// 监听点击事件
onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
  document.addEventListener('click', handleContentClick)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
  document.removeEventListener('click', handleContentClick)
})

// 阻止默认触摸行为
const preventDefault = (e) => {
  e.preventDefault()
}

onMounted(() => {
  // 添加触摸事件监听
  const menuElements = document.querySelectorAll('.menu_box, .menu_item, .menu_item_box, .menu_sub_item')
  menuElements.forEach(el => {
    el.addEventListener('touchstart', preventDefault, {passive: false})
  })
})

onUnmounted(() => {
  // 移除触摸事件监听
  const menuElements = document.querySelectorAll('.menu_box, .menu_item, .menu_item_box, .menu_sub_item')
  menuElements.forEach(el => {
    el.removeEventListener('touchstart', preventDefault)
  })
})

const selectedRouter =""
</script>

<template>
  <div class="header_container"
       :class="{'mobile_active': menuShow, /*'active_height': platformShow || mediaShow || communityShow*/ }"
       @mouseenter="toggleHover(true)" @mouseleave="toggleHover(false)">
    <div class="header_box">
      <div style="display: flex; align-items: center; justify-content: center;height: 100%;">
        <img class="logo no-highlight" :src="aiaLogo" alt="" @click="goHome">
      </div>
      <div class="item_box">
        <div class="platform margin_right pointer_txt" style="position: relative;">
          <div class="platform_wrapper"
               @mouseenter="togglePlatform(true)"
               @mouseleave="togglePlatform(false)">
            <!--            <span :style="{ color: platformShow ? '#1ae28e' : '' }">Platform</span>-->
            <span class="com-font-color font16 ">Platform</span>
            <img class="platform_arrow" :class="{ 'arrow_rotate': platformShow }" :src="arrowDown" alt="">
            <div class="platform_bottm" :class="{'menu-visible':platformShow}" v-show="platformShow">
              <div class="pla_btm_two pointer_txt" :class="{ active: selectedIndex === 2 }" @click="selectItem(2)">Data Annotation</div>
              <div class="pla_btm_two pointer_txt" :class="{ active: selectedIndex === 3 }" @click="selectItem(3)">Open Data Platform</div>
            </div>
          </div>
        </div>
        <div class="ai-auto-labelling margin_right pointer_txt" @click="toggleAuto">
          <span class="com-font-color font16 " :class="{active: selectedIndex === 4 }" >AI Auto-Labelling</span>
        </div>
        <div class="media margin_right pointer_txt" style="position: relative;">
          <div class="media_wrapper"
               @mouseenter="toggleMedia(true)"
               @mouseleave="toggleMedia(false)">
            <span class="com-font-color font16 ">Media</span>
            <img class="media_arrow" :class="{ 'arrow_rotate': mediaShow }" :src="arrowDown" alt="">
            <div class="media_bottm" :class="{'menu-visible':mediaShow}" v-show="mediaShow">
              <div class="pla_btm_two pointer_txt" :class="{ active: selectedIndex === 5 }" @click="selectItem(5)">Medium</div>
              <div class="pla_btm_two pointer_txt" :class="{ active: selectedIndex === 6 }"  @click="selectItem(6)">Video Tutorials</div>
            </div>
          </div>
        </div>
        <div class="doc margin_right pointer_txt" @click="toggleDoc">
          <span class="com-font-color font16 ">Doc</span></div>
        <div class="community margin_right pointer_txt" style="position: relative;">
          <div class="community_wrapper"
               @mouseenter="toggleCommunity(true)"
               @mouseleave="toggleCommunity(false)">
            <span class="com-font-color font16 ">Community</span>
            <img class="community_arrow" :class="{ 'arrow_rotate': communityShow }" :src="arrowDown" alt="">
            <div class="community_bottm" v-show="communityShow">
              <div class="pla_btm_two pointer_txt" :class="{ active: selectedIndex === 7 }"  @click="selectItem(7)">Twitter/X</div>
              <div class="pla_btm_two pointer_txt" :class="{ active: selectedIndex === 8 }"  @click="selectItem(8)">Telegram</div>
            </div>
          </div>
        </div>
        <div class="agt margin_right pointer_txt" @click="goAgt">
          <span class="com-font-color font16 ">$AGT</span></div>
      </div>
      <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
        <img class="logo_end" :src="alayaPro" @click="goAialaya">
        <div class="menu_trigger no-highlight">
          <img class="logo_end_small no-highlight"
               :src="menuShow ? close : menu"
               alt=""
               @click="toggleMenu"
          >
        </div>
      </div>
    </div>
    <div class="menu_box pointer_txt" v-if="menuShow" @click.stop>
      <div class="menu_loading" v-if="isAnimating">
        <half-circle-spinner
            :animation-duration="1000"
            :size="30"
            color="#1ae28e"
        />
      </div>
      <div class="menu_content_wrapper" :class="{ 'menu-show': !isAnimating }">
        <div class="menu_item">
          <div class="menu_item_box" @click="toggleMenuItem('platform')">
            <div>Platform</div>
            <img :class="{ 'rotate': menuStates.platform }" src="@/assets/small/arrow_right.png" alt="">
          </div>
          <div class="menu_content" v-show="menuStates.platform">
<!--            <div class="menu_sub_item" style="display: flex; align-items: center;">-->
<!--              <img style="width: 20px;" src="@/assets/small/tree.png" alt="">-->
<!--              <span style="margin-left: 10px; color: #0a091c; font-weight: 700; font-family: 'Arial';">Features</span>-->
<!--            </div>-->
<!--            <div style="margin-left: 10px; border-left: 1px solid #1ae28e; padding-left: 20px;">-->
              <div class="menu_sub_item" @click="selectItem(2)" :class="{ active: selectedIndex === 2 }">Data
                Annotation
              </div>
              <div class="menu_sub_item" @click="selectItem(3)" :class="{ active: selectedIndex === 3 }">Open Data
                Platform
              </div>
<!--            </div>-->
          </div>
        </div>
        <div class="menu_item" @click="toggleAuto" :class="{ 'active': selectedIndex === 4 }">AI Auto-Labelling</div>
        <div class="menu_item">
          <div class="menu_item_box" @click="toggleMenuItem('media')">
            <div>Media</div>
            <img :class="{ 'rotate': menuStates.media }" src="@/assets/small/arrow_right.png" alt="">
          </div>
          <div class="menu_content" v-show="menuStates.media">
            <div class="menu_content" v-show="menuStates.media">
<!--              <div class="menu_sub_item" style="display: flex; align-items: center;">-->
<!--                <img style="width: 20px;" src="@/assets/small/qizhi.png" alt="">-->
<!--                <span style="margin-left: 10px; color: #0a091c; font-weight: 700; font-family: 'Arial';">Latest Information</span>-->
<!--              </div>-->
<!--              <div style="margin-left: 10px; border-left: 1px solid #1ae28e; padding-left: 20px;">-->
                <div class="menu_sub_item" @click="selectItem(5)" :class="{ active: selectedIndex === 5 }">Medium</div>
                <div class="menu_sub_item" @click="selectItem(6)" :class="{ active: selectedIndex === 6 }">Video
                  Tutorials
                </div>
<!--              </div>-->

            </div>
          </div>
        </div>
        <div class="menu_item" @click="toggleDoc">Doc</div>

        <div class="menu_item">
          <div class="menu_item_box" @click="toggleMenuItem('doc')">
            <div> Community</div>
            <img class="" :class="{ 'rotate': menuStates.doc }" src="@/assets/small/arrow_right.png" alt="">
          </div>
          <div class="menu_content" v-show="menuStates.doc">
<!--            <div class="menu_sub_item" style="display: flex; align-items: center;">-->
<!--              <img style="width: 20px;" src="@/assets/x2/jiangbei.png" alt="">-->
<!--              <span style="margin-left: 10px; color: #0a091c; font-weight: 700; font-family: 'Arial';">Follow Us</span>-->
<!--            </div>-->
<!--            <div style="margin-left: 10px; border-left: 1px solid #1ae28e; padding-left: 20px;">-->
              <div class="menu_sub_item" @click="selectItem(7)" :class="{ active: selectedIndex === 7 }">Twitter/X</div>
              <div class="menu_sub_item" @click="selectItem(8)" :class="{ active: selectedIndex === 8 }">Telegram</div>
<!--            </div>-->
          </div>
        </div>

        <div class="" style="display: flex; align-items: center; justify-content: center; padding: 30px 0;">
          <img style="width: 100px;" :src="alayaProNormal" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item_box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: calc(1000px * v-bind(scale));
}

.header_container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(84px * v-bind(scale));
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: #fff;
  background-color: #ffffff;
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.2s ease;
}

.active {
  background-color: #fff;
  color: #1ae28e !important;
  border-radius: 0 0 18px 18px;
}

.active_height {
  height: calc(180px * v-bind(scale));
  transition: height 0.05s ease;
}

.header_box {
  width: 100%;
  padding: 0 calc(200px * v-bind(scale));
  height: calc(84px * v-bind(scale));
  font-size: calc(18px * v-bind(scale));
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: none;
  /* background-color: #121022; */
}

.margin_right {
  margin-right: calc(50px * v-bind(scale));
}

.logo {
  width: calc(150px * v-bind(scale));
  margin-right: calc(80px * v-bind(scale));
  cursor: pointer;
}

.com-font-color {
  color: #3d3d3d;
}

.font16 {
  font-size: 16px;
}


.platform {
  cursor: pointer;
}

.platform:hover {
  color: #1ae28e;
}

.platform_arrow {
  margin-left: calc(5px * v-bind(scale));
  width: calc(8px * v-bind(scale));
  transition: transform 0.2s ease;
}

.ai-auto-labelling:hover {
  color: #1ae28e;
}

.doc:hover {
  color: #1ae28e;
}

.media:hover {
  color: #1ae28e;
}

.media_arrow {
  margin-left: calc(5px * v-bind(scale));
  width: calc(8px * v-bind(scale));
  transition: transform 0.2s ease;
}

.community:hover {
  color: #1ae28e;
}

.agt:hover {
  color: #1ae28e;
}

.community_arrow {
  width: calc(8px * v-bind(scale));
  transition: transform 0.3s ease;
}

.arrow_rotate {
  transform: rotate(90deg);
  transition: transform 0.3s ease;
}

.arrow_rotate_media {
  transform: rotate(90deg);
}

.arrow_rotate_community {
  transform: rotate(90deg);
}

.logo_end {
  width: calc(153px * v-bind(scale));
  height: calc(48px * v-bind(scale));
  margin-left: calc(60px * v-bind(scale));
  cursor: pointer;
}

.logo_end_small {
  display: none;
  width: 28px;
  height: 28px;
  /* margin-left: 60px; */
  cursor: pointer;
}

.tree {
  height: calc(28px * v-bind(scale));
}

.line {
  width: calc(1px * v-bind(scale));
  height: calc(40px * v-bind(scale));
  background-color: #1ae28e;
  margin-top: calc(5px * v-bind(scale));
}


.pla_botom_one {
  font-family: 'Arial';
  font-size: calc(16px * v-bind(scale));
  font-weight: 700;
}

.pla_btm_two {
  padding-top: calc(10px * v-bind(scale));
  font-size: calc(14px * v-bind(scale));
}

.pla_btm_two:hover {
  color: #45da95;
}

.pla_btm_two_selected {
  color: #45da95;
}

.fade-enter-active {
  transition: opacity 0.8s ease;
  transition-delay: 0.25s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

/* 离开动画 */
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.menu_box {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: #fff;
  color: #191933;
  z-index: 1000;
  -webkit-tap-highlight-color: transparent; /* 移除点击高亮 */
}

.menu_loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.menu_content_wrapper {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease-out;
}

.menu-show {
  opacity: 1;
  transform: translateY(0);
}

.menu_item {
  padding: 10px 50px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 18px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  transition: color 0.3s ease;
}

.menu_item.active {
  color: #1ae28e;
}

.menu_item_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation; /* 优化触摸操作 */
}

.menu_item_box img {
  transition: transform 0.3s ease;
}

.menu_item_box img.rotate {
  transform: rotate(90deg);
}

.menu_content {
  overflow: hidden;
  /* transition: all 0.8s ease-in-out; */
  -webkit-tap-highlight-color: transparent;
}

.menu_sub_item {
  font-size: 17px;
  padding: 10px 0;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  color: #5d5d5b;
}

.menu_sub_item.active {
  color: #1ae28e; /* 激活状态下的文字颜色为绿色 */
}

/* 展开时的高度动画 */
.menu_content-enter-active,
.menu_content-leave-active {
  transition: all 0.8s ease-in-out;
}

.menu_content-enter-from,
.menu_content-leave-to {
  height: 0;
  opacity: 0;
}

/* 响应式样式 */
@media screen and (max-width: 1220px) {
  .header_box {
    padding: 0 100px;
  }

  .item_box {
    width: calc(700px * v-bind(scale));
  }
}

@media screen and (max-width: 719px) {
  .header_box {
    padding: 0 50px;
  }

  .active {
    background-color: #fff;
    border-radius: 0 0 0 0;
  }

  .platform_bottm {
    width: 250px;
  }

  .logo {
    height: 32px;
    width: 113px;
    object-fit: contain;
    margin-right: 0;
  }

  .logo_end {
    margin-left: 0;
    display: none;
  }

  .logo_end_small {
    display: block;
  }

  .item_box {
    display: none;
  }

  .menu_box,
  .menu_item,
  .menu_item_box,
  .menu_sub_item,
  .menu_content {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    user-select: none;
    cursor: pointer;
  }

  .menu_item_box img {
    pointer-events: none;
  }
}

@media screen and (max-width: 440px) {
  .item_box {
    display: none;
  }

  .active {
    border-radius: 0 0 0 0;
  }

  .mobile_active {
    background-color: #fff;
  }

  .header_box {
    padding: 0 26px;
    height: 60px;
  }

  .logo {
    width: 113px;
  }

  .menu_arrow {
    width: 32px;
  }

  .header_container {
    transition: none;
    height: 60px;
    background-color: #ffffff;
  }

  .menu_box {
    top: 60px;
  }

  .menu_loading {
    padding: 15px 0;
  }
}

/* 高度变化的过渡 */
.platform_menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  transition: height 0.3s ease;
}

.platform_wrapper,
.media_wrapper {
  position: relative;
  /* padding: 10px 0; */
}

.platform_wrapper::after,
.media_wrapper::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 45px; /* 创建一个隐形的连接区域 */
  background: transparent;
}

.platform_bottm,
.media_bottm {
  position: absolute;
  top: calc(100% + 35px);
  left: 0;
  color: #000;
  width: 221px;
  padding: 12px 0 29px 20px;

  border-radius: 4px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 21px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;

  opacity: 0; /* 初始状态：完全透明 */
  transition: opacity 5s ease, top 5s ease; /* 添加过渡效果 */
}

.menu-visible {
  opacity: 1; /* 最终状态：完全不透明 */
  top: calc(100% + 35px);/* 最终状态：滑入到原始位置 */
  transition: opacity 5s ease, top 5s ease; /* 添加过渡效果 */
}


/* 移除之前的过渡动画相关样式 */
.fade-enter-active,
.fade-leave-active,
.fade-enter-from,
.fade-leave-to {
  display: none;
}

.community_wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
}

.community_bottm {
  position: absolute;
  top: calc(100% + 35px);
  left: 0;
  color: #000;
  width: 180px;
  padding: 12px 0 29px 20px;
  opacity: 1;
  transition: opacity 0.2s ease;

  border-radius: 4px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 21px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
}

.community_wrapper::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 45px;
  background: transparent;
}

@media screen and (max-width: 440px) {
  .community_bottm {
    width: 250px;
  }
}

/* 移除所有可点击元素的蓝色遮罩 */
.no-highlight {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  outline: none;
}

.logo_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.logo {
  width: calc(150px * v-bind(scale));
  margin-right: calc(80px * v-bind(scale));
  cursor: pointer;
}

.menu_trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
}

.logo_end_small {
  width: 22px;
  height: 22px;
}

@media screen and (max-width: 719px) {
  .logo {
    height: 32px;
    width: 113px;
    object-fit: contain;
    margin-right: 0;
  }

  .header_container{
    background-color: #fff;
  }
  .mobile_active {
    background-color: #fff;
  }

  /* 确保移动端下所有可交互元素都没有蓝色遮罩 */
  .header_container *,
  .menu_box * {
    -webkit-tap-highlight-color: transparent !important;
    -webkit-touch-callout: none !important;
    -webkit-user-select: none !important;
    user-select: none !important;
  }
}
</style>
