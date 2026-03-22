import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getSession, isAdmin } from '@/lib/auth'
import { AdminNav } from '../admin-nav'

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore.get('session')?.value)
  if (!session || !isAdmin(session.email)) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-[100dvh] bg-[#0D1117]">
      <AdminNav email={session.email} />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 pt-4 lg:pt-8">
        {children}
      </main>
    </div>
  )
}
