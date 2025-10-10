<script setup lang="ts">
export interface UiConfirmDialogProps {
  modelValue: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}
const props = withDefaults(defineProps<UiConfirmDialogProps>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
})
const emit = defineEmits<{ (e:'update:modelValue', v:boolean): void; (e:'confirm'): void; (e:'cancel'): void }>()
const close = (): void => emit('update:modelValue', false)
const onConfirm = (): void => { emit('confirm'); close() }
const onCancel = (): void => { emit('cancel'); close() }
</script>

<template>
  <div v-if="props.modelValue" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/50" @click="onCancel"></div>
    <div class="absolute inset-0 flex items-center justify-center p-4">
      <div class="w-full max-w-md rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-5">
        <h3 class="text-gray-100 font-semibold">{{ props.title }}</h3>
        <p v-if="props.message" class="mt-2 text-sm text-gray-300">{{ props.message }}</p>
        <div class="mt-4 flex justify-end gap-2">
          <button class="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-gray-200" @click="onCancel">{{ props.cancelText }}</button>
          <button class="px-3 py-1.5 rounded-md bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white" @click="onConfirm">{{ props.confirmText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
