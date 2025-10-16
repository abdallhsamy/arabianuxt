<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  UI_THEME_SWITCHER_LS_KEY,
  type UiTheme,
  UiThemes,
  UiThemeSwitcherDefaults,
  type UiThemeSwitcherEmits,
  type UiThemeSwitcherProps,
} from "./UiThemeSwitcher.type";

const props = withDefaults(
  defineProps<UiThemeSwitcherProps>(),
  UiThemeSwitcherDefaults
);

const emit = defineEmits<UiThemeSwitcherEmits>();

const open = ref(false);
const theme = ref<UiTheme>(props.modelValue ?? UiThemes.Dark);

onMounted(() => {
  const saved = localStorage.getItem(
    UI_THEME_SWITCHER_LS_KEY
  ) as UiTheme | null;
  if (saved) theme.value = saved;
  apply(theme.value);
});

watch(theme, t => {
  localStorage.setItem(UI_THEME_SWITCHER_LS_KEY, t);
  emit("update:modelValue", t);
  emit("change", t);
  apply(t);
});

const apply = (t: UiTheme): void => {
  const html = document.documentElement;
  html.classList.toggle("dark", t === UiThemes.Dark || t === UiThemes.Fancy);
  html.setAttribute("data-theme", t);
};
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-gray-100 hover:bg-white/10"
      @click="open = !open"
    >
      <span
        class="h-3 w-3 rounded-full"
        :class="
          theme === UiThemes.Light
            ? 'bg-amber-300'
            : theme === UiThemes.Dark
              ? 'bg-slate-300'
              : 'bg-fuchsia-400'
        "
      ></span>
      <span v-if="props.showLabel">{{ theme }}</span>
      <span v-else>Theme</span>
    </button>

    <div
      v-if="open"
      class="absolute ltr:right-0 rtl:left-0 mt-2 w-40 rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl p-1 text-sm z-50"
    >
      <button
        class="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
        @click="
          theme = UiThemes.Light;
          open = false;
        "
      >
        Light
      </button>
      <button
        class="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
        @click="
          theme = UiThemes.Dark;
          open = false;
        "
      >
        Dark
      </button>
      <button
        class="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
        @click="
          theme = UiThemes.Fancy;
          open = false;
        "
      >
        Fancy
      </button>
    </div>
  </div>
</template>
