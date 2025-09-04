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
import { CreditCard, TrendingUp, DollarSign, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';

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
  const { colors } = useTheme();
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Wallet" />

      <ScrollView style={[styles.content, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
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
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.statHeader}>
              <TrendingUp size={20} color={colors.success} />
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Today</Text>
            </View>
            <Text style={[styles.statAmount, { color: colors.text }]}>${todayEarnings.toFixed(2)}</Text>
            <Text style={[styles.statChange, { color: colors.success }]}>+12.5%</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.statHeader}>
              <DollarSign size={20} color={colors.accent} />
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>This Week</Text>
            </View>
            <Text style={[styles.statAmount, { color: colors.text }]}>${weekEarnings.toFixed(2)}</Text>
            <Text style={[styles.statChange, { color: colors.success }]}>+8.3%</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
            <LinearGradient
              colors={['#f59e0b', '#d97706']}
              style={styles.withdrawButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ArrowUpRight size={20} color="#ffffff" />
              <Text style={styles.withdrawButtonText}>Withdraw</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.stripeButton, { backgroundColor: colors.card, borderColor: colors.primary }]} onPress={handleStripeSetup}>
            <CreditCard size={20} color={colors.primary} />
            <Text style={[styles.stripeButtonText, { color: colors.primary }]}>Setup Stripe</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Transactions</Text>
          
          {transactions.map((transaction) => (
            <View key={transaction.id} style={[styles.transactionItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: transaction.type === 'earning' ? colors.success : colors.error }
                ]}>
                  {transaction.type === 'earning' ? (
                    <ArrowDownLeft size={16} color="#fff" />
                  ) : (
                    <ArrowUpRight size={16} color="#fff" />
                  )}
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={[styles.transactionDescription, { color: colors.text }]}>{transaction.description}</Text>
                  <Text style={[styles.transactionDate, { color: colors.textSecondary }]}>
                    {transaction.date} • {transaction.time}
                  </Text>
                </View>
              </View>
              
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? colors.success : colors.error }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </Text>
                <Text style={[
                  styles.transactionStatus,
                  { 
                    color: transaction.status === 'completed' ? colors.success : colors.warning,
                    backgroundColor: transaction.status === 'completed' ? `${colors.success}20` : `${colors.warning}20`
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  balanceCard: {
    borderRadius: 20,
    padding: 24,
    marginVertical: 20,
    elevation: 6,
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
    fontWeight: '500',
    opacity: 0.9,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
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
    fontWeight: '500',
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
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '700',
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
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  stripeButton: {
    flex: 1,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stripeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  transactionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
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
    fontSize: 14,
    fontWeight: '600',
  },
  transactionDate: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  transactionStatus: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
    textTransform: 'uppercase',
  },
});