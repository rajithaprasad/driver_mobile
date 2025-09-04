import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Send, Phone, Video, MoveVertical as MoreVertical } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! How can I help you today?',
    sender: 'support',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    text: 'Hi, I have a question about my delivery route for today.',
    sender: 'user',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    text: 'Of course! I\'d be happy to help you with your delivery route. What specific information do you need?',
    sender: 'support',
    timestamp: '10:33 AM',
  },
  {
    id: '4',
    text: 'The pickup location seems to be incorrect in the app. It shows 123 Main St but should be 125 Main St.',
    sender: 'user',
    timestamp: '10:35 AM',
  },
  {
    id: '5',
    text: 'Thank you for letting me know. I\'ve updated the address to 125 Main St. You should see the change reflected in your app shortly.',
    sender: 'support',
    timestamp: '10:37 AM',
  },
];

export default function ChatScreen() {
  const { colors } = useTheme();
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        text: inputText.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages([...messages, newMessage]);
      setInputText('');

      // Simulate support response
      setTimeout(() => {
        const supportResponse: Message = {
          id: (messages.length + 2).toString(),
          text: 'Thanks for your message! Our team will get back to you shortly.',
          sender: 'support',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, supportResponse]);
      }, 2000);
    }
  };

    
    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.supportMessage]}>
        <View style={[
          styles.messageBubble, 
          isUser ? { backgroundColor: colors.primary } : { backgroundColor: colors.card, borderColor: colors.border }
        <View style={[
          styles.messageBubble, 
          isUser ? { backgroundColor: colors.primary } : { backgroundColor: colors.card, borderColor: colors.border }
        ]}>
          <Text style={[
            styles.messageText, 
            { color: isUser ? '#ffffff' : colors.text }
          ]}>
            styles.messageText, 
            { color: isUser ? '#ffffff' : colors.text }
          ]}>
            {item.text}
          </Text>
      <View style={[styles.chatHeader, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
            styles.timestamp, 
          <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
          ]}>
            styles.timestamp, 
            { color: isUser ? '#ffffff' : colors.textSecondary, opacity: isUser ? 0.8 : 1 }
            <Text style={[styles.headerTitle, { color: colors.text }]}>Customer Support</Text>
            <Text style={[styles.headerSubtitle, { color: colors.success }]}>Online now</Text>
          </Text>
        </View>
      </View>
  container: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: '700',
    fontWeight: '700',
    fontSize: 12,
    fontWeight: '600',
    fontWeight: '600',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    borderRadius: 8,
  },
  messagesList: {
  },
  messagesContent: {
    padding: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    borderRadius: 16,
    borderBottomRightRadius: 4,
    borderWidth: 1,
  timestamp: {
    fontSize: 10,
    textAlign: 'right',
  },
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    gap: 12,
  },
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    fontWeight: '500',
    fontWeight: '500',
    maxHeight: 100,
    borderWidth: 1,
  },
    width: 44,
    height: 44,
    borderRadius: 22,
});