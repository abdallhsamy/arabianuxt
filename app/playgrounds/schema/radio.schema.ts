import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const radioSchema: PlaygroundSchema = {
    component: 'Ui/Form/UiRadio.vue',
    title: 'Radio',
    props: [
        { key: 'modelValue', type: 'string', default: 'option1' },
        { key: 'label', type: 'string', default: 'Radio Label' },
        { key: 'value', type: 'string', default: 'option1' },
        { key: 'size', type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
        { key: 'disabled', type: 'boolean' },
        { key: 'color', type: 'enum', options: ['primary', 'secondary', 'success', 'warning', 'danger'], default: 'primary' },
    ]
}
