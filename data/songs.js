export const songs = [
  {
    id: '1',
    title: 'Lost in the City Lights',
    artist: 'Cosmo Sheldrake',
    duration: '2:35',
    image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    audio: require('../assets/audio/song-1.mp3'),
    genre: 'Electronic',
  },
  {
    id: '2',
    title: 'Dream Space',
    artist: 'Roa Music',
    duration: '3:45',
    image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    audio: require('../assets/audio/song-2.mp3'),
    genre: 'Electronic',
  },
  {
    id: '3',
    title: 'Midnight Rain',
    artist: 'The Jazz Hop Café',
    duration: '3:28',
    image: 'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    audio: require('../assets/audio/song-3.mp3'),
    genre: 'Jazz',
  },
  {
    id: '4',
    title: 'Forest Lullaby',
    artist: 'Tenno',
    duration: '2:55',
    image: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2026&q=80',
    audio: require('../assets/audio/song-4.mp3'),
    genre: 'Lo-fi',
  },
  {
    id: '5',
    title: 'Urban Lights',
    artist: 'Parkbench Epiphany',
    duration: '2:59',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
    audio: require('../assets/audio/song-5.mp3'),
    genre: 'Electronic',
  },
];

export const playlists = [
  {
    id: '1',
    title: 'Chill Electronic',
    songs: ['1', '2', '5'],
    image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '2',
    title: 'Focus Flow',
    songs: ['3', '4'],
    image: 'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '3',
    title: 'Late Night Vibes',
    songs: ['2', '3', '5'],
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
  },
]; 