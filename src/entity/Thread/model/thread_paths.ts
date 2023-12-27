import {imageboardApi} from "@/shared/api/base_paths";

const requestMapping = "/thread"
const basePath = `${imageboardApi}${requestMapping}`

const allPath = `/`
const idPath = (id: number) => `/${id}`
const randomPath = "/rand"


export const getAllThreadsWithNoLimit = `${basePath}${allPath}?limit=2147483647`
export const getAllThreads = `${basePath}${allPath}`
export const getAllThreadsByBoard = (boardId: string) => `${basePath}${allPath}?board=${boardId}`
export const getIdThreadPath = (id: number) => `${basePath}${idPath(id)}`
export const getRandomThreadPath = `${basePath}${randomPath}`