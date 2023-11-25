import {imageboardApi} from "@/shared/api/paths";

const requestMapping = "/thread"
const basePath = `${imageboardApi}${requestMapping}`

const allPath = `/`
const idPath = (id: number) => `/${id}`
const randomPath = "/rand"


export const getAllThreadsWithNoLimit = `${basePath}${allPath}?limit=2147483647`
export const getAllThreads = `${basePath}${allPath}`
export const getIdThreadPath = (id: number) => `${basePath}${idPath(id)}`
export const getRandomThreadPath = `${basePath}${randomPath}`