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
import { saveRecentPlayed, getRecentPlayed, saveFavoriteSongs, getFavoriteSongs } from '../data/storage';

const { width } = Dimensions.get('window');

/**
 * ListeningScreen component - Màn hình nghe nhạc
 * Xử lý việc phát nhạc và lưu trữ lịch sử nghe nhạc
 */
const ListeningScreen = ({ navigation, route }) => {
  // Lấy thông tin từ route: bài hát hiện tại, playlist, index, có tự động phát không
  const { song: initialSong, playlist = [], currentIndex = 0, shouldAutoPlay = false } = route.params || {};
  // Các state quản lý trạng thái phát nhạc
  const [isPlaying, setIsPlaying] = useState(false); // Đang phát hay không
  const [sound, setSound] = useState(null); // Đối tượng âm thanh
  const [position, setPosition] = useState(0); // Vị trí phát hiện tại (giây)
  const [duration, setDuration] = useState(0); // Tổng thời lượng bài hát (giây)
  const [currentSong, setCurrentSong] = useState(initialSong); // Bài hát hiện tại
  const [isLiked, setIsLiked] = useState(false); // Trạng thái yêu thích
  const [isLooping, setIsLooping] = useState(false); // Lặp bài
  const [isShuffle, setIsShuffle] = useState(false); // Trộn bài
  const [isSoundLoaded, setIsSoundLoaded] = useState(false); // Âm thanh đã được load chưa
  const [recentPlayed, setRecentPlayed] = useState([]); // Danh sách đã nghe
  const [favoriteSongs, setFavoriteSongs] = useState([]); // Danh sách yêu thích

  // Load dữ liệu đã lưu khi component mount
  useEffect(() => {
    loadSavedData();
  }, []);

  /**
   * Load dữ liệu đã lưu từ AsyncStorage
   */
  const loadSavedData = async () => {
    try {
      const [recent, favorites] = await Promise.all([
        getRecentPlayed(),
        getFavoriteSongs()
      ]);
      setRecentPlayed(recent);
      setFavoriteSongs(favorites);
      setIsLiked(favorites.some(song => song.id === currentSong?.id)); // Kiểm tra bài hát hiện tại có được yêu thích không
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  // Thiết lập audio mode khi màn hình được mount
  useEffect(() => {
    setupAudio();
  }, []);

  // Xử lý dọn dẹp khi rời khỏi màn hình, trừ khi chuyển đến Queue, Comment, Share
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Prevent audio unloading when navigating to these screens
      if (
        e.data.action.payload?.name === 'Queue' ||
        e.data.action.payload?.name === 'Comment' ||
        e.data.action.payload?.name === 'Share'
      ) {
        e.preventDefault();
        return;
      }
      
      // Unload audio when actually leaving the screen
      if (sound) {
        sound.unloadAsync();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [sound, navigation]);

  // Nếu quay lại màn hình, tiếp tục phát nếu đang phát
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (sound && isPlaying) {
        sound.playAsync();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [sound, isPlaying, navigation]);

  // Tải âm thanh mỗi khi đổi bài
  useEffect(() => {
    if (currentSong) {
      loadAudio();
    }
  }, [currentSong]);

  // Cập nhật vị trí phát theo thời gian mỗi 1 giây
  useEffect(() => {
    let interval;
    if (sound && isSoundLoaded) {
      interval = setInterval(async () => {
        if (isPlaying) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setPosition(status.positionMillis / 1000);
            if (status.didJustFinish) {
              if (isLooping) {
                await sound.replayAsync();  // Lặp lại nếu bật lặp
              } else {
                playNextSong(); // Chuyển bài nếu xong
              }
            }
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sound, isPlaying, isSoundLoaded]);

  // Cập nhật bài hát hiện tại khi initialSong thay đổi
  useEffect(() => {
    if (initialSong) {
      setCurrentSong(initialSong);
      saveToRecentPlayed(initialSong);
    }
  }, [initialSong]);
  
   // Cấu hình chế độ phát âm thanh cho thiết bị
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
  
  // Dọn dẹp âm thanh hiện tại
  const cleanupAudio = async () => {
    if (sound && isSoundLoaded) {
      try {
        console.log('Cleaning up audio...');
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.stopAsync(); // Dừng phát nhạc
          await sound.unloadAsync(); // Dọn dẹp tài nguyên âm thanh
        }
        setSound(null);
        setIsSoundLoaded(false); // Đặt lại trạng thái
        setIsPlaying(false);
        setPosition(0);
      } catch (error) {
        console.error('Error cleaning up audio:', error);
      }
    } else {
      console.log('No sound to clean up or sound is not loaded.');
    }
  };
  
  // Tải bài hát mới
  const loadAudio = async () => {
    try {
      // Dọn dẹp audio trước đó nếu có
      await cleanupAudio();

      console.log('Loading audio:', currentSong.audio);

      const { sound: newSound } = await Audio.Sound.createAsync(
        currentSong.audio,
        {
          shouldPlay: shouldAutoPlay,
          progressUpdateIntervalMillis: 1000,
          positionMillis: 0,
          volume: 1.0,
          isLooping: isLooping,
        },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setIsSoundLoaded(true); // Đánh dấu sound đã được tải
      const status = await newSound.getStatusAsync();
      console.log('Audio loaded with status:', status);
      setDuration(status.durationMillis / 1000);
      setPosition(0);
      setIsPlaying(shouldAutoPlay);
    } catch (error) {
      console.error('Error loading audio:', error);
      Alert.alert('Error', 'Could not load audio file. Please check if the audio file exists in assets/audio folder.');
    }
  };
  
  // Hàm xử lý khi trạng thái phát thay đổi
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis / 1000);
      if (status.didJustFinish) {
        if (isLooping) {
          sound.replayAsync();
        } else {
          // Tắt bài cũ trước khi chuyển bài mới
          if (sound && isSoundLoaded) {
            sound.stopAsync();
          }
          playNextSong();
        }
      }
    }
  };
  
  // Phát / Tạm dừng nhạc
  const playPauseSound = async () => {
    if (sound && isSoundLoaded) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Cập nhật thời gian phát khi tua
  const updatePosition = async (pos) => {
    if (sound && isSoundLoaded) {
      await sound.setPositionAsync(pos * 1000);
      setPosition(pos);
    }
  };
  
  // Format hiển thị thời gian mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Phát bài tiếp theo trong playlist
  const playNextSong = async () => {
    // Tìm bài hát tiếp theo
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    
    // Cập nhật bài hát mới và tự động phát
    setCurrentSong(songs[nextIndex]);
    route.params = {
      ...route.params,
      shouldAutoPlay: true
    };
  };
  
  // Phát bài trước
  const playPreviousSong = async () => {
    if (sound && isSoundLoaded) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const previousIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[previousIndex]);
    // Set shouldAutoPlay to true when changing songs
    route.params = {
      ...route.params,
      shouldAutoPlay: true
    };
  };
  
  // Mở màn hình hàng đợi
  const handleQueuePress = () => {
    // Get first 5 songs for the queue
    const queuePlaylist = songs.slice(0, 5);
    
    // Don't stop the music when going to queue
    navigation.navigate('Queue', {
      playlist: queuePlaylist,
      currentSong: currentSong
    });
  };
  
  // Mở màn hình bình luận
  const handleCommentPress = () => {
    // Don't stop the music when going to comments
    navigation.navigate('Comment', {
      song: currentSong
    });
  };
  
  // Mở màn hình chia sẻ
  const handleSharePress = () => {
    // Don't stop the music when going to share
    navigation.navigate('Share', {
      song: currentSong
    });
  };

  /**
   * Lưu bài hát vào danh sách đã nghe gần đây
   */
  const saveToRecentPlayed = async (song) => {
    try {
      const newRecentPlayed = [
        song,
        ...recentPlayed.filter(s => s.id !== song.id)
      ].slice(0, 50); // Giới hạn 50 bài hát gần đây
      await saveRecentPlayed(newRecentPlayed);
      setRecentPlayed(newRecentPlayed);
    } catch (error) {
      console.error('Error saving to recent played:', error);
    }
  };

  /**
   * Xử lý khi người dùng nhấn nút yêu thích
   */
  const handleLikePress = async () => {
    try {
      let updatedFavorites;
      if (isLiked) {
        // Xóa khỏi danh sách yêu thích
        updatedFavorites = favoriteSongs.filter(song => song.id !== currentSong.id);
      } else {
        // Thêm vào danh sách yêu thích
        updatedFavorites = [...favoriteSongs, currentSong];
      }
      
      // Cập nhật state và lưu vào storage
      setFavoriteSongs(updatedFavorites);
      setIsLiked(!isLiked);
      await saveFavoriteSongs(updatedFavorites);
    } catch (error) {
      console.error('Error updating favorite songs:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu thích');
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
          <TouchableOpacity onPress={handleQueuePress}>
            <Icon name="list" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Song Cover */}
        <View style={styles.coverContainer}>
          {currentSong && currentSong.image && (
            <Image
              source={currentSong.image}
              style={styles.coverImage}
              resizeMode="cover"
            />
          )}
        </View>

        {/* Song Info */}
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{currentSong?.title || 'Unknown Title'}</Text>
          <Text style={styles.artistName}>{currentSong?.artist || 'Unknown Artist'}</Text>
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
            onPress={handleLikePress}
          >
            <Icon 
              name={isLiked ? "heart" : "heart-outline"} 
              size={24} 
              color={isLiked ? "#E91E63" : "#fff"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleCommentPress}
          >
            <Icon name="chatbubble-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleSharePress}
          >
            <Icon name="share-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('MenuList', { 
              song: currentSong
            })}
          >
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
    alignItems: 'center',
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