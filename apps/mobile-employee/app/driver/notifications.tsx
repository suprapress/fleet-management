import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Stack } from 'expo-router';

// Example Notification Data
const NOTIFICATIONS = [
    {
        id: '1',
        title: 'Pembayaran Insentif',
        message: 'Insentif bulan Desember telah ditransfer ke rekening Anda sebesar Rp 12.450.000.',
        time: 'Baru saja',
        type: 'finance',
        icon: '💰',
        isUnread: true,
    },
    {
        id: '2',
        title: 'Jadwal Maintenance Unit',
        message: 'Unit DT-4029 dijadwalkan untuk maintenance rutin pada tanggal 20 Jan 2026.',
        time: '2 jam yang lalu',
        type: 'system',
        icon: '🔧',
        isUnread: true,
    },
    {
        id: '3',
        title: 'Tugas Baru: Ritase',
        message: 'Anda mendapatkan tugas ritase baru ke Pit B-02. Segera konfirmasi keberangkatan.',
        time: '5 jam yang lalu',
        type: 'task',
        icon: '🚛',
        isUnread: false,
    },
    {
        id: '4',
        title: 'Peringatan Cuaca',
        message: 'Hati-hati, diprediksi hujan lebat di area tambang sore ini. Jaga jarak aman.',
        time: '1 hari yang lalu',
        type: 'alert',
        icon: '⛈️',
        isUnread: false,
    },
    {
        id: '5',
        title: 'Update Aplikasi v2.4.0',
        message: 'Versi terbaru aplikasi kini tersedia dengan fitur perbaikan bug GPS.',
        time: '2 hari yang lalu',
        type: 'info',
        icon: '📱',
        isUnread: false,
    },
];

interface NotificationItem {
    id: string;
    title: string;
    message: string;
    time: string;
    type: string;
    icon: string;
    isUnread: boolean;
}

export default function DriverNotifications() {
    const renderItem = ({ item }: { item: NotificationItem }) => (
        <TouchableOpacity style={[styles.card, item.isUnread && styles.cardUnread]}>
            <View style={[styles.iconBox, getIconStyle(item.type)]}>
                <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={[styles.title, item.isUnread && styles.titleUnread]}>{item.title}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
            </View>
            {item.isUnread && <View style={styles.unreadDot} />}
        </TouchableOpacity>
    );

    const getIconStyle = (type: string) => {
        switch (type) {
            case 'finance': return styles.iconFinance;
            case 'system': return styles.iconSystem;
            case 'task': return styles.iconTask;
            case 'alert': return styles.iconAlert;
            default: return styles.iconInfo;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Notifikasi</Text>
                    <TouchableOpacity>
                        <Text style={styles.markAllRead}>Tandai semua dibaca</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={NOTIFICATIONS}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Tidak ada notifikasi saat ini</Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0F172A',
    },
    markAllRead: {
        fontSize: 12,
        fontWeight: '600',
        color: '#3B82F6',
    },
    listContent: {
        padding: 24,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        // Shadow
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardUnread: {
        backgroundColor: '#F0F9FF', // Light Blue Hint
        borderColor: '#E0F2FE',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconFinance: { backgroundColor: '#DCFCE7' }, // Green 50
    iconSystem: { backgroundColor: '#F1F5F9' }, // Slate 100
    iconTask: { backgroundColor: '#DBEAFE' }, // Blue 50
    iconAlert: { backgroundColor: '#FEF2F2' }, // Red 50
    iconInfo: { backgroundColor: '#F3F4F6' }, // Gray 50
    icon: {
        fontSize: 20,
    },
    content: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#334155',
        flex: 1,
        marginRight: 8,
    },
    titleUnread: {
        color: '#0F172A',
    },
    time: {
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: '500',
    },
    message: {
        fontSize: 12,
        color: '#64748B',
        lineHeight: 18,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3B82F6',
        position: 'absolute',
        top: 16,
        right: 16,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingTop: 48,
    },
    emptyText: {
        color: '#94A3B8',
        fontSize: 14,
    }
});
