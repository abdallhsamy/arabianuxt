<script setup lang="ts">
import { ref, computed } from 'vue'
import { CreditCard, FileText, Download, CheckCircle2, AlertTriangle, Plus } from 'lucide-vue-next'
import UiModal from '~/components/Ui/Common/UiModal.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

type Invoice = {
  id: string
  date: string
  amount: number
  status: 'paid' | 'due' | 'overdue'
  url: string
}

const invoices = ref<Invoice[]>([
  { id: 'INV-2025-0041', date: '2025-10-01', amount: 129.00, status: 'paid', url: '#' },
  { id: 'INV-2025-0039', date: '2025-09-01', amount: 129.00, status: 'paid', url: '#' },
  { id: 'INV-2025-0037', date: '2025-08-01', amount: 129.00, status: 'due', url: '#' },
  { id: 'INV-2025-0035', date: '2025-07-01', amount: 129.00, status: 'overdue', url: '#' },
])

const cardLast4 = ref('4242')
const nextAmount = computed<number>(() => 129.00)
const addCardOpen = ref(false)

const maskCard = (last4: string): string => `•••• •••• •••• ${last4}`
const currency = (n: number): string => `$${n.toFixed(2)}`
</script>

<template>
  <section class="space-y-8">
    <header class="flex items-center justify-between">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
        {{ t('pages.billing.title') }}
      </h1>
      <button class="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 transition-all">
        <Plus class="w-4 h-4" /> {{ t('pages.billing.addPaymentMethod') }}
      </button>
    </header>

    <!-- Payment Method -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-1 p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_60%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6">
          <h2 class="text-white font-semibold text-lg mb-3 flex items-center gap-2">
            <CreditCard class="w-5 h-5 text-cyan-400" /> {{ t('pages.billing.paymentMethod') }}
          </h2>
          <p class="text-gray-300 text-sm">{{ t('pages.billing.cardOnFile') }}</p>
          <p class="text-white font-medium mt-1">{{ maskCard(cardLast4) }}</p>
          <div class="mt-4 flex gap-3">
            <button class="px-4 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition-all" @click="addCardOpen = true">{{ t('pages.billing.updateCard') }}</button>
            <button class="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 transition-all">{{ t('pages.billing.payNow') }} {{ currency(nextAmount) }}</button>
          </div>
        </div>
      </div>

      <!-- Invoices -->
      <div class="lg:col-span-2 p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#8B5CF6_60%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 overflow-x-auto">
          <h2 class="text-white font-semibold text-lg mb-4 flex items-center gap-2"><FileText class="w-5 h-5 text-fuchsia-400" /> {{ t('pages.billing.invoices') }}</h2>
          <table class="w-full text-sm">
            <thead class="text-gray-400">
            <tr class="text-left">
              <th class="py-2">{{ t('pages.billing.invoiceTableHeaders.invoice') }}</th>
              <th class="py-2">{{ t('pages.billing.invoiceTableHeaders.date') }}</th>
              <th class="py-2">{{ t('pages.billing.invoiceTableHeaders.amount') }}</th>
              <th class="py-2">{{ t('pages.billing.invoiceTableHeaders.status') }}</th>
              <th class="py-2 text-right">{{ t('pages.billing.invoiceTableHeaders.actions') }}</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-white/10">
            <tr v-for="inv in invoices" :key="inv.id" class="hover:bg-white/5 transition-colors">
              <td class="py-3 text-white">{{ inv.id }}</td>
              <td class="py-3 text-gray-300">{{ inv.date }}</td>
              <td class="py-3 text-white">{{ currency(inv.amount) }}</td>
              <td class="py-3">
                  <span
                      class="px-2 py-1 rounded-full text-xs inline-flex items-center gap-1 border"
                      :class="inv.status === 'paid'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-400/30'
                      : inv.status === 'due'
                      ? 'bg-amber-400/10 text-amber-300 border-amber-300/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-400/30'"
                  >
                    <component :is="inv.status === 'paid' ? CheckCircle2 : AlertTriangle" class="w-3.5 h-3.5" />
                    {{ inv.status }}
                  </span>
              </td>
              <td class="py-3 text-right">
                <a :href="inv.url" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-all">
                  <Download class="w-4 h-4" /> {{ t('pages.billing.pdf') }}
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add Card UiModal -->
    <UiModal v-model="addCardOpen" :title="t('pages.billing.updatePaymentMethod')" :confirm-text="t('pages.billing.saveCard')">
      <div class="space-y-3">
        <input class="input-dark w-full" :placeholder="t('pages.billing.cardholderName')" />
        <input class="input-dark w-full" :placeholder="t('pages.billing.cardNumber')" />
        <div class="grid grid-cols-2 gap-3">
          <input class="input-dark w-full" :placeholder="t('pages.billing.expiryDate')" />
          <input class="input-dark w-full" :placeholder="t('pages.billing.cvc')" />
        </div>
      </div>
    </UiModal>
  </section>
</template>

<style scoped>
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes rotate-gradient { to { --angle: 360deg; } }
.animate-rotate-gradient { background-size: 200% 200%; animation: rotate-gradient 14s linear infinite; }
.input-dark { background-color: rgba(25,27,33,0.95); border: 1px solid rgba(255,255,255,0.08); color: var(--text-primary); border-radius: 0.75rem; padding: 0.75rem 1rem; transition: all .25s ease; }
.input-dark:focus { outline: none; border-color: rgba(236,72,153,0.4); box-shadow: 0 0 0 2px rgba(236,72,153,0.2); }
</style>
