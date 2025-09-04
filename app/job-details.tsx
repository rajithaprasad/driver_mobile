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
  Image,
  Linking,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Clock, User, Phone, Star, Navigation, Package } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  useAnimatedGestureHandler, 
  runOnJS,
  withSpring 
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default function JobDetailsScreen() {
  const params = useLocalSearchParams();
  const [isAccepted, setIsAccepted] = useState(false);
  
  const jobData = {
    id: params.id as string,
    orderNumber: params.orderNumber as string,
    customer: params.customer as string,
    customerPhone: params.customerPhone as string,
    pickupAddress: params.pickupAddress as string,
    dropAddress: params.dropAddress as string,
    time: params.time as string,
    distance: params.distance as string,
    payment: params.payment as string,
    goods: params.goods as string,
    customerRating: parseFloat(params.customerRating as string),
    notes: params.notes as string,
  };

  // Slide to accept animation
  const translateX = useSharedValue(0);
  const SLIDE_THRESHOLD = width * 0.6;

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: (event) => {
      if (event.translationX > 0 && event.translationX < SLIDE_THRESHOLD) {
        translateX.value = event.translationX;
      }
    },
    onEnd: (event) => {
      if (event.translationX > SLIDE_THRESHOLD * 0.7) {
        translateX.value = withSpring(SLIDE_THRESHOLD);
        runOnJS(handleAcceptJob)();
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: translateX.value / SLIDE_THRESHOLD,
  }));

  const handleAcceptJob = () => {
    setIsAccepted(true);
    Alert.alert(
      'Job Accepted!',
      'The job has been added to your schedule.',
      [
        { 
          text: 'OK', 
          onPress: () => {
            router.back();
          }
        }
      ]
    );
  };

  const handleCallCustomer = () => {
    const phoneNumber = jobData.customerPhone.replace(/[^\d+]/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleGetDirections = () => {
    Alert.alert('Get Directions', 'Opening navigation to pickup location...', [
      { text: 'OK' }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#6A0DAD" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Map View with Image */}
        <View style={styles.mapContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2' }}
            style={styles.mapImage}
          />
          
          {/* Map Overlay with Markers */}
          <View style={styles.mapOverlay}>
            <View style={styles.pickupMarker}>
              <View style={styles.markerContainer}>
                <MapPin size={20} color="#FFA500" fill="#FFA500" />
              </View>
              <Text style={styles.markerText}>Pickup</Text>
            </View>
            <View style={styles.dropMarker}>
              <View style={styles.markerContainer}>
                <MapPin size={20} color="#6A0DAD" fill="#6A0DAD" />
              </View>
              <Text style={styles.markerText}>Drop</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.directionsButton} onPress={handleGetDirections}>
            <Navigation size={16} color="#000" />
            <Text style={styles.directionsText}>Get Directions</Text>
          </TouchableOpacity>
        </View>

        {/* Order Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderNumber}>{jobData.orderNumber}</Text>
              <Text style={styles.paymentAmount}>{jobData.payment}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Clock size={16} color="#FFA500" />
              <Text style={styles.timeText}>{jobData.time}</Text>
            </View>
          </View>

          {/* Customer Information */}
          <View style={styles.customerSection}>
            <Text style={styles.sectionTitle}>Customer Details</Text>
            <View style={styles.customerInfo}>
              <View style={styles.customerLeft}>
                <View style={styles.customerAvatar}>
                  <User size={20} color="#fff" />
                </View>
                <View style={styles.customerDetails}>
                  <Text style={styles.customerName}>{jobData.customer}</Text>
                  <TouchableOpacity onPress={handleCallCustomer} style={styles.phoneContainer}>
                    <Phone size={14} color="#4ADE80" />
                    <Text style={styles.phoneNumber}>{jobData.customerPhone}</Text>
                  </TouchableOpacity>
                  <View style={styles.ratingContainer}>
                    <Star size={12} color="#FFA500" fill="#FFA500" />
                    <Text style={styles.ratingText}>{jobData.customerRating}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.callButton} onPress={handleCallCustomer}>
                <Phone size={16} color="#4ADE80" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Goods Information */}
          <View style={styles.goodsSection}>
            <Text style={styles.sectionTitle}>Package Details</Text>
            <View style={styles.goodsInfo}>
              <Package size={20} color="#FFA500" />
              <Text style={styles.goodsText}>{jobData.goods}</Text>
            </View>
          </View>

          {/* Locations */}
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Delivery Route</Text>
            <View style={styles.locationContainer}>
              <View style={styles.locationItem}>
                <View style={styles.locationIcon}>
                  <MapPin size={16} color="#FFA500" />
                </View>
                <View style={styles.locationDetails}>
                  <Text style={styles.locationLabel}>Pickup Location</Text>
                  <Text style={styles.locationAddress}>{jobData.pickupAddress}</Text>
                </View>
              </View>

              <View style={styles.routeLine} />

              <View style={styles.locationItem}>
                <View style={[styles.locationIcon, styles.dropIcon]}>
                  <MapPin size={16} color="#6A0DAD" />
                </View>
                <View style={styles.locationDetails}>
                  <Text style={styles.locationLabel}>Drop Location</Text>
                  <Text style={styles.locationAddress}>{jobData.dropAddress}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Notes */}
          {jobData.notes && (
            <View style={styles.notesSection}>
              <Text style={styles.sectionTitle}>Delivery Notes</Text>
              <View style={styles.notesContainer}>
                <Text style={styles.notesText}>{jobData.notes}</Text>
              </View>
            </View>
          )}

          {/* Distance & Time */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Distance</Text>
              <Text style={styles.summaryValue}>{jobData.distance}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Estimated Time</Text>
              <Text style={styles.summaryValue}>15-20 min</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Slide to Accept */}
      {!isAccepted && (
        <View style={styles.slideContainer}>
          <Animated.View style={[styles.slideBackground, backgroundAnimatedStyle]} />
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.slideButton, animatedStyle]}>
              <LinearGradient
                colors={['#FFA500', '#FF8C00']}
                style={styles.slideButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.slideButtonText}>Accept Job</Text>
              </LinearGradient>
            </Animated.View>
          </PanGestureHandler>
          <Text style={styles.slideText}>Slide to Accept Job →</Text>
        </View>
      )}
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
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: 250,
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 20,
  },
  pickupMarker: {
    position: 'absolute',
    top: 30,
    left: 40,
    alignItems: 'center',
  },
  dropMarker: {
    position: 'absolute',
    bottom: 40,
    right: 50,
    alignItems: 'center',
  },
  markerContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  markerText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  directionsButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FFA500',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  directionsText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  detailsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 120,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderNumber: {
    color: '#FFA500',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  paymentAmount: {
    color: '#4ADE80',
    fontSize: 24,
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timeText: {
    color: '#FFA500',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  customerSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  customerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  customerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6A0DAD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  phoneNumber: {
    color: '#4ADE80',
    fontSize: 14,
    marginLeft: 6,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFA500',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4ADE80',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  goodsSection: {
    marginBottom: 24,
  },
  goodsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  goodsText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  locationSection: {
    marginBottom: 24,
  },
  locationContainer: {
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
    color: '#FFA500',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  locationAddress: {
    color: '#333',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#ddd',
    marginLeft: 15,
    marginVertical: 4,
  },
  notesSection: {
    marginBottom: 24,
  },
  notesContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  notesText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  summaryValue: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slideContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    height: 60,
    backgroundColor: '#f8f9fa',
    borderRadius: 30,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  slideBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#4ADE80',
    borderRadius: 30,
  },
  slideButton: {
    position: 'absolute',
    left: 4,
    width: 120,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
  },
  slideButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  slideText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});