"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const promoItems = [
  {
    id: '1',
    title: "Up to 50% Off Fresh Fruits",
    description: "Enjoy summer freshness with our discount on seasonal fruits",
    image: "https://images.pexels.com/photos/1132040/pexels-photo-1132040.jpeg",
    url: "/deals/summer-fruits"
  },
  {
    id: '2',
    title: "Free Delivery on First Order",
    description: "New customers get free delivery on their first purchase",
    image: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg",
    url: "/new-customer"
  },
  {
    id: '3',
    title: "Organic Vegetables Sale",
    description: "Eat healthy with 30% off on organic vegetables",
    image: "https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg",
    url: "/deals/organic"
  }
]

export function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === promoItems.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  const currentPromo = promoItems[currentIndex]
  
  return (
    <section className="bg-muted py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
              Special Offer
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold transition-all duration-300">
              {currentPromo.title}
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-md mx-auto md:mx-0 transition-all duration-300">
              {currentPromo.description}
            </p>
            
            <Button size="lg" asChild>
              <Link href={currentPromo.url}>
                View Offers
              </Link>
            </Button>
            
            <div className="flex justify-center md:justify-start space-x-2 pt-4">
              {promoItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-primary/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-lg aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src={currentPromo.image}
              alt={currentPromo.title}
              fill
              className="object-cover transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}