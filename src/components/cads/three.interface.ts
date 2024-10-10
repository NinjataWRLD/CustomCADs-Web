import Coordinates, { emptyCoordinates } from "@/interfaces/coordinates"

export default interface ThreeJSCad {
    id: number
    cadPath: string
    camCoordinates: Coordinates
    panCoordinates: Coordinates
}

export const emptyThreeJSCad: ThreeJSCad = {
    id: 0,
    cadPath: '',
    camCoordinates: emptyCoordinates,
    panCoordinates: emptyCoordinates,
};