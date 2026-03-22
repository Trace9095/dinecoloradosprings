import { Resend } from 'resend'

let _resend: Resend | null = null

export function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env['RESEND_API_KEY']!)
  return _resend
}

export async function sendClaimNotification(opts: {
  businessName: string
  ownerEmail: string
  ownerName: string
  tier: string
  phone?: string
}) {
  const resend = getResend()
  const tierLabel = opts.tier === 'sponsored' ? 'Sponsored ($199/mo)' : 'Premium ($99/mo)'

  // Notify admin
  await resend.emails.send({
    from: 'Dine Colorado Springs <listings@dinecoloradosprings.com>',
    to: ['CEO@epicai.ai'],
    subject: `New Listing Claim: ${opts.businessName} — ${tierLabel}`,
    html: `
      <h2>New Listing Claim Received</h2>
      <p><strong>Business:</strong> ${opts.businessName}</p>
      <p><strong>Tier:</strong> ${tierLabel}</p>
      <p><strong>Owner:</strong> ${opts.ownerName}</p>
      <p><strong>Email:</strong> ${opts.ownerEmail}</p>
      ${opts.phone ? `<p><strong>Phone:</strong> ${opts.phone}</p>` : ''}
      <p><a href="https://dinecoloradosprings.com/admin/claims">Review in Admin</a></p>
    `,
  })

  // Confirm to owner
  await resend.emails.send({
    from: 'Dine Colorado Springs <listings@dinecoloradosprings.com>',
    to: [opts.ownerEmail],
    subject: `We received your listing request for ${opts.businessName}`,
    html: `
      <h2>Thanks, ${opts.ownerName}!</h2>
      <p>We received your request to claim <strong>${opts.businessName}</strong> on Dine Colorado Springs.</p>
      <p>Selected plan: <strong>${tierLabel}</strong></p>
      <p>Our team will review your request and follow up within 1 business day to complete setup.</p>
      <p>Questions? Reply to this email.</p>
      <br/>
      <p>— The Dine Colorado Springs Team</p>
    `,
  })
}

export async function sendListingRequest(opts: {
  businessName: string
  contactEmail: string
  contactName: string
  address?: string
  message?: string
}) {
  const resend = getResend()

  // Notify admin
  await resend.emails.send({
    from: 'Dine Colorado Springs <listings@dinecoloradosprings.com>',
    to: ['CEO@epicai.ai'],
    subject: `New Listing Request: ${opts.businessName}`,
    html: `
      <h2>New Listing Request</h2>
      <p><strong>Business:</strong> ${opts.businessName}</p>
      <p><strong>Contact:</strong> ${opts.contactName} (${opts.contactEmail})</p>
      ${opts.address ? `<p><strong>Address:</strong> ${opts.address}</p>` : ''}
      ${opts.message ? `<p><strong>Message:</strong> ${opts.message}</p>` : ''}
    `,
  })

  // Confirm to requester
  await resend.emails.send({
    from: 'Dine Colorado Springs <listings@dinecoloradosprings.com>',
    to: [opts.contactEmail],
    subject: `We got your listing request for ${opts.businessName}`,
    html: `
      <h2>Thanks for reaching out!</h2>
      <p>We received your request to add <strong>${opts.businessName}</strong> to Dine Colorado Springs.</p>
      <p>We&apos;ll review it and add the listing within 2 business days.</p>
      <p>Once it&apos;s live, you can claim and upgrade your listing at any time.</p>
      <br/>
      <p>— The Dine Colorado Springs Team</p>
    `,
  })
}
