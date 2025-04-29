import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_NAME_KEY = 'PROFILE_NAME';
const PROFILE_AVATAR_KEY = 'PROFILE_AVATAR';

const ProfileScreen = ({ navigation }) => {
  const [profileName, setProfileName] = React.useState('Đạt Sieucute');
  const [avatar, setAvatar] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState('');
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const username = await AsyncStorage.getItem('CURRENT_USER');
        setCurrentUser(username);
        const savedName = await AsyncStorage.getItem(`PROFILE_NAME_${username}`);
        if (savedName) setProfileName(savedName);
        const savedAvatar = await AsyncStorage.getItem(`PROFILE_AVATAR_${username}`);
        if (savedAvatar) setAvatar(savedAvatar);
      })();
    }, [])
  );

  const menuItems = [
    {
      id: 'edit',
      title: 'Edit Profile',
      icon: 'create-outline',
      screen: 'EditProfile'
    },
    {
      id: 'audio',
      title: 'Audio Quality',
      icon: 'musical-notes-outline',
      screen: 'AudioQuality'
    },
    {
      id: 'video',
      title: 'Video Quality',
      icon: 'videocam-outline',
      screen: 'VideoQuality'
    },
    {
      id: 'download',
      title: 'Download',
      icon: 'cloud-download-outline',
      screen: 'Download'
    },
    {
      id: 'language',
      title: 'Language',
      icon: 'language-outline',
      screen: 'Language'
    },
    {
      id: 'storage',
      title: 'Storage',
      icon: 'phone-portrait-outline',
      screen: 'Storage'
    }
  ];

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
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => navigation.navigate('Notification')}
            >
              <Icon name="notifications-outline" size={24} color="#fff" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('Search')}
            >
              <Icon name="search-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Image
            source={avatar ? { uri: avatar } : require('../assets/mona.png')}
            style={styles.profilePicture}
          />
          <Text style={styles.profileName}>{profileName}</Text>
          <Text style={styles.profileUsername}>@Datsieucute</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                const parentNavigation = navigation.getParent();
                if (parentNavigation) {
                  parentNavigation.navigate(item.screen);
                }
              }}
            >
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon} size={24} color="#fff" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Icon name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          ))}
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
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconButton: {
    marginLeft: 20,
    position: 'relative',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileUsername: {
    color: '#ccc',
    fontSize: 16,
  },
  menuContainer: {
    backgroundColor: '#3A1078',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
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
});

export default ProfileScreen;