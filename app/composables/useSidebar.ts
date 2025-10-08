import { ref, computed } from 'vue'

// Global sidebar state
const isExpanded = ref(false)
const isMobile = ref(false)

export const useSidebar = () => {
  const checkViewport = (): void => {
    isMobile.value = window.innerWidth < 768;
  };

  const toggleSidebar = (): void => {
    isExpanded.value = !isExpanded.value;
  };

  const setExpanded = (expanded: boolean): void => {
    isExpanded.value = expanded;
  };

  return {
    isExpanded: computed(() => isExpanded.value),
    isMobile: computed(() => isMobile.value),
    checkViewport,
    toggleSidebar,
    setExpanded
  }
}
