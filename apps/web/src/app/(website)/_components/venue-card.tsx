import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, TreePine, Music, Star, Tag } from 'lucide-react'
import type { Venue } from '@/db/schema'
import { categoryLabel, priceLabel, parseFeatures } from '@/lib/utils'

interface VenueCardProps {
  venue: Venue
}

export function VenueCard({ venue }: VenueCardProps) {
  const features = parseFeatures(venue.features)
  const isFeatured = venue.tier === 'sponsored' || venue.tier === 'premium' || venue.featured

  return (
    <div className="group relative bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden hover:border-[#D4A853]/40 transition-all duration-200 hover:shadow-lg hover:shadow-[#D4A853]/5 flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-[#1C2333] overflow-hidden flex-shrink-0">
        {venue.imageUrl ? (
          <Image
            src={venue.imageUrl}
            alt={venue.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            quality={90}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1C2333] to-[#0D1117]">
            <span className="text-[#30363D] text-4xl font-bold select-none">
              {venue.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Tier badge */}
        {venue.tier === 'sponsored' && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#D4A853] text-[#0D1117] text-xs font-bold rounded-full uppercase tracking-wide">
            Sponsored
          </span>
        )}
        {venue.tier === 'premium' && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#8B949E] text-[#0D1117] text-xs font-bold rounded-full uppercase tracking-wide">
            Premium
          </span>
        )}

        {/* Category tag */}
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#0D1117]/80 backdrop-blur-none text-[#E6EDF3] text-xs rounded-full border border-[#30363D]">
          {categoryLabel(venue.category)}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-[#E6EDF3] text-base leading-tight line-clamp-2 group-hover:text-[#D4A853] transition-colors">
            {venue.name}
          </h3>
          {venue.priceRange && (
            <span className="text-[#D4A853] text-sm font-medium flex-shrink-0">
              {priceLabel(venue.priceRange)}
            </span>
          )}
        </div>

        {venue.neighborhood && (
          <div className="flex items-center gap-1 mb-2">
            <MapPin className="h-3.5 w-3.5 text-[#8B949E] flex-shrink-0" />
            <span className="text-[#8B949E] text-xs capitalize">
              {venue.neighborhood.replace(/-/g, ' ')}
            </span>
          </div>
        )}

        {venue.shortDescription && (
          <p className="text-[#8B949E] text-sm line-clamp-2 mb-3 flex-1">
            {venue.shortDescription}
          </p>
        )}

        {/* Feature icons */}
        {(features.patio || features.happyHour || features.liveMusic) && (
          <div className="flex items-center gap-3 mb-3">
            {features.patio && (
              <span className="flex items-center gap-1 text-[#8B949E] text-xs">
                <TreePine className="h-3.5 w-3.5" />
                Patio
              </span>
            )}
            {features.happyHour && (
              <span className="flex items-center gap-1 text-[#8B949E] text-xs">
                <Clock className="h-3.5 w-3.5" />
                Happy Hour
              </span>
            )}
            {features.liveMusic && (
              <span className="flex items-center gap-1 text-[#8B949E] text-xs">
                <Music className="h-3.5 w-3.5" />
                Live Music
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#30363D] mt-auto">
          <Link
            href={`/${venue.slug}`}
            className="inline-flex items-center gap-1 text-[#D4A853] hover:text-[#E8C97A] text-sm font-medium transition-colors min-h-[44px]"
          >
            View Details
          </Link>
          {venue.tier === 'free' && (
            <Link
              href={`/add-listing?venue=${venue.slug}&tier=premium`}
              className="flex items-center gap-1 text-[#8B949E] hover:text-[#D4A853] text-xs transition-colors min-h-[44px]"
            >
              <Tag className="h-3 w-3" />
              Claim Listing
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
