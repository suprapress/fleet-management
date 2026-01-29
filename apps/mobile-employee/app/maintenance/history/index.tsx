import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native';
import { Stack, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

// --- DUMMY DATA ---
const SERVICE_HISTORY = [
    {
        id: 'SRV-2023-1001',
        unitId: 'DT-1042',
        unitType: 'Dump Truck',
        serviceType: 'Service Berkala',
        description: 'Service 250 HM - Ganti Oli Mesin & Filter',
        date: '28 Jan 2026',
        mechanic: 'Budi Santoso',
        status: 'completed'
    },
    {
        id: 'SRV-2023-0988',
        unitId: 'EX-205',
        unitType: 'Excavator',
        serviceType: 'Perbaikan',
        description: 'Penggantian Hose Bucket Cylinder yang bocor',
        date: '26 Jan 2026',
        mechanic: 'Agus Setiawan',
        status: 'completed'
    },
    {
        id: 'SRV-2023-0982',
        unitId: 'LV-05',
        unitType: 'Light Vehicle',
        serviceType: 'Inspeksi',
        description: 'Pengecekan sistem kelistrikan & AC',
        date: '25 Jan 2026',
        mechanic: 'Budi Santoso',
        status: 'completed'
    },
    {
        id: 'SRV-2023-0975',
        unitId: 'DZ-11',
        unitType: 'Dozer',
        serviceType: 'Service Berkala',
        description: 'Service 500 HM - General Checkup & Fluid Changes',
        date: '22 Jan 2026',
        mechanic: 'Rudi Hartono',
        status: 'completed'
    },
    {
        id: 'SRV-2023-0950',
        unitId: 'DT-1043',
        unitType: 'Dump Truck',
        serviceType: 'Perbaikan',
        description: 'Perbaikan lampu belakang kiri pecah',
        date: '20 Jan 2026',
        mechanic: 'Budi Santoso',
        status: 'completed'
    },
];

const FILTER_TYPES = ['Semua', 'Service Berkala', 'Perbaikan', 'Inspeksi'];

export default function ServiceHistoryScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('Semua');

    const filteredHistory = SERVICE_HISTORY.filter(item => {
        const matchesSearch = item.unitId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'Semua' || item.serviceType === selectedType;
        return matchesSearch && matchesType;
    });

    const getServiceIcon = (type: string) => {
        switch (type) {
            case 'Service Berkala': return 'tool';
            case 'Perbaikan': return 'zap';
            case 'Inspeksi': return 'clipboard';
            default: return 'tool';
        }
    };

    const getServiceColor = (type: string) => {
        switch (type) {
            case 'Service Berkala': return '#3B82F6'; // Blue
            case 'Perbaikan': return '#F59E0B'; // Amber
            case 'Inspeksi': return '#10B981'; // Green
            default: return '#64748B';
        }
    };

    const getServiceBg = (type: string) => {
        switch (type) {
            case 'Service Berkala': return '#EFF6FF';
            case 'Perbaikan': return '#FFFBEB';
            case 'Inspeksi': return '#ECFDF5';
            default: return '#F1F5F9';
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
                <Text style={styles.headerTitle}>RIWAYAT SERVIS</Text>
                <View style={{ width: 80 }} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <Feather name="search" size={20} color="#94A3B8" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari Unit ID atau Deskripsi..."
                        placeholderTextColor="#94A3B8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Filter Chips */}
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {FILTER_TYPES.map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[
                                styles.filterChip,
                                selectedType === type && styles.filterChipActive
                            ]}
                            onPress={() => setSelectedType(type)}
                        >
                            <Text style={[
                                styles.filterText,
                                selectedType === type && styles.filterTextActive
                            ]}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* History List */}
            <FlatList
                data={filteredHistory}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.historyCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.unitInfo}>
                                <View style={[styles.iconBox, { backgroundColor: getServiceBg(item.serviceType) }]}>
                                    <Feather name={getServiceIcon(item.serviceType) as any} size={20} color={getServiceColor(item.serviceType)} />
                                </View>
                                <View>
                                    <Text style={styles.unitId}>{item.unitId}</Text>
                                    <Text style={styles.serviceType}>{item.serviceType}</Text>
                                </View>
                            </View>
                            <Text style={styles.dateText}>{item.date}</Text>
                        </View>

                        <Text style={styles.description}>{item.description}</Text>

                        <View style={styles.cardFooter}>
                            <View style={styles.mechanicInfo}>
                                <Feather name="user" size={12} color="#64748B" />
                                <Text style={styles.mechanicName}>{item.mechanic}</Text>
                            </View>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>SELESAI</Text>
                                <Feather name="check" size={12} color="#166534" />
                            </View>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Feather name="clock" size={48} color="#CBD5E1" />
                        <Text style={styles.emptyText}>Belum ada riwayat servis</Text>
                    </View>
                }
            />
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
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: '#0F172A',
    },
    filterContainer: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    filterScroll: {
        paddingHorizontal: 16,
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    filterChipActive: {
        backgroundColor: '#EFF6FF',
        borderColor: '#3B82F6',
    },
    filterText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
    },
    filterTextActive: {
        color: '#3B82F6',
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    historyCard: {
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
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    unitInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unitId: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    serviceType: {
        fontSize: 11,
        color: '#64748B',
    },
    dateText: {
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: '600',
    },
    description: {
        fontSize: 13,
        color: '#334155',
        lineHeight: 20,
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingTop: 12,
    },
    mechanicInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    mechanicName: {
        fontSize: 11,
        color: '#64748B',
        fontWeight: '500',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#166534',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: 16,
        color: '#94A3B8',
        fontSize: 14,
    },
});
