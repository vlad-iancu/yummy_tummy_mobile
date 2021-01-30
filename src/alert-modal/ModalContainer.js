import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TouchableHighlight } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { DISPLAY_MODAL } from '../Constants'

export default function ModalContainer(props) {
    let { show, text } = useSelector(state => state.modal)
    let dispatch = useDispatch()
    let opacity = show ? 0.5 : 1
    console.log(show)
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                {props.children}
            </View>

            {show && <View style={styles.modal} >
                <View style={styles.modalContent}>
                    <Text>{text}</Text>
                    <TouchableHighlight style={styles.okButton} onPress={() => {
                        dispatch({ type: DISPLAY_MODAL, payload: { show: false, text: "" } })
                    }} 
                    underlayColor="#EEEEEEAA">
                        <View >
                            <Text style={styles.ok} >OK</Text>
                        </View>


                    </TouchableHighlight>
                </View>
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
    modal: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(200, 200, 200, 0.5)"
    },
    modalContent: {
        padding: 15,
        borderRadius: 10,
        height: "20%",
        width: "80%",
        backgroundColor: "white",
        elevation: 5,
        shadowColor: "lightgray",
        shadowRadius: 50,
        shadowOpacity: .5
    },
    okButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        width: 25
    },
    ok: {
        fontWeight: "bold",
        color: "lightgreen",
    }
})