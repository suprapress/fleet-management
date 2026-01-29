import { View, Text, StyleSheet } from 'react-native';

export default function DriverTasks() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tugas Driver</Text>
            <Text style={styles.subtext}>Daftar tugas akan muncul di sini</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0F172A',
    },
    subtext: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 8,
    },
});
