<template>
  <div
      id="auth-layout"
      class="relative flex min-h-screen items-center justify-center overflow-hidden text-[var(--text-primary)] bg-[#0b0b0f]"
  >
    <!-- ✨ Static fallback gradient -->
    <div
        class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.15),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.15),transparent_55%),linear-gradient(180deg,#0b0b0f_0%,#0f1115_100%)] opacity-100"
    ></div>

    <!-- 🌈 Animated overlay (after paint) -->
    <div
        class="absolute inset-0 -z-10 animate-gradient-flow opacity-0 animate-fadeIn"
    ></div>

    <!-- Light blobs -->
    <div class="absolute top-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-500/30 blur-[120px] opacity-15 animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-indigo-500/25 to-fuchsia-400/25 blur-[120px] opacity-15 animate-pulse"></div>

    <div class="relative z-10 w-full max-w-md px-6">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@keyframes gradient-flow {
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}
.animate-gradient-flow {
  background: radial-gradient(circle at 20% 30%, rgba(139,92,246,0.25), transparent 50%),
  radial-gradient(circle at 80% 70%, rgba(236,72,153,0.25), transparent 50%),
  linear-gradient(180deg, #0b0b0f 0%, #0f1115 100%);
  background-size: 200% 200%;
  animation: gradient-flow 18s ease infinite;
}

/* Smooth fade for gradient overlay */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease forwards;
}
</style>
