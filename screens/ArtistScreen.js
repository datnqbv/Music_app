import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { songs } from '../data/songs';

const { width } = Dimensions.get('window');

const ArtistScreen = ({ route, navigation }) => {
  const { artist } = route.params;
  // Filter songs by this artist
  const artistSongs = songs.filter(song => song.artist === artist.name);

  const handlePlayAll = () => {
    if (artistSongs.length > 0) {
      // Navigate to Listening screen with the first song and the full playlist
      navigation.navigate('Listening', { 
        song: artistSongs[0],
        playlist: artistSongs,
        isPlayingAll: true 
      });
    }
  };

  

  const renderSongItem = (song, index) => (
    <TouchableOpacity
      key={song.id}
      style={styles.songItem}
      onPress={() => navigation.navigate('Listening', { 
        song,
        playlist: artistSongs,
        currentIndex: index
      })}
    >
      <View style={styles.songNumberContainer}>
        <Text style={styles.songNumber}>{index + 1}</Text>
      </View>
      <Image source={song.image} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
        <Text style={styles.songPlays}>{(Math.random() * 2 + 1).toFixed(1)}M plays</Text>
      </View>
      <Text style={styles.songDuration}>{song.duration}</Text>
      <TouchableOpacity style={styles.moreButton}>
        <Icon name="ellipsis-vertical" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Artist Info */}
        <View style={styles.artistInfo}>
          <Image source={artist.image} style={styles.artistImage} />
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.songCount}>{artist.songs}</Text>
          
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.playAllButton}
              onPress={handlePlayAll}
            >
              <Icon name="play" size={24} color="#fff" />
              <Text style={styles.playAllText}>Play All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Songs */}
        <View style={styles.songsSection}>
          <Text style={styles.sectionTitle}>Popular Songs</Text>
          <View style={styles.songsList}>
            {artistSongs.map((song, index) => renderSongItem(song, index))}
          </View>
        </View>

        {/* Albums Section can be added here */}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  artistInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  artistImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#A78BFA',
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  songCount: {
    fontSize: 16,
    color: '#B0B0B0',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 15,
  },
  playAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A78BFA',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  playAllText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  followButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#A78BFA',
  },
  followText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  songsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  songsList: {
    gap: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  songNumberContainer: {
    width: 30,
    alignItems: 'center',
  },
  songNumber: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  songPlays: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  songDuration: {
    color: '#B0B0B0',
    fontSize: 14,
    marginRight: 12,
  },
  moreButton: {
    padding: 8,
  },
});

export default ArtistScreen;