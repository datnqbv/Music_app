import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window'); // Lấy chiều rộng màn hình để responsive

const HomeScreen = () => {
  const navigation = useNavigation();

  // Sections data with image sources
  const newReleases = [
    {
      id: '1',
      title: 'Song Title',
      artist: 'Artist',
      duration: '3:45',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '2',
      title: 'Song Title',
      artist: 'Artist',
      duration: '3:45',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '3',
      title: 'Song Title',
      artist: 'Artist',
      duration: '3:45',
      image: require('../assets/song-image.jpg'),
    },
  ];

  const popularVideos = [
    {
      id: '1',
      title: 'Song Title',
      duration: '3:45',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '2',
      title: 'Song Title',
      duration: '3:45',
      image: require('../assets/song-image.jpg'),
    },

    {
      id: '',
      title: 'Song Title',
      duration: '3:45',
      image: require('../assets/song-image.jpg'),
    },
  ];

  const trendsVideos = [
    {
      id: '1',
      title: 'Song Title',
      duration: '3:45',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '2',
      title: 'Song Title',
      duration: '3:45',
      image: require('../assets/song-image.jpg'),
    },

    {
      id: '3',
      title: 'Song Title',
      duration: '3:45',
      image: require('../assets/song-image.jpg'),
    },
  ];

  const popularArtists = [
    {
      id: '1',
      name: 'Artist',
      songs: 'Number of songs',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '2',
      name: 'Artist',
      songs: 'Number of songs',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '3',
      name: 'Artist',
      songs: 'Number of songs',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '4',
      name: 'Artist',
      songs: 'Number of songs',
      image: require('../assets/song-image.jpg'),
    },
  ];

  const popularAlbums = [
    {
      id: '1',
      title: 'Song Title',
      duration: '3:45',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '2',
      title: 'Song Title',
      duration: '3:45',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '3',
      title: 'Song Title',
      duration: '3:45',
      image: require('../assets/song-image.jpg'),
    },
  ];

  const renderSection = (title, items, renderItem) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
      >
        {items.map(renderItem)}
      </ScrollView>
    </View>
  );

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search-outline" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="What are you looking for?"
              placeholderTextColor="#666"
            />
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* New Releases */}
        {renderSection('New Release', newReleases, (item) => (
          <TouchableOpacity
            style={styles.releaseItem}
            key={item.id}
            onPress={() => navigation.navigate('Listening', { song: item })}
          >
            <Image
              source={item.image}
              style={styles.releaseCover}
              resizeMode="cover"
            />
            <Text style={styles.releaseTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.releaseArtist}>{item.artist}</Text>
            <Text style={styles.releaseDuration}>{item.duration}</Text>
          </TouchableOpacity>
        ))}

        {/* Popular Videos */}
        {renderSection('Popular Videos', popularVideos, (item) => (
          <TouchableOpacity 
            style={styles.videoItem} 
            key={item.id}
            onPress={() => navigation.navigate('Listening', { song: item })}
          >
            <View style={styles.videoContainer}>
              <Image
                source={item.image}
                style={styles.videoImage}
                resizeMode="cover"
              />
              <View style={styles.playIconContainer}>
                <Icon name="play" size={24} color="#fff" />
              </View>
            </View>
            <Text style={styles.videoTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.videoDuration}>{item.duration}</Text>
          </TouchableOpacity>
        ))}

        {/* Trends Videos */}
        {renderSection('Trends Videos 2023', trendsVideos, (item) => (
          <TouchableOpacity 
            style={styles.videoItem} 
            key={item.id}
            onPress={() => navigation.navigate('Listening', { song: item })}
          >
            <View style={styles.videoContainer}>
              <Image
                source={item.image}
                style={styles.videoImage}
                resizeMode="cover"
              />
              <View style={styles.playIconContainer}>
                <Icon name="play" size={24} color="#fff" />
              </View>
            </View>
            <Text style={styles.videoTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.videoDuration}>{item.duration}</Text>
          </TouchableOpacity>
        ))}

        {/* Popular Artists */}
        {renderSection('Popular Artists 2023', popularArtists, (item) => (
          <TouchableOpacity 
            style={styles.artistItem} 
            key={item.id}
            onPress={() => navigation.navigate('Artist', { artist: item })}
          >
            <Image
              source={item.image}
              style={styles.artistAvatar}
              resizeMode="cover"
            />
            <Text style={styles.artistName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.songCount} numberOfLines={1}>
              {item.songs}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Popular Albums */}
        {renderSection('Popular Album 2023', popularAlbums, (item) => (
          <TouchableOpacity 
            style={styles.albumItem} 
            key={item.id}
            onPress={() => navigation.navigate('Listening', { song: item })}
          >
            <Image
              source={item.image}
              style={styles.albumCover}
              resizeMode="cover"
            />
            <Text style={styles.albumTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.albumDuration}>{item.duration}</Text>
          </TouchableOpacity>
        ))}
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
    paddingBottom: 80, // Để tránh bị che bởi Bottom Tabs
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 40, // Khoảng cách từ đỉnh màn hình
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF4D4D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: 14,
    color: '#A78BFA',
    fontWeight: '600',
  },
  horizontalScrollContent: {
    paddingRight: 20,
  },
  releaseItem: {
    width: 140,
    marginRight: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  releaseCover: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  releaseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  releaseArtist: {
    fontSize: 12,
    color: '#B0B0B0',
    marginBottom: 5,
  },
  releaseDuration: {
    fontSize: 12,
    color: '#A78BFA',
  },
  videoItem: {
    width: 200,
    marginRight: 15,
  },
  videoContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  videoImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  playIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  videoDuration: {
    fontSize: 12,
    color: '#A78BFA',
  },
  artistItem: {
    width: (width - 60) / 2, // Chia đôi chiều rộng màn hình, trừ padding
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  artistAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#A78BFA',
  },
  artistName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  songCount: {
    fontSize: 12,
    color: '#B0B0B0',
  },
  albumItem: {
    width: 140,
    marginRight: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  albumCover: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  albumDuration: {
    fontSize: 12,
    color: '#A78BFA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 50, // Thêm margin-top để đẩy thanh tìm kiếm xuống
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)', // Làm trong suốt hơn một chút
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;