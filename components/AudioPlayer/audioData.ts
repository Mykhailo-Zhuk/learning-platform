import track1 from 'public/audio/track1.mp3';
import track2 from 'public/audio/accept.mp3';

type ListOfTracks = {
  title: string;
  url: string;
}[];

export const tracks: ListOfTracks = [
  {
    title: 'Accept',
    url: track2,
  },
  {
    title: 'Boombox',
    url: track1,
  },
];
