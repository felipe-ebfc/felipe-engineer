export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'https://felipe.engineer');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { full_name, email, company, role_title, referral_source, notes } = req.body || {};

  // Validate required fields
  if (!full_name || typeof full_name !== 'string' || !full_name.trim()) {
    return res.status(400).json({ error: 'Full name is required.' });
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing Supabase environment variables');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rsm_waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        company: company?.trim() || null,
        role_title: role_title?.trim() || null,
        referral_source: referral_source || null,
        notes: notes?.trim() || null
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Supabase error:', response.status, err);
      return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Waitlist submission error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
