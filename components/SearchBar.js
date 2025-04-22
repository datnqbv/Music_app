import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const SearchBar = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.searchContainer}
      onPress={() => navigation.navigate('Search')}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={['#673AB7', '#9C27B0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.searchBarBorder}
      >
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="rgba(255,255,255,0.5)" />
          <View style={styles.searchPlaceholder}>
            <Icon name="search" size={16} color="rgba(255,255,255,0.5)" style={styles.placeholderIcon} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  searchPlaceholder: {
    flex: 1,
    marginLeft: 10,
  },
  placeholderIcon: {
    opacity: 0.5,
  },
});

export default SearchBar; 