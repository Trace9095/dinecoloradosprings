import { getDb } from '@/lib/db'
import { listingClaims, venues } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { Clock, CheckCircle, XCircle, Tag } from 'lucide-react'

export default async function AdminClaimsPage() {
  const db = getDb()

  const claims = await db
    .select()
    .from(listingClaims)
    .orderBy(desc(listingClaims.createdAt))

  const statusColor: Record<string, string> = {
    pending: 'bg-[#E3B341]/10 text-[#E3B341]',
    approved: 'bg-[#3FB950]/10 text-[#3FB950]',
    rejected: 'bg-[#F85149]/10 text-[#F85149]',
  }

  return (
    <div className="pt-16 lg:pt-0 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#E6EDF3]">Listing Claims</h1>
        <p className="text-[#8B949E] text-sm mt-1">
          {claims.filter((c) => c.status === 'pending').length} pending approval
        </p>
      </div>

      {claims.length === 0 ? (
        <div className="text-center py-16 bg-[#161B22] border border-[#30363D] rounded-xl">
          <Tag className="h-10 w-10 text-[#30363D] mx-auto mb-4" />
          <p className="text-[#8B949E]">No listing claims yet.</p>
        </div>
      ) : (
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#30363D] bg-[#1C2333]">
                  <th className="text-left px-4 py-3 text-[#8B949E] font-medium">
                    Business
                  </th>
                  <th className="text-left px-4 py-3 text-[#8B949E] font-medium hidden sm:table-cell">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 text-[#8B949E] font-medium">
                    Tier
                  </th>
                  <th className="text-left px-4 py-3 text-[#8B949E] font-medium">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-[#8B949E] font-medium hidden md:table-cell">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 text-[#8B949E] font-medium hidden lg:table-cell">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363D]">
                {claims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="hover:bg-[#1C2333] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-[#E6EDF3] font-medium">
                          {claim.name ?? 'Unnamed'}
                        </p>
                        {claim.phone && (
                          <p className="text-[#8B949E] text-xs mt-0.5">
                            {claim.phone}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="text-[#8B949E] text-xs">{claim.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          claim.tier === 'sponsored'
                            ? 'bg-[#D4A853]/10 text-[#D4A853]'
                            : claim.tier === 'premium'
                            ? 'bg-[#8B949E]/10 text-[#8B949E]'
                            : 'bg-[#30363D] text-[#8B949E]'
                        }`}
                      >
                        {claim.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          statusColor[claim.status] ?? statusColor['pending']
                        }`}
                      >
                        {claim.status === 'pending' && (
                          <Clock className="h-3 w-3" />
                        )}
                        {claim.status === 'approved' && (
                          <CheckCircle className="h-3 w-3" />
                        )}
                        {claim.status === 'rejected' && (
                          <XCircle className="h-3 w-3" />
                        )}
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-[#8B949E] text-xs">
                        {new Date(claim.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell max-w-xs">
                      {claim.message && (
                        <p className="text-[#8B949E] text-xs line-clamp-2">
                          {claim.message}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
