<script setup lang="ts">
import { ref } from 'vue'
export interface UiFileUploadProps { accept?: string; multiple?: boolean; maxSizeMb?: number }
const props = withDefaults(defineProps<UiFileUploadProps>(), { accept: '', multiple: true, maxSizeMb: 10 })
const emit = defineEmits<{ (e:'files', v: File[]): void; (e:'error', v:string): void }>()
const hovering = ref(false)

const onFiles = (list: FileList | null): void => {
  if (!list) return
  const files = Array.from(list)
  const tooBig = files.find(f => f.size > props.maxSizeMb * 1024 * 1024)
  if (tooBig) { emit('error', `File too big: ${tooBig.name}`); return }
  emit('files', files)
}

const onDrop = (e: DragEvent): void => {
  e.preventDefault(); hovering.value = false
  onFiles(e.dataTransfer?.files ?? null)
}
</script>

<template>
  <div
      class="rounded-2xl border border-dashed border-white/15 bg-white/5 backdrop-blur-xl p-6 text-center text-gray-300"
      :class="hovering ? 'bg-white/10' : ''"
      @dragover.prevent="hovering = true"
      @dragleave="hovering = false"
      @drop="onDrop"
  >
    <p class="mb-3">Drag & drop files here, or</p>
    <label class="inline-block px-3 py-1.5 rounded-md bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white cursor-pointer">
      Browse
      <input type="file" class="hidden" :accept="props.accept" :multiple="props.multiple" @change="onFiles(($event.target as HTMLInputElement)?.files || null)" />
    </label>
    <p class="mt-2 text-xs text-gray-500">Max {{ props.maxSizeMb }} MB each</p>
  </div>
</template>
