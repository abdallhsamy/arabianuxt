<script setup lang="ts">
import { ref } from "vue";
import {
  type UiApiConsoleApiRequest,
  UiApiConsoleHttpMethods,
} from "./UiApiConsole.type";
import {
  UiApiConsoleDefaultValues,
  UiApiConsoleStatuses,
  UiApiConsoleMessages,
  UiApiConsoleDelays,
} from "./UiApiConsole.type";

const req = ref<UiApiConsoleApiRequest>({
  url: UiApiConsoleDefaultValues.Url,
  method: UiApiConsoleDefaultValues.Method,
  body: UiApiConsoleDefaultValues.Body,
  response: UiApiConsoleDefaultValues.Response,
  status: UiApiConsoleDefaultValues.Status,
});

const send = async () => {
  try {
    req.value.status = UiApiConsoleStatuses.Loading;
    await new Promise(r => setTimeout(r, UiApiConsoleDelays.MockDelay));
    req.value.status = UiApiConsoleStatuses.Success;
    req.value.response = `${UiApiConsoleMessages.MockResponsePrefix} ${req.value.method} ${req.value.url}`;
  } catch {
    req.value.status = UiApiConsoleStatuses.Error;
  }
};
</script>

<template>
  <div class="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
    <h3 class="text-lg font-semibold text-gray-100">
      {{ UiApiConsoleMessages.Title }}
    </h3>

    <div class="flex gap-2">
      <select
        v-model="req.method"
        class="bg-black/50 border border-white/10 rounded-md text-sm px-2 py-1 text-gray-100"
      >
        <option v-for="method in Object.values(UiApiConsoleHttpMethods)">
          {{ method }}
        </option>
      </select>
      <input
        v-model="req.url"
        type="text"
        :placeholder="UiApiConsoleMessages.UrlPlaceholder"
        class="flex-1 bg-black/50 border border-white/10 rounded-md px-2 py-1 text-sm text-gray-100"
      />
      <button
        class="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-1.5 rounded-md text-sm"
        @click="send"
      >
        {{ UiApiConsoleMessages.SendButton }}
      </button>
    </div>

    <textarea
      v-model="req.body"
      :placeholder="UiApiConsoleMessages.BodyPlaceholder"
      class="w-full bg-black/50 border border-white/10 rounded-md text-gray-100 text-sm p-2 h-28"
    />

    <div
      class="rounded-lg border border-white/10 bg-black/70 p-2 text-sm text-gray-200 min-h-[80px]"
    >
      <p v-if="req.status === UiApiConsoleStatuses.Loading">
        {{ UiApiConsoleMessages.LoadingText }}
      </p>
      <p v-else-if="req.status === UiApiConsoleStatuses.Success">
        {{ UiApiConsoleMessages.SuccessPrefix }} {{ req.response }}
      </p>
      <p v-else-if="req.status === UiApiConsoleStatuses.Error">
        {{ UiApiConsoleMessages.ErrorText }}
      </p>
      <p v-else class="text-gray-500">
        {{ UiApiConsoleMessages.NoResponseText }}
      </p>
    </div>
  </div>
</template>
