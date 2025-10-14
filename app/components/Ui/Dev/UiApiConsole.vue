<script setup lang="ts">
import { ref } from "vue";

interface ApiRequest {
  url: string;
  method: string;
  body: string;
  response: string;
  status: string;
}

const req = ref<ApiRequest>({
  url: "",
  method: "GET",
  body: "",
  response: "",
  status: "",
});

const send = async () => {
  try {
    req.value.status = "loading";
    await new Promise(r => setTimeout(r, 1000));
    req.value.status = "success";
    req.value.response = `Mock response for ${req.value.method} ${req.value.url}`;
  } catch {
    req.value.status = "error";
  }
};
</script>

<template>
  <div class="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
    <h3 class="text-lg font-semibold text-gray-100">🧪 API Console</h3>

    <div class="flex gap-2">
      <select
        v-model="req.method"
        class="bg-black/50 border border-white/10 rounded-md text-sm px-2 py-1 text-gray-100"
      >
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
      </select>
      <input
        v-model="req.url"
        type="text"
        placeholder="https://api.example.com/endpoint"
        class="flex-1 bg-black/50 border border-white/10 rounded-md px-2 py-1 text-sm text-gray-100"
      />
      <button
        class="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-1.5 rounded-md text-sm"
        @click="send"
      >
        Send
      </button>
    </div>

    <textarea
      v-model="req.body"
      placeholder="{ \'key\': \'value\' }"
      class="w-full bg-black/50 border border-white/10 rounded-md text-gray-100 text-sm p-2 h-28"
    />

    <div
      class="rounded-lg border border-white/10 bg-black/70 p-2 text-sm text-gray-200 min-h-[80px]"
    >
      <p v-if="req.status === 'loading'">⏳ Sending request...</p>
      <p v-else-if="req.status === 'success'">✅ {{ req.response }}</p>
      <p v-else-if="req.status === 'error'">❌ Request failed</p>
      <p v-else class="text-gray-500">No response yet.</p>
    </div>
  </div>
</template>
