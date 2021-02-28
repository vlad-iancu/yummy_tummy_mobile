import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native';
import { CodeField, Cursor } from 'react-native-confirmation-code-field'
import EncryptedStorage from 'react-native-encrypted-storage';
import RippleButton from '../utils/RippleButton';
type RootStackParamList = {
    Main: undefined,
    Login: undefined,
    Register: undefined,
    Validate: { email?: string, phone?: string }
}
interface ValidateAccountProps {
    navigation: StackNavigationProp<RootStackParamList, "Validate">,
    route: RouteProp<RootStackParamList, "Validate">
}

export default function ValidateAccount({ navigation, route }: ValidateAccountProps) {
    let [emailCode, setEmailCode] = useState("")
    let [phoneCode, setPhoneCode] = useState("")
    console.log("Email is:" + route.params.email)
    console.log("Phone is:" + route.params.phone)
    const validate = async () => {
        try {
            let response = await axios.post("/validate_user", null, {
                params: {
                    phoneCode: phoneCode.toUpperCase(),
                    emailCode: emailCode.toUpperCase(),
                }
            })

            await EncryptedStorage.removeItem("emailToValidate")
            await EncryptedStorage.removeItem("phoneToValidate")
            Alert.alert("", "Validation successful", [{
                text: "Login", onPress: () => {
                    console.log("Resetting the navigation")
                    navigation.reset({
                        index: 0,
                        routes: [
                            { name: "Login" }
                        ]
                    })
                }
            }])

        }
        catch (e) {
            Alert.alert("", "Validation failed, make sure your input is correct")
        }
    }
    return (
        <View>
            {route.params.email ? <View>
                <Text style={styles.header}>Email Code</Text>
                <CodeField
                    value={emailCode}
                    onChangeText={setEmailCode}
                    cellCount={6}
                    rootStyle={styles.code}
                    keyboardType="default"
                    renderCell={({ index, isFocused, symbol }) => {
                        return <View key={index} style={styles.cellContainer}><Text style={styles.cell} >{symbol || (isFocused ? <Cursor /> : null)}</Text></View>
                    }}
                />
            </View> : null}
            {route.params.phone ? <View>
                <Text style={styles.header}>Phone Code</Text>
                <CodeField
                    value={phoneCode}
                    onChangeText={setPhoneCode}
                    cellCount={6}
                    rootStyle={styles.code}
                    keyboardType="default"
                    renderCell={({ index, isFocused, symbol }) => {
                        return <View key={index} style={styles.cellContainer}><Text style={styles.cell} >{symbol || (isFocused ? <Cursor /> : null)}</Text></View>
                    }}
                />
            </View> : null}

            <RippleButton onPress={validate} style={styles.button}>
                <Text style={{ color: "white" }}>Submit</Text>
            </RippleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 28,
        alignSelf: "center",
        marginTop: 30,
    },
    code: {
        margin: 10,
    },
    cell: {
        height: 40,
        aspectRatio: 1,

        fontSize: 24,
        borderRadius: 8,
        margin: 0,
        textAlign: "center",

    },
    cellContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderStyle: "solid",

    },
    button: {
        width: 100,
        alignItems: "center",
        margin: 5,
        marginTop: 10,
        backgroundColor: "royalblue",
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 15,
        alignSelf: "center"
    },
})