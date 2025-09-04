import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Bell, CircleAlert as AlertCircle, Info, CircleCheck as CheckCircle, Clock, Truck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const mockNotifications = [
  {
    id: '1',
    type: 'urgent',
    title: 'System Maintenance',
    message: 'The app will be under maintenance from 2:00 AM to 4:00 AM tonight. Please complete all deliveries before this time.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'New Route Optimization',
    message: 'We\'ve updated our route optimization algorithm to help you save time and fuel. Check out the new features in your next delivery.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'Payment Processed',
    message: 'Your weekly earnings of $342.75 have been processed and will be available in your account within 24 hours.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'Weather Alert',
    message: 'Heavy rain expected in your area today. Please drive safely and allow extra time for deliveries.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '5',
    type: 'urgent',
    title: 'Policy Update',
    message: 'Important updates to our delivery policies. Please review the new guidelines in the driver handbook.',
    time: '2 days ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle size={20} color="#FF6B6B" />;
      case 'success':
        return <CheckCircle size={20} color="#4ADE80" />;
      case 'info':
      default:
        return <Info size={20} color="#6A0DAD" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return '#FF6B6B';
      case 'success':
        return '#4ADE80';
      case 'info':
      default:
        return '#6A0DAD';
    }
  };

  const openNotifications = () => {
    router.push('/notifications');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#6A0DAD" />
          </TouchableOpacity>
          <LinearGradient
            colors={['#6A0DAD', '#8A2BE2']}
            style={styles.logoContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Truck size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.companyName}>DriveDelivery</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton} onPress={openNotifications}>
          <Bell size={24} color="#6A0DAD" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Page Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>Admin Broadcasts</Text>
        <Text style={styles.pageSubtitle}>Important messages from management</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {mockNotifications.map((notification) => (
          <View key={notification.id} style={[
            styles.notificationCard,
            !notification.read && styles.unreadCard
          ]}>
            <View style={styles.notificationHeader}>
              <View style={styles.notificationLeft}>
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: `${getNotificationColor(notification.type)}20` }
                ]}>
                  {getNotificationIcon(notification.type)}
                </View>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <View style={styles.timeContainer}>
                    <Clock size={12} color="#666" />
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                </View>
              </View>
              {!notification.read && <View style={styles.unreadDot} />}
            </View>
            
            <Text style={styles.notificationMessage}>{notification.message}</Text>
            
            {notification.type === 'urgent' && (
              <View style={styles.urgentBanner}>
                <Text style={styles.urgentText}>URGENT - Requires Attention</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    marginRight: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 4,
    shadowColor: '#6A0DAD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  companyName: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationButton: {
    position: 'relative',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pageTitle: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pageSubtitle: {
    color: '#666',
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#6A0DAD',
    backgroundColor: '#f8f9fa',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTime: {
    color: '#666',
    fontSize: 12,
    marginLeft: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6A0DAD',
  },
  notificationMessage: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  urgentBanner: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  urgentText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});