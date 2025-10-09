import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const dropdownSchema: PlaygroundSchema = {
    component: 'Ui/Common/UiDropdown.vue',
    title: 'Dropdown',
    props: [
        { key: 'trigger', type: 'enum', options: ['click', 'hover'], default: 'click' },
        { key: 'align', type: 'enum', options: ['left', 'right'], default: 'left' },
        { key: 'position', type: 'enum', options: ['top', 'bottom'], default: 'bottom' },
        { key: 'color', type: 'enum', options: ['fuchsia', 'cyan', 'emerald', 'rose', 'indigo'], default: 'fuchsia' },
        { key: 'glow', type: 'boolean', default: true },
        { key: 'glass', type: 'boolean', default: true },
    ],
}