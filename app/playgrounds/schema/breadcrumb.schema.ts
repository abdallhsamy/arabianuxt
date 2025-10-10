import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const breadcrumbSchema: PlaygroundSchema = {
    component: 'Ui/Nav/UiBreadcrumb.vue',
    title: 'Breadcrumb',
    props: [
        { key: 'items', type: 'string', default: '[{"label":"Home","href":"/"},{"label":"Dashboard","href":"/dashboard"},{"label":"Settings","href":"/settings"}]' },
        { key: 'separator', type: 'string', default: '/' },
        { key: 'maxItems', type: 'number', default: 5 },
        { key: 'showHome', type: 'boolean', default: true },
        { key: 'homeIcon', type: 'string', default: 'home' },
        { key: 'size', type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
    ]
}
