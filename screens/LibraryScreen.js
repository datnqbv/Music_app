import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { songs } from '../data/songs';

const { width } = Dimensions.get('window');

const LibraryScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Playlist');
  const [isGridLayout, setIsGridLayout] = useState(false);

  // For demo, create some playlists from our songs
  const playlists = [
    {
      id: '1',
      title: 'Your Playlist 1',
      songs: songs.slice(0, 3),
      image: songs[0].image
    },
    {
      id: '2',
      title: 'Your Playlist 2',
      songs: songs.slice(1, 4),
      image: songs[1].image
    },
    {
      id: '3',
      title: 'Your Playlist 3',
      songs: songs.slice(2, 5),
      image: songs[2].image
    }
  ];

  // Recent songs will be the last 5 songs
  const recentSongs = songs.slice(0, 5);

  // Get unique artists from songs
  const artists = [...new Set(songs.map(song => song.artist))].map(artist => ({
    id: artist.toLowerCase().replace(/\s+/g, '-'),
    name: artist,
    songs: '10 songs',
    image: songs.find(song => song.artist === artist)?.image
  }));

  const renderTab = (tabName, icon) => (
    <TouchableOpacity
      style={[styles.tab, activeTab === tabName && styles.activeTab]}
      onPress={() => setActiveTab(tabName)}
    >
      <Icon name={icon} size={20} color={activeTab === tabName ? '#fff' : '#B0B0B0'} />
      <Text style={[styles.tabText, activeTab === tabName && styles.activeTabText]}>
        {tabName}
      </Text>
    </TouchableOpacity>
  );

  const renderPlaylistItem = (playlist) => (
    <TouchableOpacity
      key={playlist.id}
      style={styles.playlistItem}
      onPress={() => navigation.navigate('Listening', {
        song: playlist.songs[0],
        playlist: playlist.songs,
        isPlayingAll: true
      })}
    >
      <Image source={{ uri: playlist.image }} style={styles.playlistImage} />
      <Text style={styles.playlistTitle}>{playlist.title}</Text>
    </TouchableOpacity>
  );

  const renderArtistItem = (artist) => (
    <TouchableOpacity
      key={artist.id}
      style={styles.artistItem}
      onPress={() => navigation.navigate('Artist', { artist })}
    >
      <Image source={{ uri: artist.image }} style={styles.artistImage} />
      <Text style={styles.artistItemTitle}>{artist.name}</Text>
      <Text style={styles.artistSongs}>{artist.songs}</Text>
    </TouchableOpacity>
  );

  const renderSongItem = (song, index) => (
    <TouchableOpacity
      key={song.id}
      style={isGridLayout ? styles.songItemGrid : styles.songItem}
      onPress={() => navigation.navigate('Listening', {
        song,
        playlist: recentSongs,
        currentIndex: index
      })}
    >
      <Image 
        source={{ uri: song.image }} 
        style={isGridLayout ? styles.songImageGrid : styles.songImage} 
      />
      <View style={isGridLayout ? styles.songInfoGrid : styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
        <Text style={styles.artistName} numberOfLines={1}>{song.artist}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Icon name="ellipsis-vertical" size={20} color="#B0B0B0" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Library</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {renderTab('Playlist', 'list')}
        {renderTab('Album', 'albums')}
        {renderTab('Artist', 'person')}
      </View>

      <ScrollView style={styles.content}>
        {/* Playlists Grid */}
        {activeTab === 'Playlist' && (
          <View style={styles.playlistGrid}>
            {playlists.map(renderPlaylistItem)}
          </View>
        )}

        {/* Artists Grid */}
        {activeTab === 'Artist' && (
          <View style={styles.artistGrid}>
            {artists.map(renderArtistItem)}
          </View>
        )}

        {/* Recent Section */}
        {activeTab !== 'Artist' && (
          <View style={styles.recentSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent</Text>
              <TouchableOpacity onPress={() => setIsGridLayout(!isGridLayout)}>
                <Icon 
                  name={isGridLayout ? "list" : "grid"} 
                  size={20} 
                  color="#fff" 
                />
              </TouchableOpacity>
            </View>
            <View style={[
              styles.songsList,
              isGridLayout && styles.songsGrid
            ]}>
              {recentSongs.map((song, index) => renderSongItem(song, index))}
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  },
  headerButton: {
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'transparent',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#7B1FA2',
  },
  tabText: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  playlistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    gap: 15,
  },
  playlistItem: {
    width: (width - 60) / 3,
    alignItems: 'center',
  },
  playlistImage: {
    width: (width - 60) / 3,
    height: (width - 60) / 3,
    borderRadius: (width - 60) / 6,
    marginBottom: 8,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  recentSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  songsList: {
    gap: 16,
  },
  songsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  songItemGrid: {
    width: (width - 55) / 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 10,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  songImageGrid: {
    width: '100%',
    height: (width - 55) / 2,
    borderRadius: 8,
    marginBottom: 10,
  },
  songInfo: {
    flex: 1,
  },
  songInfoGrid: {
    marginTop: 8,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  artistName: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  moreButton: {
    padding: 8,
  },
  artistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    gap: 15,
  },
  artistItem: {
    width: (width - 60) / 2,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  artistImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#A78BFA',
  },
  artistItemTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  artistSongs: {
    color: '#B0B0B0',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LibraryScreen;