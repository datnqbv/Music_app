import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ArtistScreen = ({ route, navigation }) => {
  const { artist } = route.params;

  // Mock data for artist's songs
  const artistSongs = [
    {
      id: '1',
      title: 'Song Title 1',
      duration: '3:45',
      plays: '1.2M',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '2', 
      title: 'Song Title 2',
      duration: '4:20',
      plays: '856K',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '3',
      title: 'Song Title 3', 
      duration: '3:30',
      plays: '2.1M',
      image: require('../assets/song-image.jpg'),
    },
  ];

  // Mock data for popular albums
  const albums = [
    {
      id: '1',
      title: 'Album 1',
      year: '2023',
      image: require('../assets/song-image.jpg'),
    },
    {
      id: '2',
      title: 'Album 2',
      year: '2022',
      image: require('../assets/song-image.jpg'),
    },
  ];

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Artist Info */}
        <View style={styles.artistInfo}>
          <Image source={artist.image} style={styles.artistImage} />
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.artistStats}>{artist.songs}</Text>
          
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.playButton}>
              <Icon name="play" size={24} color="#fff" />
              <Text style={styles.playButtonText}>Play All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Songs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Songs</Text>
          {artistSongs.map((song, index) => (
            <TouchableOpacity
              key={song.id}
              style={styles.songItem}
              onPress={() => navigation.navigate('Listening', { song })}
            >
              <View style={styles.songInfo}>
                <Text style={styles.songNumber}>{index + 1}</Text>
                <Image source={song.image} style={styles.songImage} />
                <View style={styles.songDetails}>
                  <Text style={styles.songTitle}>{song.title}</Text>
                  <Text style={styles.songPlays}>{song.plays} plays</Text>
                </View>
              </View>
              <View style={styles.songActions}>
                <Text style={styles.songDuration}>{song.duration}</Text>
                <TouchableOpacity>
                  <Icon name="ellipsis-vertical" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Albums */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Albums</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.albumsContainer}
          >
            {albums.map((album) => (
              <TouchableOpacity
                key={album.id}
                style={styles.albumItem}
                onPress={() => navigation.navigate('Listening', { song: album })}
              >
                <Image source={album.image} style={styles.albumImage} />
                <Text style={styles.albumTitle}>{album.title}</Text>
                <Text style={styles.albumYear}>{album.year}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  artistInfo: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  artistImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#6A5ACD',
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  artistStats: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 15,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  followButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#6A5ACD',
  },
  followButtonText: {
    color: '#6A5ACD',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  songNumber: {
    color: '#666',
    fontSize: 16,
    width: 30,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  songPlays: {
    color: '#666',
    fontSize: 12,
  },
  songActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songDuration: {
    color: '#666',
    marginRight: 15,
  },
  albumsContainer: {
    marginTop: 10,
  },
  albumItem: {
    marginRight: 15,
    width: 150,
  },
  albumImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  albumTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  albumYear: {
    color: '#666',
    fontSize: 12,
  },
});

export default ArtistScreen; 