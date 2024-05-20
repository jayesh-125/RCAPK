const appMode: any = {
    DEVELOPMENT: "http://localhost:3000",
    PRODUCTION: "https://indchat-api.vercel.app",
}

export const apiUrl = (mode: string) => {
    return appMode[mode]
}

export const urlHelper = {
    image: appMode.PRODUCTION
}