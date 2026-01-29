import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

// Reusable Components

const InputField = ({ label, placeholder, unit, keyboardType = 'default', required = false, warning }) => (
    <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            {required && <Text style={styles.requiredTag}>Wajib Diisi</Text>}
        </View>
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor="#94A3B8"
                keyboardType={keyboardType}
            />
            {unit && <Text style={styles.unitText}>{unit}</Text>}
        </View>
        {warning && (
            <View style={styles.warningContainer}>
                <Feather name="alert-circle" size={14} color="#D97706" />
                <Text style={styles.warningText}>{warning}</Text>
            </View>
        )}
    </View>
);

const PhotoUploadBox = ({ label, icon, onPress, value }) => (
    <TouchableOpacity style={styles.photoBox} onPress={onPress}>
        {value ? (
            <View style={styles.photoUploaded}>
                <Feather name="check" size={24} color="#22C55E" />
                <Text style={styles.photoLabelUploaded}>Terunggah</Text>
            </View>
        ) : (
            <>
                <Feather name={icon} size={24} color="#64748B" style={{ marginBottom: 8 }} />
                <Text style={styles.photoLabel}>{label}</Text>
            </>
        )}
    </TouchableOpacity>
);

const TaskStep = ({ title, isActive, isCompleted, isLast, children, onExpand }) => {
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

export default function DriverTasks() {
    const [expandedStep, setExpandedStep] = useState(1); // Default step 1 open

    const handlePhotoUpload = (type) => {
        Alert.alert("Upload Foto", `Buka kamera untuk ${type}?`, [
            { text: "Batal", style: 'cancel' },
            { text: "Buka Kamera", onPress: () => console.log(`Uploading ${type}`) }
        ]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Feather name="chevron-left" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>TUGAS RITASE</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Trip Info Card */}
                <View style={styles.tripInfoCard}>
                    <View style={styles.tripInfoRow}>
                        <View>
                            <Text style={styles.tripLabel}>UNIT</Text>
                            <Text style={styles.tripValue}>DT-1042</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.tripLabel}>MATERIAL</Text>
                            <Text style={styles.tripValue}>Coal (Batubara)</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.tripInfoRow}>
                        <View>
                            <Text style={styles.tripLabel}>LOKASI ASAL</Text>
                            <Text style={styles.tripValue}>PIT A-01</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.tripLabel}>DRIVER</Text>
                            <Text style={styles.tripValue}>John Doe</Text>
                        </View>
                    </View>
                </View>

                {/* Timeline Container */}
                <View style={styles.timelineCard}>
                    {/* Step 1: Persiapan & Identitas */}
                    <TaskStep
                        title="1. Persiapan & Identitas (Check-in)"
                        isActive={expandedStep === 1}
                        isCompleted={expandedStep > 1}
                        onExpand={() => setExpandedStep(expandedStep === 1 ? 0 : 1)}
                    >
                        <Text style={styles.instructionText}>Pastikan aset dan personel siap sebelum berangkat.</Text>

                        <InputField
                            label="KILOMETER AWAL (ODOMETER)"
                            placeholder="0000.0"
                            keyboardType="numeric"
                            required
                        />

                        <InputField
                            label="SISA BAHAN BAKAR (FUEL)"
                            placeholder="0"
                            unit="Bar/Percent"
                            keyboardType="numeric"
                        />

                        <Text style={styles.sectionLabel}>FOTO BUKTI</Text>
                        <View style={styles.photoGrid}>
                            <PhotoUploadBox
                                label="FOTO UNIT & DRIVER"
                                icon="user"
                                onPress={() => handlePhotoUpload('Foto Driver & Unit')}
                            />
                            <PhotoUploadBox
                                label="FOTO ODOMETER"
                                icon="disc"
                                onPress={() => handlePhotoUpload('Foto Odometer')}
                            />
                        </View>

                        <TouchableOpacity style={styles.nextButton} onPress={() => setExpandedStep(2)}>
                            <Text style={styles.nextButtonText}>Simpan & Lanjut</Text>
                        </TouchableOpacity>
                    </TaskStep>

                    {/* Step 2: Pemuatan (Loading) */}
                    <TaskStep
                        title="2. Pemuatan (Loading di Pit)"
                        isActive={expandedStep === 2}
                        isCompleted={expandedStep > 2}
                        onExpand={() => setExpandedStep(expandedStep === 2 ? 0 : 2)}
                    >
                        <InputField
                            label="JUMLAH BUCKET"
                            placeholder="0"
                            keyboardType="numeric"
                            required
                        />
                        <InputField
                            label="NAMA OPERATOR / ALAT"
                            placeholder="Contoh: PC-200 / Budi"
                            required
                        />

                        <Text style={styles.sectionLabel}>FOTO BUKTI</Text>
                        <View style={styles.photoGrid}>
                            <PhotoUploadBox
                                label="SLIP LOADING"
                                icon="file-text"
                                onPress={() => handlePhotoUpload('Slip Loading')}
                            />
                        </View>

                        <TouchableOpacity style={styles.nextButton} onPress={() => setExpandedStep(3)}>
                            <Text style={styles.nextButtonText}>Simpan & Lanjut</Text>
                        </TouchableOpacity>
                    </TaskStep>

                    {/* Step 3: Penimbangan Awal */}
                    <TaskStep
                        title="3. Penimbangan Awal (Gross)"
                        isActive={expandedStep === 3}
                        isCompleted={expandedStep > 3}
                        onExpand={() => setExpandedStep(expandedStep === 3 ? 0 : 3)}
                    >
                        <InputField
                            label="BERAT GROSS (KG/TON)"
                            placeholder="0"
                            keyboardType="numeric"
                            required
                        />

                        <Text style={styles.sectionLabel}>FOTO BUKTI</Text>
                        <View style={styles.photoGrid}>
                            <PhotoUploadBox
                                label="STRUK TIMBANGAN"
                                icon="camera"
                                onPress={() => handlePhotoUpload('Struk Timbangan Gross')}
                            />
                        </View>

                        <TouchableOpacity style={styles.nextButton} onPress={() => setExpandedStep(4)}>
                            <Text style={styles.nextButtonText}>Simpan & Lanjut</Text>
                        </TouchableOpacity>
                    </TaskStep>

                    {/* Step 4: Perjalanan & Insiden */}
                    <TaskStep
                        title="4. Perjalanan & Insiden"
                        isActive={expandedStep === 4}
                        isCompleted={expandedStep > 4}
                        onExpand={() => setExpandedStep(expandedStep === 4 ? 0 : 4)}
                    >
                        <Text style={styles.instructionText}>Laporkan jika ada kendala di jalan, jika lancar silakan lanjut.</Text>

                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}>
                            <Feather name="alert-triangle" size={18} color="#EF4444" />
                            <Text style={[styles.actionButtonText, { color: '#B91C1C' }]}>Lapor Breakdown / Insiden</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextButton} onPress={() => setExpandedStep(5)}>
                            <Text style={styles.nextButtonText}>Perjalanan Lancar (Lanjut)</Text>
                        </TouchableOpacity>
                    </TaskStep>

                    {/* Step 5: Bongkar & Timbang Akhir */}
                    <TaskStep
                        title="5. Bongkar & Timbang Akhir (Tare)"
                        isActive={expandedStep === 5}
                        isCompleted={expandedStep > 5}
                        onExpand={() => setExpandedStep(expandedStep === 5 ? 0 : 5)}
                    >
                        <InputField
                            label="BERAT KOSONG / TARE (KG/TON)"
                            placeholder="0"
                            keyboardType="numeric"
                            required
                        />

                        <Text style={styles.sectionLabel}>FOTO BUKTI</Text>
                        <View style={styles.photoGrid}>
                            <PhotoUploadBox
                                label="STRUK TARE"
                                icon="file-minus"
                                onPress={() => handlePhotoUpload('Struk Tare')}
                            />
                        </View>

                        <TouchableOpacity style={styles.nextButton} onPress={() => setExpandedStep(6)}>
                            <Text style={styles.nextButtonText}>Simpan & Lanjut</Text>
                        </TouchableOpacity>
                    </TaskStep>

                    {/* Step 6: Refueling */}
                    <TaskStep
                        title="6. Pengisian Bahan Bakar"
                        isActive={expandedStep === 6}
                        isCompleted={expandedStep > 6}
                        onExpand={() => setExpandedStep(expandedStep === 6 ? 0 : 6)}
                        isLast={true}
                    >
                        <InputField
                            label="HM UNIT (HOUR METER)"
                            placeholder="0000.0"
                            keyboardType="numeric"
                            required
                            warning="Pastikan HM lebih besar dari sebelumnya"
                        />

                        <InputField
                            label="JUMLAH LITER"
                            placeholder="0"
                            unit="Ltr"
                            keyboardType="numeric"
                            required
                        />

                        <Text style={styles.sectionLabel}>FOTO BUKTI</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photoRow}>
                            <PhotoUploadBox
                                label="FOTO NOTA"
                                icon="file-text"
                                onPress={() => handlePhotoUpload('Foto Nota Solar')}
                            />
                            <PhotoUploadBox
                                label="FOTO METERAN"
                                icon="maximize"
                                onPress={() => handlePhotoUpload('Foto Meteran Dispenser')}
                            />
                            <PhotoUploadBox
                                label="FOTO UNIT"
                                icon="truck"
                                onPress={() => handlePhotoUpload('Foto Unit Refuel')}
                            />
                        </ScrollView>

                        <TouchableOpacity style={[styles.nextButton, { backgroundColor: '#10B981', marginTop: 24 }]}>
                            <Text style={styles.nextButtonText}>Selesaikan Tugas Ritase</Text>
                        </TouchableOpacity>
                    </TaskStep>
                </View>

                <View style={{ height: 50 }} />
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
        padding: 4,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: 0.5,
    },
    scrollContent: {
        padding: 24,
    },
    tripInfoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    tripInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tripLabel: {
        fontSize: 10,
        color: '#64748B',
        fontWeight: '700',
        marginBottom: 2,
    },
    tripValue: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 12,
    },
    // Timeline Styles
    timelineCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
        marginBottom: 24,
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
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2, // Ensure icon is above line
        backgroundColor: '#FFFFFF',
    },
    stepIconActive: {
        borderColor: '#EAB308', // Amber 500
        borderWidth: 4,
    },
    stepIconDone: {
        backgroundColor: '#22C55E', // Green 500
        borderColor: '#22C55E',
        borderWidth: 2,
    },
    stepIconPending: {
        backgroundColor: '#F1F5F9', // Slate 100
        borderColor: '#E2E8F0',
    },
    stepNumber: {
        fontSize: 14,
        fontWeight: '800',
        color: '#CBD5E1',
    },
    stepNumberActive: {
        color: '#EAB308',
    },
    stepLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#E2E8F0', // Slate 200
        marginVertical: 4,
        minHeight: 24,
    },
    stepHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 32, // Match icon height
        marginBottom: 8,
    },
    stepTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
    },
    stepTitleActive: {
        color: '#0F172A',
        fontSize: 15,
    },
    stepBody: {
        paddingTop: 8,
    },
    // Input Styles
    inputContainer: {
        marginBottom: 20,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748B',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    requiredTag: {
        fontSize: 10,
        fontWeight: '600',
        color: '#0F172A',
    },
    inputWrapper: {
        position: 'relative',
    },
    textInput: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A',
    },
    unitText: {
        position: 'absolute',
        right: 16,
        top: 14,
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 8,
    },
    warningText: {
        fontSize: 12,
        color: '#D97706',
        fontWeight: '500',
    },
    // Photo Box Styles
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748B',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: 8,
        marginBottom: 12,
    },
    photoGrid: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    photoRow: {
        gap: 12,
    },
    photoBox: {
        width: 100,
        height: 100,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAFC',
        padding: 8,
    },
    photoLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
        textAlign: 'center',
    },
    photoUploaded: {
        alignItems: 'center',
    },
    photoLabelUploaded: {
        fontSize: 10,
        fontWeight: '700',
        color: '#22C55E',
        marginTop: 4,
    },
    // Action Buttons
    nextButton: {
        backgroundColor: '#0F172A',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 24,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        marginTop: 8,
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '700',
    },
});
