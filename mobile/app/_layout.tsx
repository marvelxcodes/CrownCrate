import { View, Text } from "react-native";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
	return (
		<SafeAreaView>
			<Slot />
		</SafeAreaView>
	);
}
