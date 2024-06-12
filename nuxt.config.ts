// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["usebootstrap"],
    css: ['./assets/main.css'],
    app: {
        head: {
            link: [
                {
                rel: 'stylesheet',
                href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
                }
            ],
            script: [
                {
                src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
                tagPosition: 'bodyClose'
                }
            ]
        }
    }
})