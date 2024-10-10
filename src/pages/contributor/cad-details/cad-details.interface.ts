import Category, { emptyCategory } from "@/interfaces/category"
import Coordinates, { emptyCoordinates } from "@/interfaces/coordinates"

export default interface CadDetailsCad {
    id: number
    name: string
    description: string
    price: number
    cadPath: string
    camCoordinates: Coordinates
    panCoordinates: Coordinates
    creationDate: string
    category: Category
}

export const emptyCadDetailsCad: CadDetailsCad = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    cadPath: '',
    camCoordinates: emptyCoordinates,
    panCoordinates: emptyCoordinates,
    creationDate: '',
    category: emptyCategory,
};