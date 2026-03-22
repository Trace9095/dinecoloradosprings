import { NextRequest, NextResponse } from 'next/server'
import { sendListingRequest } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      businessName?: string
      contactEmail?: string
      contactName?: string
      address?: string
      message?: string
    }
    const { businessName, contactEmail, contactName, address, message } = body

    if (!businessName || !contactEmail) {
      return NextResponse.json(
        { error: 'Business name and email are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    try {
      if (process.env['RESEND_API_KEY']) {
        await sendListingRequest({
          businessName,
          contactEmail,
          contactName: contactName ?? contactEmail,
          address: address ?? undefined,
          message: message ?? undefined,
        })
      }
    } catch (err) {
      console.error('Resend error:', err)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }
}
