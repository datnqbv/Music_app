import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({
    name: 'User Name',
    email: 'user@example.com',
    phone: '+84 123 456 789',
    password: '••••••••',
  });

  const PROFILE_NAME_KEY = 'PROFILE_NAME';
  const PROFILE_EMAIL_KEY = 'PROFILE_EMAIL';
  const PROFILE_PHONE_KEY = 'PROFILE_PHONE';
  const PROFILE_AVATAR_KEY = 'PROFILE_AVATAR';

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    (async () => {
      const savedName = await AsyncStorage.getItem(PROFILE_NAME_KEY);
      const savedEmail = await AsyncStorage.getItem(PROFILE_EMAIL_KEY);
      const savedPhone = await AsyncStorage.getItem(PROFILE_PHONE_KEY);
      const savedAvatar = await AsyncStorage.getItem(PROFILE_AVATAR_KEY);
      setProfileData(data => ({
        ...data,
        name: savedName || data.name,
        email: savedEmail || data.email,
        phone: savedPhone || data.phone,
      }));
      if (savedAvatar) setAvatar(savedAvatar);
    })();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    await AsyncStorage.setItem(PROFILE_NAME_KEY, profileData.name);
    await AsyncStorage.setItem(PROFILE_EMAIL_KEY, profileData.email);
    await AsyncStorage.setItem(PROFILE_PHONE_KEY, profileData.phone);
    if (avatar) await AsyncStorage.setItem(PROFILE_AVATAR_KEY, avatar);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Picture */}
        <View style={styles.profilePictureSection}>
          <Image
            source={avatar ? { uri: avatar } : require('../assets/mona.png')}
            style={styles.profilePicture}
          />
          <TouchableOpacity style={styles.changePictureButton} onPress={pickImage}>
            <Text style={styles.changePictureText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={profileData.name}
                onChangeText={(text) => setProfileData({ ...profileData, name: text })}
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={profileData.email}
                onChangeText={(text) => setProfileData({ ...profileData, email: text })}
                keyboardType="email-address"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={profileData.phone}
                onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
                keyboardType="phone-pad"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={profileData.password}
                onChangeText={(text) => setProfileData({ ...profileData, password: text })}
                secureTextEntry
                placeholderTextColor="#666"
              />
              <TouchableOpacity style={styles.changePasswordButton}>
                <Text style={styles.changePasswordText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    color: '#8B00FF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profilePictureSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePictureButton: {
    marginTop: 10,
  },
  changePictureText: {
    color: '#8B00FF',
    fontSize: 16,
  },
  formSection: {
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#999',
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  changePasswordButton: {
    paddingHorizontal: 15,
  },
  changePasswordText: {
    color: '#8B00FF',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 15,
    marginTop: 30,
    marginBottom: 50,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default EditProfileScreen; 