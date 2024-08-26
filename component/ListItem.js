import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect} from 'react'
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'

export default function listItem({ title, setCounter,onRemove }) {
    const [isActive, setIsActive] = useState(true)
    useEffect(() => {
        setCounter(isActive)
    }, [])

    const handleLongPress = () => {
        onRemove(title); 
        setCounter(!isActive)
    };

    const setActive = () => {
        if (isActive)
            setIsActive(false)
        else
            setIsActive(true)

        setCounter(!isActive)
    }
    return (
        <LongPressGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) {
                    handleLongPress();
                }
            }}
            minDurationMs={800} 
        >
            <View style={[styles.container, !isActive && styles.isOk]}>
                <TouchableOpacity
                    onPress={setActive}
                >
                    <Text style={!isActive && styles.text}>{title}</Text>
                </TouchableOpacity>
            </View>
        </LongPressGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    },
    text: {
        textDecorationLine: 'line-through'
    },
    isOk: {
        opacity: 0.5,
    }
})