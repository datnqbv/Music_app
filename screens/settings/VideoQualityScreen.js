import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const VideoQualityScreen = ({ navigation }) => {
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [autoAdjust, setAutoAdjust] = useState(true);

  const qualities = [
    {
      id: 'auto',
      title: 'Auto',
      description: 'Adjusts quality based on your network connection',
      resolution: 'Variable',
    },
    {
      id: '480p',
      title: '480p',
      description: 'Uses less data (SD)',
      resolution: '854 x 480',
    },
    {
      id: '720p',
      title: '720p',
      description: 'Recommended (HD)',
      resolution: '1280 x 720',
    },
    {
      id: '1080p',
      title: '1080p',
      description: 'Best video quality (Full HD)',
      resolution: '1920 x 1080',
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
        <Text style={styles.headerTitle}>Video Quality</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Streaming</Text>
          <Text style={styles.sectionDescription}>
            Higher quality video uses more data
          </Text>

          {qualities.map((quality) => (
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
                <Text style={styles.qualityResolution}>
                  {quality.resolution}
                </Text>
              </View>
              {selectedQuality === quality.id && (
                <Icon name="checkmark-circle" size={24} color="#6A5ACD" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Auto Adjust Quality</Text>
          <TouchableOpacity 
            style={styles.switchOption}
            onPress={() => setAutoAdjust(!autoAdjust)}
          >
            <View style={styles.switchInfo}>
              <Text style={styles.switchTitle}>
                Adjust quality automatically
              </Text>
              <Text style={styles.switchDescription}>
                Changes quality to match your network speed
              </Text>
            </View>
            <View style={[
              styles.switch,
              { backgroundColor: autoAdjust ? '#6A5ACD' : '#666' }
            ]}>
              <View style={[
                styles.switchKnob,
                { transform: [{ translateX: autoAdjust ? 20 : 0 }] }
              ]} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HDR</Text>
          <TouchableOpacity style={styles.hdrOption}>
            <View style={styles.hdrInfo}>
              <Text style={styles.hdrTitle}>Enable HDR</Text>
              <Text style={styles.hdrDescription}>
                Enhance video quality on supported devices
              </Text>
            </View>
            <Icon name="toggle" size={40} color="#666" />
          </TouchableOpacity>
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
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 16,
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
  qualityResolution: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'monospace',
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
  hdrOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  hdrInfo: {
    flex: 1,
    marginRight: 16,
  },
  hdrTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  hdrDescription: {
    color: '#666',
    fontSize: 14,
  },
});

export default VideoQualityScreen; 