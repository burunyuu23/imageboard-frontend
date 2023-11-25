import {imageboardApi} from "@/shared/api/paths";

const requestMapping = "/message"
const basePath = `${imageboardApi}${requestMapping}`

const allPath = "/"
const newPath = "/"
const idPath = (id: number) => `/${id}`
const randomPath = "/rand"


export const getAllMessagesPath = `${basePath}${allPath}`
export const getAllMessagesPathByThread = (thread: number) => `${basePath}${allPath}?thread=${thread}`
export const postNewMessagePath = `${basePath}${newPath}`
export const getIdMessagePath = (id: number) => `${basePath}${idPath(id)}`
export const getRandomMessagePath = `${basePath}${randomPath}`