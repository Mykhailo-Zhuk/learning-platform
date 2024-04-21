"use client";

import { useState } from "react";
import Image from "next/image";
import { logo } from "@/public/images";
import { FaHamburger } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Login, MusicList } from "./index";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className="flex w-full max-w-[1400px] mx-auto bg-white justify-between p-5 sticky z-10 top-0 rounded-sm">
      <div className="flex-shrink-0 flex justify-center items-center">
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={170} height={60} />
        </Link>
      </div>

      <div className="hidden md:flex px-2 pt-[2px]">
        <MusicList />
        <div className="flex justify-center items-center space-x-3 gap-4">
          {status === "authenticated" && session.user.role === "admin" && (
            <Button asChild variant="ghost">
              <Link href="/admin">Admin</Link>
            </Button>
          )}
          <Login />
          <Link href={"/cabinet"}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
      <div className="flex items-center md:hidden">
        <FaHamburger
          size={18}
          className="cursor-pointer"
          onClick={() => setIsOpen((prevState) => !prevState)}
        />
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-16 right-0 left-0 bg-white shadow-lg py-3">
          <div className="flex flex-col items-center space-y-4">
            <MusicList />
            <div className="flex justify-center items-center space-x-3">
              <Login />
              <Link href={"/cabinet"}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
