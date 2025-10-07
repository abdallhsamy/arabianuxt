<script setup lang="ts">
import { ref } from 'vue'
import { Shield, Smartphone, Globe, LogOut, Lock } from 'lucide-vue-next'

const twoFAEnabled = ref(true)

const sessions = ref([
  { id: 1, device: 'MacBook Pro 16”', location: 'Riyadh, SA', browser: 'Chrome', active: true },
  { id: 2, device: 'iPhone 14 Pro', location: 'Riyadh, SA', browser: 'Safari', active: true },
  { id: 3, device: 'Windows PC', location: 'Cairo, EG', browser: 'Edge', active: false },
])

const activities = ref([
  { id: 1, action: 'Signed in from Chrome (MacOS)', time: '2 hours ago' },
  { id: 2, action: 'Enabled 2FA', time: 'Yesterday' },
  { id: 3, action: 'Password changed', time: '2 days ago' },
  { id: 4, action: 'New device: iPhone 14 Pro', time: '4 days ago' },
])
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 mb-6">
      Security Settings
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 🔐 2FA Settings -->
      <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_40%,#22D3EE_80%,#8B5CF6_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6">
          <h2 class="flex items-center gap-2 text-white font-semibold text-lg mb-4">
            <Shield class="w-5 h-5 text-cyan-400" /> Two-Factor Authentication (2FA)
          </h2>
          <p class="text-sm text-[var(--text-secondary)] mb-4">
            Add an extra layer of security to your account by enabling 2FA.
          </p>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="twoFAEnabled" class="sr-only peer" />
            <div
                class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-fuchsia-500 transition-all"
            ></div>
            <div
                class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5"
            ></div>
            <span class="ml-3 text-sm text-white">{{ twoFAEnabled ? 'Enabled' : 'Disabled' }}</span>
          </label>
        </div>
      </div>

      <!-- 💻 Active Sessions -->
      <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#8B5CF6_50%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6">
          <h2 class="flex items-center gap-2 text-white font-semibold text-lg mb-4">
            <Smartphone class="w-5 h-5 text-fuchsia-400" /> Active Sessions
          </h2>

          <div class="space-y-4">
            <div
                v-for="s in sessions"
                :key="s.id"
                class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
            >
              <div class="flex flex-col">
                <span class="text-white font-medium">{{ s.device }}</span>
                <span class="text-xs text-gray-400">{{ s.browser }} — {{ s.location }}</span>
              </div>

              <div class="flex items-center gap-2">
                <span
                    class="px-2 py-0.5 text-xs rounded-full"
                    :class="s.active ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-600/40 text-gray-300'"
                >
                  {{ s.active ? 'Active' : 'Offline' }}
                </span>
                <button class="text-gray-400 hover:text-rose-400 transition-all">
                  <LogOut class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 🌍 Recent Activity -->
      <div class="lg:col-span-2 p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#EC4899_0%,#8B5CF6_50%,#22D3EE_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6">
          <h2 class="flex items-center gap-2 text-white font-semibold text-lg mb-4">
            <Globe class="w-5 h-5 text-indigo-400" /> Recent Activity
          </h2>

          <div class="divide-y divide-white/10">
            <div
                v-for="a in activities"
                :key="a.id"
                class="flex items-center justify-between py-3 hover:bg-white/5 rounded-lg transition-all"
            >
              <span class="text-white text-sm">{{ a.action }}</span>
              <span class="text-xs text-gray-400">{{ a.time }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 🔒 Danger Zone -->
      <div class="lg:col-span-2 p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#ff0022_0%,#EC4899_50%,#8B5CF6_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 text-center">
          <h2 class="flex items-center justify-center gap-2 text-rose-400 font-semibold text-lg mb-3">
            <Lock class="w-5 h-5" /> Danger Zone
          </h2>
          <p class="text-sm text-[var(--text-secondary)] mb-5">
            You can log out from all devices or deactivate your account permanently.
          </p>
          <div class="flex justify-center gap-3">
            <button
                class="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-rose-500 to-fuchsia-500 hover:brightness-110 transition-all"
            >
              Log out All Devices
            </button>
            <button
                class="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:brightness-110 transition-all"
            >
              Deactivate Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes rotate-gradient {
  to {
    --angle: 360deg;
  }
}
.animate-rotate-gradient {
  background-size: 200% 200%;
  animation: rotate-gradient 14s linear infinite;
}
</style>
