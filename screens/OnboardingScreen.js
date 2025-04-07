import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image, // Thêm import Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/galaxy.png')} // Hình ảnh nền
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.9)']} // Lớp phủ gradient
        style={styles.overlay}
      >
        <View style={styles.content}>
          <View style={styles.spacer} />
          <View style={styles.bottomSection}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Đạt Siêu Cute</Text>
              <Text style={styles.description}>
                Welcome to the Music App
              </Text>
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => navigation.navigate('Login')}
            >
              <View style={styles.buttonCircle}>
                <Icon name="arrow-forward" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          <Image
            source={require('../assets/progress-bar.png')} // Sửa lại thành progress-bar.png
            style={styles.progressBar}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 30,
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  textContainer: {
    flex: 1,
    paddingRight: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 24,
  },
  nextButton: {
    alignSelf: 'flex-end',
  },
  buttonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6C2FD8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    marginBottom: 20,
  },
});

export default OnboardingScreen;