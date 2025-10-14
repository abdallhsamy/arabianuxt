<script setup lang="ts">
import UiAlert from "~/components/Ui/Common/UiAlert.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const showAuto = ref(true);
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t("pages.componentAlert.title") }}</h1>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- Info -->
      <UiAlert
        type="info"
        :title="t('pages.componentAlert.information')"
        :message="t('pages.componentAlert.profileUpdated')"
      />

      <!-- Success -->
      <UiAlert
        type="success"
        :title="t('pages.componentAlert.success')"
        :message="t('pages.componentAlert.paymentProcessed')"
      />

      <!-- Warning -->
      <UiAlert
        type="warning"
        :title="t('pages.componentAlert.warning')"
        :message="t('pages.componentAlert.sessionExpire')"
      />

      <!-- Error -->
      <UiAlert
        type="error"
        :title="t('pages.componentAlert.error')"
        :message="t('pages.componentAlert.somethingWrong')"
      />

      <!-- Auto-close -->
      <UiAlert
        v-if="showAuto"
        type="info"
        auto-close
        :duration="4000"
        :title="t('pages.componentAlert.autoCloseAlert')"
        :message="t('pages.componentAlert.autoCloseMessage')"
        @close="showAuto = false"
      />

      <!-- With actions -->
      <UiAlert
        type="warning"
        :title="t('pages.componentAlert.unsavedChanges')"
        :dismissible="false"
      >
        <template #actions>
          <div class="flex gap-3">
            <button
              class="px-3 py-1.5 text-xs rounded-lg bg-white/10 hover:bg-white/20"
            >
              {{ t("pages.componentAlert.cancel") }}
            </button>
            <button
              class="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-black font-medium"
            >
              {{ t("pages.componentAlert.save") }}
            </button>
          </div>
        </template>
      </UiAlert>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
