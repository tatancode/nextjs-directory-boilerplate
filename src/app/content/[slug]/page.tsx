import { getAllContent, getContentBySlug } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import AudioPlayer from '@/components/AudioPlayer';

export async function generateStaticParams() {
  const content = getAllContent();
  return content.map((item) => ({
    slug: item.fileName.replace('.mdx', ''),
  }));
}

export default function ContentPage({ params }: { params: { slug: string } }) {
  const item = getContentBySlug(params.slug);

  if (!item) {
    return <div>Content not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {item.meta.image && (
        <div className="relative w-full h-80 mb-8 overflow-hidden rounded-lg">
          <Image
            src={item.meta.image}
            alt={item.meta.title}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            className="rounded-lg"
          />
        </div>
      )}
      {item.meta.audioUrl && <AudioPlayer audioUrl={item.meta.audioUrl} />}
      <h1 className="text-4xl font-bold mb-4 font-heading">{item.meta.title}</h1>
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={item.content} />
      </div>
      {item.meta.tags && (
        <div className="mt-8 flex gap-2 flex-wrap">
          {item.meta.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}