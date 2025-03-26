import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const QueueScreen = () => {
  const currentSong = {
    title: 'Song Title',
    artist: 'Artist',
    duration: '5:10',
  };

  const upNextSongs = [
    { id: '1', title: 'Song Title', artist: 'Artist' },
    { id: '2', title: 'Song Title', artist: 'Artist' },
    { id: '3', title: 'Song Title', artist: 'Artist' },
    { id: '4', title: 'Song Title', artist: 'Artist' },
    { id: '5', title: 'Off My Face', artist: 'Artist' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QUEUE</Text>
        <Text style={styles.subTitle}>Playing from For You</Text>
      </View>

      <View style={styles.currentlyPlaying}>
        <View style={styles.songRow}>
          <View style={styles.songImage} />
          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>{currentSong.title}</Text>
            <Text style={styles.artistName}>{currentSong.artist}</Text>
          </View>
          <Text style={styles.duration}>{currentSong.duration}</Text>
        </View>
      </View>

      <View style={styles.upNextSection}>
        <Text style={styles.sectionTitle}>Up Next</Text>
        <ScrollView>
          {upNextSongs.map((song) => (
            <View key={song.id} style={styles.songRow}>
              <View style={styles.songImage} />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <Text style={styles.artistName}>{song.artist}</Text>
              </View>
              <TouchableOpacity>
                <Icon name="ellipsis-vertical" size={20} color="#999" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 15,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#999',
    fontSize: 14,
    marginTop: 5,
  },
  currentlyPlaying: {
    marginBottom: 20,
  },
  upNextSection: {
    flex: 1,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  songImage: {
    width: 50,
    height: 50,
    backgroundColor: '#8B00FF',
    borderRadius: 8,
  },
  songInfo: {
    flex: 1,
    marginLeft: 15,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
  },
  artistName: {
    color: '#999',
    fontSize: 14,
  },
  duration: {
    color: '#999',
    fontSize: 14,
  },
});

export default QueueScreen;