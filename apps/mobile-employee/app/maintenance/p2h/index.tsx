import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

// --- DATA STRUCTURE ---
type InspectionItem = {
    id: string;
    label: string;
    critical: boolean;
};

type InspectionSection = {
    id: string;
    title: string;
    icon: keyof typeof Feather.glyphMap;
    items: InspectionItem[];
};

const INSPECTION_DATA: InspectionSection[] = [
    {
        id: 'external',
        title: 'Pemeriksaan Luar',
        icon: 'truck',
        items: [
            { id: 'ext_1', label: 'Kondisi Ban & Baut Roda', critical: true },
            { id: 'ext_2', label: 'Kebocoran (Oli, Air, Fuel)', critical: true },
            { id: 'ext_3', label: 'Kondisi Under carriage', critical: false },
            { id: 'ext_4', label: 'Lampu Operasi & Sein', critical: true },
            { id: 'ext_5', label: 'Body & Frame', critical: false },
        ]
    },
    {
        id: 'engine',
        title: 'Kompartemen Mesin',
        icon: 'cpu', // using cpu as engine placeholder or settings
        items: [
            { id: 'eng_1', label: 'Level Oli Mesin', critical: true },
            { id: 'eng_2', label: 'Air Radiator (Coolant)', critical: true },
            { id: 'eng_3', label: 'V-Belt & Kipas', critical: false },
            { id: 'eng_4', label: 'Level Oli Hidrolik', critical: true },
        ]
    },
    {
        id: 'cabin',
        title: 'Dalam Kabin',
        icon: 'grid',
        items: [
            { id: 'cab_1', label: 'Rem Parkir & Service', critical: true },
            { id: 'cab_2', label: 'Steering & Klakson', critical: true },
            { id: 'cab_3', label: 'Seat Belt (Sabuk Pengaman)', critical: true },
            { id: 'cab_4', label: 'Instrumen Panel & Gauges', critical: false },
            { id: 'cab_5', label: 'AC & Wiper', critical: false },
        ]
    }
];

// --- TYPES ---
type ItemStatus = 'ok' | 'issue' | null;

interface InspectionState {
    status: ItemStatus;
    reason: string;
}

export default function P2HChecklist() {
    // --- STATE ---
    // Memory to store state of each item: { [itemId]: { status: 'ok'|'issue', reason: '' } }
    const [inspectionData, setInspectionData] = useState<Record<string, InspectionState>>({});
    const [submitting, setSubmitting] = useState(false);

    // --- ACTIONS ---
    const handleStatusChange = (itemId: string, status: ItemStatus) => {
        setInspectionData(prev => ({
            ...prev,
            [itemId]: {
                status: status,
                reason: status === 'ok' ? '' : (prev[itemId]?.reason || '')
            }
        }));
    };

    const handleReasonChange = (itemId: string, text: string) => {
        setInspectionData(prev => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                reason: text
            }
        }));
    };

    const calculateProgress = () => {
        let totalItems = 0;
        let checkedItems = 0;
        let issueItems = 0;

        INSPECTION_DATA.forEach(section => {
            section.items.forEach(item => {
                totalItems++;
                const itemState = inspectionData[item.id];
                if (itemState && itemState.status !== null) {
                    checkedItems++;
                    if (itemState.status === 'issue') issueItems++;
                }
            });
        });

        return { totalItems, checkedItems, issueItems };
    };

    const handleSubmit = () => {
        const { totalItems, checkedItems, issueItems } = calculateProgress();

        if (checkedItems < totalItems) {
            Alert.alert(
                'Pemeriksaan Belum Selesai',
                `Anda baru memeriksa ${checkedItems} dari ${totalItems} item. Mohon lengkapi pemeriksaan.`
            );
            return;
        }

        // Validate reasons for issues
        const missingReason = Object.entries(inspectionData).find(([_, data]) => data.status === 'issue' && !data.reason.trim());
        if (missingReason) {
            Alert.alert(
                'Alasan Dibutuhkan',
                'Mohon isi keterangan untuk item yang bermasalah.'
            );
            return;
        }

        setSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setSubmitting(false);
            Alert.alert(
                'Laporan Terkirim',
                `P2H Berhasil Disimpan.\nTotal Item: ${totalItems}\nKondisi Baik: ${checkedItems - issueItems}\nTemuan Masalah: ${issueItems}`,
                [
                    { text: 'OK', onPress: () => router.back() }
                ]
            );
        }, 1500);
    };

    const { totalItems, checkedItems } = calculateProgress();

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Feather name="chevron-left" size={24} color="#3B82F6" />
                    <Text style={styles.backText}>Kembali</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>FORMULIR P2H</Text>
                <View style={{ width: 80 }} />
            </View>

            <View style={styles.unitInfoBar}>
                <View>
                    <Text style={styles.unitLabel}>UNIT NUMBER</Text>
                    <Text style={styles.unitCode}>DT-1042</Text>
                </View>
                <View style={styles.progressBox}>
                    <Text style={styles.progressLabel}>PROGRES</Text>
                    <Text style={styles.progressText}>{checkedItems}/{totalItems}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {INSPECTION_DATA.map((section) => (
                    <View key={section.id} style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionIcon}>
                                <Feather name={section.icon} size={18} color="#FFFFFF" />
                            </View>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                        </View>

                        <View style={styles.sectionItems}>
                            {section.items.map((item) => {
                                const itemState = inspectionData[item.id] || { status: null, reason: '' };
                                const isOk = itemState.status === 'ok';
                                const isIssue = itemState.status === 'issue';

                                return (
                                    <View key={item.id} style={styles.itemRow}>
                                        <View style={styles.itemMainRow}>
                                            <View style={styles.itemLabelContainer}>
                                                <Text style={styles.itemLabel}>{item.label}</Text>
                                                {item.critical && (
                                                    <View style={styles.criticalBadge}>
                                                        <Text style={styles.criticalText}>KRITIS</Text>
                                                    </View>
                                                )}
                                            </View>

                                            <View style={styles.itemActions}>
                                                {/* OK Button */}
                                                <TouchableOpacity
                                                    style={[styles.statusBtn, isOk && styles.statusBtnOkActive]}
                                                    onPress={() => handleStatusChange(item.id, 'ok')}
                                                >
                                                    {isOk ? (
                                                        <Feather name="check-circle" size={24} color="#166534" />
                                                    ) : (
                                                        <Feather name="circle" size={24} color="#CBD5E1" />
                                                    )}
                                                </TouchableOpacity>

                                                {/* Issue Button */}
                                                <TouchableOpacity
                                                    style={[styles.statusBtn, isIssue && styles.statusBtnIssueActive]}
                                                    onPress={() => handleStatusChange(item.id, 'issue')}
                                                >
                                                    {isIssue ? (
                                                        <Feather name="alert-triangle" size={24} color="#DC2626" />
                                                    ) : (
                                                        <Feather name="circle" size={24} color="#CBD5E1" />
                                                    )}
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        {/* Status Text / Reason Input */}
                                        <View style={styles.statusDetails}>
                                            {isOk && (
                                                <Text style={styles.okText}>Kondisi Baik</Text>
                                            )}

                                            {isIssue && (
                                                <View style={styles.issueInputContainer}>
                                                    <Text style={styles.issueLabelText}>Jelaskan Masalah:</Text>
                                                    <TextInput
                                                        style={styles.textInput}
                                                        placeholder="Contoh: Retak halus, bunyi kasar, dll..."
                                                        placeholderTextColor="#94A3B8"
                                                        value={itemState.reason}
                                                        onChangeText={(text) => handleReasonChange(item.id, text)}
                                                    />
                                                </View>
                                            )}

                                            {itemState.status === null && (
                                                <Text style={styles.pendingText}>Belum diperiksa</Text>
                                            )}
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                ))}

                <View style={styles.summarySection}>
                    <Text style={styles.disclaimer}>
                        Dengan mengirimkan laporan ini, saya menyatakan bahwa pemeriksaan telah dilakukan dengan sebenar-benarnya sesuai prosedur yang berlaku.
                    </Text>

                    <TouchableOpacity
                        style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <>
                                <Feather name="send" size={20} color="#FFFFFF" style={{ marginRight: 10 }} />
                                <Text style={styles.submitButtonText}>KIRIM LAPORAN P2H</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
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
    unitInfoBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        marginBottom: 16,
    },
    unitLabel: {
        fontSize: 10,
        color: '#64748B',
        fontWeight: '700',
    },
    unitCode: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
    },
    progressBox: {
        alignItems: 'flex-end',
    },
    progressLabel: {
        fontSize: 10,
        color: '#64748B',
        fontWeight: '700',
    },
    progressText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#3B82F6',
    },
    scrollContent: {
        padding: 16,
    },
    sectionContainer: {
        marginBottom: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        padding: 12,
    },
    sectionIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    sectionItems: {
        padding: 8,
    },
    itemRow: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    itemMainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemLabelContainer: {
        flex: 1,
        paddingRight: 12,
    },
    itemLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 4,
    },
    criticalBadge: {
        backgroundColor: '#FEF2F2',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    criticalText: {
        fontSize: 8,
        fontWeight: '800',
        color: '#EF4444',
    },
    itemActions: {
        flexDirection: 'row',
        gap: 12,
    },
    statusBtn: {
        padding: 4,
    },
    statusBtnOkActive: {
        // Optional active state styling
    },
    statusBtnIssueActive: {
        // Optional active state styling
    },
    statusDetails: {
        marginTop: 4,
    },
    okText: {
        fontSize: 12,
        color: '#166534',
        fontWeight: '500',
    },
    pendingText: {
        fontSize: 12,
        color: '#94A3B8',
        fontStyle: 'italic',
    },
    issueInputContainer: {
        backgroundColor: '#FEF2F2',
        padding: 12,
        borderRadius: 8,
        marginTop: 4,
    },
    issueLabelText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#991B1B',
        marginBottom: 4,
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#FECACA',
        borderRadius: 6,
        padding: 8,
        fontSize: 12,
        color: '#0F172A',
        minHeight: 40,
    },
    summarySection: {
        marginTop: 16,
        padding: 16,
    },
    disclaimer: {
        fontSize: 12,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 18,
    },
    submitButton: {
        backgroundColor: '#2563EB',
        borderRadius: 16,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 4,
    },
    submitButtonDisabled: {
        backgroundColor: '#94A3B8',
        shadowOpacity: 0,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});
