<script setup lang="ts">
import UiStepper from '~/components/Ui/Common/UiStepper.vue'
import { User, CreditCard, CheckCircle2 } from 'lucide-vue-next'
import { ref } from 'vue'
import type {StepItem} from "~/components/Ui/Common/UiStepper.type";

const steps = ref<StepItem[]>([
  { id: 'account', label: 'Account', description: 'Create your account', icon: User, state: 'completed' },
  { id: 'billing', label: 'Billing', description: 'Setup payment method', icon: CreditCard, state: 'active' },
  { id: 'confirmation', label: 'Confirm', description: 'Finish setup', icon: CheckCircle2, state: 'pending' },
])

const stepsVertical = ref<StepItem[]>([
  { id: 'details', label: 'Personal Details', state: 'completed' },
  { id: 'verify', label: 'Verification', state: 'completed' },
  { id: 'review', label: 'Review Info', state: 'active' },
  { id: 'submit', label: 'Submit', state: 'pending' },
])

const stepsWithErrors = ref<StepItem[]>([
  { id: 'profile', label: 'Profile', state: 'completed' },
  { id: 'upload', label: 'Upload Files', state: 'error' },
  { id: 'review', label: 'Review', state: 'pending' }
])
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Stepper Component Examples</h1>

    <!-- Horizontal -->
    <UiStepper :steps="steps" color="fuchsia" />

    <!-- Vertical -->
    <div class="mt-10">
      <UiStepper :steps="stepsVertical" vertical color="cyan" />
    </div>

    <!-- With Errors -->
    <UiStepper :steps="stepsWithErrors" color="rose"/>
  </section>
</template>

<style scoped>
@reference "~/assets/css/main.css";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
