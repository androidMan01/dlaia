<template>
    <div class="dialog_box" v-if="modelValue">
       <div class="dialog_box_body">
        <slot></slot>
       </div>
    </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])
const closeDialog = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.dialog_box {
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.82);
    z-index: 8888;
    height: 100vh;
    width: 100vw;
}
.dialog_box_body {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>