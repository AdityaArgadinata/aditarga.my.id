import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowLeftCircle as BackButtonIcon } from 'react-icons/fi';

type BackButtonProps = {
  url?: string;
  href?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const BackButton = ({ url, href, ...props }: BackButtonProps) => {
  const router = useRouter();

  const handleOnClick = () => {
    if (url || href) {
      window.location.href = url || href || '';
    } else {
      router.back();
    }
  };

  const className =
    'flex gap-2 w-max hover:gap-3 items-center mb-6 transition-all duration-300 font-medium text-neutral-600 dark:text-neutral-400 cursor-pointer';

  const BackButtonChildComponent = () => {
    return (
      <>
        <BackButtonIcon size={20} data-testid='back-icon' />
        <span>Back</span>
      </>
    );
  };

  return (
    <div className='w-fit'>
      {url || href ? (
        <Link href={href || url || ''} passHref>
          <div className={className} {...props}>
            <BackButtonChildComponent />
          </div>
        </Link>
      ) : (
        <div className={className} onClick={handleOnClick} {...props}>
          <BackButtonChildComponent />
        </div>
      )}
    </div>
  );
};

export default BackButton;
