import createImageUrlBuilder from "@sanity/image-url"
import { client } from "./sanity.client"

const imageBuilder = createImageUrlBuilder(client)

export const urlForImage = (source: any) => {
  // Si no hay fuente, devolver una URL de imagen de marcador de posición
  if (!source) {
    return {
      url: () => "/generic-medical-scene.png",
    }
  }

  return imageBuilder.image(source).auto("format").fit("max")
}
