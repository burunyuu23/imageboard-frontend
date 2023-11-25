import {imageboardApi} from "@/shared/api/paths";

const requestMapping = "/board"
const basePath = `${imageboardApi}${requestMapping}`

const allPath = `/`
const idPath = (id: string) => `/${id}`
const randomPath = "/rand/random"


export const getAllBoards = `${basePath}${allPath}`
export const getIdBoardPath = (id: string) => `${basePath}${idPath(id)}`
export const getRandomBoardPath = `${basePath}${randomPath}`