<script setup lang="ts">
import UiAlert from '~/components/Ui/Common/UiAlert.vue'
import { ref } from 'vue'

const showAuto = ref(true)
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Alert Component Examples</h1>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- Info -->
      <UiAlert type="info" title="Information" message="Your profile has been updated successfully." />

      <!-- Success -->
      <UiAlert type="success" title="Success!" message="Your payment was processed successfully." />

      <!-- Warning -->
      <UiAlert type="warning" title="Warning" message="Your session will expire in 5 minutes." />

      <!-- Error -->
      <UiAlert type="error" title="Error" message="Something went wrong. Please try again later." />

      <!-- Auto-close -->
      <UiAlert
          v-if="showAuto"
          type="info"
          auto-close
          :duration="4000"
          title="Auto-close Alert"
          message="This alert will disappear automatically after 4 seconds."
          @close="showAuto = false"
      />

      <!-- With actions -->
      <UiAlert type="warning" title="Unsaved changes" :dismissible="false">
        <template #actions>
          <div class="flex gap-3">
            <button class="px-3 py-1.5 text-xs rounded-lg bg-white/10 hover:bg-white/20">Cancel</button>
            <button class="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-black font-medium">
              Save
            </button>
          </div>
        </template>
      </UiAlert>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/main.css";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
