<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { ChevronDown, X, Loader2, Search } from 'lucide-vue-next'

export interface UiSelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface UiSelectProps {
  modelValue: string | number | null
  label?: string
  placeholder?: string
  options?: UiSelectOption[]
  clearable?: boolean
  searchable?: boolean
  disabled?: boolean
  loading?: boolean
  asyncOptions?: boolean
}

const props = withDefaults(defineProps<UiSelectProps>(), {
  placeholder: 'Select option...',
  options: () => [],
  modelValue: null,
  searchable: false,
  clearable: false,
  disabled: false,
  loading: false,
  asyncOptions: false
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'load'])

const isOpen = ref(false)
const searchQuery = ref('')
const internalLoading = ref(false)
const localOptions = ref<UiSelectOption[]>([])

onMounted(async () => {
  if (props.asyncOptions) {
    internalLoading.value = true
    emit('load')
    await new Promise(r => setTimeout(r, 1000)) // simulate load delay
    localOptions.value = props.options
    internalLoading.value = false
  } else {
    localOptions.value = props.options
  }
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) return localOptions.value
  return localOptions.value.filter(opt =>
      opt.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectedLabel = computed(() => {
  const found = localOptions.value.find(o => o.value === props.modelValue)
  return found?.label || ''
})

const toggleOpen = async () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value && props.searchable) await nextTick(() => inputRef.value?.focus())
}

const selectOption = (opt: UiSelectOption) => {
  if (opt.disabled) return
  emit('update:modelValue', opt.value)
  isOpen.value = false
  searchQuery.value = ''
}

const clearValue = () => {
  emit('update:modelValue', null)
}

const inputRef = ref<HTMLInputElement | null>(null)
</script>

<template>
  <div class="flex flex-col gap-1.5 relative" @keydown.esc="isOpen = false">
    <label v-if="label" class="text-sm text-gray-300 font-medium">{{ label }}</label>

    <!-- Select Trigger -->
    <div
        class="flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-200 backdrop-blur-lg cursor-pointer select-none"
        :class="{
        'opacity-50 cursor-not-allowed': disabled,
        'ring-2 ring-fuchsia-500/40 border-fuchsia-500/30': isOpen
      }"
        role="button"
        tabindex="0"
        @click="toggleOpen"
    >
      <span class="truncate text-sm" v-if="selectedLabel">{{ selectedLabel }}</span>
      <span class="text-gray-500 text-sm" v-else>{{ placeholder }}</span>

      <div class="flex items-center gap-2">
        <button
            v-if="clearable && props.modelValue"
            @click.stop="clearValue"
            class="text-gray-400 hover:text-white"
        >
          <X class="w-4 h-4" />
        </button>
        <ChevronDown
            class="w-4 h-4 transition-transform"
            :class="{ 'rotate-180': isOpen }"
        />
      </div>
    </div>

    <!-- Dropdown -->
    <transition name="fade">
      <div
          v-if="isOpen"
          class="absolute z-50 mt-1 w-full rounded-2xl border border-white/10 bg-[rgba(15,17,23,0.95)] backdrop-blur-2xl shadow-xl overflow-hidden"
      >
        <!-- Search -->
        <div v-if="props.searchable" class="flex items-center gap-2 p-2 border-b border-white/10">
          <Search class="w-4 h-4 text-gray-400" />
          <input
              ref="inputRef"
              v-model="searchQuery"
              placeholder="Search..."
              class="flex-1 bg-transparent text-gray-200 text-sm outline-none"
          />
        </div>

        <!-- Loading -->
        <div v-if="props.loading || internalLoading" class="p-4 flex justify-center text-gray-400">
          <Loader2 class="w-5 h-5 animate-spin" />
        </div>

        <!-- Options -->
        <ul
            v-else
            class="max-h-56 overflow-y-auto text-sm text-gray-200"
            role="listbox"
        >
          <li
              v-for="opt in filteredOptions"
              :key="opt.value"
              :class="[
              'px-4 py-2 cursor-pointer transition',
              opt.disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/10'
            ]"
              @click="selectOption(opt)"
          >
            {{ opt.label }}
          </li>
          <li v-if="!filteredOptions.length" class="px-4 py-3 text-gray-400 text-sm">
            No results found
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
