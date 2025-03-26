import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuListScreen = () => {
  const navigation = useNavigation();

  const menuOptions = [
    {
      id: '1',
      name: 'Shuffle',
      icon: 'shuffle',
    },
    {
      id: '2',
      name: 'Repeat',
      icon: 'repeat',
    },
    {
      id: '3',
      name: 'Repeat One',
      icon: 'help-circle-outline',
    },
    {
      id: '4',
      name: 'Favorite',
      icon: 'heart-outline',
    },
    {
      id: '5',
      name: 'Add Your Playlist',
      icon: 'add',
    },
    {
      id: '6',
      name: 'Add Your Album',
      icon: 'albums-outline',
    },
    {
      id: '7',
      name: 'Download',
      icon: 'download-outline',
    },
    {
      id: '8',
      name: 'Share',
      icon: 'share-social-outline',
    },
  ];

  const renderMenuItem = (item) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.menuItem}
      onPress={() => {
        if (item.name === 'Share') {
          navigation.navigate('Share');
        }
      }}
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
        <View style={styles.songImage}>
          <Icon name="musical-notes" size={24} color="#fff" />
        </View>
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>Song Title</Text>
          <Text style={styles.artistName}>Artist</Text>
          <Text style={styles.duration}>5:10</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  songImage: {
    width: 50,
    height: 50,
    backgroundColor: '#8B00FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artistName: {
    color: '#999',
    fontSize: 14,
    marginBottom: 4,
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