import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function FeaturedProducts() {
  return (
    <section className="container py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Collections</h2>
        <p className="text-muted-foreground text-lg">
          Discover our hand-picked selections of the finest products, tailored to your needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Organic Collection */}
        <Card className="group overflow-hidden">
          <div className="relative h-[300px] overflow-hidden">
            <Image 
              src="https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg" 
              alt="Organic Collection" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <Badge className="absolute top-4 left-4 bg-green-600 hover:bg-green-700">
              Organic
            </Badge>
          </div>
          <CardContent className="relative p-6">
            <h3 className="text-2xl font-bold mb-2">Organic Collection</h3>
            <p className="text-muted-foreground mb-4">
              Fresh, pesticide-free produce for a healthier you.
            </p>
            <Button variant="outline" asChild>
              <Link href="/categories/organic">
                Shop Collection
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Breakfast Essentials */}
        <Card className="group overflow-hidden">
          <div className="relative h-[300px] overflow-hidden">
            <Image 
              src="https://images.pexels.com/photos/1132040/pexels-photo-1132040.jpeg" 
              alt="Breakfast Essentials" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <Badge className="absolute top-4 left-4 bg-yellow-600 hover:bg-yellow-700">
              Morning Favorites
            </Badge>
          </div>
          <CardContent className="relative p-6">
            <h3 className="text-2xl font-bold mb-2">Breakfast Essentials</h3>
            <p className="text-muted-foreground mb-4">
              Start your day right with our morning favorites.
            </p>
            <Button variant="outline" asChild>
              <Link href="/categories/breakfast">
                Shop Collection
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Gourmet Selection */}
        <Card className="group overflow-hidden">
          <div className="relative h-[300px] overflow-hidden">
            <Image 
              src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg" 
              alt="Gourmet Selection" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <Badge className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700">
              Premium
            </Badge>
          </div>
          <CardContent className="relative p-6">
            <h3 className="text-2xl font-bold mb-2">Gourmet Selection</h3>
            <p className="text-muted-foreground mb-4">
              Curated fine foods for the discerning palate.
            </p>
            <Button variant="outline" asChild>
              <Link href="/categories/gourmet">
                Shop Collection
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}