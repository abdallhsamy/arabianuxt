<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// ✅ Lowlight v3 setup
import { createLowlight } from 'lowlight'
import javascript from 'highlight.js/lib/languages/javascript'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'

const lowlight = createLowlight()
lowlight.register({ javascript, html, css })

// ---------- Types ----------
type AiAction =
    | 'rewrite'
    | 'shorten'
    | 'expand'
    | 'tone'
    | 'summarize'
    | 'bullets'
    | 'fix-grammar'
    | 'translate'
    | 'title'
    | 'continue'

type Tone =
    | 'neutral'
    | 'professional'
    | 'friendly'
    | 'formal'
    | 'casual'
    | 'confident'
    | 'apologetic'

type Length = 'short' | 'medium' | 'long'
type Language = 'English' | 'Arabic' | 'French' | 'German' | 'Spanish'

export interface UiRichEditorProps {
  modelValue?: string
  placeholder?: string
  editable?: boolean
  autofocus?: boolean
  aiHandler?: (req: {
    action: AiAction
    text: string
    tone?: Tone
    length?: Length
    language?: Language
  }) => Promise<string>
}

const props = withDefaults(defineProps<UiRichEditorProps>(), {
  modelValue: '',
  placeholder: 'Type “/” for commands or use ✨ AI',
  editable: true,
  autofocus: false,
})

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

// ---------- Editor ----------
const editor = ref<Editor | null>(null)

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Typography,
      Placeholder.configure({ placeholder: props.placeholder }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: props.modelValue,
    editable: props.editable,
    autofocus: props.autofocus,
    onUpdate: ({ editor }) => emit('update:modelValue', editor.getHTML()),
    onTransaction: ({ editor }) => detectSlash(editor as any),
  })
})
onBeforeUnmount(() => editor.value?.destroy())

// ---------- Helpers ----------
const isActive = (name: string) => !!editor.value?.isActive(name)
const runCmd = (fn: () => void) => fn()

// ---------- Slash Menu ----------
interface CommandItem {
  label: string
  description: string
  action: (e: Editor) => void
}

const showSlash = ref(false)
const slashPos = ref({ x: 0, y: 0 })
const slashQuery = ref('')
const slashList = ref<CommandItem[]>([])

const baseCommands: CommandItem[] = [
  { label: t('components.richEditor.commands.heading1.label'), description: t('components.richEditor.commands.heading1.description'), action: e => e.chain().focus().toggleHeading({ level: 1 }).run() },
  { label: t('components.richEditor.commands.heading2.label'), description: t('components.richEditor.commands.heading2.description'), action: e => e.chain().focus().toggleHeading({ level: 2 }).run() },
  { label: t('components.richEditor.commands.paragraph.label'), description: t('components.richEditor.commands.paragraph.description'), action: e => e.chain().focus().setParagraph().run() },
  { label: t('components.richEditor.commands.bulletList.label'), description: t('components.richEditor.commands.bulletList.description'), action: e => e.chain().focus().toggleBulletList().run() },
  { label: t('components.richEditor.commands.numberedList.label'), description: t('components.richEditor.commands.numberedList.description'), action: e => e.chain().focus().toggleOrderedList().run() },
  { label: t('components.richEditor.commands.quote.label'), description: t('components.richEditor.commands.quote.description'), action: e => e.chain().focus().toggleBlockquote().run() },
  { label: t('components.richEditor.commands.codeBlock.label'), description: t('components.richEditor.commands.codeBlock.description'), action: e => e.chain().focus().toggleCodeBlock().run() },
  { label: t('components.richEditor.commands.divider.label'), description: t('components.richEditor.commands.divider.description'), action: e => e.chain().focus().setHorizontalRule().run() },

  // AI shortcuts
  { label: t('components.richEditor.commands.aiRewrite.label'), description: t('components.richEditor.commands.aiRewrite.description'), action: e => openAiPanel('rewrite', e) },
  { label: t('components.richEditor.commands.aiSummarize.label'), description: t('components.richEditor.commands.aiSummarize.description'), action: e => openAiPanel('summarize', e) },
  { label: t('components.richEditor.commands.aiTranslate.label'), description: t('components.richEditor.commands.aiTranslate.description'), action: e => openAiPanel('translate', e) },
  { label: t('components.richEditor.commands.aiExpand.label'), description: t('components.richEditor.commands.aiExpand.description'), action: e => openAiPanel('expand', e) },
  { label: t('components.richEditor.commands.aiTone.label'), description: t('components.richEditor.commands.aiTone.description'), action: e => openAiPanel('tone', e) },
  { label: t('components.richEditor.commands.aiFixGrammar.label'), description: t('components.richEditor.commands.aiFixGrammar.description'), action: e => openAiPanel('fix-grammar', e) },
]

const detectSlash = (e: Editor) => {
  const { $from } = e.state.selection
  const text = $from.parent.textBetween(0, $from.parentOffset, undefined, '\ufffc')
  const match = text.match(/\/([\w-]*)$/)
  if (match) {
    showSlash.value = true
    slashQuery.value = match[1] ?? ''
    const q = slashQuery.value.toLowerCase()
    slashList.value = baseCommands.filter(c => c.label.toLowerCase().includes(q))
    nextTick(() => {
      const el = document.querySelector('.ProseMirror .is-editor') as HTMLElement
      if (el) {
        const rect = el.getBoundingClientRect()
        slashPos.value = { x: rect.left + 40, y: rect.top + window.scrollY + 24 }
      }
    })
  } else showSlash.value = false
}

const pickSlash = (cmd: CommandItem) => {
  if (!editor.value) return
  const from = editor.value.state.selection.from
  const del = slashQuery.value.length + 1
  editor.value.chain().focus().deleteRange({ from: from - del, to: from }).run()
  cmd.action(editor.value as any)
  showSlash.value = false
}

// ---------- AI Panel ----------
const aiOpen = ref(false)
const aiLoading = ref(false)
const aiAction = ref<AiAction>('rewrite')
const aiTone = ref<Tone>('neutral')
const aiLength = ref<Length>('medium')
const aiLanguage = ref<Language>('English')
const aiResult = ref('')

const openAiPanel = (action: AiAction, e?: Editor) => {
  aiAction.value = action
  aiOpen.value = true
  aiResult.value = ''
  nextTick(() => {
    const el = document.querySelector('.ProseMirror .is-editor') as HTMLElement | null
    if (el) {
      const rect = el.getBoundingClientRect()
      aiPopupPos.value = { x: rect.right - 340, y: rect.top + window.scrollY + 20 }
    }
  })
}

const aiPopupPos = ref({ x: 0, y: 0 })

const getSelection = () => {
  const e = editor.value!
  const { from, to } = e.state.selection
  const text = e.state.doc.textBetween(from, to, '\n')
  return { text, from, to }
}

const runAi = async () => {
  if (!editor.value) return
  const sel = getSelection()
  const base = sel.text.trim() || editor.value.state.doc.textBetween(0, editor.value.state.doc.content.size, '\n').slice(0, 2000)
  aiLoading.value = true
  try {
    const handler = props.aiHandler ?? mockAiHandler
    aiResult.value = await handler({
      action: aiAction.value,
      text: base,
      tone: aiTone.value,
      length: aiLength.value,
      language: aiLanguage.value,
    })
  } catch {
    aiResult.value = '⚠️ AI request failed.'
  } finally {
    aiLoading.value = false
  }
}

const applyReplace = () => {
  if (!editor.value || !aiResult.value) return
  const { from, to } = editor.value.state.selection
  editor.value.chain().focus().deleteRange({ from, to }).insertContent(aiResult.value).run()
  aiOpen.value = false
}

const applyInsertBelow = () => {
  if (!editor.value || !aiResult.value) return
  editor.value.chain().focus().insertContent(`<p></p><blockquote>${escapeHtml(aiResult.value)}</blockquote><p></p>`).run()
  aiOpen.value = false
}

const copyToClipboard = async () => {
  if (!aiResult.value) return
  await navigator.clipboard.writeText(aiResult.value)
}

const mockAiHandler = async (req: {
  action: AiAction
  text: string
  tone?: Tone
  length?: Length
  language?: Language
}) => {
  await new Promise(r => setTimeout(r, 600))
  return `[${req.action}] ${req.text}`
}

const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
</script>

<template>
  <div class="relative w-full rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl text-gray-100 overflow-hidden">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center gap-2 p-2 border-b border-white/10 bg-white/5">
      <button
          v-for="btn in [
          { name: 'bold', icon: 'B', cmd: () => editor?.chain().focus().toggleBold().run() },
          { name: 'italic', icon: 'I', cmd: () => editor?.chain().focus().toggleItalic().run() },
          { name: 'underline', icon: 'U', cmd: () => editor?.chain().focus().toggleUnderline().run() },
          { name: 'strike', icon: 'S', cmd: () => editor?.chain().focus().toggleStrike().run() },
          { name: 'bulletList', icon: '•', cmd: () => editor?.chain().focus().toggleBulletList().run() },
          { name: 'orderedList', icon: '1.', cmd: () => editor?.chain().focus().toggleOrderedList().run() },
          { name: 'blockquote', icon: '❝', cmd: () => editor?.chain().focus().toggleBlockquote().run() },
          { name: 'codeBlock', icon: '</>', cmd: () => editor?.chain().focus().toggleCodeBlock().run() },
          { name: 'undo', icon: '↺', cmd: () => editor?.chain().focus().undo().run() },
          { name: 'redo', icon: '↻', cmd: () => editor?.chain().focus().redo().run() },
        ]"
          :key="btn.name"
          @click="runCmd(btn.cmd)"
          class="px-2 py-1 rounded text-sm font-medium transition"
          :class="isActive(btn.name) ? 'bg-fuchsia-600/30 text-fuchsia-300' : 'hover:bg-white/10 text-gray-300'"
      >
        {{ btn.icon }}
      </button>

      <div class="ml-auto" />
      <button
          class="px-3 py-1.5 rounded-md text-sm font-medium bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white hover:opacity-95"
          @click="openAiPanel('rewrite')"
      >
        ✨ AI
      </button>
    </div>

    <!-- Editor -->
    <EditorContent v-if="editor" :editor="editor as any" class="prose prose-invert is-editor max-w-none min-h-[320px] px-4 py-3 text-sm focus:outline-none" />

    <!-- Slash menu -->
    <transition name="fade">
      <div
          v-if="showSlash"
          class="absolute z-50 w-72 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl"
          :style="{ top: slashPos.y + 'px', left: slashPos.x + 'px' }"
      >
        <ul class="divide-y divide-white/10 max-h-64 overflow-auto">
          <li
              v-for="c in slashList"
              :key="c.label"
              class="px-3 py-2 text-sm hover:bg-white/10 cursor-pointer transition"
              @click="pickSlash(c)"
          >
            <div class="font-medium text-gray-100">{{ c.label }}</div>
            <div class="text-xs text-gray-500">{{ c.description }}</div>
          </li>
        </ul>
      </div>
    </transition>

    <!-- AI Panel -->
    <transition name="fade">
      <div
          v-if="aiOpen"
          class="absolute z-50 w-[320px] rounded-xl border border-white/10 bg-black/85 backdrop-blur-xl shadow-2xl p-3 space-y-3"
          :style="{ top: aiPopupPos.y + 'px', left: aiPopupPos.x + 'px' }"
      >
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-semibold text-gray-100">AI Assistant</h4>
          <button class="text-gray-400 hover:text-rose-400" @click="aiOpen = false">✕</button>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <select v-model="aiAction" class="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-gray-100">
            <option value="rewrite">Rewrite</option>
            <option value="summarize">Summarize</option>
            <option value="bullets">Bullets</option>
            <option value="shorten">Shorten</option>
            <option value="expand">Expand</option>
            <option value="fix-grammar">Fix Grammar</option>
            <option value="tone">Tone</option>
            <option value="translate">Translate</option>
            <option value="title">Title</option>
            <option value="continue">Continue</option>
          </select>

          <select
              v-if="aiAction === 'tone'"
              v-model="aiTone"
              class="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-gray-100"
          >
            <option>neutral</option>
            <option>professional</option>
            <option>friendly</option>
            <option>formal</option>
            <option>casual</option>
            <option>confident</option>
            <option>apologetic</option>
          </select>

          <select
              v-if="['shorten', 'expand', 'rewrite'].includes(aiAction)"
              v-model="aiLength"
              class="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-gray-100"
          >
            <option>short</option>
            <option>medium</option>
            <option>long</option>
          </select>

          <select
              v-if="aiAction === 'translate'"
              v-model="aiLanguage"
              class="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-gray-100"
          >
            <option>English</option>
            <option>Arabic</option>
            <option>French</option>
            <option>German</option>
            <option>Spanish</option>
          </select>
        </div>

        <div class="flex gap-2">
          <button
              class="flex-1 px-3 py-1.5 rounded-md text-sm bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white"
              :disabled="aiLoading"
              @click="runAi"
          >
            {{ aiLoading ? 'Thinking…' : 'Run' }}
          </button>
          <button class="px-3 py-1.5 rounded-md text-sm bg-white/10 text-gray-100" @click="aiOpen = false">
            Close
          </button>
        </div>

        <div class="text-xs text-gray-400">Result</div>
        <div class="rounded-lg border border-white/10 bg-white/5 p-2 text-sm min-h-[72px] whitespace-pre-wrap">
          {{ aiResult || (aiLoading ? '' : 'No result yet.') }}
        </div>

        <div class="flex items-center gap-2">
          <button
              class="flex-1 px-3 py-1.5 rounded-md text-sm bg-emerald-600 text-white"
              :disabled="!aiResult"
              @click="applyReplace"
          >
            Replace
          </button>
          <button
              class="px-3 py-1.5 rounded-md text-sm bg-white/10 text-gray-100"
              :disabled="!aiResult"
              @click="applyInsertBelow"
          >
            Insert
          </button>
          <button
              class="px-3 py-1.5 rounded-md text-sm bg-white/10 text-gray-100"
              :disabled="!aiResult"
              @click="copyToClipboard"
          >
            Copy
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.prose p { margin: 0 0 0.5rem; }
.prose pre { background: rgba(255,255,255,.05); border-radius: .5rem; padding: .5rem .75rem; overflow-x: auto; }
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
