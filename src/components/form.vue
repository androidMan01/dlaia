<script setup>
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {onMounted, reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'

gsap.registerPlugin(ScrollTrigger)

// 定义 props
const props = defineProps({
  submitText: {
    type: String,
    default: 'Submit'
  }
})
// 表单 ref
const formRefData = ref(null)
const formRef = ref(null)
const loading = ref(false) // 添加加载状态
// 邮箱验证正则表达式
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

// 表单验证规则
const rules = reactive({
  full_name: {required: true, message: 'please fill', trigger: 'submit'},
  email: [
    {required: true, message: 'please fill', trigger: 'submit'},
    {pattern: emailPattern, message: 'Please enter the correct email address', trigger: 'submit'}
  ],
  data_type: {required: true, message: 'please fill', trigger: 'submit'},
  data_time: {required: true, message: 'please fill', trigger: 'submit'},
  company: {required: true, message: 'please fill', trigger: 'submit'}
})

// 定义表单数据
const formList = reactive({
  full_name: '',
  company: '',
  email: '',
  data_type: '',
  data_time: '',
  information: ''
})

// 定义 emit
const emit = defineEmits(['submit'])

// 清空表单方法
const resetForm = () => {
  if (formRefData.value) {
    formRefData.value.resetFields()
    formList.information = '' // 手动重置非必填字段
  }
  if (formRef.value) {
    formRef.value.resetFields()
    formList.information = '' // 手动重置非必填字段
  }
}

// 提交方法
const handleSubmit = async () => {

  if (!formRefData.value || !formRef.value) return
  try {
    loading.value = true
    // 判断是移动端还是PC端表单
    const isMobile = window.innerWidth > 440
    // pc端表单验证
    if (isMobile) {
      const valid = await formRefData.value.validate()
      if (valid) {
        loading.value = true
        emit('submit', {...formList})
        ElMessage.success('Form submitted successfully')
        resetForm()
      }
    } else {
      const valid = await formRef.value.validate()
      if (valid) {
        loading.value = true
        emit('submit', {...formList})
        ElMessage.success('Form submitted successfully')
        resetForm()
      }
    }

  } catch (error) {
    // resetForm()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const isMobile = window.innerWidth <= 768 || /mobile/i.test(navigator.userAgent);
  if (!isMobile) {
    // 为 form_btm 添加动画
    gsap.set('.form_btm', {
      opacity: 0,
      x: 150, // 从右侧开始
      force3D: true
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: '.form_content', // 使用父容器作为触发器
        start: "center 75%", // 当容器中心到达视口中心时触发
        once: true,
        markers: false
      }
    }).to('.form_btm', {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out"
    })
  }
})
</script>

<template>
  <div class="form_all_box">
    <el-form
        class="form_box"
        :model="formList"
        :rules="rules"
        ref="formRefData"
        :validate-on-rule-change="false"
        size="large"
    >
      <div class="form_box_top"></div>
      <div class="form_container" style="">
        <div class="form_title">Data Request Form</div>
        <div class="form_content" style=" ">
          <el-form-item prop="full_name">
            <template #label>
              <div class="form_item_title">Name:</div>
            </template>
            <el-input v-model="formList.full_name" autocomplete="off"/>
          </el-form-item>

          <el-form-item prop="company">
            <template #label>
              <div class="form_item_title">Company:</div>
            </template>
            <el-input v-model="formList.company" autocomplete="off"/>
          </el-form-item>
          <el-form-item prop="email">
            <template #label>
              <div class="form_item_title">Email:</div>
            </template>
            <el-input v-model="formList.email" autocomplete="off"/>
          </el-form-item>
          <el-form-item prop="data_type">
            <template #label>
              <div class="form_item_title_two">Requested data types:</div>
            </template>
            <el-input v-model="formList.data_type" autocomplete="off"/>
          </el-form-item>
          <el-form-item prop="data_time">
            <template #label>
              <div class="form_item_title_two">Data delivery due:</div>
            </template>
            <el-input v-model="formList.data_time" autocomplete="off"/>
          </el-form-item>
          <div>
            <div class="other_info">Other requests:</div>
            <el-input class="input_item_box" :rows="4" resize="none" type="textarea" maxlength="500" show-word-limit
                      v-model="formList.information"></el-input>
          </div>
          <div style="width: 100%; display: flex; justify-content: flex-end;">
            <div
                class="submit pointer_txt"
                :class="{ 'submit-disabled': loading }"
                @click="handleSubmit"
            >
              {{ loading ? 'Submitting...' : submitText }}
            </div>
          </div>
          <!--                <img class="form_btm" src="@/assets/annotation/form_btm.png" alt="">-->
        </div>
      </div>

    </el-form>

    <!-- 移动端 -->
    <el-form class="form_box_mobile" :model="formList" :rules="rules" ref="formRef">
      <div class="" style="background-color: #f7f7f7; padding: 20px; color: #0a091c;">
        <div class="" style="font-size: 18px; color: #1ae28e; padding: 30px 0; font-family: 'Abril';">Data Request
          Form
        </div>
        <el-form-item class="form_item" prop="full_name">
          <template #label>
            <div class="mobile_title">Name:</div>
          </template>
          <el-input class="input_mobile_item" v-model="formList.full_name"></el-input>
        </el-form-item>
        <el-form-item prop="company">
          <template #label>
            <div class="mobile_title">Company:</div>
          </template>
          <el-input class="input_mobile_item" v-model="formList.company"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <template #label>
            <div class="mobile_title">Email:</div>
          </template>
          <el-input class="input_mobile_item" v-model="formList.email"></el-input>
        </el-form-item>
        <el-form-item prop="data_type">
          <template #label>
            <div class="mobile_two">Requested data types:</div>
          </template>
          <el-input class="input_mobile_item" v-model="formList.data_type"></el-input>
        </el-form-item>
        <el-form-item prop="data_time">
          <template #label>
            <div class="mobile_two">Data delivery due:</div>
          </template>
          <el-input class="input_mobile_item" v-model="formList.data_time"></el-input>
        </el-form-item>
        <el-form-item style="display: block;" prop="information">
          <template #label>
            <div class="other_info">Other requests:</div>
          </template>
          <el-input class="input_item_box" style="width: 100%;" resize="none" type="textarea" maxlength="500"
                    show-word-limit v-model="formList.information"></el-input>
        </el-form-item>
        <div style="width: 100%; display: flex; justify-content: center;">
          <div
              class="mobile_submit pointer_txt"
              :class="{ 'submit-disabled': loading }"
              @click="handleSubmit"
          >
            {{ loading ? 'Submitting...' : submitText }}
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.form_all_box {
  width: 100%;
}


.form_box {
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  background: url('@/assets/x2/form_bg.png') no-repeat center;
  background-size: 100% 100%;
}

.form_container {
  width: 700px;
}

.form_content {
  min-width: 415px;
  position: relative;
  font-size: 20px;
  padding: 47px 64px;
  color: #0a091c;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 19px 18px 28px 0 rgba(132, 132, 132, 0.04);
  border: solid 1px #e4e4e4;
  background-color: #fff;
}

.form_title {
  font-family: 'Abril';
  font-weight: 700;
  font-size: 36px;
  color: #1ae28e;
  padding-bottom: 30px;

}

.form_item_title {
  color: #0a091c;
  font-size: 20px;
  width: 120px;
}

.form_item_title_two {
  color: #0a091c;
  font-size: 20px;
  width: 280px;
}

.form_item {
  /* display: flex;
  align-items: center;
  justify-content: space-between;  */
  width: 100%;
}

.other_info {
  padding-left: 10px;
  padding-bottom: 20px;
}

.input_item {
  flex: 1;
  height: 40px;
}

.input_item_box {
  margin: 10px;
  border-radius: 16px;
  background: #F7F7F7;
}

.submit {
  margin-top: 100px;
  width: 240px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-image: linear-gradient(to left, #38f3df, #36ffab 39%);
  border-radius: 50px;
  font-size: 20px;
  transition: all 0.15ms linear;
}

.submit:hover {
  background-image: linear-gradient(to left, #38f3df, #36ffab 39%);
}

.form_btm {
  width: 240px;
  position: absolute;
  bottom: 0;
  left: -20px;
}

.center_top {
  position: absolute;
  top: 35%;
  left: 40%;
  translate: -50%;
  overflow: hidden;
  /* width: 1280px; */
}

.center_btm {
  width: 980px;
}

.form_box_mobile {
  display: none;
  color: #0a091c;
  font-size: 12px;
}

.mobile_title {
  width: 80px;
}

.mobile_two {
  width: 150px;
  padding-right: 10px;
  white-space: nowrap;
}

.mobile_submit {
  width: 120px;
  border-radius: 50px;
  background-image: linear-gradient(to left, #38f3df, #36ffab 39%);
  text-align: center;
  padding: 10px 0;
}


:deep(.el-input--large .el-input__wrapper) {
  background: #F7F7F7;
}
:deep(.el-textarea .el-input__count) {
  bottom: 0.3125rem;
  color: var(--el-color-info);
  font-size: 0.75rem;
  line-height: 0.875rem;
  position: absolute;
  right: 0.625rem;
  background: #f7f7f7;
}

:deep(.el-textarea__inner) {
  background: #f7f7f7;
}


@media screen and (max-width: 1200px) {
  .form_container {
    width: 700px;
  }

  .form_item_title {
    font-size: 20px;
    width: 150px;
  }
}

@media screen and (max-width: 768px) {
  .form_box {
    .form_container {
      width: 600px;
    }

    .form_container {
      padding-top: 0;
    }

    .form_item_title {
      font-size: 20px;
      width: 150px;
    }

    .form_item_title_two {
      font-size: 20px;
      width: 250px;
    }

    .other_info {
      font-size: 20px;
    }

    .input_item_box {
      height: 100px;
    }
  }
}

@media screen and (max-width: 440px) {

  .form_container {
    width: 300px;
  }

  .form_all_box{
    width: 100%;
    background: transparent;
  }

  .form_box {
    display: none;
  }

  .form_box_mobile {
    display: block;
  }

  :deep(.el-input--large .el-input__wrapper) {
    background: #ffffff;
  }
  :deep(.el-textarea .el-input__count) {
    bottom: 0.3125rem;
    color: var(--el-color-info);
    font-size: 0.75rem;
    line-height: 0.875rem;
    position: absolute;
    right: 0.625rem;
    background: #ffffff;
  }

  :deep(.el-textarea__inner) {
    background: #ffffff;
  }
}

/* ::v-deep .input_item_box .el-textarea__inner  {
    box-sizing: content-box !important;
} */
</style>
