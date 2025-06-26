import type { Metadata } from "next"
import Image from "next/image"
import { BlogCard } from "@/components/blog-card"
import { getBlogPosts } from "@/lib/sanity.client"
import { ScrollAnimation } from "@/components/scroll-animations"

export const metadata: Metadata = {
  title: "Blog | Urodex - Dr. Mario Martínez Thomas",
  description:
    "Artículos y noticias sobre urología, salud masculina y avances médicos por el Dr. Mario Martínez Thomas.",
}

export default async function BlogPage() {
  // Añadimos manejo de errores y valor por defecto
  let posts = []
  try {
    const fetchedPosts = await getBlogPosts()
    posts = fetchedPosts || []
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    // Dejamos posts como un array vacío en caso de error
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/80 to-white/90"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6 gradient-text">Blog Médico</h1>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Artículos y noticias sobre urología, salud masculina y avances médicos
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <ScrollAnimation key={post._id} animation="fade-in-up" delay={100}>
                  <BlogCard post={post} />
                </ScrollAnimation>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-gray-600 mb-4">No hay artículos disponibles</h3>
                <p className="text-gray-500">Pronto publicaremos contenido interesante. ¡Vuelve pronto!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 gradient-bg">
        <div className="container">
          <ScrollAnimation animation="fade-in-up">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl elegant-shadow">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold text-green-700 mb-4">Suscríbete a nuestro boletín</h2>
                  <p className="text-gray-600 mb-6">
                    Recibe los últimos artículos, consejos de salud y noticias directamente en tu correo electrónico.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Tu correo electrónico"
                      className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors">
                      Suscribirse
                    </button>
                  </div>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative w-48 h-48">
                    <Image
                      src="/placeholder-364bv.png"
                      alt="Newsletter"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
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
