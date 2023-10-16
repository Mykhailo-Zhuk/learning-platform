'use client';

import React, { useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { tracks } from './audioData';
import { Button } from '../ui/button';

const MusicList: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState({ title: '', url: '' });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onSelectTrack = (track: { title: string; url: string }) => {
    setSelectedTrack(track);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  };
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost">Обери музику</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {tracks.map((track, index) => (
            <DropdownMenuItem
              key={index}
              className="cursor-pointer hover:bg-gray-200 p-2 truncate"
              onClick={() => onSelectTrack(track)}>
              {track.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="px-4">
        <audio ref={audioRef} autoPlay loop controls>
          <source src={selectedTrack?.url} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};

export default MusicList;
