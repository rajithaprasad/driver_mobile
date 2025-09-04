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
import { CreditCard, TrendingUp, DollarSign, ArrowUpRight, ArrowDownLeft, Clock, Bell, Truck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const mockTransactions = [
  {
    id: '1',
    type: 'earning',
    amount: 25.50,
    description: 'Delivery #ORD-2024-001',
    date: '2024-01-15',
    time: '2:30 PM',
    status: 'completed'
  },
  {
    id: '2',
    type: 'earning',
    amount: 18.75,
    description: 'Delivery #ORD-2024-002',
    date: '2024-01-15',
    time: '4:15 PM',
    status: 'completed'
  },
  {
    id: '3',
    type: 'withdraw',
    amount: -200.00,
    description: 'Bank Transfer',
    date: '2024-01-14',
    time: '10:00 AM',
    status: 'completed'
  },
  {
    id: '4',
    type: 'earning',
    amount: 32.25,
    description: 'Delivery #ORD-2024-003',
    date: '2024-01-14',
    time: '6:00 PM',
    status: 'pending'
  },
];

export default function WalletScreen() {
  const [balance] = useState(1247.89);
  const [todayEarnings] = useState(76.50);
  const [weekEarnings] = useState(342.75);
  const [transactions] = useState(mockTransactions);

  const handleWithdraw = () => {
    Alert.alert(
      'Withdraw Funds',
      'Stripe integration would be implemented here for secure withdrawals.',
      [{ text: 'OK' }]
    );
  };

  const handleStripeSetup = () => {
    Alert.alert(
      'Stripe Integration',
      'This would connect to Stripe for payment processing and withdrawals.',
      [{ text: 'OK' }]
    );
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
        {/* Balance Card */}
        <LinearGradient
          colors={['#6A0DAD', '#8A2BE2']}
          style={styles.balanceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <CreditCard size={24} color="#fff" />
          </View>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
          <View style={styles.balanceFooter}>
            <Text style={styles.balanceFooterText}>Driver Earnings Wallet</Text>
            <View style={styles.cardChip} />
          </View>
        </LinearGradient>

        {/* Earnings Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <TrendingUp size={20} color="#4ADE80" />
              <Text style={styles.statLabel}>Today</Text>
            </View>
            <Text style={styles.statAmount}>${todayEarnings.toFixed(2)}</Text>
            <Text style={styles.statChange}>+12.5%</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <DollarSign size={20} color="#FFA500" />
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            <Text style={styles.statAmount}>${weekEarnings.toFixed(2)}</Text>
            <Text style={styles.statChange}>+8.3%</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
            <LinearGradient
              colors={['#FFA500', '#FF8C00']}
              style={styles.withdrawButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ArrowUpRight size={20} color="#000" />
              <Text style={styles.withdrawButtonText}>Withdraw</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.stripeButton} onPress={handleStripeSetup}>
            <CreditCard size={20} color="#6A0DAD" />
            <Text style={styles.stripeButtonText}>Setup Stripe</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: transaction.type === 'earning' ? '#4ADE80' : '#FF6B6B' }
                ]}>
                  {transaction.type === 'earning' ? (
                    <ArrowDownLeft size={16} color="#fff" />
                  ) : (
                    <ArrowUpRight size={16} color="#fff" />
                  )}
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionDate}>
                    {transaction.date} • {transaction.time}
                  </Text>
                </View>
              </View>
              
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? '#4ADE80' : '#FF6B6B' }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </Text>
                <Text style={[
                  styles.transactionStatus,
                  { 
                    color: transaction.status === 'completed' ? '#4ADE80' : '#FFA500',
                    backgroundColor: transaction.status === 'completed' ? '#4ADE8020' : '#FFA50020'
                  }
                ]}>
                  {transaction.status}
                </Text>
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
    paddingHorizontal: 20,
  },
  balanceCard: {
    borderRadius: 20,
    padding: 24,
    marginVertical: 20,
    elevation: 8,
    shadowColor: '#6A0DAD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceFooterText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  cardChip: {
    width: 30,
    height: 20,
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    color: '#666',
    fontSize: 14,
    marginLeft: 8,
  },
  statAmount: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statChange: {
    color: '#4ADE80',
    fontSize: 12,
    fontWeight: '600',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  withdrawButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  withdrawButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  withdrawButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  stripeButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#6A0DAD',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stripeButtonText: {
    color: '#6A0DAD',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  transactionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  transactionDate: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionStatus: {
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
    textTransform: 'uppercase',
  },
});