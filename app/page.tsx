import { Header, Hello, TabsRow } from '@/components/index';

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-[1400px] font-monserat mx-auto flex-col px-5">
      <Header />
      <Hello />
      <TabsRow />
    </main>
  );
}
