const Introduction = () => {
  return (
    <section className='bg-cover bg-no-repeat '>
      <div className='space-y-3'>
        <div className='flex gap-2  text-2xl font-medium lg:text-3xl'>
          <h1>Hi, I&apos;m Aditya</h1>{' '}
          <div className='ml-1 animate-waving-hand'>👋</div>
        </div>
        <div className='space-y-4'>
          <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 lg:flex-row lg:gap-10'>
            <li>
              Based in Kudus, Indonesia <span className='ml-1'>🇮🇩</span>
            </li>
            <li>Working onsite | @esoftplay</li>
          </ul>
        </div>
      </div>

      <p className='mt-6 leading-[1.8] text-neutral-800 dark:text-neutral-300 md:leading-loose'>
        Seasoned Software Engineer with a strong focus on Backend Development,
        passionate about building robust, scalable, and secure server-side
        applications. I work primarily with JavaScript and backend technologies,
        and I specialize in designing APIs, managing databases, and optimizing
        system performance. I enjoy collaborating with cross-functional teams to
        deliver reliable and efficient web solutions.
      </p>
    </section>
  );
};

export default Introduction;
