<template>
  <Dialog v-model="dialogVisible">
    <div class="activity_box">
      <img src="@/assets/x2/activity.png" alt="" srcset="">
      <div class="activity_btn_box">
        <div class="activity_btn" @click="HandleClose">OK</div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import {ref} from 'vue'
import Dialog from '../components/dialog.vue'

const dialogVisible = ref(false);
const HandleClose = () => {
  dialogVisible.value = false
}
</script>

<style scoped>
.activity_box {
  width: 500px;
  height: 474px;
  position: relative;
}

.activity_box img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8889;
  object-fit: contain;
}

.activity_btn_box {
  position: absolute;
  bottom: 44px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 8890;
  cursor: pointer;
}

.activity_btn {
  padding: 10px 92px;
  border-radius: 8px;
  background-color: #1ae28e;
  color: #ffffff;
  font-family: PingFangSC;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.54px;
}

.activity_btn:hover {
  background-color: #14E990;
}

/* 小屏幕响应式样式 */
@media screen and (max-width: 720px) {
  .activity_box {
    width: 250px;
    height: 237px;
  }

  .activity_btn_box {
    bottom: 22px;
  }

  .activity_btn {
    padding: 5px 46px;
    border-radius: 4px;
    font-size: 12px;
    letter-spacing: 0.27px;
  }
}
</style>