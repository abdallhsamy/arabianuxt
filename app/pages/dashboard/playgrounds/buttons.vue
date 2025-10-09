<script setup lang="ts">
import UiPlayground from '~/components/Ui/Playground/UiPlayground.vue'

const schema = {
  component: 'Ui/Common/UiButton.vue',
  title: 'Button',
  props: [
    { key: 'label', type: 'string', default: 'Click Me' },
    { key: 'variant', type: 'enum', options: ['primary', 'secondary', 'success', 'danger', 'outline', 'glass'], default: 'primary' },
    { key: 'size', type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
    { key: 'loading', type: 'boolean' },
    { key: 'disabled', type: 'boolean' },
    { key: 'iconOnly', type: 'boolean' },
    { key: 'toggleable', type: 'boolean' },
    { key: 'full', type: 'boolean' }
  ]
}
</script>

<template>
  <section class="space-y-10">
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
      Component Playground
    </h1>
    <p class="text-gray-400 text-sm max-w-2xl">
      This page automatically generates a playground for any UI component using a JSON schema.
    </p>
    <UiPlayground :schema="schema" />
  </section>
</template>
