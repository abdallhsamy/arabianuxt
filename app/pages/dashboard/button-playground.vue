<script setup lang="ts">
import UiButton from '~/components/Ui/Common/UiButton.vue'
import { Check, X, Bell, Heart, Star, Power } from 'lucide-vue-next'
import { ref, computed } from 'vue'

const label = ref('Click Me')
const variant = ref<'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'glass'>('primary')
const size = ref<'sm' | 'md' | 'lg'>('md')
const loading = ref(false)
const disabled = ref(false)
const iconOnly = ref(false)
const iconPosition = ref<'left' | 'right'>('left')
const icon = ref<any>('Check')
const toggleable = ref(false)
const full = ref(false)
const modelValue = ref(false)

const iconMap = { Check, X, Bell, Heart, Star, Power }
const selectedIcon = computed(() => iconMap[icon.value] || null)

const codeSnippet = computed(() => {
  const props: string[] = []
  if (label.value && !iconOnly.value) props.push(`label="${label.value}"`)
  if (variant.value !== 'primary') props.push(`variant="${variant.value}"`)
  if (size.value !== 'md') props.push(`size="${size.value}"`)
  if (loading.value) props.push(`:loading="true"`)
  if (disabled.value) props.push(`:disabled="true"`)
  if (iconOnly.value) props.push(`icon-only`)
  if (toggleable.value) props.push(`toggleable`)
  if (full.value) props.push(`full`)
  if (selectedIcon.value) props.push(`:icon="${icon.value}"`)
  if (iconPosition.value === 'right') props.push(`icon-position="right"`)
  return `<UiButton ${props.join(' ')} />`
})
</script>

<template>
  <section class="space-y-10">
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
      Button Playground
    </h1>
    <p class="text-gray-400 text-sm max-w-2xl">
      Design and preview your button interactively. Adjust properties, see instant changes, and copy the Vue code.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Controls Panel -->
      <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl space-y-5">
        <h2 class="text-gray-300 font-semibold text-lg mb-2">Button Settings</h2>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="text-gray-400 text-sm mb-1">Label</label>
            <input
                v-model="label"
                type="text"
                class="rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white focus:ring-1 ring-fuchsia-500/50 focus:outline-none"
                :disabled="iconOnly"
            />
          </div>

          <div class="flex flex-col">
            <label class="text-gray-400 text-sm mb-1">Variant</label>
            <select
                v-model="variant"
                class="rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white focus:ring-1 ring-fuchsia-500/50 focus:outline-none"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
              <option value="outline">Outline</option>
              <option value="glass">Glass</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label class="text-gray-400 text-sm mb-1">Size</label>
            <select
                v-model="size"
                class="rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white focus:ring-1 ring-fuchsia-500/50 focus:outline-none"
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label class="text-gray-400 text-sm mb-1">Icon</label>
            <select
                v-model="icon"
                class="rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white focus:ring-1 ring-fuchsia-500/50 focus:outline-none"
            >
              <option value="Check">Check</option>
              <option value="X">X</option>
              <option value="Bell">Bell</option>
              <option value="Heart">Heart</option>
              <option value="Star">Star</option>
              <option value="Power">Power</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          <label class="flex items-center gap-2 text-gray-300 text-sm">
            <input type="checkbox" v-model="loading" class="accent-fuchsia-500" /> Loading
          </label>
          <label class="flex items-center gap-2 text-gray-300 text-sm">
            <input type="checkbox" v-model="disabled" class="accent-fuchsia-500" /> Disabled
          </label>
          <label class="flex items-center gap-2 text-gray-300 text-sm">
            <input type="checkbox" v-model="iconOnly" class="accent-fuchsia-500" /> Icon-only
          </label>
          <label class="flex items-center gap-2 text-gray-300 text-sm">
            <input type="checkbox" v-model="toggleable" class="accent-fuchsia-500" /> Toggleable
          </label>
          <label class="flex items-center gap-2 text-gray-300 text-sm">
            <input type="checkbox" v-model="full" class="accent-fuchsia-500" /> Full width
          </label>
          <label class="flex items-center gap-2 text-gray-300 text-sm">
            <input
                type="radio"
                value="left"
                v-model="iconPosition"
                name="iconPos"
                class="accent-fuchsia-500"
            />
            Icon Left
          </label>
          <label class="flex items-center gap-2 text-gray-300 text-sm">
            <input
                type="radio"
                value="right"
                v-model="iconPosition"
                name="iconPos"
                class="accent-fuchsia-500"
            />
            Icon Right
          </label>
        </div>
      </div>

      <!-- Preview Panel -->
      <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center space-y-6">
        <h2 class="text-gray-300 font-semibold text-lg">Live Preview</h2>
        <UiButton
            :label="!iconOnly ? label : ''"
            :icon="selectedIcon"
            :variant="variant"
            :size="size"
            :loading="loading"
            :disabled="disabled"
            :icon-only="iconOnly"
            :icon-position="iconPosition"
            :toggleable="toggleable"
            v-model="modelValue"
            :full="full"
        />
        <div class="w-full">
          <p class="text-gray-400 text-sm mb-2">Generated Code:</p>
          <pre
              class="bg-black/40 border border-white/10 rounded-xl text-gray-200 text-xs text-left p-3 overflow-x-auto select-all"
          >{{ codeSnippet }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>
