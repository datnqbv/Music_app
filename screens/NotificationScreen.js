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
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();

  const notifications = [
    {
      id: '1',
      title: 'New Release',
      message: 'Check out the new song from your favorite artist',
      time: '2h ago',
      type: 'music',
    },
    {
      id: '2',
      title: 'Playlist Update',
      message: 'Your weekly playlist has been updated',
      time: '5h ago',
      type: 'playlist',
    },
    {
      id: '3',
      title: 'New Follower',
      message: 'Someone started following your playlist',
      time: '1d ago',
      type: 'social',
    },
  ];

  const renderIcon = (type) => {
    switch (type) {
      case 'music':
        return <Icon name="musical-notes" size={24} color="#9C27B0" />;
      case 'playlist':
        return <Icon name="list" size={24} color="#9C27B0" />;
      case 'social':
        return <Icon name="people" size={24} color="#9C27B0" />;
      default:
        return <Icon name="notifications" size={24} color="#9C27B0" />;
    }
  };

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton}>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationList}>
        {notifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={styles.notificationItem}>
            <View style={styles.iconContainer}>
              {renderIcon(notification.type)}
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  markAllButton: {
    padding: 8,
  },
  markAllText: {
    color: '#9C27B0',
    fontSize: 14,
  },
  notificationList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(156,39,176,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
  },
});

export default NotificationScreen;