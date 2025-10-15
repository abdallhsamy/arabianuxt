<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { UiTabsProps, TabItem } from "./UiTabs.type";
import { UiTabsVariants, UiTabsColors } from "./UiTabs.type";

const props = withDefaults(defineProps<UiTabsProps>(), {
  variant: UiTabsVariants.Underline,
  color: UiTabsColors.Fuchsia,
  vertical: false,
  glow: true,
});

const emit = defineEmits(["update:modelValue", "change"]);

const activeId = ref(props.modelValue || props.items[0]?.id);
watch(
  () => props.modelValue,
  v => (activeId.value = v)
);

const select = (id: string) => {
  if (props.items.find(t => t.id === id)?.disabled) return;
  activeId.value = id;
  emit("update:modelValue", id);
  emit("change", id);
};

const colors: Record<string, string> = {
  [UiTabsColors.Fuchsia]: "from-fuchsia-500 to-indigo-500",
  [UiTabsColors.Cyan]: "from-cyan-400 to-fuchsia-500",
  [UiTabsColors.Emerald]: "from-emerald-400 to-cyan-400",
  [UiTabsColors.Rose]: "from-rose-500 to-fuchsia-500",
  [UiTabsColors.Indigo]: "from-indigo-500 to-cyan-400",
};

const colorClass = computed(() => colors[props.color]);
</script>

<template>
  <div class="flex" :class="vertical ? 'flex-row gap-6' : 'flex-col gap-6'">
    <!-- Tabs list -->
    <div
      class="relative flex flex-wrap items-center gap-2"
      role="tablist"
      :aria-orientation="vertical ? 'vertical' : 'horizontal'"
      :class="[
        vertical ? 'flex-col items-stretch' : 'flex-row',
        props.variant === UiTabsVariants.Pill
          ? 'bg-white/5 p-1 rounded-xl'
          : '',
      ]"
    >
      <button
        v-for="tab in props.items"
        :key="tab.id"
        role="tab"
        :aria-selected="tab.id === activeId"
        :disabled="tab.disabled"
        @click="select(tab.id)"
        @keydown.enter.prevent="select(tab.id)"
        @keydown.space.prevent="select(tab.id)"
        class="relative font-medium transition-all duration-200 flex items-center justify-center gap-2 px-4 py-2 text-sm outline-none focus-visible:ring-2 ring-fuchsia-500/40 rounded-lg"
        :class="[
          tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
          props.variant === UiTabsVariants.Pill
            ? tab.id === activeId
              ? `bg-gradient-to-r ${colorClass} text-white shadow-lg`
              : 'text-gray-300 hover:bg-white/10'
            : tab.id === activeId
              ? 'text-white'
              : 'text-gray-400 hover:text-white',
        ]"
      >
        <component v-if="tab.icon" :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
        <!-- Underline indicator -->
        <span
          v-if="
            props.variant === UiTabsVariants.Underline && tab.id === activeId
          "
          class="absolute left-0 bottom-0 h-[2px] w-full rounded-full bg-gradient-to-r"
          :class="colorClass"
        />
      </button>
    </div>

    <!-- Tab content -->
    <div class="relative flex-1 text-gray-200 text-sm">
      <transition name="fade">
        <div v-if="activeId && $slots[activeId]" :key="activeId">
          <slot :name="activeId" />
        </div>
      </transition>
    </div>
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
  transform: translateY(5px);
}
</style>
