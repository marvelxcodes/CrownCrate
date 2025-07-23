import { PropsWithChildren } from "react";
import { ThemedView } from "./ThemedView";
import { StyleSheet } from "react-native";

type PageContainer = PropsWithChildren<{}>

export default function PageContainer({ children }:PropsWithChildren) {
    return (
        <ThemedView style={[styles.container]}>
            {children}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    width: '100%',
    gap: 16,
    overflow: 'hidden',
  },
})

