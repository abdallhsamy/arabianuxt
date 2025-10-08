<script setup lang="ts">
import { ref } from 'vue'
import { Shield, Smartphone, Globe, LogOut, Lock, ShieldCheck } from 'lucide-vue-next'

type Session = { id:string; device:string; ip:string; lastActive:string; current:boolean }

const twoFAEnabled = ref(true)


const activities = ref([
  { id: 1, action: 'Signed in from Chrome (MacOS)', time: '2 hours ago' },
  { id: 2, action: 'Enabled 2FA', time: 'Yesterday' },
  { id: 3, action: 'Password changed', time: '2 days ago' },
  { id: 4, action: 'New device: iPhone 14 Pro', time: '4 days ago' },
])


const sessions = ref<Session[]>([
  { id:'s1', device:'MacBook Pro (Safari)', ip:'10.0.0.12', lastActive:'Just now', current:true },
  { id:'s2', device:'iPhone 14', ip:'172.16.0.5', lastActive:'2h ago', current:false },
])
const twoFA = ref(true)
const signOutAll = ():void => alert('All sessions signed out.')
</script>

<template>
  <section class="space-y-8">
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">Security Settings</h1>

    <!-- 2FA -->
    <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_60%,#EC4899_100%)] animate-rotate-gradient">
      <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] p-6 border border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <ShieldCheck class="w-5 h-5 text-cyan-400" />
          <div>
            <p class="text-white font-semibold">Two-Factor Authentication</p>
            <p class="text-sm text-gray-400">Adds extra security to your account.</p>
          </div>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="twoFA" class="sr-only peer" />
          <div class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-fuchsia-500 transition-all"></div>
          <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
        </label>
      </div>
    </div>

    <!-- Active Sessions -->
    <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#EC4899_0%,#8B5CF6_60%,#22D3EE_100%)] animate-rotate-gradient">
      <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] p-6 border border-white/10">
        <h2 class="text-white font-semibold mb-4 flex items-center gap-2"><Smartphone class="w-5 h-5 text-fuchsia-400" /> Active Sessions</h2>
        <ul class="divide-y divide-white/10">
          <li v-for="s in sessions" :key="s.id" class="flex items-center justify-between py-3">
            <div>
              <p class="text-white text-sm">{{ s.device }}</p>
              <p class="text-xs text-gray-400">{{ s.ip }} • {{ s.lastActive }}</p>
            </div>
            <span v-if="s.current" class="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-400/30">Current</span>
          </li>
        </ul>
        <div class="text-right mt-4">
          <button class="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-400 hover:brightness-110 flex items-center gap-2" @click="signOutAll">
            <LogOut class="w-4 h-4" /> Sign out all
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              Delete Account
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


@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes rotate-gradient { to { --angle: 360deg; } }
.animate-rotate-gradient { animation: rotate-gradient 14s linear infinite; }
</style>
