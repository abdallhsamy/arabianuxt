<script setup lang="ts">
import UiDropdown from '~/components/Ui/Common/UiDropdown.vue'
import UiButton from '~/components/Ui/Common/UiButton.vue'
import { User, Settings, Bell, LogOut, ChevronDown } from 'lucide-vue-next'
import type {DropdownItem} from "~/components/Ui/Common/UiDropdown.type";

const dropdownItems: DropdownItem[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'divider1', divider: true },
  { id: 'logout', label: 'Logout', icon: LogOut, color: 'rose' },
]
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Dropdown Component Examples</h1>

    <div class="flex flex-wrap gap-6">
      <UiDropdown label="User Menu" :items="dropdownItems" :icon="User" />

      <UiDropdown label="Hover Menu" :items="dropdownItems" trigger="hover" color="cyan" />

      <UiDropdown label="Right Aligned" :items="dropdownItems" align="right" color="emerald" />

      <UiDropdown label="Top Position" :items="dropdownItems" position="top" color="rose" />
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/main.css";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
