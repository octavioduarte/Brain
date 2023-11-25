import { Farm } from "./farm";

export type Producer = {
    id: number
    document: string
    document_type: string
    farm: Farm
}