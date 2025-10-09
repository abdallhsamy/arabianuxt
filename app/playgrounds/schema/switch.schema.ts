import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const switchSchema: PlaygroundSchema = {
    component: 'Ui/Common/UiSwitch.vue',
    title: 'Switch',
    props: [
        { key: 'label', type: 'string', default: 'Enable Notifications' },
        { key: 'description', type: 'string', default: 'Receive real-time alerts' },
        { key: 'size', type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
        { key: 'color', type: 'enum', options: ['fuchsia', 'cyan', 'emerald', 'rose', 'amber', 'indigo'], default: 'fuchsia' },
        { key: 'icon', type: 'boolean', default: true },
        { key: 'outlined', type: 'boolean', default: false },
        { key: 'disabled', type: 'boolean', default: false },
    ],
}