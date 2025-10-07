<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0b0f] text-[var(--text-primary)]">
    <!-- 🌌 Animated Gradient Backdrop -->
    <div
        class="absolute inset-0 -z-10 animate-gradient-flow bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.25),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.25),transparent_55%),linear-gradient(180deg,#0b0b0f_0%,#0f1115_100%)]"
    ></div>

    <!-- 🪞 Floating Glow Blobs -->
    <div class="absolute top-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-500/30 blur-[120px] opacity-20 animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-indigo-500/25 to-fuchsia-400/25 blur-[120px] opacity-20 animate-pulse"></div>

    <!-- Slot Content -->
    <div class="relative z-10 w-full max-w-md px-6">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient-flow {
  background-size: 200% 200%;
  animation: gradient-flow 18s ease infinite;
}
</style>
