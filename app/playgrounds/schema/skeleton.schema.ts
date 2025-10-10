import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const skeletonSchema: PlaygroundSchema = {
    component: 'Ui/Feedback/UiSkeleton.vue',
    title: 'Skeleton',
    props: [
        { key: 'variant', type: 'enum', options: ['text', 'circular', 'rectangular'], default: 'text' },
        { key: 'width', type: 'string', default: '100%' },
        { key: 'height', type: 'string', default: '1rem' },
        { key: 'animation', type: 'enum', options: ['pulse', 'wave', 'none'], default: 'pulse' },
        { key: 'lines', type: 'number', default: 1 },
        { key: 'spacing', type: 'enum', options: ['none', 'sm', 'md', 'lg'], default: 'sm' },
    ]
}
