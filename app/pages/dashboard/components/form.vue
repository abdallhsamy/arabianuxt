<script setup lang="ts">
import { reactive } from 'vue'

import UiFormField from '~/components/Ui/Form/UiFormField.vue'
import UiInput from '~/components/Ui/Form/UiInput.vue'
import UiTextarea from '~/components/Ui/Form/UiTextarea.vue'
import UiSelect from '~/components/Ui/Form/UiSelect.vue'
import UiSelectMulti from '~/components/Ui/Form/UiSelectMulti.vue'
import UiCheckbox from '~/components/Ui/Form/UiCheckbox.vue'
import UiRadio from '~/components/Ui/Form/UiRadio.vue'
import UiSwitch from '~/components/Ui/Form/UiSwitch.vue'
import UiDatePicker from '~/components/Ui/Form/UiDatePicker.vue'
import UiSlider from '~/components/Ui/Form/UiSlider.vue'

const form = reactive({
  name: '',
  bio: '',
  country: '',
  tags: [] as string[],
  agree: false,
  plan: '',
  enabled: false,
  date: null as Date | null,
  slider: 50,
})

const countries = [
  { label: 'Saudi Arabia', value: 'sa' },
  { label: 'UAE', value: 'ae' },
  { label: 'Kuwait', value: 'kw' },
]

const tagsOpt = [
  { label: 'Vue', value: 'vue' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Tailwind', value: 'tailwind' },
]

const plans = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
]
</script>

<template>
  <section class="space-y-8 p-8">
    <h1 class="text-2xl font-bold text-gray-100 mb-4">🧩 Form Playground</h1>

    <!-- Name -->
    <UiFormField label="Name">
      <UiInput v-model="form.name" label="Name" placeholder="Enter your name" />
    </UiFormField>

    <!-- Bio -->
    <UiFormField label="Bio">
      <UiTextarea v-model="form.bio" label="Bio" placeholder="Write your bio" />
    </UiFormField>

    <!-- Country -->
    <UiFormField label="Country">
      <UiSelect
          v-model="form.country"
          :options="countries"
          label="Country"
          placeholder="Choose country"
      />
    </UiFormField>

    <!-- Tags -->
    <UiFormField label="Tags">
      <UiSelectMulti
          v-model="form.tags"
          :options="tagsOpt"
          label="Tags"
          placeholder="Pick tags"
      />
    </UiFormField>

    <!-- Checkbox -->
    <UiFormField>
      <UiCheckbox v-model="form.agree" label="I agree to terms" />
    </UiFormField>

    <!-- Radios -->
    <UiFormField label="Select Plan">
      <div class="flex gap-4 flex-wrap">
        <UiRadio v-model="form.plan" value="free" label="Free" name="plan" />
        <UiRadio v-model="form.plan" value="pro" label="Pro" name="plan" />
        <UiRadio v-model="form.plan" value="enterprise" label="Enterprise" name="plan" />
      </div>
    </UiFormField>

    <!-- Switch -->
    <UiFormField label="Feature Toggle">
      <UiSwitch v-model="form.enabled" label="Enable feature" />
    </UiFormField>

    <!-- Date Picker -->
    <UiFormField label="Date">
      <UiDatePicker v-model="form.date" placeholder="Pick a date (Hijri / Gregorian)" />
    </UiFormField>

    <!-- Slider -->
    <UiFormField label="Slider">
      <UiSlider v-model="form.slider" :min="0" :max="100" :step="5" />
    </UiFormField>

    <!-- Debug Preview -->
    <pre class="bg-gray-900 text-gray-300 p-4 rounded-xl border border-white/10 overflow-x-auto text-sm">
{{ Object.fromEntries(Object.entries(form).map(([k,v]) => [k, v])) }}
    </pre>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
section {
  @apply max-w-3xl mx-auto;
}
</style>
