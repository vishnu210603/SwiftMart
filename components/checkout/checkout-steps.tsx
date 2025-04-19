import { Check } from 'lucide-react'

interface CheckoutStepsProps {
  currentStep: number
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { id: 1, name: 'Shipping' },
    { id: 2, name: 'Payment' },
    { id: 3, name: 'Review' },
  ]
  
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1 relative">
          <div className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 border
                ${currentStep > step.id 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : currentStep === step.id 
                    ? 'border-primary text-primary' 
                    : 'border-muted bg-muted text-muted-foreground'
                }
              `}
            >
              {currentStep > step.id ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <span 
              className={`text-sm font-medium mt-2 
                ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}
              `}
            >
              {step.name}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div 
              className={`h-0.5 flex-1 mx-2 ${
                currentStep > step.id ? 'bg-primary' : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}