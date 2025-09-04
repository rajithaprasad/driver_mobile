import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');

const mockJobs = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'John Smith',
    customerPhone: '+1 (555) 123-4567',
    pickupAddress: '123 Main St, Downtown',
    dropAddress: '456 Oak Ave, Uptown',
    time: '2:30 PM',
    distance: '5.2 km',
    payment: '$25.50',
    goods: 'Electronics Package',
    customerRating: 4.8,
    notes: 'Please ring doorbell twice. Apartment 4B.',
    date: new Date().toDateString(),
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'Sarah Johnson',
    customerPhone: '+1 (555) 987-6543',
    pickupAddress: '789 Pine St, Central',
    dropAddress: '321 Elm Dr, Westside',
    time: '4:15 PM',
    distance: '3.8 km',
    payment: '$18.75',
    goods: 'Food Delivery',
    customerRating: 4.9,
    notes: 'Leave at door if no answer.',
    date: new Date().toDateString(),
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Mike Davis',
    customerPhone: '+1 (555) 456-7890',
    pickupAddress: '555 Broadway, Theater District',
    dropAddress: '777 Park Ave, East Side',
    time: '6:00 PM',
    distance: '7.1 km',
    payment: '$32.25',
    goods: 'Documents',
    customerRating: 4.7,
    notes: 'Business delivery - ask for reception.',
    date: new Date(Date.now() + 86400000).toDateString(), // Tomorrow
  },
];

const scheduledJobs = [
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: 'Emily Wilson',
    customerPhone: '+1 (555) 321-0987',
    pickupAddress: '999 First St, Harbor',
    dropAddress: '111 Beach Blvd, Coastal',
    time: '1:00 PM',
    distance: '4.5 km',
    payment: '$22.00',
    goods: 'Clothing Package',
    customerRating: 4.6,
    notes: 'Fragile items - handle with care.',
    status: 'accepted',
    date: new Date().toDateString(),
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const { colors } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('find');
  const [jobs, setJobs] = useState(mockJobs);
  const [scheduled, setScheduled] = useState(scheduledJobs);
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  const generateDates = () => {
    const dates = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365); // Start from 1 year ago
    
    for (let i = 0; i <= 730; i++) { // 2 years total (1 year back + 1 year forward)
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

  const acceptJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setJobs(jobs.filter(j => j.id !== jobId));
      setScheduled([...scheduled, { ...job, status: 'accepted' }]);
    }
  };

  const viewJobDetails = (job: any) => {
    router.push({
      pathname: '/job-details',
      params: { 
        id: job.id,
        orderNumber: job.orderNumber,
        customer: job.customer,
        customerPhone: job.customerPhone,
        pickupAddress: job.pickupAddress,
        dropAddress: job.dropAddress,
        time: job.time,
        distance: job.distance,
        payment: job.payment,
        goods: job.goods,
        customerRating: job.customerRating.toString(),
        notes: job.notes || '',
      }
    });
  };

  const openNotifications = () => {
    router.push('/notifications');
  };

  // Filter jobs by selected date
  const filteredJobs = jobs.filter(job => job.date === selectedDate.toDateString());
  const filteredScheduled = scheduled.filter(job => job.date === selectedDate.toDateString());

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="DriveDelivery" />

      {/* Date Scroller */}
      <View style={[styles.dateScrollerContainer, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <View style={styles.dateNavigationContainer}>
          <TouchableOpacity 
            style={[styles.dateNavButton, { backgroundColor: colors.surface }]} 
            onPress={() => navigateDate('prev')}
            disabled={currentDateIndex === 0}
          >
            <ChevronLeft size={24} color={currentDateIndex === 0 ? colors.border : colors.primary} />
          </TouchableOpacity>
            style={[styles.dateNavButton, { backgroundColor: colors.surface }]} 
          <View style={[styles.currentDateContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.currentDateText, { color: colors.text }]}>
              {formatDate(selectedDate).month} {formatDate(selectedDate).date}, {formatDate(selectedDate).year}
            <ChevronRight size={24} color={currentDateIndex === dates.length - 1 ? colors.border : colors.primary} />
            <Text style={[styles.currentDayText, { color: colors.primary }]}>
              {formatDate(selectedDate).day}
            </Text>
          </View>
          
      <View style={[styles.tabContainer, { backgroundColor: colors.surface }]}>
            style={[styles.dateNavButton, { backgroundColor: colors.surface }]} 
          style={[styles.tab, activeTab === 'find' && { ...styles.activeTab, backgroundColor: colors.background }]}
            disabled={currentDateIndex === dates.length - 1}
          >
          <Text style={[
            styles.tabText, 
            { color: colors.textSecondary },
            activeTab === 'find' && { ...styles.activeTabText, color: colors.primary }
          ]}>
          </TouchableOpacity>
        </View>
      </View>

          style={[styles.tab, activeTab === 'schedule' && { ...styles.activeTab, backgroundColor: colors.background }]}
      <View style={[styles.tabContainer, { backgroundColor: colors.surface }]}>
      <View style={[styles.dateScrollerContainer, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <Text style={[
            styles.tabText,
            { color: colors.textSecondary },
            activeTab === 'schedule' && { ...styles.activeTabText, color: colors.primary }
          ]}>
          onPress={() => setActiveTab('find')}
            style={[styles.dateNavButton, { backgroundColor: colors.surface }]} 
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="DriveDelivery" />

            <ChevronLeft size={24} color={currentDateIndex === 0 ? colors.border : colors.primary} />
      <ScrollView style={styles.jobList} showsVerticalScrollIndicator={false}>
        {(activeTab === 'find' ? filteredJobs : filteredScheduled).length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
            <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
              No {activeTab === 'find' ? 'available jobs' : 'scheduled jobs'} for this date
            </Text>
          </View>
        ) : (
          (activeTab === 'find' ? filteredJobs : filteredScheduled).map((job) => (
            <View key={job.id} style={[styles.jobCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.jobHeader}>
                <View>
                  <Text style={[styles.orderNumber, { color: colors.accent }]}>{job.orderNumber}</Text>
                  <Text style={[styles.customerName, { color: colors.text }]}>{job.customer}</Text>
                </View>
                <View style={styles.paymentContainer}>
                  <Text style={[styles.paymentAmount, { color: colors.success }]}>{job.payment}</Text>
                  <Text style={[styles.distance, { color: colors.textSecondary }]}>{job.distance}</Text>
                </View>
              </View>

              <View style={[styles.locationContainer, { backgroundColor: colors.surface }]}>
                <View style={styles.locationItem}>
                  <View style={[styles.locationIcon, { backgroundColor: colors.background }]}>
                    <MapPin size={16} color={colors.accent} />
                  </View>
                  <View style={styles.locationDetails}>
                    <Text style={[styles.locationLabel, { color: colors.textSecondary }]}>Pickup</Text>
                    <Text style={[styles.locationAddress, { color: colors.text }]}>{job.pickupAddress}</Text>
  container: {
    flex: 1,
  dateScrollerContainer: {
    paddingVertical: 20,
  },
  dateNavigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  dateNavButton: {
    borderRadius: 12,
    marginHorizontal: 20,
  },
  currentDateContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    minWidth: 200,
  },
  currentDateText: {
    fontWeight: '700',
    fontWeight: '700',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  tabContainer: {
    margin: 20,
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    fontWeight: '700',
  },
  jobList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    borderRadius: 16,
    marginTop: 20,
  },
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    fontWeight: '500',
  },
  jobCard: {
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    elevation: 2,
    shadowRadius: 8,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderNumber: {
    fontWeight: '700',
    fontWeight: '700',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  paymentContainer: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontWeight: '700',
    fontWeight: '700',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
    fontWeight: '500',
  },
  locationContainer: {
    padding: 16,
    borderRadius: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 12,
    elevation: 1,
  locationDetails: {
    flex: 1,
  },
  locationLabel: {
    fontWeight: '700',
    fontWeight: '700',
  },
    fontSize: 14,
    marginTop: 2,
    fontWeight: '600',
  },
  routeLine: {
    width: 2,
    marginLeft: 15,
    marginVertical: 4,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
    fontSize: 14,
    fontWeight: '700',
  },
    fontWeight: '600',
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  acceptButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  acceptButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  acceptButtonText: {
    fontWeight: '700',
    fontWeight: '700',
  },
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  acceptedText: {
    fontWeight: '700',
    fontWeight: '700',
});