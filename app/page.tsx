import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CategoryList } from '@/components/home/category-list'
import { PromoBanner } from '@/components/home/promo-banner'
import { ProductGrid } from '@/components/home/product-grid'
import { FeaturedProducts } from '@/components/home/featured-products'
import { GetStartedCTA } from '@/components/home/get-started-cta'

export default function Home() {
  return (
    <div className="flex flex-col gap-10 px-10 pb-20">
      {/* Hero Section */}
      <section className="w-full min-h-[70vh] bg-gradient-to-b from-muted/50 to-background relative flex items-center">
        <div className="container flex flex-col lg:flex-row gap-10 items-center">
          <div className="flex-1 space-y-5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Groceries delivered in minutes, not hours.
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Order fresh groceries, meals, and essentials from local stores and get them delivered to your doorstep in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" asChild>
                <Link href="/categories">
                  Shop Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/deals">
                  View Today's Deals
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative w-full min-h-[300px] md:min-h-[400px]">
            <Image 
              src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg" 
              alt="Grocery Delivery" 
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Shop by Category</h2>
          <Button variant="ghost" asChild>
            <Link href="/categories">View All</Link>
          </Button>
        </div>
        <CategoryList />
      </section>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Best Sellers */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Best Sellers</h2>
          <Button variant="ghost" asChild>
            <Link href="/top-products">View All</Link>
          </Button>
        </div>
        <ProductGrid />
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Get Started CTA */}
      <GetStartedCTA />
    </div>
  )
}
