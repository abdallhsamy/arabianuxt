<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title?: string
  message?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'confirm'): void
}>()

const close = (): void => emit('update:modelValue', false)
const confirm = (): void => {
  emit('confirm')
  close()
}
</script>

<template>
  <transition name="fade">
    <div
        v-if="props.modelValue"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
        @click.self="close"
    >
      <div
          class="bg-white/10 backdrop-blur-xl rounded-xl p-6 w-full max-w-md border border-white/20 shadow-xl"
      >
        <h3 class="text-lg font-semibold text-gray-100 mb-2">
          {{ props.title || 'Confirm Action' }}
        </h3>
        <p class="text-gray-300 mb-6">
          {{ props.message || 'Are you sure you want to proceed?' }}
        </p>
        <div class="flex justify-end gap-3">
          <button
              class="px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 text-gray-200"
              @click="close"
          >
            Cancel
          </button>
          <button
              class="px-4 py-2 rounded-md bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white hover:opacity-90"
              @click="confirm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
