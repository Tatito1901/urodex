import { HomeBlogSectionClient } from "./home-blog-section-client"

// Definiendo un tipo para los posts
type Post = {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage?: string
  publishedAt?: string
  excerpt?: string
  categories?: string[]
  author?: string
}

export function HomeBlogSection() {
  // Datos de ejemplo para usar mientras no hay Sanity
  const mockPosts: Post[] = [
    // Dejar el array vacío para mostrar mensaje "Próximamente artículos interesantes"
  ]

  return <HomeBlogSectionClient posts={mockPosts} />
}
