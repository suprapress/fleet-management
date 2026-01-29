import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function MaintenanceLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: '#F1F5F9', // Slate 100
                    height: 80,
                    paddingBottom: 20,
                    paddingTop: 10,
                },
                tabBarActiveTintColor: '#0F172A', // Slate 900
                tabBarInactiveTintColor: '#94A3B8', // Slate 400
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Beranda',
                    tabBarIcon: ({ focused }) => (
                        <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>⊞</Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ focused }) => (
                        <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>👤</Text>
                    ),
                }}
            />
        </Tabs>
    );
}
