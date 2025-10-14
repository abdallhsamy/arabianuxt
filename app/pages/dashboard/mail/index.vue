<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, Send, Search, Paperclip, Star, Trash2, Archive, MailPlus } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

// --------------------
// Types
// --------------------
interface Mail {
  id: string
  from: string
  subject: string
  preview: string
  date: string
  starred: boolean
  read: boolean
  folder: 'inbox' | 'sent' | 'drafts' | 'trash'
  attachments?: boolean
  content: string
}

// --------------------
// Mock Mails
// --------------------
const mails = ref<Mail[]>([
  {
    id: '1',
    from: 'support@abdallahsamy.com',
    subject: 'Deployment complete!',
    preview: 'Your site has been successfully deployed...',
    date: '2025-10-10',
    starred: true,
    read: false,
    folder: 'inbox',
    attachments: false,
    content: '🎉 Congratulations, your deployment was successful.',
  },
  {
    id: '2',
    from: 'team@nuxt.com',
    subject: 'Nuxt 4 is now stable',
    preview: 'Discover the power of the new composables...',
    date: '2025-10-09',
    starred: false,
    read: true,
    folder: 'inbox',
    attachments: true,
    content: 'Nuxt 4 is stable and supports Tailwind v4 natively.',
  },
  {
    id: '3',
    from: 'abdallah@company.eg',
    subject: 'Meeting summary',
    preview: 'Here’s a quick summary of today’s discussion...',
    date: '2025-10-08',
    starred: false,
    read: true,
    folder: 'sent',
    attachments: false,
    content: 'Attached are the notes from the technical meeting.',
  },
])

// --------------------
// State
// --------------------
const selectedFolder = ref<'inbox' | 'sent' | 'drafts' | 'trash'>('inbox')
const selectedMail = ref<Mail | null>(null)
const search = ref('')
const showCompose = ref(false)

// --------------------
// Computed
// --------------------
const filteredMails = computed(() =>
    mails.value.filter(
        m =>
            m.folder === selectedFolder.value &&
            (m.from.toLowerCase().includes(search.value.toLowerCase()) ||
                m.subject.toLowerCase().includes(search.value.toLowerCase()))
    )
)

// --------------------
// Compose
// --------------------
const newMail = ref({ to: '', subject: '', body: '', attachments: [] as File[] })

const sendMail = () => {
  if (!newMail.value.to || !newMail.value.subject) return
  mails.value.push({
    id: crypto.randomUUID(),
    from: 'me@dashboard.sa',
    subject: newMail.value.subject,
    preview: newMail.value.body.slice(0, 80),
    date: new Date().toISOString().split('T')[0],
    starred: false,
    read: true,
    folder: 'sent',
    content: newMail.value.body,
  })
  showCompose.value = false
  newMail.value = { to: '', subject: '', body: '', attachments: [] }
}
</script>

<template>
  <div class="flex h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-white/10 p-4 flex flex-col">
      <button
          class="flex items-center gap-2 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg font-medium mb-4"
          @click="showCompose = true"
      >
        <MailPlus class="w-4 h-4" /> {{ t('pages.mail.compose') }}
      </button>

      <nav class="space-y-1">
        <button
            v-for="folder in ['inbox','sent','drafts','trash']"
            :key="folder"
            class="w-full text-start px-3 py-2 rounded-lg text-sm capitalize"
            :class="selectedFolder===folder ? 'bg-white/10 text-fuchsia-400' : 'hover:bg-white/5'"
            @click="selectedFolder = folder"
        >
          {{ t(`pages.mail.folders.${folder}`) }}
        </button>
      </nav>

      <div class="mt-auto text-xs text-gray-500 pt-6 border-t border-white/10">
        {{ t('pages.mail.storage', { used: '1.2 GB', total: '15 GB' }) }}
      </div>
    </aside>

    <!-- Mail List -->
    <section class="flex-1 flex flex-col">
      <header class="p-3 border-b border-white/10 flex items-center gap-2">
        <Search class="w-4 h-4 text-gray-400" />
        <input
            v-model="search"
            :placeholder="t('pages.mail.searchPlaceholder')"
            class="bg-transparent flex-1 outline-none text-gray-200 text-sm"
        />
      </header>

      <div class="flex-1 overflow-y-auto">
        <ul>
          <li
              v-for="m in filteredMails"
              :key="m.id"
              class="flex justify-between items-center px-4 py-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition"
              :class="m.read ? 'opacity-70' : 'font-semibold'"
              @click="selectedMail = m"
          >
            <div class="flex flex-col flex-1 pr-4">
              <div class="flex items-center justify-between">
                <span>{{ m.from }}</span>
                <span class="text-xs text-gray-500">{{ m.date }}</span>
              </div>
              <div class="text-sm">{{ m.subject }}</div>
              <div class="text-xs text-gray-400 truncate">{{ m.preview }}</div>
            </div>
            <div class="flex items-center gap-2">
              <Star
                  class="w-4 h-4 cursor-pointer"
                  :class="m.starred ? 'text-amber-400' : 'text-gray-500 hover:text-amber-300'"
                  @click.stop="m.starred = !m.starred"
              />
              <Paperclip v-if="m.attachments" class="w-4 h-4 text-gray-500" />
            </div>
          </li>
          <li v-if="!filteredMails.length" class="text-gray-500 text-sm text-center py-6">{{ t('pages.mail.noEmailsFound') }}</li>
        </ul>
      </div>
    </section>

    <!-- Mail Viewer -->
    <aside v-if="selectedMail" class="w-[480px] border-l border-white/10 bg-black/50 backdrop-blur-xl flex flex-col">
      <header class="flex items-center justify-between p-4 border-b border-white/10">
        <h3 class="font-semibold text-fuchsia-300 truncate">{{ selectedMail.subject }}</h3>
        <button class="hover:text-rose-400" @click="selectedMail = null">
          <X class="w-5 h-5" />
        </button>
      </header>

      <div class="p-4 flex-1 overflow-y-auto space-y-3">
        <div class="text-sm text-gray-400">{{ t('pages.mail.from') }} {{ selectedMail.from }}</div>
        <p class="whitespace-pre-wrap text-gray-100">{{ selectedMail.content }}</p>
      </div>

      <footer class="flex justify-end gap-2 p-3 border-t border-white/10">
        <button class="px-3 py-1.5 bg-white/10 rounded-md text-sm hover:bg-white/20">
          <Archive class="w-4 h-4 inline-block me-1" /> {{ t('pages.mail.archive') }}
        </button>
        <button class="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-md text-sm">
          <Trash2 class="w-4 h-4 inline-block me-1" /> {{ t('pages.mail.delete') }}
        </button>
      </footer>
    </aside>

    <!-- Compose Modal -->
    <transition name="fade">
      <div
          v-if="showCompose"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          @click.self="showCompose=false"
      >
        <div class="bg-black/80 rounded-xl border border-white/10 w-full max-w-lg p-6 space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-100">{{ t('pages.mail.newMessage') }}</h3>
            <button class="hover:text-rose-400" @click="showCompose=false"><X class="w-5 h-5" /></button>
          </div>

          <input
              v-model="newMail.to"
              type="text"
              :placeholder="t('pages.mail.to')"
              class="w-full bg-transparent border-b border-white/10 pb-1 text-gray-100 text-sm outline-none"
          />
          <input
              v-model="newMail.subject"
              type="text"
              :placeholder="t('pages.mail.subject')"
              class="w-full bg-transparent border-b border-white/10 pb-1 text-gray-100 text-sm outline-none"
          />
          <textarea
              v-model="newMail.body"
              :placeholder="t('pages.mail.writeMessage')"
              class="w-full bg-white/5 border border-white/10 rounded-md text-gray-100 text-sm p-2 h-48 resize-none"
          ></textarea>

          <div class="flex justify-between items-center">
            <label class="flex items-center gap-1 cursor-pointer text-sm text-fuchsia-400 hover:text-fuchsia-300">
              <Paperclip class="w-4 h-4" />
              {{ t('pages.mail.attach') }}
              <input type="file" multiple class="hidden" @change="newMail.attachments = Array.from(($event.target as HTMLInputElement).files || [])" />
            </label>
            <button
                class="flex items-center gap-1 bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                @click="sendMail"
            >
              <Send class="w-4 h-4" /> {{ t('pages.mail.send') }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
