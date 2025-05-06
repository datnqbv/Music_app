import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = () => {
  // Hook dùng để điều hướng giữa các màn hình
  const navigation = useNavigation();
   // Khởi tạo state chứa thông tin hồ sơ người dùng mặc định
  const [profileData, setProfileData] = useState({
    name: 'User Name',
    email: 'user@example.com',
    phone: '+84 123 456 789',
    password: '••••••••',
  });
// Các key dùng để lưu thông tin người dùng vào AsyncStorage
  const PROFILE_NAME_KEY = 'PROFILE_NAME';
  const PROFILE_EMAIL_KEY = 'PROFILE_EMAIL';
  const PROFILE_PHONE_KEY = 'PROFILE_PHONE';
  const PROFILE_AVATAR_KEY = 'PROFILE_AVATAR';
// State lưu avatar người dùng (URI của hình ảnh)
  const [avatar, setAvatar] = useState(null);
  // State lưu tên người dùng hiện tại đang đăng nhập
  const [currentUser, setCurrentUser] = useState('');
   // useEffect được gọi khi component vừa được render lần đầu
  useEffect(() => {
    (async () => {
      // Lấy thông tin tên người dùng hiện tại từ AsyncStorage
      const username = await AsyncStorage.getItem('CURRENT_USER');
      setCurrentUser(username);
       // Nếu có tên người dùng, lấy các thông tin hồ sơ tương ứng từ AsyncStorage
      if (username) {
        const savedName = await AsyncStorage.getItem(`PROFILE_NAME_${username}`);
        const savedEmail = await AsyncStorage.getItem(`PROFILE_EMAIL_${username}`);
        const savedPhone = await AsyncStorage.getItem(`PROFILE_PHONE_${username}`);
        const savedAvatar = await AsyncStorage.getItem(`PROFILE_AVATAR_${username}`);
        // Cập nhật lại state profileData nếu có dữ liệu lưu trữ
        setProfileData(data => ({
          ...data,
          name: savedName !== null ? savedName : data.name,
          email: savedEmail !== null ? savedEmail : data.email,
          phone: savedPhone !== null ? savedPhone : data.phone,
        }));
        // Nếu có avatar đã lưu, cập nhật state avatar
        if (savedAvatar) setAvatar(savedAvatar);
      }
    })();
  }, []); // [] nghĩa là chỉ chạy 1 lần khi component được load

  // Hàm xử lý khi người dùng nhấn nút "Đăng xuất"
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            // Reset navigation stack và điều hướng về màn hình Login
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
          style: 'destructive',
        },
      ],
      { cancelable: true } // Cho phép hủy bằng cách bấm ngoài hộp thoại
    );
  };
  
   // Hàm xử lý khi người dùng chọn ảnh đại diện mới
  const pickImage = async () => {
    // Yêu cầu quyền truy cập thư viện ảnh
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }
    // Mở thư viện ảnh để chọn hình ảnh
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Cho phép cắt ảnh
      aspect: [1, 1], // Tỉ lệ khung hình 1:1
      quality: 1, // Chất lượng ảnh cao nhất
    });
     // Nếu người dùng không hủy thì lưu URI của ảnh đã chọn
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

// Hàm xử lý khi người dùng nhấn nút "Lưu"
  const handleSave = async () => {
    console.log('currentUser:', currentUser);
    console.log('profileData:', profileData);
    try {
      if (!currentUser) {
        Alert.alert('Lỗi', 'Không xác định được tài khoản hiện tại!');
        return;
      }
      // Lưu thông tin hồ sơ người dùng vào AsyncStorage
      await AsyncStorage.setItem(`PROFILE_NAME_${currentUser}`, profileData.name);
      await AsyncStorage.setItem(`PROFILE_EMAIL_${currentUser}`, profileData.email);
      await AsyncStorage.setItem(`PROFILE_PHONE_${currentUser}`, profileData.phone);
      if (avatar) await AsyncStorage.setItem(`PROFILE_AVATAR_${currentUser}`, avatar);
      Alert.alert('Thành công', 'Đã lưu thông tin cá nhân!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể lưu thông tin cá nhân!');
      console.log('Save profile error:', e);
    }
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
            source={avatar ? { uri: avatar } : require('../assets/mona.webp')}
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