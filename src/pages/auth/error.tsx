import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';

const AuthErrorPage: NextPage = () => {
  const router = useRouter();
  const { error } = router.query;

  const getErrorMessage = (error: string | string[] | undefined) => {
    if (!error) return 'An unknown authentication error occurred.';

    const errorCode = Array.isArray(error) ? error[0] : error;

    switch (errorCode) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to sign in.';
      case 'Verification':
        return 'The verification token has expired or is invalid.';
      case 'Default':
      default:
        return 'An authentication error occurred. Please try again.';
    }
  };

  return (
    <>
      <NextSeo title='Authentication Error - Aditya Argadinata' />
      <Container data-aos='fade-up'>
        <PageHeading
          title='Authentication Error'
          description='Something went wrong during authentication'
        />
        <div className='flex flex-col items-center justify-center space-y-4 py-8'>
          <div className='rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20'>
            <h2 className='text-lg font-semibold text-red-800 dark:text-red-200'>
              Authentication Failed
            </h2>
            <p className='mt-2 text-red-700 dark:text-red-300'>
              {getErrorMessage(error)}
            </p>
          </div>
          <button
            onClick={() => router.push('/')}
            className='rounded-lg bg-neutral-900 px-6 py-2 text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200'
          >
            Go Home
          </button>
        </div>
      </Container>
    </>
  );
};

export default AuthErrorPage;
