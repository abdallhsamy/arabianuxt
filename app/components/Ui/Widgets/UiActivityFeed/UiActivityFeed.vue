<script setup lang="ts">
import {
  FeedItemsTypes,
  type UiActivityFeedProps,
} from "./UiActivityFeed.type";

defineProps<UiActivityFeedProps>();
</script>

<template>
  <ul class="space-y-4">
    <li
      v-for="item in items"
      :key="item.id"
      class="relative border border-white/10 bg-white/5 rounded-xl p-4 backdrop-blur-xl"
    >
      <div class="flex items-start gap-3">
        <span
          class="w-2 h-2 mt-2 rounded-full"
          :class="{
            'bg-emerald-400': item.type === FeedItemsTypes.Success,
            'bg-cyan-400': item.type === FeedItemsTypes.Info,
            'bg-amber-400': item.type === FeedItemsTypes.Warning,
            'bg-rose-400': item.type === FeedItemsTypes.Error,
          }"
        />
        <div>
          <h4 class="font-semibold text-gray-100">{{ item.title }}</h4>
          <p v-if="item.description" class="text-sm text-gray-400 mt-1">
            {{ item.description }}
          </p>
          <p class="text-xs text-gray-500 mt-1">{{ item.time }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>
