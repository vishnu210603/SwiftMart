"use client"

import { useState } from 'react'
import Image from 'next/image'

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    
    setZoomPosition({ x, y })
  }
  
  return (
    <div className="space-y-4">
      {/* Main image */}
      <div 
        className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image 
          src={images[selectedIndex]} 
          alt={`${productName} - Image ${selectedIndex + 1}`}
          fill
          className={`object-cover transition-transform duration-200 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={isZoomed ? {
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
          } : undefined}
          priority
        />
      </div>
      
      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-1">
        {images.map((src, index) => (
          <button
            key={index}
            className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
              index === selectedIndex 
                ? 'ring-2 ring-primary ring-offset-2' 
                : 'ring-1 ring-muted hover:ring-primary/50'
            }`}
            onClick={() => setSelectedIndex(index)}
          >
            <Image 
              src={src} 
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}