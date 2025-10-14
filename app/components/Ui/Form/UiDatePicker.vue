<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Globe2,
} from "lucide-vue-next";
import moment from "moment-hijri"; // Umm al-Qura-based conversion

export interface UiDatePickerProps {
  modelValue: Date | null;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  supportHijri?: boolean;
}

const props = withDefaults(defineProps<UiDatePickerProps>(), {
  modelValue: null,
  size: "md",
  disabled: false,
  supportHijri: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", v: Date | null): void;
  (e: "update:hijri", v: string | null): void;
}>();

// State
const isOpen = ref(false);
const currentView = ref<Date>(props.modelValue ?? new Date()); // anchor month
const selected = ref<Date | null>(props.modelValue);
const isHijri = ref(false);

watch(
  () => props.modelValue,
  v => {
    selected.value = v ?? null;
  }
);

// Size map
const s = computed(
  () =>
    ({
      sm: "h-9 text-sm",
      md: "h-11 text-sm",
      lg: "h-12 text-base",
    })[props.size]
);

// Header month text
const monthName = computed(() => {
  if (isHijri.value) {
    const m = moment(currentView.value).iDate(1);
    return `${m.format("iMMMM iYYYY")} AH`;
  }
  return currentView.value.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
});

// Build 6x7 grid for the visible month
type Cell = { date: Date; inMonth: boolean; label: number };
const monthDays = computed<Cell[]>(() => {
  if (isHijri.value) {
    const base = moment(currentView.value);
    const hYear = base.iYear();
    const hMonth = base.iMonth();

    const startH = base
      .clone()
      .iYear(hYear)
      .iMonth(hMonth)
      .iDate(1)
      .startOf("day");
    const startG = startH.clone().toDate();
    const offset = startG.getDay(); // Sunday=0

    // First visible day (Sunday of the first week shown)
    const firstCell = startH.clone().subtract(offset, "days");

    const cells: Cell[] = [];
    for (let i = 0; i < 42; i++) {
      const m = firstCell.clone().add(i, "days");
      cells.push({
        date: m.toDate(),
        inMonth: m.iMonth() === hMonth,
        label: m.iDate(),
      });
    }
    return cells;
  } else {
    const y = currentView.value.getFullYear();
    const m = currentView.value.getMonth();
    const start = new Date(y, m, 1);
    const offset = start.getDay();
    const firstCell = new Date(y, m, 1 - offset);

    const cells: Cell[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(
        firstCell.getFullYear(),
        firstCell.getMonth(),
        firstCell.getDate() + i
      );
      cells.push({
        date: d,
        inMonth: d.getMonth() === m,
        label: d.getDate(),
      });
    }
    return cells;
  }
});

// Display text in trigger
const displayText = computed(() => {
  if (!selected.value) return props.placeholder || "Select date";
  if (isHijri.value) {
    return `${moment(selected.value).format("iD iMMMM iYYYY")} AH`;
  }
  return selected.value.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
});

// Nav
const prevMonth = (): void => {
  if (isHijri.value) {
    const m = moment(currentView.value).iDate(1).subtract(1, "iMonth");
    currentView.value = m.toDate();
  } else {
    currentView.value = new Date(
      currentView.value.getFullYear(),
      currentView.value.getMonth() - 1,
      1
    );
  }
};
const nextMonth = (): void => {
  if (isHijri.value) {
    const m = moment(currentView.value).iDate(1).add(1, "iMonth");
    currentView.value = m.toDate();
  } else {
    currentView.value = new Date(
      currentView.value.getFullYear(),
      currentView.value.getMonth() + 1,
      1
    );
  }
};

// Selection
const selectDate = (d: Date): void => {
  selected.value = d;
  emit("update:modelValue", d);
  const h = moment(d);
  emit("update:hijri", h.format("iD-iM-iYYYY")); // e.g., "10-9-1447"
  isOpen.value = false;
};

// Toggle mode (keeps same underlying Gregorian anchor)
const toggleMode = (): void => {
  if (!props.supportHijri) return;
  isHijri.value = !isHijri.value;
};

// Click outside to close
const pickerRef = ref<HTMLElement>();
const onDoc = (e: MouseEvent) => {
  if (pickerRef.value && !pickerRef.value.contains(e.target as Node))
    isOpen.value = false;
};
onMounted(() => document.addEventListener("click", onDoc));
onBeforeUnmount(() => document.removeEventListener("click", onDoc));
</script>

<template>
  <div ref="pickerRef" class="relative w-full">
    <!-- Trigger -->
    <button
      type="button"
      class="w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-3"
      :class="[
        s,
        props.disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer hover:bg-white/10',
      ]"
      @click.stop="!props.disabled && (isOpen = !isOpen)"
    >
      <div class="flex items-center gap-2 text-gray-100 truncate">
        <CalendarDays class="w-4 h-4 text-gray-400" />
        <span class="truncate">{{ displayText }}</span>
      </div>
      <Globe2
        v-if="props.supportHijri"
        class="w-4 h-4 text-gray-400 hover:text-fuchsia-400 transition"
        @click.stop="toggleMode"
        :title="isHijri ? 'Hijri mode' : 'Gregorian mode'"
      />
    </button>

    <!-- Popup -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute z-50 mt-2 w-full border border-white/10 rounded-xl backdrop-blur-xl bg-black/70 shadow-2xl p-3"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-2">
          <button
            class="p-1 rounded-md bg-white/10 hover:bg-white/15"
            @click.stop="prevMonth"
          >
            <ChevronLeft class="w-4 h-4 text-gray-300" />
          </button>
          <div class="text-gray-100 text-sm font-medium">{{ monthName }}</div>
          <button
            class="p-1 rounded-md bg-white/10 hover:bg-white/15"
            @click.stop="nextMonth"
          >
            <ChevronRight class="w-4 h-4 text-gray-300" />
          </button>
        </div>

        <!-- Weekdays -->
        <div
          class="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-1"
        >
          <span
            v-for="d in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']"
            :key="d"
            >{{ d }}</span
          >
        </div>

        <!-- Days -->
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="cell in monthDays"
            :key="cell.date.toISOString() + (isHijri ? '-h' : '')"
            class="py-2 rounded-md text-sm transition"
            :class="[
              cell.inMonth ? 'text-gray-100' : 'text-gray-500/60',
              selected && selected.toDateString() === cell.date.toDateString()
                ? 'bg-gradient-to-r from-fuchsia-500/60 to-cyan-500/60 text-white'
                : 'hover:bg-white/10',
            ]"
            @click.stop="selectDate(cell.date)"
            :aria-selected="
              selected
                ? selected.toDateString() === cell.date.toDateString()
                : false
            "
          >
            {{ cell.label }}
          </button>
        </div>

        <!-- Footer -->
        <div
          class="flex justify-between items-center mt-3 text-xs text-gray-400"
        >
          <span>{{ isHijri ? "Hijri (Umm al-Qura)" : "Gregorian" }}</span>
          <button
            class="px-2 py-1 rounded-md bg-white/10 hover:bg-white/15 text-gray-200"
            @click.stop="
              selected = null;
              emit('update:modelValue', null);
              emit('update:hijri', null);
            "
          >
            Clear
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
