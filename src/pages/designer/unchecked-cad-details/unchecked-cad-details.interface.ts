import Coordinates, { emptyCoordinates } from "@/interfaces/coordinates"

export default interface UncheckedCadDetailsCad {
    id: number
    cadPath: string
    camCoordinates: Coordinates
    panCoordinates: Coordinates
} 

export const emptyUncheckedCadDetailsCad: UncheckedCadDetailsCad = {
    id: 0,
    cadPath: '',
    camCoordinates: emptyCoordinates,
    panCoordinates: emptyCoordinates,
};