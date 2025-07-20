# 🚀 Vercel Deployment Guide

## Setup Environment Variables di Vercel

1. **Login ke Vercel Dashboard** (https://vercel.com)
2. **Import repository** GitHub Anda  
3. **Pergi ke Project Settings** → **Environment Variables**
4. **Tambahkan variables** berikut:

### 🔥 WAJIB (Minimum untuk berfungsi):
```
SITE_URL=https://aditarga.my.id
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID=ecd3b97a-9068-4a79-9294-ff25d065165d
```

### 📈 DIREKOMENDASIKAN:
```
WAKATIME_API_KEY=your_wakatime_api_key_here
GITHUB_READ_USER_TOKEN_PERSONAL=your_github_token_here
```

### ⚙️ OPSIONAL (Sesuai kebutuhan):
```
OPENAI_API_KEY=your_openai_api_key_here
CONTACT_FORM_API_KEY=your_web3forms_api_key_here
```

## 🔧 Custom Domain Setup

1. **Di Vercel Dashboard** → Project → Settings → Domains
2. **Add domain**: `aditarga.my.id`
3. **Update DNS** di domain registrar:
   - Type: `A` Record, Name: `@`, Value: `76.76.19.61`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`

## 🔐 Security Notes

⚠️ **PENTING**: Jangan pernah commit real API keys ke repository!
- Gunakan placeholders di template files
- Regenerate tokens yang pernah ter-exposed
- Gunakan Vercel environment variables untuk production
