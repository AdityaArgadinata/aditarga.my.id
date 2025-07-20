const canonicalUrl = 'https://aditarga.my.id';
const metaImage = 'https://cloud.aditarga.my.id/public/images/aditarga-id.png';
const metaDescription =
  'Seasoned Software Engineer with a strong focus on Backend Development, passionate about building robust, scalable, and secure server-side applications.';

const defaultSEOConfig = {
  defaultTitle: 'Aditya Argadinata - Personal Website',
  description: metaDescription,
  canonical: canonicalUrl,
  openGraph: {
    canonical: canonicalUrl,
    title: 'Adityan Argadinata - Personal Website',
    description: metaDescription,
    type: 'website',
    images: [
      {
        url: metaImage,
        alt: 'aditarga.my.id og-image',
        width: 800,
        height: 600,
      },
      {
        url: metaImage,
        alt: 'aditarga.my.id og-image',
        width: 1200,
        height: 630,
      },
      {
        url: metaImage,
        alt: 'aditarga.my.id og-image',
        width: 1600,
        height: 900,
      },
    ],
    site_name: 'aditarga.my.id',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default defaultSEOConfig;
