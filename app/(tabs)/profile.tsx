import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, FileText, Phone, Mail, MapPin, Star, Calendar, TrendingUp, Package, Clock, ChevronLeft, ChevronRight, Truck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

// Mock orders data with different dates
const mockOrders = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'John Smith',
    status: 'completed',
    payment: '$25.50',
    date: new Date().toDateString(),
    time: '2:30 PM',
    goods: 'Electronics Package',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'Sarah Johnson',
    status: 'completed',
    payment: '$18.75',
    date: new Date().toDateString(),
    time: '4:15 PM',
    goods: 'Food Delivery',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Mike Davis',
    status: 'pending',
    payment: '$32.25',
    date: new Date(Date.now() + 86400000).toDateString(), // Tomorrow
    time: '6:00 PM',
    goods: 'Documents',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: 'Emily Wilson',
    status: 'completed',
    payment: '$22.00',
    date: new Date(Date.now() - 86400000).toDateString(), // Yesterday
    time: '1:00 PM',
    goods: 'Clothing Package',
  },
];

export default function ProfileScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  const generateDates = () => {
    const dates = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365); // Start from 1 year ago
    
    for (let i = 0; i <= 730; i++) { // 2 years total
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  const todayIndex = dates.findIndex(date => 
    date.toDateString() === new Date().toDateString()
  );

  React.useEffect(() => {
    setCurrentDateIndex(todayIndex);
    setSelectedDate(dates[todayIndex]);
  }, []);

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear(),
    };
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? Math.max(0, currentDateIndex - 1)
      : Math.min(dates.length - 1, currentDateIndex + 1);
    
    setCurrentDateIndex(newIndex);
    setSelectedDate(dates[newIndex]);
  };

  // Filter orders by selected date
  const ordersForDate = mockOrders.filter(order => order.date === selectedDate.toDateString());

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          router.replace('/login');
        }}
      ]
    );
  };

  const handleDocuments = () => {
    router.push('/documents');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings screen would be implemented here.');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Support functionality would be implemented here.');
  };

  const openNotifications = () => {
    router.push('/notifications');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>JD</Text>
            <View style={styles.onlineIndicator} />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.driverName}>John Driver</Text>
            <Text style={styles.driverEmail}>john.driver@email.com</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFA500" fill="#FFA500" />
              <Text style={styles.rating}>4.9</Text>
              <Text style={styles.ratingText}>(127 reviews)</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Calendar size={20} color="#6A0DAD" />
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
          
          <View style={styles.statItem}>
            <TrendingUp size={20} color="#4ADE80" />
            <Text style={styles.statNumber}>342</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          
          <View style={styles.statItem}>
            <Star size={20} color="#FFA500" />
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Date Scroller for Orders */}
        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>Orders History</Text>
          
          <View style={styles.dateScrollerContainer}>
            <View style={styles.dateNavigationContainer}>
              <TouchableOpacity 
                style={styles.dateNavButton} 
                onPress={() => navigateDate('prev')}
                disabled={currentDateIndex === 0}
              >
                <ChevronLeft size={20} color={currentDateIndex === 0 ? "#ccc" : "#6A0DAD"} />
              </TouchableOpacity>
              
              <View style={styles.currentDateContainer}>
                <Text style={styles.currentDateText}>
                  {formatDate(selectedDate).month} {formatDate(selectedDate).date}, {formatDate(selectedDate).year}
                </Text>
                <Text style={styles.currentDayText}>
                  {formatDate(selectedDate).day}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.dateNavButton} 
                onPress={() => navigateDate('next')}
                disabled={currentDateIndex === dates.length - 1}
              >
                <ChevronRight size={20} color={currentDateIndex === dates.length - 1 ? "#ccc" : "#6A0DAD"} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Orders for Selected Date */}
          <View style={styles.ordersContainer}>
            {ordersForDate.length === 0 ? (
              <View style={styles.emptyOrders}>
                <Package size={40} color="#ccc" />
                <Text style={styles.emptyOrdersText}>No orders for this date</Text>
              </View>
            ) : (
              ordersForDate.map((order) => (
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <View>
                      <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                      <Text style={styles.orderCustomer}>{order.customer}</Text>
                    </View>
                    <View style={styles.orderRight}>
                      <Text style={styles.orderPayment}>{order.payment}</Text>
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: order.status === 'completed' ? '#4ADE80' : '#FFA500' }
                      ]}>
                        <Text style={styles.statusText}>{order.status}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.orderDetails}>
                    <View style={styles.orderDetailItem}>
                      <Clock size={14} color="#666" />
                      <Text style={styles.orderDetailText}>{order.time}</Text>
                    </View>
                    <View style={styles.orderDetailItem}>
                      <Package size={14} color="#666" />
                      <Text style={styles.orderDetailText}>{order.goods}</Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.infoItem}>
            <Phone size={20} color="#666" />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>+1 (555) 123-4567</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Mail size={20} color="#666" />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>john.driver@email.com</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <MapPin size={20} color="#666" />
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>New York, NY</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleDocuments}>
            <View style={styles.menuLeft}>
              <FileText size={20} color="#6A0DAD" />
              <Text style={styles.menuText}>Document Management</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
            <View style={styles.menuLeft}>
              <Settings size={20} color="#666" />
              <Text style={styles.menuText}>Settings</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Bell size={20} color="#666" />
              <Text style={styles.menuText}>Notifications</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Shield size={20} color="#666" />
              <Text style={styles.menuText}>Privacy & Security</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleSupport}>
            <View style={styles.menuLeft}>
              <HelpCircle size={20} color="#666" />
              <Text style={styles.menuText}>Help & Support</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FF6B6B" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>DriveDelivery v1.0.0</Text>
          <Text style={styles.footerText}>© 2024 DriveDelivery Inc.</Text>
        </View>
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
  content: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarText: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6A0DAD',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 60,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4ADE80',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  driverName: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  driverEmail: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#FFA500',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  ratingText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  statNumber: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  ordersSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  dateScrollerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  dateNavigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateNavButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
  },
  currentDateContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 180,
  },
  currentDateText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentDayText: {
    color: '#6A0DAD',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  ordersContainer: {
    gap: 8,
  },
  emptyOrders: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  emptyOrdersText: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    color: '#FFA500',
    fontSize: 12,
    fontWeight: '600',
  },
  orderCustomer: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderPayment: {
    color: '#4ADE80',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  orderDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  orderDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderDetailText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 4,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  infoText: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  menuArrow: {
    color: '#666',
    fontSize: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    margin: 20,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
});