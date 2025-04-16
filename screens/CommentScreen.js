import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const CommentScreen = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState('');

  // Dữ liệu mẫu cho comments, thêm trường avatar
  const comments = [
    {
      id: '1',
      username: 'Sena',
      comment: 'This song is amazing! Love the beat!',
      time: '2h ago',
      avatar: require('../assets/sena.jpg'), // Ảnh đại diện mẫu
    },
    {
      id: '2',
      username: 'Ông vua 36',
      comment: 'Great track, brings back memories.',
      time: '3h ago',
      avatar: require('../assets/sena.jpg'),
    },
    {
      id: '3',
      username: 'Hắc hoàng đế',
      comment: 'Can’t stop listening to this!',
      time: '4h ago',
      avatar: require('../assets/sena.jpg'),
    },
    {
      id: '4',
      username: 'Black King',
      comment: 'Such a vibe, perfect for my playlist.',
      time: '5h ago',
      avatar: require('../assets/sena.jpg'),
    },
    {
      id: '5',
      username: 'Doanh Nhân 100 tỷ',
      comment: 'This artist never disappoints!',
      time: '6h ago',
      avatar: require('../assets/sena.jpg'),
    },
  ];

  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <View style={styles.avatarContainer}>
        {item.avatar ? (
          <Image source={item.avatar} style={styles.avatar} />
        ) : (
          <LinearGradient
            colors={['#8B00FF', '#4A148C']}
            style={styles.avatar}
          />
        )}
      </View>
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.commentText}>{item.comment}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Icon name="ellipsis-horizontal" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#4A148C', '#1E0A3C']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1.0M Comments</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Comments List */}
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.commentsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Comment Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Comment..."
            placeholderTextColor="#666"
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Icon name="send" size={24} color="#8B00FF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 24,
  },
  commentsList: {
    paddingHorizontal: 20,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  time: {
    color: '#666',
    fontSize: 12,
  },
  commentText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  moreButton: {
    padding: 5,
    marginLeft: 10,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#1E0A3C',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#fff',
    fontSize: 16,
    
  },
  sendButton: {
    padding: 8,
  },
});

export default CommentScreen;