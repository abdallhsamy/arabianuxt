<script setup lang="ts">
import UiStepper from "~/components/Ui/Common/UiStepper/UiStepper.vue";
import { User, CreditCard, CheckCircle2 } from "lucide-vue-next";
import { ref } from "vue";
import type { StepItem } from "~/components/Ui/Common/UiStepper.type";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const steps = ref<StepItem[]>([
  {
    id: "account",
    label: t("pages.componentStepper.steps.account.label"),
    description: t("pages.componentStepper.steps.account.description"),
    icon: User,
    state: "completed",
  },
  {
    id: "billing",
    label: t("pages.componentStepper.steps.billing.label"),
    description: t("pages.componentStepper.steps.billing.description"),
    icon: CreditCard,
    state: "active",
  },
  {
    id: "confirmation",
    label: t("pages.componentStepper.steps.confirmation.label"),
    description: t("pages.componentStepper.steps.confirmation.description"),
    icon: CheckCircle2,
    state: "pending",
  },
]);

const stepsVertical = ref<StepItem[]>([
  {
    id: "details",
    label: t("pages.componentStepper.stepsVertical.details"),
    state: "completed",
  },
  {
    id: "verify",
    label: t("pages.componentStepper.stepsVertical.verify"),
    state: "completed",
  },
  {
    id: "review",
    label: t("pages.componentStepper.stepsVertical.review"),
    state: "active",
  },
  {
    id: "submit",
    label: t("pages.componentStepper.stepsVertical.submit"),
    state: "pending",
  },
]);

const stepsWithErrors = ref<StepItem[]>([
  {
    id: "profile",
    label: t("pages.componentStepper.stepsErrors.profile"),
    state: "completed",
  },
  {
    id: "upload",
    label: t("pages.componentStepper.stepsErrors.upload"),
    state: "error",
  },
  {
    id: "review",
    label: t("pages.componentStepper.stepsErrors.review"),
    state: "pending",
  },
]);
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t("pages.componentStepper.title") }}</h1>

    <!-- Horizontal -->
    <UiStepper :steps="steps" color="fuchsia" />

    <!-- Vertical -->
    <div class="mt-10">
      <UiStepper :steps="stepsVertical" vertical color="cyan" />
    </div>

    <!-- With Errors -->
    <UiStepper :steps="stepsWithErrors" color="rose" />
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
