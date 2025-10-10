import type {PlaygroundSchema} from "~/components/Ui/Playground/UiPlayground.type";

export const timelineSchema: PlaygroundSchema = {
    component: 'Ui/Data/UiTimeline.vue',
    title: 'Timeline',
    props: [
        { key: 'events', type: 'string', default: '[{"title":"Event 1","description":"Description 1","time":"2024-01-01","color":"bg-gradient-to-r from-fuchsia-500 to-cyan-500"},{"title":"Event 2","description":"Description 2","time":"2024-01-02","color":"bg-gradient-to-r from-emerald-500 to-cyan-500"},{"title":"Event 3","description":"Description 3","time":"2024-01-03","color":"bg-gradient-to-r from-amber-500 to-orange-500"}]' },
    ]
}
