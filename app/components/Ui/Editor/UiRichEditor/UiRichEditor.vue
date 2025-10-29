<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { useI18n } from "vue-i18n";
import type {
  UiRichEditorProps,
  UiRichEditorEmits,
  CommandItem,
  UiRichEditorAiAction,
  UiRichEditorTone,
  UiRichEditorLength,
  UiRichEditorLanguage,
} from "./UiRichEditor.type";
import {
  UiRichEditorDefaultValues,
  UiRichEditorSlashPosition,
  UiRichEditorAiPanelPosition,
  UiRichEditorMaxTextLength,
  UiRichEditorAiDelay,
  UiRichEditorToolbarButtons,
} from "./UiRichEditor.type";

const { t } = useI18n();

// ✅ Lowlight v3 setup
import { createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";

const lowlight = createLowlight();
lowlight.register({ javascript, html, css });

const props = withDefaults(defineProps<UiRichEditorProps>(), {
  modelValue: UiRichEditorDefaultValues.ModelValue,
  placeholder: UiRichEditorDefaultValues.Placeholder,
  editable: UiRichEditorDefaultValues.Editable,
  autofocus: UiRichEditorDefaultValues.Autofocus,
});

const emit = defineEmits<UiRichEditorEmits>();

// ---------- Editor ----------
const editor = ref<Editor | null>(null);

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
    onUpdate: ({ editor }) => emit("update:modelValue", editor.getHTML()),
    onTransaction: ({ editor }) => detectSlash(editor as Editor),
  });
});
onBeforeUnmount(() => editor.value?.destroy());

// ---------- Helpers ----------
const isActive = (name: string) => !!editor.value?.isActive(name);
const runCmd = (fn: () => void) => fn();

// ---------- Slash Menu ----------
const showSlash = ref(false);
const slashPos = ref({ x: 0, y: 0 });
const slashQuery = ref("");
const slashList = ref<CommandItem[]>([]);

const baseCommands: CommandItem[] = [
  {
    label: t("components.richEditor.commands.heading1.label"),
    description: t("components.richEditor.commands.heading1.description"),
    action: e => e.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    label: t("components.richEditor.commands.heading2.label"),
    description: t("components.richEditor.commands.heading2.description"),
    action: e => e.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    label: t("components.richEditor.commands.paragraph.label"),
    description: t("components.richEditor.commands.paragraph.description"),
    action: e => e.chain().focus().setParagraph().run(),
  },
  {
    label: t("components.richEditor.commands.bulletList.label"),
    description: t("components.richEditor.commands.bulletList.description"),
    action: e => e.chain().focus().toggleBulletList().run(),
  },
  {
    label: t("components.richEditor.commands.numberedList.label"),
    description: t("components.richEditor.commands.numberedList.description"),
    action: e => e.chain().focus().toggleOrderedList().run(),
  },
  {
    label: t("components.richEditor.commands.quote.label"),
    description: t("components.richEditor.commands.quote.description"),
    action: e => e.chain().focus().toggleBlockquote().run(),
  },
  {
    label: t("components.richEditor.commands.codeBlock.label"),
    description: t("components.richEditor.commands.codeBlock.description"),
    action: e => e.chain().focus().toggleCodeBlock().run(),
  },
  {
    label: t("components.richEditor.commands.divider.label"),
    description: t("components.richEditor.commands.divider.description"),
    action: e => e.chain().focus().setHorizontalRule().run(),
  },

  // AI shortcuts
  {
    label: t("components.richEditor.commands.aiRewrite.label"),
    description: t("components.richEditor.commands.aiRewrite.description"),
    action: e => openAiPanel("rewrite", e),
  },
  {
    label: t("components.richEditor.commands.aiSummarize.label"),
    description: t("components.richEditor.commands.aiSummarize.description"),
    action: e => openAiPanel("summarize", e),
  },
  {
    label: t("components.richEditor.commands.aiTranslate.label"),
    description: t("components.richEditor.commands.aiTranslate.description"),
    action: e => openAiPanel("translate", e),
  },
  {
    label: t("components.richEditor.commands.aiExpand.label"),
    description: t("components.richEditor.commands.aiExpand.description"),
    action: e => openAiPanel("expand", e),
  },
  {
    label: t("components.richEditor.commands.aiTone.label"),
    description: t("components.richEditor.commands.aiTone.description"),
    action: e => openAiPanel("tone", e),
  },
  {
    label: t("components.richEditor.commands.aiFixGrammar.label"),
    description: t("components.richEditor.commands.aiFixGrammar.description"),
    action: e => openAiPanel("fix-grammar", e),
  },
];

const detectSlash = (e: Editor) => {
  const { $from } = e.state.selection;
  const text = $from.parent.textBetween(
    0,
    $from.parentOffset,
    undefined,
    "\ufffc"
  );
  const match = text.match(/\/([\w-]*)$/);
  if (match) {
    showSlash.value = true;
    slashQuery.value = match[1] ?? "";
    const q = slashQuery.value.toLowerCase();
    slashList.value = baseCommands.filter(c =>
      c.label.toLowerCase().includes(q)
    );
    nextTick(() => {
      const el = document.querySelector(
        ".ProseMirror .is-editor"
      ) as HTMLElement;
      if (el) {
        const rect = el.getBoundingClientRect();
        slashPos.value = {
          x: rect.left + UiRichEditorSlashPosition.X,
          y: rect.top + window.scrollY + UiRichEditorSlashPosition.Y,
        };
      }
    });
  } else showSlash.value = false;
};

const pickSlash = (cmd: CommandItem) => {
  if (!editor.value) return;
  const from = editor.value.state.selection.from;
  const del = slashQuery.value.length + 1;
  editor.value
    .chain()
    .focus()
    .deleteRange({ from: from - del, to: from })
    .run();
  cmd.action(editor.value);
  showSlash.value = false;
};

// ---------- AI Panel ----------
const aiOpen = ref(false);
const aiLoading = ref(false);
const aiAction = ref<UiRichEditorAiAction>("rewrite");
const aiTone = ref<UiRichEditorTone>("neutral");
const aiLength = ref<UiRichEditorLength>("medium");
const aiLanguage = ref<UiRichEditorLanguage>("English");
const aiResult = ref("");

const openAiPanel = (action: UiRichEditorAiAction, _e?: Editor) => {
  aiAction.value = action;
  aiOpen.value = true;
  aiResult.value = "";
  nextTick(() => {
    const el = document.querySelector(
      ".ProseMirror .is-editor"
    ) as HTMLElement | null;
    if (el) {
      const rect = el.getBoundingClientRect();
      aiPopupPos.value = {
        x: rect.right - UiRichEditorAiPanelPosition.X,
        y: rect.top + window.scrollY + UiRichEditorAiPanelPosition.Y,
      };
    }
  });
};

const aiPopupPos = ref({ x: 0, y: 0 });

const getSelection = () => {
  if (!editor.value) {
    return { text: "", from: 0, to: 0 };
  }
  const e = editor.value;
  const { from, to } = e.state.selection;
  const text = e.state.doc.textBetween(from, to, "\n");
  return { text, from, to };
};

const runAi = async () => {
  if (!editor.value) return;
  const sel = getSelection();
  const base =
    sel.text.trim() ||
    editor.value.state.doc
      .textBetween(0, editor.value.state.doc.content.size, "\n")
      .slice(0, UiRichEditorMaxTextLength);
  aiLoading.value = true;
  try {
    const handler = props.aiHandler ?? mockAiHandler;
    aiResult.value = await handler({
      action: aiAction.value,
      text: base,
      tone: aiTone.value,
      length: aiLength.value,
      language: aiLanguage.value,
    });
  } catch {
    aiResult.value = "⚠️ AI request failed.";
  } finally {
    aiLoading.value = false;
  }
};

const applyReplace = () => {
  if (!editor.value || !aiResult.value) return;
  const { from, to } = editor.value.state.selection;
  editor.value
    .chain()
    .focus()
    .deleteRange({ from, to })
    .insertContent(aiResult.value)
    .run();
  aiOpen.value = false;
};

const applyInsertBelow = () => {
  if (!editor.value || !aiResult.value) return;
  editor.value
    .chain()
    .focus()
    .insertContent(
      `<p></p><blockquote>${escapeHtml(aiResult.value)}</blockquote><p></p>`
    )
    .run();
  aiOpen.value = false;
};

const copyToClipboard = async () => {
  if (!aiResult.value) return;
  await navigator.clipboard.writeText(aiResult.value);
};

const mockAiHandler = async (req: {
  action: UiRichEditorAiAction;
  text: string;
  tone?: UiRichEditorTone;
  length?: UiRichEditorLength;
  language?: UiRichEditorLanguage;
}) => {
  await new Promise(r => setTimeout(r, UiRichEditorAiDelay));
  return `[${req.action}] ${req.text}`;
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
</script>

<template>
  <div
    class="relative w-full rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl text-gray-100 overflow-hidden"
  >
    <!-- Toolbar -->
    <div
      class="flex flex-wrap items-center gap-2 p-2 border-b border-white/10 bg-white/5"
    >
      <button
        v-for="btn in UiRichEditorToolbarButtons.map(b => ({
          name: b.name,
          icon: b.icon,
          cmd: () => {
            switch (b.name) {
              case 'bold':
                return editor?.chain().focus().toggleBold().run();
              case 'italic':
                return editor?.chain().focus().toggleItalic().run();
              case 'underline':
                return editor?.chain().focus().toggleUnderline().run();
              case 'strike':
                return editor?.chain().focus().toggleStrike().run();
              case 'bulletList':
                return editor?.chain().focus().toggleBulletList().run();
              case 'orderedList':
                return editor?.chain().focus().toggleOrderedList().run();
              case 'blockquote':
                return editor?.chain().focus().toggleBlockquote().run();
              case 'codeBlock':
                return editor?.chain().focus().toggleCodeBlock().run();
              case 'undo':
                return editor?.chain().focus().undo().run();
              case 'redo':
                return editor?.chain().focus().redo().run();
              default:
                return;
            }
          },
        }))"
        :key="btn.name"
        @click="runCmd(btn.cmd)"
        class="px-2 py-1 rounded text-sm font-medium transition"
        :class="
          isActive(btn.name)
            ? 'bg-fuchsia-600/30 text-fuchsia-300'
            : 'hover:bg-white/10 text-gray-300'
        "
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
    <EditorContent
      v-if="editor"
      :editor="editor as any"
      class="prose prose-invert is-editor max-w-none min-h-[320px] px-4 py-3 text-sm focus:outline-none"
    />

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
          <button
            class="text-gray-400 hover:text-rose-400"
            @click="aiOpen = false"
          >
            ✕
          </button>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <select
            v-model="aiAction"
            class="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-gray-100"
          >
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
            {{ aiLoading ? "Thinking…" : "Run" }}
          </button>
          <button
            class="px-3 py-1.5 rounded-md text-sm bg-white/10 text-gray-100"
            @click="aiOpen = false"
          >
            Close
          </button>
        </div>

        <div class="text-xs text-gray-400">Result</div>
        <div
          class="rounded-lg border border-white/10 bg-white/5 p-2 text-sm min-h-[72px] whitespace-pre-wrap"
        >
          {{ aiResult || (aiLoading ? "" : "No result yet.") }}
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
.prose p {
  margin: 0 0 0.5rem;
}

.prose pre {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  overflow-x: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
