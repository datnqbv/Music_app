import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { songs } from '../data/songs';

const FavoriteScreen = ({ navigation }) => {
  // For demo, we'll use first 3 songs as favorites
  const favoriteSongs = songs.slice(0, 3);

  const handlePlayAll = () => {
    if (favoriteSongs.length > 0) {
      navigation.navigate('Listening', {
        song: favoriteSongs[0],
        playlist: favoriteSongs,
        isPlayingAll: true,
      });
    }
  };

  const handleShuffle = () => {
    if (favoriteSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * favoriteSongs.length);
      navigation.navigate('Listening', {
        song: favoriteSongs[randomIndex],
        playlist: favoriteSongs,
        currentIndex: randomIndex,
      });
    }
  };

  const renderSongItem = (song, index) => (
    <TouchableOpacity
      key={song.id}
      style={styles.songItem}
      onPress={() =>
        navigation.navigate('Listening', {
          song,
          playlist: favoriteSongs,
          currentIndex: index,
        })
      }
    >
      {song.image && <Image source={song.image} style={styles.songImage} />}
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{song.title || 'Unknown Title'}</Text>
        <Text style={styles.artistName}>{song.artist || 'Unknown Artist'}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Icon name="ellipsis-vertical" size={20} color="#B0B0B0" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Banner Image */}
        <Image
          source={require('../assets/music-banner.jpg')}
          style={styles.bannerImage}
        />

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.smallText}>Artist</Text>
          <Text style={styles.title}>Favorite Songs</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.playButton} onPress={handlePlayAll}>
            <Icon name="play" size={22} color="#000" />
            <Text style={styles.playButtonText}>PLAY</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.shuffleButton}
            onPress={handleShuffle}
          >
            <Icon name="shuffle" size={22} color="#fff" />
            <Text style={styles.shuffleButtonText}>SHUFFLE</Text>
          </TouchableOpacity>
        </View>

        {/* Add Songs Button */}
        <TouchableOpacity style={styles.addSongsButton}>
          <Icon name="add" size={24} color="#fff" />
          <Text style={styles.addSongsText}>Add songs</Text>
        </TouchableOpacity>

        {/* Songs List */}
        <View style={styles.songsList}>
          {favoriteSongs.length > 0 ? (
            favoriteSongs.map((song, index) => renderSongItem(song, index))
          ) : (
            <Text style={styles.noSongsText}>No favorite songs available.</Text>
          )}
        </View>
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
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  titleSection: {
    padding: 20,
  },
  smallText: {
    color: '#B0B0B0',
    fontSize: 14,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  playButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  shuffleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    gap: 8,
  },
  shuffleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addSongsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20,
    gap: 10,
  },
  addSongsText: {
    color: '#fff',
    fontSize: 16,
  },
  songsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  artistName: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  moreButton: {
    padding: 8,
  },
  noSongsText: {
    color: '#B0B0B0',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoriteScreen;