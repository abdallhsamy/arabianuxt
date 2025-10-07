<script setup lang="ts">
import { ref } from 'vue'
import { User, Mail, Lock, Upload } from 'lucide-vue-next'

const name = ref('Abdallah Samy')
const email = ref('abdallah@example.com')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isSaving = ref(false)

const handleSave = async (): Promise<void> => {
  isSaving.value = true
  await new Promise(r => setTimeout(r, 1000))
  isSaving.value = false
  alert('Profile updated successfully')
}
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 mb-6">
      Profile Settings
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Personal Info -->
      <div class="card p-[2px] bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_40%,#22D3EE_80%,#8B5CF6_100%)] animate-rotate-gradient rounded-2xl">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl p-6 border border-white/10">
          <h2 class="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <User class="w-5 h-5 text-fuchsia-400" /> Personal Info
          </h2>

          <div class="space-y-4">
            <div>
              <label class="text-sm text-[var(--text-secondary)] mb-1 block">Name</label>
              <input v-model="name" type="text" class="input-dark w-full" />
            </div>
            <div>
              <label class="text-sm text-[var(--text-secondary)] mb-1 block">Email</label>
              <input v-model="email" type="email" class="input-dark w-full" />
            </div>
            <div>
              <label class="text-sm text-[var(--text-secondary)] mb-1 block">Profile Picture</label>
              <div class="flex items-center gap-3">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Abdallah" class="w-14 h-14 rounded-full border border-white/20" />
                <button class="flex items-center gap-2 text-sm text-fuchsia-400 hover:text-cyan-400">
                  <Upload class="w-4 h-4" /> Upload New
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Password Change -->
      <div class="card p-[2px] bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#EC4899_40%,#8B5CF6_80%,#22D3EE_100%)] animate-rotate-gradient rounded-2xl">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl p-6 border border-white/10">
          <h2 class="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <Lock class="w-5 h-5 text-cyan-400" /> Change Password
          </h2>

          <div class="space-y-4">
            <input v-model="currentPassword" type="password" placeholder="Current password" class="input-dark w-full" />
            <input v-model="newPassword" type="password" placeholder="New password" class="input-dark w-full" />
            <input v-model="confirmPassword" type="password" placeholder="Confirm password" class="input-dark w-full" />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 text-right">
      <button
          @click="handleSave"
          :disabled="isSaving"
          class="px-6 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 disabled:opacity-60 font-semibold"
      >
        {{ isSaving ? 'Saving...' : 'Save Changes' }}
      </button>
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
  to { --angle: 360deg; }
}
.animate-rotate-gradient {
  background-size: 200% 200%;
  animation: rotate-gradient 12s linear infinite;
}
.input-dark {
  background-color: rgba(25,27,33,0.95);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--text-primary);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  transition: all 0.25s ease;
}
.input-dark:focus {
  outline: none;
  border-color: rgba(236,72,153,0.4);
  box-shadow: 0 0 0 2px rgba(236,72,153,0.2);
}
</style>
