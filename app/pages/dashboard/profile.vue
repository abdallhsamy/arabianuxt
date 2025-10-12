<script setup lang="ts">
import { ref } from 'vue'
import AvatarUpload from '~/components/Ui/User/AvatarUpload.vue'

const { t } = useI18n()

const name = ref('Abdallah Samy')
const email = ref('abdallah@example.com')
const phone = ref('+966 55 123 4567')
const timezone = ref('Africa/Cairo')
const newPassword = ref('')
const confirmPassword = ref('')

const save = (): void => alert(t('pages.profile.profileSaved'))
</script>

<template>
  <section class="space-y-8">
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
      {{ t('pages.profile.title') }}
    </h1>

    <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_60%,#EC4899_100%)] animate-rotate-gradient">
      <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] p-6 border border-white/10 flex flex-col lg:flex-row gap-6">
        <AvatarUpload @change="() => {}" />

        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="name" class="input-dark" :placeholder="t('pages.profile.fullNamePlaceholder')" />
          <input v-model="email" class="input-dark" placeholder="your@email.com" />
          <input v-model="phone" class="input-dark" :placeholder="t('pages.profile.phonePlaceholder')" />
          <select v-model="timezone" class="input-dark">
            <option>{{ t('pages.profile.timezones.africaCairo') }}</option>
            <option>{{ t('pages.profile.timezones.asiaDubai') }}</option>
            <option>{{ t('pages.profile.timezones.europeLondon') }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#EC4899_0%,#8B5CF6_60%,#22D3EE_100%)] animate-rotate-gradient">
      <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] p-6 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="newPassword" type="password" class="input-dark" :placeholder="t('pages.profile.newPasswordPlaceholder')" />
        <input v-model="confirmPassword" type="password" class="input-dark" :placeholder="t('pages.profile.confirmPasswordPlaceholder')" />
      </div>
    </div>

    <div class="text-right">
      <button class="px-6 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 font-semibold" @click="save">
        {{ t('pages.profile.saveChanges') }}
      </button>
    </div>
  </section>
</template>

<style scoped>
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes rotate-gradient { to { --angle: 360deg; } }
.animate-rotate-gradient { animation: rotate-gradient 14s linear infinite; }
.input-dark { background-color: rgba(25,27,33,0.95); border:1px solid rgba(255,255,255,0.08); color:white; border-radius:.75rem; padding:.75rem 1rem; transition:all .25s ease; }
.input-dark:focus { outline:none; border-color:rgba(236,72,153,.4); box-shadow:0 0 0 2px rgba(236,72,153,.2); }
</style>
