import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router';
import { applyPointerGlow, resetPointerGlow } from '@/lib/site-effects';
import { estimateReadTime, formatDate, type SiteBlogEntry } from '@/lib/site-content';
import { extractToc, markdownToBlocks } from '@/lib/site-markdown';
import { Badge, Button, Card } from './ui';

export function BlogCard({ blog }: { blog: SiteBlogEntry }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      <Card onMouseMove={applyPointerGlow} onMouseLeave={resetPointerGlow} className='architect-card group h-full overflow-hidden rounded-xl transition-all duration-300 hover:border-ink hover:shadow-soft'>
        <Link to={`/blog/${blog.slug}`} className='block'>
          <div className='relative h-52 overflow-hidden'>
            <img src={blog.coverImage} alt={blog.title} className='h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0' />
          </div>
          <div className='p-6'>
            <div className='mb-4 flex flex-wrap gap-2'>
              {blog.tags.slice(0, 2).map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h3 className='mb-3 text-2xl leading-tight transition-colors group-hover:text-iron'>{blog.title}</h3>
            <p className='text-xs uppercase tracking-[0.16em] text-iron'>
              {formatDate(blog.date)} | {estimateReadTime(blog.content)}
            </p>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}

export function BlogListClient({ blogs }: { blogs: SiteBlogEntry[] }) {
  const perPage = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(blogs.length / perPage));

  const visible = useMemo(() => {
    const start = (page - 1) * perPage;
    return blogs.slice(start, start + perPage);
  }, [blogs, page]);

  return (
    <div className='space-y-8'>
      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {visible.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
      <div className='flex flex-wrap items-center justify-between gap-4 border-t border-mist pt-6'>
        <p className='text-xs uppercase tracking-[0.18em] text-iron'>
          Page {page} of {totalPages}
        </p>
        <div className='flex gap-3'>
          <Button variant='subtle' onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
            Prev
          </Button>
          <Button variant='subtle' onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export function BlogArticle({ blog }: { blog: SiteBlogEntry }) {
  const [openToc, setOpenToc] = useState(true);
  const toc = extractToc(blog.content);
  const blocks = markdownToBlocks(blog.content);
  const shareUrl = `https://wanderlustarchitects.com/blog/${blog.slug}`;

  return (
    <div className='grid gap-12 lg:grid-cols-[1fr_320px]'>
      <article className='prose max-w-none rounded-xl border border-mist bg-white p-8 shadow-soft lg:p-12'>
        {blocks.map((block, index) => {
          if (block.type === 'h2') {
            return (
              <h2 key={index} id={block.id} className='mt-10 text-4xl'>
                {block.content}
              </h2>
            );
          }

          if (block.type === 'h3') {
            return (
              <h3 key={index} id={block.id} className='mt-8 text-2xl'>
                {block.content}
              </h3>
            );
          }

          if (block.type === 'ul') {
            return (
              <ul key={index} className='space-y-2 pl-5'>
                {block.items.map((item) => (
                  <li key={item} className='list-disc text-iron'>
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p key={index} className='text-base leading-relaxed text-iron'>
              {block.content}
            </p>
          );
        })}
        <div className='mt-12 border-t border-mist pt-8'>
          <p className='text-xs uppercase tracking-[0.2em] text-iron'>Share</p>
          <div className='mt-3 flex gap-2'>
            <Button variant='subtle' href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target='_blank' rel='noreferrer'>
              LinkedIn
            </Button>
            <Button variant='subtle' href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`} target='_blank' rel='noreferrer'>
              X
            </Button>
          </div>
        </div>
      </article>
      <aside className='h-fit rounded-xl border border-mist bg-white p-6 shadow-soft lg:sticky lg:top-24'>
        <button
          type='button'
          onClick={() => setOpenToc((current) => !current)}
          className='flex w-full items-center justify-between text-left text-xs uppercase tracking-[0.2em]'
          aria-expanded={openToc}
        >
          Table of Contents
          <span>{openToc ? '-' : '+'}</span>
        </button>
        {openToc ? (
          <ul className='mt-4 space-y-3'>
            {toc.map((item) => (
              <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
                <a href={`#${item.id}`} className='text-sm text-iron hover:text-ink'>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </aside>
    </div>
  );
}

export function BlogHeader({ blog }: { blog: SiteBlogEntry }) {
  return (
    <header className='space-y-5 rounded-xl border border-mist bg-white p-8 shadow-soft lg:p-12'>
      <div className='relative h-72 overflow-hidden rounded-lg border border-mist'>
        <img src={blog.coverImage} alt={blog.title} className='h-full w-full object-cover grayscale' />
      </div>
      <div className='flex flex-wrap gap-2'>
        {blog.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <h1 className='max-w-4xl text-4xl leading-tight lg:text-6xl'>{blog.title}</h1>
      <p className='text-xs uppercase tracking-[0.2em] text-iron'>
        {formatDate(blog.date)} | {estimateReadTime(blog.content)}
      </p>
    </header>
  );
}
