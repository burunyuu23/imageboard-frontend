import {Board} from "@/entity/Board";

export type Theme = {
    id: number
    name: string
    description: string
    boards?: Board[]
}