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
import { router } from 'expo-router';
import { ArrowLeft, FileText, Download, Upload, Eye, Calendar, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Clock, Truck, Bell } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const mockDocuments = [
  {
    id: '1',
    name: 'Driver License',
    type: 'license',
    status: 'verified',
    uploadDate: '2024-01-10',
    expiryDate: '2025-12-15',
    size: '2.4 MB',
  },
  {
    id: '2',
    name: 'Vehicle Registration',
    type: 'registration',
    status: 'verified',
    uploadDate: '2024-01-10',
    expiryDate: '2024-08-20',
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'Insurance Certificate',
    type: 'insurance',
    status: 'pending',
    uploadDate: '2024-01-14',
    expiryDate: '2024-12-31',
    size: '3.1 MB',
  },
  {
    id: '4',
    name: 'Background Check',
    type: 'background',
    status: 'verified',
    uploadDate: '2024-01-08',
    expiryDate: '2025-01-08',
    size: '1.2 MB',
  },
  {
    id: '5',
    name: 'Vehicle Inspection',
    type: 'inspection',
    status: 'expired',
    uploadDate: '2023-12-01',
    expiryDate: '2024-01-01',
    size: '2.7 MB',
  },
];

export default function DocumentsScreen() {
  const [documents] = useState(mockDocuments);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle size={16} color="#4ADE80" />;
      case 'pending':
        return <Clock size={16} color="#FFA500" />;
      case 'expired':
        return <AlertCircle size={16} color="#FF6B6B" />;
      default:
        return <FileText size={16} color="#666" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return '#4ADE80';
      case 'pending':
        return '#FFA500';
      case 'expired':
        return '#FF6B6B';
      default:
        return '#666';
    }
  };

  const handleUpload = () => {
    Alert.alert('Upload Document', 'Document upload functionality would be implemented here.');
  };

  const handleView = (docName: string) => {
    Alert.alert('View Document', `Opening ${docName}...`);
  };

  const handleDownload = (docName: string) => {
    Alert.alert('Download Document', `Downloading ${docName}...`);
  };

  const openNotifications = () => {
    router.push('/notifications');
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
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
        <Text style={styles.pageTitle}>Document Management</Text>
        <Text style={styles.pageSubtitle}>Manage your driver documents and certifications</Text>
      </View>

      {/* Upload Button */}
      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <LinearGradient
            colors={['#FFA500', '#FF8C00']}
            style={styles.uploadButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Upload size={20} color="#000" />
            <Text style={styles.uploadButtonText}>Upload New Document</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Documents List */}
        {documents.map((document) => (
          <View key={document.id} style={[
            styles.documentCard,
            document.status === 'expired' && styles.expiredCard,
            isExpiringSoon(document.expiryDate) && styles.expiringSoonCard
          ]}>
            <View style={styles.documentHeader}>
              <View style={styles.documentLeft}>
                <View style={[
                  styles.documentIcon,
                  { backgroundColor: `${getStatusColor(document.status)}20` }
                ]}>
                  <FileText size={24} color={getStatusColor(document.status)} />
                </View>
                <View style={styles.documentInfo}>
                  <Text style={styles.documentName}>{document.name}</Text>
                  <Text style={styles.documentSize}>{document.size}</Text>
                </View>
              </View>
              
              <View style={styles.statusContainer}>
                {getStatusIcon(document.status)}
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(document.status) }
                ]}>
                  {document.status}
                </Text>
              </View>
            </View>

            <View style={styles.documentDetails}>
              <View style={styles.dateContainer}>
                <View style={styles.dateItem}>
                  <Text style={styles.dateLabel}>Uploaded</Text>
                  <Text style={styles.dateValue}>{document.uploadDate}</Text>
                </View>
                <View style={styles.dateItem}>
                  <Text style={styles.dateLabel}>Expires</Text>
                  <Text style={[
                    styles.dateValue,
                    isExpiringSoon(document.expiryDate) && styles.expiringDate,
                    document.status === 'expired' && styles.expiredDate
                  ]}>
                    {document.expiryDate}
                  </Text>
                </View>
              </View>

              {isExpiringSoon(document.expiryDate) && (
                <View style={styles.warningBanner}>
                  <AlertCircle size={16} color="#FFA500" />
                  <Text style={styles.warningText}>Expires in {Math.ceil((new Date(document.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</Text>
                </View>
              )}

              {document.status === 'expired' && (
                <View style={styles.expiredBanner}>
                  <AlertCircle size={16} color="#FF6B6B" />
                  <Text style={styles.expiredText}>Document has expired - please upload a new version</Text>
                </View>
              )}
            </View>

            <View style={styles.documentActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleView(document.name)}
              >
                <Eye size={16} color="#6A0DAD" />
                <Text style={styles.actionButtonText}>View</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleDownload(document.name)}
              >
                <Download size={16} color="#6A0DAD" />
                <Text style={styles.actionButtonText}>Download</Text>
              </TouchableOpacity>
              
              {(document.status === 'expired' || isExpiringSoon(document.expiryDate)) && (
                <TouchableOpacity 
                  style={styles.updateButton}
                  onPress={handleUpload}
                >
                  <Upload size={16} color="#000" />
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {/* Document Requirements */}
        <View style={styles.requirementsCard}>
          <Text style={styles.requirementsTitle}>Required Documents</Text>
          <Text style={styles.requirementsText}>
            All drivers must maintain current versions of the following documents:
          </Text>
          
          <View style={styles.requirementsList}>
            <Text style={styles.requirementItem}>• Valid Driver's License</Text>
            <Text style={styles.requirementItem}>• Vehicle Registration</Text>
            <Text style={styles.requirementItem}>• Insurance Certificate</Text>
            <Text style={styles.requirementItem}>• Background Check</Text>
            <Text style={styles.requirementItem}>• Vehicle Inspection Report</Text>
          </View>
          
          <Text style={styles.requirementsNote}>
            Documents must be renewed before expiry to maintain active driver status.
          </Text>
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
  uploadContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  uploadButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  uploadButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  uploadButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  documentCard: {
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
  expiredCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
    backgroundColor: '#fff5f5',
  },
  expiringSoonCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFA500',
    backgroundColor: '#fffbf0',
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  documentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  documentSize: {
    color: '#666',
    fontSize: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  documentDetails: {
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 2,
  },
  dateValue: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  expiringDate: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  expiredDate: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA50020',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  warningText: {
    color: '#FFA500',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  expiredBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B20',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  expiredText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  documentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6A0DAD',
  },
  actionButtonText: {
    color: '#6A0DAD',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  updateButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    borderRadius: 8,
  },
  updateButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  requirementsCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  requirementsTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  requirementsText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  requirementsList: {
    marginBottom: 16,
  },
  requirementItem: {
    color: '#333',
    fontSize: 14,
    lineHeight: 24,
  },
  requirementsNote: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 18,
  },
});