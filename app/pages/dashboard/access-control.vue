<script setup lang="ts">
import { ref } from 'vue'
import GradientCard from '~/components/Ui/Common/GradientCard.vue'
import DataTable from '~/components/Ui/Common/DataTable.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

type Role = 'Owner'|'Admin'|'Member'
type ModuleKey = 'billing'|'integrations'|'analytics'|'security'|'team'

type PermRow = {
  module: ModuleKey
  Owner: boolean
  Admin: boolean
  Member: boolean
}

const headers = [
  { key: 'module', label: t('pages.accessControl.module') },
  { key: 'Owner', label: t('pages.accessControl.owner'), class: 'text-center' },
  { key: 'Admin', label: t('pages.accessControl.admin'), class: 'text-center' },
  { key: 'Member', label: t('pages.accessControl.member'), class: 'text-center' },
]

const rows = ref<PermRow[]>([
  { module: 'billing',      Owner: true, Admin: true,  Member: false },
  { module: 'integrations', Owner: true, Admin: true,  Member: false },
  { module: 'analytics',    Owner: true, Admin: true,  Member: true  },
  { module: 'security',     Owner: true, Admin: true,  Member: false },
  { module: 'team',         Owner: true, Admin: true,  Member: false },
])

const toggle = (row: PermRow, role: Role): void => {
  // Example: prevent removing Owner entirely for critical modules
  if (role === 'Owner' && row.module === 'security') return
  row[role] = !row[role]
}

const save = (): void => {
  // Send to API securely; here just demo
  alert(t('pages.accessControl.permissionsSaved'))
}
</script>

<template>
  <section class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
        {{ t('pages.accessControl.title') }}
      </h1>
      <button class="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 font-semibold" @click="save">
        {{ t('pages.accessControl.save') }}
      </button>
    </div>

    <GradientCard>
      <DataTable :headers="headers" :rows="rows" row-key="module">
        <template #cell:module="{ row }">
          <span class="capitalize text-white">{{ t(`pages.accessControl.modules.${row.module}`) }}</span>
        </template>

        <template #cell:Owner="{ row }">
          <div class="flex justify-center">
            <input type="checkbox" class="accent-fuchsia-400" :checked="row.Owner" @change="toggle(row,'Owner')" />
          </div>
        </template>

        <template #cell:Admin="{ row }">
          <div class="flex justify-center">
            <input type="checkbox" class="accent-indigo-400" :checked="row.Admin" @change="toggle(row,'Admin')" />
          </div>
        </template>

        <template #cell:Member="{ row }">
          <div class="flex justify-center">
            <input type="checkbox" class="accent-cyan-400" :checked="row.Member" @change="toggle(row,'Member')" />
          </div>
        </template>
      </DataTable>
    </GradientCard>
  </section>
</template>
