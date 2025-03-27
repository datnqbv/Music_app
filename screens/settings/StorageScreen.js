import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const StorageScreen = ({ navigation }) => {
  const [totalStorage] = useState(32); // GB
  const [usedStorage] = useState(12.5); // GB
  const [cacheSize] = useState(2.3); // GB

  const storageCategories = [
    {
      id: 'music',
      title: 'Music',
      size: 8.2,
      icon: 'musical-notes',
    },
    {
      id: 'playlists',
      title: 'Playlists',
      size: 2.8,
      icon: 'list',
    },
    {
      id: 'favorite',
      title: 'Favorite',
      size: 1.8,
      icon: 'heart',
    },
    {
      id: 'podcasts',
      title: 'Podcasts',
      size: 1.5,
      icon: 'mic',
    },
  ];

  const getFreeStorage = () => {
    return totalStorage - usedStorage;
  };

  const getStoragePercentage = () => {
    return (usedStorage / totalStorage) * 100;
  };

  const formatSize = (size) => {
    return size.toFixed(1) + ' GB';
  };

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Storage</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.storageOverview}>
          <View style={styles.storageInfo}>
            <Text style={styles.storageTitle}>Storage Used</Text>
            <Text style={styles.storageValue}>{formatSize(usedStorage)}</Text>
            <Text style={styles.storageFree}>
              {formatSize(getFreeStorage())} free of {formatSize(totalStorage)}
            </Text>
          </View>
          <View style={styles.storageBar}>
            <View 
              style={[
                styles.storageBarFill,
                { width: `${getStoragePercentage()}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage Breakdown</Text>
          {storageCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
            >
              <View style={styles.categoryIcon}>
                <Icon name={category.icon} size={24} color="#6A5ACD" />
              </View>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categorySize}>{formatSize(category.size)}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.cacheSection}>
          <View style={styles.cacheInfo}>
            <Text style={styles.cacheTitle}>Cache</Text>
            <Text style={styles.cacheSize}>{formatSize(cacheSize)}</Text>
          </View>
          <TouchableOpacity style={styles.clearCacheButton}>
            <Text style={styles.clearCacheText}>Clear Cache</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.dangerButton}>
          <Icon name="trash-outline" size={20} color="#ff4444" />
          <Text style={styles.dangerButtonText}>Delete All Downloads</Text>
        </TouchableOpacity>
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
    padding: 16,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  storageOverview: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  storageInfo: {
    marginBottom: 16,
  },
  storageTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  storageValue: {
    color: '#6A5ACD',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  storageFree: {
    color: '#666',
    fontSize: 14,
  },
  storageBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  storageBarFill: {
    height: '100%',
    backgroundColor: '#6A5ACD',
    borderRadius: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#6A5ACD',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(106, 90, 205, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  categorySize: {
    color: '#666',
    fontSize: 14,
  },
  cacheSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  cacheInfo: {
    flex: 1,
  },
  cacheTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  cacheSize: {
    color: '#666',
    fontSize: 14,
  },
  clearCacheButton: {
    backgroundColor: 'rgba(106, 90, 205, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  clearCacheText: {
    color: '#6A5ACD',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  dangerButtonText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default StorageScreen; 