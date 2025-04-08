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

const ShareScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { song } = route.params || {};

  const shareOptions = [
    {
      id: '1',
      name: 'Instagram Story',
      icon: 'logo-instagram',
      color: '#E4405F',
    },
    {
      id: '2',
      name: 'Instagram Post',
      icon: 'logo-instagram',
      color: '#E4405F',
    },
    {
      id: '3',
      name: 'Facebook',
      icon: 'logo-facebook',
      color: '#1877F2',
    },
    {
      id: '4',
      name: 'TikTok',
      icon: 'musical-notes',
      color: '#000000',
    },
    {
      id: '5',
      name: 'Pinterest',
      icon: 'logo-pinterest',
      color: '#E60023',
    },
    {
      id: '6',
      name: 'WhatsApp Status',
      icon: 'logo-whatsapp',
      color: '#25D366',
    },
    {
      id: '7',
      name: 'Telegram',
      icon: 'paper-plane',
      color: '#0088CC',
    },
    {
      id: '8',
      name: 'Others',
      icon: 'ellipsis-horizontal',
      color: '#757575',
    },
  ];

  const renderShareOption = (option) => (
    <TouchableOpacity key={option.id} style={styles.shareOption}>
      <View style={[styles.iconContainer, { backgroundColor: option.color }]}>
        <Icon name={option.icon} size={24} color="#fff" />
      </View>
      <Text style={styles.optionText}>{option.name}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#1E0A3C', '#000000']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Share</Text>
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

      {/* Share Options */}
      <Text style={styles.sectionTitle}>Share To:</Text>
      <ScrollView 
        style={styles.shareOptionsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.shareOptionsGrid}>
          {shareOptions.map(renderShareOption)}
        </View>
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
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
    marginBottom: 20,
  },
  shareOptionsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  shareOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  shareOption: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ShareScreen;