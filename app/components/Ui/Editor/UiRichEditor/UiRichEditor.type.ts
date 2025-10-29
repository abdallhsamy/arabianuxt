export const UiRichEditorAiActions = {
  Rewrite: "rewrite",
  Shorten: "shorten",
  Expand: "expand",
  Tone: "tone",
  Summarize: "summarize",
  Bullets: "bullets",
  FixGrammar: "fix-grammar",
  Translate: "translate",
  Title: "title",
  Continue: "continue",
} as const;

export type UiRichEditorAiAction =
  (typeof UiRichEditorAiActions)[keyof typeof UiRichEditorAiActions];

export const UiRichEditorTones = {
  Neutral: "neutral",
  Professional: "professional",
  Friendly: "friendly",
  Formal: "formal",
  Casual: "casual",
  Confident: "confident",
  Apologetic: "apologetic",
} as const;

export type UiRichEditorTone =
  (typeof UiRichEditorTones)[keyof typeof UiRichEditorTones];

export const UiRichEditorLengths = {
  Short: "short",
  Medium: "medium",
  Long: "long",
} as const;

export type UiRichEditorLength =
  (typeof UiRichEditorLengths)[keyof typeof UiRichEditorLengths];

export const UiRichEditorLanguages = {
  English: "English",
  Arabic: "Arabic",
  French: "French",
  German: "German",
  Spanish: "Spanish",
} as const;

export type UiRichEditorLanguage =
  (typeof UiRichEditorLanguages)[keyof typeof UiRichEditorLanguages];

export const UiRichEditorDefaultValues = {
  ModelValue: "",
  Placeholder: 'Type "/" for commands or use ✨ AI',
  Editable: true,
  Autofocus: false,
} as const;

export const UiRichEditorSlashPosition = {
  X: 40,
  Y: 24,
} as const;

export const UiRichEditorAiPanelPosition = {
  X: 340,
  Y: 20,
} as const;

export const UiRichEditorMaxTextLength = 2000 as const;

export const UiRichEditorAiDelay = 600 as const;

export const UiRichEditorToolbarButtons = [
  { name: "bold", icon: "B" },
  { name: "italic", icon: "I" },
  { name: "underline", icon: "U" },
  { name: "strike", icon: "S" },
  { name: "bulletList", icon: "•" },
  { name: "orderedList", icon: "1." },
  { name: "blockquote", icon: "❝" },
  { name: "codeBlock", icon: "</>" },
  { name: "undo", icon: "↺" },
  { name: "redo", icon: "↻" },
] as const;

export type CommandItem = {
  label: string;
  description: string;
  action: (e: any) => void;
};

export type UiRichEditorProps = {
  modelValue?: string;
  placeholder?: string;
  editable?: boolean;
  autofocus?: boolean;
  aiHandler?: (req: {
    action: UiRichEditorAiAction;
    text: string;
    tone?: UiRichEditorTone;
    length?: UiRichEditorLength;
    language?: UiRichEditorLanguage;
  }) => Promise<string>;
};

export type UiRichEditorEmits = {
  (e: "update:modelValue", v: string): void;
};
