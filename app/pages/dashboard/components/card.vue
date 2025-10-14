<script setup lang="ts">
import UiCard from "~/components/Ui/Common/UiCard.vue";
import UiButton from "~/components/Ui/Common/UiButton/UiButton.vue";
import { useI18n } from "vue-i18n";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t("pages.componentCard.title") }}</h1>

    <!-- Glass Variant -->
    <UiCard
      :title="t('pages.componentCard.variants.glass')"
      :subtitle="t('pages.componentCard.subtitles.defaultDashboardPanel')"
    >
      <p>
        <i18n-t keypath="pages.componentCard.descriptions.glassStyle">
          <template #glassStyleCard>
            <strong>
              {{ t("pages.componentCard.descriptions.glassStyleCard") }}
            </strong>
          </template>
        </i18n-t>
      </p>
      <template #footer>
        <UiButton
          :label="t('pages.componentCard.actions.viewDetails')"
          variant="primary"
        />
      </template>
    </UiCard>

    <!-- Solid Variant -->
    <UiCard
      :title="t('pages.componentCard.variants.solid')"
      :subtitle="t('pages.componentCard.subtitles.opaqueBackground')"
      variant="solid"
      color="cyan"
    >
      <p>
        {{ t("pages.componentCard.descriptions.solidHighContrast") }}
      </p>
    </UiCard>

    <!-- Gradient Variant -->
    <UiCard
      :title="t('pages.componentCard.variants.gradient')"
      variant="gradient"
      color="emerald"
    >
      <p class="text-white">
        {{ t("pages.componentCard.descriptions.gradientDynamic") }}
      </p>
    </UiCard>

    <!-- Outlined Variant -->
    <UiCard
      :title="t('pages.componentCard.variants.outlined')"
      variant="outlined"
      color="rose"
    >
      <p>
        {{ t("pages.componentCard.descriptions.outlinedSubtle") }}
      </p>
    </UiCard>

    <!-- With Custom Header & Footer -->
    <UiCard>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h3 class="text-gray-100 font-semibold">
            {{ t("pages.componentCard.customHeader") }}
          </h3>
          <UiButton
            :label="t('pages.componentCard.actions.action')"
            size="sm"
            variant="outline"
          />
        </div>
      </template>

      <p>
        {{ t("pages.componentCard.descriptions.customSlots") }}
      </p>

      <template #footer>
        <UiButton
          :label="t('pages.componentCard.actions.cancel')"
          variant="outline"
        />
        <UiButton
          :label="t('pages.componentCard.actions.confirm')"
          variant="success"
        />
      </template>
    </UiCard>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
