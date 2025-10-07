<script setup lang="ts">
const stats = [
  { label: 'Revenue', value: '$124,000', change: '+12%' },
  { label: 'Active Users', value: '8,213', change: '+3.8%' },
  { label: 'Transactions', value: '42,567', change: '+6.1%' },
  { label: 'Errors', value: '24', change: '-1.2%' },
];
</script>

<template>
  <section class="space-y-10">
    <!-- Header -->
    <header class="relative">
      <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 drop-shadow-[0_0_12px_rgba(236,72,153,0.3)]">
        Dashboard Overview
      </h1>
      <p class="text-[var(--text-secondary)] mt-2">
        Welcome back! Here's a quick snapshot of your platform performance ⚡️
      </p>
    </header>

    <!-- Gradient Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
          v-for="item in stats"
          :key="item.label"
          class="relative group overflow-hidden rounded-2xl p-[2px] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]"
      >
        <!-- 🌀 Gradient Border -->
        <div
            class="absolute inset-0 rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_25%,#22D3EE_50%,#8B5CF6_100%)] animate-rotate-gradient opacity-60"
        ></div>

        <!-- Inner Card -->
        <div
            class="relative z-10 rounded-2xl bg-[rgba(15,17,23,0.85)] backdrop-blur-xl border border-white/10 p-5 flex flex-col justify-between h-full transition-all duration-300 group-hover:border-fuchsia-500/50 group-hover:shadow-[inset_0_1px_8px_rgba(255,255,255,0.05)]"
        >
          <p class="text-[var(--text-secondary)] text-sm">
            {{ item.label }}
          </p>
          <h2 class="text-2xl font-bold text-white mt-1">
            {{ item.value }}
          </h2>
          <span
              class="text-xs mt-2"
              :class="item.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'"
          >
            {{ item.change }}
          </span>

          <!-- Reflection Layer -->
          <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          >
            <div
                class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl blur-lg"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 🎡 Animated gradient rotation */
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
  animation: rotate-gradient 8s linear infinite;
}
</style>
