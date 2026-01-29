import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Stack, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

// Dummy data for vehicles
const VEHICLES = [
    { id: 'DT-1042', type: 'Dump Truck', status: 'pending', lastCheck: 'Kemarin' },
    { id: 'DT-1043', type: 'Dump Truck', status: 'done', lastCheck: 'Hari ini, 06:30' },
    { id: 'EX-205', type: 'Excavator', status: 'pending', lastCheck: 'Kemarin' },
    { id: 'LV-05', type: 'Light Vehicle', status: 'pending', lastCheck: 'Kemarin' },
    { id: 'DZ-11', type: 'Dozer', status: 'issue', lastCheck: 'Hari ini, 07:15' },
];

export default function P2HUnitList() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredVehicles = VEHICLES.filter(v =>
        v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'done': return '#22C55E'; // Green
            case 'issue': return '#EF4444'; // Red
            default: return '#94A3B8'; // Gray for pending
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'done': return 'Sudah Diperiksa';
            case 'issue': return 'Perlu Perbaikan';
            default: return 'Belum Diperiksa';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'done': return 'check-circle';
            case 'issue': return 'alert-circle';
            default: return 'circle';
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Feather name="chevron-left" size={24} color="#3B82F6" />
                    <Text style={styles.backText}>Kembali</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>DAFTAR UNIT P2H</Text>
                <View style={{ width: 80 }} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <Feather name="search" size={20} color="#94A3B8" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari Unit ID atau Tipe..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#94A3B8"
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.listContent}>
                <Text style={styles.sectionTitle}>Pilih Unit untuk Pemeriksaan</Text>

                {filteredVehicles.map((vehicle) => (
                    <TouchableOpacity
                        key={vehicle.id}
                        style={styles.vehicleCard}
                        onPress={() => router.push(`/maintenance/p2h/${vehicle.id}`)}
                    >
                        <View style={styles.vehicleIcon}>
                            <Feather name="truck" size={24} color="#334155" />
                        </View>

                        <View style={styles.vehicleInfo}>
                            <Text style={styles.vehicleId}>{vehicle.id}</Text>
                            <Text style={styles.vehicleType}>{vehicle.type}</Text>
                            <Text style={styles.lastCheck}>Terakhir: {vehicle.lastCheck}</Text>
                        </View>

                        <View style={styles.statusContainer}>
                            <Feather name={getStatusIcon(vehicle.status) as any} size={16} color={getStatusColor(vehicle.status)} />
                            <Text style={[styles.statusText, { color: getStatusColor(vehicle.status) }]}>
                                {getStatusText(vehicle.status)}
                            </Text>
                        </View>

                        <Feather name="chevron-right" size={20} color="#CBD5E1" />
                    </TouchableOpacity>
                ))}

                {filteredVehicles.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Unit tidak ditemukan</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        fontSize: 14,
        color: '#3B82F6',
        fontWeight: '600',
        marginLeft: 4,
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: 1,
    },
    searchContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: '#0F172A',
        height: 40,
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
        marginBottom: 12,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    vehicleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    vehicleIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    vehicleInfo: {
        flex: 1,
    },
    vehicleId: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    vehicleType: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 2,
    },
    lastCheck: {
        fontSize: 10,
        color: '#94A3B8',
    },
    statusContainer: {
        alignItems: 'flex-end',
        marginRight: 12,
        gap: 2,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
    },
    emptyState: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: '#94A3B8',
        fontStyle: 'italic',
    },
});
