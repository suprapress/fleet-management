import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { useState } from 'react';

// Sample data for Step 3: Kabin
const INSPECTION_ITEMS = [
    {
        id: '1',
        title: 'Rem Kaki',
        description: 'Uji daya cengkeram pedal rem',
        isCritical: true,
    },
    {
        id: '2',
        title: 'Rem Tangan',
        description: 'Pastikan tuas mengunci dengan kuat',
        isCritical: false,
    },
    {
        id: '3',
        title: 'Klakson',
        description: 'Suara harus terdengar jelas',
        isCritical: false,
    },
];

export default function P2HInspection() {
    // State to track status of each item: { [id]: 'good' | 'bad' }
    const [statuses, setStatuses] = useState<Record<string, 'good' | 'bad'>>({});

    const handleCheck = (id: string, status: 'good' | 'bad') => {
        setStatuses(prev => ({
            ...prev,
            [id]: status
        }));
    };

    const isAllChecked = INSPECTION_ITEMS.every(item => statuses[item.id]);

    const handleNext = () => {
        if (!isAllChecked) {
            Alert.alert('Belum Selesai', 'Mohon lengkapi semua poin pemeriksaan sebelum melanjutkan.');
            return;
        }
        // Logic to go to next step or finish
        Alert.alert('Sukses', 'Lanjut ke langkah berikutnya');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backIcon}>‹</Text>
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerEyebrow}>P2H INSPECTION</Text>
                    <Text style={styles.headerTitle}>Step 3: Kabin</Text>
                </View>
                <View style={styles.stepBadge}>
                    <Text style={styles.stepBadgeText}>3/5</Text>
                </View>
            </View>

            {/* Progress Segment */}
            <View style={styles.progressContainer}>
                <View style={[styles.progressSegment, styles.progressActive]} />
                <View style={[styles.progressSegment, styles.progressActive]} />
                <View style={[styles.progressSegment, styles.progressCurrent]} />
                <View style={styles.progressSegment} />
                <View style={styles.progressSegment} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoIcon}>ⓘ</Text>
                    <Text style={styles.infoText}>
                        Periksa kondisi kabin dengan seksama. Pastikan semua instrumen berfungsi normal sebelum memulai shift.
                    </Text>
                </View>

                {/* Inspection List */}
                <View style={styles.listContainer}>
                    {INSPECTION_ITEMS.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                {item.isCritical && (
                                    <View style={styles.criticalBadge}>
                                        <Text style={styles.criticalText}>KRITIS</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.cardDescription}>{item.description}</Text>

                            <View style={styles.actionRow}>
                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        statuses[item.id] === 'good' ? styles.btnGoodActive : styles.btnInactive,
                                    ]}
                                    onPress={() => handleCheck(item.id, 'good')}
                                >
                                    <Text style={[
                                        styles.actionBtnIcon,
                                        statuses[item.id] === 'good' ? styles.textGood : styles.textInactive
                                    ]}>✓</Text>
                                    <Text style={[
                                        styles.actionBtnText,
                                        statuses[item.id] === 'good' ? styles.textGood : styles.textInactive
                                    ]}>BAIK</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        statuses[item.id] === 'bad' ? styles.btnBadActive : styles.btnInactive,
                                    ]}
                                    onPress={() => handleCheck(item.id, 'bad')}
                                >
                                    <Text style={[
                                        styles.actionBtnIcon,
                                        statuses[item.id] === 'bad' ? styles.textBad : styles.textInactive
                                    ]}>✕</Text>
                                    <Text style={[
                                        styles.actionBtnText,
                                        statuses[item.id] === 'bad' ? styles.textBad : styles.textInactive
                                    ]}>RUSAK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Floating Footer Button */}
            <View style={styles.footerContainer}>
                <TouchableOpacity
                    style={[styles.nextButton, !isAllChecked && styles.nextButtonDisabled]}
                    onPress={handleNext}
                    disabled={!isAllChecked}
                >
                    <Text style={styles.nextButtonText}>Lanjut ke Safety</Text>
                    <Text style={styles.nextButtonIcon}>→</Text>
                </TouchableOpacity>
            </View>
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
    },
    backButton: {
        padding: 8,
    },
    backIcon: {
        fontSize: 28,
        color: '#0F172A',
        fontWeight: '300',
    },
    headerCenter: {
        alignItems: 'center',
    },
    headerEyebrow: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 1,
        marginBottom: 2,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    stepBadge: {
        backgroundColor: '#F1F5F9',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    stepBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0F172A',
    },
    progressContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
        backgroundColor: '#FFFFFF',
        gap: 8,
    },
    progressSegment: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E2E8F0',
    },
    progressActive: {
        backgroundColor: '#22C55E', // Green
    },
    progressCurrent: {
        backgroundColor: '#0F172A', // Black
    },
    scrollContent: {
        padding: 20,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#EFF6FF', // Blue 50
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#DBEAFE',
        marginBottom: 24,
    },
    infoIcon: {
        color: '#3B82F6',
        fontSize: 18,
        marginRight: 12,
        marginTop: 2,
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: '#1E40AF', // Blue 800
        lineHeight: 18,
    },
    listContainer: {
        gap: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    criticalBadge: {
        backgroundColor: '#FEF2F2',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    criticalText: {
        fontSize: 8,
        fontWeight: '800',
        color: '#EF4444',
    },
    cardDescription: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 16,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        gap: 8,
    },
    btnInactive: {
        backgroundColor: '#F8FAFC',
        borderColor: '#F1F5F9',
    },
    btnGoodActive: {
        backgroundColor: '#DCFCE7', // Green 50
        borderColor: '#22C55E',
    },
    btnBadActive: {
        backgroundColor: '#FEF2F2', // Red 50
        borderColor: '#EF4444',
    },
    actionBtnIcon: {
        fontSize: 14,
        fontWeight: '700',
    },
    actionBtnText: {
        fontSize: 12,
        fontWeight: '700',
    },
    textInactive: {
        color: '#94A3B8',
    },
    textGood: {
        color: '#166534',
    },
    textBad: {
        color: '#EF4444',
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        padding: 20,
        paddingBottom: 36,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    nextButton: {
        backgroundColor: '#1E293B',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    nextButtonDisabled: {
        backgroundColor: '#94A3B8',
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    nextButtonIcon: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
