"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { AlertCircle, Minus, Plus, ShoppingCart, Trash } from 'lucide-react'
import { UserAuthDialog } from '@/components/auth/user-auth-dialog'
import { CartItem } from '@/context/cart-context'

export default function CartPage() {
  const router = useRouter()
  const { cart, updateQuantity, removeFromCart, subtotal, tax, shipping, total, applyPromoCode, promoDiscount, appliedPromoCode } = useCart()
  const { isAuthenticated } = useAuth()
  const [promoCode, setPromoCode] = useState('')
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity)
  }
  
  const handleRemoveItem = (id: string) => {
    removeFromCart(id)
  }
  
  const handleApplyPromoCode = () => {
    if (promoCode.trim() === '') return
    
    applyPromoCode(promoCode)
    setPromoCode('')
  }
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      setIsAuthOpen(true)
      return
    }
    
    router.push('/checkout')
  }
  
  if (cart.length === 0) {
    return (
      <div className="container py-16 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <Card className="text-center py-16">
          <CardContent className="flex flex-col items-center justify-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button size="lg" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="container py-16 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground mb-4">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Subtotal</div>
              </div>
              
              <Separator className="mb-6" />
              
              {cart.map((item) => (
                <CartItemRow 
                  key={item.id} 
                  item={item} 
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </CardContent>
            <CardFooter className="px-6 py-4 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex">
                <Button variant="outline" asChild>
                  <Link href="/">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              
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
                    <span>Discount ({appliedPromoCode})</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyPromoCode}>
                    Apply
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Available promo codes: WELCOME10, SAVE20, FREESHIP
                </div>
                
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
                
                <div className="flex items-center justify-center text-xs text-muted-foreground">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Secure checkout
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <UserAuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </div>
  )
}

interface CartItemRowProps {
  item: CartItem
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  return (
    <div className="grid grid-cols-12 items-center py-4 border-b border-border">
      {/* Product info */}
      <div className="col-span-6 flex items-center">
        <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
          <Image 
            src={item.image} 
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-4">
          <Link href={`/product/${item.id}`} className="font-medium hover:text-primary transition-colors">
            {item.name}
          </Link>
        </div>
      </div>
      
      {/* Price */}
      <div className="col-span-2 text-center">
        ${item.price.toFixed(2)}
      </div>
      
      {/* Quantity */}
      <div className="col-span-2 flex justify-center">
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-none" 
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <span className="w-8 text-center text-sm">{item.quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-none"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>
      
      {/* Subtotal */}
      <div className="col-span-2 text-center flex items-center justify-between">
        <span className="w-full text-center font-medium">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => onRemove(item.id)}
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  )
}