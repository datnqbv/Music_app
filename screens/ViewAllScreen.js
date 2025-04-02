import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ViewAllScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, data, type } = route.params;

  const renderItem = ({ item }) => {
    switch (type) {
      case 'releases':
      case 'videos':
        return (
          <TouchableOpacity
            style={styles.releaseItem}
            onPress={() => navigation.navigate('Listening', { song: item })}
          >
            <Image source={item.image} style={styles.releaseImage} />
            <View style={styles.releaseInfo}>
              <Text style={styles.releaseTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.releaseArtist}>{item.artist}</Text>
              <Text style={styles.releaseDuration}>{item.duration}</Text>
            </View>
          </TouchableOpacity>
        );

      case 'artists':
        return (
          <TouchableOpacity
            style={styles.artistItem}
            onPress={() => navigation.navigate('Artist', { artist: item })}
          >
            <Image source={item.image} style={styles.artistImage} />
            <Text style={styles.artistName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.songCount}>{item.songs}</Text>
          </TouchableOpacity>
        );

      case 'albums':
        return renderAlbumItem({ item });

      default:
        return null;
    }
  };

  const renderAlbumItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.releaseItem}
      onPress={() => navigation.navigate('Listening', { song: item })}
    >
      <Image source={item.image} style={styles.releaseImage} />
      <View style={styles.releaseInfo}>
        <Text style={styles.releaseTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.releaseArtist}>{item.artist}</Text>
        <Text style={styles.releaseDuration}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  const getNumColumns = () => {
    switch (type) {
      case 'releases':
      case 'videos':
      case 'albums':
        return 1;
      case 'artists':
        return 3;
      default:
        return 2;
    }
  };

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={getNumColumns()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
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
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 24,
  },
  listContent: {
    padding: 16,
  },
  // Release Item Styles
  releaseItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  releaseImage: {
    width: 80,
    height: 80,
  },
  releaseInfo: {
    flex: 1,
    padding: 12,
  },
  releaseTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  releaseArtist: {
    color: '#B0B0B0',
    fontSize: 14,
    marginBottom: 4,
  },
  releaseDuration: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  // Video Item Styles
  videoItem: {
    width: (width - 48) / 2,
    marginHorizontal: 8,
    marginBottom: 24,
  },
  videoImageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  playIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  videoDuration: {
    color: '#B0B0B0',
    fontSize: 12,
    marginTop: 4,
  },
  // Artist Item Styles
  artistItem: {
    width: (width - 64) / 3,
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 24,
  },
  artistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  artistName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  songCount: {
    color: '#B0B0B0',
    fontSize: 12,
    marginTop: 4,
  },
});

export default ViewAllScreen; 