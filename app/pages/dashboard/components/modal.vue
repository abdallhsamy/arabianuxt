<script setup lang="ts">
import UiModal from "~/components/Ui/Common/UiModal.vue";
import UiButton from "~/components/Ui/Common/UiButton/UiButton.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const modal1 = ref(false);
const modal2 = ref(false);
const modal3 = ref(false);
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t("pages.componentModal.title") }}</h1>

    <div class="flex flex-wrap gap-4">
      <UiButton
        :label="t('pages.componentModal.openBasicModal')"
        @click="modal1 = true"
      />
      <UiButton
        :label="t('pages.componentModal.largeGlassModal')"
        variant="outline"
        @click="modal2 = true"
      />
      <UiButton
        :label="t('pages.componentModal.persistentModal')"
        variant="danger"
        @click="modal3 = true"
      />
    </div>

    <!-- Basic UiModal -->
    <UiModal v-model="modal1" :title="t('pages.componentModal.welcome')">
      <p>{{ t("pages.componentModal.simpleModalExample") }}</p>
      <template #footer>
        <UiButton
          :label="t('pages.componentModal.close')"
          variant="outline"
          @click="modal1 = false"
        />
        <UiButton
          :label="t('pages.componentModal.confirm')"
          variant="primary"
          @click="modal1 = false"
        />
      </template>
    </UiModal>

    <!-- Large Glass UiModal -->
    <UiModal
      v-model="modal2"
      :title="t('pages.componentModal.glassModal')"
      size="lg"
      glass
    >
      <p>
        {{ t("pages.componentModal.glassModalDescription") }}
      </p>
      <template #footer>
        <UiButton
          :label="t('pages.componentModal.gotIt')"
          variant="success"
          @click="modal2 = false"
        />
      </template>
    </UiModal>

    <!-- Persistent UiModal -->
    <UiModal
      v-model="modal3"
      :title="t('pages.componentModal.persistentModal')"
      persistent
    >
      <p>{{ t("pages.componentModal.persistentModalDescription") }}</p>
      <template #footer>
        <UiButton
          :label="t('pages.componentModal.close')"
          variant="danger"
          @click="modal3 = false"
        />
      </template>
    </UiModal>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
