<script setup lang="ts">
import { ref } from 'vue'
import { UserPlus, Trash2, Shield, BadgeCheck } from 'lucide-vue-next'
import UiModal from '~/components/Ui/Common/UiModal.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

type Member = { id: string; name: string; email: string; role: 'Owner'|'Admin'|'Member' }
const members = ref<Member[]>([
  { id: 'u1', name: 'Abdallah Samy', email: 'abdallah@example.com', role: 'Owner' },
  { id: 'u2', name: 'Mariam Ali', email: 'mariam@example.com', role: 'Admin' },
  { id: 'u3', name: 'Omar Y.', email: 'omar@example.com', role: 'Member' },
])

const inviteOpen = ref(false)
const inviteName = ref('')
const inviteEmail = ref('')
const inviteRole = ref<Member['role']>('Member')

const invite = (): void => {
  if (!inviteName.value || !inviteEmail.value) return
  members.value.push({ id: crypto.randomUUID?.() ?? String(Date.now()), name: inviteName.value, email: inviteEmail.value, role: inviteRole.value })
  inviteOpen.value = false
  inviteName.value = ''
  inviteEmail.value = ''
  inviteRole.value = 'Member'
}

const removeMember = (id: string): void => {
  members.value = members.value.filter(m => m.id !== id)
}

const roleBadge = (r: Member['role']): string => ({
  Owner: 'bg-amber-400/15 text-amber-300 border-amber-300/30',
  Admin: 'bg-indigo-500/15 text-indigo-300 border-indigo-300/30',
  Member:'bg-cyan-400/15 text-cyan-300 border-cyan-300/30',
}[r])
</script>

<template>
  <section class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
        {{ t('pages.team.title') }}
      </h1>
      <button class="flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 transition-all" @click="inviteOpen = true">
        <UserPlus class="w-4 h-4" /> {{ t('pages.team.inviteMember') }}
      </button>
    </div>

    <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_60%,#EC4899_100%)] animate-rotate-gradient">
      <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="text-gray-400">
          <tr class="text-start">
            <th class="py-2">{{ t('pages.team.tableHeaders.name') }}</th>
            <th class="py-2">{{ t('pages.team.tableHeaders.email') }}</th>
            <th class="py-2">{{ t('pages.team.tableHeaders.role') }}</th>
            <th class="py-2 text-end">{{ t('pages.team.tableHeaders.actions') }}</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
          <tr v-for="m in members" :key="m.id" class="hover:bg-white/5 transition-colors">
            <td class="py-3 text-white flex items-center gap-2">
              <BadgeCheck v-if="m.role==='Owner'" class="w-4 h-4 text-amber-300" />
              {{ m.name }}
            </td>
            <td class="py-3 text-gray-300">{{ m.email }}</td>
            <td class="py-3">
              <span class="px-2 py-1 rounded-full text-xs border" :class="roleBadge(m.role)">{{ m.role }}</span>
            </td>
            <td class="py-3 text-end">
              <button class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-rose-300 flex items-center gap-1" @click="removeMember(m.id)">
                <Trash2 class="w-4 h-4" /> {{ t('pages.team.remove') }}
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Invite UiModal -->
    <UiModal v-model:open="inviteOpen" :title="t('pages.team.inviteNewMember')" :confirm-text="t('pages.team.sendInvite')" @confirm="invite">
      <div class="space-y-3">
        <input v-model="inviteName" class="input-dark w-full" :placeholder="t('pages.team.fullName')" />
        <input v-model="inviteEmail" class="input-dark w-full" :placeholder="t('pages.team.emailAddress')" />
        <select v-model="inviteRole" class="input-dark w-full">
          <option>{{ t('pages.team.roles.member') }}</option>
          <option>{{ t('pages.team.roles.admin') }}</option>
          <option>{{ t('pages.team.roles.owner') }}</option>
        </select>
      </div>
    </UiModal>
  </section>
</template>

<style scoped>
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes rotate-gradient { to { --angle: 360deg; } }
.animate-rotate-gradient { background-size: 200% 200%; animation: rotate-gradient 14s linear infinite; }
.input-dark { background-color: rgba(25,27,33,0.95); border: 1px solid rgba(255,255,255,0.08); color: var(--text-primary); border-radius: 0.75rem; padding: 0.75rem 1rem; transition: all .25s ease; }
.input-dark:focus { outline: none; border-color: rgba(236,72,153,0.4); box-shadow: 0 0 0 2px rgba(236,72,153,0.2); }
</style>
