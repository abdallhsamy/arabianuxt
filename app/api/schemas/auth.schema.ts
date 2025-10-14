import { z } from 'zod'

const loginSchemaBase = z.object({
    email: z.string().min(1),
    password: z.string().min(1)
})

export type LoginForm = z.infer<typeof loginSchemaBase>

export const createLoginSchema = (t: (key: string) => string) =>
    z.object({
        email: z.string().min(1, t('api.auth.emailRequired')),
        password: z.string().min(1, t('api.auth.passwordRequired'))
    })

export const getLoginSchema = () => {
    const { $i18n: { t } } = useNuxtApp()
    return createLoginSchema((key: string) => t(key))
}
