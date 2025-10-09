export type StepItem = {
    id: string
    label: string
    description?: string
    icon?: any
    state?: 'pending' | 'active' | 'completed' | 'error'
}

export type UiStepperProps = {
    steps: StepItem[]
    activeStep?: string
    vertical?: boolean
    color?: 'fuchsia' | 'cyan' | 'emerald' | 'rose' | 'indigo' | 'amber'
    glow?: boolean
    showNumbers?: boolean
    connectLines?: boolean
}
