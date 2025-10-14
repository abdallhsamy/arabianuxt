<script setup lang="ts">
import { ref } from "vue";
import { Search, Bell, User } from "lucide-vue-next";

const q = ref("");
const emit = defineEmits<{ (e: "search", v: string): void }>();
const onInput = (): void => emit("search", q.value);
</script>

<template>
  <header
    class="fixed z-40 top-4 right-4 left-[5.5rem] md:left-72 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl"
  >
    <div class="flex items-center gap-3 p-3">
      <div class="flex-1 flex items-center gap-2">
        <Search class="w-4 h-4 text-gray-400" />
        <input
          v-model="q"
          @input="onInput"
          placeholder="Search…"
          class="bg-transparent outline-none text-gray-100 w-full"
        />
      </div>
      <button
        class="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-gray-200 hover:bg-white/10"
      >
        <Bell class="w-4 h-4" />
      </button>
      <NuxtLink
        to="/dashboard/profile"
        class="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-gray-200 hover:bg-white/10"
      >
        <User class="w-4 h-4" />
      </NuxtLink>
    </div>
  </header>
</template>
