import {imageboardApi} from "@/shared/api/base_paths";

const requestMapping = "/theme"
const basePath = `${imageboardApi}${requestMapping}`

const allPath = "/"

export const getAllThemesPath = `${basePath}${allPath}`