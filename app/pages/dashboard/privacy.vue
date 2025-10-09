<script setup lang="ts">
import { ref } from 'vue'
import { Eye, Database, Trash2, Download, ShieldCheck, Lock } from 'lucide-vue-next'

const privacy = ref({
  analytics: true,
  personalizedAds: false,
  dataSharing: false,
  locationTracking: true,
})

const showModal = ref(false)
const modalAction = ref<'export' | 'delete' | null>(null)

const confirmAction = (action: 'export' | 'delete') => {
  modalAction.value = action
  showModal.value = true
}

const handleConfirm = () => {
  showModal.value = false
  if (modalAction.value === 'export') {
    alert('Your data export request has been submitted.')
  } else if (modalAction.value === 'delete') {
    alert('Your account data will be deleted permanently.')
  }
}
</script>

<template>
  <section>
    <h1
        class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 mb-6"
    >
      Privacy Settings
    </h1>

    <!-- 🧭 Privacy Controls -->
    <div
        class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_50%,#EC4899_100%)] animate-rotate-gradient mb-8"
    >
      <div
          class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 space-y-5"
      >
        <h2
            class="flex items-center gap-2 text-white font-semibold text-lg mb-2"
        >
          <Eye class="w-5 h-5 text-cyan-400" /> Data & Tracking Preferences
        </h2>

        <div
            v-for="(value, key) in privacy"
            :key="key"
            class="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all"
        >
          <span class="text-white capitalize">
            {{ key.replace(/([A-Z])/g, ' $1') }}
          </span>

          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="privacy[key]" class="sr-only peer" />
            <div
                class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-fuchsia-500 transition-all"
            ></div>
            <div
                class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5"
            ></div>
          </label>
        </div>
      </div>
    </div>

    <!-- ⚙️ Data Management -->
    <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <!-- Export Data -->
      <div
          class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#8B5CF6_50%,#EC4899_100%)] animate-rotate-gradient"
      >
        <div
            class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 text-center"
        >
          <h2
              class="flex items-center justify-center gap-2 text-white font-semibold text-lg mb-2"
          >
            <Download class="w-5 h-5 text-cyan-400" /> Export Data
          </h2>
          <p class="text-sm text-[var(--text-secondary)] mb-4">
            Request a copy of all your personal data in machine-readable format.
          </p>
          <button
              @click="confirmAction('export')"
              class="px-6 py-2 rounded-xl text-white bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 hover:brightness-110 transition-all font-semibold"
          >
            Request Export
          </button>
        </div>
      </div>

      <!-- Delete Data -->
      <div
          class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#EC4899_0%,#8B5CF6_50%,#22D3EE_100%)] animate-rotate-gradient"
      >
        <div
            class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 text-center"
        >
          <h2
              class="flex items-center justify-center gap-2 text-rose-400 font-semibold text-lg mb-2"
          >
            <Trash2 class="w-5 h-5" /> Delete Account Data
          </h2>
          <p class="text-sm text-[var(--text-secondary)] mb-4">
            Permanently delete your account and all related information.
          </p>
          <button
              @click="confirmAction('delete')"
              class="px-6 py-2 rounded-xl text-white bg-gradient-to-r from-rose-500 via-fuchsia-500 to-gray-800 hover:brightness-110 transition-all font-semibold"
          >
            Delete Data
          </button>
        </div>
      </div>
    </div>

    <!-- 🔐 Info Section -->
    <div
        class="mt-8 p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_50%,#EC4899_100%)] animate-rotate-gradient"
    >
      <div
          class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 text-sm text-gray-300 leading-relaxed"
      >
        <h2
            class="flex items-center gap-2 text-white font-semibold text-lg mb-2"
        >
          <ShieldCheck class="w-5 h-5 text-fuchsia-400" /> How We Protect Your Data
        </h2>
        <p>
          Your data is encrypted at rest and in transit. We follow GDPR and ISO-27001
          standards. You have full control over your information — what is stored,
          shared, and deleted.
        </p>
      </div>
    </div>

    <!-- 🧱 Confirmation UiModal -->
    <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
    >
      <div
          class="p-[2px] rounded-3xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_50%,#22D3EE_100%)] animate-rotate-gradient max-w-sm w-full"
      >
        <div
            class="rounded-3xl bg-[rgba(15,17,23,0.95)] p-8 text-center border border-white/10"
        >
          <Lock class="w-10 h-10 text-fuchsia-400 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-white mb-2">
            Confirm {{ modalAction === 'export' ? 'Export' : 'Deletion' }}
          </h3>
          <p class="text-sm text-gray-400 mb-6">
            {{ modalAction === 'export'
              ? 'We will prepare your data for download shortly.'
              : 'This action cannot be undone. Are you sure you want to permanently delete your data?' }}
          </p>
          <div class="flex justify-center gap-3">
            <button
                class="px-5 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition-all"
                @click="showModal = false"
            >
              Cancel
            </button>
            <button
                class="px-5 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 transition-all"
                @click="handleConfirm"
            >
              Confirm
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
