export const songs = [
  {
    id: '1',
    title: 'Lost in the City Lights',
    artist: 'Chill music',
    duration: '4:04',
    image: require('../assets/images/song-1.jpg'), // Thay URL bằng require
    audio: require('../assets/audio/song-1.mp3'),
    genre: 'Electronic',
  },
  {
    id: '2',
    title: 'Dream Space',
    artist: 'Đạt Phùng ',
    duration: '3:52',
    image: require('../assets/images/song-2.jpg'), // Thay URL bằng require
    audio: require('../assets/audio/song-2.mp3'),
    genre: 'Electronic',
  },
  {
    id: '3',
    title: 'Midnight Rain',
    artist: 'The Jazz Hop Café',
    duration: '3:55',
    image: require('../assets/images/song-3.jpg'), // Thay URL bằng require
    audio: require('../assets/audio/song-3.mp3'),
    genre: 'Jazz',
  },
  {
    id: '4',
    title: 'Forest Lullaby',
    artist: 'Tenno',
    duration: '3:55',
    image: require('../assets/images/song-4.jpg'), // Thay URL bằng require
    audio: require('../assets/audio/song-4.mp3'),
    genre: 'Lo-fi',
  },
  {
    id: '5',
    title: 'Urban Lights',
    artist: 'Parkbench Epiphany',
    duration: '4:16',
    image: require('../assets/images/song-5.jpg'), // Thay URL bằng require
    audio: require('../assets/audio/song-5.mp3'),
    genre: 'Electronic',
  },
];

export const playlists = [
  {
    id: '1',
    title: 'Chill Electronic',
    songs: ['1', '2', '5'],
    image: require('../assets/images/playlist-1.jpg'), // Thay URL bằng require
  },
  {
    id: '2',
    title: 'Focus Flow',
    songs: ['3', '4'],
    image: require('../assets/images/playlist-2.jpg'), // Thay URL bằng require
  },
  {
    id: '3',
    title: 'Late Night Vibes',
    songs: ['2', '3', '5'],
    image: require('../assets/images/playlist-3.jpg'), // Thay URL bằng require
  },
];