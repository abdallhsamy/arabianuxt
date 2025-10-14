<script setup lang="ts">
import { onMounted, ref } from "vue";

export interface UiMapWidgetProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
}

const props = withDefaults(defineProps<UiMapWidgetProps>(), {
  zoom: 13,
  height: "300px",
});

const mapEl = ref<HTMLDivElement>();
onMounted(async () => {
  const L = await import("leaflet");
  const map = L.map(mapEl.value as HTMLElement).setView(
    [props.lat, props.lng],
    props.zoom
  );
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "",
  }).addTo(map);
  L.marker([props.lat, props.lng]).addTo(map);
});
</script>

<template>
  <div
    ref="mapEl"
    class="rounded-xl border border-white/10 overflow-hidden"
    :style="{ height: props.height }"
  ></div>
</template>

<style scoped>
.leaflet-container {
  filter: invert(0.92) hue-rotate(180deg) brightness(0.8);
}
</style>
