import {imageboardApi} from "@/shared/api/base_paths";

const requestMapping = "/message"
const basePath = `${imageboardApi}${requestMapping}`

const allPath = "/"
const newPath = "/"
const idPath = (id: number) => `/${id}`
const randomPath = "/rand"
const listPath = "/list"


export const getAllMessagesPath = `${basePath}${allPath}`
export const getAllMessagesPathByThread = (thread: number) => `${basePath}${allPath}?thread=${thread}`
export const postNewMessagePath = `${basePath}${newPath}`
export const getIdMessagePath = (id: number) => `${basePath}${idPath(id)}`
export const getRandomMessagePath = `${basePath}${randomPath}`
export const getRandomMessagePathByThread = (thread: number) => `${basePath}${randomPath}?thread=${thread}`
export const getMessagesInListPath = `${basePath}${listPath}`