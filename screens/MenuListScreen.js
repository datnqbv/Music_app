import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getPlaylists, addSongToPlaylist } from '../data/storage';
import { songs } from '../data/songs';

const MenuListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { song } = route.params || {};
  const [playlists, setPlaylists] = useState([]);
  const [isPlaylistModalVisible, setIsPlaylistModalVisible] = useState(false);

  // Load playlists when component mounts
  React.useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      const loadedPlaylists = await getPlaylists();
      setPlaylists(loadedPlaylists);
    } catch (error) {
      console.error('Error loading playlists:', error);
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      if (!song) return;

      // Log kiểm tra object song và id
      console.log('song nhận được:', song);
      console.log('song.id:', song?.id);
      console.log('Tất cả id trong songs:', songs.map(s => s.id));

      // Lấy object bài hát gốc từ mảng songs (so sánh lỏng == để tránh lỗi kiểu dữ liệu)
      const songToAdd = songs.find(s => s.id == song.id);
      if (!songToAdd) {
        alert('Không tìm thấy bài hát gốc!');
        return;
      }

      // Check if song already exists in playlist
      const playlist = playlists.find(p => p.id === playlistId);
      const songExists = playlist.songs?.some(s => s.id == songToAdd.id);
      
      if (songExists) {
        alert('Bài hát đã có trong playlist này');
        return;
      }

      // Add song to playlist
      await addSongToPlaylist(playlistId, songToAdd);
      
      // Update playlist state
      const updatedPlaylist = {
        ...playlist,
        songs: [...(playlist.songs || []), songToAdd]
      };
      
      // Update playlists state
      setPlaylists(playlists.map(p => 
        p.id === playlistId ? updatedPlaylist : p
      ));

      // Navigate back to previous screen (Library) without reload
      setIsPlaylistModalVisible(false);
      alert('Đã thêm bài hát vào playlist');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      alert('Không thể thêm bài hát vào playlist');
    }
  };

  const menuOptions = [
    {
      id: '1',
      name: 'Shuffle',
      icon: 'shuffle',
      screen: 'Listening',
    },
    {
      id: '2',
      name: 'Repeat',
      icon: 'repeat',
      screen: 'Listening',
    },
    {
      id: '3',
      name: 'Repeat One',
      icon: 'help-circle-outline',
      screen: 'Listening',
    },
    {
      id: '4',
      name: 'Favorite',
      icon: 'heart-outline',
      screen: 'Favorite',
    },
    {
      id: '5',
      name: 'Add Your Playlist',
      icon: 'add',
      onPress: () => setIsPlaylistModalVisible(true),
    },
    {
      id: '6',
      name: 'Add Your Album',
      icon: 'albums-outline',
      screen: 'Library',
    },
    {
      id: '7',
      name: 'Download',
      icon: 'download-outline',
      screen: 'Download',
    },
    {
      id: '8',
      name: 'Share',
      icon: 'share-social-outline',
      screen: 'Share',
    },
  ];

  const handleMenuItemPress = (item) => {
    if (item.onPress) {
      item.onPress();
    } else if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  const renderMenuItem = (item) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.menuItem}
      onPress={() => handleMenuItemPress(item)}
    >
      <Icon name={item.icon} size={24} color="#fff" style={styles.menuIcon} />
      <Text style={styles.menuText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity
      style={styles.playlistItem}
      onPress={() => handleAddToPlaylist(item.id)}
    >
      <LinearGradient
        colors={['#9C27B0', '#673AB7']}
        style={styles.playlistImageContainer}
      >
        <Image
          source={item.coverImage || require('../assets/images/playlist-2.jpg')}
          style={styles.playlistImage}
        />
      </LinearGradient>
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.playlistSongCount}>
          {item.songs?.length || 0} bài hát
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#1E0A3C', '#000000']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu List</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Song Preview */}
      <View style={styles.songPreview}>
        <View style={styles.songInfo}>
          {song?.image ? (
            <Image 
              source={song.image} 
              style={styles.songImage}
            />
          ) : (
            <View style={styles.songImage}>
              <Icon name="musical-notes" size={24} color="#fff" />
            </View>
          )}
          <View style={styles.songDetails}>
            <Text style={styles.songTitle}>{song?.title || 'No song playing'}</Text>
            <Text style={styles.artistName}>{song?.artist || 'Unknown artist'}</Text>
          </View>
        </View>
      </View>

      {/* Menu Options */}
      <ScrollView 
        style={styles.menuContainer}
        showsVerticalScrollIndicator={false}
      >
        {menuOptions.map(renderMenuItem)}
      </ScrollView>

      {/* Playlist Selection Modal */}
      <Modal
        visible={isPlaylistModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPlaylistModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn playlist</Text>
              <TouchableOpacity 
                onPress={() => setIsPlaylistModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={playlists}
              keyExtractor={item => item.id}
              renderItem={renderPlaylistItem}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 24,
  },
  songPreview: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#8B00FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  artistName: {
    fontSize: 14,
    color: '#888',
  },
  duration: {
    color: '#666',
    fontSize: 12,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
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
    height: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  playlistImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 12,
    padding: 3,
  },
  playlistImage: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  playlistSongCount: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  playlistsList: {
    flex: 1,
  },
});

export default MenuListScreen;