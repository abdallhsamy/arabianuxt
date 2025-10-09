import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const cardSchema: PlaygroundSchema = {
    component: 'Ui/Common/UiCard.vue',
    title: 'Card',
    props: [
        { key: 'title', type: 'string', default: 'Card Title' },
        { key: 'gradient', type: 'boolean', default: false },
        { key: 'outlined', type: 'boolean', default: false },
        { key: 'hoverable', type: 'boolean', default: true },
        { key: 'elevated', type: 'boolean', default: false },
        { key: 'compact', type: 'boolean', default: false },
        { key: 'color', type: 'enum', options: ['fuchsia', 'indigo', 'cyan', 'rose', 'emerald', 'amber'], default: 'fuchsia' },
    ],
}