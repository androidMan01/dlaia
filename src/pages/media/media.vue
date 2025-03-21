<script setup>
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {computed, onMounted, onUnmounted, ref} from 'vue'
import Carousel from '@/components/carousel.vue';
import btnNormal from '@/assets/x2/medio_nomal.png';
import imgOne from '@/assets/x2/media_one.webp';
import imgTwo from '@/assets/x2/media_two.webp';
import imgThree from '@/assets/x2/media_three.webp';
import imgFour from '@/assets/x2/media_four.webp';
import imgFive from '@/assets/x2/media_five.webp';
import imgSix from '@/assets/x2/media_six.webp';
import imgSeven from '@/assets/x2/media_seven.webp';
import imgEight from '@/assets/x2/media_eight.webp';
import imgNine from '@/assets/x2/fengmianOne.png';
import imgTen from '@/assets/x2/fengmianTwo.png';
import imgEleven from '@/assets/x2/fengmianThree.png';
import imgTwelve from '@/assets/x2/fengmianTwelve.png';

gsap.registerPlugin(ScrollTrigger)
// import imgNine from '@/assets/x2/media_nine.webp';

// // 使用数组存储每个按钮的状态
// const btnImgs = ref(Array(6).fill(btnNormal));

// // 根据索引更新对应按钮的状态
// const isHover = (index, show) => {
//   btnImgs.value[index] = show ? btnHover : btnNormal;
// }

const slidesArr = [

  {
    title: 'Innovate, Integrate, Iterate Introducing Alaya AI Pro',
    description: 'Get ready for advanced Web3-native data labelling! After months of development and testing, we are proud to announce the upcoming release of Alaya AI Pro…',
    image: imgTwelve,
    link: 'https://medium.com/@alaya-ai/innovate-integrate-iterate-introducing-alaya-ai-pro-290af15a652e'
  },
  {
    title: 'Alaya Product Analysis',
    description: 'Inspired by the concept of Swarm Intelligence, Alaya is a distributed AI data labelling and annotation platform designed to leverage the power of decentralised communities through social commerce incentives and gamified user experiences. Alaya is built to provide a seamless bridge between the Web3 ecosystem and the AI data industry to provide better scalability, privacy, and enhance data quality.',
    image: imgEleven,
    link: 'https://medium.com/@alaya-ai/open-data-platform-odp-alaya-ais-vision-for-the-future-of-web3-ai-ced7d57b946a'
  },
  {
    title: 'Alaya AI Announces 7.6M $AGT Airdrop Allocation for BNB Chain Chapter 3 Airdrop Alliance Program',
    description: 'Alaya AI is excited to announce our participation in the BNB Chain Airdrop Alliance Program. Alaya AI will offer 7,600,000 $AGT to eligible users within the BNB Ecosystem.',
    image: imgOne,
    link: 'https://medium.com/@alaya-ai/alaya-ai-announces-7-6m-agt-airdrop-allocation-for-bnb-chain-chapter-3-airdrop-alliance-program-577e6252532b'
  },
  {
    title: 'Revolutionizing AI: ALAYA AI’s Vision for a Sustainable Community Business Ecosystem',
    description: 'ALAYA AI, a trailblazer in distributed artificial intelligence data platforms, is thrilled to introduce its groundbreaking platform that seamlessly integrates data collection, annotation, and social commerce.',
    image: imgTwo,
    link: 'https://medium.com/@alaya-ai/revolutionizing-ai-alaya-ais-vision-for-a-sustainable-community-business-ecosystem-b8e36291bf2f'
  },

];


const videoList = [

  {
    title: 'Innovate, Integrate, Iterate Introducing Alaya AI Pro',
    time: 'March 10, 2025',
    image: imgTwelve,
    link: 'https://medium.com/@alaya-ai/innovate-integrate-iterate-introducing-alaya-ai-pro-290af15a652e'
  },
  {
    title: 'Open Data Platform (ODP) — Alaya AI’s Vision for The Future of Web3 AI',
    time: 'Aug 30, 2024',
    image: imgNine,
    link: 'https://medium.com/@alaya-ai/open-data-platform-odp-alaya-ais-vision-for-the-future-of-web3-ai-ced7d57b946a'
  },
  {
    title: 'Introducing Web3-Native Autolabelling AI Models',
    time: 'Jun 7, 2024',
    image: imgTen,
    link: 'https://medium.com/@alaya-ai/introducing-web3-native-autolabelling-ai-models-590f715001f3'
  },
  {
    title: 'Alaya Product Analysis',
    time: 'Jun 26, 2023',
    image: imgEleven,
    link: 'https://medium.com/@alaya-ai/alaya-product-analysis-6a8578d94694'
  },
  {
    title: 'Alaya AI Announces 7.6M $AGT Airdrop Allocation for BNB Chain Chapter 3 Airdrop Alliance Program',
    time: 'Jun 18, 2024',
    image: imgOne,
    link: 'https://medium.com/@alaya-ai/alaya-ai-announces-7-6m-agt-airdrop-allocation-for-bnb-chain-chapter-3-airdrop-alliance-program-577e6252532b'
  },
  {
    title: 'Revolutionizing AI: ALAYA AI’s Vision for a Sustainable Community Business Ecosystem',
    time: 'Dec 11, 2023',
    image: imgTwo,
    link: 'https://medium.com/@alaya-ai/revolutionizing-ai-alaya-ais-vision-for-a-sustainable-community-business-ecosystem-b8e36291bf2f'
  },
  {
    title: 'Alaya: The Pioneer of Artificial Intelligence Data',
    time: 'Oct 8, 2023',
    image: imgThree,
    link: 'https://medium.com/@alaya-ai/alaya-the-pioneer-of-artificial-intelligence-data-6dcf0723568b'
  },
  {
    title: 'Alaya’s NFT System',
    time: 'Aug 16, 2023',
    image: imgFour,
    link: 'https://medium.com/@alaya-ai/alayas-nft-system-a43a2ffc6e90'
  },
  {
    title: 'Alaya：High-quality data is the future of AI',
    time: 'Jul 9, 2023',
    image: imgFive,
    link: 'https://medium.com/@alaya-ai/alaya-high-quality-data-is-the-future-of-ai-e41b8623d364'
  },
  {
    title: 'Alaya — A Decentralised Alternative For AI Data',
    time: 'Jun 21, 2023',
    image: imgSix,
    link: 'https://medium.com/@alaya-ai/alaya-integrated-solution-for-data-collection-and-labeling-services-d2f4d05710d8'
  },
  {
    title: 'Alaya AI Architectural Upgrade: Composable Three-Layer Optimisation System',
    time: 'Jun 24, 2024',
    image: imgSeven,
    link: 'https://medium.com/@alaya-ai/alaya-ai-architectural-upgrade-composable-three-layer-optimisation-system-4b22a854ce3a'
  },
  {
    title: 'Alaya User Manual',
    time: 'Jul 15, 2023',
    image: imgEight,
    link: 'https://medium.com/@alaya-ai/alaya-user-manual-e9df1208d7a9'
  },
  {
    title: 'Alaya — All-in-One Solution for Data Collection and Labelling',
    time: 'Jun 8, 2023',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*lQP0TIBKqBYb2kshTaQb9A.png',
    link: 'https://medium.com/@alaya-ai/alaya-data-collection-and-labeling-services-all-in-one-solution-81ac88776364'
  },
]


const currentPage = ref(1)
const pageSize = 6
// 计算当前页显示的数据
const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  if (isMobile.value) {
    return videoList.slice(0, end)
  } else {
    return videoList.slice(start, end)
  }
})

// // 添加分页动画函数
// const gridAnimation = (items) => {
//     // 设置初始状态
//     gsap.set(items, {
//         opacity: 0,
//         y: 100,
//         force3D: true
//     })

//     // 创建动画
//     gsap.to(items, {
//         opacity: 1,
//         y: 0,
//         duration: 0.8,
//         stagger: {
//             amount: 0.6,
//             from: 'start'
//         },
//         ease: "power2.out"
//     })
// }

// 处理加载更多/分页
const handleCurrentChange = (page) => {
  if (isMobile.value) {
    // 移动端加载更多
    currentPage.value += 1
  } else {
    // PC端分页
    currentPage.value = page
  }
}

// 检测是否为移动端
const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 440
}

const toLink = (link) => {
  if (!link) return
  window.open(link, '_blank') // 在新标签页打开链接
}

// 添加视口宽度监听
const baseWidth = 1440 // 基准宽度
const scale = ref(1)

const updateScale = () => {
  const width = window.innerWidth
  scale.value = Math.min(width / baseWidth, 1) // 限制最大缩放为1
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)

  // 初始检测设备类型
  checkMobile()
  window.addEventListener('resize', checkMobile)

  // // 初始动画
  // nextTick(() => {
  //     // const items = document.querySelectorAll('.media_two_item')
  //     // gridAnimation(items)
  // })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
  window.removeEventListener('resize', checkMobile)
})


</script>

<template>
  <div class="box_top"></div>
  <div class="media_box">
    <div class="media_one">
      <div class="media_one_title">MEDIUM</div>
      <div class="media_one_desc">Stay informed with our latest industry<br> news and project updates</div>
      <div class="carousel_wrapper">
        <Carousel class="carousel_box" :slides="slidesArr"/>
      </div>
    </div>
    <div class="media_two">
      <div class="media_two_content">
        <div class="media_two_item" v-for="(item,index) in currentPageData" :key="index">
          <img class="media_two_item_img" style="" :src="item.image" alt="">
          <div class="media_two_item_box">
            <div class="media_two_item_date">{{ item.time }}</div>
            <div class="media_two_item_title" style="height: 50px;">
              <div class="text_two_container">{{ item.title }}</div>
            </div>
            <!-- <div class="media_two_item_btn">Watch to Youtobe ›</div> -->
            <div style="display: flex; justify-content: flex-end;">
              <img
                  class="media_two_item_more"
                  :src="btnNormal"
                  alt=""
                  @click="toLink(item.link)"
              >
            </div>
          </div>
        </div>

        <!-- 移动端加载更多按钮 -->
        <div
            v-if="isMobile && currentPageData.length < videoList.length"
            class="pointer_txt mobile_load_more"
            @click="handleCurrentChange"
        >
          . . .
        </div>

        <!-- PC端分页器 -->
        <div v-if="!isMobile" class="page_box">
          <el-pagination
              :background="true"
              layout="prev, pager, next"
              :total="videoList.length"
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="page => handleCurrentChange(page)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.media_box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.scale_box {
  width: 1200px;
  transform-origin: top center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.media_one {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 90px 0 50px 0;
  background-image: linear-gradient(to bottom, #01052d, #121a2a);
}

.media_one_title {
  font-family: 'Abril';
  font-size: 72px;
  font-weight: 700;
  color: #1ae28e;
}

.media_one_desc {
  text-align: center;
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
}

.carousel-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel_box {
  width: calc(1200px * v-bind(scale));
}

.media_two {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  background-color: #f1f1f1;
  padding-bottom: 50px;
}

.media_two_content {
  width: calc(1200px * v-bind(scale));
  gap: calc(30px * v-bind(scale));
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100vh - 200px); /* 保持最小高度，防止页面跳动 */
}

.media_two_item {
  width: 32%;
  max-width: 380px;
  max-height: 380px;
  background-color: #fff;
  border: 1px solid #fff;
  box-sizing: border-box;
  margin-bottom: 20px;
  border-radius: 8px;
  box-sizing: border-box;
}

.media_two_item:hover {
  border: 1px solid #1ae28e;
}

.media_two_item_title {
  margin: 20px 0;
  font-size: 20px;
  font-family: 'Arial';
  font-weight: 700;

}

.media_two_item_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  background-color: #f1f1f1;
  border-radius: 10px;
}

.page_box {
  width: 100%;
  display: flex;
  justify-content: center;
}

.media_two_item_box {
  padding: 0 20px 20px 20px;
}

.media_two_item_more {
  width: 30%;
  cursor: pointer;
}

.media_two_item_img {
  width: 100%;
  height: calc(200px * v-bind(scale));
  border-radius: 8px 8px 0 0;
  object-fit: cover;
}

@media screen and (max-width: 1440px) {
  .media_two_content {
    gap: calc(80px * v-bind(scale));
  }

  .media_two_item {
    width: 28%;
  }
}

@media screen and (max-width: 1410px) {
  /* .media_two_content {
    width: 90%;
  } */
}

@media screen and (max-width: 719px) {
  .media_one {
    width: 100%;
    padding: 60px 5% 0 5%;
  }

  .media_one_title {
    font-size: 48px;
  }

  .media_one_desc {
    font-size: 18px;
  }

  .media_box {
    padding-top: 0;
  }
}

@media screen and (max-width: 440px) {
  .scale_box {
    width: 100%;
    transform: none !important;
  }

  .media_one_title {
    font-size: 36px;
  }

  .media_one_desc {
    font-size: 16px;
  }

  .media_two_item_box {

    padding: 0 10px 10px 10px;
  }

  .media_two_item_more {
    width: 40%;
  }

  .media_two_content {
    width: 90%;
    gap: 15px;
  }

  .media_two_item {
    width: calc(50% - 8px);
  }

  .media_two_item_title {
    height: 30px;
    font-size: 14px;
    margin: 10px 0;
    height: 45px;
    /* padding: 10px 0; */
  }

  .media_two_item_date {
    font-size: 12px;
  }

  .media_two_item_btn {
    font-size: 12px;
    padding: 8px;
  }

  .page_box {
    display: none;
  }

  .media_two_item_img {
    height: 150px;
  }

}

.mobile_load_more {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

@media screen and (min-width: 441px) {
  .mobile_load_more {
    display: none;
  }
}
</style>