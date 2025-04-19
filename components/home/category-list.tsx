"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 'groceries',
    name: 'Groceries',
    image: 'https://images.pexels.com/photos/1132046/pexels-photo-1132046.jpeg',
    productCount: 1254
  },
  {
    id: 'vegetables',
    name: 'Fresh Vegetables',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg',
    productCount: 842
  },
  {
    id: 'fruits',
    name: 'Fresh Fruits',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
    productCount: 763
  },
  {
    id: 'beverages',
    name: 'Beverages',
    image: 'https://images.pexels.com/photos/1292862/pexels-photo-1292862.jpeg',
    productCount: 512
  },
  {
    id: 'dairy',
    name: 'Dairy & Eggs',
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
    productCount: 329
  },
  {
    id: 'snacks',
    name: 'Snacks',
    image: 'https://images.pexels.com/photos/1987042/pexels-photo-1987042.jpeg',
    productCount: 621
  },
  {
    id: 'bakery',
    name: 'Bakery',
    image: 'https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg',
    productCount: 213
  },
  {
    id: 'meat',
    name: 'Meat & Seafood',
    image: 'https://images.pexels.com/photos/929137/pexels-photo-929137.jpeg',
    productCount: 345
  }
]

export function CategoryList() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollElement
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons)
      window.addEventListener('resize', checkScrollButtons)
      checkScrollButtons()
      
      return () => {
        scrollElement.removeEventListener('scroll', checkScrollButtons)
        window.removeEventListener('resize', checkScrollButtons)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      const { clientWidth } = scrollElement
      const scrollAmount = clientWidth * 0.8
      scrollElement.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md"
          onClick={() => scroll('left')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
      
      {canScrollRight && (
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md"
          onClick={() => scroll('right')}
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      )}
      
      {/* Scrollable container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4 px-1 -mx-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <Link href={`/categories/${category.id}`} key={category.id}>
            <div className="flex-shrink-0 w-[200px] md:w-[230px] group">
              <div className="relative h-[180px] rounded-lg overflow-hidden">
                <Image 
                  src={category.image} 
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <p className="text-sm opacity-80">{category.productCount} Products</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}