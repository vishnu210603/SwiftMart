"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAuth } from '@/context/auth-context'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Address } from '@/context/auth-context'
import { Plus } from 'lucide-react'

const addressSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  street: z.string().min(5, { message: "Street address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  zip: z.string().min(4, { message: "ZIP code must be at least 4 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
  type: z.string().min(1, { message: "Address type is required" }),
  isDefault: z.boolean(),
})

type AddressFormValues = z.infer<typeof addressSchema>

interface AddressFormProps {
  selectedAddressId: string | null
  setSelectedAddressId: (id: string | null) => void
}

export function AddressForm({ selectedAddressId, setSelectedAddressId }: AddressFormProps) {
  const { user, addAddress } = useAuth()
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      type: "Home",
      isDefault: false,
    },
  })
  
  const watchIsDefault = watch("isDefault")
  
  const handleAddAddress = (data: AddressFormValues) => {
    addAddress(data)
    reset()
    setIsAddAddressOpen(false)
  }
  
  if (!user) {
    return (
      <div className="text-center p-8">
        <p>Please log in to continue with checkout.</p>
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Shipping Address</h2>
        <Dialog open={isAddAddressOpen} onOpenChange={setIsAddAddressOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>
                Enter your address details below.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit(handleAddAddress)} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="type">Address Type</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      {...register("type")}
                      type="radio"
                      id="home"
                      value="Home"
                      className="mr-2"
                      defaultChecked
                    />
                    <Label htmlFor="home">Home</Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      {...register("type")}
                      type="radio"
                      id="work"
                      value="Work"
                      className="mr-2"
                    />
                    <Label htmlFor="work">Work</Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      {...register("type")}
                      type="radio"
                      id="other"
                      value="Other"
                      className="mr-2"
                    />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  {...register("street")}
                  aria-invalid={errors.street ? "true" : "false"}
                />
                {errors.street && (
                  <p className="text-sm text-destructive">{errors.street.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("city")}
                    aria-invalid={errors.city ? "true" : "false"}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    {...register("state")}
                    aria-invalid={errors.state ? "true" : "false"}
                  />
                  {errors.state && (
                    <p className="text-sm text-destructive">{errors.state.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    {...register("zip")}
                    aria-invalid={errors.zip ? "true" : "false"}
                  />
                  {errors.zip && (
                    <p className="text-sm text-destructive">{errors.zip.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    {...register("country")}
                    aria-invalid={errors.country ? "true" : "false"}
                  />
                  {errors.country && (
                    <p className="text-sm text-destructive">{errors.country.message}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isDefault" 
                  checked={watchIsDefault}
                  onCheckedChange={(checked) => setValue("isDefault", checked as boolean)}
                />
                <Label htmlFor="isDefault">Set as default shipping address</Label>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddAddressOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Address</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {user.addresses.length > 0 ? (
        <RadioGroup 
          value={selectedAddressId || undefined} 
          onValueChange={setSelectedAddressId}
          className="space-y-4"
        >
          {user.addresses.map((address) => (
            <label
              key={address.id}
              className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedAddressId === address.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <RadioGroupItem value={address.id} className="mt-1" id={`address-${address.id}`} />
              <div className="ml-3">
                <div className="flex items-center">
                  <span className="font-medium">{address.name}</span>
                  <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
                    {address.type}
                  </span>
                  {address.isDefault && (
                    <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="text-muted-foreground mt-1">
                  {address.street}, {address.city}, {address.state} {address.zip}, {address.country}
                </div>
              </div>
            </label>
          ))}
        </RadioGroup>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">You don't have any saved addresses yet.</p>
          <Button onClick={() => setIsAddAddressOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </div>
      )}
    </div>
  )
}