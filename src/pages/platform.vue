<script setup>
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import FormBox from '@/components/form.vue'
import oneImg from '@/assets/x2/platform_one.png'
import twoImg from '@/assets/x2/platform_two.png'
import threeImg from '@/assets/x2/platform_three.png'

import normalArrow from '@/assets/x2/platform_arrow.png'
import hoverArrow from '@/assets/x2/platform_arrow_hover.png'

import {onMounted, onUnmounted, ref} from 'vue'
import {dingyue} from '@/api'
import {ElMessage} from 'element-plus'

gsap.registerPlugin(ScrollTrigger)

const arrImg = [{
  img: oneImg,
  title: 'Dataset bootstrapping for Web3 Al developers',
  txt: 'Alaya Al\'s Open Data Platform enables customisable dataset bootstrapping for early-stage small-medium Al developers with limited cash funding, either directly on-chain or off-chain.'
},
  {
    img: twoImg,
    title: 'Custom token support',
    txt: 'The Open Data Platform leverages free market dynamics of open data economies to support custom data requests for Al developers through custom token reward pools, similar to a decentralised exchange or an NFT market.'
  },
  {
    img: threeImg,
    title: 'Web3 + Al token innovation',
    txt: 'Custom token rewards improve organic token distribution for Web3 Al projects by aligning user incentives with project ecosystems, enabling simultaneous user acquisition and data collection to incentivise Web3 Al token utility innovation. '
  }]

const arrowHovered = ref(false)

const toggleWaitlist = (hover) => {
  arrowHovered.value = hover
}

const scrollToForm = () => {
  const formElement = document.querySelector('.form_container')
  if (formElement) {
    formElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// 添加视口宽度监听
const baseWidth = 1200 // 基准宽度
const scale = ref(1)

const updateScale = () => {
  const width = window.innerWidth
  scale.value = Math.min(width / baseWidth, 1) // 限制最大缩放为1
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
  const isMobile = window.innerWidth <= 768 || /mobile/i.test(navigator.userAgent);
  if (!isMobile) {
    // 为 platform_two 添加动画
    gsap.set('.gsap_platform_two', {
      opacity: 0,
      y: 200,
      force3D: true
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: '.gsap_platform_two',
        start: " 85%",
        once: true,
        markers: false
      }
    }).to('.gsap_platform_two', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    // 为 platform_two 添加动画
    gsap.set('.platform_form', {
      opacity: 0,
      y: 100,
      force3D: true
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: '.platform_form',
        start: " 85%",
        once: true,
        markers: false
      }
    }).to('.platform_form', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })

    // 为每个 platform_three_container 添加动画
    const containers = document.querySelectorAll('.platform_three_container')

    containers.forEach((container, index) => {
      // 设置初始状态
      gsap.set(container, {
        opacity: 0,
        y: 100,
        force3D: true
      })

      // 创建动画
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: " 85%",
          once: true,
          markers: false
        }
      }).to(container, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2, // 添加延迟，使每个容器依次显示
        ease: "power2.out"
      })
    })
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }


})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
})

// 处理表单提交
const handleFormSubmit = async (formData) => {
  console.log(formData, 'formData')
  try {
    const response = await dingyue(formData)
  } catch (error) {
    console.error('Submit error:', error)
    ElMessage.error('Submit failed, please try again')
  }
}

</script>

<template>
  <!--  <div class="box_top"></div>-->
  <div class="platform_container"
       style="display: flex; flex-direction: column; justify-content: center; background-color: white">
    <div class="platform_one" style="display: flex; flex-direction: column; align-items: center;">
      <div class="platform_title">OPEN DATA PLATFORM</div>
      <div class="platform_txt">
        Your One-Stop Web3<br>
        Custom Data Solution
      </div>
      <div class="platform_one_btn"
           @mouseenter="toggleWaitlist(true)"
           @mouseleave="toggleWaitlist(false)"
           @click="scrollToForm">
        <div class="btn_content">
          Join Waitlist
          <img class="platform_arrow"
               :src="arrowHovered ? hoverArrow : normalArrow"
               :class="{ 'arrow-hover': arrowHovered }"
               alt="">
        </div>
      </div>
    </div>
    <div class="platform_two">
      <img class="gsap_platform_two" style="width: 100%;" src="@/assets/x2/platform_bot.png" alt="">
    </div>
    <div class="platform_three">
      <div class="platform_three_container" v-for="(item, index) in arrImg" :key="index">
        <img class="paltform_icon" src="@/assets/x1/paltform_icon.png" alt="">

        <div>
          <div class="platform_three_title">{{ item.title }}</div>
          <div style="display: flex; justify-content: space-between;">
            <img class="platform_three_img" :src="item.img" alt="">
            <div class="platform_three_txt">
              {{ item.txt }}
              <div class="green_line"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="platform_form">
      <FormBox
          submit-text="Join Waitlist"
          @submit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<style scoped>
/* 使用 CSS 变量定义基准尺寸 */
.platform_top {
  padding-top: 88px;
}

.box_top {
  padding-top: calc(84px * v-bind(scale));
}

.platform_title {
  font-family: 'Abril';
  font-weight: bold;
  padding-top: calc(150px * v-bind(scale));
  font-size: calc(80px * v-bind(scale));
  color: #1ae28e;
}

.platform_txt {
  font-family: 'Arial';
  font-weight: bold;
  font-size: calc(40px * v-bind(scale));
  line-height: 1.5;
  color: #3d3d3d;
  padding-top: calc(20px * v-bind(scale));
  padding-bottom: calc(150px * v-bind(scale));
}

.platform_container {
  padding-top: calc(84px * v-bind(scale));
  background-image: url('@/assets/x1/platform_one.png');
  background-size: 100% auto;
  background-position: top;
  background-repeat: no-repeat;
}

.platform_one {
}

.platform_one_btn {
  font-size: calc(22px * v-bind(scale));
  border: 1px solid #1ae28e;
  border-radius: 50px;
  /* color: #1ae28e; */
  margin-bottom: calc(100px * v-bind(scale));
  margin-top: calc(100px * v-bind(scale));
  padding: calc(12px * v-bind(scale)) calc(25px * v-bind(scale));
  cursor: pointer;
  transition: all 0.3s ease;
}

/* .platform_one_btn:hover {
    background-color: rgba(26, 226, 142, 0.1);
} */
.btn_content {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1660;
}

.platform_arrow {
  width: calc(34px * v-bind(scale));
  height: calc(34px * v-bind(scale));
  transition: transform 0.3s ease;
  margin-left: calc(20px * v-bind(scale));
}

.platform_two {
  padding: 0 10%;
  max-width: 1000px;
  margin: 0 auto;
}

.platform_three {
  padding: 0 10%;
  margin: 0 auto;
  padding-bottom: 110px;
  background: linear-gradient(to bottom, #38f3c1, #1ae28e) no-repeat bottom;
  background-size: 100% calc(100% - 300px);


  .platform_three_container {
    max-width: 1000px;
    display: flex;
    padding: calc(40px * v-bind(scale));
    background-color: #151334;
    border-radius: calc(20px * v-bind(scale));
    margin-top: calc(80px * v-bind(scale));
  }

  .paltform_icon {
    width: calc(40px * v-bind(scale));
    height: calc(40px * v-bind(scale));
    margin-right: calc(30px * v-bind(scale));
  }

  .platform_three_title {
    font-family: 'Abril';
    font-weight: 700;
    font-size: calc(36px * v-bind(scale));
    color: #1ae28e;
    padding-bottom: calc(20px * v-bind(scale));
  }

  .platform_three_img {
    width: calc(252px * v-bind(scale));
    height: calc(300px * v-bind(scale));
    margin-right: calc(60px * v-bind(scale));
  }

  .platform_three_txt {
    position: relative;
    font-size: calc(26px * v-bind(scale));
  }

  .green_line {
    position: absolute;
    bottom: 36px;
    right: 30px;
    width: 40px;
    height: 5px;
    background-color: #1ae28e;
    border-radius: 50px;
  }
}

/* 响应式断点调整 */
@media screen and (max-width: 1440px) {

}

@media screen and (max-width: 1200px) {
  /* :root {
    --title-size: 60px;
    --subtitle-size: 30px;
    --content-size: 18px;
  } */
}

@media screen and (max-width: 719px) {
  /* :root {
    --title-size: 40px;
    --subtitle-size: 24px;
    --content-size: 16px;
  } */
  .platform_three {
    padding: 0 5%;
  }
}

@media screen and (max-width: 480px) {
  /* :root {
    --title-size: 32px;
    --subtitle-size: 20px;
    --content-size: 14px;
  } */
}

.platform_form {
  width: 100%;
  /* padding: 50px 0; */
  padding-top: 0;
}

@media screen and (max-width: 440px) {
  .platform_container {
    padding-top: 60px;
    background-image: url('@/assets/x1/platform_one_mobile.png');
    background-size: 100% auto;
    background-position: top;
    background-repeat: no-repeat;
  }

  .platform_two {
    padding: 0 4%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .platform_form {
    padding-top: 0;
  }

  .box_top {
    padding-top: 60px;
  }

  .platform_one {

  }

  .platform_three {
    padding-bottom: 70px;
    background: linear-gradient(to bottom, #38f3c1, #1ae28e) no-repeat bottom;
    background-size: 100% calc(100% - 50px);

    .green_line {
      right: 20px;
      bottom: 5px;
      width: 20px;
      height: 3px;
    }
  }

}
</style>