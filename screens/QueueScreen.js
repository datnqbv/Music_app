import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const QueueScreen = ({ route, navigation }) => {
  // Add default values when route.params is undefined
  const { playlist = [], currentSong = null } = route.params || {};

  const renderSongItem = (song, index) => (
    <TouchableOpacity
      key={song.id}
      style={[
        styles.songItem,
        currentSong?.id === song.id && styles.currentSongItem,
      ]}
      onPress={() => navigation.navigate('Listening', {
        song,
        playlist,
        currentIndex: index,
        shouldAutoPlay: true,
      })}
    >
      <View style={styles.songNumberContainer}>
        <Text style={styles.songNumber}>{index + 1}</Text>
        <Image
          source={song.image}
          style={styles.songImage}
          defaultSource={require('../assets/mona.webp')}
        />
      </View>
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {song.title || 'Unknown Title'}
        </Text>
        <Text style={styles.artistName}>{song.artist || 'Unknown Artist'}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Icon name="ellipsis-vertical" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Get next up songs (all songs except current)
  const nextUpSongs = playlist.filter(song => song.id !== currentSong?.id);

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Playing Queue</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Now Playing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Now Playing</Text>
          {currentSong && renderSongItem(currentSong, 0)}
        </View>

        {/* Next Up */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Up</Text>
          {nextUpSongs.map((song, index) => renderSongItem(song, index + 1))}
        </View>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#B0B0B0',
    fontSize: 18,
    marginBottom: 15,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    marginBottom: 10,
  },
  currentSongItem: {
    backgroundColor: 'rgba(156,39,176,0.2)',
  },
  songNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  songNumber: {
    color: '#B0B0B0',
    fontSize: 16,
    width: 30,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  songInfo: {
    flex: 1,
    marginLeft: 15,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  artistName: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  moreButton: {
    padding: 10,
  },
  emptyText: {
    color: '#B0B0B0',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default QueueScreen;