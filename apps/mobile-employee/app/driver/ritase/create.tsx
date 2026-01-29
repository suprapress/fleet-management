import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import { Stack, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

const { width } = Dimensions.get('window');

// Dummy Data
const UNITS = ['DT-1042', 'DT-1043', 'DT-1044', 'DT-1045'];
const MATERIALS = ['Coal (Batubara)', 'Overburden (OB)', 'Top Soil', 'Mud'];
const LOCATIONS = ['PIT A-01', 'PIT A-02', 'PIT B-01', 'PIT C-05'];

export default function CreateRitase() {
    const [selectedUnit, setSelectedUnit] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    // Dropdown toggles (simplified for this demo, usually would use a modal or distinct component)
    const [showUnitDropdown, setShowUnitDropdown] = useState(false);
    const [showMaterialDropdown, setShowMaterialDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);

    const handleConfirm = () => {
        // Logic to start ritase
        router.back();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Feather name="chevron-left" size={28} color="#0F172A" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Mulai Ritase Baru</Text>
                    <Text style={styles.headerSubtitle}>INPUT DATA PENGANGKUTAN</Text>
                </View>
                <TouchableOpacity style={styles.cartButton}>
                    <Feather name="shopping-cart" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <Feather name="info" size={20} color="#2563EB" style={styles.infoIcon} />
                    <Text style={styles.infoText}>
                        Pastikan data yang Anda masukkan sesuai dengan unit dan lokasi saat ini untuk akurasi pelacakan.
                    </Text>
                </View>

                {/* Form Section: Unit */}
                <View style={styles.formSection}>
                    <Text style={styles.label}>PILIH UNIT (TRUCK)</Text>
                    <TouchableOpacity
                        style={styles.dropdownButton}
                        onPress={() => setShowUnitDropdown(!showUnitDropdown)}
                    >
                        <View style={styles.dropdownLeft}>
                            <Feather name="truck" size={20} color="#64748B" />
                            <Text style={[styles.dropdownText, !selectedUnit && styles.placeholderText]}>
                                {selectedUnit || 'Pilih Nomor Lambung'}
                            </Text>
                        </View>
                        <Feather name="chevron-down" size={20} color="#64748B" />
                    </TouchableOpacity>
                    {showUnitDropdown && (
                        <View style={styles.dropdownList}>
                            {UNITS.map(unit => (
                                <TouchableOpacity
                                    key={unit}
                                    style={styles.dropdownItem}
                                    onPress={() => { setSelectedUnit(unit); setShowUnitDropdown(false); }}
                                >
                                    <Text style={styles.dropdownItemText}>{unit}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Form Section: Material */}
                <View style={styles.formSection}>
                    <Text style={styles.label}>JENIS MATERIAL</Text>
                    <TouchableOpacity
                        style={styles.dropdownButton}
                        onPress={() => setShowMaterialDropdown(!showMaterialDropdown)}
                    >
                        <View style={styles.dropdownLeft}>
                            <Feather name="layers" size={20} color="#64748B" />
                            <Text style={[styles.dropdownText, !selectedMaterial && styles.placeholderText]}>
                                {selectedMaterial || 'Pilih Material'}
                            </Text>
                        </View>
                        <Feather name="chevron-down" size={20} color="#64748B" />
                    </TouchableOpacity>
                    {showMaterialDropdown && (
                        <View style={styles.dropdownList}>
                            {MATERIALS.map(item => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.dropdownItem}
                                    onPress={() => { setSelectedMaterial(item); setShowMaterialDropdown(false); }}
                                >
                                    <Text style={styles.dropdownItemText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Form Section: Location */}
                <View style={styles.formSection}>
                    <Text style={styles.label}>LOKASI PIT (ASAL)</Text>
                    <TouchableOpacity
                        style={styles.dropdownButton}
                        onPress={() => setShowLocationDropdown(!showLocationDropdown)}
                    >
                        <View style={styles.dropdownLeft}>
                            <Feather name="map-pin" size={20} color="#64748B" />
                            <Text style={[styles.dropdownText, !selectedLocation && styles.placeholderText]}>
                                {selectedLocation || 'Pilih Lokasi PIT'}
                            </Text>
                        </View>
                        <Feather name="chevron-down" size={20} color="#64748B" />
                    </TouchableOpacity>
                    {showLocationDropdown && (
                        <View style={styles.dropdownList}>
                            {LOCATIONS.map(loc => (
                                <TouchableOpacity
                                    key={loc}
                                    style={styles.dropdownItem}
                                    onPress={() => { setSelectedLocation(loc); setShowLocationDropdown(false); }}
                                >
                                    <Text style={styles.dropdownItemText}>{loc}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Driver Info Card */}
                <View style={styles.driverCard}>
                    <View style={styles.driverAvatar}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60' }}
                            style={styles.avatarImage}
                        />
                    </View>
                    <View style={styles.driverInfo}>
                        <Text style={styles.driverLabel}>DRIVER</Text>
                        <Text style={styles.driverName}>John Doe</Text>
                    </View>
                    <View style={styles.timeInfo}>
                        <Text style={styles.timeLabel}>WAKTU</Text>
                        <Text style={styles.timeValue}>08:42 AM</Text>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <View style={styles.playIconContainer}>
                        <Feather name="play" size={16} color="#0F172A" style={{ marginLeft: 2 }} />
                    </View>
                    <Text style={styles.confirmButtonText}>Konfirmasi & Mulai Loading</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitleContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    headerSubtitle: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 0.5,
        marginTop: 2,
    },
    cartButton: {
        width: 40,
        height: 40,
        backgroundColor: '#1E293B',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 24,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#EFF6FF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    infoIcon: {
        marginTop: 2,
        marginRight: 12,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: '#1E40AF',
        lineHeight: 20,
    },
    formSection: {
        marginBottom: 24,
    },
    label: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748B',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
    },
    dropdownLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dropdownText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
    },
    placeholderText: {
        fontStyle: 'normal', // Ensure placeholder isn't weirdly styled
    },
    dropdownList: {
        marginTop: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        padding: 4,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    dropdownItemText: {
        fontSize: 14,
        color: '#334155',
    },
    driverCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 24,
        padding: 16,
        marginTop: 8,
    },
    driverAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        overflow: 'hidden',
        marginRight: 16,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    driverInfo: {
        flex: 1,
    },
    driverLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    driverName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    timeInfo: {
        alignItems: 'flex-end',
    },
    timeLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    timeValue: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    confirmButton: {
        backgroundColor: '#1E293B',
        paddingVertical: 18,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#1E293B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
    },
    playIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
});
