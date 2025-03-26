import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const EnterUsernameScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#2A1B3D', '#4B2E83']} style={styles.container}>
      <Text style={styles.title}>Enter Username</Text>
      <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#ccc" />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#3A2A5D', borderRadius: 10, padding: 10, color: '#fff', marginBottom: 15 },
  button: { backgroundColor: '#6A5ACD', borderRadius: 10, padding: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default EnterUsernameScreen;