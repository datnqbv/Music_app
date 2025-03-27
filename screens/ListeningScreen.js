import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { songs } from '../data/songs';

const { width } = Dimensions.get('window');

const ListeningScreen = ({ navigation, route }) => {
  const { song: initialSong, playlist = [], currentIndex = 0, shouldAutoPlay = false } = route.params || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState(initialSong);
  const [isLiked, setIsLiked] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  useEffect(() => {
    setupAudio();
    return () => {
      if (sound) {
        console.log('Cleaning up audio...');
        sound.stopAsync().then(() => {
          sound.unloadAsync();
          setSound(null);
          setIsPlaying(false);
        });
      }
    };
  }, []);

  useEffect(() => {
    loadAudio();
  }, [currentSong]);

  useEffect(() => {
    if (sound) {
      const interval = setInterval(async () => {
        if (isPlaying) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setPosition(status.positionMillis / 1000);
            if (status.didJustFinish) {
              if (isLooping) {
                await sound.replayAsync();
              } else {
                playNextSong();
              }
            }
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sound, isPlaying]);

  useEffect(() => {
    if (shouldAutoPlay && currentSong) {
      loadAudio();
      playSound();
    }
  }, [currentSong, shouldAutoPlay]);

  useEffect(() => {
    if (initialSong) {
      setCurrentSong(initialSong);
    }
  }, [initialSong]);

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.log('Error setting up audio:', error);
    }
  };

  const loadAudio = async () => {
    try {
      // Unload previous audio if exists
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      console.log('Loading audio:', currentSong.audio);
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        currentSong.audio,
        { 
          shouldPlay: false,
          progressUpdateIntervalMillis: 1000,
          positionMillis: 0,
          volume: 1.0,
          isLooping: isLooping,
        },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      const status = await newSound.getStatusAsync();
      console.log('Audio loaded with status:', status);
      setDuration(status.durationMillis / 1000);
      setPosition(0);
      setIsPlaying(false);
    } catch (error) {
      console.error('Error loading audio:', error);
      Alert.alert('Error', 'Could not load audio file. Please check if the audio file exists in assets/audio folder.');
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis / 1000);
      if (status.didJustFinish) {
        if (isLooping) {
          sound.replayAsync();
        } else {
          playNextSong();
        }
      }
    }
  };

  const playPauseSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updatePosition = async (pos) => {
    if (sound) {
      await sound.setPositionAsync(pos * 1000);
      setPosition(pos);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const playNextSong = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const playPreviousSong = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const previousIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[previousIndex]);
  };

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-down" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Now Playing</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Queue', {
              playlist: route.params?.playlist || [currentSong],
              currentSong: currentSong
            })}
          >
            <Icon name="list" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Song Cover */}
        <View style={styles.coverContainer}>
          <Image
            source={{ uri: currentSong.image }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        </View>

        {/* Song Info */}
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{currentSong.title}</Text>
          <Text style={styles.artistName}>{currentSong.artist}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Slider
            style={styles.progressBar}
            value={position}
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor="#9C27B0"
            maximumTrackTintColor="#4A148C"
            thumbTintColor="#9C27B0"
            onSlidingComplete={updatePosition}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setIsShuffle(!isShuffle)}
          >
            <Icon
              name="shuffle"
              size={24}
              color={isShuffle ? '#9C27B0' : '#fff'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={playPreviousSong}
          >
            <Icon name="play-skip-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playButton}
            onPress={playPauseSound}
          >
            <Icon
              name={isPlaying ? 'pause' : 'play'}
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={playNextSong}
          >
            <Icon name="play-skip-forward" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setIsLooping(!isLooping)}
          >
            <Icon
              name="repeat"
              size={24}
              color={isLooping ? '#9C27B0' : '#fff'}
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Icon
              name={isLiked ? 'heart' : 'heart-outline'}
              size={24}
              color={isLiked ? '#9C27B0' : '#fff'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Comment')}
          >
            <Icon name="chatbubble-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Share')}
          >
            <Icon name="share-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="ellipsis-horizontal" size={24} color="#fff" />
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  coverContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  coverImage: {
    width: width - 80,
    height: width - 80,
    borderRadius: 20,
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  songTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artistName: {
    fontSize: 16,
    color: '#B0B0B0',
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  timeText: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  controlButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#9C27B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListeningScreen;