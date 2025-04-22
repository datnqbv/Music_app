import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const RECENT_SEARCHES_KEY = '@recent_searches';
const MAX_RECENT_SEARCHES = 5;

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const trendingSearches = [
    'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem'
  ];

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const savedSearches = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  const saveRecentSearch = async (search) => {
    try {
      let searches = [...recentSearches];
      // Remove if already exists
      searches = searches.filter(item => item !== search);
      // Add to beginning
      searches.unshift(search);
      // Keep only MAX_RECENT_SEARCHES items
      searches = searches.slice(0, MAX_RECENT_SEARCHES);
      
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
      setRecentSearches(searches);
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      saveRecentSearch(query);
      // TODO: Implement actual search functionality
      console.log('Searching for:', query);
    }
  };

  const removeRecentSearch = async (searchToRemove) => {
    try {
      const newSearches = recentSearches.filter(item => item !== searchToRemove);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
      setRecentSearches(newSearches);
    } catch (error) {
      console.error('Error removing recent search:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <LinearGradient
          colors={['#673AB7', '#9C27B0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.searchBarBorder}
        >
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="rgba(255,255,255,0.5)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => handleSearch(searchQuery)}
              returnKeyType="search"
              autoFocus={true}
            />
          </View>
        </LinearGradient>
      </View>

      <ScrollView style={styles.content}>
        {/* Trending Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Search</Text>
          <View style={styles.trendingContainer}>
            {trendingSearches.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.trendingItem}
                onPress={() => handleSearch(item)}
              >
                <Text style={styles.trendingText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recently Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Search</Text>
          {recentSearches.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.recentItem}
              onPress={() => handleSearch(item)}
            >
              <Icon name="time-outline" size={20} color="rgba(255,255,255,0.5)" />
              <Text style={styles.recentText}>{item}</Text>
              <TouchableOpacity 
                onPress={() => removeRecentSearch(item)}
                style={styles.removeButton}
              >
                <View style={styles.removeLine} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBarBorder: {
    borderRadius: 25,
    padding: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  trendingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  trendingItem: {
    borderWidth: 1,
    borderColor: '#673AB7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  trendingText: {
    color: '#fff',
    fontSize: 14,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  recentText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    marginLeft: 15,
  },
  removeButton: {
    padding: 8,
  },
  removeLine: {
    width: 20,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default SearchScreen;