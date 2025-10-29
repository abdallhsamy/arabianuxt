<script setup lang="ts">
import IncidentsTimeline from "~/components/Ui/Security/IncidentsTimeline/IncidentsTimeline.vue";
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import Chart from "chart.js/auto";
import { Activity, PieChart, Clock, Zap } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const loginCanvas = ref<HTMLCanvasElement | null>(null);
const deviceCanvas = ref<HTMLCanvasElement | null>(null);
const downloadCanvas = ref<HTMLCanvasElement | null>(null);

let loginChart: Chart | null = null;
let deviceChart: Chart | null = null;
let downloadChart: Chart | null = null;

const isLive = ref(true);
let interval: NodeJS.Timeout | null = null;

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 800, easing: "easeOutCubic" as const },
  plugins: { legend: { labels: { color: "#ccc" } } },
  scales: {
    x: { ticks: { color: "#aaa" }, grid: { color: "rgba(255,255,255,0.05)" } },
    y: { ticks: { color: "#aaa" }, grid: { color: "rgba(255,255,255,0.05)" } },
  },
};

const randomRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

onMounted(async () => {
  // 🕓 Wait until client-only fully mounts
  await nextTick();

  const ctxLogin = loginCanvas.value?.getContext("2d");
  const ctxDevice = deviceCanvas.value?.getContext("2d");
  const ctxDownload = downloadCanvas.value?.getContext("2d");

  if (!ctxLogin || !ctxDevice || !ctxDownload) {
    console.warn("Canvas context not ready yet.");
    return;
  }

  const gradient = ctxLogin.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, "rgba(236,72,153,0.8)");
  gradient.addColorStop(1, "rgba(139,92,246,0.1)");

  // 🕒 Login Activity
  loginChart = new Chart(ctxLogin, {
    type: "line",
    data: {
      labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: t("pages.analytics.chartLabels.logins"),
          data: [12, 19, 15, 22, 18, 25, 20],
          borderColor: "#EC4899",
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
        },
      ],
    },
    options: chartOptions,
  });

  // 💻 Device Usage
  deviceChart = new Chart(ctxDevice, {
    type: "bar",
    data: {
      labels: [
        t("pages.analytics.deviceLabels.macbook"),
        t("pages.analytics.deviceLabels.iphone"),
        t("pages.analytics.deviceLabels.windowsPc"),
        t("pages.analytics.deviceLabels.android"),
      ],
      datasets: [
        {
          label: t("pages.analytics.chartLabels.sessions"),
          data: [25, 18, 8, 6],
          backgroundColor: [
            "rgba(139,92,246,0.7)",
            "rgba(236,72,153,0.7)",
            "rgba(56,189,248,0.7)",
            "rgba(34,197,94,0.7)",
          ],
          borderRadius: 10,
        },
      ],
    },
    options: chartOptions,
  });

  // ⬇️ Data Downloads
  downloadChart = new Chart(ctxDownload, {
    type: "doughnut",
    data: {
      labels: [
        t("pages.analytics.chartLabels.profileData"),
        t("pages.analytics.chartLabels.reports"),
        t("pages.analytics.chartLabels.invoices"),
      ],
      datasets: [
        {
          data: [55, 25, 20],
          backgroundColor: [
            "rgba(139,92,246,0.8)",
            "rgba(236,72,153,0.8)",
            "rgba(56,189,248,0.8)",
          ],
          borderWidth: 0,
        },
      ],
    },
    options: {
      ...chartOptions,
      cutout: "70%",
    },
  });

  // 🔁 Live update simulation
  interval = setInterval(() => {
    if (!isLive.value) return;

    if (loginChart && loginChart.data.datasets[0]) {
      loginChart.data.datasets[0].data = loginChart.data.datasets[0].data.map(
        () => randomRange(10, 30)
      );
      loginChart.update("active");
    }

    if (deviceChart && deviceChart.data.datasets[0]) {
      deviceChart.data.datasets[0].data = deviceChart.data.datasets[0].data.map(
        () => randomRange(5, 25)
      );
      deviceChart.update("active");
    }

    if (downloadChart && downloadChart.data.datasets[0]) {
      downloadChart.data.datasets[0].data = [
        randomRange(40, 60),
        randomRange(15, 35),
        randomRange(10, 30),
      ];
      downloadChart.update("active");
    }
  }, 3000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
  loginChart?.destroy();
  deviceChart?.destroy();
  downloadChart?.destroy();
});
</script>

<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <h1
        class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400"
      >
        {{ t("pages.analytics.title") }}
      </h1>

      <!-- 🔴 Live Toggle -->
      <button
        @click="isLive = !isLive"
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-400 hover:brightness-110 transition-all"
      >
        <Zap class="w-4 h-4" />
        <span>{{
          isLive
            ? t("pages.analytics.liveUpdating")
            : t("pages.analytics.paused")
        }}</span>
        <span
          :class="[
            'ms-2 w-2.5 h-2.5 rounded-full animate-pulse',
            isLive
              ? 'bg-green-400 shadow-[0_0_8px_2px_rgba(74,222,128,0.6)]'
              : 'bg-gray-400',
          ]"
        ></span>
      </button>
    </div>

    <client-only>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 🕒 Login Trends -->
        <div
          class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_40%,#22D3EE_80%,#8B5CF6_100%)] animate-rotate-gradient"
        >
          <div
            class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 h-[360px] flex flex-col"
          >
            <h2
              class="flex items-center gap-2 text-white font-semibold text-lg mb-4"
            >
              <Activity class="w-5 h-5 text-fuchsia-400" />
              {{ t("pages.analytics.weeklyLoginActivity") }}
            </h2>
            <canvas ref="loginCanvas" class="flex-1"></canvas>
          </div>
        </div>

        <!-- 💻 Device Usage -->
        <div
          class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#8B5CF6_50%,#EC4899_100%)] animate-rotate-gradient"
        >
          <div
            class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 h-[360px] flex flex-col"
          >
            <h2
              class="flex items-center gap-2 text-white font-semibold text-lg mb-4"
            >
              <PieChart class="w-5 h-5 text-cyan-400" />
              {{ t("pages.analytics.deviceUsage") }}
            </h2>
            <canvas ref="deviceCanvas" class="flex-1"></canvas>
          </div>
        </div>

        <!-- ⬇️ Data Downloads -->
        <div
          class="lg:col-span-2 p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#EC4899_0%,#8B5CF6_60%,#22D3EE_100%)] animate-rotate-gradient"
        >
          <div
            class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 flex flex-col lg:flex-row lg:items-center gap-6"
          >
            <div class="flex-1">
              <h2
                class="flex items-center gap-2 text-white font-semibold text-lg mb-4"
              >
                <Clock class="w-5 h-5 text-indigo-400" />
                {{ t("pages.analytics.dataDownloadsOverview") }}
              </h2>
              <p class="text-sm text-gray-400 mb-4">
                {{ t("pages.analytics.liveProportionDescription") }}
              </p>
            </div>
            <div class="flex-1 min-h-[260px]">
              <canvas ref="downloadCanvas"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <IncidentsTimeline :is-live="isLive" />
      </div>
    </client-only>
  </section>
</template>

<style scoped>
@property --angle {
  syntax: "<angle>";
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
