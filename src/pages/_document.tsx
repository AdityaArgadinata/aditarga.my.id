import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <script
          async
          defer
          src={
            process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ||
            'https://analytics.eu.umami.is/script.js'
          }
          data-website-id={
            process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || 'your-website-id-here'
          }
        ></script>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link
          rel='mask-icon'
          href='/favicon/safari-pinned-tab.svg'
          color='#121212'
        />
        <meta name='theme-color' content='#121212' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
