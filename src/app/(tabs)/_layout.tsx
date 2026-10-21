import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Text, type ColorValue } from 'react-native';

import { stackScreenOptions } from '@/theme/navigation';
import { tokens } from '@/theme/tokens';

const tabIcons = {
  Home: 'home-outline',
  'What We Do': 'grid-outline',
  'Get Involved': 'people-outline',
  More: 'menu-outline',
} as const;

function TabIcon({ color, label }: { color: ColorValue; label: keyof typeof tabIcons }) {
  return <Ionicons color={typeof color === 'string' ? color : tokens.color.primary} name={tabIcons[label]} size={24} />;
}

function TabLabel({ color, label }: { color: ColorValue; label: string }) {
  return (
    <Text
      style={{
        color,
        flexShrink: 1,
        fontFamily: tokens.font.family.body,
        fontSize: tokens.font.size.body,
        lineHeight: tokens.font.lineHeight.body,
        maxWidth: '100%',
        textAlign: 'center',
        width: '100%',
      }}
      numberOfLines={2}>
      {label}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        ...stackScreenOptions,
        sceneStyle: { flex: 1, maxWidth: '100%', minWidth: 0, width: '100%' },
        tabBarActiveTintColor: tokens.color.primary,
        tabBarInactiveTintColor: tokens.color.textMuted,
        tabBarItemStyle: {
          flex: 1,
          minWidth: 0,
          paddingHorizontal: 0,
        },
        tabBarStyle: {
          alignSelf: 'center',
          backgroundColor: tokens.color.surface,
          maxWidth: tokens.layout.maxWidth,
          minHeight: tokens.tapTarget + tokens.font.lineHeight.body * 2,
          width: '100%',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon color={color} label="Home" />,
          tabBarItemStyle: { flex: 0.8, minWidth: 0, paddingHorizontal: 0 },
          tabBarLabel: ({ color }) => <TabLabel color={color} label="Home" />,
          tabBarAccessibilityLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="what-we-do"
        options={{
          headerShown: false,
          title: 'What We Do',
          tabBarIcon: ({ color }) => <TabIcon color={color} label="What We Do" />,
          tabBarItemStyle: { flex: 1.25, minWidth: 0, paddingHorizontal: 0 },
          tabBarLabel: ({ color }) => <TabLabel color={color} label="What We Do" />,
          tabBarAccessibilityLabel: 'What We Do',
        }}
      />
      <Tabs.Screen name="visit" options={{ headerShown: false, title: 'Visit', tabBarIcon: ({ color }) => <Ionicons color={color} name="location-outline" size={24} />, tabBarLabel: ({ color }) => <TabLabel color={color} label="Visit" /> }} />
      <Tabs.Screen
        name="get-involved"
        options={{
          headerShown: false,
          title: 'Get Involved',
          tabBarIcon: ({ color }) => <TabIcon color={color} label="Get Involved" />,
          tabBarItemStyle: { flex: 1.35, minWidth: 0, paddingHorizontal: 0 },
          tabBarLabel: ({ color }) => <TabLabel color={color} label="Get Involved" />,
          tabBarAccessibilityLabel: 'Get Involved',
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          headerShown: false,
          title: 'More',
          tabBarIcon: ({ color }) => <TabIcon color={color} label="More" />,
          tabBarItemStyle: { flex: 0.75, minWidth: 0, paddingHorizontal: 0 },
          tabBarLabel: ({ color }) => <TabLabel color={color} label="More" />,
          tabBarAccessibilityLabel: 'More',
        }}
      />
      <Tabs.Screen name="programs" options={{ headerShown: false, href: null }} />
      <Tabs.Screen name="events" options={{ headerShown: false, href: null }} />
    </Tabs>
  );
}
