<script setup lang="ts">
import {
  UiUserAvatarGroupDefaults,
  type UiUserAvatarGroupProps,
} from "./UiUserAvatarGroup.type";

const props = withDefaults(
  defineProps<UiUserAvatarGroupProps>(),
  UiUserAvatarGroupDefaults
);
</script>

<template>
  <div class="flex items-center">
    <div
      v-for="user in props.users.slice(0, props.max)"
      :key="user.id"
      class="border-2 border-gray-900 rounded-full overflow-hidden -ms-2 first:ms-0"
      :style="{ width: props.size + 'px', height: props.size + 'px' }"
      :title="user.name"
    >
      <img
        v-if="user.image"
        :src="user.image"
        :alt="user.name"
        class="object-cover w-full h-full"
      />
      <div
        v-else
        class="bg-fuchsia-600 text-white w-full h-full flex items-center justify-center text-xs font-semibold"
      >
        {{ user.name.charAt(0).toUpperCase() }}
      </div>
    </div>

    <div
      v-if="props.users.length > props.max"
      class="ms-2 text-xs text-gray-400"
    >
      +{{ props.users.length - props.max }}
    </div>
  </div>
</template>
