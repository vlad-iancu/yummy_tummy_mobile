import React, { useContext, useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import * as Progress from 'react-native-progress'
import { RootState } from '../Store'
export default function ProgressBarContainer(props: any) {
    let loading = useSelector<RootState>(state => state.ui.loading)
    let error: string = useSelector<RootState, string>(state => state.ui.error ?? "")
    useEffect(() => {
        if (error) {
            Alert.alert("", error)
        }
    }, [error])
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                {props.children}
            </View>
            {loading && <View style={styles.background}>
                <Progress.CircleSnail color={["#4169e1"]} spinDuration={500} duration={2500} />
            </View>}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%"
    },
    background: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(200, 200, 200, 0.5)"
    },
})