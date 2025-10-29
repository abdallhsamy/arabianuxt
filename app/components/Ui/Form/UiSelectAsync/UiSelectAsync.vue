<script setup lang="ts">
import { ref, watch } from "vue";
import type {
  UiSelectAsyncProps,
  UiSelectAsyncEmits,
  UiSelectAsyncOption,
} from "./UiSelectAsync.type";
import { UiSelectAsyncDefaultValues } from "./UiSelectAsync.type";

const props = withDefaults(
  defineProps<UiSelectAsyncProps>(),
  UiSelectAsyncDefaultValues
);

const emit = defineEmits<UiSelectAsyncEmits>();

const q = ref("");
const open = ref(false);
const loading = ref(false);
const options = ref<UiSelectAsyncOption[]>([]);

watch(q, async v => {
  loading.value = true;
  options.value = await props.fetcher(v);
  loading.value = false;
});

const choose = (opt: UiSelectAsyncOption): void => {
  emit("update:modelValue", opt.value);
  open.value = false;
};
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-2 text-left text-gray-100"
      @click="open = !open"
    >
      {{ q || props.placeholder }}
    </button>
    <div
      v-if="open"
      class="absolute z-50 mt-1 w-full rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl p-2"
    >
      <input
        v-model="q"
        :placeholder="props.placeholder"
        class="w-full bg-transparent outline-none text-gray-100 text-sm border-b border-white/10 pb-1"
      />
      <div v-if="loading" class="p-2 text-xs text-gray-400">Loading…</div>
      <ul v-else class="max-h-56 overflow-auto">
        <li
          v-for="o in options"
          :key="String(o.value)"
          class="px-2 py-1 rounded hover:bg-white/10 cursor-pointer"
          @click="choose(o)"
        >
          {{ o.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
