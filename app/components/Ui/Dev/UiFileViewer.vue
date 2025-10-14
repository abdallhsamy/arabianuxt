<script setup lang="ts">
import { computed } from "vue";
import UiJsonInspector from "~/components/Ui/Dev/UiJsonInspector.vue";

type Kind = "auto" | "text" | "code" | "image" | "pdf" | "json";

const props = withDefaults(
  defineProps<{
    kind?: Kind;
    src?: string; // for image/pdf
    code?: string; // for text/code
    lang?: string; // for code highlight hint
    json?: unknown; // for JSON
    filename?: string;
  }>(),
  {
    kind: "auto",
    src: "",
    code: "",
    lang: "plaintext",
    filename: "file.txt",
  }
);

const detectKind = computed<Kind>(() => {
  if (props.kind !== "auto") return props.kind;
  if (props.json != null) return "json";
  if (props.src) {
    if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(props.src)) return "image";
    if (/\.(pdf)$/i.test(props.src)) return "pdf";
  }
  if (props.code) return "code";
  return "text";
});

const onCopy = async (): Promise<void> => {
  const text =
    detectKind.value === "json"
      ? JSON.stringify(props.json, null, 2)
      : props.code;
  if (!text) return;
  await navigator.clipboard.writeText(text);
};

const onDownload = (): void => {
  const blob =
    detectKind.value === "json"
      ? new Blob([JSON.stringify(props.json, null, 2)], {
          type: "application/json",
        })
      : new Blob([props.code || ""], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = props.filename || "download.txt";
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<template>
  <div
    class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
  >
    <header
      class="flex items-center justify-between px-4 py-2 border-b border-white/10"
    >
      <div class="text-sm text-gray-300 truncate">{{ filename }}</div>
      <div class="flex items-center gap-2">
        <button
          class="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-200"
          @click="onCopy"
        >
          Copy
        </button>
        <button
          class="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-200"
          @click="onDownload"
        >
          Download
        </button>
      </div>
    </header>

    <!-- JSON -->
    <UiJsonInspector
      v-if="detectKind === 'json'"
      :value="json"
      class="max-h-[480px] overflow-auto p-3"
    />

    <!-- Code/Text -->
    <pre
      v-else-if="detectKind === 'code' || detectKind === 'text'"
      class="p-4 text-sm text-gray-100 overflow-auto"
    ><code :class="lang">{{ code }}</code></pre>

    <!-- Image -->
    <div v-else-if="detectKind === 'image'" class="p-2">
      <img :src="src" alt="" class="block w-full rounded-lg" />
    </div>

    <!-- PDF -->
    <div v-else-if="detectKind === 'pdf'" class="h-[560px]">
      <iframe :src="src" class="w-full h-full" title="PDF" />
    </div>

    <!-- Fallback -->
    <div v-else class="p-4 text-sm text-gray-400">No preview available.</div>
  </div>
</template>
