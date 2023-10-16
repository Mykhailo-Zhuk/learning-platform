'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Homework, MainResources, References } from './index';

const TabsRow = () => {
  return (
    <section className="flex w-full p-5 border-t border-t-slate-200">
      <Tabs defaultValue="main" className="w-full">
        <TabsList>
          <TabsTrigger value="main">Main content</TabsTrigger>
          <TabsTrigger value="additional">Additional content</TabsTrigger>
        </TabsList>
        <TabsContent value="main">
          <MainResources />
          <References />
          <Homework />
        </TabsContent>
        <TabsContent value="additional">Change your password here.</TabsContent>
      </Tabs>
    </section>
  );
};

export default TabsRow;
