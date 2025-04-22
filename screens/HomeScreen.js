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
import { songs } from '../data/songs';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  // Sections data with real songs
  const newReleases = songs.slice(0, 3);
  const popularVideos = songs.slice(1, 4);
  const trendsVideos = songs.slice(2, 5);
  const popularArtists = songs.map(song => ({
    id: song.id,
    name: song.artist,
    songs: '10 songs',
    image: song.image,
  }));
  const popularAlbums = songs.slice(0, 3);

  const renderSection = (title, items, renderItem, type) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('ViewAll', { 
            title, 
            data: items,
            type 
          })}
        >
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
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.searchContainer}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.7}
        >
          <Icon name="search" size={20} color="#B0B0B0" />
          <Text style={styles.searchPlaceholder}>Track, artist, track or album</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notification')}
        >
          <Icon name="notifications-outline" size={24} color="#fff" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity 
            style={styles.profileLeft}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.profileAvatar}>
              <Image 
                source={require('../assets/mona.png')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Đạt<Text style={styles.profileNameBold}> Sieucute</Text></Text>
              <Text style={styles.profileDescription}>Khai phá âm lượng</Text>
            </View>
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
        ), 'releases')}

        {/* Popular Videos */}
        {renderSection('Popular Videos', popularVideos, (item) => (
          <TouchableOpacity 
            style={styles.videoItem} 
            key={item.id}
            onPress={() => navigation.navigate('Listening', { song: item })}
          >
            <View style={styles.videoCard}>
              <Image
                source={item.image}
                style={styles.videoBackground}
                resizeMode="cover"
              />
              <View style={styles.videoOverlay}>
                <View style={styles.playButton}>
                  <Icon name="play" size={30} color="#fff" />
                </View>
              </View>
            </View>
            <Text style={styles.videoTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.videoArtist}>{item.artist}</Text>
          </TouchableOpacity>
        ), 'videos')}

        {/* Trends Videos */}
        {renderSection('Trends Videos 2023', trendsVideos, (item) => (
          <TouchableOpacity
            style={styles.videoItem} 
            key={item.id}
            onPress={() => navigation.navigate('Listening', { song: item })}
          >
            <View style={styles.videoCard}>
              <Image
                source={item.image}
                style={styles.videoBackground}
                resizeMode="cover"
              />
              <View style={styles.videoOverlay}>
                <View style={styles.playButton}>
                  <Icon name="play" size={30} color="#fff" />
                </View>
              </View>
            </View>
            <Text style={styles.videoTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.videoArtist}>{item.artist}</Text>
          </TouchableOpacity>
        ), 'videos')}

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
        ), 'artists')}

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
        ), 'albums')}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#4A148C',
    zIndex: 1000,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    height: 40,
  },
  searchPlaceholder: {
    flex: 1,
    color: '#B0B0B0',
    marginLeft: 8,
    fontSize: 16,
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    marginTop: 90, // Add margin to prevent content from being hidden under header
  },
  scrollContent: {
    paddingTop: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 15,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileNameBold: {
    fontWeight: 'bold',
  },
  profileDescription: {
    fontSize: 14,
    color: '#B0B0B0',
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
  artistItem: {
    width: (width - 60) / 2,
    marginRight: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  artistAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#A78BFA',
  },
  artistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  songCount: {
    fontSize: 13,
    color: '#B0B0B0',
    textAlign: 'center',
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
  videoItem: {
    width: 280,
    marginRight: 15,
  },
  videoCard: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
  },
  videoBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  videoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  videoArtist: {
    fontSize: 14,
    color: '#B0B0B0',
  },
});

export default HomeScreen;