import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const LibraryScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Playlist');
  const [isGridLayout, setIsGridLayout] = useState(false);

  const playlists = [
    { id: '1', title: 'Your Playlist 1', songs: '10 songs', image: require('../assets/song-image.jpg') },
    { id: '2', title: 'Your Playlist 2', songs: '8 songs', image: require('../assets/song-image.jpg') },
    { id: '3', title: 'Your Playlist 3', songs: '12 songs', image: require('../assets/song-image.jpg') },
  ];

  const recentItems = [
    {
      id: '1',
      title: 'Song Title',
      artist: 'Artist',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '2',
      title: 'Song Title',
      artist: 'Artist',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '3',
      title: 'Song Title',
      artist: 'Artist',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '4',
      title: 'Song Title',
      artist: 'Artist',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '5',
      title: 'Song Title',
      artist: 'Artist',
      image: require('../assets/song-image.jpg'),
    },
  ];

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity style={styles.playlistCircle}>
      <View style={styles.playlistImageContainer}>
        <Image source={item.image} style={styles.playlistImage} />
      </View>
      <Text style={styles.playlistTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.playlistSongs} numberOfLines={1}>
        {item.songs}
      </Text>
    </TouchableOpacity>
  );

  const renderRecentItemList = ({ item }) => (
    <TouchableOpacity
      style={styles.recentItemList}
      onPress={() => navigation.navigate('Listening', { song: item })}
    >
      <Image source={item.image} style={styles.recentImageList} />
      <View style={styles.recentTextContainer}>
        <Text style={styles.recentTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.recentArtist} numberOfLines={1}>
          {item.artist}
        </Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Icon name="ellipsis-vertical" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderRecentItemGrid = ({ item }) => (
    <TouchableOpacity
      style={styles.recentItemGrid}
      onPress={() => navigation.navigate('Listening', { song: item })}
    >
      <Image source={item.image} style={styles.recentImageGrid} />
      <View style={styles.recentGridInfo}>
        <Text style={styles.recentTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.recentArtist} numberOfLines={1}>
          {item.artist}
        </Text>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="ellipsis-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Library</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('Search')}
            >
              <Icon name="search-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('LibraryLayout')}
            >
              <Icon name="grid-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Playlist' && styles.activeTabButton]}
              onPress={() => setActiveTab('Playlist')}
            >
              <Icon name="list" size={24} color="#fff" />
              <Text style={styles.tabText}>Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Album' && styles.activeTabButton]}
              onPress={() => setActiveTab('Album')}
            >
              <Icon name="albums" size={24} color="#fff" />
              <Text style={styles.tabText}>Album</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Artist' && styles.activeTabButton]}
              onPress={() => setActiveTab('Artist')}
            >
              <Icon name="person" size={24} color="#fff" />
              <Text style={styles.tabText}>Artist</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Playlists */}
        <View style={styles.playlistsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {playlists.map((item) => (
              <View key={item.id} style={styles.playlistCircle}>
                <View style={styles.playlistImageContainer}>
                  <Image source={item.image} style={styles.playlistImage} />
                </View>
                <Text style={styles.playlistTitle} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            ))}
            <TouchableOpacity style={styles.createPlaylistButton}>
              <Icon name="add" size={40} color="#fff" />
              <Text style={styles.createPlaylistText}>Create{'\n'}Playlist</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Recent Section */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>Recent</Text>
            <TouchableOpacity onPress={() => setIsGridLayout(!isGridLayout)}>
              <Icon 
                name={isGridLayout ? "list" : "grid"} 
                size={24} 
                color="#fff" 
              />
            </TouchableOpacity>
          </View>
          <FlatList
            key={isGridLayout ? 'grid' : 'list'}
            data={recentItems}
            keyExtractor={(item) => item.id}
            renderItem={isGridLayout ? renderRecentItemGrid : renderRecentItemList}
            numColumns={isGridLayout ? 2 : 1}
            scrollEnabled={false}
          />
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
  scrollViewContent: {
    paddingBottom: 80,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTabButton: {
    backgroundColor: '#8B00FF',
  },
  tabText: {
    color: '#fff',
    marginLeft: 5,
  },
  playlistsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  playlistCircle: {
    alignItems: 'center',
    marginRight: 20,
    width: 100,
  },
  playlistImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8B00FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  playlistImage: {
    width: '100%',
    height: '100%',
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  playlistSongs: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
  },
  createPlaylistButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPlaylistText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  recentSection: {
    paddingHorizontal: 20,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  recentItemList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 10,
    borderRadius: 10,
  },
  recentImageList: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  recentTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  recentTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  recentArtist: {
    color: '#999',
    fontSize: 14,
    marginTop: 2,
  },
  moreButton: {
    padding: 5,
  },
  recentItemGrid: {
    width: (width - 60) / 2,
    marginBottom: 20,
    marginRight: 20,
  },
  recentImageGrid: {
    width: '100%',
    height: (width - 60) / 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  recentGridInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default LibraryScreen;