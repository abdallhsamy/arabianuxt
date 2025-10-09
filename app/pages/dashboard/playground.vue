<script setup lang="ts">
import UiPlayground from '~/components/Ui/Playground/UiPlayground.vue'
import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";
import {
  alertSchema,
  badgeSchema,
  buttonSchema,
  cardSchema,
  modalSchema,
  selectSchema,
  switchSchema,
  tabsSchema,
} from "~/playgrounds/schema";

const schemas: PlaygroundSchema[] = [
  alertSchema,
  badgeSchema,
  buttonSchema,
  cardSchema,
  modalSchema,
  selectSchema,
  switchSchema,
  tabsSchema,
]
</script>

<template>
  <section class="space-y-10">
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
      Component Playground
    </h1>
    <p class="text-gray-400 text-sm max-w-2xl">
      This page automatically generates a playground for any UI component using a JSON schema.
    </p>
    <div  v-for="schema in schemas" key="`schema-${schema.name}`" class="space-y-4">
      <h3 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
        {{ schema.title }}
      </h3>
      <UiPlayground :schema="schema" />
    </div>
  </section>
</template>
