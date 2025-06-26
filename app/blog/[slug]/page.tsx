import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Tag, ArrowLeft } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { ScrollAnimation } from "@/components/scroll-animations"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  return {
    title: "Artículo temporalmente no disponible | Urodex",
    description: "Este artículo no está disponible en este momento",
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Placeholder data when Sanity is removed
  const post = {
    title: "Artículo temporalmente no disponible",
    publishedAt: new Date().toISOString(),
    author: "Dr. Mario Martínez Thomas",
    categories: ["Urología"],
    mainImage: null,
    body: null,
    authorImage: null
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/80 to-white/90"></div>
        <div className="container relative z-10">
          <ScrollAnimation animation="fade-in-up">
            <Link
              href="/blog"
              className="inline-flex items-center text-green-700 hover:text-green-600 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al blog
            </Link>

            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">{post.title}</h1>

              <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>

                {post.author && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                )}

                {post.categories && post.categories.length > 0 && (
                  <div className="flex items-center flex-wrap gap-2">
                    <Tag className="h-4 w-4 mr-1" />
                    {post.categories.map((category: string) => (
                      <span key={category} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container">
          <ScrollAnimation animation="fade-in-up">
            <article className="prose prose-green max-w-3xl mx-auto">
              <p className="text-gray-600">El contenido de este artículo no está disponible actualmente.</p>
              <p className="text-gray-600 mt-4">Estamos trabajando en actualizar nuestro sistema de blog. Por favor, vuelva pronto para ver nuestros artículos.</p>
            </article>
          </ScrollAnimation>
        </div>
      </section>

      {/* Author Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <ScrollAnimation animation="fade-in-up">
            <div className="max-w-3xl mx-auto">
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-green-700 mb-4">Sobre el autor</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-green-100 flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-green-700">
                      <User className="h-8 w-8" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{post.author || "Equipo Urodex"}</h4>
                    <p className="text-gray-600 text-sm">Especialista en Urología en Urodex Clínica</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  )
}
