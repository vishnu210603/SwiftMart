import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GetStartedCTA() {
  return (
    <section className="container py-16">
      <div className="bg-muted rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Download Our App
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Shop anytime, anywhere with our mobile app. Get exclusive app-only deals and faster checkout.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle2 className="text-primary h-5 w-5 mr-2" />
                <span>Faster checkout with saved addresses</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="text-primary h-5 w-5 mr-2" />
                <span>Real-time order tracking</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="text-primary h-5 w-5 mr-2" />
                <span>Exclusive mobile-only discounts</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="text-primary h-5 w-5 mr-2" />
                <span>Personalized recommendations</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-16" asChild>
                <Link href="/app/android">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 7V17C4 19.7614 6.23858 22 9 22H14C16.7614 22 19 19.7614 19 17V7C19 4.23858 16.7614 2 14 2H9C6.23858 2 4 4.23858 4 7Z" /><path d="M10 22V2" /></svg>
                  Get it on Android
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-16" asChild>
                <Link href="/app/ios">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m15.5 9-2.66-2.37a.55.55 0 0 0-.76.05l-1.5 1.7" /><path d="m10.24 13.9-2.74.7a.55.55 0 0 0-.26.75l.8 1.3" /><path d="m14.5 16.5 2.4 1.8a.55.55 0 0 0 .8-.2l.7-1.5" /></svg>
                  Download on iOS
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative h-[400px] md:h-auto">
            <Image 
              src="https://images.pexels.com/photos/6169/woman-hand-smartphone-desk.jpg" 
              alt="Mobile app"
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}