'use client';

import Image from 'next/image';
import { logo } from '@/public/images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MusicList } from './index';

const Header = () => {
  return (
    <header className="flex w-full bg-white justify-between p-5 sticky z-10 top-0 rounded-sm">
      <div className="flex-shrink-0 flex justify-center items-center">
        <Image src={logo} alt="logo" width={170} height={60} />
      </div>

      <div className="flex px-2 pt-[2px]">
        <MusicList />
        <div className="flex justify-center items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
