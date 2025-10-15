<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { ChevronDown } from "lucide-vue-next";
import type { DropdownItem, UiDropdownProps } from "./UiDropdown.type";
import {
  UiDropdownTriggers,
  UiDropdownAligns,
  UiDropdownPositions,
  UiDropdownColors,
} from "./UiDropdown.type";

const props = withDefaults(defineProps<UiDropdownProps>(), {
  trigger: UiDropdownTriggers.Click,
  align: UiDropdownAligns.Left,
  position: UiDropdownPositions.Bottom,
  glow: true,
  glass: true,
  color: UiDropdownColors.Fuchsia,
});

const open = ref(false);
const activeIndex = ref<number | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);

const toggle = () => (open.value = !open.value);
const close = () => (open.value = false);
const openMenu = () => (open.value = true);

// Close on outside click
const handleClickOutside = (e: MouseEvent) => {
  if (!dropdownRef.value?.contains(e.target as Node)) close();
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside)
);

// Keyboard navigation
const onKeyDown = (e: KeyboardEvent) => {
  if (!open.value) return;
  const enabledItems = props.items.filter(i => !i.divider && !i.disabled);
  if (enabledItems.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    const next =
      activeIndex.value === null
        ? 0
        : (activeIndex.value + 1) % enabledItems.length;
    activeIndex.value = next;
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    const prev =
      activeIndex.value === null
        ? enabledItems.length - 1
        : (activeIndex.value - 1 + enabledItems.length) % enabledItems.length;
    activeIndex.value = prev;
  } else if (e.key === "Enter" && activeIndex.value !== null) {
    const item = enabledItems[activeIndex.value];
    if (item) {
      selectItem(item);
    }
  } else if (e.key === "Escape") {
    close();
  }
};

const selectItem = (item: DropdownItem) => {
  if (item.disabled || item.divider) return;
  emit("select", item);
  close();
};

const emit = defineEmits(["select"]);

// colors object removed as it was unused

// colorClass computed property removed as it was unused
</script>

<template>
  <div
    class="relative inline-block select-none"
    ref="dropdownRef"
    @keydown="onKeyDown"
    v-bind="
      props.trigger === UiDropdownTriggers.Hover
        ? { onMouseenter: openMenu, onMouseleave: close }
        : {}
    "
  >
    <!-- Trigger Button -->
    <button
      type="button"
      @click="props.trigger === UiDropdownTriggers.Click && toggle()"
      class="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-white/10 text-gray-200 bg-white/5 hover:bg-white/10 transition-all"
    >
      <component v-if="props.icon" :is="props.icon" class="w-4 h-4" />
      <span>{{ props.label }}</span>
      <ChevronDown class="w-4 h-4 opacity-70" />
    </button>

    <!-- Dropdown Menu -->
    <transition name="fade-scale">
      <div
        v-if="open"
        class="absolute z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl"
        :class="[
          props.glass ? 'bg-white/10' : 'bg-gray-900',
          props.glow ? 'shadow-[0_0_20px_rgba(236,72,153,0.35)]' : '',
          props.align === UiDropdownAligns.Right ? 'right-0' : 'left-0',
          props.position === UiDropdownPositions.Top
            ? 'bottom-full mb-2'
            : 'top-full mt-2',
        ]"
      >
        <ul class="py-2 max-h-60 overflow-y-auto" role="menu">
          <li
            v-for="(item, i) in props.items"
            :key="item.id"
            :class="[
              'flex items-center justify-between px-3 py-2.5 text-sm transition-all cursor-pointer select-none',
              item.divider ? 'border-t border-white/10 my-1' : '',
              item.disabled ? 'opacity-40 cursor-not-allowed' : '',
              activeIndex === i ? 'bg-white/10' : 'hover:bg-white/10',
            ]"
            @click="selectItem(item)"
            role="menuitem"
          >
            <div v-if="!item.divider" class="flex items-center gap-2">
              <component
                v-if="item.icon"
                :is="item.icon"
                class="w-4 h-4 shrink-0"
              />
              <span class="truncate text-gray-100">{{ item.label }}</span>
            </div>
            <span v-if="item.shortcut" class="text-xs text-gray-500 ms-3">{{
              item.shortcut
            }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
