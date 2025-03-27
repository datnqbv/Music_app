import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const AudioQualityScreen = ({ navigation }) => {
  const [selectedQuality, setSelectedQuality] = useState('high');
  const [autoAdjust, setAutoAdjust] = useState(true);

  const qualities = [
    {
      id: 'auto',
      title: 'Auto',
      description: 'Adjusts quality based on your network connection',
      bitrate: 'Variable',
    },
    {
      id: 'low',
      title: 'Low',
      description: 'Uses less data (96 kbps)',
      bitrate: '96 kbps',
    },
    {
      id: 'medium',
      title: 'Normal',
      description: 'Balanced quality (160 kbps)',
      bitrate: '160 kbps',
    },
    {
      id: 'high',
      title: 'High',
      description: 'Best audio quality (320 kbps)',
      bitrate: '320 kbps',
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
        <Text style={styles.headerTitle}>Audio Quality</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Streaming</Text>
          <Text style={styles.sectionDescription}>
            Higher quality audio uses more data
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
          <Text style={styles.sectionTitle}>Equalizer</Text>
          <TouchableOpacity style={styles.equalizerButton}>
            <Text style={styles.equalizerButtonText}>Open System Equalizer</Text>
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
  equalizerButton: {
    backgroundColor: 'rgba(106, 90, 205, 0.1)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  equalizerButtonText: {
    color: '#6A5ACD',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AudioQualityScreen; 