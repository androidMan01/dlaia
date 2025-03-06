<template>
  <div class="carousel-container">
    <swiper
      :modules="[Pagination, Autoplay]"
      :slides-per-view="1"
      :pagination="false"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :loop="true"
      class="mySwiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(item, index) in slides" :key="index">
        <div class="slide-content">
          <div class="slide-wrapper">
            <div class="slide-image-wrapper" >
              <!-- <iframe class="slide_image" v-if="item.video" :src="item.video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
              <img class="slide_image" :src="item.image" :alt="item.title" @click="playVideo(item.playVideo)">
            </div>
            <div class="slide-info">
              <div class="slide-info-title text_two_container">{{ item.title }}</div>
              <div class="slide-info-description text_five_container">{{ item.description }}</div>
              <div style="display: flex; justify-content: flex-end;">
                <img class="slide_arrow_btn" src="@/assets/x2/arrow_video.png" alt="" @click="handleClick(item.link)">
              </div>
            </div>
            
          </div>
        </div>
      </swiper-slide>
    </swiper>
    
    <div class="custom-pagination">
      <div 
        v-for="(_, index) in slides" 
        :key="index"
        class="pagination-bullet"
        :class="{ 'active': activeIndex === index }"
        @click="slideTo(index)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'

const activeIndex = ref(0)
let swiperInstance = null

const props = defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => []
  }
})
const playVideo = (video) => {
  if(video) {
    window.open(video, '_blank')
  }
}
const onSwiper = (swiper) => {
  swiperInstance = swiper
}

const onSlideChange = () => {
  if (swiperInstance) {
    activeIndex.value = swiperInstance.realIndex
  }
}

const slideTo = (index) => {
  if (swiperInstance) {
    swiperInstance.slideToLoop(index)
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
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
})

const handleClick = (link) => {
  if(link) {
    window.open(link, '_blank')
  }
}
</script>

<style scoped>
.carousel-container {
  width: 70%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(10px * v-bind(scale));
  box-sizing: border-box;
  /* background-color: pink; */
}

.mySwiper {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
}

.slide-content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: calc(20px * v-bind(scale)) 0;
}

.slide-wrapper {
  max-width: calc(1200px * v-bind(scale));
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc(20px * v-bind(scale));
}

.slide_arrow_btn {
  width: calc(40px * v-bind(scale)) !important;
  height: calc(40px * v-bind(scale)) !important;
  padding-top: calc(20px * v-bind(scale)) !important;
  padding-right: calc(30px * v-bind(scale)) !important;
}

.slide-image-wrapper {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slide_image {
  width: 100%;
  height: calc(300px * v-bind(scale));
  object-fit: cover;
  border-radius: 8px;
}


.slide-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 100%;
  color: #000;
  padding: 0 calc(20px * v-bind(scale));
}

.slide-info-title {
  font-family: 'Arial Black';
  margin: 0 0 calc(20px * v-bind(scale));
  font-size: calc(28px * v-bind(scale));
  line-height: 1.4;

}

.slide-info-description {
  margin: 0;
  font-size: calc(16px * v-bind(scale));
  line-height: 1.6;
  min-height: 100px;
}

.custom-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(12px * v-bind(scale));
  padding: calc(20px * v-bind(scale)) 0;
}

.pagination-bullet {
  width: calc(12px * v-bind(scale));
  height: calc(12px * v-bind(scale));
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-bullet.active {
  background: #1ae28e;
}

/* 大屏幕 (≥1440px) */
@media screen and (min-width: 1440px) {
  .slide-wrapper {
    max-width: calc(1400px * v-bind(scale));
  }
  
  .slide-info h3 {
    font-size: 32px;
  }
  
  .slide-info p {
    font-size: 18px;
  }
}

/* 中等屏幕 (≥1024px and <1440px) */
@media screen and (max-width: 1220px) {
  .slide-wrapper {
    max-width: calc(1000px * v-bind(scale));
  }
  
  .slide-info h3 {
    font-size: calc(24px * v-bind(scale));
  }
}

/* 平板 (≥768px and <1024px) */
@media screen and (max-width: 719px) {
  .media_one {
    padding: 0;
  }
  .slide-wrapper {
    flex-direction: column;
    gap: calc(20px * v-bind(scale));
  }
  
  .slide-content img {
    width: 100%;
  }
  
  .slide-info {
    width: 80%;
    text-align: center;
  }
  
  .slide-info h3 {
    font-size: calc(20px * v-bind(scale));
    margin-bottom: calc(10px * v-bind(scale));
  }
  
  .slide-info p {
    font-size: calc(14px * v-bind(scale));
  }
  .slide-image-wrapper {
    height: auto;
    width: 100%;
  }
  .slide_image {
    height: calc(400px * v-bind(scale));
  }
}

/* 手机 (≥375px and <768px) */
@media screen and (max-width: 440px) {
  .slide-content {
    padding: calc(20px * v-bind(scale)) 0;
  }

  .slide-wrapper {
    flex-direction: column;
    padding: 0 10px;
    gap: 15px;
  }


  
  .slide-info {
    width: 100%;
    text-align: left;
  }
  .pagination-bullet {
    width: 8px;
    height: 8px;
  }
  .slide-info-title {
    font-size: 16px;
  }
  .slide-info-description {
    font-size: 12px;
    min-height: 20px;
  }
  .slide_arrow_btn {
    width: 30px !important;
    height: 30px !important;
    padding-top: 20px !important;
    padding-right: 20px !important;
    padding-bottom: 20px !important;
  }
  .slide_image {
    height: 150px;
  }
}
</style>

