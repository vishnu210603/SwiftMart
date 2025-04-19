"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from '@/hooks/use-toast'

type User = {
  id: string
  name: string
  email: string
  addresses: Address[]
}

export type Address = {
  id: string
  type: string
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  addAddress: (address: Omit<Address, 'id'>) => void
  updateAddress: (id: string, address: Omit<Address, 'id'>) => void
  removeAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (e) {
        console.error('Failed to parse user from localStorage')
      }
    }
  }, [])
  
  // Mock users database
  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123', // In a real app, this would be hashed
      addresses: [
        {
          id: '1',
          type: 'Home',
          name: 'John Doe',
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'USA',
          isDefault: true
        }
      ]
    }
  ]
  
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const foundUser = users.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      // Remove password from user object
      const { password: _, ...userWithoutPassword } = foundUser
      
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      })
      
      return true
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    })
    
    return false
  }
  
  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if user already exists
    const userExists = users.some(u => u.email === email)
    
    if (userExists) {
      toast({
        title: "Signup failed",
        description: "Email already in use",
        variant: "destructive",
      })
      return false
    }
    
    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      addresses: []
    }
    
    // In a real app, you would save the user to your database
    // and hash the password
    
    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(newUser))
    
    toast({
      title: "Signup successful",
      description: `Welcome, ${name}!`,
    })
    
    return true
  }
  
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }
  
  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!user) return
    
    const newAddress = {
      ...address,
      id: Date.now().toString(),
    }
    
    // If this is the first address or marked as default, set all others to non-default
    const updatedAddresses = address.isDefault
      ? user.addresses.map(addr => ({ ...addr, isDefault: false }))
      : [...user.addresses]
    
    updatedAddresses.push(newAddress)
    
    const updatedUser = {
      ...user,
      addresses: updatedAddresses
    }
    
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    toast({
      title: "Address added",
      description: "Your new address has been added",
    })
  }
  
  const updateAddress = (id: string, address: Omit<Address, 'id'>) => {
    if (!user) return
    
    let updatedAddresses = [...user.addresses]
    
    // If this address is being set as default, unset other defaults
    if (address.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: false
      }))
    }
    
    // Update the specific address
    updatedAddresses = updatedAddresses.map(addr => 
      addr.id === id ? { ...address, id } : addr
    )
    
    const updatedUser = {
      ...user,
      addresses: updatedAddresses
    }
    
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    toast({
      title: "Address updated",
      description: "Your address has been updated",
    })
  }
  
  const removeAddress = (id: string) => {
    if (!user) return
    
    const updatedAddresses = user.addresses.filter(addr => addr.id !== id)
    
    // If we removed the default address and have other addresses, make another one default
    if (user.addresses.find(addr => addr.id === id)?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true
    }
    
    const updatedUser = {
      ...user,
      addresses: updatedAddresses
    }
    
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    toast({
      title: "Address removed",
      description: "Your address has been removed",
    })
  }
  
  const setDefaultAddress = (id: string) => {
    if (!user) return
    
    const updatedAddresses = user.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }))
    
    const updatedUser = {
      ...user,
      addresses: updatedAddresses
    }
    
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    toast({
      title: "Default address updated",
      description: "Your default address has been updated",
    })
  }
  
  const value = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}