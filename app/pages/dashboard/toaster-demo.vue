<script setup lang="ts">
import { useToaster } from '~/composables/useToaster'
import { Bell, Info, AlertTriangle, CheckCircle2, XCircle } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const toaster = useToaster()
const { t } = useI18n()

const showAll = () => {
  toaster.success(t('pages.toasterDemo.successToast'), t('pages.toasterDemo.successMessage'), { duration: 5000 })
  toaster.error(t('pages.toasterDemo.errorToast'), t('pages.toasterDemo.errorMessage'), { actionLabel: t('pages.toasterDemo.retryAction'), onAction: () => toaster.info(t('pages.toasterDemo.retrying')) })
  toaster.warning(t('pages.toasterDemo.warningToast'), t('pages.toasterDemo.warningMessage'), { duration: 7000 })
  toaster.info(t('pages.toasterDemo.infoToast'), t('pages.toasterDemo.infoMessage'))
}

const showUndo = () =>
    toaster.info(t('pages.toasterDemo.fileDeleted'), t('pages.toasterDemo.fileDeletedMessage'), {
      actionLabel: t('pages.toasterDemo.undoAction'),
      onAction: () => toaster.success(t('pages.toasterDemo.fileRestored'), t('pages.toasterDemo.fileRestoredMessage')),
    })

const showGrouped = () => {
  toaster.info(t('pages.toasterDemo.groupedAlert1'), t('pages.toasterDemo.groupedNotification'), { groupKey: 'sys-alerts' })
  setTimeout(() => toaster.info(t('pages.toasterDemo.groupedAlert2'), t('pages.toasterDemo.updatedCount'), { groupKey: 'sys-alerts' }), 1500)
}

const showCustom = () =>
    toaster.show({
      title: t('pages.toasterDemo.customToast'),
      message: t('pages.toasterDemo.customMessage'),
      type: 'custom',
      duration: 8000,
      actionLabel: t('pages.toasterDemo.viewLogs'),
      onAction: () => toaster.info(t('pages.toasterDemo.openingLogs')),
    })
</script>

<template>
  <section class="space-y-10">
    <!-- Header -->
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
        {{ t('pages.toasterDemo.title') }}
      </h1>
      <p class="text-gray-400 text-sm max-w-md">
        {{ t('pages.toasterDemo.description') }}
      </p>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 transition-transform duration-300 hover:scale-[1.03]
               hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
          @click="toaster.success(t('pages.toasterDemo.successToast'), t('pages.toasterDemo.successMessage'))"
      >
        <CheckCircle2 class="w-6 h-6 text-white/90" />
        <span>{{ t('pages.toasterDemo.successToast') }}</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-rose-500/30 to-fuchsia-500/30 transition-transform duration-300 hover:scale-[1.03]
               hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]"
          @click="toaster.error(t('pages.toasterDemo.errorToast'), t('pages.toasterDemo.errorMessage'), { actionLabel: t('pages.toasterDemo.retryAction'), onAction: () => toaster.info(t('pages.toasterDemo.retrying')) })"
      >
        <XCircle class="w-6 h-6 text-white/90" />
        <span>{{ t('pages.toasterDemo.errorToast') }}</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-amber-400/30 to-orange-500/30 transition-transform duration-300 hover:scale-[1.03]
               hover:shadow-[0_0_25px_rgba(251,191,36,0.25)]"
          @click="toaster.warning(t('pages.toasterDemo.warningToast'), t('pages.toasterDemo.warningMessage'))"
      >
        <AlertTriangle class="w-6 h-6 text-white/90" />
        <span>{{ t('pages.toasterDemo.warningToast') }}</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-cyan-400/30 to-indigo-500/30 transition-transform duration-300 hover:scale-[1.03]
               hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]"
          @click="toaster.info(t('pages.toasterDemo.infoToast'), t('pages.toasterDemo.infoMessage'))"
      >
        <Info class="w-6 h-6 text-white/90" />
        <span>{{ t('pages.toasterDemo.infoToast') }}</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/20 hover:scale-[1.03] transition-all"
          @click="showUndo"
      >
        <Bell class="w-6 h-6 text-white/90" />
        <span>{{ t('pages.toasterDemo.undoAction') }}</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-amber-400/20 to-cyan-400/20 hover:scale-[1.03] transition-all"
          @click="showGrouped"
      >
        <Bell class="w-6 h-6 text-white/90" />
        <span>{{ t('pages.toasterDemo.groupedToasts') }}</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 hover:scale-[1.03] transition-all"
          @click="showAll"
      >
        <Bell class="w-6 h-6 text-white/90" />
        <span>{{ t('pages.toasterDemo.allTypes') }}</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 hover:scale-[1.03] transition-all"
          @click="showCustom"
      >
        <Bell class="w-6 h-6 text-white/90" />
        <span>{{ t('pages.toasterDemo.customToast') }}</span>
      </button>
    </div>

    <!-- Tips -->
    <div class="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-gray-400 leading-relaxed">
      <p class="text-gray-300 font-medium mb-2">{{ t('pages.toasterDemo.tips') }}</p>
      <ul class="list-disc list-inside space-y-1">
        <li>{{ t('pages.toasterDemo.tip1') }}</li>
        <li>{{ t('pages.toasterDemo.tip2') }}</li>
        <li>{{ t('pages.toasterDemo.tip3') }}</li>
        <li>{{ t('pages.toasterDemo.tip4') }}</li>
      </ul>
    </div>
  </section>
</template>
