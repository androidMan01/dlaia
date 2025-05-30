<script setup>
import FromBox from '@/components/form.vue'
import {dingyue} from '@/api'
import {onMounted, ref} from 'vue'
import {ElMessage} from 'element-plus'
import coverImageOne from '@/assets/x2/annotation_cover_one.png'
import coverImageTwo from '@/assets/x2/annotation_cover_two.png'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const iconList = [
  {
    title: '1. Customer Identification',
    desc: 'Customer Identification and background analysis'
  },
  {
    title: '3. Solution Customisation',
    desc: 'Tailored data solutions for custom data requirements'
  },
  {
    title: '5. Data Processing',
    desc: 'Accurate, efficient, and secure data processing'
  },
  {
    title: '7. Result Delivery',
    desc: 'Quality data service with minimal delays'
  }
]
const iconList2 = [
  {
    title: '2. Demand Interpretation',
    desc: 'Customer data request interpretation'
  },
  {
    title: '4. Task Distribution',
    desc: 'Targeted task distribution for optimal data output'
  },
  {
    title: '6. Quality Assessment',
    desc: 'Pre-delivery sample evaluation for data integrity and consistency'
  }
]

// 处理表单提交
const handleFormSubmit = async (formData) => {

  try {
    const response = await dingyue(formData)
    // if (response.data.code === 200) {
    //     // ElMessage.success('Submit successfully')
    //     // 可以在这里清空表单或做其他操作
    // } else {
    //     ElMessage.error(response.data.message || 'Submit failed')
    // }
  } catch (error) {
    console.error('Submit error:', error)
    ElMessage.error('Submit failed, please try again')
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
  const isMobile = window.innerWidth <= 768 || /mobile/i.test(navigator.userAgent);
  if (!isMobile) {
    // 设置初始状态
    gsap.set('.annotation_icon_list', {
      opacity: 0,
      y: 100,
      force3D: true
    })

    gsap.set('.annotation_icon_img', {
      opacity: 0,
      y: 100,
      force3D: true
    })

    gsap.set('.annotation_icon_list_two', {
      opacity: 0,
      y: 100,
      force3D: true
    })

    // 创建动画时间线
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.annotation_icon',
        start: "top 75%",
        once: true,
        markers: false
      }
    })

    // 依次添加动画
    tl.to('.annotation_icon_list', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
        .to('.annotation_icon_img', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4") // 与前一个动画重叠 0.4 秒
        .to('.annotation_icon_list_two', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.2") // 与前一个动画重叠 0.4 秒
    // 为 platform_two 添加动画
    gsap.set('.annotation_form_box', {
      opacity: 0,
      y: 100,
      force3D: true
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: '.annotation_form_box',
        start: " 85%",
        once: true,
        markers: false
      }
    }).to('.annotation_form_box', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }
})

</script>

<template>
  <div class="annotation-parent">
    <div class="box_top"></div>
    <div class="annotation_title_one">
      <div class="annotation_one_box">
        <h1 class="annotation_title">YOUR GATEWAY TO THE<br>
          WORLD OF WEB3 AI</h1>
        <div class="annotation_content" style="text-align: center;">
          Alaya AI's distributed data platform combines proven data labelling service models from Web2 providers with
          organic Web3 incentives and community networks for superior user traction. <br><br>
          Contribute data and earn rewards, anytime, anywhere.
        </div>
      </div>
      <div class="annotation_one_box">
        <div class="annotation_list">
          <div class="annotation_list_title">Simple and intuitive task access</div>
          <div class="annotation_list_content">
            <div class="annotation_list_item" style="position: relative;">
              <div class="annotation_list_item_txt">Tackle a diverse variety of
                multiple-choice questions and
                earn various token rewards
                through a simple gamified UI.
              </div>
              <img class="annotation_list_arrow" src="@/assets/annotation/arrow.png" alt="">
              <img class="annotation_list_zhuzhi" src="@/assets/annotation/zhuzi.png" alt="">

            </div>
            <video class="annotation_list_item_img" ref="videoPlayer" @play="onPlay" @pause="onPause" @ended="onEnded"
                   loop autoplay muted playsinline="true">
              <source src="/video/plat_video_one.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="annotation_list_content_mobile">
            <video class="annotation_list_item_img_small" ref="videoPlayer" @play="onPlay" @pause="onPause"
                   playsinline="true" @ended="onEnded" :poster="coverImageOne" loop autoplay muted>
              <source src="/video/plat_video_one.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <div style="display: flex; align-items: center; flex-direction: column;">

              <div class="annotation_list_item">
                <div class="annotation_list_item_txt">Tackle a diverse variety of multiple-choice questions and earn
                  various token rewards through a simple gamified UI.
                </div>
                <img class="annotation_list_arrow" src="@/assets/annotation/arrow.png" alt="">
                <img class="annotation_list_zhuzhi" src="@/assets/annotation/zhuzi.png" alt="">

              </div>
            </div>
          </div>
        </div>
        <div class="annotation_list">
          <div class="annotation_list_title">Contribute data anytime, anywhere</div>
          <div class="annotation_list_content">
            <div class="annotation_list_item">
              <div class="annotation_list_item_txt">Monetise your spare time by
                accessing a wide range of AI
                training tasks and challenges
                anytime, anywhere.
              </div>
              <img class="annotation_list_arrow" src="@/assets/annotation/arrow.png" alt="">
              <img class="annotation_list_zhuzhi" src="@/assets/annotation/zhuzi.png" alt="">

            </div>
            <video class="annotation_list_item_img" ref="videoPlayer" @play="onPlay" playsinline="true" @pause="onPause"
                   @ended="onEnded" :poster="coverImageTwo" loop autoplay muted>
              <source src="/video/plat_video_two.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="annotation_list_content_mobile">
            <video class="annotation_list_item_img_small" ref="videoPlayer" @play="onPlay" playsinline="true"
                   @pause="onPause" @ended="onEnded" :poster="coverImageTwo" loop autoplay muted>
              <source src="/video/plat_video_two.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <div class="annotation_list_item">
              <div class="annotation_list_item_txt">Monetise your spare time by
                accessing a wide range of AI
                training tasks and challenges
                anytime, anywhere.
              </div>
              <img class="annotation_list_arrow" src="@/assets/annotation/arrow.png" alt="">
              <img class="annotation_list_zhuzhi" src="@/assets/annotation/zhuzi.png" alt="">

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="annotation_container">
      <div class="annotation_icon">
        <div class="annotation_icon_list">
          <div class="annotation_icon_list_item" v-for="item in iconList" :key="item">
            <div class="annotation_icon_title">{{ item.title }}</div>
            <div class="annotation_icon_desc">{{ item.desc }}</div>
          </div>
        </div>
        <div style="width: 100%; display: flex; justify-content: center; ">
          <img class="annotation_icon_img" src="@/assets/annotation/anno-icon.png" alt="">
        </div>
        <div class="annotation_icon_list_two">
          <div class="annotation_icon_list_two_item" v-for="item in iconList2" :key="item">
            <div class="annotation_icon_title">{{ item.title }}</div>
            <div class="annotation_icon_desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
      <div class="annotation_icon_mobile_box">
        <div class="annotation_icon_mobile">
          <div class="annotation_icon_mobile_item" style=" ">
            <div class="annotation_icon_mobile_title">1. Customer Identification</div>
            <div class="annotation_icon_mobile_desc">Customer identification and<br>
              background analysis
            </div>
          </div>
          <div class="annotation_icon_mobile_item">
            <div class="annotation_icon_mobile_title">2. Demand Interpretation</div>
            <div class="annotation_icon_mobile_desc" style="font-size: 10px;">Customer data request<br>
              interpretation
            </div>
          </div>
          <div class="annotation_icon_mobile_item">
            <div class="annotation_icon_mobile_title">3. Solution Customisation</div>
            <div class="annotation_icon_mobile_desc" style="font-size: 10px;">Tailored data solutions for<br>
              custom data requirements
            </div>
          </div>
          <div class="annotation_icon_mobile_item">
            <div class="annotation_icon_mobile_title">4. Task Distribution</div>
            <div class="annotation_icon_mobile_desc">Targeted task distribution for<br>
              optimal data output
            </div>
          </div>
          <div class="annotation_icon_mobile_item">
            <div class="annotation_icon_mobile_title">5. Data Processing</div>
            <div class="annotation_icon_mobile_desc">Accurate, efficient, and secure<br>
              data processing
            </div>
          </div>
          <div class="annotation_icon_mobile_item">
            <div class="annotation_icon_mobile_title">6. Quality Assessment</div>
            <div class="annotation_icon_mobile_desc">Pre-delivery sample evaluation<br>
              for data integrity and consistency
            </div>
          </div>
          <div class="annotation_icon_mobile_item">
            <div class="annotation_icon_mobile_title">7. Result Delivery</div>
            <div class="annotation_icon_mobile_desc">Quality data service with<br>
              minimal delays
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="annotation_form">
      <FromBox
          class="annotation_form_box"
          submit-text="Submit"
          @submit="handleFormSubmit"
      />
    </div>
  </div>

</template>

<style scoped>
.box_top {
  padding-top: calc(84px * v-bind(scale));
}

.annotation-parent{
  background: #ffffff;
}

.annotation_container {
  margin: 0 auto;
  background: linear-gradient(to bottom, rgba(238, 238, 238, 0), #e4fff1) no-repeat bottom;
  background-size: 100% 293px;
}


.annotation_title_one {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/x2/annotation-bgi-new.png');
  background-size: 100% auto;
  background-position: top;
  background-repeat: no-repeat;
}

.annotation_one_box {
  /* padding: 0 20px; */
  max-width: 1000px;
}

.annotation_content {
  max-width: 900px;
  font-size: 18px;
  padding-bottom: 150px;
  margin: 0 auto;
  color: black;
  letter-spacing: 0.43px;
}

.annotation_title {
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Abril';
  font-weight: 700;
  padding-top: 100px;
  text-align: center;
  line-height: 1.5;
  font-size: 72px;
  color: rgba(33, 220, 140, 1);
}

.annotation_list {
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 30px 30px 70px 30px;
}

.annotation_list_title {
  font-family: 'Abril';
  font-size: 36px;
  font-weight: 700;
  color: rgba(33, 220, 140, 1);
}

.annotation_list_content {
  width: 100%;
  display: flex;
  /* justify-content: center; */
  padding-top: 30px;
  box-sizing: border-box;
  gap: 22px;
  background: white;
}

.annotation_list_content_mobile {
  display: none;
}

.annotation_list_arrow {
  margin-top: 60px;
  max-width: 80px;
}

.annotation_list_zhuzhi {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30%;
}

.annotation_list_item {
  position: relative;
  width: 340px;
  height: 320px;
  background-image: linear-gradient(to bottom, #01052d, #121a2a);
  border-radius: 8px 8px 0 8px;
  padding: 20px 0 0 20px;
  font-size: 20px;
  box-sizing: border-box;
}

.annotation_list_item_txt {
  padding-right: 20px;
}

.annotation_list_item_img {
  width: 620px;
  height: 320px;
  background: white;
}

.annotation_list_item_img_small {
  width: 100%;
  margin: 20px 0 20px 0;
  object-fit: cover; /* 填充容器 */
}

.annotation_icon {
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 30px;
}

.annotation_icon_img {
  /* width: 100%; */
  min-width: 521px;
  max-width: 1043px;
}

.annotation_icon_list {
  display: flex;
  gap: 80px;
}

.annotation_icon_list_two {
  display: flex;
  gap: 80px;
  padding: 10px 100px;
}

.annotation_icon_list_two_item {
  width: 380px;
  height: 80px;
}

.annotation_icon_title {
  font-size: 16px;
  font-weight: 700;
  color: #1ae28e;
}

.annotation_icon_desc {
  font-size: 12px;
  font-weight: 400;
  color: #878787;
  padding: 10px 0;
}

.annotation_icon_mobile_box {
  display: none;
  padding: 50px 0;
}

.annotation_icon_mobile {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 默认靠左 */
  width: 100%;
  height: 648px;
  background-image: url('@/assets/x2/annotation.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.annotation_icon_mobile_item {
  padding: 26px 0;
  /* height: 100px; */
}

/* 奇数盒子靠右 */
.annotation_icon_mobile_item:nth-child(odd) {
  align-self: flex-end; /* 靠右 */
}

/* 偶数盒子靠左 */
.annotation_icon_mobile_item:nth-child(even) {
  align-self: flex-start; /* 靠左 */
}

.annotation_icon_mobile_two {
  padding-left: 20px;
  height: 100px;
}

.annotation_icon_mobile_title {
  color: #1ae28e;
  font-size: 10px;
}

.annotation_icon_mobile_desc {
  font-size: 10px;
  color: #3d3d3d;
}


/* 媒体查询 */
@media screen and (max-width: 1440px) {
  .annotation_container {
    padding: 0 100px;
  }
}

@media screen and (max-width: 1200px) {
  .annotation_list_item_txt {
    font-size: 12px;
  }

  .annotation_title {
    font-size: 34px;
  }

  .annotation_icon_desc {
    font-size: 12px;
  }

  .annotation_icon_list {
    gap: 20px;
  }

  .annotation_icon_list_two {
    gap: 10px;
    padding: 0;
    margin-top: 37px;
  }

  .annotation_list_title {
    font-size: 18px;
  }

  .annotation_list_arrow {
    margin-top: 0;
  }

  .annotation_list_item_img {
    width: 310px;
    height: 160px;
  }

  .annotation_list_item {
    width: 240px;
    height: 160px;
  }

  .annotation_content {
    padding-bottom: 50px;
  }
}

@media screen and (max-width: 768px) {
  .annotation_container {
    padding: 0 30px;
  }

  .annotation_title {
    font-size: 32px;
  }

  .annotation_content {
    padding: 0 30px;
    font-size: 18px;
  }

  .annotation_list {
    padding: 0 0 20px 0;

    .annotation_list_title {
      padding-top: 50px;
      font-size: 16px;
    }

    .annotation_list_item_txt {
      font-size: 12px;
    }
  }

  .annotation_icon_list {
    gap: 5px;
  }

  .annotation_icon_title {
    font-size: 9px;
  }

  .annotation_icon_desc {
    font-size: 10px;
  }

  .annotation_icon_list_two {
    padding: 0 20px;
    gap: 10px;
  }

  .annotation_list_content {
    display: none;
  }

  .annotation_list_content_mobile {
    display: block;
    overflow: hidden; /* 隐藏溢出部分 */
    background-color: white; /* 覆盖黑色背景 */
    border-radius: 10px; /* 可选：圆角 */
  }

  .annotation_icon {
    display: none;
  }

  .annotation_icon_mobile_box {
    display: block;
  }

  .annotation_list_item {
    width: 100%;
  }

  .annotation_list_zhuzhi {
    width: 80px;
  }

  .annotation_content {
    padding-bottom: 50px;
  }
}

@media screen and (max-width: 440px) {
  .annotation_title_one {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('@/assets/x2/annotation-bgi-mobile.png');
    background-size: 100% auto;
    background-position: top;
    background-repeat: no-repeat;
  }
  .annotation_one_box {
    padding: 0 30px;
  }

  .annotation_title {
    font-size: 24px;
  }

  .annotation_content {
    font-size: 11px;
  }

  .annotation_list {
    padding: 0;

  }

  .annotation_list_content {
    display: none;
  }

  .annotation_list_content_mobile {
    display: block;
    overflow: hidden; /* 隐藏溢出部分 */
    background-color: white; /* 覆盖黑色背景 */
    border-radius: 10px; /* 可选：圆角 */
  }

  .annotation_list_item_img_small {
    width: 100%;
    margin: 20px 0 20px 0;
    object-fit: cover; /* 填充容器 */
  }

  .annotation_icon {
    display: none;
  }

  .annotation_icon_mobile_box {
    display: block;
  }

  .annotation_container {
    margin: 0 auto;
    background: linear-gradient(to bottom, rgba(238, 238, 238, 0), #e4fff1) no-repeat bottom;
    background-size: 100% 100px;
  }
}

.annotation_form {
  width: 100%;
  padding-top: 50px;
  background: white;
}

@media screen and (max-width: 440px) {
  .annotation_form {
    padding-top: 30px;
    background: #f7f7f7;
  }

  .form_item {
    padding-bottom: 20px;
  }
}
</style>