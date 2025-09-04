import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { MapPin, Clock, DollarSign, Package, Star, Navigation, Filter } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');

const mockJobs = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'John Smith',
    customerPhone: '+1 (555) 123-4567',
    customerRating: 4.8,
    pickupAddress: '123 Main St, Downtown',
    dropAddress: '456 Oak Ave, Uptown',
    time: '2:30 PM',
    distance: '3.2 km',
    payment: '$25.50',
    goods: 'Electronics Package',
    notes: 'Handle with care - fragile items inside',
    priority: 'high',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'Sarah Johnson',
    customerPhone: '+1 (555) 987-6543',
    customerRating: 4.9,
    pickupAddress: '789 Pine St, Midtown',
    dropAddress: '321 Elm St, Westside',
    time: '4:15 PM',
    distance: '2.8 km',
    payment: '$18.75',
    goods: 'Food Delivery',
    notes: 'Ring doorbell twice',
    priority: 'normal',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Mike Davis',
    customerPhone: '+1 (555) 456-7890',
    customerRating: 4.7,
    pickupAddress: '555 Broadway, Central',
    dropAddress: '888 Park Ave, Eastside',
    time: '6:00 PM',
    distance: '4.1 km',
    payment: '$32.25',
    goods: 'Documents',
    notes: 'Business delivery - ask for signature',
    priority: 'urgent',
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const [jobs] = useState(mockJobs);
  const [filter, setFilter] = useState<'all' | 'high' | 'urgent'>('all');

  const filteredJobs = filter === 'all' 
    ? jobs 
    : jobs.filter(job => job.priority === filter);

  const handleViewJob = (job: any) => {
    router.push({
      pathname: '/job-details',
      params: job,
    });
  };

  const handleQuickAccept = (jobId: string) => {
    Alert.alert(
      'Accept Job',
      'Are you sure you want to accept this delivery job?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Accept', 
          onPress: () => {
            Alert.alert('Success', 'Job accepted! Check your schedule for details.');
          }
        }
      ]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return colors.error;
      case 'high':
        return colors.warning;
      default:
        return colors.success;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'URGENT';
      case 'high':
        return 'HIGH';
      default:
        return 'NORMAL';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Available Jobs" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Package size={24} color={colors.primary} />
            <Text style={[styles.statNumber, { color: colors.text }]}>12</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Available</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Clock size={24} color={colors.accent} />
            <Text style={[styles.statNumber, { color: colors.text }]}>3</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>In Progress</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <DollarSign size={24} color={colors.success} />
            <Text style={[styles.statNumber, { color: colors.text }]}>$76</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Today</Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <Text style={[styles.filterTitle, { color: colors.text }]}>Filter Jobs</Text>
          <View style={styles.filterButtons}>
            {['all', 'high', 'urgent'].map((filterType) => (
              <TouchableOpacity
                key={filterType}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: filter === filterType ? colors.primary : colors.surface,
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => setFilter(filterType as any)}
              >
                <Text style={[
                  styles.filterButtonText,
                  { color: filter === filterType ? '#ffffff' : colors.text }
                ]}>
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Jobs List */}
        <View style={styles.jobsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {filteredJobs.length} Jobs Available
          </Text>
          
          {filteredJobs.map((job) => (
            <View key={job.id} style={[styles.jobCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {/* Priority Badge */}
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(job.priority) }]}>
                <Text style={styles.priorityText}>{getPriorityLabel(job.priority)}</Text>
              </View>

              {/* Job Header */}
              <View style={styles.jobHeader}>
                <View style={styles.jobLeft}>
                  <Text style={[styles.orderNumber, { color: colors.accent }]}>{job.orderNumber}</Text>
                  <Text style={[styles.customerName, { color: colors.text }]}>{job.customer}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={12} color={colors.accent} fill={colors.accent} />
                    <Text style={[styles.ratingText, { color: colors.accent }]}>{job.customerRating}</Text>
                  </View>
                </View>
                <View style={styles.jobRight}>
                  <Text style={[styles.paymentAmount, { color: colors.success }]}>{job.payment}</Text>
                  <View style={[styles.timeContainer, { backgroundColor: colors.surface }]}>
                    <Clock size={12} color={colors.accent} />
                    <Text style={[styles.timeText, { color: colors.accent }]}>{job.time}</Text>
                  </View>
                </View>
              </View>

              {/* Locations */}
              <View style={styles.locationsContainer}>
                <View style={styles.locationItem}>
                  <View style={[styles.locationDot, { backgroundColor: colors.accent }]} />
                  <Text style={[styles.locationText, { color: colors.text }]}>{job.pickupAddress}</Text>
                </View>
                <View style={[styles.routeLine, { backgroundColor: colors.border }]} />
                <View style={styles.locationItem}>
                  <View style={[styles.locationDot, { backgroundColor: colors.primary }]} />
                  <Text style={[styles.locationText, { color: colors.text }]}>{job.dropAddress}</Text>
                </View>
              </View>

              {/* Package Info */}
              <View style={[styles.packageInfo, { backgroundColor: colors.surface }]}>
                <Package size={16} color={colors.textSecondary} />
                <Text style={[styles.packageText, { color: colors.text }]}>{job.goods}</Text>
                <View style={styles.distanceContainer}>
                  <Navigation size={12} color={colors.textSecondary} />
                  <Text style={[styles.distanceText, { color: colors.textSecondary }]}>{job.distance}</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.viewButton, { backgroundColor: colors.surface, borderColor: colors.primary }]}
                  onPress={() => handleViewJob(job)}
                >
                  <Text style={[styles.viewButtonText, { color: colors.primary }]}>View Details</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.acceptButton}
                  onPress={() => handleQuickAccept(job.id)}
                >
                  <LinearGradient
                    colors={['#f59e0b', '#d97706']}
                    style={styles.acceptButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.acceptButtonText}>Quick Accept</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  jobsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  jobCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    position: 'relative',
  },
  priorityBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingRight: 60,
  },
  jobLeft: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  jobRight: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  locationsContainer: {
    marginBottom: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 16,
    marginLeft: 3,
    marginVertical: 2,
  },
  packageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  packageText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  viewButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  acceptButton: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  acceptButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});