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

const { t } = useI18n()

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
  { label: t('pages.componentForm.countries.saudiArabia'), value: 'sa' },
  { label: t('pages.componentForm.countries.uae'), value: 'ae' },
  { label: t('pages.componentForm.countries.kuwait'), value: 'kw' },
]

const tagsOpt = [
  { label: t('pages.componentForm.tags.vue'), value: 'vue' },
  { label: t('pages.componentForm.tags.nuxt'), value: 'nuxt' },
  { label: t('pages.componentForm.tags.tailwind'), value: 'tailwind' },
]

const plans = [
  { label: t('pages.componentForm.plans.free'), value: 'free' },
  { label: t('pages.componentForm.plans.pro'), value: 'pro' },
  { label: t('pages.componentForm.plans.enterprise'), value: 'enterprise' },
]
</script>

<template>
  <section class="space-y-8 p-8">
    <h1 class="text-2xl font-bold text-gray-100 mb-4">{{ t('pages.componentForm.title') }}</h1>

    <!-- Name -->
    <UiFormField :label="t('pages.componentForm.labels.name')">
      <UiInput v-model="form.name" :label="t('pages.componentForm.labels.name')" :placeholder="t('pages.componentForm.placeholders.enterName')" />
    </UiFormField>

    <!-- Bio -->
    <UiFormField :label="t('pages.componentForm.labels.bio')">
      <UiTextarea v-model="form.bio" :label="t('pages.componentForm.labels.bio')" :placeholder="t('pages.componentForm.placeholders.writeBio')" />
    </UiFormField>

    <!-- Country -->
    <UiFormField :label="t('pages.componentForm.labels.country')">
      <UiSelect
          v-model="form.country"
          :options="countries"
          :label="t('pages.componentForm.labels.country')"
          :placeholder="t('pages.componentForm.placeholders.chooseCountry')"
      />
    </UiFormField>

    <!-- Tags -->
    <UiFormField :label="t('pages.componentForm.labels.tags')">
      <UiSelectMulti
          v-model="form.tags"
          :options="tagsOpt"
          :label="t('pages.componentForm.labels.tags')"
          :placeholder="t('pages.componentForm.placeholders.pickTags')"
      />
    </UiFormField>

    <!-- Checkbox -->
    <UiFormField>
      <UiCheckbox v-model="form.agree" :label="t('pages.componentForm.labels.agreeToTerms')" />
    </UiFormField>

    <!-- Radios -->
    <UiFormField :label="t('pages.componentForm.labels.selectPlan')">
      <div class="flex gap-4 flex-wrap">
        <UiRadio v-model="form.plan" value="free" :label="t('pages.componentForm.plans.free')" name="plan" />
        <UiRadio v-model="form.plan" value="pro" :label="t('pages.componentForm.plans.pro')" name="plan" />
        <UiRadio v-model="form.plan" value="enterprise" :label="t('pages.componentForm.plans.enterprise')" name="plan" />
      </div>
    </UiFormField>

    <!-- Switch -->
    <UiFormField :label="t('pages.componentForm.labels.featureToggle')">
      <UiSwitch v-model="form.enabled" :label="t('pages.componentForm.labels.enableFeature')" />
    </UiFormField>

    <!-- Date Picker -->
    <UiFormField :label="t('pages.componentForm.labels.date')">
      <UiDatePicker v-model="form.date" :placeholder="t('pages.componentForm.placeholders.pickDate')" />
    </UiFormField>

    <!-- Slider -->
    <UiFormField :label="t('pages.componentForm.labels.slider')">
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
