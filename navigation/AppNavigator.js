import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, Platform, Dimensions } from 'react-native';
import StartScreen from '../screens/StartScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import EnterUsernameScreen from '../screens/EnterUsernameScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import ListeningScreen from '../screens/ListeningScreen';
import CommentScreen from '../screens/CommentScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import LibraryScreen from '../screens/LibraryScreen';
import LibraryLayoutScreen from '../screens/LibraryLayoutScreen';
import MenuListScreen from '../screens/MenuListScreen';
import QueueScreen from '../screens/QueueScreen';
import MinimizeScreen from '../screens/MinimizeScreen';
import ShareScreen from '../screens/ShareScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AudioQualityScreen from '../screens/settings/AudioQualityScreen';
import VideoQualityScreen from '../screens/settings/VideoQualityScreen';
import DownloadScreen from '../screens/settings/DownloadScreen';
import LanguageScreen from '../screens/settings/LanguageScreen';
import StorageScreen from '../screens/settings/StorageScreen';
import ArtistScreen from '../screens/ArtistScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ViewAllScreen from '../screens/ViewAllScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const { height } = Dimensions.get('window');
const isIPhoneX = Platform.OS === 'ios' && (height === 812 || height === 896);

// Tạo Bottom Tab Navigator cho Home, Favorite, Library, Profile
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Favorite') {
            iconName = 'heart-outline';
          } else if (route.name === 'Library') {
            iconName = 'library-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6A5ACD',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          backgroundColor: '#2A1B3D',
          borderTopWidth: 0,
          paddingBottom: isIPhoneX ? 30 : 5,
          paddingTop: 5,
          height: isIPhoneX ? 85 : 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Stack Navigator chính
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EnterUsername" component={EnterUsernameScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Listening" component={ListeningScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Comment" component={CommentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LibraryLayout" component={LibraryLayoutScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MenuList" component={MenuListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Queue" component={QueueScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Minimize" component={MinimizeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Share" component={ShareScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AudioQuality" component={AudioQualityScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VideoQuality" component={VideoQualityScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Download" component={DownloadScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Storage" component={StorageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Artist" component={ArtistScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ViewAll" component={ViewAllScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;