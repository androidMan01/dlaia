<script setup>
import { ref, onMounted, onUnmounted,  } from 'vue';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

const videoElement = ref(null);
const source = ref('https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4');
const type = ref('video/mp4');
const captions = ref('https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.en.vtt');

onMounted(() => {
      videoElement.value = new Plyr(videoElement.value, {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'captions',
          'settings',
          'pip',
          'fullscreen',
        ],
      });
    });

onUnmounted(() => {
    if (videoElement.value) {
    videoElement.value.destroy();
    }
});

</script>
<template>
    <div>
    <video ref="videoElement" playsinline controls>
      <source :src="source" :type="type" />
      <track v-if="captions" :src="captions" kind="captions" srclang="en" default />
    </video>
  </div>
</template>

<style scoped>
/* .video_container {
    width: 100%;
    height: 100%;
} */
</style>