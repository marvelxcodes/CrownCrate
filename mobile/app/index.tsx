import { Text, View, Button, TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";

export default function Page() {
	return (
		<View className=''>
			<View className='p-5'>
				<Text className='text-3xl px-3'>Hello</Text>
				<Text className='text-6xl font-extrabold p-1'>Rama Krishnan V</Text>
			</View>
			<View className='bg-gray-200 items-center justify-center py-6 rounded-t-3xl gap-5 flex-row flex flex-wrap h-full'>
				<TouchableOpacity className='aspect-square w-2/5 bg-white rounded-2xl'></TouchableOpacity>
				<TouchableOpacity className='aspect-square w-2/5 bg-white rounded-2xl'></TouchableOpacity>
				<TouchableOpacity className='aspect-square w-2/5 bg-white rounded-2xl'></TouchableOpacity>
				<TouchableOpacity className='aspect-square w-2/5 bg-white rounded-2xl'></TouchableOpacity>
				<TouchableOpacity className='aspect-square w-2/5 bg-white rounded-2xl'></TouchableOpacity>
				<TouchableOpacity className='aspect-square w-2/5 bg-white rounded-2xl'></TouchableOpacity>
			</View>
		</View>
	);
}
