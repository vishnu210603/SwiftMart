"use client"

import { useMemo } from 'react'
import { ProductCard } from './product-card'

// Mock products database - in a real app this would come from an API
const allProducts = [
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
    id: "3",
    name: "Whole Milk",
    price: 2.49,
    originalPrice: null,
    rating: 4.9,
    reviews: 156,
    image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg",
    category: "Dairy",
    isNew: false,
    isFeatured: true,
    stock: 76
  },
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
    id: "8",
    name: "Chocolate Chip Cookies",
    price: 4.49,
    originalPrice: null,
    rating: 4.7,
    reviews: 94,
    image: "https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg",
    category: "Snacks",
    isNew: true,
    isFeatured: true,
    stock: 42
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
  },
  {
    id: "17",
    name: "Greek Yogurt",
    price: 1.49,
    originalPrice: 1.99,
    rating: 4.6,
    reviews: 72,
    image: "https://images.pexels.com/photos/373882/pexels-photo-373882.jpeg",
    category: "Dairy",
    isNew: false,
    isFeatured: true,
    stock: 89
  }
]

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  // Find related products in the same category, excluding the current product
  const relatedProducts = useMemo(() => {
    return allProducts
      .filter(product => 
        product.id !== currentProductId && 
        product.category.toLowerCase() === category.toLowerCase()
      )
      .slice(0, 4)
  }, [currentProductId, category])
  
  if (relatedProducts.length === 0) {
    return null
  }
  
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}