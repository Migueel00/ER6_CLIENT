export default interface Artifact {
    id: number,
    title: string,
    description: string,
    markerImage: string,
    image: string,
    isRetrieved: boolean,
    coordinate: {
        latitude: number,
        longitude: number
    },
}