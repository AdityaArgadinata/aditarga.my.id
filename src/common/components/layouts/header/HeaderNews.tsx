import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { BiCommand as CommandIcon } from 'react-icons/bi';

import { MENU_ITEMS } from '@/common/constant/menu';
import { CommandPaletteContext } from '@/common/context/CommandPaletteContext';

import Image from '../../elements/Image';
import ThemeToggleButton from '../../elements/ThemeToggleButton';

const HeaderNews = () => {
  const { setIsOpen } = useContext(CommandPaletteContext);
  const router = useRouter();

  const menus = MENU_ITEMS.filter(
    (item) =>
      item.isShow && ['About', 'Contact', 'Berita'].includes(item.title),
  );

  return (
    <header className='sticky top-0 z-50 border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
      <div className='flex items-center justify-between px-4 py-4 lg:px-8 lg:py-6'>
        {/* LEFT */}
        <div className='flex items-center gap-3'>
          <Image
            src='/images/news/logo.png'
            alt='saham indonesia'
            width={32}
            height={32}
            className='transition-transform lg:hover:scale-105'
          />
          <Link href='/news' className='text-base font-semibold lg:text-xl'>
            Stock Pulse
          </Link>
        </div>

        {/* RIGHT */}
        <div className='flex items-center gap-4 lg:gap-6'>
          {/* MENU DESKTOP */}
          <nav className='hidden items-center gap-6 lg:flex'>
            {menus.map((menu, index) => (
              <Link
                key={index}
                href={menu.href}
                className={clsx(
                  'text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 hover:dark:text-white',
                  router.pathname === menu.href &&
                    'font-medium text-neutral-900 dark:text-white',
                )}
              >
                {menu.title}
              </Link>
            ))}
          </nav>

          <ThemeToggleButton />

          {/* COMMAND / SEARCH */}
          <CommandIcon
            onClick={() => setIsOpen(true)}
            className='cursor-pointer text-neutral-700 dark:text-neutral-300'
            size={20}
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderNews;
