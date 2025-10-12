<script setup lang="ts">
import { ref } from 'vue'
import UiChatDock from '~/components/Ui/AI/UiChatDock.vue'
import UiCommandPalette from '~/components/Ui/AI/UiCommandPalette.vue'
import UiPromptBuilder from '~/components/Ui/AI/UiPromptBuilder.vue'
import UiCodeBlock from '~/components/Ui/AI/UiCodeBlock.vue'
import UiMarkdownViewer from '~/components/Ui/AI/UiMarkdownViewer.vue'

const { t } = useI18n()

const markdown = ref(`# Welcome
This **Markdown viewer** supports *bold*, \`inline code\`, and lists:

- ✅ Works offline
- 🎨 Styled with Tailwind v4
- 🪟 Glassy background
`)

const commands = [
  { id: '1', label: t('pages.componentAiTools.commands.openSettings'), action: () => alert(t('pages.componentAiTools.alerts.settingsOpened')) },
  { id: '2', label: t('pages.componentAiTools.commands.newChat'), action: () => alert(t('pages.componentAiTools.alerts.newChatStarted')) },
  { id: '3', label: t('pages.componentAiTools.commands.toggleTheme'), action: () => document.documentElement.classList.toggle('dark') },
]
</script>

<template>
  <section class="p-8 space-y-10 text-gray-100">
    <UiPromptBuilder />

    <UiMarkdownViewer :content="markdown" />

    <UiCodeBlock lang="typescript" :code="`const greet = (name: string) => console.log('Hello', name)`" />

    <UiCommandPalette :commands="commands" />

    <UiChatDock />
  </section>
</template>
