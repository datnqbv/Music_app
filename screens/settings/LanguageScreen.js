import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const LanguageScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'de', name: 'German', native: 'Deutsch' },
    { code: 'it', name: 'Italian', native: 'Italiano' },
    { code: 'pt', name: 'Portuguese', native: 'Português' },
    { code: 'ru', name: 'Russian', native: 'Русский' },
    { code: 'ja', name: 'Japanese', native: '日本語' },
    { code: 'ko', name: 'Korean', native: '한국어' },
    { code: 'zh', name: 'Chinese', native: '中文' },
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
        <Text style={styles.headerTitle}>Language</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.description}>
          Choose your preferred language for the app interface
        </Text>

        <View style={styles.languageList}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={styles.languageOption}
              onPress={() => setSelectedLanguage(language.code)}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>{language.name}</Text>
                <Text style={styles.languageNative}>{language.native}</Text>
              </View>
              {selectedLanguage === language.code && (
                <Icon name="checkmark-circle" size={24} color="#6A5ACD" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.note}>
          Note: Changing the language will restart the app
        </Text>

        <TouchableOpacity 
          style={[
            styles.applyButton,
            { opacity: selectedLanguage ? 1 : 0.5 }
          ]}
          disabled={!selectedLanguage}
        >
          <Text style={styles.applyButtonText}>Apply Changes</Text>
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
  description: {
    color: '#666',
    fontSize: 14,
    marginBottom: 24,
  },
  languageList: {
    marginBottom: 24,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  languageNative: {
    color: '#666',
    fontSize: 14,
  },
  note: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },
  applyButton: {
    backgroundColor: '#6A5ACD',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LanguageScreen; 