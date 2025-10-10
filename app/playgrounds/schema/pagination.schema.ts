import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const paginationSchema: PlaygroundSchema = {
    component: 'Ui/Nav/UiPagination.vue',
    title: 'Pagination',
    props: [
        { key: 'currentPage', type: 'number', default: 1 },
        { key: 'totalPages', type: 'number', default: 10 },
        { key: 'totalItems', type: 'number', default: 100 },
        { key: 'itemsPerPage', type: 'number', default: 10 },
        { key: 'showInfo', type: 'boolean', default: true },
        { key: 'showFirstLast', type: 'boolean', default: true },
        { key: 'showPrevNext', type: 'boolean', default: true },
        { key: 'size', type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
        { key: 'variant', type: 'enum', options: ['default', 'outlined', 'minimal'], default: 'default' },
    ]
}
