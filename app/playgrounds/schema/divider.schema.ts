import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const dividerSchema: PlaygroundSchema = {
    component: 'Ui/Display/UiDivider.vue',
    title: 'Divider',
    props: [
        { key: 'label', type: 'string', default: '' },
        { key: 'orientation', type: 'enum', options: ['horizontal', 'vertical'], default: 'horizontal' },
        { key: 'gradient', type: 'boolean', default: true },
    ]
}
