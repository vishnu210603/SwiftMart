"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Clock, PackageCheck, Package, Truck, MapPin } from 'lucide-react'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [currentStep, setCurrentStep] = useState(1)
  
  useEffect(() => {
    // Simulate order progress for demo purposes
    const timer = setTimeout(() => {
      if (currentStep < 2) {
        setCurrentStep(currentStep + 1)
      }
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [currentStep])
  
  // Get estimated delivery date (3 days from now)
  const estimatedDeliveryDate = new Date()
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3)
  const formattedDeliveryDate = estimatedDeliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  
  return (
    <div className="container py-16 max-w-4xl">
      <Card className="overflow-hidden">
        <div className="bg-primary/10 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Thank you for your order. We've received your order and will begin processing it right away.
          </p>
        </div>
        
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold">Order Details</h2>
              <p className="text-muted-foreground">Order #{orderId}</p>
              <p className="text-muted-foreground">
                Placed on {new Date().toLocaleDateString()}
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold">Estimated Delivery</h2>
              <p className="text-green-600 font-medium">{formattedDeliveryDate}</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 left-[27px] bottom-0 w-[2px] bg-muted" />
            
            <div className="relative z-10 mb-8 flex items-start">
              <div className={`flex items-center justify-center rounded-full h-14 w-14 mr-4 flex-shrink-0 ${
                currentStep >= 1 ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
              }`}>
                <PackageCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Order Confirmed</h3>
                <p className="text-sm text-muted-foreground">
                  Your order has been received and confirmed
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="relative z-10 mb-8 flex items-start">
              <div className={`flex items-center justify-center rounded-full h-14 w-14 mr-4 flex-shrink-0 ${
                currentStep >= 2 ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
              }`}>
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Order Processed</h3>
                <p className="text-sm text-muted-foreground">
                  Your order is being processed and prepared for shipping
                </p>
                {currentStep >= 2 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            
            <div className="relative z-10 mb-8 flex items-start">
              <div className={`flex items-center justify-center rounded-full h-14 w-14 mr-4 flex-shrink-0 ${
                currentStep >= 3 ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
              }`}>
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Order Shipped</h3>
                <p className="text-sm text-muted-foreground">
                  Your order has been shipped and is on its way
                </p>
              </div>
            </div>
            
            <div className="relative z-10 flex items-start">
              <div className={`flex items-center justify-center rounded-full h-14 w-14 mr-4 flex-shrink-0 ${
                currentStep >= 4 ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
              }`}>
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Delivered</h3>
                <p className="text-sm text-muted-foreground">
                  Expected delivery by {formattedDeliveryDate}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild>
              <Link href="/account/orders">
                View Order
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}