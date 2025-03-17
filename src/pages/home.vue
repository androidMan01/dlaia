<script setup>
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useTransition} from '@vueuse/core'
// import GsapAnimation from '@/components/GsapAnimation.vue'
import imageLable from '@/assets/x2/image-lable.png';
import audioLable from '@/assets/x2/audio-lable.png';
import videoLable from '@/assets/x2/video-lable.png';
import textLable from '@/assets/x2/text-lable.png';
import autoLable from '@/assets/x2/auto-lable.png';
import defaultGoogel from '@/assets/x2/googel_normal.png'
import hoverGoogel from '@/assets/x2/googel_hover.png'

import arbitrum_logo from '@/assets/logo_lunbo/arbitrum_logo.png'
// import binance_logo from '@/assets/logo_lunbo/binance_logo.png'
import bitget_logo from '@/assets/logo_lunbo/bitget_logo.png'
import bitmain_logo from '@/assets/logo_lunbo/bitmain_logo.png'
import btok_logo from '@/assets/logo_lunbo/btok_logo.png'
import cgvfof_logo from '@/assets/logo_lunbo/cgvfof_logo.png'
import chaincatcher_logo from '@/assets/logo_lunbo/chaincatcher_logo.png'
// import cinbureau_logo from '@/assets/logo_lunbo/cinbureau_logo.png'
import dwf_labs_logo from '@/assets/logo_lunbo/dwf_labs_logo.png'
import kucoin_logo from '@/assets/logo_lunbo/kucoin_logo.png'
import okx_logo from '@/assets/logo_lunbo/okx-logo.png'
import five_img from '@/assets/home-five.png'

import coverImage from '@/assets/x2/home_cover.png'
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {useRouter} from 'vue-router';

gsap.registerPlugin(ScrollTrigger)


const router = useRouter()

const threeImg = [{img: imageLable, txt: 'Image', desc: 'Labelling'},
  {img: audioLable, txt: 'Audio', desc: 'Analysis'},
  {img: autoLable, txt: 'Autonomous', desc: 'Driving'},
  {img: textLable, txt: 'Text', desc: 'Analysis'},
  {img: videoLable, txt: 'Video', desc: 'Annotation'}];

const currentImage = ref(defaultGoogel)
const changeImage = (isHover) => {
  currentImage.value = isHover ? hoverGoogel : defaultGoogel;
}

const goToGoogle = () => {
  window.open('https://play.google.com/store/apps/details?id=com.alaya.quiz.challenge', '_blank');
}
const goAialaya = () => {
  window.open('https://www.aialaya.io/web/alaya/game.html', '_blank');
}


// 添加轮播控制
const logos = ref([
  arbitrum_logo,
  // binance_logo,
  bitget_logo,
  bitmain_logo,
  btok_logo,
  cgvfof_logo,
  chaincatcher_logo,
  // cinbureau_logo,
  dwf_labs_logo,
  kucoin_logo,
  okx_logo
])

const home_one_words = ref([
  'Distributed Al Data Ecosystems',
  'Web3 Custom Data Pools',
  'Data Auto-labelling Toolsets',
  'Distributed Al Data Ecosystems'
]);


// 计算总宽度用于动画
const containerWidth = ref(0)
const logoContainer = ref(null)

const position = ref(0)
const animationRef = ref(null)

const animate = () => {
  if (logoContainer.value) {
    position.value -= 1
    if (Math.abs(position.value) >= containerWidth.value / 2) {
      position.value = 0
    }
    logoContainer.value.style.transform = `translateX(${position.value}px)`
    animationRef.value = requestAnimationFrame(animate)
  }
}

const goOne = () => {
  router.push('/annotation')
  // window.open('https://alaya-ai.gitbook.io/alaya-ai/core-features/distributed-data-ecosystem', '_blank');
}
const goTwo = () => {
  router.push('/platform')
  // window.open('https://alaya-ai.gitbook.io/alaya-ai/core-features/open-data-platform', '_blank');
}
const goThree = () => {
  router.push('/labeling')
  // window.open('https://alaya-ai.gitbook.io/alaya-ai/core-features/data-auto-labelling-toolset', '_blank');
}

// 定义三个独立的响应式变量
const source1 = ref(0)
const source2 = ref(0)
const source3 = ref(0)

// 为每个变量应用过渡效果
const outputValue1 = useTransition(source1, {duration: 1500})
const outputValue2 = useTransition(source2, {duration: 1500})
const outputValue3 = useTransition(source3, {duration: 1500})
// 检测是否为移动端
const detectMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'windows phone'];
  isMobile.value = mobileKeywords.some(keyword => userAgent.includes(keyword));
};
// 更新每个变量的值
// source1.value = 3620000
// source2.value = 327000
// source3.value = 305000
const windowWidth = ref(window.innerWidth);
// 计算字体大小
const fontSize = computed(() => {
  const width = windowWidth.value; // 使用响应式的宽度
  if (width <= 440) {
    return 16
  } else if (width <= 768) {
    return 14
  } else {
    return 36
  }
})

// 监听窗口大小变化
const updateFontSize = () => {
  // 触发 fontSize 计算属性的重新计算
  windowWidth.value = window.innerWidth; // 更新响应式的窗口宽度
  const width = window.innerWidth
  scale.value = Math.min(width / baseWidth, 1) // 限制最大缩放为1
}

// 添加视口宽度监听
const baseWidth = 1200 // 基准宽度
const scale = ref(1)

const updateScale = () => {
  const width = window.innerWidth
  scale.value = Math.min(width / baseWidth, 1) // 限制最大缩放为1
}


const texts = ref([
  'Distributed Al Data Ecosystems',
  'Web3 Custom Data Pools',
  'Data Auto-labelling Toolsets',
]);
const currentIndex = ref(0);
const transitionName = ref('slide-left'); // 默认动画方向

// 定时切换文本
let interval;
const startCarousel = () => {
  interval = setInterval(() => {
    transitionName.value = 'slide-left'; // 设置动画方向为左侧滑入
    currentIndex.value = (currentIndex.value + 1) % texts.value.length;
  }, 3000); // 每 6 秒切换一次
};


onMounted(() => {
  startCarousel();
  updateScale();
  if (logoContainer.value) {
    animate()
  }
  const isMobile = window.innerWidth <= 768 || /mobile/i.test(navigator.userAgent);
  if (!isMobile) {
    const homeNumBox = document.querySelectorAll('.home_num_box')
    // 创建 ScrollTrigger
    ScrollTrigger.create({
      trigger: homeNumBox, // 触发器元素
      start: 'top 90%', // 当元素顶部到达视口 80% 时触发
      end: 'bottom 50%', // 当元素底部到达视口 20% 时结束
      onEnter: () => {
        console.log('Element entered viewport!');
        source1.value = 3620000
        source2.value = 327000
        source3.value = 305000
      },
      onLeaveBack: () => {

      },
    });

    // 初始化所有需要动画的元素
    const animatedElements = [
      {el: '.gsap_one_title', y: 100},
      {el: '.four_img_two_img', y: 40, scale: 1},
      {el: '.gsap_two_title', y: 100},
      {el: '.four_img_three_img', y: 40, scale: 1},
      {el: '.gsap_three_title', y: 100},
      {el: '.four_img_one_img', y: 40, scale: 1}
    ]
    // 设置初始状态
    animatedElements.forEach(({el, y, scale = 1}) => {
      gsap.set(el, {
        opacity: 0,
        y: y,
        scale: scale,
        force3D: true
      })
    })
    // 创建动画
    animatedElements.forEach(({el, y, scale = 1}) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true, // 确保动画只执行一次
          markers: false
        }
      })
      // 文本元素动画
      if (el.includes('title')) {
        timeline.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        })
      }
      // 图片元素动画
      else {
        timeline.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out"
        })
      }
    })

    // 为 three_content_img 元素添加动画
    const threeContentImgs = document.querySelectorAll('.three_content_img')

    // 设置初始状态
    gsap.set(threeContentImgs, {
      opacity: 0,
      y: 60,
      scale: 1
    })

    // 创建动画时间线
    gsap.timeline({
      scrollTrigger: {
        trigger: threeContentImgs, // 直接使用 three_content_img 作为触发器
        start: 'top 85%', // 当元素顶部到达视口 85% 位置时触发
        end: 'bottom top',
        once: true,
        markers: false // 调试时可以看到触发位置
      }
    }).to(threeContentImgs, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: {
        amount: 0.8,
        from: "start"
      },
      ease: "power2.out"
    })

    // 为 five_img 元素添加动画
    const fiveImgElements = document.querySelectorAll('.five_img')

    // 设置初始状态
    gsap.set(fiveImgElements, {
      opacity: 0,
      y: 60,
      scale: 1
    })

    // 创建动画时间线
    gsap.timeline({
      scrollTrigger: {
        trigger: '.five_img_box', // 使用父容器作为触发器
        start: 'top 85%', // 当容器中部到达视口中部时触发
        end: 'bottom center',
        once: true,
        markers: false
      }
    }).to(fiveImgElements, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: {
        amount: 0.8, // 总动画持续时间
        from: "start" // 从左到右依次显示
      },
      ease: "power2.out"
    })
// 鼠标悬停时的动画
    fiveImgElements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.1, // 缩放比例变大
          duration: 0.5,
          ease: "power2.out"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1, // 恢复原始缩放比例
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });
    const eightSmallBgiOne = document.querySelector('.eight_small_bgi_one')
    const eightSmallBgiTwo = document.querySelector('.eight_small_bgi_two')

    // 设置初始状态
    gsap.set([eightSmallBgiOne, eightSmallBgiTwo], {
      opacity: 0,
      x: 10, // 从右侧开始
      force3D: true
    })

    // 创建动画时间线
    gsap.timeline({
      scrollTrigger: {
        trigger: '.home_eight_content', // 修改为 home_eight_content
        start: 'top 65%', // 当内容区域顶部到达视口 85% 位置时触发
        end: 'bottom center',
        once: true,
        markers: false // 设置为 true 可以在开发时查看触发位置
      }
    }).to([eightSmallBgiOne, eightSmallBgiTwo], {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: {
        amount: 0.2 // 两个元素的动画间隔
      },
      ease: "power2.out"
    })
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  } else {
    source1.value = 3620000
    source2.value = 327000
    source3.value = 305000
  }

  // 清理函数
  // 监听窗口大小变化
  window.addEventListener('resize', updateFontSize)
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }


})

onUnmounted(() => {
  clearInterval(interval);
  if (animationRef.value) {
    cancelAnimationFrame(animationRef.value)
  }

  // 移除监听窗口大小变化
  window.removeEventListener('resize', updateFontSize)
})


</script>

<template>
  <div class="home">
    <div class="home_one">
      <div class="home_one_image">
        <div class="home_text_content">
          <div class="home_title_text_ly">
            <div class="home_one_ri_small"></div>
            <div class="home_one_title">
              <div class="home_one_title_span_slide_in">
                <span>O</span>
                <span>P</span>
                <span>E</span>
                <span>N</span>
                <span>,</span>
                <span>C</span>
                <span>O</span>
                <span>M</span>
                <span>P</span>
                <span>O</span>
                <span>S</span>
                <span>A</span>
                <span>B</span>
                <span>L</span>
                <span>E</span>
                <span>&nbsp;</span>
                <span>A</span>
                <span>I</span>
                <span>&nbsp;</span>
                <span>D</span>
                <span>A</span>
                <span>T</span>
                <span>A</span>
              </div>
              <div class="home_one_title_span_slide_in_two">
                <span>I</span>
                <span>N</span>
                <span>F</span>
                <span>R</span>
                <span>A</span>
                <span>S</span>
                <span>T</span>
                <span>R</span>
                <span>U</span>
                <span>C</span>
                <span>T</span>
                <span>U</span>
                <span>R</span>
                <span>E</span>
                <span>&nbsp;</span>
                <span>E</span>
                <span>M</span>
                <span>P</span>
                <span>O</span>
                <span>W</span>
                <span>E</span>
                <span>R</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
              </div>
              <div class="home_one_title_span_slide_in_three">
                <span>T</span>
                <span>H</span>
                <span>E</span>
                <span>&nbsp;</span>
                <span>W</span>
                <span>E</span>
                <span>B</span>
                <span>3</span>
                <span>&nbsp;</span>
                <span>A</span>
                <span>I</span>
                <span>&nbsp;</span>
                <span>R</span>
                <span>E</span>
                <span>V</span>
                <span>O</span>
                <span>L</span>
                <span>U</span>
                <span>T</span>
                <span>I</span>
                <span>O</span>
                <span>N</span>
              </div>
            </div>
            <div class="home_one_title_small">
              <span class="home_one_title_span">OPEN, COMPOSABLE WEB3 AI DATA INFRASTRUCTURE EMPOWERING THE WEB3 AI REVOLUTION</span>
            </div>
            <div class="home_one_txt">
<!--              <div class="slider-container">-->
<!--                <div class="slider-content">-->
<!--                  <div v-for="(item, index) in home_one_words" :key="index" class="slider-item">-->
<!--                    {{ item }}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->

              <div class="carousel-container">
                <!-- 使用 transition 组件实现滑入滑出和淡入淡出 -->
                <transition :name="transitionName" mode="out-in">
                  <div :key="currentIndex" class="carousel-text">
                    {{ texts[currentIndex] }}
                  </div>
                </transition>
              </div>
            </div>
            <div class="home_one_txt_small">
              <div class="slider-container">
                <div class="slider-content">
                  <div v-for="(item, index) in home_one_words" :key="index" class="slider-item">
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
            <div class="home_one_btn">
              <div class="home_btn" @click="goAialaya">START</div>
            </div>
          </div>
          <div class="home_one_ri_ly">
            <div class="video_parent" data-framer-name="Orb" name="Orb"><!--$-->
              <video
                  ref="videoPlayerHeader"
                  class="video_style"
                  src="https://lshtest.oss-cn-hangzhou.aliyuncs.com/mp4/1b354094e7c51b228e42d1fcbfa5500a.mp4"
                  preload="auto"
                  poster="https://lshtest.oss-cn-hangzhou.aliyuncs.com/pic/zheng.jpg"
                  muted=""
                  playsinline=""
                  loop
                  autoplay=""></video>
            </div>
          </div>
        </div>
        <div class="home_num_box">
          <div class="home_num_box_item">
            <div class="home_num_box_sub">
              <img class="home_num_box_icon" src="@/assets/x2/registered.png" alt="">
              <div class="home_num_box_content">
                <img class="home_num_box_icon_mobile" src="@/assets/x2/registered.png" alt="">
                <el-statistic
                    class="home_num_box_title"
                    :value="outputValue1"
                    :value-style="`font-family: 'Arial'; font-weight: 700; font-size: ${fontSize}px; color: #1ae28e;`"
                >
                  <template #suffix>
                    <div class="home_num_box_title_add">+</div>
                  </template>
                </el-statistic>
                <div class="home_num_box_txt">Registered users</div>
              </div>
              <div class="home_num_box_txt_mobile">Registered users</div>
            </div>
          </div>
          <div class="home_num_box_item">
            <div class="home_num_box_sub">
              <img class="home_num_box_icon" src="@/assets/x2/user.png" alt="">
              <div class="home_num_box_content">
                <img class="home_num_box_icon_mobile" src="@/assets/x2/user.png" alt="">
                <el-statistic
                    class="home_num_box_title"
                    :value="outputValue2"
                    :value-style="`font-family: 'Arial'; font-weight: 700; font-size: ${fontSize}px; color: #1ae28e;`"
                >
                  <template #suffix>
                    <div class="home_num_box_title_add">+</div>
                  </template>
                </el-statistic>
                <div class="home_num_box_txt">Daily active users</div>
              </div>
              <div class="home_num_box_txt_mobile">Daily active users</div>
            </div>

          </div>
          <div class="home_num_box_item">
            <div class="home_num_box_sub">
              <img class="home_num_box_icon" src="@/assets/x2/chain.png" alt="">
              <div class="home_num_box_content">
                <img class="home_num_box_icon_mobile" src="@/assets/x2/chain.png" alt="">
                <el-statistic
                    class="home_num_box_title"
                    :value="outputValue3"
                    :value-style="`font-family: 'Arial'; font-weight: 700; font-size: ${fontSize}px; color: #1ae28e;`"
                >
                  <template #suffix>
                    <div class="home_num_box_title_add">+</div>
                  </template>
                </el-statistic>
                <div class="home_num_box_txt">Daily on-chain transactions</div>
              </div>
              <div class="home_num_box_txt_mobile">Daily on-chain transactions</div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="home_two">
      <div class="two_logo">
        <div class="logo_track">
          <div class="logo_wrapper">
            <div class="logo_container" ref="logoContainer">
              <!-- 第一组 logo -->
              <img v-for="(logo, index) in logos" :key="`first-${index}`" :src="logo" class="logo-item"
                   alt="partner logo">
              <!-- 第二组 logo，用于无缝衔接 -->
              <img v-for="(logo, index) in logos" :key="`second-${index}`" :src="logo" class="logo-item"
                   alt="partner logo">
            </div>
          </div>
        </div>
      </div>
      <div class="home_two_contain">
        <div class="two_txt">
          <span class="txt_green">Alaya Al </span> is an open, composable Web3 data sampling and
          auto-labelling Al infrastructure.
        </div>
        <div class="two_video">
          <video class="two_video_img" ref="videoPlayer" @play="onPlay" @pause="onPause" playsinline="true"
                 @ended="onEnded" controls
                 :poster="coverImage"
          >
            <source src="https://object-aialaya-new.s3.ap-southeast-1.amazonaws.com/web_static/site/Alaya-AI-V.mp4"
                    type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>

        <div class="two_txt_two">
          Inspired by swarm intelligence systems, <span class="txt_green">Alaya Al</span> provides tailored
          data sampling for enterprise applications and small-medium developers through
          customisable Web3 incentives and RLHF/HITL precision sampling.
        </div>
      </div>
    </div>
    <div class="home_four">
      <div class="four_item_box">
        <div class="four_item_box_content">
          <div class="gsap_one_title">
            <div class="four_title">Distributed Al Data Ecosystem</div>
            <div class="four_txt">Distributed data ecosystems combine the best of Web2 and Web3 into a
              universal platform that allows anyone to monetise idle time by contributing AI data.
            </div>
            <div class="four_more pointer_txt" @click="goOne">
              <span class="pointer_text">More</span>
              <span class="pointer_arrow">→</span></div>
          </div>
          <div class="four_img_one">
            <img class="four_img_two_img" src="@/assets/four-two-aia.png" alt="">
          </div>
        </div>
      </div>
      <div class="four_item_box">
        <div class="four_item_box_content">
          <div class="gsap_two_title">
            <div class="four_title">Open Data Platform</div>
            <div class="four_txt" style="">An open data marketplace to support organic Web3 dataset
              bootstrapping through custom reward pools, directly on-chain or off-chain.
            </div>
            <div class="four_more pointer_txt" @click="goTwo">
              <span class="pointer_text">More</span>
              <span class="pointer_arrow">→</span>
            </div>
          </div>
          <div class="four_img_two">
            <img class="four_img_three_img" src="@/assets/x2/four-three-aia.png" alt="">
          </div>
        </div>
      </div>
      <div class="four_item_box">
        <div class="four_item_box_content">

          <div class="gsap_three_title">
            <div class="four_title">AI Data Auto-Labelling Toolset</div>
            <div class="four_txt" style="">Unlock the true potential of AI and turbocharge your data efficiency
              with our proprietary AI auto-labelling technologies.
            </div>
            <div class="four_more pointer_txt" @click="goThree">
              <span class="pointer_text">More</span>
              <span class="pointer_arrow">→</span>
            </div>
          </div>
          <div class="four_img_three">
            <img class="four_img_one_img" src="@/assets/four-aia.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="home_three">
      <div class="home_three_circle_small"></div>
      <div class="home_three_circle_big"></div>
      <div class="three_content">
        <div class="three_title">Multimodal Datasets</div>

        <div class="three_content_title">
          Alaya Al is the first Web3-native Al data platform to support a wide range of Al
          data to satisfy diverse model training requirements for a global customer base.
        </div>
        <div class="three_content_img_box">
          <div class="three_content_img" v-for="item in threeImg">
            <img class="three_content_img_img" :src="item.img" alt="">
            <span class="three_content_img_txt">{{ item.txt }} {{ item.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="home_five">
      <img class="home_five_img" :src="five_img" alt=""/>
      <div class="home_five_content">
        <div class="home_five_title">Why choose <span class="five_color_green">ALAYA AI </span> ?</div>
        <div class="five_img_box">
          <img class="five_img" src="@/assets/five-one.png" alt="">
          <img class="five_img" src="@/assets/five-two.png" alt="">
          <img class="five_img" src="@/assets/five-four.png" alt="">
          <img class="five_img" src="@/assets/five-three.png" alt="">
        </div>
        <div class="five_img_box_small">
          <img class="five_img" src="@/assets/five-one.png" alt="">
          <img class="five_img" src="@/assets/five-two.png" alt="">
          <img class="five_img" src="@/assets/five-three.png" alt="">
          <img class="five_img" src="@/assets/five-four.png" alt="">
        </div>
      </div>
    </div>
    <div class="home_seven">
      <div style="position: relative">
        <img class="home_seven_bg" src="@/assets/x2/seven_bg.png" alt="">
        <img class="home_seven_img" src="@/assets/seven-img.png" alt="">
        <img class="home_seven_img_small" src="@/assets/x2/plan.png" alt="">
      </div>
    </div>
    <div class="home_eight">
      <div class="home_eight_bgi">
        <div class="home_eight_content" style="">

          <!-- <div class="gsap_bot" style="background-color: skyblue;">
              <img class="eight_small_bgi_one" style="background-color: pink;" src="@/assets/small/eight-bot-bgi.svg" alt="">
              <img class="eight_small_bgi_two" style=" background-color: yellowgreen;" src="@/assets/small/eight-bot.svg" alt="">
          </div> -->
          <div class="home_eight_title" style="text-align: left;">
            <div class="home_eight_title_top">
              <span class="home_eight_title_top_txt">To Become a </span>
              <span class="color_green">Knowledge Provider</span>
            </div>
            <div class="eight_txt">• Do you have an email address?</div>
            <div class="eight_txt">• Do you have a wallet?</div>
            <div class="eight_txt">• Do you have social media?</div>
            <div class="eight_btn pointer_txt" @click="goAialaya">
              <span class="eight_btn_txt">Claim your Alaya NFT now →</span>
            </div>
          </div>
          <div class="gsap_bot" style="flex: 1; position: relative;">
            <img class="eight_small_bgi_one" src="@/assets/small/eight-bot-bgi.svg" alt="">
            <img class="eight_small_bgi_two" src="@/assets/small/eight-bot.svg" alt="">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
  padding-top: 88px;
  transition: padding-top 0.3s ease;
  background: linear-gradient(to bottom, white 20%, transparent 33%);
  background-size: 100%;
  background-position: 0 0;
}

.home.expanded {
  padding-top: 188px;
}

.home_one {
  background: white;
}

.home_one_image {
  background: linear-gradient(to bottom, rgba(238, 238, 238, 0), #e4fff1) no-repeat bottom, #FBFFFD;
  background-size: 100% 293px, 100% 100%;
  margin-top: calc(-100px * v-bind(scale));
  padding-top: calc(100px * v-bind(scale));
}

.home_one_title {
  font-family: 'Arial Black', sans-serif; /* 使用定义的字体 */
  font-size: 38px;
  line-height: 1.5;
  font-weight: 900;
  text-align: right;
  letter-spacing: 0.76px;
  line-height: 1.6;
}

.carousel-container {
  width: calc(150%);
  margin-right: -50%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: right;
  overflow: hidden;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  position: relative;
}

.carousel-text {
  text-align: right;
  position: absolute;
  background-image: radial-gradient(circle at 51% 50%, #59ff2e, rgba(98, 230, 255, 0.98) 100%);
  background-size: 60% 100%; /* 宽度 60%，高度 100% */
  background-position: left; /* 背景固定在左侧 */
  background-repeat: no-repeat; /* 禁止重复 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-right: 33%;
  font-size: 32px;
  font-family: 'PingFangSC';
}

/* 左侧滑入动画 */
.slide-left-enter-active {
  transition: all 0.5s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-50%);
}

.slide-left-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-left-leave-active {
  transition: all 0.5s ease;
}

.slide-left-leave-from {
  opacity: 1;
}

.slide-left-leave-to {
  opacity: 0;
}

/* 右侧滑出动画 */
.slide-right-enter-active {
  transition: all 0.5s ease;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-right-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-right-leave-active {
  transition: all 0.5s ease;
}

.slide-right-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.home_one_title_small {
  display: none;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 0.67px;
}

.home_text_content {
  display: flex;
  flex-flow: row nowrap;
  padding-bottom: 100px;
}

.home_title_text_ly {
  display: flex;
  flex-flow: column nowrap;
  padding-top: 152px;
  padding-right: calc(50px * v-bind(scale));
  flex: 12;
}

.home_one_ri_ly {
  flex: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video_parent {
  width: 550px;
  height: 550px;
  margin-right: 100px;
  margin-top: 30px;
  background-image: url('@/assets/home-one-video-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video_style {
  cursor: auto;
  width: 70%;
  height: 70%;
  border-radius: 0px;
  display: block;
  object-fit: cover;
  background-color: rgba(255, 0, 0, 0);
  object-position: 50% 50%;
  mix-blend-mode: darken;
}

.home_one_ri_small {
  display: none;
}

.home_one_ri {
  width: calc(588px * v-bind(scale));
  margin-right: 86px;
  margin-top: 25px;
}

.home_one_title_span {
  color: #515151;
}

.home_one_title_span_slide_in {
  color: #515151;
  overflow: hidden; /* 隐藏超出容器的内容 */
  white-space: nowrap; /* 防止文本换行 */
  animation: slideInRight 0.7s forwards; /* 动画效果 */
}

@keyframes slideInRight {
  from {
    transform: translateX(-10%);
  }
  to {
    transform: translateX(0);
  }
}


.home_one_title_span_slide_in span {
  display: inline-block;
  opacity: 0;
  animation: slideIn 0.1s forwards; /* 动画效果 */
}

.home_one_title_span_slide_in_two {
  color: #515151;
  overflow: hidden; /* 隐藏超出容器的内容 */
  white-space: nowrap; /* 防止文本换行 */
  animation: blink 0.2s 1.9s 1, /* 闪烁动画，延迟 2 秒开始，闪烁 2 次 */ slideInRight 0.9s 0.48s forwards; /* 动画效果 */
}

.home_one_title_span_slide_in_two span {
  display: inline-block;
  opacity: 0;
  animation: slideIn 0.1s forwards; /* 动画效果 */
}

.home_one_title_span_slide_in_three {
  color: #515151;
  overflow: hidden; /* 隐藏超出容器的内容 */
  white-space: nowrap; /* 防止文本换行 */
  animation: blink 0.2s 1.5s 1, /* 闪烁动画，延迟 2 秒开始，闪烁 2 次 */ slideInRight 0.4s 0.9s forwards; /* 动画效果 */
}

.home_one_title_span_slide_in_three span {
  display: inline-block;
  opacity: 0;
  animation: slideIn 0.1s forwards; /* 动画效果 */
}

/* 为每个字母设置不同的动画延迟 */
.home_one_title_span_slide_in span:nth-child(1) {
  animation-delay: 0.03s;
}

.home_one_title_span_slide_in span:nth-child(2) {
  animation-delay: 0.06s;
}

.home_one_title_span_slide_in span:nth-child(3) {
  animation-delay: 0.09s;
}

.home_one_title_span_slide_in span:nth-child(4) {
  animation-delay: 0.12s;
}

.home_one_title_span_slide_in span:nth-child(5) {
  animation-delay: 0.15s;
}

.home_one_title_span_slide_in span:nth-child(6) {
  animation-delay: 0.18s;
}

.home_one_title_span_slide_in span:nth-child(7) {
  animation-delay: 0.21s;
}

.home_one_title_span_slide_in span:nth-child(8) {
  animation-delay: 0.24s;
}

.home_one_title_span_slide_in span:nth-child(9) {
  animation-delay: 0.27s;
}

.home_one_title_span_slide_in span:nth-child(10) {
  animation-delay: 0.3s;
}

.home_one_title_span_slide_in span:nth-child(11) {
  animation-delay: 0.33s;
}

.home_one_title_span_slide_in span:nth-child(12) {
  animation-delay: 0.36s;
}

.home_one_title_span_slide_in span:nth-child(13) {
  animation-delay: 0.39s;
}

.home_one_title_span_slide_in span:nth-child(14) {
  animation-delay: 0.42s;
}

.home_one_title_span_slide_in span:nth-child(15) {
  animation-delay: 0.45s;
}

.home_one_title_span_slide_in span:nth-child(16) {
  animation-delay: 0.48s;
}

.home_one_title_span_slide_in span:nth-child(17) {
  animation-delay: 0.51s;
}

.home_one_title_span_slide_in span:nth-child(18) {
  animation-delay: 0.54s;
}

.home_one_title_span_slide_in span:nth-child(19) {
  animation-delay: 0.57s;
}

.home_one_title_span_slide_in span:nth-child(20) {
  animation-delay: 0.6s;
}

.home_one_title_span_slide_in span:nth-child(21) {
  animation-delay: 0.63s;
}

.home_one_title_span_slide_in span:nth-child(22) {
  animation-delay: 0.66s;
}

.home_one_title_span_slide_in span:nth-child(23) {
  animation-delay: 0.69s;
}


/* 为每个字母设置不同的动画延迟 */
.home_one_title_span_slide_in_two span:nth-child(1) {
  animation-delay: 0.48s;
}

.home_one_title_span_slide_in_two span:nth-child(2) {
  animation-delay: 0.52s;
}

.home_one_title_span_slide_in_two span:nth-child(3) {
  animation-delay: 0.56s;
}

.home_one_title_span_slide_in_two span:nth-child(4) {
  animation-delay: 0.61s;
}

.home_one_title_span_slide_in_two span:nth-child(5) {
  animation-delay: 0.65s;
}

.home_one_title_span_slide_in_two span:nth-child(6) {
  animation-delay: 0.69s;
}

.home_one_title_span_slide_in_two span:nth-child(7) {
  animation-delay: 0.74s;
}

.home_one_title_span_slide_in_two span:nth-child(8) {
  animation-delay: 0.78s;
}

.home_one_title_span_slide_in_two span:nth-child(9) {
  animation-delay: 0.82s;
}

.home_one_title_span_slide_in_two span:nth-child(10) {
  animation-delay: 0.86s;
}

.home_one_title_span_slide_in_two span:nth-child(11) {
  animation-delay: 0.9s;
}

.home_one_title_span_slide_in_two span:nth-child(12) {
  animation-delay: 0.94s;
}

.home_one_title_span_slide_in_two span:nth-child(13) {
  animation-delay: 0.98s;
}

.home_one_title_span_slide_in_two span:nth-child(14) {
  animation-delay: 1.02s;
}

.home_one_title_span_slide_in_two span:nth-child(15) {
  animation-delay: 1.06s;
}

.home_one_title_span_slide_in_two span:nth-child(16) {
  animation-delay: 1.1s;
}

.home_one_title_span_slide_in_two span:nth-child(17) {
  animation-delay: 1.14s;
}

.home_one_title_span_slide_in_two span:nth-child(18) {
  animation-delay: 1.18s;
}

.home_one_title_span_slide_in_two span:nth-child(19) {
  animation-delay: 1.22s;
}

.home_one_title_span_slide_in_two span:nth-child(20) {
  animation-delay: 1.24s;
}

.home_one_title_span_slide_in_two span:nth-child(21) {
  animation-delay: 1.28s;
}

.home_one_title_span_slide_in_two span:nth-child(22) {
  animation-delay: 1.32s;
}

.home_one_title_span_slide_in_two span:nth-child(23) {
  animation-delay: 1.36s;
}

.home_one_title_span_slide_in_two span:nth-child(24) {
  animation-delay: 1.4s;
}

.home_one_title_span_slide_in_two span:nth-child(25) {
  animation-delay: 1.44s;
}


/* 为每个字母设置不同的动画延迟 */
.home_one_title_span_slide_in_three span:nth-child(1) {
  animation-delay: 0.9s;
}

.home_one_title_span_slide_in_three span:nth-child(2) {
  animation-delay: 0.92s;
}

.home_one_title_span_slide_in_three span:nth-child(3) {
  animation-delay: 0.94s;
}

.home_one_title_span_slide_in_three span:nth-child(4) {
  animation-delay: 0.96s;
}

.home_one_title_span_slide_in_three span:nth-child(5) {
  animation-delay: 0.98s;
}

.home_one_title_span_slide_in_three span:nth-child(6) {
  animation-delay: 1s;
}

.home_one_title_span_slide_in_three span:nth-child(7) {
  animation-delay: 1.02s;
}

.home_one_title_span_slide_in_three span:nth-child(8) {
  animation-delay: 1.04s;
}

.home_one_title_span_slide_in_three span:nth-child(9) {
  animation-delay: 1.06s;
}

.home_one_title_span_slide_in_three span:nth-child(10) {
  animation-delay: 1.08s;
}

.home_one_title_span_slide_in_three span:nth-child(11) {
  animation-delay: 1.1s;
}

.home_one_title_span_slide_in_three span:nth-child(12) {
  animation-delay: 1.12s;
}

.home_one_title_span_slide_in_three span:nth-child(13) {
  animation-delay: 1.14s;
}

.home_one_title_span_slide_in_three span:nth-child(14) {
  animation-delay: 1.16s;
}

.home_one_title_span_slide_in_three span:nth-child(15) {
  animation-delay: 1.18s;
}

.home_one_title_span_slide_in_three span:nth-child(16) {
  animation-delay: 1.2s;
}

.home_one_title_span_slide_in_three span:nth-child(17) {
  animation-delay: 1.22s;
}

.home_one_title_span_slide_in_three span:nth-child(18) {
  animation-delay: 1.24s;
}

.home_one_title_span_slide_in_three span:nth-child(19) {
  animation-delay: 1.26s;
}

.home_one_title_span_slide_in_three span:nth-child(20) {
  animation-delay: 1.28s;
}

.home_one_title_span_slide_in_three span:nth-child(21) {
  animation-delay: 1.30s;
}

.home_one_title_span_slide_in_three span:nth-child(22) {
  animation-delay: 1.32s;
}


@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0); /* 最终位置在正常位置 */
  }
}

/* 闪烁动画 */
@keyframes blink {
  0%, 100% {
    opacity: 1; /* 完全不透明 */
  }
  50% {
    opacity: 0; /* 完全透明 */
  }
}

.home_one_txt {
  padding-top: 60px;
  font-size: 16px;
  display: flex;
  flex-flow: column nowrap;
  align-items: end;
  transform: translateX(-100%);
  animation: homeOneSlideIn 0.5s 2.1s forwards; /* 应用动画 */
}

@keyframes homeOneSlideIn {
  0% {
    opacity: 0;
    transform: translateX(-100%); /* 从左侧外部开始 */
  }
  100% {
    opacity: 1;
    transform: translateX(0); /* 移动到正常位置 */
  }
}

.slider-container {
  width: 500px;
  overflow: hidden;
}

.slider-content {
  display: flex;

  width: calc(500px * 4);
  animation: slide 8s infinite;
}

.slider-item {
  min-width: 500px;
  height: 40px;
  display: flex;
  align-items: end;
  justify-content: end;
  background-image: radial-gradient(circle at 51% 50%, #59ff2e, rgba(98, 230, 255, 0.98) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 32px;
  text-align: right;
  width: 500px;
  font-family: 'PingFangSC';
}

/* 定义滚动动画 */
@keyframes slide {
  0%, 25% {
    transform: translateX(-1500px);
  }
  33%, 58% {
    transform: translateX(-1000px);
  }
  66%, 91% {
    transform: translateX(-500px);
  }
  100% {
    transform: translateX(0);
  }
}


/* 定义滚动动画 */
@keyframes slide-small {
  0%, 25% {
    transform: translateX(0);
  }
  33%, 58% {
    transform: translateX(-300px);
  }
  66%, 91% {
    transform: translateX(-600px);
  }
  100% {
    transform: translateX(-900px);
  }
}


.home_one_txt_small {
  font-size: 20px;
  padding-top: 68px;
  display: none;
}

.txt_green {
  color: #1ae28e;
}

.home_one_btn {
  display: flex;
  justify-content: end;
  align-items: end;
  padding: 71px 0 45px 0;
}

.home_btn {
  font-family: 'Arial';
  width: 180px;
  height: 56px;
  background-color: #1ae28e;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 900;
  color: #191933;
  cursor: pointer;
  transition: background-color .15s ease;
  border-radius: 28px;
  box-shadow: 0 10px 28px 0 rgba(39, 125, 63, 0.13);
  background-image: linear-gradient(to right, #38f3df 39%, #36ffab);
}

.home_btn:hover {
  background-color: #14E990;
}

.home_btn_google {
  margin-left: 20px;
  width: 180px;
  height: 56px;
}

.home_num_box {
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 90px;
}

.home_num_box_item {
  display: flex;
  flex-flow: row nowrap;
}

.home_num_box_sub {
  text-align: left;
  display: flex;
  align-items: center;
}

.home_num_box_content {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
}

.home_num_box_icon {
  width: 50px;
  margin-right: 14px;
}

.home_num_box_icon_mobile {
  display: none;
}

.home_num_box_title {
  font-family: 'Arial';
  font-weight: normal;
  font-size: 36px;
  color: #1ae28e;
}

.home_num_box_title_add {
  font-family: 'Arial';
  font-size: 36px;
  color: #0a091c;
}

.home_num_box_txt {
  font-size: 18px;
  padding-top: 5px;
  color: #0a091c;
  font-family: 'PingFangSC';
}

.home_num_box_txt_mobile {
  display: none;
  color: #0a091c;
}

.home_two {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #0a091c;
  box-sizing: border-box;
  background-color: #fff;
}


.home_two_contain {
  max-width: 1200px;
  margin: 0 auto;
}

/* .three_content_title {
    max-width: 1200px;
    padding-top: 50px;
    font-size: 22px;
} */
.two_logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 115px;
  overflow: hidden;
  box-shadow: 0 20px 28px 0 rgba(233, 233, 233, 0.5);
  background-color: #fff;
}

.logo_track {
  width: 100%;
  overflow: hidden;
}

.logo_wrapper {
  width: 100%;
  overflow: hidden;
}

.logo_container {
  display: flex;
  align-items: center;
  gap: 60px;
  padding: 0 30px;
  animation: marquee 30s linear infinite;
  width: max-content;
}

.logo-item {
  height: 38px;
  object-fit: contain;
  flex-shrink: 0;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

/* 鼠标悬停时暂停动画 */
.logo_container:hover {
  animation-play-state: paused;
}

@media screen and (max-width: 768px) {
  .logo-item {
    height: 30px;
  }

  .logo_container {
    gap: 30px;
  }
}

.home_two_contain {
  padding: 0 200px;
}

.two_video {
  width: 100%;
}

.two_txt {
  text-align: left;
  padding: 150px 0 50px 0;
  font-family: 'Abril';
  font-size: 40px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 1px;
}

.two_txt_two {
  text-align: left;
  padding-top: 50px;
  font-size: 28px;
  color: #0a091c;
  padding-bottom: 200px;
}

.two_video_img {
  width: 100%;
  border-radius: 12px;
}

.home_three {
  display: flex;
  justify-content: center;
  background-color: rgba(15, 15, 29, 1);
  position: relative;
}

.home_three_circle_small {
  position: absolute;
  bottom: 0;
  left: 10%;
  width: calc(94px * v-bind(scale));
  height: calc(94px * v-bind(scale));
  border-radius: 50%;
  background-image: linear-gradient(225deg,
  rgba(50, 255, 184, 0.44),
  rgba(182, 32, 224, 0.04) 30%,
  rgba(182, 32, 224, 0.04) 70%,
  rgba(247, 181, 0, 0.19));
}

.home_three_circle_big {
  position: absolute;
  top: 10%;
  right: 20%;
  width: calc(264px * v-bind(scale));
  height: calc(264px * v-bind(scale));
  border-radius: 50%;
  background-image: linear-gradient(225deg,
  rgba(50, 255, 184, 0.44),
  rgba(182, 32, 224, 0.04) 30%,
  rgba(182, 32, 224, 0.04) 70%,
  rgba(247, 181, 0, 0.19));
}

.home_three_border_left {
  position: absolute;
  width: 230px;
  top: -350px;
  right: 0;
}

.three_title {
  font-family: 'Abril';
  font-weight: 700;
  padding-top: 100px;
  background: var(--logo, linear-gradient(to bottom, #38f3c1, #1ae28e));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-size: 80px;

}

.three_content {
  max-width: 1200px;
  /* width: 1080px; */
  padding-bottom: 200px;
}

.three_content_title {
  padding-top: 50px;
  font-size: 22px;
}

.three_content_img_box {
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: end;
  gap: 50px;
  padding-top: 150px;
  margin: 0 auto;
  box-sizing: border-box;
}

.three_content_img_txt {
  font-size: 20px;
  line-height: 1.5;
  padding-top: 10px;
  color: #f1f1f1;
}

.three_content_img_img {
  height: 150px;
  margin-bottom: 30px;
}

.three_content_img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home_four {
  color: #515151;
  background: linear-gradient(to bottom, rgba(238, 238, 238, 0), #c3ffdf),
  url('@/assets/x2/home_two_bg.png'),
  #ffffff;
  background-position: bottom, center calc(200px * v-bind(scale)), top;
  background-size: 100% 334px, 100% auto, cover;
  background-repeat: no-repeat;
}

.four_border_left {
  width: 120px;
  position: absolute;
  top: -250px;
  left: 0;
}

.four_txt {
  font-size: 25px;
  padding-top: 20px;
}

.four_more {
  width: 80px;
  color: #191933;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 50px;
  margin-top: 80px;
  background-image: linear-gradient(to left, #38f3df, #36ffab 39%);
}

.pointer_text, .pointer_arrow {
  display: inline-block;
  vertical-align: middle;
}

.pointer_arrow {
  margin-left: 6px;
  margin-top: 3px;
}

.four_img_one {
  width: 100%;
  display: flex;
  justify-content: end;
  /* margin-top: 100px; */
}

.four_img_one_img {
  width: 850px;
  padding-right: 150px;
  padding-bottom: 50px;
}

.four_img_two {
  display: flex;
  justify-content: end;
}

.four_img_two_img {
  height: 700px;
}

/* 添加图片悬停效果 */
.four_img_two_img,
.four_img_three_img,
.four_img_one_img {
  pointer-events: none;
}

.four_img_three {
  display: flex;
  justify-content: end;
}

.four_img_three_img {
  width: 700px;
  padding-right: 150px;
  padding-bottom: 50px;
}

.distributed_img {
  background-image: url('@/assets/four-img-one.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.four_item_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  box-sizing: border-box;
  color: #0a091c;
}

.four_item_box_content {
  max-width: 1200px;
  padding-bottom: 100px;
}

.four_title {
  font-family: 'Abril';
  color: #0a091c;
  font-size: 50px;
}


.four_two_img {
  background-image: url('@/assets/four-two.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.four_three_img {
  background-image: url('@/assets/four-three.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.home_five {
  padding-bottom: 100px;
  position: relative;
}

.home_five_img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.five_img_box {
  max-width: 1280px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 60px;
  margin: 0 auto;
}

.five_img_box_small {
  max-width: 1280px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 60px;
  margin: 0 auto;
  display: none;
}

.home_five_title {
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Abril';
  font-weight: 700;
  font-size: 60px;
  padding-bottom: 100px;
  /* padding: 100px 0; */
}

.five_color_green {
  color: #1ae28e;
}

.five_img {
  width: 240px;
}

.five_img:hover {
  transform: scale(1.1);
}

.home_six_content {
  width: 980px;
  margin: 0 auto;
}

.grey_txt {
  font-size: 60px;
  background: linear-gradient(179deg, #F1F1F2 .72%, #9B9B9B 85.23%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}


.home_six_txt {
  padding: 50px 0;
  /* font-family: 'Lexend'; */
  line-height: 1.5;
  font-size: 20px;
  color: #fff;
}

.six_content_one {
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
}

.gezi_box {
  margin-top: 20px;
  height: 220px;
  width: 220px;
  border: 2px solid #43ffb0;
  border-radius: 18px;
}

.gezi_txt {
  font-size: 25px;
  padding-bottom: 20px;
}

.arrow_txt {
  font-size: 12px;
  color: #bebebe;
}

.six_jiantou_img {
  width: 250px;
}

.six_bottom {
  padding: 100px 0;
}

.six_bottom_content {
  display: flex;
  gap: 50px;
  justify-content: center;
  padding: 30px;
  align-items: center;
}

.six_bottom_item {
  transition: all .15s linear;
  cursor: pointer;
  background: linear-gradient(to bottom, #7eaaff, #41e2a6);
  padding: 3px;
  border-radius: 18px;
  box-sizing: border-box;
}

.six_bottom_item_one {
  transition: all .15s linear;
  cursor: pointer;
  background: linear-gradient(to bottom, #7eaaff, #41e2a6);
  padding: 3px;
  border-radius: 18px;
}

.six_bottom_item_img {
  width: 100px;
}

.six_bottom_item_content {
  background-color: #1A1B23;
  padding: 70px 90px;
  border-radius: 18px;
}

.six_bottom_item_content_one {
  background-color: #1A1B23;
  padding: 50px;
  border-radius: 18px;
}

.six_bottom_center_title {
  font-size: 30px;
  /* font-family: 'Lexend';  */
  padding: 20px 0;
}

.six_bottom_desc {
  font-size: 18px;
  padding: 20px 0;
}

.home_seven {
  padding: 100px 80px;
  margin: 0 auto;
}

.home_seven_bg {
  width: 400px;
  position: absolute;
  top: -50px;
  left: 50%;
}

.home_seven_img {
  max-width: 1200px;
  width: 100%;
}

.home_seven_img_small {
  width: 100%;
  display: none;
}

.color_green {
  font-family: 'Abril';
  font-size: 45px;
  background: var(--logo, linear-gradient(223deg, #67DC57 8.77%, #4DC972 46.71%, #43DD9B 74.79%, #41E2A6 91.22%));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.home_eight {
  background-color: #fff;
  color: #000;

  .home_eight_bgi {
    background-size: contain;
    background-position: right;
    background-repeat: no-repeat;
  }

  .home_eight_content {
    width: 100%;
    display: flex;
    position: relative;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .eight_small_bgi_one {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 520px;
  }

  .eight_small_bgi_two {
    position: absolute;
    bottom: 0;
    right: 100px;
    width: 400px;
  }

  .home_eight_content {
    width: 1280px;
    margin: 0 auto;
  }

  .eight_txt {
    /* font-family: 'Lexend'; */
    font-size: 30px;
    line-height: 2;
  }

  .home_eight_title {
    padding: 60px 0;
  }

  .home_eight_title_top {
    padding-top: 50px;
    padding-bottom: 20px;
  }

  .home_eight_title_top_txt {
    font-family: 'Abril';
    font-size: 43px;
    font-weight: 700;
    color: #000;
  }

  .eight_btn_txt {
    font-size: 30px;
  }

  .eight_btn {
    margin-top: 45px;
    width: 480px;
    height: 72px;
    border-radius: 18px;
    background: var(--Linear, linear-gradient(-90deg, #c1ffce 0%, #a5f4ff 100%));
    box-sizing: border-box;
    padding: 0 20px;
    color: #fff;
    font-family: Lexend;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    box-sizing: border-box;
  }

}


/* 响应式样式 */
@media screen and (max-width: 1440px) {
  .home_seven {
    padding: 0 80px 50px 80px;
  }
}

@media screen and (max-width: 1220px) {
  .four_item_box_content {
    padding: 0 100px;
  }

  .home_two_contain {
    padding: 0 100px;

    .two_txt {
      /* font-size: 40px; */
      padding: 100px 0 50px 0;
    }
  }

  .home_seven {
    padding: 0 80px 50px 80px;
    /* width: 100%; */
  }
}

@media screen and (max-width: 768px) {

  .home {
    width: 100%;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    padding-top: 60px;
    transition: padding-top 0.3s ease;
  }

  .home_one_image {
    background: url('@/assets/home-one-bgi.png') no-repeat top, linear-gradient(to bottom, rgba(238, 238, 238, 0), #e4fff1) no-repeat bottom;
    background-size: 100% auto, 100% 293px;
    margin-top: calc(-100px * v-bind(scale));
    padding-top: calc(100px * v-bind(scale));
  }

  .home_title_text_ly {
    display: flex;
    flex-flow: column nowrap;
    padding-top: 20px;
    padding-right: 0;
    flex: 1;
  }

  .home_title_text_ly {
    display: flex;
    flex-flow: column nowrap;
    padding-top: 50px;
    padding-right: 0;
    flex: 1;
  }

  .home_one_ri_ly {
    display: none;
  }

  .home_one_ri_small {
    display: block;
    width: 150px;
    height: 150px;
    margin-left: 63%;
  }

  .home_text_content {
    display: flex;
    flex-flow: row nowrap;
    padding-bottom: 100px;
  }

  .home_one_bottom {
    display: none;
  }

  .home_one_title {
    display: none;
  }

  .home_one_title_small {
    font-family: 'Abril';
    display: block;
    font-size: 30px;
    padding: 0 50px;
  }

  .home_one_txt {
    display: none;
  }

  .home_one_txt_small {
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider-item {
    text-align: center;
  }

  .home_one_txt {
    font-size: 16px;
    padding: 30px 20px;
  }

  .home_one_btn {
    padding: 50px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .home_num_box {
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 20px;
  }

  .home_num_box_icon {
    width: 20px;
    margin-right: 10px;
  }

  .home_num_box_title {
    font-size: 14px;
  }

  .home_num_box_title_add {
    font-size: 14px;
  }

  .home_num_box_txt {
    padding-top: 5px;
    font-size: 10px;
  }

  .home_btn {
    width: 140px;
    height: 46px;
    font-size: 16px;
  }

  .home_two_contain {
    padding: 0 30px;

    .two_txt {
      font-size: 28px;
      padding: 100px 0 50px 0;
    }

    .two_txt_two {
      font-size: 26px;
      padding: 20px 0 100px 0;
    }
  }

  .four_item_box_content {
    padding: 0 30px;

    .four_more {
      margin-top: 20px;
      padding: 10px 20px;
    }

    .four_img_one {
      margin-top: 40px;
    }

    .four_img_two_img {
      width: 100%;
      height: auto;
      padding-right: 0;
      padding-top: 20px;
      padding-bottom: 40px;
    }

    .four_img_three_img {
      width: 100%;
      padding-right: 0;
      padding-top: 80px;
      padding-bottom: 20px;
    }

    .four_title {
      padding-top: 50px;
      font-size: 36px;
    }

    .four_txt {
      font-size: 16px;
    }

    .four_img_one_img {
      width: 100%;
      padding-right: 0;
      padding-top: 80px;
      padding-bottom: 50px;
    }
  }

  .three_content {
    padding-bottom: 100px;

    .three_title {
      font-size: 58px;
    }

    .three_content_title {
      padding-left: 30px;
      padding-right: 30px;
      padding-top: 15px;
    }

    .three_content_img_box {
      padding: 0 30px;
      padding-top: 80px;
      gap: 10px;
    }

    .three_content_img {
      width: 160px;
    }

    .three_content_img_img {
      width: 120px;
    }

    .three_content_img_txt {
      font-size: 14px;
    }
  }

  .home_five_content {
    .five_img_box {
      display: none;
    }

    .five_img_box_small {
      display: block;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 0 0px;
      gap: 50px;
    }

    .home_five_title {
      font-size: 46px;
    }
  }

  .home_seven {
    width: 100%;
    padding: 0;
    /* padding: 0 50px 20px 50px; */
  }

  .home_eight {
    width: 100%;
    padding: 0 50px;

    .home_eight_content {
      height: 100%;
      width: 100%;
      padding: 0 20px;
    }

    .home_eight_title {
      padding: 20px 0;
    }

    .home_eight_title_top {
      padding-top: 16px;
    }

    .home_eight_title_top_txt {
      font-size: 24px;
    }

    .color_green {
      font-size: 26px;
    }

    .eight_txt {
      font-size: 16px;
    }

    .eight_btn {
      width: 260px;
      height: 30px;
      font-size: 10px;
      padding: 20px 10px;
      margin: 20px 0;
    }

    .eight_btn_txt {
      font-size: 16px;
    }

    .eight_small_bgi_one {
      position: absolute;
      bottom: 0;
      right: 90px;
      width: 240px;
    }

    .eight_small_bgi_two {
      position: absolute;
      bottom: 0;
      right: 120px;
      width: 200px;
    }
  }
}

@media screen and (max-width: 440px) {
  .home_one {
    padding-top: 20px;

    .home_one_image {
      background-image: url('@/assets/home-one-bga.png');
      background-size: 100% auto;
      background-position: center -15px;
      background-repeat: no-repeat;
      margin-top: -60px;
      position: relative;
    }

    .home_title_text_ly {
      display: flex;
      flex-flow: column nowrap;
      padding-top: 20px;
      padding-right: 0;
      flex: 1;
    }

    .home_text_content {
      display: flex;
      flex-flow: row nowrap;
      padding-bottom: 0;
    }

    .home_one_title_small {
      font-size: 17px;
    }

    .home_one_txt_small {
      padding-top: 30px;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
    }


    .slider-container {
      width: 300px;
      overflow: hidden;
    }

    /* 滚动内容样式 */

    .slider-content {
      display: flex;
      width: calc(300px * 4);
      animation: slide-small 8s infinite;
    }

    /* 滚动项样式 */

    .slider-item {
      min-width: 300px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: radial-gradient(circle at 51% 50%, #59ff2e, rgba(98, 230, 255, 0.98) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 15px;
      text-align: center;
      width: 300px;
    }

    .home_one_btn {
      padding: 50px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .home_num_box {
      display: flex;
      justify-content: space-evenly;
      padding-bottom: 40px;
    }

    .home_num_box_sub {
      text-align: left;
      display: flex;
      align-items: center;
      flex-flow: column nowrap;
    }

    .home_one_ri_ly {
      display: none;
    }

    .home_one_ri_small {
      display: block;
      width: 120px;
      height: 120px;
      margin-left: 48%;
    }

    .home_num_box_icon {
      display: none;
      width: 15px;
      object-fit: contain;
      margin-right: 10px;
    }

    .home_num_box_icon_mobile {
      width: 15px;
      margin-right: 10px;
      display: block;
    }

    .home_num_box_content {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }

    .home_num_box_title {
      font-size: 14px;
      color: #1ae28e;
    }

    .home_num_box_title_add {
      font-family: 'Arial';
      font-size: 14px;
      font-weight: bold;
      color: #0a091c;
    }

    .home_num_box_txt {
      font-size: 7px;
      padding-top: 5px;
      display: none;
    }

    .home_num_box_txt_mobile {
      padding-top: 5px;
      font-size: 7px;
      display: block;
    }

    .gradient_text {
      font-size: 12px;
      width: 180px;
    }

    .scrolling_text_container {
      max-width: 180px;
    }

  }

  .home_one_title {
    font-size: 24px;
  }

  .two_video_img {
    width: 100%;
  }

  .home_one_txt {
    font-size: 14px;
  }

  .home_btn {
    width: 120px;
    height: 40px;
    font-size: 14px;
  }

  .two_logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 85px;
    overflow: hidden;
    background-color: #f9f9f9;
    box-shadow: 0 20px 28px 0 #ffffff;
  }

  .home_two_contain {
    padding: 0 30px;

    .two_txt {
      font-size: 16px;
      padding: 50px 0 20px 0;
    }

    .two_txt_two {
      font-size: 16px;
      padding: 20px 0 20px 0;
    }
  }

  .home_four {

    color: #515151;
    background: white linear-gradient(to bottom, rgba(238, 238, 238, 0), #c3ffdf) no-repeat bottom;
    background-size: 100% 334px;

    .four_title {
      font-size: 21px;
    }

    .four_more {
      padding: 10px 0 10px 15px;
      font-size: 16px;
    }

    .four_item_box_content {
      padding: 0;

      .four_img_two_img {
        height: 290px;
        padding-right: 0;
        padding-top: 0;
        padding-bottom: 20px;
        object-fit: contain;
      }

      .four_img_three_img {
        width: 100%;
        padding-right: 0;
        padding-top: 40px;
        padding-bottom: 20px;
      }

      .four_img_one_img {
        width: 100%;
        padding-right: 0;
        padding-top: 50px;
        padding-bottom: 60px;
      }


      .four_img_one {
        margin-top: 0;
      }

      .four_img_two {
        margin: 0 30px;
      }

      .four_img_three {
        margin: 0 20px;
      }
    }
  }

  .gsap_one_title,
  .gsap_two_title,
  .gsap_three_title {
    will-change: transform, opacity;
    backface-visibility: hidden;
    padding: 0 30px;
  }

  /* 添加图片悬停效果 */
  .four_img_two_img,
  .four_img_three_img,
  .four_img_one_img {
    pointer-events: none;
  }


  .home_three_circle_small {
    position: absolute;
    bottom: 30%;
    left: 5%;
    width: 63px;
    height: 63px;
    border-radius: 50%;
    background-image: linear-gradient(225deg,
    rgba(50, 255, 184, 0.44),
    rgba(182, 32, 224, 0.04) 30%,
    rgba(182, 32, 224, 0.04) 70%,
    rgba(247, 181, 0, 0.19));
  }

  .home_three_circle_big {
    position: absolute;
    top: 10%;
    right: 5%;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-image: linear-gradient(225deg,
    rgba(50, 255, 184, 0.44),
    rgba(182, 32, 224, 0.04) 30%,
    rgba(182, 32, 224, 0.04) 70%,
    rgba(247, 181, 0, 0.19));
  }

  .three_content {
    .three_title {
      font-size: 30px;
    }

    .three_content_title {
      font-size: 12px;
    }

    .three_content_img {
      width: 106px;
    }

    .three_content_img_box {
      padding: 10px 0;
    }

    .three_content_img_img {
      width: 70px;
      height: 72px;
      margin: 0;
      object-fit: contain;
    }

    .three_content_img_txt {
      font-size: 9px;
    }
  }

  .home_five {
    pointer-events: none;

    .five_img_box_small {
      gap: 20px;
    }

    .home_five_title {
      font-size: 25px;
      padding-bottom: 50px;
    }

    .five_img {
      width: 136px;
    }


  }

  .home_seven {
    display: flex;
    flex-direction: column;
    align-items: center;

    .home_seven_img {
      display: none;
    }

    .home_seven_img_small {
      width: 90%;
      display: block;
      margin-left: 5%;
    }
  }

  .home_seven_bg {
    width: 90%;
    position: absolute;
    top: 30%;
    left: 0;
    margin: 0 5%;
  }

  .home_eight {
    padding: 0;

    .home_eight_content {
      height: 100%;
      width: 100%;
      padding: 0 20px;


    }

    .home_eight_title {
      padding: 0;
    }

    .home_eight_title_top {
      padding-top: 20px;
    }

    .home_eight_title_top_txt {
      font-size: 12px;
    }

    .color_green {
      font-size: 12px;
    }

    .eight_txt {
      font-size: 10px;
    }

    .eight_btn {
      width: 150px;
      height: 30px;
      font-size: 10px;
      padding: 0 10px;
      margin: 20px 0;
    }

    .eight_btn_txt {
      font-size: 9px;
    }

    .eight_small_bgi_one {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 160px;
    }

    .eight_small_bgi_two {
      position: absolute;
      bottom: 0;
      right: 10px;
      width: 130px;
    }

  }

  .home_one_txt_small_img {
    width: 6px;
  }

}

.logo-item {
  transition: all 0.5s ease;
}

/* 轮播动画 */
.logo-slide-enter-active,
.logo-slide-leave-active {
  transition: all 0.5s ease;
}

.logo-slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.logo-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.logo-slide-move {
  transition: transform 0.5s ease;
}


.eight_btn_txt {
  font-size: 8px;
}

.text_container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.arrow {
  width: 24px;
  height: 24px;
  opacity: 0.8;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.arrow:hover {
  transform: scale(1.1);
  opacity: 1;
}


@media screen and (max-width: 768px) {


  .text_container {
    gap: 10px;
    padding: 0 15px;
  }

  .arrow {
    width: 20px;
    height: 20px;
  }

  .gradient_text {
    font-size: 24px;
  }
}

/* 添加必要的样式 */
.gsap_one_title,
.gsap_two_title,
.gsap_three_title {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.four_img_two_img,
.four_img_three_img,
.four_img_one_img {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* 优化图片容器 */
.four_img_one {
  overflow: hidden;
  margin-top: -100px;
}

.four_img_two {
  overflow: hidden;
  margin-top: -70px;
}

.four_img_three {
  overflow: hidden;
}


/* 添加图片悬停效果 */
.four_img_two_img:hover,
.four_img_three_img:hover,
.four_img_one_img:hover {
  transform: scale(1.02);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 添加 five_img 相关样式 */
.five_img {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.home_five {
  overflow: hidden; /* 确保动画不会溢出容器 */
}

/* 添加到现有的 style 部分 */
.three_content {
  position: relative;
  overflow: hidden;
}

.three_content_img {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.three_content_img_box {
  position: relative;
  overflow: hidden;
}

/* 添加响应式样式 */
:deep(.el-statistic__content) {
  white-space: nowrap;
  transition: font-size 0.3s ease;
}

:deep(.el-statistic__content-suffix) {
  font-size: inherit !important;
}

@media screen and (max-width: 440px) {
  .home_num_box_title {
    transform: scale(0.8);
    transform-origin: left;
  }
}
</style>

