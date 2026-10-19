import { Tabs } from 'expo-router';
import { Text, type ColorValue } from 'react-native';

import { stackScreenOptions } from '@/theme/navigation';
import { tokens } from '@/theme/tokens';

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
      }}>
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
          paddingHorizontal: 2,
        },
        tabBarStyle: {
          backgroundColor: tokens.color.surface,
          minHeight: tokens.tapTarget + tokens.font.lineHeight.body * 2,
          width: '100%',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: ({ color }) => <TabLabel color={color} label="Home" />,
          tabBarAccessibilityLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="programs"
        options={{
          headerShown: false,
          title: 'Programs',
          tabBarLabel: ({ color }) => <TabLabel color={color} label="Programs" />,
          tabBarAccessibilityLabel: 'Programs',
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          headerShown: false,
          title: 'Events',
          tabBarLabel: ({ color }) => <TabLabel color={color} label="Events" />,
          tabBarAccessibilityLabel: 'Events',
        }}
      />
      <Tabs.Screen
        name="get-involved"
        options={{
          headerShown: false,
          title: 'Get Involved',
          tabBarLabel: ({ color }) => <TabLabel color={color} label="Get Involved" />,
          tabBarAccessibilityLabel: 'Get Involved',
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          headerShown: false,
          title: 'More',
          tabBarLabel: ({ color }) => <TabLabel color={color} label="More" />,
          tabBarAccessibilityLabel: 'More',
        }}
      />
    </Tabs>
  );
}
