import {Notes} from "@prisma/client"

interface INotes extends Notes {
    notes: Notes[]
}