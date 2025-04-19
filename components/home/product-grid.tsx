"use client"

import { useState } from 'react'
import { ProductCard } from '@/components/product/product-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock product data
const products = {
  bestSellers: [
    {
      id: "1",
      name: "Organic Bananas",
      price: 3.99,
      originalPrice: 4.99,
      rating: 4.8,
      reviews: 124,
      image: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg",
      category: "fruits",
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
      category: "fruits",
      isNew: false,
      isFeatured: true,
      stock: 32
    },
    {
      id: "3",
      name: "Whole Milk",
      price: 2.49,
      originalPrice: null,
      rating: 4.9,
      reviews: 156,
      image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg",
      category: "dairy",
      isNew: false,
      isFeatured: true,
      stock: 76
    },
    {
      id: "4",
      name: "Sourdough Bread",
      price: 4.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 87,
      image: "https://images.pexels.com/photos/1756066/pexels-photo-1756066.jpeg",
      category: "bakery",
      isNew: true,
      isFeatured: false,
      stock: 28
    },
    {
      id: "5",
      name: "Organic Carrots",
      price: 1.99,
      originalPrice: 2.49,
      rating: 4.5,
      reviews: 76,
      image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg",
      category: "vegetables",
      isNew: false,
      isFeatured: true,
      stock: 54
    },
    {
      id: "6",
      name: "Free-Range Eggs",
      price: 3.49,
      originalPrice: null,
      rating: 4.8,
      reviews: 112,
      image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg",
      category: "dairy",
      isNew: false,
      isFeatured: true,
      stock: 63
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
    },
    {
      id: "8",
      name: "Chocolate Chip Cookies",
      price: 4.49,
      originalPrice: null,
      rating: 4.7,
      reviews: 94,
      image: "https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg",
      category: "snacks",
      isNew: true,
      isFeatured: true,
      stock: 42
    }
  ],
  newArrivals: [
    {
      id: "9",
      name: "Farm Fresh Broccoli",
      price: 2.29,
      originalPrice: null,
      rating: 4.5,
      reviews: 27,
      image: "https://images.pexels.com/photos/1707918/pexels-photo-1707918.jpeg",
      category: "vegetables",
      isNew: true,
      isFeatured: false,
      stock: 38
    },
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
      id: "11",
      name: "Cold-Pressed Orange Juice",
      price: 4.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 42,
      image: "https://images.pexels.com/photos/158053/fresh-orange-juice-squeezed-refreshing-citrus-158053.jpeg",
      category: "beverages",
      isNew: true,
      isFeatured: false,
      stock: 56
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
    },
    {
      id: "13",
      name: "Vegan Protein Bars",
      price: 6.99,
      originalPrice: null,
      rating: 4.3,
      reviews: 18,
      image: "https://images.pexels.com/photos/8474741/pexels-photo-8474741.jpeg",
      category: "snacks",
      isNew: true,
      isFeatured: false,
      stock: 67
    },
    {
      id: "14",
      name: "Gluten-Free Pasta",
      price: 3.49,
      originalPrice: 3.99,
      rating: 4.4,
      reviews: 23,
      image: "https://images.pexels.com/photos/6287525/pexels-photo-6287525.jpeg",
      category: "groceries",
      isNew: true,
      isFeatured: false,
      stock: 48
    },
    {
      id: "4",
      name: "Sourdough Bread",
      price: 4.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 87,
      image: "https://images.pexels.com/photos/1756066/pexels-photo-1756066.jpeg",
      category: "bakery",
      isNew: true,
      isFeatured: false,
      stock: 28
    },
    {
      id: "8",
      name: "Chocolate Chip Cookies",
      price: 4.49,
      originalPrice: null,
      rating: 4.7,
      reviews: 94,
      image: "https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg",
      category: "snacks",
      isNew: true,
      isFeatured: true,
      stock: 42
    }
  ],
  onSale: [
    {
      id: "15",
      name: "Fresh Strawberries",
      price: 2.99,
      originalPrice: 4.99,
      rating: 4.7,
      reviews: 86,
      image: "https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg",
      category: "fruits",
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
    },
    {
      id: "17",
      name: "Greek Yogurt",
      price: 1.49,
      originalPrice: 1.99,
      rating: 4.6,
      reviews: 72,
      image: "https://images.pexels.com/photos/373882/pexels-photo-373882.jpeg",
      category: "dairy",
      isNew: false,
      isFeatured: true,
      stock: 89
    },
    {
      id: "2",
      name: "Fresh Avocados",
      price: 6.99,
      originalPrice: 8.99,
      rating: 4.7,
      reviews: 98,
      image: "https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg",
      category: "fruits",
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
    },
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
    },
    {
      id: "5",
      name: "Organic Carrots",
      price: 1.99,
      originalPrice: 2.49,
      rating: 4.5,
      reviews: 76,
      image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg",
      category: "vegetables",
      isNew: false,
      isFeatured: true,
      stock: 54
    }
  ]
}

export function ProductGrid() {
  return (
    <Tabs defaultValue="bestSellers">
      <TabsList className="mb-8">
        <TabsTrigger value="bestSellers">Best Sellers</TabsTrigger>
        <TabsTrigger value="newArrivals">New Arrivals</TabsTrigger>
        <TabsTrigger value="onSale">On Sale</TabsTrigger>
      </TabsList>
      
      <TabsContent value="bestSellers" className="mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="newArrivals" className="mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="onSale" className="mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.onSale.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}