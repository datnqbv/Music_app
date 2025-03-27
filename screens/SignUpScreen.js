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

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState(''); // Thêm trường Username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!fullName) tempErrors.fullName = 'Họ tên không được để trống';
    if (!username) tempErrors.username = 'Tên đăng nhập không được để trống'; // Thêm validate cho Username
    if (!email) tempErrors.email = 'Email không được để trống';
    if (!password) tempErrors.password = 'Mật khẩu không được để trống';
    if (!confirmPassword) tempErrors.confirmPassword = 'Xác nhận mật khẩu không được để trống';
    if (password !== confirmPassword) tempErrors.confirmPassword = 'Mật khẩu không khớp';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      // Xử lý logic đăng ký ở đây
      navigation.navigate('Login');
    } else {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient colors={['#1E0A3C', '#000000']} style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign Up</Text>
          <View style={styles.headerPlaceholder} /> {/* Placeholder để cân bằng layout */}
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#B0B0B0"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
              autoCapitalize="words"
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
          </View>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#B0B0B0"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              autoCapitalize="none"
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#B0B0B0"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#B0B0B0"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#B0B0B0"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity onPress={handleSignUp}>
            <LinearGradient
              colors={['#A78BFA', '#6A5ACD']}
              style={styles.signUpButton}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Login Link */}
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
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    width: '100%',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerPlaceholder: {
    width: 24, // Để cân bằng layout với nút quay lại
  },
  form: {
    width: '100%',
    marginTop: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#A78BFA',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  signUpButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  loginLink: {
    color: '#A78BFA',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;