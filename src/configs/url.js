const appMode = {
    DEVELOPMENT: "http://localhost:3000",
    PRODUCTION: "https://indchat-api.vercel.app",
}

export const apiUrl = (mode) => {
    return appMode[mode]
}

export const urlHelper = {
    image: appMode.PRODUCTION
}