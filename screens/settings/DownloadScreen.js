import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const DownloadScreen = ({ navigation }) => {
  const [wifiOnly, setWifiOnly] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('high');

  const downloadQualities = [
    {
      id: 'low',
      title: 'Low',
      description: 'Faster downloads, uses less storage',
      size: '~30MB/hour',
    },
    {
      id: 'medium',
      title: 'Medium',
      description: 'Balance of quality and storage',
      size: '~60MB/hour',
    },
    {
      id: 'high',
      title: 'High',
      description: 'Best quality, uses more storage',
      size: '~120MB/hour',
    },
  ];

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Download Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Network</Text>
          <TouchableOpacity 
            style={styles.switchOption}
            onPress={() => setWifiOnly(!wifiOnly)}
          >
            <View style={styles.switchInfo}>
              <Text style={styles.switchTitle}>Download on Wi-Fi Only</Text>
              <Text style={styles.switchDescription}>
                Save mobile data by downloading only when connected to Wi-Fi
              </Text>
            </View>
            <View style={[
              styles.switch,
              { backgroundColor: wifiOnly ? '#6A5ACD' : '#666' }
            ]}>
              <View style={[
                styles.switchKnob,
                { transform: [{ translateX: wifiOnly ? 20 : 0 }] }
              ]} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.switchOption}
            onPress={() => setAutoDownload(!autoDownload)}
          >
            <View style={styles.switchInfo}>
              <Text style={styles.switchTitle}>Auto Download</Text>
              <Text style={styles.switchDescription}>
                Automatically download new episodes from your subscriptions
              </Text>
            </View>
            <View style={[
              styles.switch,
              { backgroundColor: autoDownload ? '#6A5ACD' : '#666' }
            ]}>
              <View style={[
                styles.switchKnob,
                { transform: [{ translateX: autoDownload ? 20 : 0 }] }
              ]} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Download Quality</Text>
          {downloadQualities.map((quality) => (
            <TouchableOpacity
              key={quality.id}
              style={styles.qualityOption}
              onPress={() => setSelectedQuality(quality.id)}
            >
              <View style={styles.qualityInfo}>
                <Text style={styles.qualityTitle}>{quality.title}</Text>
                <Text style={styles.qualityDescription}>
                  {quality.description}
                </Text>
                <Text style={styles.qualitySize}>{quality.size}</Text>
              </View>
              {selectedQuality === quality.id && (
                <Icon name="checkmark-circle" size={24} color="#6A5ACD" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage</Text>
          <View style={styles.storageInfo}>
            <Text style={styles.storageTitle}>Downloads</Text>
            <Text style={styles.storageValue}>1.2 GB used</Text>
            <View style={styles.storageBar}>
              <View style={[styles.storageBarFill, { width: '40%' }]} />
            </View>
            <Text style={styles.storageFree}>1.8 GB free</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.clearButton}>
          <Icon name="trash-outline" size={20} color="#ff4444" />
          <Text style={styles.clearButtonText}>Clear All Downloads</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#6A5ACD',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  switchOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  switchInfo: {
    flex: 1,
    marginRight: 16,
  },
  switchTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  switchDescription: {
    color: '#666',
    fontSize: 14,
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 5,
  },
  switchKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  qualityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  qualityInfo: {
    flex: 1,
    marginRight: 16,
  },
  qualityTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  qualityDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 2,
  },
  qualitySize: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  storageInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  storageTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  storageValue: {
    color: '#6A5ACD',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  storageBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 8,
  },
  storageBarFill: {
    height: '100%',
    backgroundColor: '#6A5ACD',
    borderRadius: 2,
  },
  storageFree: {
    color: '#666',
    fontSize: 14,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  clearButtonText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default DownloadScreen; 