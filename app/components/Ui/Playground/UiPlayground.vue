<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue'
import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

const props = defineProps<{ schema: PlaygroundSchema }>()

// Load component dynamically
const componentMap: Record<string, any> = {
  'Ui/Common/UiButton.vue': () => import('~/components/Ui/Common/UiButton.vue'),
  'Ui/Common/UiSelect.vue': () => import('~/components/Ui/Common/UiSelect.vue'),
  'Ui/Common/UiSwitch.vue': () => import('~/components/Ui/Common/UiSwitch.vue'),
}

const Component = defineAsyncComponent(componentMap[props.schema.component])

// Reactive prop values
const values = ref<Record<string, any>>(
    Object.fromEntries(props.schema.props.map(p => [p.key, p.default ?? (p.type === 'boolean' ? false : '')]))
)

// Build props for code preview
const codeSnippet = computed(() => {
  const entries = Object.entries(values.value)
      .filter(([_, val]) => val !== '' && val !== false)
      .map(([k, v]) => {
        if (typeof v === 'boolean') return `:${k}="${v}"`
        if (typeof v === 'string' && v.includes(' ')) return `:${k}="'${v}'"`
        return typeof v === 'string' ? `${k}="${v}"` : `:${k}="${v}"`
      })
  return `<${props.schema.component.split('/').pop()} ${entries.join(' ')} />`
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Control Panel -->
    <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl space-y-5">
      <h2 class="text-gray-300 font-semibold text-lg mb-2">{{ schema.title }} Settings</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <template v-for="field in schema.props" :key="field.key">
          <div v-if="field.type === 'string'" class="flex flex-col">
            <label class="text-gray-400 text-sm mb-1">{{ field.label || field.key }}</label>
            <input
                v-model="values[field.key]"
                type="text"
                class="rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white focus:ring-1 ring-fuchsia-500/50 focus:outline-none"
            />
          </div>
          <div v-else-if="field.type === 'boolean'" class="flex items-center gap-2 text-gray-300 text-sm">
            <input type="checkbox" v-model="values[field.key]" class="accent-fuchsia-500" />
            <label>{{ field.label || field.key }}</label>
          </div>
          <div v-else-if="field.type === 'enum'" class="flex flex-col">
            <label class="text-gray-400 text-sm mb-1">{{ field.label || field.key }}</label>
            <select
                v-model="values[field.key]"
                class="rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white focus:ring-1 ring-fuchsia-500/50 focus:outline-none"
            >
              <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
        </template>
      </div>
    </div>

    <!-- Preview Panel -->
    <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center space-y-6">
      <h2 class="text-gray-300 font-semibold text-lg">Live Preview</h2>
      <component :is="Component" v-bind="values" />
      <div class="w-full">
        <p class="text-gray-400 text-sm mb-2">Generated Code:</p>
        <pre
            class="bg-black/40 border border-white/10 rounded-xl text-gray-200 text-xs text-left p-3 overflow-x-auto select-all"
        >{{ codeSnippet }}</pre>
      </div>
    </div>
  </div>
</template>
