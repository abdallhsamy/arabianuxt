<script setup lang="ts">
import { computed } from "vue";
import { Check, AlertCircle } from "lucide-vue-next";
import type { UiStepperProps } from "./UiStepper.type";
import { UiStepperColors, UiStepperStates } from "./UiStepper.type";

const props = withDefaults(defineProps<UiStepperProps>(), {
  vertical: false,
  color: UiStepperColors.Fuchsia,
  glow: true,
  showNumbers: true,
  connectLines: true,
});

const emit = defineEmits(["change"]);

const selectStep = (id: string) => emit("change", id);

const colors: Record<string, string> = {
  [UiStepperColors.Fuchsia]: "from-fuchsia-500 to-indigo-500",
  [UiStepperColors.Cyan]: "from-cyan-400 to-fuchsia-500",
  [UiStepperColors.Emerald]: "from-emerald-400 to-cyan-400",
  [UiStepperColors.Rose]: "from-rose-500 to-fuchsia-500",
  [UiStepperColors.Indigo]: "from-indigo-500 to-cyan-400",
  [UiStepperColors.Amber]: "from-amber-400 to-orange-500",
};

const colorClass = computed(() => colors[props.color]);
</script>

<template>
  <div
    class="flex"
    :class="
      vertical ? 'flex-col gap-6' : 'flex-row items-start justify-between gap-3'
    "
  >
    <div
      v-for="(step, index) in steps"
      :key="step.id"
      class="flex items-start"
      :class="
        vertical ? 'flex-row' : 'flex-col items-center text-center flex-1'
      "
    >
      <!-- Connector line -->
      <div
        v-if="connectLines && index !== 0"
        :class="[
          'absolute',
          vertical
            ? 'h-[calc(100%-2rem)] w-[2px] left-[11px] top-8'
            : 'w-[calc(100%-3rem)] h-[2px] top-[17px] left-[50%] translate-x-[-50%]',
          'bg-white/10 z-0',
        ]"
      ></div>

      <!-- Step circle -->
      <div
        class="relative z-10 flex items-center justify-center rounded-full border border-white/10 text-gray-200 transition-all duration-300"
        :class="[
          step.state === UiStepperStates.Completed
            ? `bg-gradient-to-r ${colorClass} text-white border-transparent`
            : step.state === UiStepperStates.Active
              ? `bg-white/10 text-white ring-2 ring-fuchsia-500/40`
              : step.state === UiStepperStates.Error
                ? 'bg-rose-500/20 text-rose-300 border-rose-400/30'
                : 'bg-white/5 text-gray-400',
          props.glow && step.state === UiStepperStates.Active
            ? 'shadow-[0_0_15px_rgba(236,72,153,0.4)]'
            : '',
          'w-10 h-10 shrink-0 backdrop-blur-xl',
        ]"
        @click="selectStep(step.id)"
        role="button"
        tabindex="0"
      >
        <component
          v-if="step.state === UiStepperStates.Completed"
          :is="Check"
          class="w-5 h-5"
        />
        <component
          v-else-if="step.state === UiStepperStates.Error"
          :is="AlertCircle"
          class="w-5 h-5"
        />
        <component v-else-if="step.icon" :is="step.icon" class="w-5 h-5" />
        <span v-else-if="showNumbers" class="font-semibold text-sm">{{
          index + 1
        }}</span>
      </div>

      <!-- Labels -->
      <div class="flex flex-col" :class="vertical ? 'ms-4' : 'mt-3'">
        <span
          class="text-sm font-medium"
          :class="[
            step.state === UiStepperStates.Active
              ? 'text-white'
              : step.state === UiStepperStates.Completed
                ? 'text-gray-300'
                : step.state === UiStepperStates.Error
                  ? 'text-rose-400'
                  : 'text-gray-400',
          ]"
        >
          {{ step.label }}
        </span>
        <span v-if="step.description" class="text-xs text-gray-500">
          {{ step.description }}
        </span>
      </div>
    </div>
  </div>
</template>
