import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function MaintenanceProfile() {
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

    const handleLogout = () => {
        setLogoutModalVisible(false);
        // Navigate back to login screen
        router.replace('/');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profil</Text>
                    <TouchableOpacity style={styles.settingsButton}>
                        <Text style={styles.settingsIcon}>⚙️</Text>
                    </TouchableOpacity>
                </View>

                {/* Profile Info */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarPlaceholder}>
                            <View style={styles.avatarGradient} />
                        </View>
                        <View style={styles.statusIndicator} />
                    </View>
                    <Text style={styles.userName}>Budi Santoso</Text>
                    <Text style={styles.userId}>Mechanic ID: #MCH-4401</Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>MEKANIK SENIOR • WORKSHOP A</Text>
                    </View>
                </View>

                {/* Mechanic Stats Summary - Replaces Financial Info */}
                <View style={styles.statsCard}>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>TIKET DISELESAIKAN</Text>
                            <View style={styles.statValueContainer}>
                                <Text style={styles.statIcon}>✅</Text>
                                <Text style={styles.statValue}>142</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>PERFORMA</Text>
                            <View style={styles.statValueContainer}>
                                <Text style={styles.statIcon}>⭐</Text>
                                <Text style={styles.statValue}>4.9/5</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Menu Options */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIconContainer}>
                            <Text style={styles.menuIcon}>🔒</Text>
                        </View>
                        <Text style={styles.menuText}>Ubah Sandi</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIconContainer}>
                            <Text style={styles.menuIcon}>❓</Text>
                        </View>
                        <Text style={styles.menuText}>Bantuan</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutModalVisible(true)}>
                    <Text style={styles.logoutIcon}>↪️</Text>
                    <Text style={styles.logoutText}>Keluar</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Versi Aplikasi 2.4.0 (Build 102)</Text>
            </ScrollView>

            {/* Logout Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isLogoutModalVisible}
                onRequestClose={() => setLogoutModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalIconContainer}>
                            <Text style={styles.modalIcon}>↪️</Text>
                        </View>
                        <Text style={styles.modalTitle}>Konfirmasi Keluar</Text>
                        <Text style={styles.modalMessage}>
                            Apakah Anda yakin ingin keluar dari akun mekanik?
                        </Text>

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.modalButtonPrimary} onPress={handleLogout}>
                                <Text style={styles.modalButtonPrimaryText}>Ya, Keluar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonSecondary} onPress={() => setLogoutModalVisible(false)}>
                                <Text style={styles.modalButtonSecondaryText}>Batal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0F172A',
    },
    settingsButton: {
        padding: 8,
        backgroundColor: '#F1F5F9',
        borderRadius: 50,
    },
    settingsIcon: {
        fontSize: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: '#E2E8F0',
    },
    avatarGradient: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FDE68A', // Amber 200
    },
    statusIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 24,
        height: 24,
        backgroundColor: '#22C55E',
        borderRadius: 12,
        borderWidth: 4,
        borderColor: '#FFFFFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    userId: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 12,
        fontWeight: '500',
    },
    statusBadge: {
        backgroundColor: '#E0F2FE', // Blue 50
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    statusText: {
        color: '#0369A1', // Blue 700
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    statsCard: {
        backgroundColor: '#F8FAFC',
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    separator: {
        width: 1,
        height: 40,
        backgroundColor: '#CBD5E1',
    },
    statLabel: {
        color: '#64748B',
        fontSize: 10,
        fontWeight: '700',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    statValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    statValue: {
        color: '#0F172A',
        fontSize: 20,
        fontWeight: '800',
    },
    menuContainer: {
        marginBottom: 24,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    menuIcon: {
        fontSize: 20,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A',
    },
    chevron: {
        fontSize: 24,
        color: '#94A3B8',
        fontWeight: '300',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF2F2',
        padding: 16,
        borderRadius: 16,
        marginBottom: 32,
    },
    logoutIcon: {
        fontSize: 20,
        marginRight: 12,
        color: '#EF4444',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#EF4444',
    },
    versionText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
        marginBottom: 24,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    modalIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FEF2F2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalIcon: {
        fontSize: 28,
        color: '#EF4444',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    modalActions: {
        width: '100%',
        gap: 12,
    },
    modalButtonPrimary: {
        backgroundColor: '#EF4444',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        width: '100%',
    },
    modalButtonPrimaryText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    modalButtonSecondary: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        width: '100%',
    },
    modalButtonSecondaryText: {
        color: '#0F172A',
        fontSize: 16,
        fontWeight: '700',
    },
});
