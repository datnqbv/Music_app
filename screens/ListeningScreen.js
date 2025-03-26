import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const imageSize = width - 80;

const ListeningScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { song } = route.params || { song: { title: 'Song Title', artist: 'Artist' } };
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <LinearGradient colors={['#1E0A3C', '#000000']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Share')}>
          <Icon name="share-social" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Song Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/song-image.jpg')}
          style={styles.songImage}
          resizeMode="cover"
        />
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Song Info */}
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.artist}</Text>
        </View>

        {/* Playback Controls */}
        <View style={styles.playbackControls}>
          <TouchableOpacity>
            <Icon name="play-skip-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
            <Icon
              name={isPlaying ? 'pause' : 'play'}
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="play-skip-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity>
            <Icon name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Comment')}>
            <Icon name="chatbubble-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="repeat-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MenuList')}>
            <Icon name="menu-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* More Button */}
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => navigation.navigate('Main', { screen: 'Home' })}
        >
          <Icon name="chevron-up" size={24} color="#fff" />
          <Text style={styles.moreText}>More</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: 20,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  songArtist: {
    color: '#999',
    fontSize: 16,
  },
  playbackControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginBottom: 20,
  },
  playButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8B00FF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  moreButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  moreText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
});

export default ListeningScreen;