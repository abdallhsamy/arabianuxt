<script setup lang="ts">
import { ref } from 'vue'
import GradientCard from '~/components/Ui/Common/GradientCard.vue'

const orgName = ref('Arabia Labs')
const domain = ref('app.arabialabs.com')
const plan = ref<'Free'|'Pro'|'Enterprise'>('Pro')
const primaryColor = ref('#8B5CF6')
const logoPreview = ref<string | null>(null)

const onLogo = (e: Event): void => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  logoPreview.value = URL.createObjectURL(file)
}

const save = (): void => {
  alert('Organization settings saved')
}
</script>

<template>
  <section class="space-y-8">
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
      Organization Settings
    </h1>

    <GradientCard>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="orgName" class="input-dark" placeholder="Organization name" />
          <input v-model="domain" class="input-dark" placeholder="Custom domain" />
          <select v-model="plan" class="input-dark">
            <option>Free</option><option>Pro</option><option>Enterprise</option>
          </select>
          <div class="flex items-center gap-3">
            <input v-model="primaryColor" type="color" class="h-10 w-14 rounded-lg border border-white/10 bg-transparent" />
            <span class="text-sm text-gray-300">Primary color</span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center gap-3">
          <div class="w-28 h-28 rounded-xl overflow-hidden bg-white/10 border border-white/10 flex items-center justify-center">
            <img v-if="logoPreview" :src="logoPreview" alt="Logo" class="w-full h-full object-cover" />
            <span v-else class="text-gray-400 text-xs">No Logo</span>
          </div>
          <label class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm cursor-pointer">
            Upload Logo <input type="file" accept="image/*" class="hidden" @change="onLogo" />
          </label>
        </div>
      </div>

      <div class="text-right mt-6">
        <button class="px-6 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 font-semibold" @click="save">
          Save Settings
        </button>
      </div>
    </GradientCard>
  </section>
</template>

<style scoped>
.input-dark { background-color: rgba(25,27,33,0.95); border:1px solid rgba(255,255,255,0.08); color:white; border-radius:.75rem; padding:.75rem 1rem; transition:all .25s ease; }
.input-dark:focus { outline:none; border-color:rgba(236,72,153,.4); box-shadow:0 0 0 2px rgba(236,72,153,.2); }
</style>
