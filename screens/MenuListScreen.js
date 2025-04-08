import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { song } = route.params || {};

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
      screen: 'Library',
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
    if (item.screen) {
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
});

export default MenuListScreen;