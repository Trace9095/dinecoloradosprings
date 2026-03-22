import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Star, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing — List Your Colorado Springs Restaurant',
  description:
    'Add your Colorado Springs restaurant, brewery, or cafe to our directory. Free basic listing or upgrade to Premium ($99/mo) or Sponsored ($199/mo) for featured placement.',
  openGraph: {
    title: 'Pricing — List Your Colorado Springs Restaurant',
    description:
      'Free, Premium, and Sponsored listing tiers for Colorado Springs restaurants and bars.',
  },
}

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'Get your business found with a basic listing.',
    cta: 'Get Started Free',
    href: '/add-listing?tier=free',
    highlight: false,
    icon: Star,
    features: [
      'Basic listing — name, address, phone, hours',
      'Category and neighborhood listing',
      'Searchable in our directory',
      'Price range display',
      'Link to claim and upgrade anytime',
    ],
  },
  {
    name: 'Premium',
    price: '$99',
    period: '/mo',
    description: 'Featured placement and a complete business profile.',
    cta: 'Get Premium',
    href: '/add-listing?tier=premium',
    highlight: true,
    icon: Zap,
    features: [
      'Everything in Free',
      'Featured placement in category listings',
      'Photo gallery (up to 10 photos)',
      'Website and booking link buttons',
      'Social media links (Instagram)',
      'Full business description',
      'Priority customer support',
      'Silver "Premium" badge',
    ],
  },
  {
    name: 'Sponsored',
    price: '$199',
    period: '/mo',
    description: 'Maximum visibility and top placement in the directory.',
    cta: 'Get Sponsored',
    href: '/add-listing?tier=sponsored',
    highlight: false,
    icon: Star,
    features: [
      'Everything in Premium',
      'Top placement in category and homepage',
      'Gold "Sponsored" badge',
      'Homepage featured section inclusion',
      'Social media promotion from our accounts',
      'Monthly analytics report',
      'Dedicated account manager',
      'Custom call-to-action button',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="pt-20 min-h-[100dvh]">
      <div className="bg-[#161B22] border-b border-[#30363D] py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#E6EDF3] mb-4">
            List Your Colorado Springs Business
          </h1>
          <p className="text-[#8B949E] text-lg">
            Get in front of thousands of Colorado Springs diners searching for
            their next meal. Start free, upgrade when ready.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const Icon = tier.icon
            return (
              <div
                key={tier.name}
                className={`relative flex flex-col bg-[#161B22] rounded-2xl border ${
                  tier.highlight
                    ? 'border-[#D4A853] shadow-lg shadow-[#D4A853]/10'
                    : 'border-[#30363D]'
                } overflow-hidden`}
              >
                {tier.highlight && (
                  <div className="bg-[#D4A853] text-[#0D1117] text-xs font-bold text-center py-2 uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`p-2 rounded-lg ${
                        tier.highlight
                          ? 'bg-[#D4A853]/20'
                          : 'bg-[#1C2333]'
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          tier.highlight ? 'text-[#D4A853]' : 'text-[#8B949E]'
                        }`}
                      />
                    </div>
                    <h2 className="text-xl font-bold text-[#E6EDF3]">
                      {tier.name}
                    </h2>
                  </div>

                  <div className="mb-2">
                    <span className="text-4xl font-bold text-[#E6EDF3]">
                      {tier.price}
                    </span>
                    <span className="text-[#8B949E] text-sm">{tier.period}</span>
                  </div>
                  <p className="text-[#8B949E] text-sm mb-6">
                    {tier.description}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-[#D4A853] flex-shrink-0 mt-0.5" />
                        <span className="text-[#8B949E]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.href}
                    className={`block text-center px-4 py-3 rounded-xl font-semibold text-sm transition-colors min-h-[48px] flex items-center justify-center ${
                      tier.highlight
                        ? 'bg-[#D4A853] hover:bg-[#E8C97A] text-[#0D1117]'
                        : 'bg-[#1C2333] hover:bg-[#30363D] text-[#E6EDF3] border border-[#30363D]'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* FAQ */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-[#E6EDF3] mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'How long does it take to get listed?',
                a: 'Free listings go live within 24 hours. Premium and Sponsored listings are reviewed and live within 48 hours.',
              },
              {
                q: 'Can I upgrade or downgrade my plan?',
                a: 'Yes — you can upgrade or downgrade at any time. Billing adjusts at the start of your next billing cycle.',
              },
              {
                q: 'Is my business already listed?',
                a: "We've pre-listed many Colorado Springs restaurants from public data. Search for your business — if it's there, you can claim and upgrade it.",
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards through Stripe. Your payment information is never stored on our servers.',
              },
            ].map((item) => (
              <div
                key={item.q}
                className="bg-[#161B22] border border-[#30363D] rounded-xl p-5"
              >
                <h3 className="text-[#E6EDF3] font-semibold text-sm mb-2">
                  {item.q}
                </h3>
                <p className="text-[#8B949E] text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
