import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

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
                    tabBarIcon: ({ color }) => (
                        <Feather name="grid" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="spareparts"
                options={{
                    title: 'Suku Cadang',
                    tabBarIcon: ({ color }) => (
                        <Feather name="package" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'Riwayat',
                    tabBarIcon: ({ color }) => (
                        <Feather name="clock" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="p2h"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
