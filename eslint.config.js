import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        alert: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        crypto: "readonly",
        URL: "readonly",
        Blob: "readonly",
        File: "readonly",
        FileList: "readonly",
        HTMLElement: "readonly",
        HTMLCanvasElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLTextAreaElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLPreElement: "readonly",
        KeyboardEvent: "readonly",
        MouseEvent: "readonly",
        DragEvent: "readonly",
        Event: "readonly",
        Node: "readonly",
        Image: "readonly",

        // Node.js globals
        process: "readonly",
        NodeJS: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",

        // Nuxt globals
        defineNuxtConfig: "readonly",
        definePageMeta: "readonly",
        defineNuxtRouteMiddleware: "readonly",
        defineEventHandler: "readonly",
        useNuxtApp: "readonly",
        useHead: "readonly",
        useLocaleHead: "readonly",
        useLocalePath: "readonly",
        useSwitchLocalePath: "readonly",
        useI18n: "readonly",
        useRoute: "readonly",
        useRouter: "readonly",
        useCookie: "readonly",
        useState: "readonly",
        navigateTo: "readonly",
        getHeader: "readonly",
        readBody: "readonly",
        setResponseStatus: "readonly",
        deleteCookie: "readonly",

        // Vue globals
        ref: "readonly",
        reactive: "readonly",
        computed: "readonly",
        watch: "readonly",
        onMounted: "readonly",
        onUnmounted: "readonly",
        nextTick: "readonly",
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
        $t: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      vue,
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-var-requires": "error",

      // Vue rules
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "warn",
      "vue/require-default-prop": "off",
      "vue/require-explicit-emits": "error",
      "vue/no-unused-vars": "error",
      "vue/no-multiple-template-root": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always",
          },
          svg: "always",
          math: "always",
        },
      ],

      // General rules
      "no-console": "off", // Allow console in development
      "no-debugger": "off", // Allow debugger in development
      "no-unused-vars": "off", // Use TypeScript version instead
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "no-empty": "warn",

      // Prettier integration
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  prettier,
  {
    ignores: [
      ".nuxt/**",
      ".output/**",
      "dist/**",
      "node_modules/**",
      "*.min.js",
      "coverage/**",
      ".nyc_output/**",
    ],
  },
];
