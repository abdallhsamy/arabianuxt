import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const tabsSchema: PlaygroundSchema = {
    component: 'Ui/Common/UiTabs.vue',
    title: 'Tabs',
    props: [
        { key: 'variant', type: 'enum', options: ['underline', 'pill'], default: 'underline' },
        { key: 'vertical', type: 'boolean', default: false },
        { key: 'color', type: 'enum', options: ['fuchsia', 'cyan', 'emerald', 'rose', 'indigo'], default: 'fuchsia' },
        { key: 'glow', type: 'boolean', default: true },
    ],
}