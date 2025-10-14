<script setup lang="ts">
import { ref } from "vue";
import UiButton from "~/components/Ui/Common/UiButton.vue";
import {
  Check,
  X,
  ArrowRight,
  Download,
  Bell,
  Heart,
  Star,
  Power,
} from "lucide-vue-next";
import { useI18n } from "vue-i18n";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();
const variants = [
  "primary",
  "secondary",
  "success",
  "danger",
  "outline",
  "glass",
] as const;
const toggleHeart = ref(false);
const togglePower = ref(true);
</script>

<template>
  <section class="space-y-10">
    <h1
      class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400"
    >
      {{ t("pages.buttons.title") }}
    </h1>
    <p class="text-gray-400 text-sm">{{ t("pages.buttons.subtitle") }}</p>

    <!-- Variants -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="variant in variants"
        :key="variant"
        class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
      >
        <h2 class="text-gray-300 font-medium mb-4 capitalize">
          {{ t(`pages.buttons.variants.${variant}`) }} Variant
        </h2>
        <div class="flex flex-wrap gap-3">
          <UiButton
            :variant="variant as any"
            :label="t('pages.buttons.labels.default')"
          />
          <UiButton
            :variant="variant as any"
            :label="t('pages.buttons.labels.withIcon')"
            :icon="Check"
          />
          <UiButton
            :variant="variant as any"
            :label="t('pages.buttons.labels.loading')"
            :loading="true"
          />
          <UiButton
            :variant="variant as any"
            :label="t('pages.buttons.labels.disabled')"
            :disabled="true"
          />
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div
      class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <h2 class="text-gray-300 font-medium mb-4">
        {{ t("pages.buttons.sizes") }}
      </h2>
      <div class="flex flex-wrap items-center gap-3">
        <UiButton :label="t('pages.buttons.small')" size="sm" />
        <UiButton :label="t('pages.buttons.medium')" size="md" />
        <UiButton :label="t('pages.buttons.large')" size="lg" />
      </div>
    </div>

    <!-- Icons -->
    <div
      class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <h2 class="text-gray-300 font-medium mb-4">
        {{ t("pages.buttons.buttonsWithIcons") }}
      </h2>
      <div class="flex flex-wrap gap-3">
        <UiButton :label="t('pages.buttons.labels.save')" :icon="Check" />
        <UiButton
          :label="t('pages.buttons.labels.cancel')"
          :icon="X"
          variant="secondary"
        />
        <UiButton
          :label="t('pages.buttons.labels.next')"
          :icon="ArrowRight"
          icon-position="right"
          variant="primary"
        />
        <UiButton
          :label="t('pages.buttons.labels.download')"
          :icon="Download"
          variant="success"
        />
        <UiButton
          :label="t('pages.buttons.labels.notify')"
          :icon="Bell"
          variant="glass"
        />
      </div>
    </div>

    <!-- Full Width -->
    <div
      class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <h2 class="text-gray-300 font-medium mb-4">
        {{ t("pages.buttons.fullWidth") }}
      </h2>
      <UiButton
        :label="t('pages.buttons.labels.fullButton')"
        full
        variant="primary"
        size="lg"
        :icon="ArrowRight"
        icon-position="right"
      />
    </div>

    <!-- Regular variants -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UiButton
        variant="primary"
        :label="t('pages.buttons.variants.primary')"
      />
      <UiButton
        variant="secondary"
        :label="t('pages.buttons.variants.secondary')"
      />
      <UiButton
        variant="success"
        :label="t('pages.buttons.variants.success')"
        :icon="Check"
      />
      <UiButton
        variant="danger"
        :label="t('pages.buttons.variants.danger')"
        :icon="X"
      />
      <UiButton
        variant="outline"
        :label="t('pages.buttons.variants.outline')"
      />
      <UiButton variant="glass" :label="t('pages.buttons.variants.glass')" />
    </div>

    <!-- Sizes -->
    <div class="flex flex-wrap items-center gap-4">
      <UiButton :label="t('pages.buttons.small')" size="sm" />
      <UiButton :label="t('pages.buttons.medium')" size="md" />
      <UiButton :label="t('pages.buttons.large')" size="lg" />
    </div>

    <!-- Icon only -->
    <div
      class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <h2 class="text-gray-300 font-medium mb-4">
        {{ t("pages.buttons.iconOnlyButtons") }}
      </h2>
      <div class="flex flex-wrap items-center gap-4">
        <UiButton
          :icon="Bell"
          icon-only
          variant="primary"
          :aria-label="t('pages.buttons.ariaLabels.notifications')"
        />
        <UiButton
          :icon="Check"
          icon-only
          variant="success"
          :aria-label="t('pages.buttons.ariaLabels.confirm')"
        />
        <UiButton
          :icon="X"
          icon-only
          variant="danger"
          :aria-label="t('pages.buttons.ariaLabels.close')"
        />
        <UiButton
          :icon="Star"
          icon-only
          variant="glass"
          :aria-label="t('pages.buttons.ariaLabels.star')"
        />
      </div>
    </div>

    <!-- Toggle buttons -->
    <div
      class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <h2 class="text-gray-300 font-medium mb-4">
        {{ t("pages.buttons.toggleButtons") }}
      </h2>
      <div class="flex flex-wrap items-center gap-4">
        <UiButton
          :icon="Heart"
          icon-only
          toggleable
          v-model="toggleHeart"
          :aria-label="t('pages.buttons.ariaLabels.favorite')"
        />
        <UiButton
          :icon="Power"
          toggleable
          v-model="togglePower"
          :label="t('pages.buttons.labels.power')"
          variant="outline"
        />
      </div>
      <p class="mt-3 text-gray-400 text-sm">
        {{ t("pages.buttons.labels.favorite") }}:
        <span class="text-fuchsia-400">{{
          toggleHeart
            ? t("pages.buttons.labels.on")
            : t("pages.buttons.labels.off")
        }}</span>
        — {{ t("pages.buttons.labels.power") }}:
        <span class="text-cyan-400">{{
          togglePower
            ? t("pages.buttons.labels.on")
            : t("pages.buttons.labels.off")
        }}</span>
      </p>
    </div>

    <!-- Accessibility -->
    <div
      class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <h2 class="text-gray-300 font-medium mb-4">
        {{ t("pages.buttons.accessibilityDemo") }}
      </h2>
      <p class="text-gray-400 text-sm mb-4">
        {{ t("pages.buttons.accessibilityDescription") }}
      </p>
      <div class="flex gap-4">
        <UiButton :label="t('pages.buttons.focusMe')" />
        <UiButton :label="t('pages.buttons.accessible')" variant="outline" />
        <UiButton
          :icon="Check"
          :label="t('pages.buttons.keyboardOk')"
          variant="glass"
        />
      </div>
    </div>
  </section>
</template>
