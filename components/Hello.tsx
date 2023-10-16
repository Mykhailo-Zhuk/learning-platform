'use client';

import React, { useState } from 'react';
import { hand } from '@/public/icons';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const username = 'Misha';

const Hello = () => {
  const [course, setCourse] = useState('');
  return (
    <section className="flex w-full justify-between p-5 border-t border-t-slate-200">
      <div className="flex">
        <Image src={hand} alt="hand" width={40} height={40} />
        <p className="p-2 font-spartan text-4xl">Hello, {username}</p>
      </div>
      <div>
        <Select defaultValue="Front-end">
          <SelectTrigger className="w-[180px]">
            <SelectValue defaultValue="Front-end" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Front-end" onClick={() => setCourse('Front-end')}>
              Front-end
            </SelectItem>
            <SelectItem value="React" onClick={() => setCourse('React')}>
              React (згодом)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default Hello;
