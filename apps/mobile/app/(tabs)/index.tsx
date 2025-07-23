import { useState } from 'react';
import { StyleSheet } from 'react-native';

import Toggle from '@/components/Toggle';
import { ThemedText } from '@/components/ThemedText';
import PageContainer from '@/components/PageContainer';

export default function HomeScreen() {
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
  return (
        <PageContainer>
            <ThemedText>Test</ThemedText>
            <Toggle isEnabled={isEnabled} setIsEnabled={setIsEnabled} />

        </PageContainer>
    );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
