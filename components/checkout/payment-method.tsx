"use client"

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { 
  CreditCard, 
  Wallet, 
  CircleDollarSign,
  ShieldCheck
} from 'lucide-react'

interface PaymentMethodProps {
  selectedMethod: string
  setSelectedMethod: (method: string) => void
}

export function PaymentMethod({ selectedMethod, setSelectedMethod }: PaymentMethodProps) {
  const { register } = useForm()
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
      
      <RadioGroup 
        value={selectedMethod} 
        onValueChange={setSelectedMethod}
        className="space-y-4"
      >
        {/* UPI Payment */}
        <div className={`border rounded-lg transition-colors ${
          selectedMethod === 'upi' 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-muted-foreground'
        }`}>
          <label 
            className="flex items-start p-4 cursor-pointer"
            htmlFor="payment-upi"
          >
            <RadioGroupItem value="upi" id="payment-upi" className="mt-1" />
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-blue-500" />
                <span className="font-medium">UPI</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Pay using UPI apps like Google Pay, PhonePe, Paytm
              </p>
              
              {selectedMethod === 'upi' && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input
                      id="upi-id"
                      placeholder="username@bankname"
                      {...register("upiId")}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter your UPI ID in the format username@bankname
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md flex items-center text-sm">
                    <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
                    Your UPI ID is secure and used only for this transaction
                  </div>
                </div>
              )}
            </div>
          </label>
        </div>
        
        {/* Credit/Debit Card */}
        <div className={`border rounded-lg transition-colors ${
          selectedMethod === 'card' 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-muted-foreground'
        }`}>
          <label 
            className="flex items-start p-4 cursor-pointer"
            htmlFor="payment-card"
          >
            <RadioGroupItem value="card" id="payment-card" className="mt-1" />
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
                <span className="font-medium">Credit / Debit Card</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Pay using Visa, Mastercard, RuPay or other cards
              </p>
              
              {selectedMethod === 'card' && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      {...register("cardNumber")}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-expiry">Expiry Date</Label>
                      <Input
                        id="card-expiry"
                        placeholder="MM/YY"
                        {...register("cardExpiry")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-cvv">CVV</Label>
                      <Input
                        id="card-cvv"
                        placeholder="123"
                        type="password"
                        maxLength={3}
                        {...register("cardCvv")}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      {...register("cardName")}
                    />
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-md flex items-center text-sm">
                    <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
                    Your card information is secure and encrypted
                  </div>
                </div>
              )}
            </div>
          </label>
        </div>
        
        {/* Cash on Delivery */}
        <div className={`border rounded-lg transition-colors ${
          selectedMethod === 'cod' 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-muted-foreground'
        }`}>
          <label 
            className="flex items-start p-4 cursor-pointer"
            htmlFor="payment-cod"
          >
            <RadioGroupItem value="cod" id="payment-cod" className="mt-1" />
            <div className="ml-3">
              <div className="flex items-center">
                <CircleDollarSign className="h-5 w-5 mr-2 text-green-500" />
                <span className="font-medium">Cash on Delivery</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Pay with cash when your order is delivered
              </p>
              
              {selectedMethod === 'cod' && (
                <div className="mt-4">
                  <div className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 p-3 rounded-md flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                    Cash on delivery is subject to availability in your area
                  </div>
                </div>
              )}
            </div>
          </label>
        </div>
      </RadioGroup>
    </div>
  )
}