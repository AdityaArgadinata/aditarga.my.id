import { motion } from 'framer-motion';
import Link from 'next/link';

const FooterNews = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-white px-4 py-8 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300 md:px-8'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3'>
        {/* Bagian Logo/Nama Situs */}
        <div className='flex flex-col items-start'>
          <Link
            href='/'
            className='mb-4 text-2xl font-bold text-neutral-900 dark:text-white'
          >
            BeritaKu
          </Link>
          <p className='text-sm text-neutral-600 dark:text-neutral-300'>
            Sumber berita terpercaya dan terkini untuk Anda.
          </p>
        </div>

        {/* Bagian Navigasi */}
        <div className='flex flex-col'>
          <h4 className='mb-4 text-lg font-semibold text-neutral-900 dark:text-white'>
            Navigasi
          </h4>
          <ul className='space-y-2'>
            <li>
              <motion.a
                href='/'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className='text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
              >
                Home
              </motion.a>
            </li>
            <li>
              <motion.a
                href='/news'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className='text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
              >
                Berita
              </motion.a>
            </li>
            <li>
              <motion.a
                href='/about'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className='text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
              >
                Tentang Kami
              </motion.a>
            </li>
            <li>
              <motion.a
                href='/contact'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className='text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
              >
                Kontak
              </motion.a>
            </li>
          </ul>
        </div>

        {/* Bagian Sosial Media */}
        <div className='flex flex-col'>
          <h4 className='mb-4 text-lg font-semibold text-neutral-900 dark:text-white'>
            Ikuti Kami
          </h4>
          <ul className='space-y-2'>
            <li>
              <motion.a
                href='https://twitter.com/beritaku'
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className='text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
              >
                Twitter / X
              </motion.a>
            </li>
            <li>
              <motion.a
                href='https://facebook.com/beritaku'
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className='text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
              >
                Facebook
              </motion.a>
            </li>
            <li>
              <motion.a
                href='https://instagram.com/beritaku'
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className='text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
              >
                Instagram
              </motion.a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className='mt-8 border-t border-neutral-200 pt-4 text-center text-sm text-neutral-600 dark:border-neutral-700 dark:text-neutral-300'>
        &copy; {currentYear} BeritaKu. Semua hak cipta dilindungi.
      </div>
    </footer>
  );
};

export default FooterNews;
