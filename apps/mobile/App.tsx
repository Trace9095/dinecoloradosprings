import { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Linking,
  Platform,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

const COLORS = {
  background: '#0D1117',
  surface: '#161B22',
  surfaceHover: '#1C2333',
  border: '#30363D',
  gold: '#D4A853',
  goldLight: '#E8C97A',
  foreground: '#E6EDF3',
  muted: '#8B949E',
  success: '#3FB950',
  destructive: '#F85149',
}

const API_BASE = process.env['EXPO_PUBLIC_API_URL'] ?? 'https://dinecoloradosprings.com'

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'grid' },
  { id: 'restaurant', label: 'Restaurants', icon: 'restaurant' },
  { id: 'brewery', label: 'Breweries', icon: 'beer' },
  { id: 'cafe', label: 'Cafes', icon: 'cafe' },
  { id: 'food-truck', label: 'Food Trucks', icon: 'fast-food' },
  { id: 'happy-hour', label: 'Happy Hour', icon: 'time' },
] as const

type CategoryId = (typeof CATEGORIES)[number]['id']

interface Venue {
  id: number
  name: string
  slug: string
  category: string
  cuisine: string | null
  neighborhood: string | null
  address: string | null
  phone: string | null
  website: string | null
  priceRange: number | null
  shortDescription: string | null
  hours: string | null
  featured: boolean | null
  tier: string
  features: string | null
}

function priceLabel(range: number | null) {
  if (!range) return ''
  return '$'.repeat(range)
}

function categoryLabel(cat: string) {
  const map: Record<string, string> = {
    restaurant: 'Restaurant',
    brewery: 'Brewery',
    cafe: 'Cafe',
    'food-truck': 'Food Truck',
    'fine-dining': 'Fine Dining',
    bar: 'Bar',
  }
  return map[cat] ?? cat
}

function VenueCard({ venue, onPress }: { venue: Venue; onPress: () => void }) {
  const isFeatured = venue.tier === 'sponsored' || venue.tier === 'premium'

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={styles.card}
    >
      {/* Color bar */}
      <View style={[styles.cardBar, isFeatured && styles.cardBarGold]} />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardName} numberOfLines={1}>
              {venue.name}
            </Text>
            {venue.priceRange ? (
              <Text style={styles.cardPrice}>{priceLabel(venue.priceRange)}</Text>
            ) : null}
          </View>
          {isFeatured && (
            <View style={styles.tierBadge}>
              <Text style={styles.tierBadgeText}>
                {venue.tier.toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.cardMeta}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>
              {categoryLabel(venue.category)}
            </Text>
          </View>
          {venue.neighborhood ? (
            <View style={styles.neighborhoodRow}>
              <Ionicons name="location" size={12} color={COLORS.muted} />
              <Text style={styles.neighborhoodText}>
                {venue.neighborhood.replace(/-/g, ' ')}
              </Text>
            </View>
          ) : null}
        </View>

        {venue.shortDescription ? (
          <Text style={styles.cardDesc} numberOfLines={2}>
            {venue.shortDescription}
          </Text>
        ) : null}

        {venue.hours ? (
          <View style={styles.hoursRow}>
            <Ionicons name="time-outline" size={12} color={COLORS.muted} />
            <Text style={styles.hoursText} numberOfLines={1}>
              {venue.hours}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

function VenueDetailModal({
  venue,
  onClose,
}: {
  venue: Venue
  onClose: () => void
}) {
  function callPhone() {
    if (venue.phone) {
      Linking.openURL(`tel:${venue.phone}`)
    }
  }

  function openWebsite() {
    if (venue.website) {
      Linking.openURL(venue.website)
    }
  }

  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.gold} />
        </TouchableOpacity>
        <Text style={styles.modalTitle} numberOfLines={1}>
          {venue.name}
        </Text>
      </View>

      <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalContent}>
        <View style={styles.detailHeader}>
          <Text style={styles.detailName}>{venue.name}</Text>
          <View style={styles.detailMeta}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>
                {categoryLabel(venue.category)}
              </Text>
            </View>
            {venue.priceRange ? (
              <Text style={styles.detailPrice}>{priceLabel(venue.priceRange)}</Text>
            ) : null}
          </View>
          {venue.neighborhood ? (
            <View style={styles.neighborhoodRow}>
              <Ionicons name="location" size={14} color={COLORS.muted} />
              <Text style={styles.neighborhoodText}>
                {venue.neighborhood.replace(/-/g, ' ')}
              </Text>
            </View>
          ) : null}
        </View>

        {venue.shortDescription ? (
          <View style={styles.section}>
            <Text style={styles.sectionText}>{venue.shortDescription}</Text>
          </View>
        ) : null}

        {venue.hours ? (
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="time" size={16} color={COLORS.gold} />
              <View style={styles.infoTextBlock}>
                <Text style={styles.infoLabel}>Hours</Text>
                <Text style={styles.infoValue}>{venue.hours}</Text>
              </View>
            </View>
          </View>
        ) : null}

        {venue.address ? (
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={16} color={COLORS.gold} />
              <View style={styles.infoTextBlock}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{venue.address}</Text>
              </View>
            </View>
          </View>
        ) : null}

        {/* Action buttons */}
        <View style={styles.actionRow}>
          {venue.phone ? (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={callPhone}
              activeOpacity={0.8}
            >
              <Ionicons name="call" size={16} color={COLORS.background} />
              <Text style={styles.actionBtnText}>Call</Text>
            </TouchableOpacity>
          ) : null}
          {venue.website ? (
            <TouchableOpacity
              style={styles.actionBtnSecondary}
              onPress={openWebsite}
              activeOpacity={0.8}
            >
              <Ionicons name="globe" size={16} color={COLORS.foreground} />
              <Text style={styles.actionBtnSecondaryText}>Website</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default function App() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchVenues()
  }, [])

  async function fetchVenues() {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/api/venues`)
      const data = (await res.json()) as Venue[]
      setVenues(data)
    } catch {
      setError('Could not load venues. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const filtered = venues.filter((v) => {
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      v.name.toLowerCase().includes(q) ||
      (v.cuisine ?? '').toLowerCase().includes(q) ||
      (v.neighborhood ?? '').toLowerCase().includes(q)

    let matchesCategory = true
    if (activeCategory !== 'all') {
      if (activeCategory === 'happy-hour') {
        try {
          const f = JSON.parse(v.features ?? '{}') as Record<string, boolean>
          matchesCategory = f.happyHour === true
        } catch {
          matchesCategory = false
        }
      } else {
        matchesCategory = v.category === activeCategory
      }
    }

    return matchesSearch && matchesCategory
  })

  if (selectedVenue) {
    return (
      <VenueDetailModal
        venue={selectedVenue}
        onClose={() => setSelectedVenue(null)}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Ionicons name="restaurant" size={20} color={COLORS.gold} />
          <Text style={styles.headerTitle}>Dine Colorado Springs</Text>
        </View>
        <Text style={styles.headerSub}>
          Your Colorado Springs dining guide
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInner}>
          <Ionicons
            name="search"
            size={16}
            color={COLORS.muted}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search restaurants, breweries..."
            placeholderTextColor={COLORS.muted}
            clearButtonMode="while-editing"
            returnKeyType="search"
          />
        </View>
      </View>

      {/* Category tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setActiveCategory(cat.id)}
            style={[
              styles.categoryTab,
              activeCategory === cat.id && styles.categoryTabActive,
            ]}
            activeOpacity={0.7}
          >
            <Ionicons
              name={cat.icon as any}
              size={14}
              color={
                activeCategory === cat.id ? COLORS.background : COLORS.muted
              }
            />
            <Text
              style={[
                styles.categoryTabText,
                activeCategory === cat.id && styles.categoryTabTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results count */}
      {!loading && (
        <View style={styles.resultsRow}>
          <Text style={styles.resultsText}>
            {filtered.length} venue{filtered.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.gold} />
          <Text style={styles.loadingText}>Loading venues...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={40}
            color={COLORS.destructive}
          />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchVenues} style={styles.retryBtn}>
            <Text style={styles.retryBtnText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="search-outline"
            size={40}
            color={COLORS.border}
          />
          <Text style={styles.emptyText}>No venues found</Text>
          <TouchableOpacity
            onPress={() => {
              setSearch('')
              setActiveCategory('all')
            }}
          >
            <Text style={styles.clearText}>Clear filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <VenueCard
              venue={item}
              onPress={() => setSelectedVenue(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gold,
  },
  headerSub: {
    fontSize: 12,
    color: COLORS.muted,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceHover,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    minHeight: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: COLORS.foreground,
    fontSize: 14,
    paddingVertical: 10,
  },
  categoryScroll: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    maxHeight: 56,
  },
  categoryContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    minHeight: 36,
  },
  categoryTabActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  categoryTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.muted,
  },
  categoryTabTextActive: {
    color: COLORS.background,
  },
  resultsRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 12,
    color: COLORS.muted,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    color: COLORS.muted,
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 32,
  },
  errorText: {
    color: COLORS.muted,
    fontSize: 14,
    textAlign: 'center',
  },
  retryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.gold,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  retryBtnText: {
    color: COLORS.background,
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 32,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 16,
    textAlign: 'center',
  },
  clearText: {
    color: COLORS.gold,
    fontSize: 14,
    minHeight: 44,
    textAlignVertical: 'center',
  },
  listContent: {
    padding: 12,
    paddingBottom: 32,
  },
  separator: {
    height: 8,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardBar: {
    width: 3,
    backgroundColor: COLORS.border,
  },
  cardBarGold: {
    backgroundColor: COLORS.gold,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    gap: 6,
  },
  cardHeader: {
    gap: 4,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.foreground,
    marginRight: 8,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gold,
  },
  tierBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: `${COLORS.gold}20`,
    borderRadius: 4,
  },
  tierBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.gold,
    letterSpacing: 0.5,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: COLORS.surfaceHover,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryTagText: {
    fontSize: 11,
    color: COLORS.foreground,
  },
  neighborhoodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  neighborhoodText: {
    fontSize: 11,
    color: COLORS.muted,
    textTransform: 'capitalize',
  },
  cardDesc: {
    fontSize: 12,
    color: COLORS.muted,
    lineHeight: 17,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hoursText: {
    fontSize: 11,
    color: COLORS.muted,
    flex: 1,
  },
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  backButton: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
  },
  modalTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.foreground,
  },
  modalScroll: {
    flex: 1,
  },
  modalContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 40,
  },
  detailHeader: {
    gap: 8,
  },
  detailName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.foreground,
  },
  detailMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gold,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionText: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 21,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  infoTextBlock: {
    flex: 1,
    gap: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: COLORS.gold,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 14,
    minHeight: 48,
  },
  actionBtnText: {
    color: COLORS.background,
    fontWeight: '600',
    fontSize: 15,
  },
  actionBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 48,
  },
  actionBtnSecondaryText: {
    color: COLORS.foreground,
    fontWeight: '600',
    fontSize: 15,
  },
})
