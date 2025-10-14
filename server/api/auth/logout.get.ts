import { setResponseStatus, getHeader } from 'h3';
import { detectLocale, translate } from '~~/i18n/i18n.util';
import {HttpStatusCode} from "axios";

export default defineEventHandler(async (event) => {
    const locale = detectLocale(getHeader(event, 'accept-language'))
    const t = (key: string) => translate(locale, key)
    try {
        deleteCookie(event, 'authUser', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        })

        setResponseStatus(event, HttpStatusCode.Ok)

        return {
            message: t('api.auth.loggedOut'),
        };
    } catch (err) {
        console.error('Auth login error:', err);
        setResponseStatus(event, HttpStatusCode.InternalServerError);
        return {
            message: t('api.common.serverError'),
        }
    };
})
