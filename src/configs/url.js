const appMode = {
    DEVELOPMENT: "http://localhost:3000",
    PRODUCTION: import.meta.env.VITE_APP_API_URL,
}

export const apiUrl = (mode) => {
    return appMode[mode]
}

export const urlHelper = {
    image: appMode.DEVELOPMENT
}