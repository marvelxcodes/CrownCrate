import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarBackground: TabBarBackground,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon size={28} name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="devices"
        options={{
          title: 'Devices',
          tabBarIcon: ({ color }) => <Icon size={28} name='laptop-outline' color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Icon size={28} name="cog-outline" color={color} />
        }}
      />
    </Tabs>
  );
}
