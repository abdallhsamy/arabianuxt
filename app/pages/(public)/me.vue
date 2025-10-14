<script setup lang="ts">
import { Github, Linkedin } from "lucide-vue-next";

definePageMeta({ layout: "empty" });

const profile = {
  name: "Abdallah Samy",
  title: "Technical Consultant & Software Engineer",
  bio: "Building elegant and scalable systems with Nuxt, Vue, and TypeScript.",
  avatar:
    "https://media.licdn.com/dms/image/v2/D4D03AQFhrlp_8xgbvw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1699990002591?e=1763596800&v=beta&t=GGRA00o29rfyZQy8xQeebfIkBfiKT8yr1gFGTdNAFAc",
  links: {
    github: "https://github.com/abdallhsamy",
    linkedin: "https://www.linkedin.com/in/abdallah-samy/",
  },
};
</script>

<template>
  <section
    class="min-h-screen bg-gradient-to-br from-fuchsia-900 via-gray-900 to-black text-gray-100 flex flex-col items-center justify-center px-6 py-24"
  >
    <img
      :src="profile.avatar"
      class="w-24 h-24 rounded-full border-2 border-fuchsia-500 shadow-xl mb-4"
    />
    <h1 class="text-3xl font-bold">{{ profile.name }}</h1>
    <p class="text-gray-400 text-sm mb-4">{{ profile.title }}</p>
    <p class="max-w-md text-center text-gray-300 mb-6">{{ profile.bio }}</p>
    <div class="flex gap-4">
      <a
        :href="profile.links.github"
        target="_blank"
        class="hover:text-cyan-300"
        ><Github class="w-5 h-5"
      /></a>
      <a
        :href="profile.links.linkedin"
        target="_blank"
        class="hover:text-fuchsia-300"
        ><Linkedin class="w-5 h-5"
      /></a>
    </div>
  </section>
</template>
