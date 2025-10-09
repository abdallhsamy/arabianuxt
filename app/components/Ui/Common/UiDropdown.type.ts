interface BaseDropdownItem {
    id: string
    icon?: any
    shortcut?: string
    disabled?: boolean
    color?: string
}

export type DropdownItem =
    | (BaseDropdownItem & {
    divider: true
    label?: never
})
    | (BaseDropdownItem & {
    divider?: false
    label: string
})

export interface UiDropdownProps {
    label?: string
    icon?: any
    items: DropdownItem[]
    trigger?: 'click' | 'hover'
    align?: 'left' | 'right'
    position?: 'top' | 'bottom'
    glow?: boolean
    glass?: boolean
    color?: 'fuchsia' | 'cyan' | 'emerald' | 'rose' | 'indigo'
}