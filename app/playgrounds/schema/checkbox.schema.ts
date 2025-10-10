import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const checkboxSchema: PlaygroundSchema = {
    component: 'Ui/Form/UiCheckbox.vue',
    title: 'Checkbox',
    props: [
        { key: 'modelValue', type: 'boolean', default: false },
        { key: 'label', type: 'string', default: 'Checkbox Label' },
        { key: 'size', type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
        { key: 'disabled', type: 'boolean' },
        { key: 'indeterminate', type: 'boolean' },
        { key: 'color', type: 'enum', options: ['primary', 'secondary', 'success', 'warning', 'danger'], default: 'primary' },
    ]
}
