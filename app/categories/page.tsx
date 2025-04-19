"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Search, SlidersHorizontal } from 'lucide-react'

const categories = [
  {
    id: 'groceries',
    name: 'Groceries',
    image: 'https://images.pexels.com/photos/1132046/pexels-photo-1132046.jpeg',
    productCount: 1254,
    description: 'Fresh groceries and everyday essentials'
  },
  {
    id: 'vegetables',
    name: 'Fresh Vegetables',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg',
    productCount: 842,
    description: 'Farm-fresh vegetables delivered daily'
  },
  {
    id: 'fruits',
    name: 'Fresh Fruits',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
    productCount: 763,
    description: 'Sweet and juicy fruits from local farms'
  },
  {
    id: 'beverages',
    name: 'Beverages',
    image: 'https://images.pexels.com/photos/1292862/pexels-photo-1292862.jpeg',
    productCount: 512,
    description: 'Refreshing drinks and beverages'
  },
  {
    id: 'dairy',
    name: 'Dairy & Eggs',
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
    productCount: 329,
    description: 'Fresh milk, cheese, eggs, and more'
  },
  {
    id: 'snacks',
    name: 'Snacks',
    image: 'https://images.pexels.com/photos/1987042/pexels-photo-1987042.jpeg',
    productCount: 621,
    description: 'Delicious snacks for any time'
  },
  {
    id: 'bakery',
    name: 'Bakery',
    image: 'https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg',
    productCount: 213,
    description: 'Fresh breads and pastries'
  },
  {
    id: 'meat',
    name: 'Meat & Seafood',
    image: 'https://images.pexels.com/photos/929137/pexels-photo-929137.jpeg',
    productCount: 345,
    description: 'Quality meat and fresh seafood'
  }
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Browse all categories and find what you need</p>
        </div>
        
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{category.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {category.description}
                </p>
                <p className="text-sm font-medium">
                  {category.productCount} Products
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}