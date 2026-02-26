# DNS Setup — felipe.engineer → Vercel

## Status
- ✅ GitHub repo created: https://github.com/felipe-ebfc/felipe-engineer
- ✅ Vercel deploy live: https://felipe-engineer-site.vercel.app
- ⏳ Custom domain pending DNS configuration

## Vercel URLs
| Type | URL |
|------|-----|
| Production (stable) | https://felipe-engineer-site.vercel.app |
| Deploy permalink | https://felipe-engineer-site-p6d32kgkx-felipe-ebfcs-projects.vercel.app |
| Vercel dashboard | https://vercel.com/felipe-ebfcs-projects/felipe-engineer-site |

## DNS Records to Add in Cloudflare

Go to: **Cloudflare Dashboard → felipe.engineer → DNS → Add record**

### Required Record (A record for root domain)

| Type | Name | Value | Proxy status |
|------|------|-------|-------------|
| A | `@` | `76.76.21.21` | **DNS only** (grey cloud, NOT orange/proxied) |

> ⚠️ **Important:** Set proxy status to **DNS only** (grey cloud icon). If you leave it as proxied (orange cloud), Vercel's SSL certificate won't issue properly.

### Optional — www subdomain

| Type | Name | Value | Proxy status |
|------|------|-------|-------------|
| CNAME | `www` | `cname.vercel-dns.com` | DNS only |

This lets `www.felipe.engineer` also work.

## Steps in Cloudflare

1. Log in to https://dash.cloudflare.com
2. Select the `felipe.engineer` domain
3. Click **DNS** in the left sidebar
4. Click **Add record**
5. Set Type = `A`, Name = `@`, IPv4 address = `76.76.21.21`
6. **Toggle proxy OFF** (grey cloud = "DNS only")
7. Save

Then optionally repeat for `www` → CNAME → `cname.vercel-dns.com`

## After DNS Propagates

Once DNS propagates (usually 5–30 minutes, up to 48h), Vercel will automatically:
- Detect the A record
- Issue a TLS/SSL certificate for `felipe.engineer`
- Serve the site at `https://felipe.engineer`

You can check propagation at: https://dnschecker.org/#A/felipe.engineer

## What Vercel Told Us

```
WARN! This domain is not configured properly. To configure it you should either:
  a) Set the following record on your DNS provider to continue:
     `A felipe.engineer 76.76.21.21` [recommended]
  b) Change your Domain's nameservers to the intended set
     Intended Nameservers    Current Nameservers
     -                       cora.ns.cloudflare.com   ✘
     -                       jasper.ns.cloudflare.com ✘
```

Option **a** (A record) is what you want — keep Cloudflare as your nameserver, just add the A record.
