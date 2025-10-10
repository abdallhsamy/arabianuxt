import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const textareaSchema: PlaygroundSchema = {
    component: 'Ui/Form/UiTextarea.vue',
    title: 'Textarea',
    props: [
        { key: 'modelValue', type: 'string', default: 'Sample text content' },
        { key: 'label', type: 'string', default: 'Textarea Label' },
        { key: 'placeholder', type: 'string', default: 'Enter your message...' },
        { key: 'variant', type: 'enum', options: ['default', 'outlined', 'filled'], default: 'default' },
        { key: 'state', type: 'enum', options: ['success', 'warning', 'error', 'none'], default: 'none' },
        { key: 'message', type: 'string', default: '' },
        { key: 'size', type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
        { key: 'disabled', type: 'boolean' },
        { key: 'readonly', type: 'boolean' },
        { key: 'rows', type: 'number', default: 4 },
        { key: 'resizable', type: 'boolean', default: true },
    ]
}
