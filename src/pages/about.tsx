import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import About from '@/modules/about';

const PAGE_TITLE = 'About';
const PAGE_DESCRIPTION =
  'A thoughtful look into who I am — because every piece shapes the bigger picture of who we become.';

const AboutPage: NextPage = () => {
  return (
    <>
      <NextSeo title={`${PAGE_TITLE} - Aditya Argadinata`} />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <About />
      </Container>
    </>
  );
};

export default AboutPage;
