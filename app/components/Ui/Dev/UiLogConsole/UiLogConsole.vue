<script setup lang="ts">
import { ref, computed } from "vue";
import type {
  UiLogConsoleLogLevel,
  UiLogConsoleProps,
  UiLogConsoleEmits,
} from "./UiLogConsole.type";
import {
  UiLogConsoleLogLevels,
  UiLogConsoleDefaultValues,
} from "./UiLogConsole.type";

const props = withDefaults(defineProps<UiLogConsoleProps>(), {
  modelValue: UiLogConsoleDefaultValues.ModelValue,
  autoScroll: UiLogConsoleDefaultValues.AutoScroll,
});

const emit = defineEmits<UiLogConsoleEmits>();

const levels = ref<Record<UiLogConsoleLogLevel, boolean>>({
  [UiLogConsoleLogLevels.Debug]: true,
  [UiLogConsoleLogLevels.Info]: true,
  [UiLogConsoleLogLevels.Warn]: true,
  [UiLogConsoleLogLevels.Error]: true,
});
const paused = ref(false);

const show = computed(() =>
  (props.modelValue || []).filter(l => levels.value[l.level])
);

const clear = (): void => emit("update:modelValue", []);
const toggle = (lvl: UiLogConsoleLogLevel): void => {
  levels.value[lvl] = !levels.value[lvl];
};
</script>

<template>
  <div
    class="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl overflow-hidden"
  >
    <header
      class="flex items-center gap-2 px-3 py-2 border-b border-white/10 text-sm text-gray-300"
    >
      <button
        class="px-2 py-1 rounded bg-white/5 hover:bg-white/10"
        @click="paused = !paused"
      >
        {{ paused ? "Resume" : "Pause" }}
      </button>
      <button
        class="px-2 py-1 rounded bg-white/5 hover:bg-white/10"
        @click="clear"
      >
        Clear
      </button>
      <div class="ms-auto flex items-center gap-2">
        <label
          v-for="l in Object.values(UiLogConsoleLogLevels)"
          :key="l"
          class="flex items-center gap-1"
        >
          <input
            type="checkbox"
            class="accent-fuchsia-500"
            :checked="levels[l]"
            @change="toggle(l)"
          />
          <span class="capitalize">{{ l }}</span>
        </label>
      </div>
    </header>

    <div class="max-h-72 overflow-auto font-mono text-[12px]">
      <div v-for="log in show" :key="log.id" class="px-3 py-1.5 whitespace-pre">
        <span class="opacity-50 me-2">
          {{ new Date(log.ts).toLocaleTimeString() }}
        </span>
        <span
          class="uppercase text-[10px] px-1.5 py-0.5 rounded me-2"
          :class="{
            'bg-cyan-500/20 text-cyan-200':
              log.level === UiLogConsoleLogLevels.Debug ||
              log.level === UiLogConsoleLogLevels.Info,
            'bg-amber-500/20 text-amber-200':
              log.level === UiLogConsoleLogLevels.Warn,
            'bg-rose-500/20 text-rose-200':
              log.level === UiLogConsoleLogLevels.Error,
          }"
          >{{ log.level }}</span
        >
        <span class="text-gray-200">{{ log.message }}</span>
      </div>
      <div v-if="!show.length" class="p-4 text-gray-500 text-sm">No Logs</div>
    </div>
  </div>
</template>
