export type PlaygroundSchema = {
    component: string;
    title: string;
    props: {
        key: string;
        type: 'string' | 'boolean' | 'enum';
        label?: string;
        options?: string[];
        default?: any;
    }[]
}