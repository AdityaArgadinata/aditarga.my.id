import { Combobox, Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Fragment, useContext, useEffect, useState } from 'react';
import {
  BiMoon as DarkModeIcon,
  BiSearch as SearchIcon,
  BiSun as LightModeIcon,
} from 'react-icons/bi';
import { HiOutlineChat as AiIcon } from 'react-icons/hi';
import { useDebounce } from 'usehooks-ts';

import {
  EXTERNAL_LINKS,
  MENU_ITEMS,
  SOCIAL_MEDIA,
} from '@/common/constant/menu';
import { CommandPaletteContext } from '@/common/context/CommandPaletteContext';
import useIsMobile from '@/common/hooks/useIsMobile';
import { MenuItemProps } from '@/common/types/menu';
import AiLoading from '@/modules/cmdpallete/components/AiLoading';
import AiResponses from '@/modules/cmdpallete/components/AiResponses';
import QueryNotFound from '@/modules/cmdpallete/components/QueryNotFound';

interface MenuOptionItemProps extends MenuItemProps {
  click?: () => void;
  closeOnSelect: boolean;
}

interface MenuOptionProps {
  title: string;
  children: MenuOptionItemProps[];
}

const CommandPalette = () => {
  const [query, setQuery] = useState('');
  const [isEmptyState, setEmptyState] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [askAssistantClicked, setAskAssistantClicked] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [aiFinished, setAiFinished] = useState(false);

  const router = useRouter();
  const isMobile = useIsMobile();
  const { isOpen, setIsOpen } = useContext(CommandPaletteContext);
  const { resolvedTheme, setTheme } = useTheme();
  const queryDebounce = useDebounce(query, 500);

  const placeholders = [
    'Search or Ask anything...',
    'Press Cmd + K anytime to access this command pallete',
  ];

  const placeholder = placeholders[placeholderIndex];

  const menuOptions: MenuOptionProps[] = [
    {
      title: 'PAGES',
      children: MENU_ITEMS?.map((menu) => ({
        ...menu,
        closeOnSelect: true,
      })),
    },
    {
      title: 'SOCIALS',
      children: SOCIAL_MEDIA?.map((menu) => ({
        ...menu,
        closeOnSelect: true,
      })),
    },
    {
      title: 'EXTERNAL LINKS',
      children: EXTERNAL_LINKS?.map((menu) => ({
        ...menu,
        closeOnSelect: true,
      })),
    },
    {
      title: 'APPEARANCE',
      children: [
        {
          icon:
            resolvedTheme === 'dark' ? (
              <LightModeIcon size={20} />
            ) : (
              <DarkModeIcon size={20} />
            ),
          title: `Switch to ${
            resolvedTheme === 'dark' ? 'Light' : 'Dark'
          } Mode`,
          click: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
          href: '#',
          isExternal: false,
          closeOnSelect: false,
        },
      ],
    },
  ];

  const filterMenuOptions: MenuOptionProps[] = queryDebounce
    ? menuOptions.map((menu) => ({
        ...menu,
        children: menu.children.filter((item) =>
          item.title.toLowerCase().includes(queryDebounce.toLowerCase()),
        ),
      }))
    : menuOptions;

  const handleSelect = (menu: MenuOptionItemProps) => {
    setQuery('');

    if (menu.closeOnSelect) setIsOpen(false);

    menu.click?.();

    if (menu.isExternal) {
      window.open(menu.href, '_blank');
    } else {
      router.push(menu?.href as string);
    }
  };

  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setQuery(value);

  const handleFindGoogle = () => {
    const url =
      'https://www.google.com/search?q=' +
      queryDebounce +
      '&ref=aditarga.my.id';
    window.open(url, '_blank');
  };

  const handleAskAiAssistant = async () => {
    setEmptyState(true);
    setAskAssistantClicked(true);
    setAiLoading(true);

    // AI chat feature has been removed
    setAiResponse('AI assistant feature is currently unavailable.');
    setAiLoading(false);
  };

  const handleAiClose = () => {
    setAskAssistantClicked(false);
    setAiResponse('');
    setAiFinished(false);
  };

  const isActiveRoute = (href: string) => {
    return router.pathname === href;
  };

  useEffect(() => {
    if (query) setEmptyState(false);
  }, [query]);

  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        setPlaceholderIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [placeholderIndex, isMobile]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setEmptyState(false);
      handleAiClose();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      } else if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (aiResponse?.includes('```')) {
      setAiFinished(true);
    }
  }, [aiResponse]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        onClose={setIsOpen}
        className='fixed inset-0 z-[999] overflow-y-auto p-4 pt-[25vh]'
      >
        <Transition.Child
          as={Fragment}
          enter='transition-opacity duration-200 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-100 ease-in'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-neutral-600/90 dark:bg-neutral-900/90' />
        </Transition.Child>

        <Dialog.Panel>
          <Transition.Child
            as={Fragment}
            enter='transition-transform duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='transition-transform duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Combobox
              onChange={(menu: MenuOptionItemProps) => handleSelect(menu)}
              as='div'
              className='shadow-3xl relative mx-auto max-w-xl overflow-hidden rounded-xl border-2 border-neutral-100 bg-white ring-1 ring-black/5 backdrop-blur dark:divide-neutral-600 dark:border-neutral-800 dark:bg-[#1b1b1b80]'
              disabled={askAssistantClicked}
            >
              <div className='flex items-center gap-3 border-b border-neutral-300 px-4 dark:border-neutral-800'>
                {askAssistantClicked ? (
                  <AiIcon size={22} />
                ) : (
                  <SearchIcon size={22} />
                )}
                <Combobox.Input
                  onChange={handleSearch}
                  className='h-14 w-full border-0 bg-transparent  text-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-0 dark:text-neutral-200'
                  placeholder={
                    askAssistantClicked ? queryDebounce : placeholder
                  }
                />
              </div>

              <div
                className={clsx(
                  'max-h-80 overflow-y-auto px-1 py-2',
                  isEmptyState && '!py-0',
                )}
              >
                {filterMenuOptions.map((menu) => (
                  <div
                    key={menu.title}
                    className={clsx(
                      menu?.children?.length === 0 && 'hidden',
                      'py-1',
                    )}
                  >
                    <div className='my-2 px-5 text-xs font-medium text-neutral-500'>
                      {menu?.title}
                    </div>
                    <Combobox.Options static className='space-y-1'>
                      {menu?.children?.map((child, index) => (
                        <Combobox.Option key={index.toString()} value={child}>
                          {({ active }) => (
                            <div
                              className={clsx(
                                active || isActiveRoute(child?.href)
                                  ? 'bg-neutral-200 text-neutral-600 dark:bg-neutral-700/60 dark:text-white'
                                  : 'text-neutral-600 dark:text-neutral-300',
                                'group mx-2 flex cursor-pointer items-center justify-between gap-3 rounded-md px-4 py-2',
                                'dark:hover:bg-[#ffffff14]',
                              )}
                            >
                              <div className='flex items-center gap-5'>
                                {child?.icon && (
                                  <div
                                    className={clsx(
                                      'transition-all duration-300 group-hover:-rotate-12',
                                      isActiveRoute(child?.href) &&
                                        '-rotate-12',
                                    )}
                                  >
                                    {child?.icon}
                                  </div>
                                )}
                                <span className=''>
                                  {child?.title} {active}
                                </span>
                              </div>
                              <>
                                {isActiveRoute(child?.href) ? (
                                  <span className='animate-pulse  text-xs text-neutral-500'>
                                    You are here
                                  </span>
                                ) : (
                                  <>
                                    {child?.type && (
                                      <div className='rounded-md border border-neutral-400 px-1.5 py-0.5  text-xs text-neutral-500 dark:border-neutral-500'>
                                        {child?.type}
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            </div>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                ))}
              </div>

              {!isEmptyState &&
                !askAssistantClicked &&
                queryDebounce &&
                filterMenuOptions.every(
                  (item) => item.children.length === 0,
                ) && (
                  <QueryNotFound
                    query={queryDebounce}
                    onAskAiAssistant={handleAskAiAssistant}
                    onFindGoogle={handleFindGoogle}
                  />
                )}

              {askAssistantClicked &&
                queryDebounce &&
                filterMenuOptions.every(
                  (item) => item.children.length === 0,
                ) && (
                  <div className='max-h-80 overflow-y-auto px-8 py-7 text-neutral-700 dark:text-neutral-300'>
                    {aiLoading ? (
                      <AiLoading />
                    ) : (
                      <AiResponses
                        response={aiResponse}
                        isAiFinished={aiFinished}
                        onAiFinished={() => setAiFinished(true)}
                        onAiClose={handleAiClose}
                      />
                    )}
                  </div>
                )}
            </Combobox>
          </Transition.Child>
        </Dialog.Panel>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandPalette;
