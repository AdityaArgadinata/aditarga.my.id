# Umami Analytics Setup

## Setup Instructions

1. **Sign up for Umami Cloud**: Visit [https://umami.is](https://umami.is) and create an account
2. **Create a website** in your dashboard with:
   - Name: `Aditarga Portfolio`
   - Domain: `aditarga.my.id`
   - Timezone: `Asia/Jakarta`
3. **Copy your credentials** from the dashboard
4. **Update `.env.local`** with your actual values:

```env
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://analytics.eu.umami.is/script.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-actual-website-id-here
NEXT_PUBLIC_UMAMI_SHARE_URL=https://analytics.eu.umami.is/share/your-share-id/aditarga.my.id
```

## Testing

1. Run `npm run dev`
2. Open your website in browser
3. Check browser dev tools console for any Umami errors
4. Visit your Umami dashboard to see if pageviews are tracked

## Features Tracked

This project tracks the following events:

- Page views (automatic)
- Download Resume clicks
- Theme toggles
- Blog view changes
- Contact form submissions
- Chat widget interactions
- Project link clicks
- Social media clicks
- And many more...

## Public Dashboard

If you set up a share URL, visitors can view your analytics at the link in the navigation menu.
