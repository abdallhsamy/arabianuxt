<script setup lang="ts">
import UiSkeleton from '~/components/Ui/Feedback/UiSkeleton.vue'
</script>

<template>
  <section class="p-8 space-y-10 text-gray-100">
    <h1 class="text-2xl font-bold">✨ UiSkeleton Examples</h1>

    <div class="grid md:grid-cols-3 gap-8">
      <!-- Text -->
      <div>
        <h2 class="font-semibold mb-2">Text (3 lines)</h2>
        <UiSkeleton variant="text" :lines="3" />
      </div>

      <!-- Circle -->
      <div>
        <h2 class="font-semibold mb-2">Circle / Avatar</h2>
        <UiSkeleton variant="circle" width="64px" />
        <UiSkeleton variant="avatar" width="64px" class="mt-3" />
      </div>

      <!-- Rect -->
      <div>
        <h2 class="font-semibold mb-2">Rect / Card</h2>
        <UiSkeleton variant="rect" width="100%" height="100px" />
        <UiSkeleton variant="card" class="mt-4" />
      </div>

      <!-- Button -->
      <div>
        <h2 class="font-semibold mb-2">Button</h2>
        <UiSkeleton variant="button" width="120px" />
      </div>
    </div>
  </section>
</template>
