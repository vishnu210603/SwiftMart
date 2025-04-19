"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProductCard } from '@/components/product/product-card'
import { Home, Search, SlidersHorizontal } from 'lucide-react'

// Mock category data
const categoryData = {
  fruits: {
    name: "Fresh Fruits",
    description: "Fresh and juicy fruits sourced directly from farms",
    products: [
      {
        id: "1",
        name: "Organic Bananas",
        price: 3.99,
        originalPrice: 4.99,
        rating: 4.8,
        reviews: 124,
        image: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg",
        category: "Fruits",
        isNew: false,
        isFeatured: true,
        stock: 48
      },
      {
        id: "2",
        name: "Fresh Avocados",
        price: 6.99,
        originalPrice: 8.99,
        rating: 4.7,
        reviews: 98,
        image: "https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg",
        category: "Fruits",
        isNew: false,
        isFeatured: true,
        stock: 32
      },
      {
        id: "15",
        name: "Fresh Strawberries",
        price: 2.99,
        originalPrice: 4.99,
        rating: 4.7,
        reviews: 86,
        image: "https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg",
        category: "Fruits",
        isNew: false,
        isFeatured: true,
        stock: 35
      }
    ]
  },
  vegetables: {
    name: "Fresh Vegetables",
    description: "Farm-fresh vegetables delivered to your doorstep",
    products: [
      {
        id: "5",
        name: "Organic Carrots",
        price: 1.99,
        originalPrice: 2.49,
        rating: 4.5,
        reviews: 76,
        image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg",
        category: "Vegetables",
        isNew: false,
        isFeatured: true,
        stock: 54
      },
      {
        id: "9",
        name: "Farm Fresh Broccoli",
        price: 2.29,
        originalPrice: null,
        rating: 4.5,
        reviews: 27,
        image: "https://images.pexels.com/photos/1707918/pexels-photo-1707918.jpeg",
        category: "Vegetables",
        isNew: true,
        isFeatured: false,
        stock: 38
      }
    ]
  }
}

export default function CategoryPage() {
  const { id } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  
  const category = categoryData[id as keyof typeof categoryData]
  
  if (!category) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/categories">Browse Categories</Link>
        </Button>
      </div>
    )
  }
  
  const filteredProducts = category.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })
  
  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          <Home className="h-4 w-4 inline-block mr-1" />
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/categories" className="hover:text-primary transition-colors">
          Categories
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{category.name}</span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
        
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your search.</p>
        </div>
      )}
    </div>
  )
}