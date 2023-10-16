import { AsideList, Header, MainContent } from '@/components/index';
import React from 'react';

const Home = () => {
  return (
    <main className="flex min-h-screen max-w-[1400px] font-monserat mx-auto flex-col px-5">
      <Header />
      <section className="grid grid-cols-[200px_auto] gap-5">
        <AsideList />
        <MainContent />
      </section>
    </main>
  );
};

export default Home;
