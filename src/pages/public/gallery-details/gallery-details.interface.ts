import Category, { emptyCategory } from "@/interfaces/category"
import Coordinates, { emptyCoordinates } from "@/interfaces/coordinates"

export default interface GalleryDetailsCad {
    id: number
    name: string
    description: string
    price: number
    cadPath: string
    camCoordinates: Coordinates
    panCoordinates: Coordinates
    creatorName: string
    creationDate: string
    category: Category
}

export const emptyGalleryDetailsCad: GalleryDetailsCad = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    cadPath: '',
    camCoordinates: emptyCoordinates,
    panCoordinates: emptyCoordinates,
    creatorName: '',
    creationDate: '',
    category: emptyCategory,
};