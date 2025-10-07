<script setup lang="ts">
const props = withDefaults(defineProps<{
  open: boolean
  title?: string
  confirmText?: string
  cancelText?: string
}>(), {
  title: 'Confirm',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'confirm'): void
}>()

const close = (): void => emit('update:open', false)
const confirm = (): void => emit('confirm')
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
    <div class="p-[2px] rounded-3xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_50%,#22D3EE_100%)] animate-rotate-gradient max-w-sm w-full">
      <div class="rounded-3xl bg-[rgba(15,17,23,0.95)] p-6 border border-white/10">
        <h3 class="text-white text-lg font-semibold mb-3">{{ title }}</h3>
        <div class="text-sm text-gray-300 mb-6">
          <slot />
        </div>
        <div class="flex justify-end gap-3">
          <button class="px-4 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition-all" @click="close">
            {{ cancelText }}
          </button>
          <button class="px-4 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 transition-all" @click="confirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes rotate-gradient { to { --angle: 360deg; } }
.animate-rotate-gradient { background-size: 200% 200%; animation: rotate-gradient 12s linear infinite; }
</style>
