import { AnnouncementBar } from '@/components/announcement-bar'
import { Hero } from '@/components/hero'
import { PainSection } from '@/components/pain-section'
import { SolutionSection } from '@/components/solution-section'
import { GallerySection } from '@/components/gallery-section'
import { BeforeAfter } from '@/components/before-after'
import { FeaturesSection } from '@/components/features-section'
import { HowToSection } from '@/components/how-to-section'
import { BenefitsSection } from '@/components/benefits-section'
import { Testimonials } from '@/components/testimonials'
import { OfferSection } from '@/components/offer-section'
import { OrderForm } from '@/components/order-form'
import { GuaranteeSection } from '@/components/guarantee-section'
import { FaqSection } from '@/components/faq-section'
import { SiteFooter } from '@/components/site-footer'
import { StickyCta } from '@/components/sticky-cta'
import { SocialProofToast } from '@/components/social-proof-toast'
import { WhatsAppFloat } from '@/components/whatsapp-float'

export default function Page() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <AnnouncementBar />
      <Hero />
      <PainSection />
      <SolutionSection />
      <GallerySection />
      <BeforeAfter />
      <FeaturesSection />
      <HowToSection />
      <BenefitsSection />
      <Testimonials />
      <OfferSection />
      <OrderForm />
      <GuaranteeSection />
      <FaqSection />
      <SiteFooter />
      <StickyCta />
      <SocialProofToast />
      <WhatsAppFloat />
    </main>
  )
}
