"use client"

import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/context/auth-context'
import { CartItem } from '@/context/cart-context'
import { 
  CreditCard, 
  MapPin, 
  ShieldCheck
} from 'lucide-react'

interface OrderSummaryProps {
  cart: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  promoDiscount: number
  total: number
  selectedAddressId: string | null
  paymentMethod: string
}

export function OrderSummary({ 
  cart, 
  subtotal, 
  tax, 
  shipping, 
  promoDiscount, 
  total,
  selectedAddressId,
  paymentMethod
}: OrderSummaryProps) {
  const { user } = useAuth()
  
  if (!user) return null
  
  const selectedAddress = user.addresses.find(addr => addr.id === selectedAddressId)
  
  const getPaymentMethodDetails = () => {
    switch (paymentMethod) {
      case 'upi':
        return {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>,
          title: 'UPI Payment',
          description: 'Payment will be processed via UPI'
        }
      case 'card':
        return {
          icon: <CreditCard className="h-5 w-5 text-purple-500" />,
          title: 'Credit / Debit Card',
          description: 'Payment will be processed via your card'
        }
      case 'cod':
        return {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10" /><path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h1a2.5 2.5 0 0 1 0 5H4" /><path d="M12 18v2" /><path d="M12 6v2" /></svg>,
          title: 'Cash on Delivery',
          description: 'Pay when your order is delivered'
        }
      default:
        return {
          icon: <CreditCard className="h-5 w-5" />,
          title: 'Payment Method',
          description: 'Select a payment method'
        }
    }
  }
  
  const paymentMethodDetails = getPaymentMethodDetails()
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
      
      <div className="space-y-6">
        {/* Order Items */}
        <div>
          <h3 className="font-medium mb-3">Items in Your Order</h3>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Delivery Address */}
        <div>
          <h3 className="font-medium mb-3">Delivery Address</h3>
          {selectedAddress ? (
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="font-medium">{selectedAddress.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zip}, {selectedAddress.country}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground">
              No address selected
            </div>
          )}
        </div>
        
        <Separator />
        
        {/* Payment Method */}
        <div>
          <h3 className="font-medium mb-3">Payment Method</h3>
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center">
              {paymentMethodDetails.icon}
              <div className="ml-2">
                <p className="font-medium">{paymentMethodDetails.title}</p>
                <p className="text-sm text-muted-foreground">
                  {paymentMethodDetails.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Order Total */}
        <div>
          <h3 className="font-medium mb-3">Order Summary</h3>
          <div className="space-y-2">
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
            
            <Separator className="my-2" />
            
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Secure Checkout Message */}
        <div className="bg-muted/50 p-4 rounded-lg flex items-start">
          <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium">Secure Checkout</p>
            <p className="text-muted-foreground mt-1">
              Your payment information is encrypted and secure. We never store your credit card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}