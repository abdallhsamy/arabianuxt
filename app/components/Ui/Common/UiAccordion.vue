<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronDown } from "lucide-vue-next";

export interface AccordionItem {
  id: string;
  title: string;
  content: string | (() => string);
  icon?: any;
  disabled?: boolean;
}

export interface UiAccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  orientation?: "vertical" | "horizontal";
  color?: "fuchsia" | "cyan" | "emerald" | "rose" | "indigo" | "amber";
  glow?: boolean;
  glass?: boolean;
  hover?: boolean;
}

const props = withDefaults(defineProps<UiAccordionProps>(), {
  multiple: false,
  orientation: "vertical",
  color: "fuchsia",
  glow: true,
  glass: true,
  hover: true,
});

const openItems = ref<string[]>([]);

const toggle = (id: string) => {
  if (openItems.value.includes(id)) {
    openItems.value = openItems.value.filter(item => item !== id);
  } else {
    openItems.value = props.multiple ? [...openItems.value, id] : [id];
  }
};

const isOpen = (id: string): boolean => openItems.value.includes(id);

const colors: Record<string, string> = {
  fuchsia: "from-fuchsia-500 to-indigo-500",
  cyan: "from-cyan-400 to-fuchsia-500",
  emerald: "from-emerald-400 to-cyan-400",
  rose: "from-rose-500 to-fuchsia-500",
  indigo: "from-indigo-500 to-cyan-400",
  amber: "from-amber-400 to-orange-500",
};

const colorClass = computed(() => colors[props.color]);
</script>

<template>
  <div
    class="relative w-full overflow-hidden border border-white/10 backdrop-blur-xl rounded-2xl"
    :class="[
      props.glass ? 'bg-white/5' : 'bg-gray-900',
      props.orientation === 'horizontal'
        ? 'flex divide-x divide-white/10'
        : 'flex flex-col divide-y divide-white/10',
    ]"
  >
    <div
      v-for="item in props.items"
      :key="item.id"
      class="relative flex"
      :class="[
        props.orientation === 'horizontal'
          ? 'flex-col w-full max-w-sm min-w-[220px]'
          : 'flex-col w-full',
        props.glow && isOpen(item.id)
          ? 'shadow-[0_0_20px_rgba(236,72,153,0.25)]'
          : '',
      ]"
    >
      <!-- Header -->
      <button
        type="button"
        @click="!item.disabled && toggle(item.id)"
        class="flex items-center justify-between gap-3 px-5 py-4 text-left transition-all relative group focus-visible:ring-2 ring-fuchsia-500/40"
        :class="[
          props.hover ? 'hover:bg-white/10' : '',
          isOpen(item.id) ? 'text-white' : 'text-gray-300',
          item.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
        ]"
      >
        <div class="flex items-center gap-2 truncate">
          <component
            v-if="item.icon"
            :is="item.icon"
            class="w-5 h-5 shrink-0"
          />
          <span class="truncate">{{ item.title }}</span>
        </div>

        <ChevronDown
          class="w-4 h-4 shrink-0 transition-transform duration-300"
          :class="isOpen(item.id) ? 'rotate-180 opacity-100' : 'opacity-70'"
        />

        <!-- Gradient indicator -->
        <div
          v-if="isOpen(item.id)"
          class="absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r"
          :class="colorClass"
        />
      </button>

      <!-- Content -->
      <transition name="accordion">
        <div
          v-show="isOpen(item.id)"
          class="px-5 py-4 text-sm text-gray-300 leading-relaxed transition-all"
          :class="[
            props.glass ? 'bg-white/5' : 'bg-gray-900',
            props.orientation === 'horizontal' ? 'flex-1 overflow-y-auto' : '',
          ]"
        >
          <slot :name="item.id">
            <div
              v-html="
                typeof item.content === 'function'
                  ? item.content()
                  : item.content
              "
            ></div>
          </slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
}
</style>
