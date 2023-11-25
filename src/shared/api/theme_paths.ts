import {imageboardApi} from "@/shared/api/paths";

const requestMapping = "/theme"
const basePath = `${imageboardApi}${requestMapping}`

const allPath = "/"

export const getAllThemesPath = `${basePath}${allPath}`