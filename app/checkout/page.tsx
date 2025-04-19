"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { CheckoutSteps } from '@/components/checkout/checkout-steps'
import { AddressForm } from '@/components/checkout/address-form'
import { PaymentMethod } from '@/components/checkout/payment-method'
import { OrderSummary } from '@/components/checkout/order-summary'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, subtotal, tax, shipping, total, promoDiscount, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('upi')
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)
  
  // Redirect to cart if the cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart')
    }
  }, [cart, router])
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])
  
  // Find the default address
  useEffect(() => {
    if (user && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault)
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id)
      } else {
        setSelectedAddressId(user.addresses[0].id)
      }
    }
  }, [user])
  
  const handleNextStep = () => {
    if (currentStep === 1 && !selectedAddressId) {
      return
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }
  
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const handlePlaceOrder = async () => {
    setIsProcessingOrder(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear cart and redirect to success page
    clearCart()
    router.push('/checkout/success?orderId=SW' + Math.floor(Math.random() * 100000))
  }
  
  return (
    <div className="container py-16 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardContent className="p-6">
              <CheckoutSteps currentStep={currentStep} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              {currentStep === 1 && (
                <AddressForm 
                  selectedAddressId={selectedAddressId}
                  setSelectedAddressId={setSelectedAddressId}
                />
              )}
              
              {currentStep === 2 && (
                <PaymentMethod 
                  selectedMethod={paymentMethod}
                  setSelectedMethod={setPaymentMethod}
                />
              )}
              
              {currentStep === 3 && (
                <OrderSummary 
                  cart={cart}
                  subtotal={subtotal}
                  tax={tax}
                  shipping={shipping}
                  promoDiscount={promoDiscount}
                  total={total}
                  selectedAddressId={selectedAddressId}
                  paymentMethod={paymentMethod}
                />
              )}
              
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 3 ? (
                  <Button onClick={handleNextStep} disabled={currentStep === 1 && !selectedAddressId}>
                    Continue
                  </Button>
                ) : (
                  <Button 
                    onClick={handlePlaceOrder} 
                    disabled={isProcessingOrder}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isProcessingOrder ? 'Processing...' : 'Place Order'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="flex-1">
                      {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}