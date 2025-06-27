import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface BlogCardProps {
  post: {
    _id: string
    title: string
    slug: { current: string }
    mainImage?: any
    publishedAt: string
    excerpt?: string
    categories?: string[]
    author?: string
  }
}

export function BlogCard({ post }: BlogCardProps) {
  // Asegurarnos de que todos los campos necesarios existan
  if (!post || !post._id || !post.title || !post.slug) {
    return null
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <Image
          src="/placeholder.svg?height=400&width=600&query=medical+blog"
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {post.categories && post.categories.length > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-teal-700 text-white text-xs px-3 py-1 rounded-full">{post.categories[0]}</span>
          </div>
        )}
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt || new Date().toISOString())}</time>
        </div>
        <h3 className="text-xl font-medium text-teal-700 mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt || "Leer más sobre este artículo..."}</p>
        <Link
          href={`/blog/${post.slug.current}`}
          className="text-teal-700 font-medium hover:text-teal-600 inline-flex items-center group"
        >
          Leer más
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </CardContent>
    </Card>
  )
}
