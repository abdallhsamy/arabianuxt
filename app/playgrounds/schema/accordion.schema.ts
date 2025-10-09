import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const accordionSchema: PlaygroundSchema = {
    component: 'Ui/Common/UiAccordion.vue',
    title: 'Accordion',
    props: [
        { key: 'multiple', type: 'boolean', default: false },
        { key: 'color', type: 'enum', options: ['fuchsia', 'cyan', 'emerald', 'rose', 'indigo'], default: 'fuchsia' },
        { key: 'glow', type: 'boolean', default: true },
        { key: 'glass', type: 'boolean', default: true },
    ],
}