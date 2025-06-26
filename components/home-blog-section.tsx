import { getBlogPosts } from "@/lib/sanity.client"
import { HomeBlogSectionClient } from "./home-blog-section-client"

export async function HomeBlogSection() {
  // Obtener los 3 posts más recientes
  const recentPosts = await getBlogPosts(3)

  return <HomeBlogSectionClient posts={recentPosts} />
}
