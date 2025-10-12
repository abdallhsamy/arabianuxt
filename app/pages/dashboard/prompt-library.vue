<script setup lang="ts">
import { ref, computed } from 'vue'
import PromptItem from '~/components/Ui/AI/PromptItem.vue'
import TagChips from '~/components/Ui/Common/TagChips.vue'

const { t } = useI18n()

type Prompt = { id:string; title:string; text:string; tags:string[] }
const search = ref('')
const tagsFilter = ref<string[]>([])
const allTags = ref(['general','analytics','email','devops','security'])

const prompts = ref<Prompt[]>([
  { id:'p1', title:'Summarize weekly analytics', text:'Summarize KPIs for this week and produce 3 insights + 3 actions.', tags:['analytics','general'] },
  { id:'p2', title:'Security incident brief', text:'Draft a concise brief for latest incidents including scope, impact, and mitigation.', tags:['security'] },
  { id:'p3', title:'Customer email reply', text:'Write a friendly, concise reply acknowledging customer issue and proposing fix steps.', tags:['email','general'] },
])

const filtered = computed<Prompt[]>(() => {
  const q = search.value.toLowerCase()
  return prompts.value.filter(p => {
    const qOk = [p.title, p.text, ...p.tags].some(v => v.toLowerCase().includes(q))
    const tOk = !tagsFilter.value.length || tagsFilter.value.every(t => p.tags.includes(t))
    return qOk && tOk
  })
})

const newTitle = ref(''); const newText = ref(''); const newTags = ref<string[]>([])

const addPrompt = (): void => {
  if (!newTitle.value || !newText.value) return
  prompts.value.unshift({ id: crypto.randomUUID?.() ?? String(Date.now()), title: newTitle.value, text: newText.value, tags: [...newTags.value] })
  newTitle.value = ''; newText.value = ''; newTags.value = []
}

const removePrompt = (id: string): void => { prompts.value = prompts.value.filter(p => p.id !== id) }
const usePrompt = (id: string): void => alert(t('pages.promptLibrary.usePrompt', { id }))
const toggleTag = (arr: string[], tag: string): void => {
  const idx = arr.indexOf(tag); idx >= 0 ? arr.splice(idx,1) : arr.push(tag)
}
</script>

<template>
  <section class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">{{ t('pages.promptLibrary.title') }}</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sidebar Filters -->
      <div class="lg:col-span-1 p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_55%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.94)] border border-white/10 p-5">
          <h3 class="text-white font-semibold mb-2">{{ t('pages.promptLibrary.filters') }}</h3>
          <input v-model="search" class="input-dark w-full mb-3" :placeholder="t('pages.promptLibrary.searchPlaceholder')" />
          <div class="space-y-2">
            <p class="text-xs text-gray-400">{{ t('pages.promptLibrary.tags') }}</p>
            <div class="flex flex-wrap gap-2">
              <button
                  v-for="t in allTags" :key="t"
                  @click="toggleTag(tagsFilter, t)"
                  class="text-[11px] px-2 py-1 rounded-full border"
                  :class="tagsFilter.includes(t) ? 'bg-gradient-to-r from-indigo-500/40 to-fuchsia-500/40 text-white border-white/20'
                                               : 'bg-white/5 text-gray-200 border-white/10 hover:bg-white/10'">
                {{ t }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Library -->
      <div class="lg:col-span-2 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PromptItem
              v-for="p in filtered" :key="p.id"
              :id="p.id" :title="p.title" :text="p.text" :tags="p.tags"
              @use="usePrompt" @copy="() => {}" @delete="removePrompt"
          />
        </div>

        <!-- Create -->
        <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#8B5CF6_55%,#EC4899_100%)] animate-rotate-gradient">
          <div class="rounded-2xl bg-[rgba(15,17,23,0.94)] border border-white/10 p-5">
            <h3 class="text-white font-semibold mb-3">{{ t('pages.promptLibrary.addPrompt') }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input v-model="newTitle" class="input-dark" :placeholder="t('pages.promptLibrary.titlePlaceholder')" />
              <div>
                <p class="text-xs text-gray-400 mb-1">{{ t('pages.promptLibrary.tags') }}</p>
                <div class="flex flex-wrap gap-2">
                  <button
                      v-for="t in allTags" :key="t"
                      @click="toggleTag(newTags, t)"
                      class="text-[11px] px-2 py-1 rounded-full border"
                      :class="newTags.includes(t) ? 'bg-gradient-to-r from-indigo-500/40 to-fuchsia-500/40 text-white border-white/20'
                                                : 'bg-white/5 text-gray-200 border-white/10 hover:bg-white/10'">
                    {{ t }}
                  </button>
                </div>
              </div>
              <textarea v-model="newText" class="input-dark md:col-span-2 min-h-[120px]" :placeholder="t('pages.promptLibrary.promptTextPlaceholder')"></textarea>
            </div>
            <div class="text-right mt-4">
              <button @click="addPrompt" class="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 font-semibold">
                {{ t('pages.promptLibrary.savePrompt') }}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.input-dark{background-color:rgba(25,27,33,.95);border:1px solid rgba(255,255,255,.08);color:white;border-radius:.75rem;padding:.6rem .9rem}
.input-dark:focus{outline:none;border-color:rgba(236,72,153,.4);box-shadow:0 0 0 2px rgba(236,72,153,.2)}
@property --angle{syntax:'<angle>';initial-value:0deg;inherits:false}
@keyframes rotate-gradient{to{--angle:360deg}}
.animate-rotate-gradient{background-size:200% 200%;animation:rotate-gradient 12s linear infinite}
</style>
