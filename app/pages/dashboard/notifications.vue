<script setup lang="ts">
import { ref } from 'vue'
import { Bell, Mail, MessageSquare, Shield } from 'lucide-vue-next'

const notifications = ref([
  { icon: Bell, label: 'Push Notifications', enabled: true },
  { icon: Mail, label: 'Email Alerts', enabled: false },
  { icon: MessageSquare, label: 'Message Mentions', enabled: true },
  { icon: Shield, label: 'Security Warnings', enabled: true },
])
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 mb-6">
      Notifications
    </h1>

    <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 space-y-5">
      <div
          v-for="n in notifications"
          :key="n.label"
          class="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all"
      >
        <div class="flex items-center gap-3">
          <component :is="n.icon" class="w-5 h-5 text-cyan-400" />
          <span class="text-white font-medium">{{ n.label }}</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="n.enabled" class="sr-only peer" />
          <div
              class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-fuchsia-500 transition-all"
          ></div>
          <div
              class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5"
          ></div>
        </label>
      </div>
    </div>
  </section>
</template>
