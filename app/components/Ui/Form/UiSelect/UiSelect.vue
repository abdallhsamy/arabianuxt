<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { ChevronDown, Check, Search } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import {
  UiSelectDefaults,
  UiSelectParentThemes,
  type UiSelectProps,
  UiSelectSizes,
  UiSelectStates,
  UiSelectVariants,
} from "./UiSelect.type";

const { t } = useI18n();

const props = withDefaults(defineProps<UiSelectProps>(), UiSelectDefaults);

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const isFocused = ref(false);
const searchQuery = ref("");
const dropdownRef = ref<HTMLElement>();
const triggerRef = ref<HTMLElement>();

// --- Size mapping: fixed heights to avoid layout shift ---
const sizeMap: Record<
  Required<UiSelectProps>["size"],
  { h: string; font: string; caret: string }
> = {
  [UiSelectSizes.Small]: { h: "h-10", font: "text-sm", caret: "w-4 h-4" },
  [UiSelectSizes.Medium]: { h: "h-11", font: "text-sm", caret: "w-4 h-4" },
  [UiSelectSizes.Large]: { h: "h-12", font: "text-base", caret: "w-5 h-5" },
};
const s = computed(() => sizeMap[props.size]);

const filteredOptions = computed(() =>
  props.searchable
    ? props.options.filter(o =>
        o.label.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    : props.options
);

const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue);
  return found ? found.label : "";
});

// Float label when focused or has a value
const shouldFloat = computed(() => isFocused.value || !!selectedLabel.value);

const toggleOpen = (): void => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  isFocused.value = isOpen.value;
};

const selectOption = (value: string | number): void => {
  emit("update:modelValue", value);
  isOpen.value = false;
  isFocused.value = false;
};

const onDocClick = (e: MouseEvent): void => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(e.target as Node) &&
    triggerRef.value &&
    !triggerRef.value.contains(e.target as Node)
  ) {
    isOpen.value = false;
    isFocused.value = false;
  }
};

onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));

watch(
  () => isOpen.value,
  open => open && nextTick(() => dropdownRef.value?.focus())
);
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full relative">
    <!-- Trigger (fixed height via size map) -->
    <div
      ref="triggerRef"
      class="relative flex items-center justify-between rounded-xl backdrop-blur-xl transition-all border cursor-pointer select-none"
      :class="[
        s.h, // <- fixed control height
        props.variant === UiSelectVariants.Default && 'bg-white/5',
        props.variant === UiSelectVariants.Outlined && 'bg-transparent',
        props.variant === UiSelectVariants.Filled && 'bg-white/10',
        props.disabled && 'opacity-50 pointer-events-none',
        isFocused
          ? 'ring-2 ring-fuchsia-500/40 border-white/10'
          : 'border-white/10',
      ]"
      @click="toggleOpen"
    >
      <!-- Floating label -->
      <label
        v-if="props.label"
        class="absolute ltr:left-3 rtl:right-3 transition-all duration-300 pointer-events-none select-none"
        :class="[
          shouldFloat
            ? [
                '-top-2 translate-y-0 text-xs font-medium px-2 rounded-md border backdrop-blur-md',
                props.parentTheme === UiSelectParentThemes.Gradient
                  ? 'bg-gradient-to-r from-fuchsia-500/40 to-cyan-500/40 border-transparent text-white'
                  : props.parentTheme === UiSelectParentThemes.Light
                    ? 'bg-black/70 border-white/20 text-white'
                    : 'bg-gray-900/85 border-white/15 text-fuchsia-300',
                'shadow-[0_0_6px_rgba(0,0,0,0.35)]',
              ]
            : // Center label vertically when not floating (prevents height changes)
              ['top-1/2 -translate-y-1/2 text-gray-400', s.font],
        ]"
        style="text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7)"
      >
        {{ props.label }}
      </label>

      <!-- Value / Placeholder (no vertical padding; container controls height) -->
      <div class="flex-1 px-3 truncate" :class="s.font">
        <span v-if="selectedLabel" class="text-gray-100">
          {{ selectedLabel }}
        </span>
        <span v-else-if="shouldFloat" class="text-gray-500">
          {{ props.placeholder || t("components.uiSelect.placeholder") }}
        </span>
      </div>

      <ChevronDown
        class="me-3 text-gray-400 transition-transform duration-200"
        :class="[s.caret, { 'rotate-180': isOpen }]"
      />
    </div>

    <!-- Dropdown -->
    <transition name="fade">
      <div
        v-if="isOpen"
        ref="dropdownRef"
        tabindex="-1"
        class="absolute z-50 mt-1 w-full border border-white/10 rounded-xl backdrop-blur-xl bg-black/70 shadow-2xl max-h-64 overflow-auto"
      >
        <!-- Search -->
        <div
          v-if="props.searchable"
          class="flex items-center px-3 py-2 border-b border-white/10"
        >
          <Search class="w-4 h-4 text-gray-400 me-2" />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('components.uiSelect.searchPlaceholder')"
            class="bg-transparent text-gray-100 text-sm outline-none w-full"
          />
        </div>

        <ul class="divide-y divide-white/5">
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            @click="selectOption(option.value)"
            class="px-4 py-2 flex items-center justify-between cursor-pointer transition-all hover:bg-white/10"
            :class="[
              s.font,
              option.value === props.modelValue
                ? 'text-fuchsia-300'
                : 'text-gray-200',
            ]"
          >
            <span>{{ option.label }}</span>
            <Check
              v-if="option.value === props.modelValue"
              class="w-4 h-4 text-fuchsia-400"
            />
          </li>
        </ul>
      </div>
    </transition>

    <!-- Helper message -->
    <p
      v-if="props.message"
      class="text-xs mt-0.5"
      :class="{
        'text-emerald-400': props.state === UiSelectStates.Success,
        'text-amber-400': props.state === UiSelectStates.Warning,
        'text-rose-400': props.state === UiSelectStates.Error,
        'text-gray-400': props.state === UiSelectStates.None,
      }"
    >
      {{ props.message }}
    </p>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
