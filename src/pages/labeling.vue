<script setup>
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {onMounted, onUnmounted, ref} from 'vue'

gsap.registerPlugin(ScrollTrigger)


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
    // 设置图片元素的初始状态
    const imageElements = [
      '.labeling_two_img',
      '.labeling_three_img',
      '.labeling_two_card'
    ]

    // 设置初始状态
    imageElements.forEach(selector => {
      const elements = document.querySelectorAll(selector)
      gsap.set(elements, {
        opacity: 0,
        y: 100,
        force3D: true
      })
    })

    // 为每个图片创建动画
    imageElements.forEach(selector => {
      const elements = document.querySelectorAll(selector)
      elements.forEach(element => {
        gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 80%", // 当元素顶部到达视口 80% 位置时触发
            end: "bottom center",
            toggleActions: "play none none reset",
            once: true,
            markers: false,
            onEnter: (self) => {
              // 确保元素在视口内
              const rect = self.trigger.getBoundingClientRect()
              const viewHeight = window.innerHeight

              if (rect.top <= viewHeight * 0.8 && rect.bottom >= 0) {
                gsap.to(element, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out"
                })
              }
            }
          }
        })
      })
    })

    // 为 form_btm 添加动画
    gsap.set('.labeling_bot', {
      opacity: 0,
      x: -180, // 从右侧开始
      force3D: true
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: '.labeling_bot', // 使用父容器作为触发器
        start: "center 75%", // 当容器中心到达视口中心时触发
        once: true,
        markers: false
      }
    }).to('.labeling_bot', {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out"
    })

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)
  }

})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
})

</script>

<template>
  <div class="labeling_box">
    <div class="labeling_one">
      <div class="labeling_one_container">
        <div class="labeling_one_title">HUMAN + AI</div>
        <div class="labeling_one_title_mobile_box" style="position: relative;">
          <div class="labeling_one_title_mobile">HUMAN + AI</div>
          <img class="labeling_one_bot_mobile" src="@/assets/x2/labeling_bot.png" alt="">
        </div>
        <div class="labeling_one_txt_mobile">
          Data auto-labelling is the next stage of
          self-supervised Al evolution <br>
          <span class="labeling_one_txt_mobile_txt"> Unlock the true potential of Al and turbocharge
                    your data efficiency with our proprietary
                    Al auto-labelling technologies.</span>
        </div>
        <div class="labeling_one_txt">
                    <span style="padding-bottom: 100px;">
                        Data auto-labelling is the next stage of
                        self-supervised Al evolution<br>
                    </span>
          <span class="labeling_one_txt_txt"> Unlock the true potential of Al and turbocharge
                    your data efficiency with our proprietary Al auto-labelling technologies.</span>
        </div>

      </div>
      <div class="labeling_bot_box">
        <img class="labeling_bot" src="@/assets/x2/labeling_bot.png" alt="">
      </div>
    </div>

    <div class="labeling_two">
      <div class="labeling_two_container">
        <div class="labeling_two_title">How is auto-labelling achieved?</div>
        <img class="labeling_two_img" src="@/assets/x2/labeling_two.png" alt="">
        <img class="labeling_two_img_mobile" src="@/assets/x2/labeling_two_mobile.png" alt="">
        <div class="labeling_two_card">
                   <span> Alaya Al's auto-labelling toolset automatically
                    processes data through a three-step process by
                    applying custom machine learning models to
                    human labelled datasets. Al labelled data is
                    validated by expert human auditors and applied
                    for model fine-tuning through HITL to deliver
                    superior auto-labelling results.</span>
          <div class="blue_line"></div>
          <img class="labeling_two_icon" src="@/assets/x2/labeling_icon.png" alt="">
          <img class="labeling_two_icon_mobile" src="@/assets/x2/labeling_icon.png" alt="">
        </div>
      </div>
    </div>
    <div class="labeling_three">
      <div class="labeling_three_container">
        <div class="labeling_three_title">Case example: Automatic facial recognition</div>
        <img class="labeling_three_img" src="@/assets/x2/labeling_three.png" alt="">
        <div class="labeling_three_title">Dynamic visual data segmentation and discrete object tracking</div>
        <img class="labeling_three_img" src="@/assets/x2/labeling_three_two.png" alt="">
        <div class="labeling_three_txt">
                    <span>Our model is capable of identifying and continuously tracking
                            segmented regions of interest (ROls) based on initial object annotation
                            results provided by human labellers. Automatic ROI tracking and
                            association can be maintained by leveraging Al algorithms with minimal
                            human intervention for vastly superior annotation efficiency.
                    </span>
        </div>
        <div class="blue_line" style="background-color: #1ae28e;"></div>
        <div class="labeling_three_title">Stay tuned for additional model support</div>
        <div class="labeling_last_txt">
          <span>Additional auto-labelling models and features, such as </span>
          <span style="color: #1ae28e;"> automatic document classification </span> and <span style="color: #1ae28e;">social media NLP classification</span>
          for
          <span style="color: #1ae28e;">real-time sentiment analysis </span>are under development...
        </div>
        <img class="labeling_last_img" src="@/assets/x2/labrling_last.png" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>
.labeling_box{
  background: url('@/assets/x2/labeling_one_bg.png') no-repeat top , #FFFFFF ;
  background-size: 100% auto ,100% 100% ;
  padding-top: calc(84px * v-bind(scale) + 80px);
}
.box_top {
  padding-top: calc(84px * v-bind(scale));
}

.labeling_one {
  display: flex;
  justify-content: center;
  align-items: center;
}

.labeling_one_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  padding: calc(100px * v-bind(scale)) 0 calc(200px * v-bind(scale)) 0;
}

.labeling_bot_box {
  position: relative;
  width: calc(200px * v-bind(scale));
  height: calc(420px * v-bind(scale));
}

.labeling_bot {
  position: absolute;
  top: -102px;
  left: calc(-280px * v-bind(scale));
  width: calc(520px * v-bind(scale));
  object-fit: contain;
}

.labeling_one_title {
  text-align: left;
  width: calc(700px * v-bind(scale));
  font-family: 'Abril';
  font-weight: 700;
  font-size: calc(79px * v-bind(scale));
  color: #1ae28e;
}

.labeling_one_txt {
  width: calc(600px * v-bind(scale));
  font-size: calc(28px * v-bind(scale));
  color: #3d3d3d;
  font-weight: 700;
  background-color: #f8f8f8;
  border-radius: 18px;
  padding: calc(20px * v-bind(scale)) calc(100px * v-bind(scale)) calc(20px * v-bind(scale)) calc(20px * v-bind(scale));
}

.labeling_one_txt_txt {
  display: block;
  line-height: 1.8;
  font-size: calc(18px * v-bind(scale));
  padding-top: 18px;
}

.labeling_two {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0a091c;
  padding-bottom: calc(100px * v-bind(scale));
  margin: 0 auto;
}

.labeling_two_container {
  position: relative;
  width: 80%;
  max-width: 1000px;
  padding: calc(40px * v-bind(scale)) 0;
}

.labeling_two_title {
  font-family: 'Abril';
  font-size: calc(40px * v-bind(scale));
  font-weight: 700;
  padding: calc(50px * v-bind(scale)) 0 calc(40px * v-bind(scale)) 0;
}

.labeling_two_img {
  width: 100%;
  object-fit: contain;
}
.labeling_two_img_mobile{
  width: 100%;
  object-fit: contain;
  display: none;
}

.labeling_two_card {
  position: absolute;
  bottom: calc(-50px * v-bind(scale));
  left: 0;
  width: calc(500px * v-bind(scale));
  padding: calc(9px * v-bind(scale)) calc(7px * v-bind(scale)) calc(13px * v-bind(scale)) calc(11.5px * v-bind(scale));
  border-radius: 4px;
  box-shadow: 5px 5px 17px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  font-size: calc(18px * v-bind(scale));
}

.blue_line {
  width: calc(50px * v-bind(scale));
  height: calc(5px * v-bind(scale));
  background-color: #5150e7;
  border-radius: 50px;
  margin: calc(15px * v-bind(scale)) 0;
}

.labeling_two_icon {
  position: absolute;
  bottom: calc(20px * v-bind(scale));
  left: calc(500px * v-bind(scale));
  width: calc(100px * v-bind(scale));
  object-fit: contain;
}

.labeling_two_icon_mobile{
  display: none;
}

.labeling_three {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(to bottom, #01052d, #121a2a);
}

.labeling_three_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 1000px;
}

.labeling_three_title {
  font-family: 'Abril';
  padding: calc(100px * v-bind(scale)) 0 calc(100px * v-bind(scale)) 0;
  font-size: calc(63px * v-bind(scale));
  font-weight: 700;
  color: #1ae28e;
}

.labeling_three_img {
  width: 100%;
}

.labeling_three_txt {
  width: 100%;
  font-size: calc(24px * v-bind(scale));
  border-radius: 18px;
  box-sizing: border-box;
  padding: calc(20px * v-bind(scale)) 0 calc(100px * v-bind(scale)) 0;
}

.labeling_last_txt {
  font-size: calc(36px * v-bind(scale));
  max-width: 1000px;
}

.labeling_last_img {
  width: 50%;
  object-fit: contain;
  margin: 100px 0;
}

.labeling_one_title_mobile_box {
  display: none;
  position: relative;
}

.labeling_one_title_mobile {
  font-size: 40px;
  font-family: Arial;
  font-weight: bold;
  color: #1ae28e;
}

.labeling_one_bot_mobile {
  position: absolute;
  top: 0;
  left: -50px;
  width: 170px;
  top: 20px;
}

.labeling_one_txt_mobile {
  display: none;
  margin-left: 150px;
  margin-top: 20px;
  width: 170px;
  background-color: #F8F8F8;
  border-radius: 5px;
  padding: 10px;
  font-size: 10px;
  color: #5d5d5b;
  font-family: Arial;
}

/* 响应式断点调整 */
@media screen and (max-width: 1440px) {

}

@media screen and (max-width: 1200px) {
  .labeling_bot_box {
    width: calc(150px * v-bind(scale));
  }


}

@media screen and (max-width: 719px) {

}

@media screen and (max-width: 480px) {
  .labeling_box{
    padding-top: 60px;
  }
  .box_top {
    padding-top: 60px;
  }
  .labeling_one {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .labeling_two {
    padding-bottom: 50px;
  }

  .labeling_two_card {
    bottom: -25px;
  }

  .labeling_last_img {
    width: 90%;
    margin: 50px 0;
  }

  .labeling_one_bot_mobile {
    left: -30px;
    width: 180px;
    top: 20px;
  }

  /* 隐藏元素 */
  .labeling_bot_box,
  .labeling_one_txt,
  .labeling_one_title {
    display: none;
  }

  /* 显示元素 */
  .labeling_one_title_mobile {
    font-size: 50px;
  }

  .labeling_one_title_mobile_box {
    display: block;
  }

  .labeling_one_txt_mobile {
    margin-top: 0;
    margin-left: 120px;
    width: 150px;
    display: block;
  }

  .labeling_three_title {
    padding: 100px 0 30px 0;
  }

  .labeling_last_txt {
    font-size: 18px;
    max-width: 1000px;
  }

  .labeling_three_txt {
    width: 100%;
    font-size: 9px;
    border-radius: 18px;
    box-sizing: border-box;
    padding: calc(20px * v-bind(scale)) 0 calc(100px * v-bind(scale)) 0;
  }

  .labeling_two_img {
    width: 100%;
    object-fit: contain;
    display: none;
  }
  .labeling_two_img_mobile{
    width: 100%;
    object-fit: contain;
    display: block;
  }

  .labeling_two_card {
    position: relative;
    bottom: calc(-50px * v-bind(scale));
    left: 0;
    width: 70%;
    margin: 20px 15% 0 15%;
    padding: calc(9px * v-bind(scale)) calc(7px * v-bind(scale)) calc(13px * v-bind(scale)) calc(11.5px * v-bind(scale));
    border-radius: 4px;
    box-shadow: 5px 5px 17px 0 rgba(0, 0, 0, 0.05);
    background-color: #fff;
    font-size: 9px;
  }

  .labeling_two_icon{
    display: none;
  }

  .labeling_two_icon_mobile {
    position: absolute;
    bottom: calc(-40px * v-bind(scale));;
    right: calc(-40px * v-bind(scale));;
    width: calc(100px * v-bind(scale));
    object-fit: contain;
    display: block;
  }
  /* .labeling_one_txt_mobile_txt {
    font-size: 7px;
  } */
}

</style>