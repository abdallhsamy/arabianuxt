<script setup lang="ts">
import UiInput from '~/components/Ui/Form/UiInput.vue'
import { Mail, Lock } from 'lucide-vue-next'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Input Component Examples</h1>

    <!-- Default Input -->
    <UiInput
        v-model="email"
        label="Email"
        placeholder="Enter your email"
        :icon="Mail"
        message="We'll never share your email."
    />

    <!-- Password Input -->
    <UiInput
        v-model="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        password-toggle
        :icon="Lock"
    />

    <!-- Success -->
    <UiInput
        v-model="email"
        label="Valid Email"
        placeholder="example@domain.com"
        state="success"
        message="Looks good!"
    />

    <!-- Warning -->
    <UiInput
        v-model="email"
        label="Unverified Email"
        state="warning"
        message="Please verify your email."
    />

    <!-- Error -->
    <UiInput
        v-model="email"
        label="Invalid Email"
        state="error"
        message="Please enter a valid email address."
    />

    <!-- Outlined Variant -->
    <UiInput
        v-model="email"
        label="Outlined Input"
        variant="outlined"
        placeholder="Focus to see border highlight"
    />

    <!-- Filled Variant -->
    <UiInput
        v-model="email"
        label="Filled Input"
        variant="filled"
        placeholder="Smooth glass fill"
    />
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
