/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly PUBLIC_BACKEND_HOST: string
    readonly PGN_CMS_HOST: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}
