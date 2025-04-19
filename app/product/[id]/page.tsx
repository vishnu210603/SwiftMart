"use client"

import { useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Clock, 
  Heart,
  Home,
  Minus,
  Plus,
  ShoppingCart, 
  Star,
  Truck
} from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { ProductImageGallery } from '@/components/product/product-image-gallery'
import { RelatedProducts } from '@/components/product/related-products'

// Mock product database
const products = {
  "1": {
    id: "1",
    name: "Organic Bananas",
    description: "Naturally sweet and nutritious organic bananas. Perfect for snacking, baking, or adding to your morning smoothie. Our bananas are sourced from certified organic farms committed to sustainable farming practices.",
    price: 3.99,
    originalPrice: 4.99,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg",
      "https://images.pexels.com/photos/1166648/pexels-photo-1166648.jpeg",
      "https://images.pexels.com/photos/2316466/pexels-photo-2316466.jpeg"
    ],
    category: "Fruits",
    isNew: false,
    isFeatured: true,
    stock: 48,
    nutritionalInfo: {
      calories: 105,
      protein: "1.3g",
      fat: "0.4g",
      carbs: "27g",
      fiber: "3.1g"
    },
    deliveryEstimate: "Same day delivery",
    specifications: [
      { name: "Origin", value: "Ecuador" },
      { name: "Type", value: "Cavendish" },
      { name: "Organic", value: "Yes" },
      { name: "Storage", value: "Room temperature, away from direct sunlight" }
    ]
  },
  "2": {
    id: "2",
    name: "Fresh Avocados",
    description: "Creamy, ripe avocados perfect for guacamole, salads, or spreading on toast. Rich in healthy fats and nutrients, our avocados are carefully selected at the optimal ripeness for delivery to your door.",
    price: 6.99,
    originalPrice: 8.99,
    rating: 4.7,
    reviews: 98,
    images: [
      "https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg",
      "https://images.pexels.com/photos/2228553/pexels-photo-2228553.jpeg",
      "https://images.pexels.com/photos/5945755/pexels-photo-5945755.jpeg"
    ],
    category: "Fruits",
    isNew: false,
    isFeatured: true,
    stock: 32,
    nutritionalInfo: {
      calories: 240,
      protein: "3g",
      fat: "22g",
      carbs: "12g",
      fiber: "10g"
    },
    deliveryEstimate: "Same day delivery",
    specifications: [
      { name: "Origin", value: "Mexico" },
      { name: "Type", value: "Hass" },
      { name: "Organic", value: "Yes" },
      { name: "Storage", value: "Refrigerate when ripe" }
    ]
  },
}

export default function ProductPage() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  
  const product = products[id as keyof typeof products]
  
  if (!product) {
    notFound()
  }
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  }
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity
    })
  }
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0
  
  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          <Home className="h-3.5 w-3.5 inline-block mr-1" />
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/categories" className="hover:text-primary transition-colors">
          Categories
        </Link>
        <span className="mx-2">/</span>
        <Link 
          href={`/categories/${product.category.toLowerCase()}`}
          className="hover:text-primary transition-colors"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium truncate max-w-[180px]">
          {product.name}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <ProductImageGallery images={product.images} productName={product.name} />
        
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="text-primary border-primary">
                {product.category}
              </Badge>
              {product.isNew && (
                <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
              )}
              {discount > 0 && (
                <Badge variant="destructive">-{discount}%</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="flex items-center mt-2 space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) 
                      ? 'fill-primary text-primary' 
                      : (i < product.rating 
                        ? 'fill-primary/50 text-primary/50' 
                        : 'fill-muted text-muted')
                  }`} 
                />
              ))}
              <span className="ml-1 text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {discount > 0 && (
              <span className="text-sm font-medium text-green-600">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>
          
          <p className="text-muted-foreground">
            {product.description}
          </p>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-none" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-none"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {product.stock} item{product.stock !== 1 ? 's' : ''} available
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Button className="flex-1" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Delivery</p>
                <p className="text-sm text-muted-foreground">{product.deliveryEstimate}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Free Returns</p>
                <p className="text-sm text-muted-foreground">Within 30 days for unused items</p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="details">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="nutrition" className="flex-1">Nutrition</TabsTrigger>
              <TabsTrigger value="specifications" className="flex-1">Specifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-4">
              <p className="text-muted-foreground">
                {product.description}
              </p>
            </TabsContent>
            
            <TabsContent value="nutrition" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Calories</div>
                  <div className="font-medium">{product.nutritionalInfo.calories}</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Protein</div>
                  <div className="font-medium">{product.nutritionalInfo.protein}</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Fat</div>
                  <div className="font-medium">{product.nutritionalInfo.fat}</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Carbs</div>
                  <div className="font-medium">{product.nutritionalInfo.carbs}</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Fiber</div>
                  <div className="font-medium">{product.nutritionalInfo.fiber}</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="pt-4">
              <div className="space-y-3">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex">
                    <div className="w-1/3 text-muted-foreground">{spec.name}</div>
                    <div className="w-2/3 font-medium">{spec.value}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} category={product.category} />
    </div>
  )
}