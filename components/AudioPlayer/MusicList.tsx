"use client";

import React, { useState } from "react";
import ReactPlayer from "react-player";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { tracks } from "./audioData";

const MusicList: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState({ title: "", url: "" });

  const onSelectTrack = (track: { title: string; url: string }) => {
    setSelectedTrack(track);
  };
  return (
    <div className="flex flex-col space-y-3 items-center md:flex-row md:space-x-3 md:space-y-0">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="hover:bg-accent rounded-lg py-3 text-center text-sm px-3 hover:text-accent-foreground">
            Обери музику
          </span>
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
      <div className="audio-player-container">
        <ReactPlayer url={selectedTrack.url} controls playing width="100%" height="40px" />
      </div>
    </div>
  );
};

export default MusicList;
