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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const CommentScreen = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState('');

  // Dữ liệu mẫu cho comments
  const comments = [
    {
      id: '1',
      username: 'User Name',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '2h ago',
    },
    {
      id: '2',
      username: 'User Name',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '3h ago',
    },
    {
      id: '3',
      username: 'User Name',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '4h ago',
    },
    {
      id: '4',
      username: 'User Name',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '5h ago',
    },
    {
      id: '5',
      username: 'User Name',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '6h ago',
    },
  ];

  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={['#8B00FF', '#4A148C']}
          style={styles.avatar}
        />
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