import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Stack, router } from 'expo-router';

export default function DriverDashboard() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.logoBox}>
                            <Text style={styles.logoIcon}>🛒</Text>
                        </View>
                        <View>
                            <Text style={styles.brandName}>SUPRAMINE</Text>
                            <Text style={styles.brandTagline}>FLEET MANAGEMENT</Text>
                        </View>
                    </View>
                    <View style={styles.statusBadge}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>ONLINE</Text>
                    </View>
                </View>

                {/* User Card */}
                <View style={styles.userCard}>
                    <View style={styles.userAvatar}>
                        <Text style={styles.userAvatarText}>JD</Text>
                        <View style={styles.onlineIndicator} />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.greeting}>Selamat Bekerja,</Text>
                        <Text style={styles.userName}>John Doe</Text>
                        <Text style={styles.userId}>ID: DRV-88291</Text>
                    </View>
                    <View style={styles.shiftInfo}>
                        <Text style={styles.shiftLabel}>SHIFT PAGI</Text>
                        <Text style={styles.shiftTime}>06:42 AM</Text>
                    </View>
                </View>

                {/* Main Action Button */}
                <TouchableOpacity
                    style={styles.startTripButton}
                    onPress={() => router.push('/driver/ritase/create')}
                >
                    <View>
                        <Text style={styles.startTripTitle}>Mulai Ritase Baru</Text>
                        <Text style={styles.startTripSubtitle}>Tekan untuk pengangkutan baru</Text>
                    </View>
                    <View style={styles.plusIconCircle}>
                        <Text style={styles.plusIcon}>+</Text>
                    </View>
                </TouchableOpacity>

                {/* Quick Menu */}
                <View style={styles.menuGrid}>
                    <MenuItem icon="👆" label="Absensi" color="#EFF6FF" iconColor="#3B82F6" />
                    <MenuItem
                        icon="🚛"
                        label="Ritase"
                        color="#F0FDF4"
                        iconColor="#22C55E"
                        onPress={() => router.push('/driver/tasks')}
                    />
                    <MenuItem icon="⛽" label="Bahan Bakar" color="#FFF7ED" iconColor="#F97316" />
                    <MenuItem icon="⚠️" label="Lapor Kerusakan" color="#FEF2F2" iconColor="#EF4444" />
                    <MenuItem icon="🔍" label="Riwayat" color="#FAF5FF" iconColor="#A855F7" />
                    <MenuItem icon="🎧" label="Bantuan" color="#ECFEFF" iconColor="#06B6D4" />
                </View>

                {/* Active Trip Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>TRIP AKTIF</Text>
                    <View style={styles.processBadge}>
                        <Text style={styles.processText}>DALAM PROSES</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.tripCard} onPress={() => router.push('/driver/tasks')}>
                    {/* Step 1: Loading */}
                    <View style={styles.stepItem}>
                        <View style={[styles.stepIcon, styles.stepIconDone]}>
                            <Text style={styles.checkIcon}>✓</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <View style={styles.stepHeader}>
                                <Text style={styles.stepTitle}>Loading</Text>
                                <View style={styles.stepBadgeDone}>
                                    <Text style={styles.stepBadgeTextDone}>Selesai</Text>
                                </View>
                            </View>
                            <Text style={styles.stepSubtitle}>PIT A-01 • 08:30 AM</Text>
                        </View>
                    </View>

                    {/* Connector Line */}
                    <View style={styles.stepConnector} />

                    {/* Step 2: Hauling */}
                    <View style={styles.stepItem}>
                        <View style={[styles.stepIcon, styles.stepIconActive]}>
                            <View style={styles.stepIconInner} />
                        </View>
                        <View style={styles.stepContent}>
                            <View style={styles.stepHeader}>
                                <Text style={styles.stepTitle}>Hauling (Perjalanan)</Text>
                                <Text style={styles.stepPercent}>45%</Text>
                            </View>
                            <Text style={styles.stepSubtitle}>TUJUAN: CPP MAIN</Text>

                            {/* Progress Bar */}
                            <View style={styles.progressBarBg}>
                                <View style={[styles.progressBarFill, { width: '45%' }]} />
                            </View>

                            {/* Action Button */}
                            <TouchableOpacity style={styles.cameraButton}>
                                <Text style={styles.cameraIcon}>📷</Text>
                                <Text style={styles.cameraButtonText}>Ambil Foto Timbangan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Connector Line */}
                    <View style={styles.stepConnector} />

                    {/* Step 3: Dumping */}
                    <View style={styles.stepItem}>
                        <View style={[styles.stepIcon, styles.stepIconPending]}>
                            <Text style={styles.dotsIcon}>•••</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <View style={styles.stepHeader}>
                                <Text style={[styles.stepTitle, styles.textMuted]}>Dumping</Text>
                                <Text style={styles.stepPercent}>0%</Text>
                            </View>
                            <Text style={styles.stepSubtitle}>BELUM TERSEDIA</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Bottom padding for tabs */}
                <View style={{ height: 20 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

interface MenuItemProps {
    icon: string;
    label: string;
    color: string;
    iconColor: string;
    onPress?: () => void;
}

function MenuItem({ icon, label, color, iconColor, onPress }: MenuItemProps) {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={[styles.menuIconBox, { backgroundColor: color }]}>
                <Text style={[styles.menuIcon, { color: iconColor }]}>{icon}</Text>
            </View>
            <Text style={styles.menuLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC', // Slate 50
    },
    scrollContent: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoBox: {
        width: 40,
        height: 40,
        backgroundColor: '#0F172A',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoIcon: {
        fontSize: 20,
    },
    brandName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    brandTagline: {
        fontSize: 10,
        fontWeight: '600',
        color: '#64748B',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DCFCE7', // Green 50
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#bbf7d0',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22C55E', // Green 500
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#166534', // Green 800
    },
    userCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 24,
    },
    userAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#334155',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginRight: 16,
    },
    userAvatarText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 20,
    },
    onlineIndicator: {
        width: 14,
        height: 14,
        backgroundColor: '#22C55E',
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    userInfo: {
        flex: 1,
    },
    greeting: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 2,
    },
    userName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    userId: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '600',
    },
    shiftInfo: {
        alignItems: 'flex-end',
    },
    shiftLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
        textTransform: 'uppercase',
    },
    shiftTime: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    startTripButton: {
        backgroundColor: '#1E293B', // Slate 800
        borderRadius: 20,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 6,
    },
    startTripTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
    },
    startTripSubtitle: {
        color: '#94A3B8',
        fontSize: 12,
    },
    plusIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusIcon: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '600',
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // gap: 12, 
        rowGap: 16,
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    menuItem: {
        width: '30%', // roughly 3 columns
        alignItems: 'center',
    },
    menuIconBox: {
        width: 56,
        height: 56,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    menuIcon: {
        fontSize: 22,
    },
    menuLabel: {
        fontSize: 10,
        color: '#1E293B',
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 14,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    processBadge: {
        backgroundColor: '#FFFBEB',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FEF3C7',
    },
    processText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#D97706',
    },
    tripCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    stepItem: {
        flexDirection: 'row',
        gap: 16,
    },
    stepConnector: {
        width: 2,
        height: 24,
        backgroundColor: '#E2E8F0',
        marginLeft: 15, // Aligned with icon center (32/2 - 1)
        marginVertical: 4,
    },
    stepIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    stepIconDone: {
        backgroundColor: '#22C55E',
    },
    checkIcon: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '800',
    },
    stepIconActive: {
        backgroundColor: '#FFF',
        borderWidth: 4,
        borderColor: '#EAB308', // Amber 500
    },
    stepIconInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#EAB308',
    },
    stepIconPending: {
        backgroundColor: '#F1F5F9',
    },
    dotsIcon: {
        color: '#CBD5E1',
        fontWeight: '800',
        fontSize: 12,
    },
    stepContent: {
        flex: 1,
        paddingBottom: 4,
    },
    stepHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    stepTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    stepBadgeDone: {
        backgroundColor: '#DCFCE7',
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    stepBadgeTextDone: {
        fontSize: 10,
        fontWeight: '700',
        color: '#166534',
    },
    stepSubtitle: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 8,
        fontWeight: '500',
    },
    stepPercent: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#F1F5F9',
        borderRadius: 3,
        marginBottom: 16,
        marginTop: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#0F172A',
        borderRadius: 3,
    },
    cameraButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 12,
        gap: 8,
    },
    cameraIcon: {
        fontSize: 16,
    },
    cameraButtonText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1E293B',
    },
    textMuted: {
        color: '#94A3B8',
    },
});
