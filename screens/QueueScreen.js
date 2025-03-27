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

  const playNextSong = async (song, index) => {
    // Navigate back to Listening screen with the selected song
    navigation.goBack();
    // Update the current song in Listening screen
    navigation.navigate('Listening', {
      song: song,
      playlist: playlist,
      currentIndex: index,
      shouldAutoPlay: true // Add flag to auto play the selected song
    });
  };

  const renderSongItem = (song, index) => (
    <TouchableOpacity
      key={song.id}
      style={[
        styles.songItem,
        currentSong?.id === song.id && styles.currentSongItem
      ]}
      onPress={() => playNextSong(song, index)}
    >
      <View style={styles.songNumberContainer}>
        {currentSong?.id === song.id ? (
          <Icon name="musical-notes" size={20} color="#A78BFA" />
        ) : (
          <Text style={styles.songNumber}>{index + 1}</Text>
        )}
      </View>
      <Image source={{ uri: song.image }} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text 
          style={[
            styles.songTitle,
            currentSong?.id === song.id && styles.currentSongText
          ]}
          numberOfLines={1}
        >
          {song.title}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {song.artist}
        </Text>
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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Playing Queue</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Current Playing */}
      {currentSong && (
        <View style={styles.currentSection}>
          <Text style={styles.sectionTitle}>Now Playing</Text>
          {renderSongItem(currentSong, playlist.findIndex(s => s.id === currentSong.id))}
        </View>
      )}

      {/* Queue List */}
      <View style={styles.queueSection}>
        <Text style={styles.sectionTitle}>Next Up</Text>
        <ScrollView style={styles.songsList}>
          {playlist.map((song, index) => (
            song.id !== currentSong?.id && renderSongItem(song, index)
          ))}
        </ScrollView>
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
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 34, // Same width as backButton for alignment
    alignItems: 'flex-end',
  },
  currentSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  queueSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#B0B0B0',
    fontSize: 16,
    marginBottom: 15,
  },
  songsList: {
    flex: 1,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  currentSongItem: {
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  songNumberContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
  currentSongText: {
    color: '#A78BFA',
  },
  artistName: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  moreButton: {
    padding: 8,
  },
});

export default QueueScreen;