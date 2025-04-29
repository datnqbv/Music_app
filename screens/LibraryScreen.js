import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';
import { songs } from '../data/songs';
import {
  getPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from '../data/storage';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

/**
 * LibraryScreen component - Màn hình thư viện
 * Hiển thị và quản lý playlist, album, nghệ sĩ và bài hát gần đây
 */
const LibraryScreen = ({ navigation, route }) => {
  // State quản lý tab hiện tại
  const [activeTab, setActiveTab] = useState('Playlist');
  // State quản lý layout hiển thị (grid/list)
  const [isGridLayout, setIsGridLayout] = useState(false);
  // State quản lý danh sách playlist
  const [playlists, setPlaylists] = useState([]);
  // State quản lý hiển thị modal tạo/chỉnh sửa playlist
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State quản lý tên playlist mới
  const [newPlaylistName, setNewPlaylistName] = useState('');
  // State quản lý playlist đang chỉnh sửa
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  // Thêm state để theo dõi playlist đang được chọn
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Thêm ref cho ScrollView
  const scrollViewRef = useRef(null);

  // Thêm state cho modal thêm bài hát
  const [isAddSongModalVisible, setIsAddSongModalVisible] = useState(false);

  // Thêm states cho phát nhạc
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);

  // Thêm state cho modal chọn playlist
  const [isSelectPlaylistModalVisible, setIsSelectPlaylistModalVisible] = useState(false);
  const [selectedSongForPlaylist, setSelectedSongForPlaylist] = useState(null);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);

  // Add effect to handle updatedPlaylist
  useEffect(() => {
    if (route.params?.updatedPlaylist) {
      const updatedPlaylist = route.params.updatedPlaylist;
      setPlaylists(playlists.map(p => 
        p.id === updatedPlaylist.id ? updatedPlaylist : p
      ));
      
      // If the updated playlist is currently selected, update it too
      if (selectedPlaylist?.id === updatedPlaylist.id) {
        setSelectedPlaylist(updatedPlaylist);
      }
    }
  }, [route.params?.updatedPlaylist]);

  // Cleanup sound khi component unmount
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  /**
   * Load danh sách playlist từ AsyncStorage khi component mount
   */
  useEffect(() => {
    loadPlaylists();
  }, []);

  // Reload playlists mỗi khi LibraryScreen được focus
  useFocusEffect(
    React.useCallback(() => {
      loadPlaylists();
    }, [])
  );

  /**
   * Load danh sách playlist từ AsyncStorage
   */
  const loadPlaylists = async () => {
    try {
      const loadedPlaylists = await getPlaylists();
      setPlaylists(loadedPlaylists);
    } catch (error) {
      console.error('Error loading playlists:', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách playlist');
    }
  };

  /**
   * Xử lý tạo playlist mới
   */
  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên playlist');
      return;
    }

    try {
      const newPlaylist = await createPlaylist({
        name: newPlaylistName.trim(),
        description: '',
        coverImage: null,
        songs: [],
      });
      setPlaylists([...playlists, newPlaylist]);
      setIsModalVisible(false);
      setNewPlaylistName('');
    } catch (error) {
      console.error('Error creating playlist:', error);
      Alert.alert('Lỗi', 'Không thể tạo playlist mới');
    }
  };

  /**
   * Xử lý xóa playlist
   * @param {string} playlistId - ID của playlist cần xóa
   */
  const handleDeletePlaylist = async (playlistId) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa playlist này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePlaylist(playlistId);
              setPlaylists(playlists.filter(p => p.id !== playlistId));
              setSelectedPlaylist(null);
            } catch (error) {
              Alert.alert('Lỗi', 'Không thể xóa playlist');
            }
          },
        },
      ]
    );
  };

  /**
   * Xử lý chỉnh sửa playlist
   */
  const handleEditPlaylist = async () => {
    if (!editingPlaylist || !editingPlaylist.name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên playlist');
      return;
    }

    try {
      const updatedPlaylist = await updatePlaylist(editingPlaylist.id, {
        name: editingPlaylist.name.trim(),
        description: editingPlaylist.description,
      });
      setPlaylists(playlists.map(p => 
        p.id === updatedPlaylist.id ? updatedPlaylist : p
      ));
      setIsModalVisible(false);
      setEditingPlaylist(null);
    } catch (error) {
      console.error('Error updating playlist:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật playlist');
    }
  };

  // Lấy 5 bài hát gần đây nhất
  const recentSongs = songs.slice(0, 5);

  // Lấy danh sách nghệ sĩ duy nhất từ songs
  const artists = [...new Set(songs.map(song => song.artist))].map(artist => ({
    id: artist.toLowerCase().replace(/\s+/g, '-'),
    name: artist,
    songs: '10 songs',
    image: songs.find(song => song.artist === artist)?.image,
  }));

  /**
   * Render tab trong thanh điều hướng
   * @param {string} tabName - Tên tab
   * @param {string} icon - Tên icon
   * @returns {JSX.Element} - Component tab
   */
  const renderTab = (tabName, icon) => (
    <TouchableOpacity
      style={[styles.tab, activeTab === tabName && styles.activeTab]}
      onPress={() => setActiveTab(tabName)}
    >
      <Icon name={icon} size={20} color={activeTab === tabName ? '#fff' : '#B0B0B0'} />
      <Text style={[styles.tabText, activeTab === tabName && styles.activeTabText]}>
        {tabName}
      </Text>
    </TouchableOpacity>
  );

  // Helper function to filter unique by id
  function uniqueById(arr) {
    const seen = new Set();
    return arr.filter(item => {
      if (!item?.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }

  /**
   * Render item playlist trong danh sách
   * @param {Object} playlist - Thông tin playlist
   * @returns {JSX.Element} - Component playlist item
   */
  const renderPlaylistItem = (playlist) => (
    <TouchableOpacity
      key={playlist.id}
      style={[styles.playlistItem, selectedPlaylist?.id === playlist.id && styles.selectedPlaylistItem]}
      onPress={() => {
        if (selectedPlaylist?.id === playlist.id) {
          setSelectedPlaylist(null);
        } else {
          setSelectedPlaylist(playlist);
          setTimeout(() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollTo({ y: 300, animated: true });
            }
          }, 100);
        }
      }}
    >
      <LinearGradient
        colors={['#9C27B0', '#673AB7']}
        style={styles.playlistImageContainer}
      >
        <Image
          source={playlist.coverImage || require('../assets/images/playlist-2.jpg')}
          style={styles.playlistImage}
        />
        <View style={styles.cdHole}>
          <View style={styles.cdHoleInner} />
        </View>
        <View style={styles.cdRing} />
      </LinearGradient>
      <Text style={styles.playlistTitle} numberOfLines={1}>{playlist.name}</Text>
      <Text style={styles.playlistSongCount}>{playlist.songs?.length || 0} songs</Text>
    </TouchableOpacity>
  );

  /**
   * Render item nghệ sĩ trong danh sách
   * @param {Object} artist - Thông tin nghệ sĩ
   * @returns {JSX.Element} - Component artist item
   */
  const renderArtistItem = (artist) => (
    <TouchableOpacity
      key={artist.id}
      style={styles.artistItem}
      onPress={() => {
        Alert.alert('Thông báo', 'Tính năng xem chi tiết nghệ sĩ đang được phát triển');
      }}
    >
      {artist.image && <Image source={artist.image} style={styles.artistImage} />}
      <Text style={styles.artistItemTitle}>{artist.name}</Text>
      <Text style={styles.artistSongs}>{artist.songs}</Text>
    </TouchableOpacity>
  );

  /**
   * Xử lý phát/dừng nhạc
   * @param {Object} song - Bài hát cần phát
   */
  const handlePlayPause = async (song) => {
    if (sound === null) {
      // Load bài hát mới
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          song.audio,
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
        setIsPlaying(true);
        setCurrentSong(song);
      } catch (error) {
        console.error('Error loading sound:', error);
        Alert.alert('Lỗi', 'Không thể phát bài hát này');
      }
    } else {
      // Nếu đang phát bài khác, dừng và phát bài mới
      if (currentSong?.id !== song.id) {
        await sound.unloadAsync();
        try {
          const { sound: newSound } = await Audio.Sound.createAsync(
            song.audio,
            { shouldPlay: true },
            onPlaybackStatusUpdate
          );
          setSound(newSound);
          setIsPlaying(true);
          setCurrentSong(song);
        } catch (error) {
          console.error('Error loading sound:', error);
          Alert.alert('Lỗi', 'Không thể phát bài hát này');
        }
      } else {
        // Play/Pause bài hiện tại
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  /**
   * Callback khi trạng thái phát nhạc thay đổi
   */
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis);
      setPlaybackDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  /**
   * Format thời gian từ milliseconds sang mm:ss
   */
  const getTimeString = (millis) => {
    if (millis === null) return '--:--';
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  /**
   * Render item bài hát trong danh sách
   */
  const renderSongItem = (song, index) => {
    // Lấy danh sách bài hát hiện tại (playlist hoặc recent)
    const currentSongList = selectedPlaylist ? selectedPlaylist.songs : recentSongs;
    
    return (
      <TouchableOpacity
        key={song.id}
        style={isGridLayout ? styles.songItemGrid : styles.songItem}
        onPress={() => {
          navigation.navigate('Listening', {
            song,
            playlist: currentSongList,
            currentIndex: index,
            shouldAutoPlay: true
          });
        }}
      >
        {song.image && (
          <Image
            source={song.image}
            style={isGridLayout ? styles.songImageGrid : styles.songImage}
          />
        )}
        <View style={isGridLayout ? styles.songInfoGrid : styles.songInfo}>
          <Text style={styles.songTitle} numberOfLines={1}>
            {song.title || 'Unknown Title'}
          </Text>
          <Text style={styles.artistName} numberOfLines={1}>
            {song.artist || 'Unknown Artist'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => {
            setSelectedSongForPlaylist(song);
            setIsActionModalVisible(true);
          }}
        >
          <Icon name="ellipsis-vertical" size={20} color="#B0B0B0" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  /**
   * Xử lý khi nhấn nút tìm kiếm
   */
  const handleSearchPress = () => {
    // TODO: Implement search
    Alert.alert('Thông báo', 'Tính năng tìm kiếm đang được phát triển');
  };

  /**
   * Xử lý thêm bài hát vào playlist
   * @param {Object} song - Bài hát cần thêm
   */
  const handleAddToPlaylist = async (playlistId) => {
    try {
      if (!selectedSongForPlaylist) return;

      // Kiểm tra xem bài hát đã có trong playlist chưa
      const playlist = playlists.find(p => p.id === playlistId);
      const songExists = playlist.songs?.some(s => s.id === selectedSongForPlaylist.id);
      
      if (songExists) {
        Alert.alert('Thông báo', 'Bài hát đã có trong playlist này');
        return;
      }

      // Thêm bài hát vào playlist
      await addSongToPlaylist(playlistId, selectedSongForPlaylist);
      
      // Cập nhật state
      const updatedPlaylist = {
        ...playlist,
        songs: [...(playlist.songs || []), selectedSongForPlaylist]
      };
      
      setPlaylists(playlists.map(p => 
        p.id === playlistId ? updatedPlaylist : p
      ));

      // Nếu đang xem playlist được chọn, cập nhật selectedPlaylist
      if (selectedPlaylist?.id === playlistId) {
        setSelectedPlaylist(updatedPlaylist);
      }

      // Đóng modal
      setIsSelectPlaylistModalVisible(false);
      setSelectedSongForPlaylist(null);
      
      Alert.alert('Thành công', 'Đã thêm bài hát vào playlist');
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      Alert.alert('Lỗi', 'Không thể thêm bài hát vào playlist');
    }
  };

  // Thêm hàm xử lý xóa bài hát khỏi playlist
  const handleRemoveFromPlaylist = async (songId) => {
    try {
      if (!selectedPlaylist) return;

      await removeSongFromPlaylist(selectedPlaylist.id, songId);
      
      const updatedPlaylist = {
        ...selectedPlaylist,
        songs: selectedPlaylist.songs.filter(s => s.id !== songId)
      };
      
      setSelectedPlaylist(updatedPlaylist);
      setPlaylists(playlists.map(p => 
        p.id === selectedPlaylist.id ? updatedPlaylist : p
      ));
      
      setIsActionModalVisible(false);
      Alert.alert('Thành công', 'Đã xóa bài hát khỏi playlist');
    } catch (error) {
      console.error('Error removing song from playlist:', error);
      Alert.alert('Lỗi', 'Không thể xóa bài hát khỏi playlist');
    }
  };

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Library</Text>
        <TouchableOpacity 
          key="searchButton"
          style={styles.searchButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {renderTab('Playlist', 'list')}
        {renderTab('Artist', 'person')}
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.content}
      >
        {/* Playlists Grid */}
        {activeTab === 'Playlist' && (
          <View style={styles.playlistGrid}>
            <TouchableOpacity
              style={styles.createPlaylistButton}
              onPress={() => {
                setEditingPlaylist(null);
                setNewPlaylistName('');
                setIsModalVisible(true);
              }}
            >
              <LinearGradient
                colors={['#9C27B0', '#673AB7']}
                style={styles.createPlaylistImageContainer}
              >
                <Icon name="add" size={40} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.createPlaylistTitle}>Create New</Text>
              <Text style={styles.createPlaylistText}>Playlist</Text>
            </TouchableOpacity>
            {uniqueById(playlists).map(playlist => (
              <TouchableOpacity
                key={playlist.id}
                style={[styles.playlistItem, selectedPlaylist?.id === playlist.id && styles.selectedPlaylistItem]}
                onPress={() => {
                  if (selectedPlaylist?.id === playlist.id) {
                    setSelectedPlaylist(null);
                  } else {
                    setSelectedPlaylist(playlist);
                    setTimeout(() => {
                      if (scrollViewRef.current) {
                        scrollViewRef.current.scrollTo({ y: 300, animated: true });
                      }
                    }, 100);
                  }
                }}
              >
                <LinearGradient
                  colors={['#9C27B0', '#673AB7']}
                  style={styles.playlistImageContainer}
                >
                  <Image
                    source={playlist.coverImage || require('../assets/images/playlist-2.jpg')}
                    style={styles.playlistImage}
                  />
                  <View style={styles.cdHole}>
                    <View style={styles.cdHoleInner} />
                  </View>
                  <View style={styles.cdRing} />
                </LinearGradient>
                <Text style={styles.playlistTitle} numberOfLines={1}>{playlist.name}</Text>
                <Text style={styles.playlistSongCount}>{playlist.songs?.length || 0} songs</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Artists Grid */}
        {activeTab === 'Artist' && (
          <View style={styles.artistGrid}>
            {uniqueById(artists).map(artist => (
              <TouchableOpacity
                key={artist.id}
                style={styles.artistItem}
                onPress={() => {
                  Alert.alert('Thông báo', 'Tính năng xem chi tiết nghệ sĩ đang được phát triển');
                }}
              >
                {artist.image && <Image source={artist.image} style={styles.artistImage} />}
                <Text style={styles.artistItemTitle}>{artist.name}</Text>
                <Text style={styles.artistSongs}>{artist.songs}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Songs Section */}
        {activeTab === 'Playlist' && (
          <View style={styles.recentSection}>
            <View style={styles.sectionHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={styles.sectionTitle}>
                  {selectedPlaylist ? selectedPlaylist.name : 'Recent'}
                </Text>
                {selectedPlaylist && (
                  <TouchableOpacity
                    style={{ marginLeft: 12, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 6 }}
                    onPress={() => handleDeletePlaylist(selectedPlaylist.id)}
                  >
                    <Icon name="trash" size={20} color="#FF5252" />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.headerActions}>
                {selectedPlaylist && (
                  <TouchableOpacity 
                    style={styles.addSongButton}
                    onPress={() => navigation.navigate('Home', {
                      screen: 'HomeTab',
                      initial: false
                    })}
                  >
                    <Icon name="add" size={24} color="#FFFFFF" />
                    <Text style={styles.addSongText}>Add songs</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={styles.viewModeButton}
                  onPress={() => setIsGridLayout(!isGridLayout)}
                >
                  <Icon
                    name={isGridLayout ? 'list' : 'grid'}
                    size={20}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {selectedPlaylist && selectedPlaylist.songs?.length === 0 ? (
              <View style={styles.emptyPlaylist}>
                <Text style={styles.emptyText}>No songs yet</Text>
                <Text style={styles.emptySubText}>Go to Home to add songs to your playlist</Text>
              </View>
            ) : (
              <View style={[styles.songsList, isGridLayout && styles.songsGrid]}>
                {uniqueById(selectedPlaylist ? selectedPlaylist.songs : recentSongs).map((song, index) => (
                  <TouchableOpacity
                    key={song.id}
                    style={isGridLayout ? styles.songItemGrid : styles.songItem}
                    onPress={() => {
                      navigation.navigate('Listening', {
                        song,
                        playlist: selectedPlaylist ? selectedPlaylist.songs : recentSongs,
                        currentIndex: index,
                        shouldAutoPlay: true
                      });
                    }}
                  >
                    {song.image && (
                      <Image
                        source={song.image}
                        style={isGridLayout ? styles.songImageGrid : styles.songImage}
                      />
                    )}
                    <View style={isGridLayout ? styles.songInfoGrid : styles.songInfo}>
                      <Text style={styles.songTitle} numberOfLines={1}>
                        {song.title || 'Unknown Title'}
                      </Text>
                      <Text style={styles.artistName} numberOfLines={1}>
                        {song.artist || 'Unknown Artist'}
                      </Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.moreButton}
                      onPress={() => {
                        setSelectedSongForPlaylist(song);
                        setIsActionModalVisible(true);
                      }}
                    >
                      <Icon name="ellipsis-vertical" size={20} color="#B0B0B0" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Modal tạo/chỉnh sửa playlist */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingPlaylist ? 'Chỉnh sửa Playlist' : 'Tạo Playlist Mới'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Tên playlist"
              placeholderTextColor="#B0B0B0"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setIsModalVisible(false);
                  setEditingPlaylist(null);
                  setNewPlaylistName('');
                }}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={editingPlaylist ? handleEditPlaylist : handleCreatePlaylist}
              >
                <Text style={styles.buttonText}>
                  {editingPlaylist ? 'Lưu' : 'Tạo'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal thêm bài hát */}
      <Modal
        visible={isAddSongModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsAddSongModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { height: '80%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Thêm bài hát vào playlist</Text>
              <TouchableOpacity 
                onPress={() => setIsAddSongModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={songs}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.songItemInModal}
                  onPress={() => handleAddToPlaylist(item.id)}
                >
                  <Image
                    source={item.image}
                    style={styles.songImageInModal}
                  />
                  <View style={styles.songInfoInModal}>
                    <Text style={styles.songTitleInModal} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.artistNameInModal} numberOfLines={1}>
                      {item.artist}
                    </Text>
                  </View>
                  <Icon name="add-circle-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              )}
              style={styles.songsList}
            />
          </View>
        </View>
      </Modal>

      {/* Modal chọn hành động */}
      <Modal
        visible={isActionModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setIsActionModalVisible(false);
          setSelectedSongForPlaylist(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { height: '40%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn hành động</Text>
              <TouchableOpacity 
                key="closeActionModal"
                onPress={() => {
                  setIsActionModalVisible(false);
                  setSelectedSongForPlaylist(null);
                }}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                key="addToPlaylist"
                style={styles.actionButton}
                onPress={() => {
                  setIsActionModalVisible(false);
                  setIsSelectPlaylistModalVisible(true);
                }}
              >
                <Icon name="add-circle-outline" size={24} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Thêm vào playlist</Text>
              </TouchableOpacity>

              {selectedPlaylist && (
                <TouchableOpacity
                  key="removeFromPlaylist"
                  style={styles.actionButton}
                  onPress={() => {
                    handleRemoveFromPlaylist(selectedSongForPlaylist.id);
                  }}
                >
                  <Icon name="trash-outline" size={24} color="#FF5252" />
                  <Text style={[styles.actionButtonText, { color: '#FF5252' }]}>
                    Xóa khỏi playlist
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal chọn playlist */}
      <Modal
        visible={isSelectPlaylistModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setIsSelectPlaylistModalVisible(false);
          setSelectedSongForPlaylist(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { height: '60%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn playlist</Text>
              <TouchableOpacity 
                onPress={() => {
                  setIsSelectPlaylistModalVisible(false);
                  setSelectedSongForPlaylist(null);
                }}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={playlists}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.playlistItemInModal}
                  onPress={() => handleAddToPlaylist(item.id)}
                >
                  <LinearGradient
                    colors={['#9C27B0', '#673AB7']}
                    style={styles.playlistImageContainerInModal}
                  >
                    <Image
                      source={item.coverImage || require('../assets/images/playlist-2.jpg')}
                      style={styles.playlistImageInModal}
                    />
                  </LinearGradient>
                  <View style={styles.playlistInfoInModal}>
                    <Text style={styles.playlistTitleInModal} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.playlistSongCountInModal}>
                      {item.songs?.length || 0} bài hát
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              style={styles.playlistsList}
            />
          </View>
        </View>
      </Modal>
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
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'transparent',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#7B1FA2',
  },
  tabText: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  playlistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    gap: 20,
  },
  createPlaylistButton: {
    width: (width - 70) / 3,
    alignItems: 'center',
  },
  createPlaylistImageContainer: {
    width: (width - 70) / 3,
    height: (width - 70) / 3,
    borderRadius: (width - 70) / 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  createPlaylistTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  createPlaylistText: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  playlistItem: {
    width: (width - 70) / 3,
    alignItems: 'center',
  },
  playlistImageContainer: {
    width: (width - 70) / 3,
    height: (width - 70) / 3,
    borderRadius: (width - 70) / 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    padding: 3,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  playlistImage: {
    width: '100%',
    height: '100%',
    borderRadius: (width - 70) / 6,
    opacity: 0.85,
  },
  cdHole: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1E0A3C',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  cdHoleInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A148C',
  },
  cdRing: {
    position: 'absolute',
    width: '60%',
    height: '60%',
    borderRadius: (width - 70) / 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 1,
  },
  playlistTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  playlistSongCount: {
    color: '#B0B0B0',
    fontSize: 14,
    textAlign: 'center',
  },
  selectedPlaylistItem: {
    opacity: 0.7,
  },
  artistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    gap: 15,
  },
  artistItem: {
    width: (width - 60) / 3,
    alignItems: 'center',
  },
  artistImage: {
    width: (width - 60) / 3,
    height: (width - 60) / 3,
    borderRadius: 8,
    marginBottom: 8,
  },
  artistItemTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artistSongs: {
    color: '#B0B0B0',
    fontSize: 12,
    textAlign: 'center',
  },
  recentSection: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  songsList: {
    gap: 12,
  },
  songsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
  },
  songItemGrid: {
    width: (width - 54) / 2,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  songImageGrid: {
    width: (width - 78) / 2,
    height: (width - 78) / 2,
    borderRadius: 8,
    marginBottom: 12,
  },
  songInfo: {
    flex: 1,
  },
  songInfoGrid: {
    alignItems: 'center',
  },
  songTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  moreButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#1E0A3C',
    borderRadius: 16,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  confirmButton: {
    backgroundColor: '#A78BFA',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyPlaylist: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubText: {
    color: '#B0B0B0',
    fontSize: 14,
    textAlign: 'center',
  },
  addSongButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7B1FA2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addSongText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 5,
  },
  songItemInModal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  songImageInModal: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 12,
  },
  songInfoInModal: {
    flex: 1,
  },
  songTitleInModal: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  artistNameInModal: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  viewModeButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  songMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  songActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  playingSongItem: {
    borderColor: '#7B1FA2',
    borderWidth: 1,
  },
  playingSongText: {
    color: '#7B1FA2',
  },
  songDuration: {
    color: '#B0B0B0',
    fontSize: 12,
    marginTop: 4,
  },
  playlistItemInModal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  playlistImageContainerInModal: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 12,
    padding: 3,
  },
  playlistImageInModal: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  playlistInfoInModal: {
    flex: 1,
  },
  playlistTitleInModal: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  playlistSongCountInModal: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  playlistsList: {
    flex: 1,
  },
  actionButtons: {
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    marginBottom: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 12,
  },
});

export default LibraryScreen;