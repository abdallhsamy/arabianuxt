<script setup lang="ts">
// Example: Replace with your real dashboard data later
const stats = [
  { label: 'Revenue', value: '$124,000', change: '+12%' },
  { label: 'Active Users', value: '8,213', change: '+3.8%' },
  { label: 'Transactions', value: '42,567', change: '+6.1%' },
  { label: 'Errors', value: '24', change: '-1.2%' },
];
</script>

<template>
  <section class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-gradient mb-1">Dashboard Overview</h1>
      <p class="text-[var(--text-secondary)]">
        Welcome back! Here’s a snapshot of your platform performance 📊
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
          v-for="item in stats"
          :key="item.label"
          class="card flex flex-col items-start"
      >
        <p class="text-[var(--text-secondary)] text-sm">{{ item.label }}</p>
        <h2 class="text-xl font-semibold text-white mt-1">{{ item.value }}</h2>
        <span
            class="text-xs mt-1"
            :class="item.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'"
        >
          {{ item.change }}
        </span>
      </div>
    </div>
  </section>
</template>
