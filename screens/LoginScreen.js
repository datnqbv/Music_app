import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getUserData } from '../data/storage';

/**
 * LoginScreen component - Màn hình đăng nhập
 * Chỉ sử dụng thông tin đăng nhập đã được lưu khi đăng ký
 */
const LoginScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    const savedUserData = await getUserData();
    if (savedUserData && 
        savedUserData.username === username && 
        savedUserData.password === password) {
      navigation.navigate('Main', { screen: 'Home' });
    } else {
      Alert.alert('Error', 'Invalid username or password');
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
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Onboarding', { screen: 'Onboarding' })}
        >
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>YOUR LOGO</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Username Input */}
          <Text style={styles.inputLabel}>Enter Username</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Username"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <Text style={styles.inputLabel}>Enter Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry={!showPassword}
            />
          </View>

          {/* Remember Me & Forgot Password */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={styles.checkbox}>
                {rememberMe && (
                  <Icon name="checkmark" size={12} color="#fff" />
                )}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="logo-google" size={30} style={styles.googleIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="logo-facebook" size={30} style={styles.facebookIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="logo-twitter" size={30} style={styles.twitterIcon} />
            </TouchableOpacity>
          </View>

          {/* Sign Up Link - Moved below social icons */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLink}>Sign Up</Text>
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
  backButton: {
    marginTop: Platform.OS === 'ios' ? 50 : 30,
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logoText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  form: {
    flex: 1,
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#673AB7',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    color: '#fff',
    fontSize: 14,
  },
  forgotText: {
    color: '#673AB7',
    fontSize: 14,
  },
  loginButton: {
    height: 45,
    backgroundColor: '#673AB7',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    color: '#DB4437'
  },
  facebookIcon: {
    color: '#4267B2'
  },
  twitterIcon: {
    color: '#1DA1F2'
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  signupLink: {
    color: '#9C27B0',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;