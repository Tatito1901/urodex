import { createClient } from "next-sanity"

export const client = createClient({
  projectId: "your-project-id", // Reemplazar con tu ID de proyecto de Sanity
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
})

export async function getBlogPosts(limit?: number) {
  try {
    let query = `*[_type == "post"] | order(publishedAt desc)`

    // Si se especifica un límite, añadirlo a la consulta
    if (limit) {
      query += `[0...${limit}]`
    }

    query += `{
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      "categories": categories[]->title,
      "author": author->name
    }`

    return (await client.fetch(query)) || []
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getBlogPost(slug: string) {
  try {
    return await client.fetch(
      `
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        body,
        "categories": categories[]->title,
        "author": author->name,
        "authorImage": author->image
      }
    `,
      { slug },
    )
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
}
