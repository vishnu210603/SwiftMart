"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from '@/hooks/use-toast'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  tax: number
  shipping: number
  total: number
  applyPromoCode: (code: string) => boolean
  promoDiscount: number
  appliedPromoCode: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null)
  
  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedPromo = localStorage.getItem('promoCode')
    const savedDiscount = localStorage.getItem('promoDiscount')
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage')
      }
    }
    
    if (savedPromo) {
      setAppliedPromoCode(savedPromo)
    }
    
    if (savedDiscount) {
      setPromoDiscount(Number(savedDiscount))
    }
  }, [])
  
  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  
  // Save promo to localStorage
  useEffect(() => {
    if (appliedPromoCode) {
      localStorage.setItem('promoCode', appliedPromoCode)
      localStorage.setItem('promoDiscount', promoDiscount.toString())
    } else {
      localStorage.removeItem('promoCode')
      localStorage.removeItem('promoDiscount')
    }
  }, [appliedPromoCode, promoDiscount])
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1 // 10% tax
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 15) : 0 // Free shipping over $100
  const total = subtotal + tax + shipping - promoDiscount
  
  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        // Item exists, update quantity
        const updatedCart = prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity } 
            : cartItem
        )
        toast({
          title: "Cart updated",
          description: `${item.name} quantity updated to ${existingItem.quantity + item.quantity}`,
        })
        return updatedCart
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${item.name} added to your cart`,
        })
        return [...prevCart, item]
      }
    })
  }
  
  const removeFromCart = (id: string) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.id === id)
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.name} removed from your cart`,
        })
      }
      return prevCart.filter(item => item.id !== id)
    })
  }
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }
  
  const clearCart = () => {
    setCart([])
    setPromoDiscount(0)
    setAppliedPromoCode(null)
  }
  
  // Mock promo codes
  const promoCodes = {
    'WELCOME10': 10,
    'SAVE20': 20,
    'FREESHIP': 15,
  }
  
  const applyPromoCode = (code: string) => {
    const upperCode = code.toUpperCase()
    
    // Check if the code is valid
    if (promoCodes[upperCode as keyof typeof promoCodes]) {
      const discount = promoCodes[upperCode as keyof typeof promoCodes]
      setPromoDiscount(discount)
      setAppliedPromoCode(upperCode)
      toast({
        title: "Promo code applied",
        description: `Discount of $${discount} applied to your cart`,
      })
      return true
    }
    
    toast({
      title: "Invalid promo code",
      description: "The promo code you entered is invalid",
      variant: "destructive",
    })
    return false
  }
  
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    shipping,
    total,
    applyPromoCode,
    promoDiscount,
    appliedPromoCode
  }
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}