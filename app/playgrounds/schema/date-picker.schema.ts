import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const datePickerSchema: PlaygroundSchema = {
    component: 'Ui/Form/UiDatePicker.vue',
    title: 'Date Picker',
    props: [
        { key: 'modelValue', type: 'string', default: '' },
        { key: 'label', type: 'string', default: 'Select Date' },
        { key: 'placeholder', type: 'string', default: 'Choose a date' },
        { key: 'format', type: 'string', default: 'YYYY-MM-DD' },
        { key: 'minDate', type: 'string', default: '' },
        { key: 'maxDate', type: 'string', default: '' },
        { key: 'disabled', type: 'boolean' },
        { key: 'readonly', type: 'boolean' },
        { key: 'clearable', type: 'boolean', default: true },
        { key: 'size', type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
    ]
}
