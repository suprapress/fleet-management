import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

// Reusable Components (Copied from tasks.tsx for consistency)
const InputField = ({ label, placeholder, unit, keyboardType = 'default', required = false, warning, multiline = false, numberOfLines = 1 }: any) => (
    <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            {required && <Text style={styles.requiredTag}>Wajib Diisi</Text>}
        </View>
        <View style={[styles.inputWrapper, multiline && { height: 'auto', minHeight: 100 }]}>
            <TextInput
                style={[styles.textInput, multiline && { height: 100, textAlignVertical: 'top' }]}
                placeholder={placeholder}
                placeholderTextColor="#94A3B8"
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={numberOfLines}
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

const PhotoUploadBox = ({ label, icon, onPress, value }: any) => (
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

const RadioOption = ({ label, description, selected, onSelect }: any) => (
    <TouchableOpacity
        style={[styles.radioOption, selected && styles.radioOptionSelected]}
        onPress={onSelect}
    >
        <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
            {selected && <View style={styles.radioInnerCircle} />}
        </View>
        <View style={styles.radioContent}>
            <Text style={[styles.radioLabel, selected && styles.radioLabelSelected]}>{label}</Text>
            <Text style={styles.radioDescription}>{description}</Text>
        </View>
    </TouchableOpacity>
);

export default function DamageReport() {
    const [reportType, setReportType] = useState<string | null>(null);

    const handlePhotoUpload = (type: string) => {
        Alert.alert("Upload Foto", `Buka kamera untuk ${type}?`, [
            { text: "Batal", style: 'cancel' },
            { text: "Buka Kamera", onPress: () => console.log(`Uploading ${type}`) }
        ]);
    };

    const handleSubmit = () => {
        Alert.alert("Laporan Terkirim", "Laporan kerusakan berhasil dikirim. Status unit akan diperbarui.", [
            { text: "OK", onPress: () => router.back() }
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
                <Text style={styles.headerTitle}>LAPOR KERUSAKAN</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <Text style={styles.sectionHeader}>JENIS MASALAH</Text>
                <Text style={styles.sectionSubtext}>Pilih jenis kerusakan atau kendala yang dialami.</Text>

                <View style={styles.optionsContainer}>
                    <RadioOption
                        label="Tabrakan (Collision)"
                        description="Benturan antar kendaraan atau fasilitas tambang."
                        selected={reportType === 'collision'}
                        onSelect={() => setReportType('collision')}
                    />
                    <RadioOption
                        label="Breakdown (Kerusakan Teknis)"
                        description="Masalah mesin, ban, hidrolik, dll."
                        selected={reportType === 'breakdown'}
                        onSelect={() => setReportType('breakdown')}
                    />
                    <RadioOption
                        label="Alarm / Sosial (Non-Teknis)"
                        description="Longsor, jalan licin, banjir, atau masalah sosial."
                        selected={reportType === 'social'}
                        onSelect={() => setReportType('social')}
                    />
                </View>

                {/* Form Logic Based on Selection */}

                {reportType === 'collision' && (
                    <View style={styles.formSection}>
                        <View style={styles.divider} />
                        <Text style={styles.formTitle}>Form Laporan Tabrakan</Text>

                        <InputField
                            label="KETERANGAN KEJADIAN"
                            placeholder="Jelaskan kronologi singkat..."
                            multiline
                            required
                        />

                        <Text style={styles.sectionLabel}>FOTO BUKTI (WAJIB)</Text>
                        <View style={styles.photoGrid}>
                            <PhotoUploadBox
                                label="FOTO JARAK JAUH"
                                icon="camera"
                                onPress={() => handlePhotoUpload('Posisi Jarak Jauh')}
                            />
                            <PhotoUploadBox
                                label="FOTO JARAK DEKAT"
                                icon="camera"
                                onPress={() => handlePhotoUpload('Kerusakan Jarak Dekat')}
                            />
                            <PhotoUploadBox
                                label="IDENTITAS LAWAN"
                                icon="user"
                                onPress={() => handlePhotoUpload('Identitas Lawan')}
                            />
                            <PhotoUploadBox
                                label="BERITA ACARA (BAP)"
                                icon="file-text"
                                onPress={() => handlePhotoUpload('BAP')}
                            />
                        </View>

                        <View style={styles.warningBox}>
                            <Feather name="alert-triangle" size={16} color="#B45309" />
                            <Text style={styles.warningBoxText}>
                                Status unit akan otomatis berubah menjadi Off-Hire.
                            </Text>
                        </View>
                    </View>
                )}

                {reportType === 'breakdown' && (
                    <View style={styles.formSection}>
                        <View style={styles.divider} />
                        <Text style={styles.formTitle}>Form Kerusakan Teknis</Text>

                        <InputField
                            label="KOMPONEN BERMASALAH"
                            placeholder="Contoh: Ban Pecah, Mesin Overheat..."
                            required
                        />

                        <InputField
                            label="ODOMETER SAAT INI"
                            placeholder="0000.0"
                            keyboardType="numeric"
                            required
                        />

                        <InputField
                            label="PERMINTAAN SPAREPART"
                            placeholder="Tulis sparepart yang dibutuhkan (jika tahu)..."
                            multiline
                        />

                        <Text style={styles.sectionLabel}>FOTO BUKTI</Text>
                        <View style={styles.photoGrid}>
                            <PhotoUploadBox
                                label="KOMPONEN RUSAK"
                                icon="settings"
                                onPress={() => handlePhotoUpload('Komponen Rusak')}
                            />
                            <PhotoUploadBox
                                label="FOTO ODOMETER"
                                icon="disc"
                                onPress={() => handlePhotoUpload('Foto Odometer')}
                            />
                        </View>
                    </View>
                )}

                {reportType === 'social' && (
                    <View style={styles.formSection}>
                        <View style={styles.divider} />
                        <Text style={styles.formTitle}>Laporan Alam / Sosial</Text>

                        <InputField
                            label="JENIS KENDALA"
                            placeholder="Contoh: Jalan Longsor, Demo Warga..."
                            required
                        />

                        <InputField
                            label="DESKRIPSI SITUASI"
                            placeholder="Jelaskan kondisi di lapangan..."
                            multiline
                            required
                        />

                        <Text style={styles.sectionLabel}>DOKUMENTASI</Text>
                        <View style={styles.photoGrid}>
                            <PhotoUploadBox
                                label="KONDISI ALAM/JALAN"
                                icon="map"
                                onPress={() => handlePhotoUpload('Kondisi Alam')}
                            />
                            <PhotoUploadBox
                                label="SITUASI SOSIAL"
                                icon="users"
                                onPress={() => handlePhotoUpload('Situasi Sosial')}
                            />
                        </View>
                    </View>
                )}

                {reportType && (
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Kirim Laporan</Text>
                    </TouchableOpacity>
                )}

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
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    backButton: {
        padding: 4,
    },
    scrollContent: {
        padding: 24,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
        marginBottom: 4,
        letterSpacing: 1,
    },
    sectionSubtext: {
        fontSize: 14,
        color: '#94A3B8',
        marginBottom: 20,
    },
    optionsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    radioOptionSelected: {
        borderColor: '#3B82F6',
        backgroundColor: '#EFF6FF',
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CBD5E1',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    radioCircleSelected: {
        borderColor: '#3B82F6',
    },
    radioInnerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3B82F6',
    },
    radioContent: {
        flex: 1,
    },
    radioLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 2,
    },
    radioLabelSelected: {
        color: '#1D4ED8',
    },
    radioDescription: {
        fontSize: 12,
        color: '#64748B',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 24,
    },
    formSection: {
        // marginTop: 8,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 16,
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
        fontSize: 12,
        fontWeight: '700',
        color: '#475569',
        letterSpacing: 0.5,
    },
    requiredTag: {
        fontSize: 10,
        fontWeight: '700',
        color: '#EF4444',
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 48,
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        color: '#0F172A',
        fontWeight: '600',
    },
    unitText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
        marginLeft: 8,
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        gap: 6,
    },
    warningText: {
        fontSize: 12,
        color: '#D97706',
    },
    // Photo Styles
    sectionLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#475569',
        marginBottom: 12,
        marginTop: 8,
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    photoBox: {
        width: '48%',
        aspectRatio: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    photoUploaded: {
        alignItems: 'center',
    },
    photoLabel: {
        fontSize: 12,
        color: '#64748B',
        textAlign: 'center',
        fontWeight: '500',
    },
    photoLabelUploaded: {
        fontSize: 12,
        color: '#166534',
        fontWeight: '700',
        marginTop: 4,
    },
    warningBox: {
        backgroundColor: '#FFFBEB',
        borderWidth: 1,
        borderColor: '#FCD34D',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 24,
    },
    warningBoxText: {
        flex: 1,
        fontSize: 12,
        color: '#92400E',
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: '#EF4444',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginTop: 32,
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
