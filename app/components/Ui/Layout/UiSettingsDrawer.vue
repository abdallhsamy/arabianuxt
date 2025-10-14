<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

export interface Settings {
  theme: "light" | "dark" | "fancy";
  density: "comfortable" | "compact";
  motion: "auto" | "reduced";
  glass: number; // 0..1
  rtl: boolean;
}

const LS_KEY = "app:settings";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "update:settings", v: Settings): void;
}>();

const open = ref<boolean>(props.modelValue);
watch(
  () => props.modelValue,
  v => (open.value = v)
);
const close = (): void => emit("update:modelValue", false);

/* defaults */
const settings = ref<Settings>({
  theme: "dark",
  density: "comfortable",
  motion: "auto",
  glass: 0.7,
  rtl: false,
});

/* hydrate from localStorage */
onMounted(() => {
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved)
      settings.value = {
        ...settings.value,
        ...(JSON.parse(saved) as Settings),
      };
  } catch {}
  applyTheme();
});

/* persist + apply */
watch(
  settings,
  v => {
    localStorage.setItem(LS_KEY, JSON.stringify(v));
    applyTheme();
    emit("update:settings", v);
  },
  { deep: true }
);

const applyTheme = (): void => {
  const html = document.documentElement;
  // theme
  html.classList.toggle(
    "dark",
    settings.value.theme === "dark" || settings.value.theme === "fancy"
  );
  html.setAttribute("data-theme", settings.value.theme);

  // motion
  html.style.setProperty(
    "--motion",
    settings.value.motion === "reduced" ? "0" : "1"
  );

  // glass intensity tokens (used by your components via CSS vars)
  html.style.setProperty("--glass-alpha", String(settings.value.glass)); // 0..1

  // density
  html.style.setProperty(
    "--space",
    settings.value.density === "compact" ? "0.5rem" : "0.75rem"
  );

  // direction
  html.setAttribute("dir", settings.value.rtl ? "rtl" : "ltr");
};
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-79">
    <div class="absolute inset-0 bg-black/45" @click="close" />

    <aside
      class="absolute right-0 top-0 h-full w-[26rem] max-w-[92vw] bg-black/70 backdrop-blur-xl border-l border-white/10 shadow-2xl p-4 overflow-y-auto"
    >
      <header class="mb-3 flex items-center justify-between">
        <h3 class="text-gray-100 font-semibold">Settings</h3>
        <button
          class="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-gray-200"
          @click="close"
        >
          Close
        </button>
      </header>

      <!-- Theme -->
      <section class="mb-4">
        <h4 class="text-sm text-gray-400 mb-2">Theme</h4>
        <div class="grid grid-cols-3 gap-2">
          <button
            class="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-gray-200 hover:bg-white/10"
            :class="settings.theme === 'light' ? 'ring-1 ring-cyan-400/50' : ''"
            @click="settings.theme = 'light'"
          >
            Light
          </button>
          <button
            class="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-gray-200 hover:bg-white/10"
            :class="settings.theme === 'dark' ? 'ring-1 ring-cyan-400/50' : ''"
            @click="settings.theme = 'dark'"
          >
            Dark
          </button>
          <button
            class="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-gray-200 hover:bg-white/10"
            :class="settings.theme === 'fancy' ? 'ring-1 ring-cyan-400/50' : ''"
            @click="settings.theme = 'fancy'"
          >
            Fancy
          </button>
        </div>
      </section>

      <!-- Density -->
      <section class="mb-4">
        <h4 class="text-sm text-gray-400 mb-2">Density</h4>
        <div class="flex gap-2">
          <label
            class="flex items-center gap-2 text-gray-200 rounded-lg border border-white/10 bg-white/5 px-3 py-2 cursor-pointer"
          >
            <input
              type="radio"
              name="density"
              value="comfortable"
              :checked="settings.density === 'comfortable'"
              @change="settings.density = 'comfortable'"
            />
            Comfortable
          </label>
          <label
            class="flex items-center gap-2 text-gray-200 rounded-lg border border-white/10 bg-white/5 px-3 py-2 cursor-pointer"
          >
            <input
              type="radio"
              name="density"
              value="compact"
              :checked="settings.density === 'compact'"
              @change="settings.density = 'compact'"
            />
            Compact
          </label>
        </div>
      </section>

      <!-- Motion -->
      <section class="mb-4">
        <h4 class="text-sm text-gray-400 mb-2">Motion</h4>
        <div class="flex items-center gap-3">
          <label class="flex items-center gap-2 text-gray-200">
            <input
              type="radio"
              name="motion"
              value="auto"
              :checked="settings.motion === 'auto'"
              @change="settings.motion = 'auto'"
            />
            Auto
          </label>
          <label class="flex items-center gap-2 text-gray-200">
            <input
              type="radio"
              name="motion"
              value="reduced"
              :checked="settings.motion === 'reduced'"
              @change="settings.motion = 'reduced'"
            />
            Reduced
          </label>
        </div>
      </section>

      <!-- Glass intensity -->
      <section class="mb-4">
        <h4 class="text-sm text-gray-400 mb-2">Glass Intensity</h4>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          :value="settings.glass"
          class="w-full"
          @input="
            settings.glass = Number(($event.target as HTMLInputElement).value)
          "
        />
        <div class="text-xs text-gray-500 mt-1">
          {{ (settings.glass * 100).toFixed(0) }}%
        </div>
      </section>

      <!-- Direction -->
      <section class="mb-2">
        <h4 class="text-sm text-gray-400 mb-2">Layout Direction</h4>
        <label class="flex items-center gap-2 text-gray-200">
          <input
            type="checkbox"
            :checked="settings.rtl"
            @change="settings.rtl = ($event.target as HTMLInputElement).checked"
          />
          RTL (Right-to-Left)
        </label>
      </section>
    </aside>
  </div>
</template>
