import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native';
import { Stack, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

// --- DUMMY DATA ---
const SPARE_PARTS = [
    { id: '1', name: 'Filter Oli (Oil Filter)', partNumber: 'lf-9009', category: 'Mesin', stock: 15, unit: 'pcs', status: 'normal' },
    { id: '2', name: 'Filter Udara (Air Filter)', partNumber: 'af-2525', category: 'Mesin', stock: 3, unit: 'pcs', status: 'low' },
    { id: '3', name: 'Brake Pad Set', partNumber: 'bp-888', category: 'Kaki-kaki', stock: 8, unit: 'set', status: 'normal' },
    { id: '4', name: 'Hydraulic Oil 20L', partNumber: 'ho-20l', category: 'Fluida', stock: 0, unit: 'pail', status: 'critical' },
    { id: '5', name: 'Headlamp Bulb H4', partNumber: 'hl-h4', category: 'Elektrikal', stock: 24, unit: 'pcs', status: 'normal' },
    { id: '6', name: 'V-Belt Main', partNumber: 'vb-101', category: 'Mesin', stock: 5, unit: 'pcs', status: 'low' },
    { id: '7', name: 'Baut Roda (Wheel Nut)', partNumber: 'wn-22', category: 'Kaki-kaki', stock: 50, unit: 'pcs', status: 'normal' },
    { id: '8', name: 'Grease Lithium EP2', partNumber: 'gr-ep2', category: 'Fluida', stock: 10, unit: 'tube', status: 'normal' },
];

const CATEGORIES = ['Semua', 'Mesin', 'Kaki-kaki', 'Elektrikal', 'Fluida'];

export default function SparePartsCheck() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    const filteredParts = SPARE_PARTS.filter(part => {
        const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            part.partNumber.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'Semua' || part.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'normal': return '#10B981'; // Green
            case 'low': return '#F59E0B'; // Amber
            case 'critical': return '#EF4444'; // Red
            default: return '#64748B';
        }
    };

    const getStatusBadgeBg = (status: string) => {
        switch (status) {
            case 'normal': return '#ECFDF5';
            case 'low': return '#FFFBEB';
            case 'critical': return '#FEF2F2';
            default: return '#F1F5F9';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'normal': return 'Tersedia';
            case 'low': return 'Menipis';
            case 'critical': return 'Habis';
            default: return 'Unknown';
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
                <Text style={styles.headerTitle}>CEK SUKU CADANG</Text>
                <View style={{ width: 80 }} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <Feather name="search" size={20} color="#94A3B8" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari Nama Part atau Nomor..."
                        placeholderTextColor="#94A3B8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Category Filter */}
            <View style={styles.categoryContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryChip,
                                selectedCategory === cat && styles.categoryChipActive
                            ]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === cat && styles.categoryTextActive
                            ]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Parts List */}
            <FlatList
                data={filteredParts}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.partCard}>
                        <View style={styles.partIconBox}>
                            <Feather name="box" size={24} color="#334155" />
                        </View>

                        <View style={styles.partInfo}>
                            <Text style={styles.partName}>{item.name}</Text>
                            <Text style={styles.partNumber}>PN: {item.partNumber}</Text>
                            <Text style={styles.partCategory}>{item.category}</Text>
                        </View>

                        <View style={styles.stockInfo}>
                            <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeBg(item.status) }]}>
                                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                                    {getStatusText(item.status)}
                                </Text>
                            </View>
                            <Text style={styles.stockCount}>
                                {item.stock} <Text style={styles.stockUnit}>{item.unit}</Text>
                            </Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Feather name="inbox" size={48} color="#CBD5E1" />
                        <Text style={styles.emptyText}>Suku cadang tidak ditemukan</Text>
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
    categoryContainer: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    categoryScroll: {
        paddingHorizontal: 16,
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    categoryChipActive: {
        backgroundColor: '#EFF6FF',
        borderColor: '#3B82F6',
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
    },
    categoryTextActive: {
        color: '#3B82F6',
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    partCard: {
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
    partIconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    partInfo: {
        flex: 1,
    },
    partName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 2,
    },
    partNumber: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 4,
        fontFamily: 'monospace',
    },
    partCategory: {
        fontSize: 10,
        color: '#94A3B8',
        backgroundColor: '#F8FAFC',
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    stockInfo: {
        alignItems: 'flex-end',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 4,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
    },
    stockCount: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    stockUnit: {
        fontSize: 10,
        fontWeight: '600',
        color: '#64748B',
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
