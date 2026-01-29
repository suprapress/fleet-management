import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

const HISTORY_DATA = [
    {
        id: '1',
        date: '15 JAN 2026 • 08:45 AM',
        unit: 'DT-4029',
        status: 'DITERIMA',
        amount: 'Rp 125.000',
        type: 'INSENTIF RITASE',
        statusColor: '#DCFCE7', // Green 50
        statusTextColor: '#166534', // Green 800
    },
    {
        id: '2',
        date: '15 JAN 2026 • 07:12 AM',
        unit: 'DT-4029',
        status: 'MENUNGGU',
        amount: 'Rp 118.000',
        type: 'ESTIMASI INSENTIF',
        statusColor: '#FEF9C3', // Yellow 50
        statusTextColor: '#854D0E', // Yellow 800
    },
    {
        id: '3',
        date: '14 JAN 2026 • 16:30 PM',
        unit: 'DT-4029',
        status: 'DITOLAK',
        amount: 'Rp 0',
        type: 'INSENTIF',
        statusColor: '#FEE2E2', // Red 50
        statusTextColor: '#991B1B', // Red 800
    },
];

interface HistoryItemType {
    id: string;
    date: string;
    unit: string;
    status: string;
    amount: string;
    type: string;
    statusColor: string;
    statusTextColor: string;
}

const TaskStep = ({ title, isActive, isCompleted, isLast, children, onExpand }: any) => {
    return (
        <View style={styles.stepContainer}>
            {/* Left Column: Icon + Line */}
            <View style={styles.stepLeft}>
                <View style={[
                    styles.stepIcon,
                    isCompleted ? styles.stepIconDone : (isActive ? styles.stepIconActive : styles.stepIconPending)
                ]}>
                    {isCompleted ? <Feather name="check" size={14} color="#FFF" /> : <Text style={[styles.stepNumber, isActive && styles.stepNumberActive]}>{isActive || isCompleted ? '•' : '○'}</Text>}
                </View>
                {!isLast && <View style={styles.stepLine} />}
            </View>

            {/* Right Column: Header + Body */}
            <View style={styles.stepRight}>
                <TouchableOpacity style={styles.stepHeader} onPress={onExpand}>
                    <Text style={[styles.stepTitle, isActive && styles.stepTitleActive]}>{title}</Text>
                    <Feather name={isActive ? "chevron-up" : "chevron-down"} size={20} color="#64748B" />
                </TouchableOpacity>

                {isActive && (
                    <View style={styles.stepBody}>
                        {children}
                    </View>
                )}
            </View>
        </View>
    );
};

const HistoryItem = ({ item }: { item: HistoryItemType }) => {
    const [expanded, setExpanded] = useState(false);
    const [activeStep, setActiveStep] = useState<number | null>(null);

    const toggleStep = (step: number) => {
        setActiveStep(activeStep === step ? null : step);
    };

    return (
        <View style={styles.historyCard}>
            <TouchableOpacity onPress={() => setExpanded(!expanded)} activeOpacity={0.7}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardDate}>{item.date}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
                        <Text style={[styles.statusText, { color: item.statusTextColor }]}>{item.status}</Text>
                    </View>
                </View>

                <Text style={styles.unitText}>UNIT: {item.unit}</Text>

                <Text style={styles.typeLabel}>{item.type}</Text>
                <View style={styles.amountRow}>
                    <Text style={[styles.amountText, item.status === 'DITOLAK' && styles.amountTextRed]}>
                        {item.amount}
                    </Text>
                    <Feather name={expanded ? "chevron-up" : "chevron-down"} size={20} color="#94A3B8" />
                </View>
            </TouchableOpacity>

            {expanded && (
                <View style={styles.timelineSection}>
                    <View style={styles.divider} />

                    {/* Simplified Timeline Data */}
                    <TaskStep
                        title="1. Persiapan & Identitas"
                        isCompleted={true}
                        isActive={activeStep === 1}
                        onExpand={() => toggleStep(1)}
                    >
                        <Text style={styles.detailText}>Start KM: 12500</Text>
                        <Text style={styles.detailText}>Driver: John Doe</Text>
                    </TaskStep>

                    <TaskStep
                        title="2. Pemuatan (Loading)"
                        isCompleted={true}
                        isActive={activeStep === 2}
                        onExpand={() => toggleStep(2)}
                    >
                        <Text style={styles.detailText}>Operator: Budi</Text>
                        <Text style={styles.detailText}>Bucket: 5</Text>
                    </TaskStep>

                    <TaskStep
                        title="3. Penimbangan Awal"
                        isCompleted={true}
                        isActive={activeStep === 3}
                        onExpand={() => toggleStep(3)}
                    >
                        <Text style={styles.detailText}>Gross: 25.5 Ton</Text>
                    </TaskStep>

                    <TaskStep
                        title="4. Perjalanan"
                        isCompleted={true}
                        isActive={activeStep === 4}
                        onExpand={() => toggleStep(4)}
                    >
                        <Text style={styles.detailText}>Status: Lancar</Text>
                    </TaskStep>

                    <TaskStep
                        title="5. Bongkar & Timbang Akhir"
                        isCompleted={true}
                        isActive={activeStep === 5}
                        onExpand={() => toggleStep(5)}
                    >
                        <Text style={styles.detailText}>Tare: 10.2 Ton</Text>
                        <Text style={styles.detailText}>Net: 15.3 Ton</Text>
                    </TaskStep>

                    <TaskStep
                        title="6. Data Solar"
                        isCompleted={true}
                        isActive={activeStep === 6}
                        onExpand={() => toggleStep(6)}
                        isLast={true}
                    >
                        <Text style={styles.detailText}>Refuel: 0 Ltr</Text>
                    </TaskStep>
                </View>
            )}
        </View>
    );
};

export default function DriverHistory() {


    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity style={styles.backButton}>
                            <Text style={styles.backIcon}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Riwayat Pengangkutan</Text>
                    </View>
                    <TouchableOpacity style={styles.calendarButton}>
                        <Text style={styles.calendarIcon}>📅</Text>
                    </TouchableOpacity>
                </View>

                {/* Summary & Filter Card */}
                <View style={styles.summarySection}>
                    {/* Period Row */}
                    <View style={styles.periodRow}>
                        <View>
                            <Text style={styles.filterLabel}>PERIODE</Text>
                            <Text style={styles.filterValue}>Januari 2026</Text>
                        </View>
                        <TouchableOpacity style={styles.filterButton}>
                            <Text style={styles.filterButtonIcon}>⚡</Text>
                            <Text style={styles.filterButtonText}>Filter</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>TOTAL RITASE</Text>
                            <Text style={styles.statValue}>48 <Text style={styles.statUnit}>Trip</Text></Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>TOTAL INSENTIF</Text>
                            <Text style={styles.statValue}>Rp 5.250k</Text>
                        </View>
                    </View>
                </View>

                {/* List */}
                <FlatList
                    data={HISTORY_DATA}
                    renderItem={({ item }) => <HistoryItem item={item} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => <View style={{ height: 40 }} />} // Reduced footer height since floating footer is gone
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
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    backButton: {
        padding: 4,
    },
    backIcon: {
        fontSize: 20,
        color: '#0F172A',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    calendarButton: {
        padding: 8,
        backgroundColor: '#F8FAFC',
        borderRadius: 8,
    },
    calendarIcon: {
        fontSize: 16,
    },
    summarySection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        margin: 24,
        marginBottom: 16,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    periodRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filterLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
        marginBottom: 4,
        letterSpacing: 1,
    },
    filterValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    filterButtonIcon: {
        fontSize: 12,
    },
    filterButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#0F172A',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 16,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 16,
    },
    statItem: {
        flex: 1,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    statUnit: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    listContent: {
        paddingHorizontal: 24,
    },
    historyCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    cardDate: {
        fontSize: 11,
        color: '#64748B',
        fontWeight: '600',
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    unitText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 12,
    },
    typeLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amountText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    amountTextRed: {
        color: '#EF4444',
    },
    chevron: {
        fontSize: 20,
        color: '#94A3B8',
    },
    // Timeline Styles
    timelineSection: {
        marginTop: 16,
    },
    stepContainer: {
        flexDirection: 'row',
    },
    stepLeft: {
        alignItems: 'center',
        marginRight: 16,
    },
    stepRight: {
        flex: 1,
        paddingBottom: 16,
    },
    stepIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        backgroundColor: '#FFFFFF',
    },
    stepIconActive: {
        borderColor: '#EAB308',
        borderWidth: 3,
    },
    stepIconDone: {
        backgroundColor: '#22C55E',
        borderColor: '#22C55E',
        borderWidth: 2,
    },
    stepIconPending: {
        backgroundColor: '#F1F5F9',
        borderColor: '#E2E8F0',
        borderWidth: 2,
    },
    stepNumber: {
        fontSize: 10,
        fontWeight: '800',
        color: '#CBD5E1',
    },
    stepNumberActive: {
        color: '#EAB308',
    },
    stepLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 4,
        minHeight: 16,
    },
    stepHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 24,
        marginBottom: 4,
    },
    stepTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#64748B',
    },
    stepTitleActive: {
        color: '#0F172A',
    },
    stepBody: {
        paddingTop: 4,
        paddingBottom: 8,
    },
    detailText: {
        fontSize: 12,
        color: '#475569',
        marginBottom: 2,
    },
});
