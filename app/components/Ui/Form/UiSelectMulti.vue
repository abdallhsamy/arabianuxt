<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { X, ChevronDown, Check, Search } from 'lucide-vue-next'

export interface Option { label: string; value: string | number }

export interface UiSelectMultiProps {
  modelValue: Array<string | number> | null | undefined
  options: Option[]
  label?: string
  placeholder?: string
  searchable?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<UiSelectMultiProps>(), {
  searchable: true,
  disabled: false,
  size: 'md',
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: Array<string | number>): void
}>()

const isOpen = ref(false)
const search = ref('')
const triggerRef = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()

// ✅ Normalize modelValue so we NEVER call .includes on non-array
const selectedValues = computed<(string | number)[]>(() =>
    Array.isArray(props.modelValue) ? props.modelValue : []
)

const s = computed(() => ({
  sm: { h: 'min-h-[2.25rem] text-sm', chip: 'text-xs py-0.5 px-2' },
  md: { h: 'min-h-[2.75rem] text-sm', chip: 'text-xs py-0.5 px-2' },
  lg: { h: 'min-h-[3rem] text-base', chip: 'text-sm py-1 px-2.5' },
}[props.size]))

const selectedOptions = computed(() =>
    props.options.filter(o => selectedValues.value.includes(o.value))
)

const filtered = computed(() =>
    props.options.filter(o =>
        o.label.toLowerCase().includes(search.value.toLowerCase())
    )
)

const toggleOpen = (): void => { if (!props.disabled) isOpen.value = !isOpen.value }
const close = (): void => { isOpen.value = false }

const clickOutside = (e: MouseEvent): void => {
  if (!triggerRef.value || !dropdownRef.value) return
  const t = e.target as Node
  if (!triggerRef.value.contains(t) && !dropdownRef.value.contains(t)) close()
}
onMounted(() => document.addEventListener('click', clickOutside))
onBeforeUnmount(() => document.removeEventListener('click', clickOutside))

const isSelected = (val: string | number): boolean =>
    selectedValues.value.includes(val)

const removeValue = (val: string | number): void => {
  emit('update:modelValue', selectedValues.value.filter(v => v !== val))
}

const toggleValue = (val: string | number): void => {
  emit(
      'update:modelValue',
      isSelected(val)
          ? selectedValues.value.filter(v => v !== val)
          : [...selectedValues.value, val]
  )
}

const shouldFloat = computed<boolean>(() => isOpen.value || selectedValues.value.length > 0)
</script>

<template>
  <div class="relative w-full">
    <!-- Trigger -->
    <div
        ref="triggerRef"
        class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-2 cursor-pointer select-none"
        :class="[s.h, props.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10']"
        @click="toggleOpen"
    >
      <!-- Floating label -->
      <label
          v-if="props.label"
          class="absolute left-3 transition-all duration-300 pointer-events-none select-none"
          :class="[
          shouldFloat
            ? '-top-2 text-xs bg-gray-900/85 text-fuchsia-300 px-2 rounded-md border border-white/15'
            : 'top-1/2 -translate-y-1/2 text-gray-400'
        ]"
      >
        {{ props.label }}
      </label>

      <!-- Chips / Placeholder -->
      <div class="flex flex-wrap items-center gap-1 flex-1">
        <template v-if="selectedOptions.length">
          <span
              v-for="o in selectedOptions"
              :key="o.value"
              class="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/10 text-gray-100"
              :class="s.chip"
          >
            {{ o.label }}
            <button
                class="opacity-80 hover:opacity-100"
                @click.stop="removeValue(o.value)"
                aria-label="Remove"
                type="button"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </span>
        </template>
        <span
            v-else-if="shouldFloat && props.placeholder"
            class="text-gray-500"
        >
          {{ props.placeholder }}
        </span>
      </div>

      <ChevronDown class="w-4 h-4 text-gray-400" :class="{ 'rotate-180': isOpen }" />
    </div>

    <!-- Dropdown -->
    <transition name="fade">
      <div
          v-if="isOpen"
          ref="dropdownRef"
          class="absolute z-50 mt-1 w-full border border-white/10 rounded-xl backdrop-blur-xl bg-black/70 shadow-2xl max-h-64 overflow-auto"
      >
        <div v-if="props.searchable" class="flex items-center px-3 py-2 border-b border-white/10">
          <Search class="w-4 h-4 text-gray-400 me-2" />
          <input
              v-model="search"
              type="text"
              placeholder="Search..."
              class="bg-transparent text-gray-100 text-sm outline-none w-full"
          />
        </div>

        <ul class="divide-y divide-white/5">
          <li
              v-for="o in filtered"
              :key="o.value"
              @click="toggleValue(o.value)"
              class="px-4 py-2 flex items-center justify-between text-sm cursor-pointer hover:bg-white/10"
              :class="isSelected(o.value) ? 'text-fuchsia-300' : 'text-gray-200'"
          >
            <span>{{ o.label }}</span>
            <Check v-if="isSelected(o.value)" class="w-4 h-4 text-fuchsia-400" />
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
