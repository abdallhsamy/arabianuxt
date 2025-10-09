import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const stepperSchema: PlaygroundSchema = {
    component: 'Ui/Common/UiStepper.vue',
    title: 'Stepper',
    props: [
        { key: 'vertical', type: 'boolean', default: false },
        { key: 'color', type: 'enum', options: ['fuchsia', 'cyan', 'emerald', 'rose', 'indigo', 'amber'], default: 'fuchsia' },
        { key: 'glow', type: 'boolean', default: true },
        { key: 'showNumbers', type: 'boolean', default: true },
        { key: 'connectLines', type: 'boolean', default: true },
    ],
}