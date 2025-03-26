import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MinimizeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.minimizeBar}>
        <View style={styles.songInfo}>
          <View style={styles.songImage} />
          <View style={styles.songDetails}>
            <Text style={styles.songTitle}>Song Title</Text>
            <View style={styles.progressBar}>
              <View style={styles.progress} />
            </View>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity>
              <Icon name="play-skip-back" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton}>
              <Icon name="play" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="play-skip-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    padding: 15,
  },
  minimizeBar: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 10,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songImage: {
    width: 40,
    height: 40,
    backgroundColor: '#8B00FF',
    borderRadius: 8,
  },
  songDetails: {
    flex: 1,
    marginLeft: 15,
  },
  songTitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#444',
    borderRadius: 1.5,
  },
  progress: {
    width: '30%',
    height: '100%',
    backgroundColor: '#8B00FF',
    borderRadius: 1.5,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  playButton: {
    marginHorizontal: 15,
  },
});

export default MinimizeScreen;