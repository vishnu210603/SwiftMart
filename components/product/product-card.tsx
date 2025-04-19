"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useCart } from '@/context/cart-context'

type Product = {
  id: string
  name: string
  price: number
  originalPrice: number | null
  rating: number
  reviews: number
  image: string
  category: string
  isNew: boolean
  isFeatured: boolean
  stock: number
}

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  }
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[220px] overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image 
            src={product.image} 
            alt={product.name} 
            fill
            className={`object-cover transition-transform duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        </Link>
        
        {/* Quick action buttons */}
        <div className={`absolute top-3 right-3 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full shadow-md h-9 w-9"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        
        {/* Product badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive">-{discount}%</Badge>
          )}
        </div>
        
        {/* Add to cart button */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 transition-transform duration-300 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <Button 
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-base line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mt-1 mb-2">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm ml-1 font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground ml-1">
            ({product.reviews} reviews)
          </span>
        </div>
        
        <div className="flex items-center">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}