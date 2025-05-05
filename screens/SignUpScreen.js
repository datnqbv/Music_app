import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { saveUserData } from '../data/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * SignUpScreen component - Màn hình đăng ký
 * Xử lý việc đăng ký và lưu trữ thông tin người dùng
 */
const SignUpScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!fullName || !username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // Lưu trữ thông tin đăng ký
    try {
      const newUser = {
        fullName,
        username,
        email,
        password,
        createdAt: new Date().toISOString(), // Thời gian tài khoản được tạo, được lấy từ thời điểm hiện tại và chuyển thành định dạng chuỗi chuẩn ISO.
      };
      await saveUserData(newUser);
      // Lưu thông tin profile cho tài khoản mới
      await AsyncStorage.setItem(`PROFILE_NAME_${username}`, fullName);
      await AsyncStorage.setItem(`PROFILE_EMAIL_${username}`, email);
      await AsyncStorage.setItem(`PROFILE_PHONE_${username}`, '');
      Alert.alert(
        'Success',
        'Account created successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create account');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient 
        colors={['#1E0A3C', '#000000']} 
        style={styles.content}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign Up</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Your full name"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
          </View>

          <Text style={styles.inputLabel}>Username</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Your username"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Your email"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Your password"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Your confirm password"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
            <LinearGradient
              colors={['#4C35B4', '#9C27B0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    paddingTop: 20,
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 14,
  },
  inputWrapper: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#673AB7',
    borderRadius: 25,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingHorizontal: 20,
    fontSize: 16,
  },
  signUpButton: {
    height: 45,
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  loginLink: {
    color: '#9C27B0',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;