"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/product/product-card'

const deals = {
  trending: [
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
    },
    {
      id: "16",
      name: "Premium Coffee Beans",
      price: 8.99,
      originalPrice: 12.99,
      rating: 4.8,
      reviews: 93,
      image: "https://images.pexels.com/photos/2215295/pexels-photo-2215295.jpeg",
      category: "groceries",
      isNew: false,
      isFeatured: false,
      stock: 47
    }
  ],
  bestDeals: [
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
      id: "7",
      name: "Sparkling Water",
      price: 1.29,
      originalPrice: 1.79,
      rating: 4.3,
      reviews: 68,
      image: "https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg",
      category: "beverages",
      isNew: false,
      isFeatured: false,
      stock: 120
    }
  ],
  clearance: [
    {
      id: "10",
      name: "Artisan Cheese Selection",
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.8,
      reviews: 34,
      image: "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg",
      category: "dairy",
      isNew: true,
      isFeatured: true,
      stock: 25
    },
    {
      id: "12",
      name: "Organic Honey",
      price: 8.49,
      originalPrice: 9.99,
      rating: 4.9,
      reviews: 31,
      image: "https://images.pexels.com/photos/671956/pexels-photo-671956.jpeg",
      category: "groceries",
      isNew: true,
      isFeatured: true,
      stock: 43
    }
  ]
}

const promos = [
  {
    id: 1,
    title: "Summer Fresh Sale",
    description: "Get up to 50% off on fresh fruits and vegetables",
    image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg",
    discount: "50% OFF",
    validUntil: "2024-08-31"
  },
  {
    id: 2,
    title: "Dairy Week Special",
    description: "Buy 2 get 1 free on all dairy products",
    image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg",
    discount: "BUY 2 GET 1",
    validUntil: "2024-07-15"
  }
]

export default function DealsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  return (
    <div className="container py-8 md:py-12">
      {/* Featured Promos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {promos.map((promo) => (
          <Card key={promo.id} className="overflow-hidden">
            <div className="relative h-[200px] md:h-[300px]">
              <Image
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <Badge className="bg-primary mb-2">{promo.discount}</Badge>
                <h2 className="text-2xl font-bold mb-2">{promo.title}</h2>
                <p className="text-white/80 mb-2">{promo.description}</p>
                <p className="text-sm">Valid until {new Date(promo.validUntil).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Deals Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Today's Deals</h1>
          <p className="text-muted-foreground">Discover our best offers and savings</p>
        </div>
        
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="trending" className="space-y-8">
        <TabsList>
          <TabsTrigger value="trending">Trending Deals</TabsTrigger>
          <TabsTrigger value="bestDeals">Best Deals</TabsTrigger>
          <TabsTrigger value="clearance">Clearance</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(deals).map(([category, products]) => (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ))}
        </div>
      </Tabs>
    </div>
  )
}