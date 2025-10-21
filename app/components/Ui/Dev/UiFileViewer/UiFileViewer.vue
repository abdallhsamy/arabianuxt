<script setup lang="ts">
import { computed } from "vue";
import UiJsonInspector from "~/components/Ui/Dev/UiJsonInspector/UiJsonInspector.vue";
import type { UiFileViewerProps, UiFileViewerKind } from "./UiFileViewer.type";
import {
  UiFileViewerKinds,
  UiFileViewerDefaultValues,
  UiFileViewerImageExtensions,
  UiFileViewerPdfExtensions,
  UiFileViewerMimeTypes,
} from "./UiFileViewer.type";

const props = withDefaults(defineProps<UiFileViewerProps>(), {
  kind: UiFileViewerDefaultValues.Kind,
  src: UiFileViewerDefaultValues.Src,
  code: UiFileViewerDefaultValues.Code,
  lang: UiFileViewerDefaultValues.Lang,
  filename: UiFileViewerDefaultValues.Filename,
});

const detectKind = computed<UiFileViewerKind>(() => {
  if (props.kind !== UiFileViewerKinds.Auto) return props.kind;
  if (props.json != null) return UiFileViewerKinds.Json;
  if (props.src) {
    if (UiFileViewerImageExtensions.test(props.src))
      return UiFileViewerKinds.Image;
    if (UiFileViewerPdfExtensions.test(props.src)) return UiFileViewerKinds.Pdf;
  }
  if (props.code) return UiFileViewerKinds.Code;
  return UiFileViewerKinds.Text;
});

const onCopy = async (): Promise<void> => {
  const text =
    detectKind.value === UiFileViewerKinds.Json
      ? JSON.stringify(props.json, null, 2)
      : props.code;
  if (!text) return;
  await navigator.clipboard.writeText(text);
};

const onDownload = (): void => {
  const blob =
    detectKind.value === UiFileViewerKinds.Json
      ? new Blob([JSON.stringify(props.json, null, 2)], {
          type: UiFileViewerMimeTypes.Json,
        })
      : new Blob([props.code || ""], { type: UiFileViewerMimeTypes.Text });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = props.filename || UiFileViewerDefaultValues.DownloadFilename;
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
      v-if="detectKind === UiFileViewerKinds.Json"
      :value="json"
      class="max-h-[480px] overflow-auto p-3"
    />

    <!-- Code/Text -->
    <pre
      v-else-if="
        detectKind === UiFileViewerKinds.Code ||
        detectKind === UiFileViewerKinds.Text
      "
      class="p-4 text-sm text-gray-100 overflow-auto"
    ><code :class="lang">{{ code }}</code></pre>

    <!-- Image -->
    <div v-else-if="detectKind === UiFileViewerKinds.Image" class="p-2">
      <img :src="src" alt="" class="block w-full rounded-lg" />
    </div>

    <!-- PDF -->
    <div v-else-if="detectKind === UiFileViewerKinds.Pdf" class="h-[560px]">
      <iframe :src="src" class="w-full h-full" title="PDF" />
    </div>

    <!-- Fallback -->
    <div v-else class="p-4 text-sm text-gray-400">No preview available.</div>
  </div>
</template>
