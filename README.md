# 🌌 Arabianuxt — Modern Nuxt 4 + Tailwind v4 Dashboard Kit

**Author:** [Abdallah Samy](https://www.linkedin.com/in/abdallah-samy/)  
**GitHub:** [@abdallhsamy](https://github.com/abdallhsamy)

---

## 🚀 Overview

Arabianuxt is a **modern, elegant, and production-ready Nuxt 4 dashboard template** built with:
- ⚡ **Nuxt 4**, TypeScript, and Vite
- 🎨 **Tailwind CSS v4** with glassmorphic gradients
- 🧩 **Pinia** setup stores
- 🧠 **Tiptap Pro Editor** with AI slash commands
- 🔒 **Nuxt-Security + CSP** for enterprise readiness
- 💅 **Dark / Light / RTL** built-in support

Perfect for SaaS, admin panels, internal tools, and startup dashboards.

---

## ✨ Features

| Category | Description |
|-----------|-------------|
| **UI System** | Reusable components: buttons, modals, tables, tooltips, alerts, badges, forms, etc. |
| **AI Editor** | Slash commands `/rewrite`, `/summarize`, `/translate`, tone & length controls |
| **Design** | Tailwind v4 atomic tokens, gradients, and glassmorphism |
| **Security** | Nuxt-Security headers, CSP, XSS protection |
| **Performance** | Lazy-loaded routes, Vite + Nuxt hybrid SSR |
| **Developer DX** | TypeScript strict, ESLint + Prettier, Vitest + Vue Test Utils |
| **Accessibility** | Semantic components with keyboard support |

---

## 🧰 Tech Stack

- **Nuxt 4**
- **TypeScript**
- **Tailwind CSS v4**
- **Pinia (setup syntax)**
- **Tiptap v3**
- **Lucide Icons**
- **Vitest + Vue Test Utils**
- **Nuxt Security**
- **ESLint + Prettier**

---

## 🧑‍💻 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/abdallhsamy/arabianuxt.git
cd arabianuxt

# 2. Install dependencies
yarn install

# 3. Run dev server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🧩 Structure

```bash
app/
 ├─ components/Ui/
 │   ├─ Form/
 │   ├─ Dashboard/
 │   ├─ Common/
 │   └─ Editor/
 ├─ layouts/
 │   ├─ default.vue
 │   ├─ auth.vue
 ├─ pages/
 │   ├─ index.vue        # Landing
 │   ├─ dashboard/
 │   └─ auth/
 ├─ store/
 │   └─ useUserStore.ts
 ├─ assets/
 │   └─ css/main.css
```

---

## 🧠 AI Integration

The rich editor includes a pluggable AI handler:

```ts
const aiHandler = async ({ action, text }) => {
  const res = await $fetch('/api/ai', { method: 'POST', body: { action, text } })
  return res.result
}
```

Connect it to:

-   OpenAI / Anthropic

-   Local Ollama

-   Your custom backend


---

## 🧪 Tests

```bash
yarn test
```

---

## 🤝 Contributing

1.  Fork this repository

2.  Create your feature branch:  
    `git checkout -b feature/awesome-feature`

3.  Commit changes:  
    `git commit -m "feat: add awesome feature"`

4.  Push branch:  
    `git push origin feature/awesome-feature`

5.  Open a Pull Request


All contributions are welcome — UI fixes, docs, new components, or AI enhancements.

---

## 🧭 Roadmap

-    Docs site with component playground

-    i18n (Arabic / English)

-    CLI starter (`npx create-arabianuxt`)

-    Theme Builder (light/dark/brand palettes)

-    VS Code Snippets extension

-    AI Assistant plugin (Nuxt module)


---

## 🧑‍🚀 Author

**Abdallah Samy** — Technical Consultant & Software Engineer

-   🌐 [LinkedIn](https://www.linkedin.com/in/abdallah-samy/)

-   💻 [GitHub](https://github.com/abdallhsamy)


---

## 🪄 License

MIT © Abdallah Samy
