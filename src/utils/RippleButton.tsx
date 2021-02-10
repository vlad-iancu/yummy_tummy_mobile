import React, { useState, useRef, Children } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View, Animated, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
interface RippleButtonProps {
    duration: number,
    rippleColor: string,
    children: React.ReactNode,
    onPress?: (e: GestureResponderEvent) => void,
    style?: StyleProp<ViewStyle>
}
export default function RippleButton({ duration, rippleColor, children, onPress = () => { }, style }: RippleButtonProps) {

    let scaleAnim = useRef(new Animated.Value(0)).current
    let opacityAnim = useRef(new Animated.Value(1)).current
    let [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })
    let [radius, setRadius] = useState(0)

    const scaleUp = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true
        }).start()
        Animated.timing(opacityAnim, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true
        }).start()
    }

    const onScale = (e: GestureResponderEvent) => {
        setClickPosition({
            x: e.nativeEvent.locationX,
            y: e.nativeEvent.locationY
        })
        scaleAnim.setValue(0)
        opacityAnim.setValue(1)

        scaleUp()

    }

    return (
        <View style={{ width: "100%", height: "100%", }}>
            <TouchableWithoutFeedback onPress={(e) => {
                onScale(e)
                onPress(e)
            }} >
                <View style={[styles.buttonWrapper, style]} onLayout={({ nativeEvent: { layout: { width, height } } }) => { setRadius(Math.hypot(width, height)) }} >
                    <View pointerEvents="none">
                        {children}
                    </View>
                    <Animated.View style={[styles.ripple, {
                        transform: [
                            {
                                translateX: clickPosition.x - radius
                            },
                            {
                                translateY: clickPosition.y - radius
                            },
                            {
                                scale: scaleAnim
                            }
                        ]
                    }, {
                        opacity: opacityAnim,
                        width: radius * 2,
                        height: radius * 2,
                        borderRadius: radius,
                        backgroundColor: rippleColor
                    }]} pointerEvents="none" />

                </View>

            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: "100%",
    },
    buttonWrapper: {
        overflow: "hidden",
        width: "100%",
        height: "100%"
    },
    ripple: {
        position: "absolute",
        left: 0,
        top: 0,
    }
})