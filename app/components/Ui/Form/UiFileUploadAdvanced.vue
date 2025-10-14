<script setup lang="ts">
import { ref } from 'vue'

export interface UploadedFile {
  id: string
  name: string
  size: number
  progress: number
  preview?: string
}

const emit = defineEmits<{ (e: 'files', files: File[]): void }>()

const files = ref<UploadedFile[]>([])
const dragging = ref(false)
const fileInput = ref<HTMLInputElement>()

const handleFiles = (fileList: FileList | null) => {
  if (!fileList) return
  const arr = Array.from(fileList)
  files.value = arr.map((f) => ({
    id: crypto.randomUUID(),
    name: f.name,
    size: f.size,
    progress: 0,
  }))
  emit('files', arr)
}
</script>

<template>
  <div
      class="relative p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all"
      :class="dragging ? 'border-fuchsia-500 bg-fuchsia-500/10' : 'border-white/10 hover:border-white/20'"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="(e)=>{dragging=false;handleFiles(e.dataTransfer?.files || null)}"
      @click="fileInput?.click()"
  >
    <input
        ref="fileInput"
        type="file"
        multiple
        class="hidden"
        @change="(e)=>handleFiles((e.target as HTMLInputElement).files)"
    />
    <p class="text-gray-400">Drop files here or <span class="text-fuchsia-400">browse</span></p>

    <div v-if="files.length" class="mt-4 space-y-2">
      <div
          v-for="f in files"
          :key="f.id"
          class="flex justify-between items-center text-sm text-gray-300 bg-white/5 rounded px-3 py-2"
      >
        <span class="truncate max-w-[70%]">{{ f.name }}</span>
        <span class="text-gray-500">{{ (f.size / 1024).toFixed(1) }} KB</span>
      </div>
    </div>
  </div>
</template>
