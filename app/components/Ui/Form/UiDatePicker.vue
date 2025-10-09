<script setup lang="ts">
import { ref } from 'vue'
import DatePicker from 'vue3-hijri-gregorian-datepicker'
import 'vue3-hijri-gregorian-datepicker/dist/style.css'
import { ChevronDown } from 'lucide-vue-next'

export interface UiDatePickerProps {
  modelValue: Date | { date: string; type: 'hijri' | 'gregorian' } | null
  label?: string
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<UiDatePickerProps>(), {
  size: 'md',
  disabled: false,
})

const emit = defineEmits(['update:modelValue'])
const isOpen = ref(false)
const selected = ref(props.modelValue)

const onSelect = (val: any) => {
  emit('update:modelValue', val)
  selected.value = val
  isOpen.value = false
}
</script>

<template>
  <div class="relative w-full">
    <!-- Trigger Input-like box -->
    <div
        @click="!props.disabled && (isOpen = !isOpen)"
        class="flex items-center justify-between rounded-xl border border-white/10 backdrop-blur-xl bg-white/5 px-3 cursor-pointer"
        :class="{
        'opacity-50 pointer-events-none': props.disabled,
        'h-11': props.size === 'md'
      }"
    >
      <span class="truncate text-gray-100">
        {{ selected ? (typeof selected === 'object' ? selected.date : selected) : (props.placeholder || 'Select date') }}
      </span>
      <ChevronDown class="w-4 h-4 text-gray-400" />
    </div>

    <transition name="fade">
      <div v-if="isOpen" class="absolute z-50 mt-1 w-full bg-black/70 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl">
        <DatePicker
            :modelValue="selected"
            :initialType="'gregorian'"
            :withTime="false"
            @update:modelValue="onSelect"
        />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
