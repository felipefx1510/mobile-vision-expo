import { Redirect, Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { Icon } from '@/components/icon';
import { palette } from '@/constants/design';
import { useAuth } from '@/context/auth-context';

export default function TabsLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.black,
        tabBarInactiveTintColor: '#8A9185',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginTop: 2 },
        tabBarStyle: {
          position: 'absolute',
          height: Platform.OS === 'ios' ? 88 : 72,
          paddingTop: 8,
          borderTopColor: '#E4E9DF',
          backgroundColor: '#FFFFFFF2',
          ...Platform.select({
            web: { boxShadow: '0 -6px 20px rgba(16, 19, 14, 0.06)' },
            default: { elevation: 14 },
          }),
        },
      }}>
      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <Icon name={{ ios: 'house.fill', android: 'home', web: 'home' }} color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="plano"
        options={{
          title: 'Plano',
          tabBarIcon: ({ color }) => <Icon name={{ ios: 'calendar', android: 'calendar_month', web: 'calendar_month' }} color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="simulados"
        options={{
          title: 'Simulados',
          tabBarIcon: ({ color }) => <Icon name={{ ios: 'doc.text.fill', android: 'quiz', web: 'quiz' }} color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Icon name={{ ios: 'person.fill', android: 'person', web: 'person' }} color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}
