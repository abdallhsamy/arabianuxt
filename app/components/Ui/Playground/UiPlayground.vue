<script setup lang="ts">
import {
  ref,
  computed,
  defineAsyncComponent,
  h,
  onErrorCaptured,
  watch,
} from "vue";
import type { Component } from "vue";
import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

const props = defineProps<{ schema: PlaygroundSchema }>();

// Error handling
const hasError = ref(false);
const errorMessage = ref("");

onErrorCaptured(error => {
  hasError.value = true;
  errorMessage.value = error.message;
  console.error("Component error:", error);
  console.error("Component:", props.schema.component);
  console.error("Props:", sanitizedValues.value);
  return false; // Prevent the error from propagating
});

// Reset error state when schema changes
watch(
  () => props.schema.component,
  () => {
    hasError.value = false;
    errorMessage.value = "";
  }
);

// Load component dynamically
const componentMap: Record<string, () => Promise<{ default: Component }>> = {
  "Ui/Common/UiAccordion/UiAccordion.vue": () =>
    import("~/components/Ui/Common/UiAccordion/UiAccordion.vue"),
  "Ui/Common/UiAlert/UiAlert.vue": () =>
    import("~/components/Ui/Common/UiAlert/UiAlert.vue"),
  "Ui/Core/UiAvatar.vue": () => import("~/components/Ui/Core/UiAvatar.vue"),
  "Ui/Display/UiBadge.vue": () => import("~/components/Ui/Display/UiBadge.vue"),
  "Ui/Nav/UiBreadcrumb.vue": () =>
    import("~/components/Ui/Nav/UiBreadcrumb.vue"),
  "Ui/Common/UiButton/UiButton.vue": () =>
    import("~/components/Ui/Common/UiButton/UiButton.vue"),
  "Ui/Common/UiCard/UiCard.vue": () =>
    import("~/components/Ui/Common/UiCard/UiCard.vue"),
  "Ui/Charts/UiChartArea.vue": () =>
    import("~/components/Ui/Charts/UiChartArea.vue"),
  "Ui/Charts/UiChartBar.vue": () =>
    import("~/components/Ui/Charts/UiChartBar.vue"),
  "Ui/Charts/UiChartPie.vue": () =>
    import("~/components/Ui/Charts/UiChartPie.vue"),
  "Ui/Form/UiCheckbox.vue": () => import("~/components/Ui/Form/UiCheckbox.vue"),
  "Ui/Feedback/UiConfirmDialog.vue": () =>
    import("~/components/Ui/Feedback/UiConfirmDialog.vue"),
  "Ui/Form/UiDatePicker.vue": () =>
    import("~/components/Ui/Form/UiDatePicker.vue"),
  "Ui/Display/UiDivider.vue": () =>
    import("~/components/Ui/Display/UiDivider.vue"),
  "Ui/Common/UiDropdown/UiDropdown.vue": () =>
    import("~/components/Ui/Common/UiDropdown/UiDropdown.vue"),
  "Ui/Display/UiEmptyState.vue": () =>
    import("~/components/Ui/Display/UiEmptyState.vue"),
  "Ui/Form/UiFileUpload.vue": () =>
    import("~/components/Ui/Form/UiFileUpload.vue"),
  "Ui/Form/UiInput/UiInput.vue": () =>
    import("~/components/Ui/Form/UiInput/UiInput.vue"),
  "Ui/Display/UiLoaderSpinner.vue": () =>
    import("~/components/Ui/Display/UiLoaderSpinner.vue"),
  "Ui/Common/UiModal/UiModal.vue": () =>
    import("~/components/Ui/Common/UiModal/UiModal.vue"),
  "Ui/Nav/UiPagination.vue": () =>
    import("~/components/Ui/Nav/UiPagination.vue"),
  "Ui/Data/UiProgressBar.vue": () =>
    import("~/components/Ui/Data/UiProgressBar.vue"),
  "Ui/Form/UiRadio.vue": () => import("~/components/Ui/Form/UiRadio.vue"),
  "Ui/Core/UiRating.vue": () => import("~/components/Ui/Core/UiRating.vue"),
  "Ui/Editor/UiRichEditor.vue": () =>
    import("~/components/Ui/Editor/UiRichEditor.vue"),
  "Ui/Form/UiSelect.vue": () => import("~/components/Ui/Form/UiSelect.vue"),
  "Ui/Feedback/UiSkeleton.vue": () =>
    import("~/components/Ui/Feedback/UiSkeleton.vue"),
  "Ui/Form/UiSlider.vue": () => import("~/components/Ui/Form/UiSlider.vue"),
  "Ui/Common/UiStepper.vue": () =>
    import("~/components/Ui/Common/UiStepper.vue"),
  "Ui/Common/UiSwitch/UiSwitch.vue": () =>
    import("~/components/Ui/Common/UiSwitch/UiSwitch.vue"),
  "Ui/Data/UiTable.vue": () => import("~/components/Ui/Data/UiTable.vue"),
  "Ui/Common/UiTabs/UiTabs.vue": () =>
    import("~/components/Ui/Common/UiTabs/UiTabs.vue"),
  "Ui/Form/UiTagInput.vue": () => import("~/components/Ui/Form/UiTagInput.vue"),
  "Ui/Form/UiTextarea.vue": () => import("~/components/Ui/Form/UiTextarea.vue"),
  "Ui/Layout/UiThemeSwitcher.vue": () =>
    import("~/components/Ui/Layout/UiThemeSwitcher.vue"),
  "Ui/Data/UiTimeline.vue": () => import("~/components/Ui/Data/UiTimeline.vue"),
  "Ui/Common/UiTooltip/UiTooltip.vue": () =>
    import("~/components/Ui/Common/UiTooltip/UiTooltip.vue"),
};

const AsyncComponent = defineAsyncComponent({
  loader:
    componentMap[props.schema.component] ||
    (() => Promise.resolve({ default: () => h("div", "Component not found") })),
  errorComponent: () =>
    h("div", { class: "text-red-400" }, "Failed to load component"),
  loadingComponent: () => h("div", { class: "text-gray-400" }, "Loading..."),
});

// Handle JSON input with proper error handling
const handleJsonInput = (key: string, event: Event) => {
  try {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value.trim();
    if (value) {
      const parsed = JSON.parse(value);
      if (parsed !== null && parsed !== undefined) {
        values.value[key] = parsed;
      }
    } else {
      values.value[key] = [];
    }
  } catch (error) {
    // Keep the current value if JSON parsing fails
    console.warn(`Invalid JSON for ${key}:`, error);
  }
};

// Sanitize values before passing to components
const sanitizedValues = computed(() => {
  const sanitized: Record<string, string | boolean | number | string[]> = {};

  // First, ensure all schema props have values
  for (const prop of props.schema.props) {
    const value = values.value[prop.key];

    // Handle different prop types with proper defaults
    if (value === undefined || value === null) {
      if (prop.type === "boolean") {
        sanitized[prop.key] = prop.default ?? false;
      } else if (prop.type === "number") {
        sanitized[prop.key] = prop.default ?? 0;
      } else if (prop.type === "string") {
        sanitized[prop.key] = prop.default ?? "";
      } else if (prop.type === "enum") {
        sanitized[prop.key] = prop.default ?? prop.options?.[0] ?? "";
      }
    } else {
      sanitized[prop.key] = value;
    }
  }

  // Then sanitize the values
  for (const [key, value] of Object.entries(sanitized)) {
    // Ensure arrays are actually arrays and never undefined
    if (Array.isArray(value)) {
      sanitized[key] = value.length > 0 ? value : [];
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = value;
    } else if (
      typeof value === "string" &&
      (value.startsWith("[") || value.startsWith("{"))
    ) {
      try {
        const parsed = JSON.parse(value);
        // Ensure parsed arrays are never empty
        if (Array.isArray(parsed)) {
          sanitized[key] = parsed.length > 0 ? parsed : [];
        } else {
          sanitized[key] = parsed;
        }
      } catch {
        // If JSON parsing fails, provide safe defaults for known array props
        if (
          key === "labels" ||
          key === "values" ||
          key === "colors" ||
          key === "datasets" ||
          key === "rows" ||
          key === "columns" ||
          key === "events" ||
          key === "options" ||
          key === "items"
        ) {
          sanitized[key] = [];
        } else {
          sanitized[key] = value;
        }
      }
    }
  }

  return sanitized;
});

// Reactive prop values
const values = ref<Record<string, string | boolean | number | string[]>>(
  Object.fromEntries(
    props.schema.props.map(p => {
      let defaultValue = p.default ?? (p.type === "boolean" ? false : "");

      // Parse JSON strings for certain props that expect objects/arrays
      if (
        typeof defaultValue === "string" &&
        (defaultValue.startsWith("[") || defaultValue.startsWith("{"))
      ) {
        try {
          const parsed = JSON.parse(defaultValue);
          // Ensure parsed value is valid (not null/undefined)
          if (parsed !== null && parsed !== undefined) {
            defaultValue = parsed;
          }
        } catch (e) {
          // Keep as string if parsing fails
          console.warn(`Failed to parse JSON for ${p.key}:`, e);
        }
      }

      return [p.key, defaultValue];
    })
  )
);

// Build props for code preview
const codeSnippet = computed(() => {
  try {
    const entries = Object.entries(values.value)
      .filter(
        ([_, val]) =>
          val !== "" && val !== false && val !== null && val !== undefined
      )
      .map(([k, v]) => {
        if (typeof v === "boolean") return `:${k}="${v}"`;
        if (typeof v === "string" && v.includes(" ")) return `:${k}="'${v}'"`;
        if (typeof v === "object") return `:${k}="${JSON.stringify(v)}"`;
        return typeof v === "string" ? `${k}="${v}"` : `:${k}="${v}"`;
      });
    return `<${props.schema.component.split("/").pop()} ${entries.join(" ")} />`;
  } catch {
    return `<${props.schema.component.split("/").pop()} />`;
  }
});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Control Panel -->
    <div
      class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl space-y-5"
    >
      <h2 class="text-gray-300 font-semibold text-lg mb-2">
        {{ schema.title }} Settings
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <template v-for="field in schema.props" :key="field.key">
          <div v-if="field.type === 'string'" class="flex flex-col">
            <label class="text-gray-400 text-sm mb-1">{{
              field.label || field.key
            }}</label>
            <textarea
              v-if="typeof values[field.key] === 'object'"
              :value="JSON.stringify(values[field.key], null, 2)"
              @input="handleJsonInput(field.key, $event)"
              class="rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white focus:ring-1 ring-fuchsia-500/50 focus:outline-none min-h-[80px] font-mono text-xs"
              placeholder="Enter JSON..."
            />
            <input
              v-else
              v-model="values[field.key]"
              type="text"
              class="rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white focus:ring-1 ring-fuchsia-500/50 focus:outline-none"
            />
          </div>
          <div
            v-else-if="field.type === 'boolean'"
            class="flex items-center gap-2 text-gray-300 text-sm"
          >
            <input
              type="checkbox"
              v-model="values[field.key]"
              class="accent-fuchsia-500"
            />
            <label>{{ field.label || field.key }}</label>
          </div>
          <div v-else-if="field.type === 'enum'" class="flex flex-col">
            <label class="text-gray-400 text-sm mb-1">{{
              field.label || field.key
            }}</label>
            <select
              v-model="values[field.key]"
              class="rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white focus:ring-1 ring-fuchsia-500/50 focus:outline-none"
            >
              <option v-for="opt in field.options" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>
          </div>
        </template>
      </div>
    </div>

    <!-- Preview Panel -->
    <div
      class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center space-y-6"
    >
      <h2 class="text-gray-300 font-semibold text-lg">Live Preview</h2>
      <div class="w-full min-h-[200px] flex items-center justify-center">
        <div v-if="hasError" class="text-center p-4">
          <div class="text-red-400 text-sm mb-2">Component Error:</div>
          <div class="text-gray-400 text-xs">{{ errorMessage }}</div>
          <button
            @click="
              hasError = false;
              errorMessage = '';
            "
            class="mt-2 px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30"
          >
            Retry
          </button>
        </div>
        <Suspense v-else>
          <component :is="AsyncComponent" v-bind="sanitizedValues" />
          <template #fallback>
            <div class="text-gray-400">Loading component...</div>
          </template>
        </Suspense>
      </div>
      <div class="w-full">
        <p class="text-gray-400 text-sm mb-2">Generated Code:</p>
        <pre
          class="bg-black/40 border border-white/10 rounded-xl text-gray-200 text-xs text-left p-3 overflow-x-auto select-all"
          >{{ codeSnippet }}</pre
        >
      </div>
    </div>
  </div>
</template>
