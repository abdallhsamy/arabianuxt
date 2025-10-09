import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const buttonSchema: PlaygroundSchema = {
    component: 'Ui/Common/UiButton.vue',
    title: 'Button',
    props: [
        { key: 'label', type: 'string', default: 'Click Me' },
        { key: 'variant', type: 'enum', options: ['primary', 'secondary', 'success', 'danger', 'outline', 'glass'], default: 'primary' },
        { key: 'size', type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
        { key: 'loading', type: 'boolean' },
        { key: 'disabled', type: 'boolean' },
        { key: 'iconOnly', type: 'boolean' },
        { key: 'toggleable', type: 'boolean' },
        { key: 'full', type: 'boolean' }
    ]
}