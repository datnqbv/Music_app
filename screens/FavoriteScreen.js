import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const FavoriteScreen = () => {
  const navigation = useNavigation();

  const favoriteSongs = [
    {
      id: '1',
      title: 'Lorem ipsum',
      artist: 'Artist Name',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '2',
      title: 'Song Title',
      artist: 'Artist',
      image: require('../assets/song-image.jpg'),
    },
  ];

  const renderSongItem = (song) => (
    <TouchableOpacity
      key={song.id}
      style={styles.songItem}
      onPress={() => navigation.navigate('Listening', { song })}
    >
      <View style={styles.songInfo}>
        <Image source={song.image} style={styles.songImage} />
        <View style={styles.songDetails}>
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.artist}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Icon name="ellipsis-vertical" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#1E0A3C', '#000000']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ width: 24 }} />
      </View>

      {/* Song Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/song-image.jpg')}
          style={styles.headerImage}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.subTitle}>Artist</Text>

      {/* Playlist Title */}
      <Text style={styles.playlistTitle}>Favorite Songs</Text>

      {/* Control Buttons */}
      <View style={styles.controlButtons}>
        <TouchableOpacity style={styles.playButton}>
          <Icon name="play" size={24} color="#000" />
          <Text style={styles.playButtonText}>PLAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shuffleButton}>
          <Icon name="shuffle" size={24} color="#fff" />
          <Text style={styles.shuffleButtonText}>SHUFFLE</Text>
        </TouchableOpacity>
      </View>

      {/* Add Songs Button */}
      <TouchableOpacity style={styles.addButton}>
        <Icon name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add songs</Text>
      </TouchableOpacity>

      {/* Songs List */}
      <ScrollView style={styles.songsList}>
        {favoriteSongs.map(renderSongItem)}
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
    paddingTop: 50,
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  subTitle: {
    color: '#999',
    fontSize: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  controlButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  playButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  playButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shuffleButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  shuffleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  songsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  songArtist: {
    color: '#999',
    fontSize: 14,
  },
  moreButton: {
    padding: 10,
  },
});

export default FavoriteScreen;