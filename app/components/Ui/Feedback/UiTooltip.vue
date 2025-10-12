<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ text: string; position?: 'top' | 'bottom' | 'left' | 'right' }>()
const show = ref(false)
</script>

<template>
  <div
      class="relative inline-flex items-center justify-center"
      @mouseenter="show = true"
      @mouseleave="show = false"
  >
    <slot />
    <transition name="fade">
      <div
          v-if="show"
          class="absolute z-50 text-xs bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white px-2 py-1 rounded-md whitespace-nowrap"
          :class="{
          'bottom-full mb-2': props.position === 'top' || !props.position,
          'top-full mt-2': props.position === 'bottom',
          'right-full me-2': props.position === 'left',
          'left-full ms-2': props.position === 'right'
        }"
      >
        {{ props.text }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .2s ease}
.fade-enter-from,.fade-leave-to{opacity:0}
</style>
