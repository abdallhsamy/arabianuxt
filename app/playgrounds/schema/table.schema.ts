import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const tableSchema: PlaygroundSchema = {
    component: 'Ui/Data/UiTable.vue',
    title: 'Table',
    props: [
        { key: 'rows', type: 'string', default: '[{"name":"John","age":30,"city":"NYC"},{"name":"Jane","age":25,"city":"LA"}]' },
        { key: 'columns', type: 'string', default: '[{"key":"name","header":"Name"},{"key":"age","header":"Age"},{"key":"city","header":"City"}]' },
        { key: 'loading', type: 'boolean' },
        { key: 'searchable', type: 'boolean', default: true },
        { key: 'selectable', type: 'boolean' },
        { key: 'dense', type: 'boolean' },
        { key: 'rounded', type: 'boolean', default: true },
        { key: 'stickyHeader', type: 'boolean' },
    ]
}
