import { Tabs } from 'expo-router';
import { Chrome as Home, Wallet, MessageCircle, User } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: 0,
            paddingTop: 16,
            paddingBottom: 20,
            paddingHorizontal: 16,
            height: 90,
            elevation: 0,
            shadowOpacity: 0,
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            borderRadius: 24,
            marginHorizontal: 0,
          },
          tabBarActiveTintColor: '#f59e0b',
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '700',
            marginTop: 6,
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color, focused }) => (
              <View style={[
                styles.iconContainer,
                {
                  backgroundColor: focused ? '#f59e0b' : 'transparent',
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }
              ]}>
                <Home size={focused ? 26 : size} color={focused ? '#ffffff' : color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: 'Wallet',
            tabBarIcon: ({ size, color, focused }) => (
              <View style={[
                styles.iconContainer,
                {
                  backgroundColor: focused ? '#f59e0b' : 'transparent',
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }
              ]}>
                <Wallet size={focused ? 26 : size} color={focused ? '#ffffff' : color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            tabBarIcon: ({ size, color, focused }) => (
              <View style={[
                styles.iconContainer,
                {
                  backgroundColor: focused ? '#f59e0b' : 'transparent',
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }
              ]}>
                <MessageCircle size={focused ? 26 : size} color={focused ? '#ffffff' : color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile" 
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color, focused }) => (
              <View style={[
                styles.iconContainer,
                {
                  backgroundColor: focused ? '#f59e0b' : 'transparent',
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }
              ]}>
                <User size={focused ? 26 : size} color={focused ? '#ffffff' : color} />
              </View>
            ),
          }}
        />
      </Tabs>
      
      {/* Tab Bar Background */}
      <View style={[styles.tabBarBackground, { backgroundColor: colors.card, borderColor: colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabBarBackground: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    height: 90,
    borderRadius: 24,
    borderWidth: 1,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
});