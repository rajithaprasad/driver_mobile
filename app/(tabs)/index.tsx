import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Bell, MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight, Truck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

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

      {/* Date Scroller */}
      <View style={styles.dateScrollerContainer}>
        <View style={styles.dateNavigationContainer}>
          <TouchableOpacity 
            style={styles.dateNavButton} 
            onPress={() => navigateDate('prev')}
            disabled={currentDateIndex === 0}
          >
            <ChevronLeft size={24} color={currentDateIndex === 0 ? "#ccc" : "#6A0DAD"} />
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
            <ChevronRight size={24} color={currentDateIndex === dates.length - 1 ? "#ccc" : "#6A0DAD"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'find' && styles.activeTab]}
          onPress={() => setActiveTab('find')}
        >
          <Text style={[styles.tabText, activeTab === 'find' && styles.activeTabText]}>
            Find Jobs ({filteredJobs.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'schedule' && styles.activeTab]}
          onPress={() => setActiveTab('schedule')}
        >
          <Text style={[styles.tabText, activeTab === 'schedule' && styles.activeTabText]}>
            Schedule ({filteredScheduled.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Job List */}
      <ScrollView style={styles.jobList} showsVerticalScrollIndicator={false}>
        {(activeTab === 'find' ? filteredJobs : filteredScheduled).length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No {activeTab === 'find' ? 'available jobs' : 'scheduled jobs'} for this date
            </Text>
          </View>
        ) : (
          (activeTab === 'find' ? filteredJobs : filteredScheduled).map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <View>
                  <Text style={styles.orderNumber}>{job.orderNumber}</Text>
                  <Text style={styles.customerName}>{job.customer}</Text>
                </View>
                <View style={styles.paymentContainer}>
                  <Text style={styles.paymentAmount}>{job.payment}</Text>
                  <Text style={styles.distance}>{job.distance}</Text>
                </View>
              </View>

              <View style={styles.locationContainer}>
                <View style={styles.locationItem}>
                  <View style={styles.locationIcon}>
                    <MapPin size={16} color="#FFA500" />
                  </View>
                  <View style={styles.locationDetails}>
                    <Text style={styles.locationLabel}>Pickup</Text>
                    <Text style={styles.locationAddress}>{job.pickupAddress}</Text>
                  </View>
                </View>

                <View style={styles.routeLine} />

                <View style={styles.locationItem}>
                  <View style={[styles.locationIcon, styles.dropIcon]}>
                    <MapPin size={16} color="#6A0DAD" />
                  </View>
                  <View style={styles.locationDetails}>
                    <Text style={styles.locationLabel}>Drop</Text>
                    <Text style={styles.locationAddress}>{job.dropAddress}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.jobFooter}>
                <View style={styles.timeContainer}>
                  <Clock size={16} color="#666" />
                  <Text style={styles.timeText}>{job.time}</Text>
                </View>
                
                {activeTab === 'find' ? (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.viewButton}
                      onPress={() => viewJobDetails(job)}
                    >
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.acceptButton}
                      onPress={() => acceptJob(job.id)}
                    >
                      <LinearGradient
                        colors={['#FFA500', '#FF8C00']}
                        style={styles.acceptButtonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      >
                        <Text style={styles.acceptButtonText}>Accept</Text>
                        <ArrowRight size={16} color="#000" />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.acceptedBadge}>
                    <Text style={styles.acceptedText}>Accepted</Text>
                  </View>
                )}
              </View>
            </View>
          ))
        )}
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
  dateScrollerContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dateNavigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  dateNavButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
  },
  currentDateContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    minWidth: 200,
  },
  currentDateText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentDayText: {
    color: '#6A0DAD',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    margin: 20,
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#6A0DAD',
    fontWeight: 'bold',
  },
  jobList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginTop: 20,
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderNumber: {
    color: '#FFA500',
    fontSize: 14,
    fontWeight: '600',
  },
  customerName: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  paymentContainer: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    color: '#4ADE80',
    fontSize: 20,
    fontWeight: 'bold',
  },
  distance: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  locationContainer: {
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dropIcon: {
    backgroundColor: '#fff',
  },
  locationDetails: {
    flex: 1,
  },
  locationLabel: {
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  locationAddress: {
    color: '#333',
    fontSize: 14,
    marginTop: 2,
    fontWeight: '500',
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: '#ddd',
    marginLeft: 15,
    marginVertical: 4,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timeText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6A0DAD',
  },
  viewButtonText: {
    color: '#6A0DAD',
    fontSize: 14,
    fontWeight: '600',
  },
  acceptButton: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#FFA500',
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
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  acceptedBadge: {
    backgroundColor: '#4ADE80',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  acceptedText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
});