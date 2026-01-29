import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';


export default function MaintenanceDashboard() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.logoBox}>
                            <Text style={styles.logoIcon}>🔧</Text>
                        </View>
                        <View>
                            <Text style={styles.brandName}>SUPRAMINE</Text>
                            <Text style={styles.brandTagline}>MAINTENANCE DEPT</Text>
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
                        <View style={styles.avatarPlaceholder}>
                            <View style={styles.avatarGradient} />
                        </View>
                        <View style={styles.onlineIndicator} />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userRole}>Mekanik Senior,</Text>
                        <Text style={styles.userName}>Budi Santoso</Text>
                    </View>
                    <View style={styles.shiftInfo}>
                        <Text style={styles.shiftLabel}>WORKSHOP A</Text>
                        <Text style={styles.shiftTime}>Shift 1</Text>
                    </View>
                </View>

                {/* Breakdown Alert */}
                <TouchableOpacity style={styles.alertCard}>
                    <View style={styles.alertIconBox}>
                        <Text style={styles.alertIcon}>⚠️</Text>
                    </View>
                    <View style={styles.alertContent}>
                        <Text style={styles.alertLabel}>UNIT BREAKDOWN</Text>
                        <Text style={styles.alertValue}>3 Alat Rusak</Text>
                    </View>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>

                {/* Quick Menu */}
                <View style={styles.menuGrid}>
                    <MenuButton icon="📋" label="Daftar P2H" color="#0EA5E9" />
                    <MenuButton icon="🛠️" label="Perbaikan" color="#10B981" />
                    <MenuButton icon="📦" label="Cek Suku Cadang" color="#F59E0B" />
                    <MenuButton icon="🕒" label="Riwayat Servis" color="#8B5CF6" />
                </View>

                {/* Repair Queue */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>ANTRIAN PERBAIKAN</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>LIHAT SEMUA</Text>
                    </TouchableOpacity>
                </View>

                {/* Ticket 1 */}
                <View style={styles.ticketCard}>
                    <View style={styles.ticketHeader}>
                        <View style={styles.unitInfo}>
                            <View style={styles.unitIconBox}>
                                <Text style={styles.unitIcon}>🚛</Text>
                            </View>
                            <View>
                                <Text style={styles.unitCode}>HD-785-01</Text>
                                <Text style={styles.unitModel}>Komatsu Rigid Truck</Text>
                            </View>
                        </View>
                        <View style={[styles.priorityBadge, { backgroundColor: '#FEF3C7' }]}>
                            <Text style={[styles.priorityText, { color: '#B45309' }]}>MEDIUM</Text>
                        </View>
                    </View>

                    <View style={styles.issueBox}>
                        <Text style={styles.issueLabel}>KELUHAN:</Text>
                        <Text style={styles.issueText}>
                            Kebocoran oli pada sistem hidrolik utama. Suhu mesin tidak stabil.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonIcon}>▶</Text>
                        <Text style={styles.actionButtonText}>Mulai Perbaikan</Text>
                    </TouchableOpacity>
                </View>

                {/* Ticket 2 */}
                <View style={styles.ticketCard}>
                    <View style={styles.ticketHeader}>
                        <View style={styles.unitInfo}>
                            <View style={styles.unitIconBox}>
                                <Text style={styles.unitIcon}>🚜</Text>
                            </View>
                            <View>
                                <Text style={styles.unitCode}>DZ-155-04</Text>
                                <Text style={styles.unitModel}>Bulldozer D155A</Text>
                            </View>
                        </View>
                        <View style={[styles.priorityBadge, { backgroundColor: '#FEE2E2' }]}>
                            <Text style={[styles.priorityText, { color: '#B91C1C' }]}>HIGH</Text>
                        </View>
                    </View>

                    <View style={styles.issueBox}>
                        <Text style={styles.issueLabel}>KELUHAN:</Text>
                        <Text style={styles.issueText}>
                            Track link terlepas. Membutuhkan penggantian pin segera.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonIcon}>▶</Text>
                        <Text style={styles.actionButtonText}>Mulai Perbaikan</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

interface MenuButtonProps {
    icon: string;
    label: string;
    color: string;
}

function MenuButton({ icon, label, color }: MenuButtonProps) {
    return (
        <TouchableOpacity style={styles.menuBtn}>
            <View style={[styles.menuBtnIconBox, { backgroundColor: color }]}>
                <Text style={styles.menuBtnIcon}>{icon}</Text>
            </View>
            <Text style={styles.menuBtnLabel}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
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
        letterSpacing: 0.5,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DCFCE7',
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
        backgroundColor: '#22C55E',
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#166534',
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    userAvatar: {
        position: 'relative',
        marginRight: 16,
    },
    avatarPlaceholder: {
        width: 56,
        height: 56,
        borderRadius: 28,
        overflow: 'hidden',
        backgroundColor: '#E2E8F0',
    },
    avatarGradient: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FDE68A', // Amber 200 (Gold-ish)
        // Linear Gradient simulated
    },
    onlineIndicator: {
        width: 14,
        height: 14,
        backgroundColor: '#22C55E',
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#F8FAFC',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    userInfo: {
        flex: 1,
    },
    userRole: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    userName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
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
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF2F2', // Red 50
        borderRadius: 16,
        padding: 16,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#FEE2E2',
    },
    alertIconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FEE2E2', // Red 100
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    alertIcon: {
        fontSize: 24,
    },
    alertContent: {
        flex: 1,
    },
    alertLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#991B1B', // Red 800
        letterSpacing: 1,
        marginBottom: 2,
    },
    alertValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#7F1D1D',
    },
    chevron: {
        fontSize: 24,
        color: '#DC2626',
        fontWeight: '700',
    },
    menuGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    menuBtn: {
        alignItems: 'center',
        width: '23%',
    },
    menuBtnIconBox: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    menuBtnIcon: {
        fontSize: 24,
        color: '#FFFFFF',
    },
    menuBtnLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#0F172A',
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
        fontWeight: '800',
        color: '#64748B',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    seeAllText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#3B82F6',
    },
    ticketCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    ticketHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    unitInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    unitIconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#F1F5F9', // Slate 100
        justifyContent: 'center',
        alignItems: 'center',
    },
    unitIcon: {
        fontSize: 24,
    },
    unitCode: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    unitModel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    priorityBadge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    priorityText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    issueBox: {
        backgroundColor: '#F8FAFC', // Slate 50
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    issueLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    issueText: {
        fontSize: 14,
        color: '#0F172A',
        lineHeight: 20,
    },
    actionButton: {
        backgroundColor: '#1E293B', // Slate 800
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    actionButtonIcon: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
});
