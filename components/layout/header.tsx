"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { 
  Sun, 
  Moon, 
  ShoppingCart, 
  Menu, 
  Search, 
  User,
  LogIn,
  Home
} from 'lucide-react'
import { UserAuthDialog } from '@/components/auth/user-auth-dialog'

export function Header() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const { cart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b' : 'bg-transparent'
      }`}>
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl hidden md:inline-block">SwiftMart</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/categories" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === '/categories' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Categories
              </Link>
              <Link 
                href="/deals" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === '/deals' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Deals
              </Link>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center w-full max-w-sm mx-4">
            <Input
              type="search"
              placeholder="Search products..."
              className="h-9 md:w-[300px] lg:w-[400px]"
            />
            <Button variant="ghost" size="icon" className="ml-2">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-2"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            {isAuthenticated ? (
              <Button variant="ghost" size="icon" className="relative">
                <Link href="/account">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsAuthOpen(true)}>
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="px-2 py-6 flex flex-col h-full">
                  <Link href="/" className="flex items-center mb-6">
                    <ShoppingCart className="h-6 w-6 text-primary mr-2" />
                    <span className="font-bold text-xl">SwiftMart</span>
                  </Link>
                  <div className="mb-4">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="h-9 w-full"
                    />
                  </div>
                  <nav className="flex flex-col gap-4">
                    <Link href="/" className="flex items-center text-sm font-medium">
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Link>
                    <Link href="/categories" className="flex items-center text-sm font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
                      Categories
                    </Link>
                    <Link href="/deals" className="flex items-center text-sm font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                      Deals
                    </Link>
                  </nav>
                  <Separator className="my-4" />
                  <div className="mt-auto">
                    {isAuthenticated ? (
                      <Link href="/account">
                        <Button variant="outline" className="w-full mb-2">
                          <User className="mr-2 h-4 w-4" />
                          My Account
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" className="w-full mb-2" onClick={() => {
                        setIsAuthOpen(true);
                      }}>
                        <LogIn className="mr-2 h-4 w-4" />
                        Login / Register
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <UserAuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </>
  )
}