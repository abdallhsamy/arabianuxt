import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const badgeSchema: PlaygroundSchema = {
    component: 'Ui/Common/UiBadge.vue',
    title: 'Badge',
    props: [
        { key: 'label', type: 'string', default: 'Badge' },
        { key: 'variant', type: 'enum', options: ['solid', 'soft', 'outline', 'glass'], default: 'solid' },
        { key: 'color', type: 'enum', options: ['fuchsia', 'indigo', 'cyan', 'emerald', 'rose', 'amber'], default: 'fuchsia' },
        { key: 'size', type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
        { key: 'rounded', type: 'boolean', default: true },
        { key: 'glow', type: 'boolean', default: false },
        { key: 'dot', type: 'boolean', default: false },
    ],
}
