import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const selectSchema: PlaygroundSchema = {
    component: 'Ui/Common/UiSelect.vue',
    title: 'Select',
    props: [
        { key: 'label', type: 'string', default: 'Select Country' },
        { key: 'placeholder', type: 'string', default: 'Choose...' },
        { key: 'searchable', type: 'boolean', default: true },
        { key: 'clearable', type: 'boolean', default: true },
        { key: 'loading', type: 'boolean' },
        { key: 'disabled', type: 'boolean' },
        { key: 'asyncOptions', type: 'boolean', default: false },
    ],
}
