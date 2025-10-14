<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

type Theme = "light" | "dark" | "fancy";
const LS_KEY = "app:theme";

const props = withDefaults(
  defineProps<{
    modelValue?: Theme;
    showLabel?: boolean;
  }>(),
  {
    showLabel: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", v: Theme): void;
  (e: "change", v: Theme): void;
}>();

const open = ref(false);
const theme = ref<Theme>(props.modelValue ?? "dark");

onMounted(() => {
  const saved = localStorage.getItem(LS_KEY) as Theme | null;
  if (saved) theme.value = saved;
  apply(theme.value);
});

watch(theme, t => {
  localStorage.setItem(LS_KEY, t);
  emit("update:modelValue", t);
  emit("change", t);
  apply(t);
});

const apply = (t: Theme): void => {
  const html = document.documentElement;
  html.classList.toggle("dark", t === "dark" || t === "fancy");
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
          theme === 'light'
            ? 'bg-amber-300'
            : theme === 'dark'
              ? 'bg-slate-300'
              : 'bg-fuchsia-400'
        "
      ></span>
      <span v-if="props.showLabel">{{ theme }}</span>
      <span v-else>Theme</span>
    </button>

    <div
      v-if="open"
      class="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl p-1 text-sm z-50"
    >
      <button
        class="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
        @click="
          theme = 'light';
          open = false;
        "
      >
        Light
      </button>
      <button
        class="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
        @click="
          theme = 'dark';
          open = false;
        "
      >
        Dark
      </button>
      <button
        class="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
        @click="
          theme = 'fancy';
          open = false;
        "
      >
        Fancy
      </button>
    </div>
  </div>
</template>
