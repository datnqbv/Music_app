import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Các key dùng để lưu trữ trong AsyncStorage
 */
export const STORAGE_KEYS = {
  USER_DATA: '@user_data',
  FAVORITE_SONGS: '@favorite_songs',
  RECENT_PLAYED: '@recent_played',
  PLAYLISTS: '@playlists',
};

/**
 * Hàm lưu thông tin người dùng
 * @param {Object} userData - Thông tin người dùng cần lưu
 */
export const saveUserData = async (userData) => {
  try {
    const usersStr = await AsyncStorage.getItem('USER_LIST'); // Lấy danh sách người dùng đã lưu
    let users = usersStr ? JSON.parse(usersStr) : []; // Nếu có, chuyển đổi sang mảng, nếu không thì khởi tạo mảng rỗng
    // Không thêm trùng username
    if (!users.find(u => u.username === userData.username)) {
      users.push(userData); // Nếu không trùng, thêm người dùng vào danh sách
      await AsyncStorage.setItem('USER_LIST', JSON.stringify(users)); // Lưu lại danh sách người dùng vào AsyncStorage
    }
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

/**
 * Hàm lấy thông tin người dùng
 * @returns {Object|null} - Thông tin người dùng hoặc null nếu không có
 */
export const getUserData = async (username) => {
  try {
    const usersStr = await AsyncStorage.getItem('USER_LIST'); // Lấy danh sách người dùng đã lưu
    const users = usersStr ? JSON.parse(usersStr) : []; // Chuyển chuỗi JSON thành mảng
    return users.find(u => u.username === username); // Tìm kiếm người dùng theo username
  } catch (error) {
    return null;
  }
};

/**
 * Hàm lưu danh sách bài hát yêu thích
 * @param {Array} songs - Danh sách bài hát yêu thích
 */
export const saveFavoriteSongs = async (songs) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_SONGS, JSON.stringify(songs)); // Lưu danh sách bài hát yêu thích vào AsyncStorage
  } catch (error) {
    console.error('Error saving favorite songs:', error);
  }
};

/**
 * Hàm lấy danh sách bài hát yêu thích
 * @returns {Array} - Danh sách bài hát yêu thích
 */
export const getFavoriteSongs = async () => {
  try {
    const songs = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITE_SONGS); // Lấy danh sách bài hát yêu thích
    return songs ? JSON.parse(songs) : []; // Nếu có, trả về danh sách bài hát, nếu không trả về mảng rỗng
  } catch (error) {
    console.error('Error getting favorite songs:', error);
    return [];
  }
};

/**
 * Hàm lưu danh sách bài hát đã nghe gần đây
 * @param {Array} songs - Danh sách bài hát đã nghe
 */
export const saveRecentPlayed = async (songs) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.RECENT_PLAYED, JSON.stringify(songs)); // Lưu danh sách bài hát đã nghe gần đây vào AsyncStorage
  } catch (error) {
    console.error('Error saving recent played songs:', error);
  }
};

/**
 * Hàm lấy danh sách bài hát đã nghe gần đây
 * @returns {Array} - Danh sách bài hát đã nghe
 */
export const getRecentPlayed = async () => {
  try {
    const songs = await AsyncStorage.getItem(STORAGE_KEYS.RECENT_PLAYED); // Lấy danh sách bài hát đã nghe gần đây
    return songs ? JSON.parse(songs) : []; // Nếu có, trả về danh sách bài hát đã nghe, nếu không trả về mảng rỗng
  } catch (error) {
    console.error('Error getting recent played songs:', error);
    return [];
  }
};

/**
 * Hàm lưu danh sách playlist
 * @param {Array} playlists - Danh sách playlist
 */
export const savePlaylists = async (playlists) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists)); // Lưu danh sách playlist vào AsyncStorage
  } catch (error) {
    console.error('Error saving playlists:', error);
  }
};

/**
 * Hàm lấy danh sách playlist
 * @returns {Array} - Danh sách playlist
 */
export const getPlaylists = async () => {
  try {
    const playlists = await AsyncStorage.getItem(STORAGE_KEYS.PLAYLISTS); // Lấy danh sách playlist
    return playlists ? JSON.parse(playlists) : []; // Nếu có, trả về danh sách playlist, nếu không trả về mảng rỗng
  } catch (error) {
    console.error('Error getting playlists:', error);
    return [];
  }
};

/**
 * Hàm tạo playlist mới
 * @param {Object} playlistData - Thông tin playlist mới
 * @returns {Object} - Playlist đã được tạo
 */
export const createPlaylist = async (playlistData) => {
  try {
    const playlists = await getPlaylists(); // Lấy danh sách playlist hiện tại
    const newPlaylist = {
      id: Date.now().toString(), // Tạo ID duy nhất cho playlist
      ...playlistData,
      createdAt: new Date().toISOString(), // Lưu thời gian tạo playlist
    };
    const updatedPlaylists = [...playlists, newPlaylist]; // Thêm playlist mới vào danh sách
    await savePlaylists(updatedPlaylists); // Lưu lại danh sách playlist đã cập nhật vào AsyncStorage
    return newPlaylist; // Trả về playlist mới
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
};

/**
 * Hàm cập nhật thông tin playlist
 * @param {string} playlistId - ID của playlist cần cập nhật
 * @param {Object} updatedData - Thông tin mới của playlist
 * @returns {Object} - Playlist đã được cập nhật
 */
export const updatePlaylist = async (playlistId, updatedData) => {
  try {
    const playlists = await getPlaylists(); // Lấy danh sách playlist hiện tại
    const updatedPlaylists = playlists.map(playlist => 
      playlist.id === playlistId ? { ...playlist, ...updatedData } : playlist // Cập nhật playlist có ID trùng
    );
    await savePlaylists(updatedPlaylists); // Lưu danh sách playlist đã cập nhật vào AsyncStorage
    return updatedPlaylists.find(p => p.id === playlistId); // Trả về playlist đã được cập nhật
  } catch (error) {
    console.error('Error updating playlist:', error);
    throw error;
  }
};

/**
 * Hàm xóa playlist
 * @param {string} playlistId - ID của playlist cần xóa
 */
export const deletePlaylist = async (playlistId) => {
  try {
    const playlists = await getPlaylists(); // Lấy danh sách playlist hiện tại
    const updatedPlaylists = playlists.filter(playlist => playlist.id !== playlistId); // Lọc playlist cần xóa
    await savePlaylists(updatedPlaylists); // Lưu lại danh sách playlist đã xóa vào AsyncStorage
  } catch (error) {
    console.error('Error deleting playlist:', error);
    throw error;
  }
};

/**
 * Hàm thêm bài hát vào playlist
 * @param {string} playlistId - ID của playlist
 * @param {Object} song - Bài hát cần thêm
 */
export const addSongToPlaylist = async (playlistId, song) => {
  try {
    const playlists = await getPlaylists(); // Lấy danh sách playlist hiện tại
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === playlistId) {
        // Kiểm tra xem bài hát đã tồn tại trong playlist chưa
        const songExists = playlist.songs.some(s => s.id === song.id);
        if (!songExists) {
          return {
            ...playlist,
            songs: [...playlist.songs, song], // Thêm bài hát vào playlist nếu chưa có
          };
        }
      }
      return playlist;
    });
    await savePlaylists(updatedPlaylists); // Lưu lại danh sách playlist đã cập nhật vào AsyncStorage
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    throw error;
  }
};

/**
 * Hàm xóa bài hát khỏi playlist
 * @param {string} playlistId - ID của playlist
 * @param {string} songId - ID của bài hát cần xóa
 */
export const removeSongFromPlaylist = async (playlistId, songId) => {
  try {
    const playlists = await getPlaylists(); // Lấy danh sách playlist hiện tại
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          songs: playlist.songs.filter(song => song.id !== songId), // Lọc bỏ bài hát khỏi playlist
        };
      }
      return playlist;
    });
    await savePlaylists(updatedPlaylists); // Lưu lại danh sách playlist đã cập nhật vào Async
  } catch (error) {
    console.error('Error removing song from playlist:', error);
    throw error;
  }
};

/**
 * Hàm lấy playlist theo ID
 * @param {string} playlistId - ID của playlist cần lấy
 * @returns {Object|null} - Playlist hoặc null nếu không tìm thấy
 */
export const getPlaylistById = async (playlistId) => {
  try {
    const playlists = await getPlaylists(); // Lấy danh sách tất cả các playlist đã lưu từ AsyncStorage
    return playlists.find(playlist => playlist.id === playlistId); // Tìm playlist có ID khớp với playlistId
  } catch (error) {
    console.error('Error getting playlist by id:', error);
    throw error;
  }
}; 