import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, User, Tag, ArrowLeft } from "lucide-react"
import { getBlogPost } from "@/lib/sanity.client"
import { urlForImage } from "@/lib/sanity.image"
import { formatDate } from "@/lib/utils"
import { PortableText } from "@portabletext/react"
import { ScrollAnimation } from "@/components/scroll-animations"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug)

    if (!post) {
      return {
        title: "Artículo no encontrado | Urodex",
      }
    }

    return {
      title: `${post.title} | Blog Urodex`,
      description: post.excerpt,
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Blog | Urodex",
    }
  }
}

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 relative">
          <Image
            src={urlForImage(value).url() || "/placeholder.svg"}
            alt={value.alt || "Imagen del artículo"}
            width={800}
            height={500}
            className="rounded-lg mx-auto"
          />
          {value.caption && <div className="text-center text-gray-500 mt-2 text-sm">{value.caption}</div>}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-green-700">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-green-700">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3 text-green-700">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-6 mb-3 text-green-700">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-green-500 pl-4 italic my-6 text-gray-600">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">{children}</ol>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
      return (
        <a href={value.href} rel={rel} className="text-green-600 hover:text-green-800 underline transition-colors">
          {children}
        </a>
      )
    },
  },
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getBlogPost(params.slug)

    if (!post) {
      notFound()
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
                      {post.categories.map((category) => (
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

        {/* Featured Image */}
        {post.mainImage && (
          <section className="py-8 bg-white">
            <div className="container">
              <ScrollAnimation animation="fade-in-up">
                <div className="max-w-3xl mx-auto">
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={urlForImage(post.mainImage).url() || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="py-12 bg-white">
          <div className="container">
            <ScrollAnimation animation="fade-in-up">
              <article className="prose prose-green max-w-3xl mx-auto">
                {post.body ? (
                  <PortableText value={post.body} components={components} />
                ) : (
                  <p className="text-gray-600">El contenido de este artículo no está disponible actualmente.</p>
                )}
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
                      {post.authorImage ? (
                        <Image
                          src={urlForImage(post.authorImage).url() || "/placeholder.svg"}
                          alt={post.author || "Autor"}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-green-700">
                          <User className="h-8 w-8" />
                        </div>
                      )}
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
  } catch (error) {
    console.error("Error rendering blog post:", error)
    notFound()
  }
}
