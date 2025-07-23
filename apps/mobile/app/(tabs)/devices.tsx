import { Image } from 'expo-image';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PageContainer from '@/components/PageContainer';

export default function DevicesScreen() {
  return (
    <PageContainer>
        <View style={styles.devicesContainer}>
            <TouchableOpacity style={styles.addDeviceBtn}>
                <View style={styles.addDeviceContent}>
                    <ThemedText>Add a Device</ThemedText>
                    <Icon name='add-circle-outline' size={24} color={'white'} />
                </View>
            </TouchableOpacity>
        </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
    devicesContainer: {
        width: '100%',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    addDeviceBtn: {
        height: 40,
        padding: 8
    },
    addDeviceContent: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    }
});
