
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog-card"
import { ScrollAnimation } from "@/components/scroll-animations"

interface HomeBlogSectionClientProps {
  posts: any[]
}

export function HomeBlogSectionClient({ posts }: HomeBlogSectionClientProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <ScrollAnimation animation="fade-in-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-2">
              Nuestro Blog
            </div>
            <h2 className="text-4xl font-bold text-teal-700 mb-4 gradient-text">
              Artículos y consejos de salud urológica
            </h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              Manténgase informado con los últimos avances en urología y consejos para cuidar su salud.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <ScrollAnimation key={post._id} animation="fade-in-up" delay={100}>
                <BlogCard post={post} />
              </ScrollAnimation>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium text-gray-600 mb-4">Próximamente artículos interesantes</h3>
              <p className="text-gray-500">Estamos preparando contenido valioso para usted. ¡Vuelva pronto!</p>
            </div>
          )}
        </div>

        <ScrollAnimation animation="fade-in-up" delay={300}>
          <div className="flex justify-center">
            <Link href="/blog">
              <Button className="bg-teal-700 hover:bg-teal-600 btn-elegant rounded-full px-8 py-6 flex items-center gap-2">
                Ver todos los artículos
                <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
