import { getAllContent } from '@/lib/content';
import { directoryConfig } from '@/config/directory.config';
import Search from '@/components/Search';

export default function Home() {
  const content = getAllContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-4xl w-full space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter">{directoryConfig.name}</h1>
          <p className="text-muted-foreground text-lg">
            {directoryConfig.description}
          </p>
        </header>

        <main className="space-y-8">
          <Search items={content} />
        </main>
      </div>
    </div>
  );
}