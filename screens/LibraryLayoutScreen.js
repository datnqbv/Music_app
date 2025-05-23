// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const { width } = Dimensions.get('window');

// const LibraryLayoutScreen = () => {
//   const navigation = useNavigation();
//   const [activeTab, setActiveTab] = useState('Playlist');

//   const playlists = [
//     { id: '1', title: 'Your Playlist 1', songs: '10 songs', image: require('../assets/song-image.jpg') },
//     { id: '2', title: 'Your Playlist 2', songs: '8 songs', image: require('../assets/song-image.jpg') },
//     { id: '3', title: 'Your Playlist 3', songs: '12 songs', image: require('../assets/song-image.jpg') },
//   ];

//   const recentItems = [
//     {
//       id: '1',
//       title: 'Song Title 1',
//       artist: 'Artist 1',
//       image: require('../assets/song-image.jpg'),
//     },
//     {
//       id: '2',
//       title: 'Song Title 2',
//       artist: 'Artist 2',
//       image: require('../assets/song-image.jpg'),
//     },
//     {
//       id: '3',
//       title: 'Song Title 3',
//       artist: 'Artist 3',
//       image: require('../assets/song-image.jpg'),
//     },
//     {
//       id: '4',
//       title: 'Song Title 4',
//       artist: 'Artist 4',
//       image: require('../assets/song-image.jpg'),
//     },
//   ];

//   const renderPlaylistItem = ({ item }) => (
//     <View key={item.id} style={styles.playlistCircle}>
//       <TouchableOpacity
//         onPress={() => navigation.navigate('Playlist', { playlist: item })}
//       >
//         <View style={styles.playlistImageContainer}>
//           {item.image && <Image source={item.image} style={styles.playlistImage} />}
//         </View>
//       </TouchableOpacity>
//       <Text style={styles.playlistTitle} numberOfLines={1}>
//         {item.title || 'Unknown Playlist'}
//       </Text>
//     </View>
//   );

//   const renderRecentItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.recentItem}
//       onPress={() => navigation.navigate('Listening', { song: item })}
//     >
//       {item.image && <Image source={item.image} style={styles.recentImage} />}
//       <View style={styles.recentInfo}>
//         <View style={styles.recentTextContainer}>
//           <Text style={styles.recentTitle} numberOfLines={1}>
//             {item.title || 'Unknown Title'}
//           </Text>
//           <Text style={styles.recentArtist} numberOfLines={1}>
//             {item.artist || 'Unknown Artist'}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.moreButton}>
//           <Icon name="ellipsis-vertical" size={20} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollViewContent}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Icon name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>My Library</Text>
//           <View style={styles.headerRight}>
//             <TouchableOpacity
//               style={styles.iconButton}
//               onPress={() => navigation.navigate('Search')}
//             >
//               <Icon name="search-outline" size={24} color="#fff" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.iconButton}
//               onPress={() => navigation.navigate('Library')}
//             >
//               <Icon name="list-outline" size={24} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Tabs */}
//         <View style={styles.tabsContainer}>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             <TouchableOpacity
//               style={[styles.tabButton, activeTab === 'Playlist' && styles.activeTabButton]}
//               onPress={() => setActiveTab('Playlist')}
//             >
//               <Icon name="list" size={24} color="#fff" />
//               <Text style={styles.tabText}>Playlist</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.tabButton, activeTab === 'Album' && styles.activeTabButton]}
//               onPress={() => setActiveTab('Album')}
//             >
//               <Icon name="albums" size={24} color="#fff" />
//               <Text style={styles.tabText}>Album</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.tabButton, activeTab === 'Artist' && styles.activeTabButton]}
//               onPress={() => setActiveTab('Artist')}
//             >
//               <Icon name="person" size={24} color="#fff" />
//               <Text style={styles.tabText}>Artist</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>

//         {/* Playlists */}
//         <View style={styles.playlistsContainer}>
//           <FlatList
//             data={playlists}
//             renderItem={renderPlaylistItem}
//             keyExtractor={(item) => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             ListFooterComponent={() => (
//               <TouchableOpacity
//                 style={styles.createPlaylistButton}
//                 onPress={() => navigation.navigate('CreatePlaylist')}
//               >
//                 <Icon name="add" size={40} color="#fff" />
//                 <Text style={styles.createPlaylistText}>Create{'\n'}Playlist</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>

//         {/* Content Based on Active Tab */}
//         {activeTab === 'Playlist' && (
//           <>
//             {/* Recent Section */}
//             <View style={styles.recentSection}>
//               <View style={styles.recentHeader}>
//                 <Text style={styles.sectionTitle}>Recent</Text>
//               </View>
//               <FlatList
//                 data={recentItems}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderRecentItem}
//                 numColumns={1}
//                 scrollEnabled={false}
//                 ItemSeparatorComponent={() => <View style={styles.separator} />}
//               />
//             </View>
//           </>
//         )}

//         {activeTab === 'Album' && (
//           <View style={styles.emptySection}>
//             <Text style={styles.emptyText}>No albums available.</Text>
//           </View>
//         )}

//         {activeTab === 'Artist' && (
//           <View style={styles.emptySection}>
//             <Text style={styles.emptyText}>No artists available.</Text>
//           </View>
//         )}
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     paddingBottom: 80,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingTop: 50,
//     paddingBottom: 20,
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconButton: {
//     marginLeft: 15,
//   },
//   tabsContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   tabButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   activeTabButton: {
//     backgroundColor: '#8B00FF',
//   },
//   tabText: {
//     color: '#fff',
//     marginLeft: 5,
//   },
//   playlistsContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 30,
//   },
//   playlistCircle: {
//     alignItems: 'center',
//     marginRight: 20,
//     width: 100,
//   },
//   playlistImageContainer: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#8B00FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//     overflow: 'hidden',
//   },
//   playlistImage: {
//     width: '100%',
//     height: '100%',
//   },
//   playlistTitle: {
//     color: '#fff',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   createPlaylistButton: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   createPlaylistText: {
//     color: '#fff',
//     fontSize: 12,
//     textAlign: 'center',
//     marginTop: 5,
//   },
//   recentSection: {
//     paddingHorizontal: 20,
//   },
//   recentHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   recentItem: {
//     width: '100%',
//   },
//   recentImage: {
//     width: '100%',
//     height: width - 40,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   recentInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//   },
//   recentTextContainer: {
//     flex: 1,
//   },
//   recentTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   recentArtist: {
//     color: '#999',
//     fontSize: 14,
//     marginTop: 2,
//   },
//   moreButton: {
//     padding: 5,
//   },
//   separator: {
//     height: 20,
//   },
//   emptySection: {
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   emptyText: {
//     color: '#B0B0B0',
//     fontSize: 16,
//   },
// });

// export default LibraryLayoutScreen;