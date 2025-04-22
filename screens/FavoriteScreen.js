import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFavoriteSongs, saveFavoriteSongs } from '../data/storage';

const { width } = Dimensions.get('window');

const FavoriteScreen = ({ navigation }) => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  // Load danh sách bài hát yêu thích khi màn hình được mount
  useEffect(() => {
    loadFavoriteSongs();
  }, []);

  // Load lại danh sách khi màn hình được focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavoriteSongs();
    });

    return unsubscribe;
  }, [navigation]);

  /**
   * Load danh sách bài hát yêu thích từ storage
   */
  const loadFavoriteSongs = async () => {
    try {
      const songs = await getFavoriteSongs();
      setFavoriteSongs(songs);
    } catch (error) {
      console.error('Error loading favorite songs:', error);
      Alert.alert('Error', 'Could not load favorite songs');
    }
  };

  /**
   * Xử lý khi người dùng bỏ thích một bài hát
   */
  const handleUnlike = async (songId) => {
    try {
      const updatedFavorites = favoriteSongs.filter(song => song.id !== songId);
      setFavoriteSongs(updatedFavorites);
      await saveFavoriteSongs(updatedFavorites);
    } catch (error) {
      console.error('Error removing song from favorites:', error);
      Alert.alert('Error', 'Could not remove song from favorites');
    }
  };

  const handlePlayAll = () => {
    if (favoriteSongs.length > 0) {
      navigation.navigate('Listening', {
        song: favoriteSongs[0],
        playlist: favoriteSongs,
        currentIndex: 0,
        shouldAutoPlay: true,
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
        shouldAutoPlay: true,
      });
    }
  };

  const renderSongItem = (song, index) => (
    <View
      key={`favorite-song-${song.id}-${index}`}
      style={styles.songItem}
    >
      <TouchableOpacity
        style={styles.songItemContent}
        onPress={() =>
          navigation.navigate('Listening', {
            song,
            playlist: favoriteSongs,
            currentIndex: index,
            shouldAutoPlay: true,
          })
        }
      >
        {song.image && <Image source={song.image} style={styles.songImage} />}
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{song.title || 'Unknown Title'}</Text>
          <Text style={styles.artistName}>{song.artist || 'Unknown Artist'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.moreButton}
        onPress={() => handleUnlike(song.id)}
      >
        <Icon name="heart" size={24} color="#E91E63" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Header Image Section */}
          <View style={styles.headerImageContainer}>
            <Image 
              source={require('../assets/music-banner.jpg')} 
              style={styles.headerImage}
            />
            <View style={styles.headerOverlay}>
              <Text style={styles.headerTitle}>Favorite Songs</Text>
              <Text style={styles.headerSubtitle}>Your Liked Songs</Text>
            </View>
          </View>

          {/* Action Buttons */}
          {favoriteSongs.length > 0 && (
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.playButton} 
                onPress={handlePlayAll}
              >
                <Icon name="play" size={22} color="#fff" />
                <Text style={styles.buttonText}>PLAY</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.shuffleButton}
                onPress={handleShuffle}
              >
                <Icon name="shuffle" size={22} color="#fff" />
                <Text style={styles.buttonText}>SHUFFLE</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Add Songs Button - Always visible */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => {
              navigation.navigate('Home', {
                screen: 'HomeTab',
                initial: false
              });
            }}
          >
            <Icon name="add-circle-outline" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Add songs</Text>
          </TouchableOpacity>

          {/* Empty State Message */}
          {favoriteSongs.length === 0 && (
            <Text style={styles.emptyStateText}>
              Go to Home and tap the heart icon on any song to add it to favorites
            </Text>
          )}

          {/* Songs List */}
          <View style={styles.songsList}>
            {favoriteSongs.map((song, index) => renderSongItem(song, index))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E0A3C',
  },
  container: {
    flex: 1,
    backgroundColor: '#1E0A3C',
  },
  scrollView: {
    flex: 1,
  },
  headerImageContainer: {
    width: width,
    height: width * 0.5,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  playButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9C27B0',
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  shuffleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#9C27B0',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyStateText: {
    color: '#B0B0B0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  songsList: {
    paddingHorizontal: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songItemContent: {
    flex: 1,
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
});

export default FavoriteScreen;