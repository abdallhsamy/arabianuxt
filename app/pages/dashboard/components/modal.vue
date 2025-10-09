<script setup lang="ts">
import UiModal from '~/components/Ui/Common/UiModal.vue'
import UiButton from '~/components/Ui/Common/UiButton.vue'
import { ref } from 'vue'

const modal1 = ref(false)
const modal2 = ref(false)
const modal3 = ref(false)
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Modal Component Examples</h1>

    <div class="flex flex-wrap gap-4">
      <UiButton label="Open Basic Modal" @click="modal1 = true" />
      <UiButton label="Large Glass Modal" variant="outline" @click="modal2 = true" />
      <UiButton label="Persistent Modal" variant="danger" @click="modal3 = true" />
    </div>

    <!-- Basic UiModal -->
    <UiModal v-model="modal1" title="Welcome">
      <p>This is a simple modal example. It uses v-model to control visibility.</p>
      <template #footer>
        <UiButton label="Close" variant="outline" @click="modal1 = false" />
        <UiButton label="Confirm" variant="primary" @click="modal1 = false" />
      </template>
    </UiModal>

    <!-- Large Glass UiModal -->
    <UiModal v-model="modal2" title="Glass Modal" size="lg" glass>
      <p>
        This modal uses a glass effect with backdrop blur and smooth transitions.
        You can include long text or any other content here.
      </p>
      <template #footer>
        <UiButton label="Got it" variant="success" @click="modal2 = false" />
      </template>
    </UiModal>

    <!-- Persistent UiModal -->
    <UiModal v-model="modal3" title="Persistent Modal" persistent>
      <p>This modal cannot be closed by clicking outside or pressing ESC.</p>
      <template #footer>
        <UiButton label="Close" variant="danger" @click="modal3 = false" />
      </template>
    </UiModal>
  </section>
</template>

<style scoped>
@reference "~/assets/css/main.css";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
