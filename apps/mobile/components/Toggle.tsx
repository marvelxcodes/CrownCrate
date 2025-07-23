import Animated from 'react-native-reanimated';
import { Dispatch, SetStateAction } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
    Pressable,
    StyleSheet,
} from 'react-native';

import {
    withTiming,
    useSharedValue,
    useAnimatedStyle,
    interpolateColor,
} from 'react-native-reanimated';

import {
    impactAsync,
    AndroidHaptics,
    ImpactFeedbackStyle,
    performAndroidHapticsAsync
} from 'expo-haptics';

const WIDTH = 46
const HEIGHT = 26
const PADDING = 3

type ToggleProps = {
    isEnabled: boolean;
    setIsEnabled: Dispatch<SetStateAction<boolean>>;
    onChange?: (value:boolean) => void;
}

export default function Toggle({ isEnabled, setIsEnabled, onChange }: ToggleProps) {

    // Theme Colors
    const thumbColor = useThemeColor({}, 'toggleThumb');
    const trackEnabledColor = useThemeColor({}, 'toggleEnabled');
    const trackDisabledColor = useThemeColor({}, 'toggleDisabled');

    const animationProgress = useSharedValue(0);

    const animatedThumbStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: withTiming(animationProgress.value * ((WIDTH / 2) - PADDING) , {
                duration: 100
            })
        }]
    }));

    const animatedTrackStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(animationProgress.value, [0, 1], [trackDisabledColor, trackEnabledColor]);

        return {
            backgroundColor
        }
    });

    async function handlePress() {
        setIsEnabled(prev => !prev);
        animationProgress.value = withTiming(isEnabled ? 0 : 1, {
            duration: 100
        })

        const newState = !isEnabled;
        onChange?.(newState);

        // Haptic Feedback
        try {
            await performAndroidHapticsAsync(newState ? AndroidHaptics.Toggle_On : AndroidHaptics.Toggle_Off);
        } catch {
            try {
                // Fallback
                await impactAsync(newState ? ImpactFeedbackStyle.Heavy : ImpactFeedbackStyle.Soft);
            } catch {}
        }
    }
    return (
        <Pressable onPress={handlePress} style={styles.container}>
             <Animated.View style={[styles.track, animatedTrackStyle]}>
                <Animated.View style={[
                    styles.thumb,
                    animatedThumbStyle,
                    {
                        backgroundColor: thumbColor,
                        transform: [{
                            scaleX: 1
                        }]
                    },
                ]}></Animated.View>
             </Animated.View>
        </Pressable>
    )
}

export {
    Toggle,
    ToggleProps
};

const styles = StyleSheet.create({
    container: {},
    track: {
        height: HEIGHT,
        width: WIDTH,
        borderRadius: WIDTH / 2,
        padding: PADDING
    },
    thumb: {
        borderRadius: WIDTH / 2,
        height: HEIGHT - (PADDING * 2),
        width: (WIDTH - (PADDING * 2)) / 2,
        position: 'relative',
        shadowColor: '#700',
        shadowRadius: 10,
        shadowOpacity: 0.5
    }
})
