<script setup lang="ts">
import { useToaster } from '~/composables/useToaster'
import { Bell, Info, AlertTriangle, CheckCircle2, XCircle } from 'lucide-vue-next'

const t = useToaster()

const showAll = () => {
  t.success('Success', 'Profile updated successfully.', { duration: 5000 })
  t.error('Error', 'Failed to connect to server.', { actionLabel: 'Retry', onAction: () => t.info('Retrying…') })
  t.warning('Warning', 'High CPU usage detected.', { duration: 7000 })
  t.info('Information', 'Backup completed at 10:32 AM.')
}

const showUndo = () =>
    t.info('File deleted', 'You can restore it within 10s.', {
      actionLabel: 'Undo',
      onAction: () => t.success('File restored', 'Your file is back in Documents!'),
    })

const showGrouped = () => {
  t.info('3 new system alerts', 'Grouped notification.', { groupKey: 'sys-alerts' })
  setTimeout(() => t.info('5 new system alerts', 'Updated count.', { groupKey: 'sys-alerts' }), 1500)
}

const showCustom = () =>
    t.show({
      title: '🚀 Deploy started',
      message: 'Version 2.4 rolling out...',
      type: 'custom',
      duration: 8000,
      actionLabel: 'View Logs',
      onAction: () => t.info('Opening logs...'),
    })
</script>

<template>
  <section class="space-y-10">
    <!-- Header -->
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
        Toaster Playground
      </h1>
      <p class="text-gray-400 text-sm max-w-md">
        Test different notification styles, actions, and group behavior in your dashboard UI.
      </p>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 transition-transform duration-300 hover:scale-[1.03]
               hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
          @click="t.success('Profile Saved', 'Your account information has been updated.')"
      >
        <CheckCircle2 class="w-6 h-6 text-white/90" />
        <span>Success Toast</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-rose-500/30 to-fuchsia-500/30 transition-transform duration-300 hover:scale-[1.03]
               hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]"
          @click="t.error('Connection Error', 'Server unreachable. Try again later.', { actionLabel: 'Retry', onAction: () => t.info('Retrying...') })"
      >
        <XCircle class="w-6 h-6 text-white/90" />
        <span>Error Toast</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-amber-400/30 to-orange-500/30 transition-transform duration-300 hover:scale-[1.03]
               hover:shadow-[0_0_25px_rgba(251,191,36,0.25)]"
          @click="t.warning('High Memory Usage', 'Your system is using 85% of memory.')"
      >
        <AlertTriangle class="w-6 h-6 text-white/90" />
        <span>Warning Toast</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-cyan-400/30 to-indigo-500/30 transition-transform duration-300 hover:scale-[1.03]
               hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]"
          @click="t.info('Backup Completed', 'Last backup finished 2 minutes ago.')"
      >
        <Info class="w-6 h-6 text-white/90" />
        <span>Info Toast</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/20 hover:scale-[1.03] transition-all"
          @click="showUndo"
      >
        <Bell class="w-6 h-6 text-white/90" />
        <span>Undo Action</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-amber-400/20 to-cyan-400/20 hover:scale-[1.03] transition-all"
          @click="showGrouped"
      >
        <Bell class="w-6 h-6 text-white/90" />
        <span>Grouped Toasts</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 hover:scale-[1.03] transition-all"
          @click="showAll"
      >
        <Bell class="w-6 h-6 text-white/90" />
        <span>All Types</span>
      </button>

      <button
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/10 text-white text-sm font-semibold
               backdrop-blur-lg bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 hover:scale-[1.03] transition-all"
          @click="showCustom"
      >
        <Bell class="w-6 h-6 text-white/90" />
        <span>Custom Toast</span>
      </button>
    </div>

    <!-- Tips -->
    <div class="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-gray-400 leading-relaxed">
      <p class="text-gray-300 font-medium mb-2">💡 Tips:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Hover over a toast to pause its auto-dismiss timer.</li>
        <li>Use <code>groupKey</code> to update ongoing notifications dynamically.</li>
        <li>Add <code>actionLabel</code> and <code>onAction()</code> for interactive toast actions.</li>
        <li>Supports different positions like <code>top-right</code>, <code>bottom-left</code>, etc.</li>
      </ul>
    </div>
  </section>
</template>
