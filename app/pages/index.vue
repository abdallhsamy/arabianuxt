<script setup lang="ts">
import { ArrowRight, Github, Linkedin } from 'lucide-vue-next'

definePageMeta({ layout: 'empty' })

const features = [
  { title: '⚡ Nuxt 4 + Tailwind v4', desc: 'Modern SSR, atomic CSS, and instant dev experience.' },
  { title: '🎨 Arabia UI System', desc: 'Beautiful glassmorphic components built with best practices.' },
  { title: '🧠 AI-Powered Editing', desc: 'Tiptap Pro editor with built-in slash commands & AI assistance.' },
  { title: '🔒 Secure by Design', desc: 'Nuxt-Security, CSP, and DevSecOps-ready defaults.' },
  { title: '🧩 Modular & Typed', desc: 'Pinia setup syntax, full TypeScript, and composable architecture.' },
]
</script>

<template>
  <section class="min-h-screen bg-gradient-to-br from-fuchsia-900 via-gray-900 to-black text-gray-100 flex flex-col items-center justify-center px-6 py-24">
    <div class="max-w-4xl text-center space-y-6">
      <h1 class="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-400">
        Arabianuxt
      </h1>
      <p class="text-lg text-gray-300 max-w-2xl mx-auto">
        The elegant, production-ready Nuxt 4 + Tailwind v4 dashboard and UI kit.
        Designed for speed, security, and scalability — by <strong>Abdallah Samy</strong>.
      </p>

      <div class="flex justify-center gap-4 pt-2">
        <NuxtLink to="/dashboard" class="px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-cyan-600 rounded-lg font-semibold hover:opacity-90 transition">
          Open Dashboard
        </NuxtLink>
        <a href="https://github.com/abdallhsamy/arabianuxt" target="_blank" class="flex items-center gap-2 border border-white/10 px-6 py-3 rounded-lg hover:bg-white/10 transition">
          <Github class="w-5 h-5" /> GitHub
        </a>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 pt-12 text-left">
        <div
            v-for="(f,i) in features"
            :key="i"
            class="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-fuchsia-400/40 hover:bg-white/10 transition"
        >
          <h3 class="font-semibold text-fuchsia-300 mb-1">{{ f.title }}</h3>
          <p class="text-sm text-gray-400">{{ f.desc }}</p>
        </div>
      </div>

      <footer class="pt-16 text-sm text-gray-500">
        © {{ new Date().getFullYear() }} Abdallah Samy —
        <a href="https://www.linkedin.com/in/abdallah-samy/" target="_blank" class="hover:text-fuchsia-300 transition">LinkedIn</a> ·
        <a href="https://github.com/abdallhsamy" target="_blank" class="hover:text-cyan-300 transition">GitHub</a>
      </footer>
    </div>
  </section>
</template>
