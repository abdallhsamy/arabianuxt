<template>
  <section class="space-y-8">
    <h1 class="page-title">UI Components</h1>
    <p class="text-gray-400">Explore all core Arabia UI components.</p>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
          v-for="c in components"
          :key="c.path"
          :to="c.path"
          class="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all text-white backdrop-blur-xl"
      >
        <h2 class="text-lg font-semibold mb-1">{{ c.name }}</h2>
        <p class="text-gray-400 text-sm">{{ c.desc }}</p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const components = [
  { name: 'Button', path: '/dashboard/components/button', desc: 'Gradient buttons with states & icons' },
  { name: 'Input', path: '/dashboard/components/input', desc: 'Form input fields with validation & icons' },
  { name: 'Select', path: '/dashboard/components/select', desc: 'Searchable dropdowns & async data' },
  { name: 'Switch', path: '/dashboard/components/switch', desc: 'Accessible toggle switches' },
  { name: 'Card', path: '/dashboard/components/card', desc: 'Flexible layout containers' },
]
</script>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
