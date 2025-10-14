<script setup lang="ts">
import { ref } from "vue";

defineProps<{ value: unknown; rootKey?: string }>();
const open = ref(true);

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);
const isArray = (v: unknown): v is unknown[] => Array.isArray(v);
</script>

<template>
  <div class="font-mono text-xs text-gray-200">
    <div class="cursor-pointer select-none mb-1" @click="open = !open">
      <span class="text-fuchsia-300">{{ rootKey || "root" }}</span>
      <span class="text-gray-500">
        —
        {{
          isArray(value) ? "Array" : isObject(value) ? "Object" : typeof value
        }}</span
      >
      <span class="ms-2 text-gray-400">{{ open ? "▾" : "▸" }}</span>
    </div>

    <div v-if="open" class="pl-4 border-l border-white/10">
      <template v-if="isObject(value)">
        <div
          v-for="(v, k) in value as Record<string, unknown>"
          :key="String(k)"
          class="mb-1"
        >
          <UiJsonInspector
            v-if="isObject(v) || isArray(v)"
            :value="v"
            :root-key="String(k)"
          />
          <div v-else class="flex gap-2">
            <span class="text-fuchsia-300">{{ String(k) }}:</span>
            <span class="text-cyan-300" v-if="typeof v === 'string'"
              >"{{ v }}"</span
            >
            <span class="text-amber-300" v-else-if="typeof v === 'number'">{{
              v
            }}</span>
            <span class="text-rose-300" v-else-if="typeof v === 'boolean'">{{
              String(v)
            }}</span>
            <span class="text-gray-400" v-else-if="v === null">null</span>
            <span class="text-gray-300" v-else>{{ String(v) }}</span>
          </div>
        </div>
      </template>

      <template v-else-if="isArray(value)">
        <div v-for="(v, i) in value as unknown[]" :key="i" class="mb-1">
          <UiJsonInspector
            v-if="isObject(v) || isArray(v)"
            :value="v"
            :root-key="`[${i}]`"
          />
          <div v-else class="flex gap-2">
            <span class="text-fuchsia-300">[{{ i }}]:</span>
            <span class="text-cyan-300" v-if="typeof v === 'string'"
              >"{{ v }}"</span
            >
            <span class="text-amber-300" v-else-if="typeof v === 'number'">{{
              v
            }}</span>
            <span class="text-rose-300" v-else-if="typeof v === 'boolean'">{{
              String(v)
            }}</span>
            <span class="text-gray-400" v-else-if="v === null">null</span>
            <span class="text-gray-300" v-else>{{ String(v) }}</span>
          </div>
        </div>
      </template>

      <div v-else class="text-gray-400">
        ({{ typeof value }}) {{ String(value) }}
      </div>
    </div>
  </div>
</template>
