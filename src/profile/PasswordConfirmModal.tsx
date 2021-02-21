import React, { useState } from 'react'
import { Modal, View, Text, TextInput, StyleSheet } from 'react-native'
import RippleButton from '../utils/RippleButton'

interface PasswordConfirmModalProps {
    visible: boolean,
    onConfirm?: (password: string) => void
    onCancel?: () => void
}

export default function PasswordConfirmModal({ visible, onConfirm = () => {}, onCancel = () => {} }: PasswordConfirmModalProps) {
    let [password, setPassword] = useState("")
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Text>Re-enter your password:</Text>
                    <TextInput style={styles.passwordEdit} secureTextEntry={true} selectionColor="#00000077" value={password} onChangeText={setPassword} />
                    <View style={styles.buttonContainer}>
                        <RippleButton duration={300} rippleColor="#DDDDDD" style={styles.button} onPress={() => {setPassword("");onCancel()}}>
                            <Text style={{ color: "white", opacity: 0.8 }}>Cancel</Text>
                        </RippleButton>
                        <RippleButton duration={300} rippleColor="#DDDDDD" style={styles.button} onPress={() => {setPassword("");onConfirm(password)}}>
                            <Text style={{ color: "white", opacity: 0.8 }}>Confirm</Text>
                        </RippleButton>
                    </View>

                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modal: {
        flexDirection: "column",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        padding: 20,
        width: "90%",
        marginLeft: 30,
        marginRight: 30,
        height: 150,
        borderRadius: 15,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    buttonContainer: {
        alignSelf: "flex-end",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        alignSelf: "flex-end",
        backgroundColor: "royalblue",
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
        marginTop: 5,
        marginLeft: 10
    },
    passwordEdit: {
        padding: 2,
        borderColor: "black",
        borderRadius: 4,
        borderWidth: 1,
        marginTop: 30,
        width: "100%"
    },
})