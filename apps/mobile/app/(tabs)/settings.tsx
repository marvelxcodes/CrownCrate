import { useState } from 'react';
import Icons from '@expo/vector-icons/Ionicons'
import PageContainer from '@/components/PageContainer';
import { StyleSheet, Switch } from 'react-native';

export default function SettingsScreen() {
    const [isOn, setIsOn] = useState(false);
    return (
      <PageContainer>
        <Switch value={isOn} onChange={() => setIsOn(value => !value)}/>
      </PageContainer>
  );
}

const styles = StyleSheet.create({

});
