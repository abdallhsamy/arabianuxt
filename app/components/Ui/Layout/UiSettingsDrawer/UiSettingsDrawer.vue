<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import {
  type Settings,
  UI_SETTINGS_LS_KEY,
  UiSettingsDensity,
  type UiSettingsDrawerEmits,
  type UiSettingsDrawerProps,
  UiSettingsMotion,
  UiSettingsThemes,
} from "./UiSettingsDrawer.type";

const props = defineProps<UiSettingsDrawerProps>();

const emit = defineEmits<UiSettingsDrawerEmits>();

const open = ref<boolean>(props.modelValue);
watch(
  () => props.modelValue,
  v => (open.value = v)
);
const close = (): void => emit("update:modelValue", false);

/* defaults */
const settings = ref<Settings>({
  theme: UiSettingsThemes.Dark,
  density: UiSettingsDensity.Comfortable,
  motion: UiSettingsMotion.Auto,
  glass: 0.7,
  rtl: false,
});

/* hydrate from localStorage */
onMounted(() => {
  try {
    const saved = localStorage.getItem(UI_SETTINGS_LS_KEY);
    if (saved)
      settings.value = {
        ...settings.value,
        ...(JSON.parse(saved) as Settings),
      };
  } catch {
    // Ignore parsing errors and use default settings
  }
  applyTheme();
});

/* persist + apply */
watch(
  settings,
  v => {
    localStorage.setItem(UI_SETTINGS_LS_KEY, JSON.stringify(v));
    applyTheme();
    emit("update:settings", v);
  },
  { deep: true }
);

const applyTheme = (): void => {
  const html = document.documentElement;
  // theme
  html.classList.toggle(
    UiSettingsThemes.Dark,
    settings.value.theme === UiSettingsThemes.Dark ||
      settings.value.theme === UiSettingsThemes.Fancy
  );
  html.setAttribute("data-theme", settings.value.theme);

  // motion
  html.style.setProperty(
    "--motion",
    settings.value.motion === UiSettingsMotion.Reduced ? "0" : "1"
  );

  // glass intensity tokens (used by your components via CSS vars)
  html.style.setProperty("--glass-alpha", String(settings.value.glass)); // 0..1

  // density
  html.style.setProperty(
    "--space",
    settings.value.density === UiSettingsDensity.Compact ? "0.5rem" : "0.75rem"
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
            :class="
              settings.theme === UiSettingsThemes.Light
                ? 'ring-1 ring-cyan-400/50'
                : ''
            "
            @click="settings.theme = UiSettingsThemes.Light"
          >
            Light
          </button>
          <button
            class="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-gray-200 hover:bg-white/10"
            :class="
              settings.theme === UiSettingsThemes.Dark
                ? 'ring-1 ring-cyan-400/50'
                : ''
            "
            @click="settings.theme = UiSettingsThemes.Dark"
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
              :value="UiSettingsDensity.Comfortable"
              :checked="settings.density === UiSettingsDensity.Comfortable"
              @change="settings.density = UiSettingsDensity.Comfortable"
            />
            Comfortable
          </label>
          <label
            class="flex items-center gap-2 text-gray-200 rounded-lg border border-white/10 bg-white/5 px-3 py-2 cursor-pointer"
          >
            <input
              type="radio"
              name="density"
              :value="UiSettingsDensity.Compact"
              :checked="settings.density === UiSettingsDensity.Compact"
              @change="settings.density = UiSettingsDensity.Compact"
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
              :value="UiSettingsMotion.Auto"
              :checked="settings.motion === UiSettingsMotion.Auto"
              @change="settings.motion = UiSettingsMotion.Auto"
            />
            Auto
          </label>
          <label class="flex items-center gap-2 text-gray-200">
            <input
              type="radio"
              name="motion"
              :value="UiSettingsMotion.Reduced"
              :checked="settings.motion === UiSettingsMotion.Reduced"
              @change="settings.motion = UiSettingsMotion.Reduced"
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
