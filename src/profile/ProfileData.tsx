import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import UserIcon from '../../assets/user.svg'
import EmailIcon from '../../assets/email.svg'
import PhoneIcon from '../../assets/phone.svg'
import RippleButton from '../utils/RippleButton'
import { LanguageContext } from '../GlobalContext'
interface ProfileDataProps {
    email?: string,
    phone?: string,
    name?: string,
    onNameChanged: (newName: string) => void,
    onCancel: () => void
}

const NAME_TEXT_PADDING = 4

export default function ProfileData({ email, phone, name, onNameChanged, onCancel }: ProfileDataProps) {
    let [nameTextHeight, setNameTextHeight] = useState(0)
    let [editingName, setEditingName] = useState(false)
    let [newName, setNewName] = useState("")
    let { language } = useContext(LanguageContext)
    const onEdit = () => {
        setEditingName(true)
    }

    const onDiscard = () => {
        setNewName("")
        setEditingName(false)
        onCancel()
    }

    const onKeep = () => {
        setEditingName(false)
        onNameChanged(newName)
        setNewName("")
    }
    return (
        <View style={styles.profileContainer}>
            <View style={styles.profileField}>
                <UserIcon style={styles.icon} width={16} height={16} color="#00FF00" />
                {editingName ?
                    <TextInput
                        style={[styles.nameEdit, { height: nameTextHeight + NAME_TEXT_PADDING }]}
                        onChangeText={setNewName}
                        value={newName}
                        selectionColor="#00000077" />
                    :
                    <Text style={styles.text}
                        onLayout={({ nativeEvent: { layout: { height } } }) => { setNameTextHeight(height) }}>
                        {name ?? `<${language.noUserName}>`}
                    </Text>}
            </View>
            <View style={styles.profileField}>
                <EmailIcon style={styles.icon} width={16} height={16} color="#00FF00" />
                <Text style={styles.text}>{email}</Text>
            </View>
            <View style={styles.profileField}>
                <PhoneIcon style={styles.icon} width={16} height={16} color="#00FF00" />
                <Text style={styles.text}>{phone}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <RippleButton onPress={onKeep}
                    style={styles.button}
                    visible={editingName ? newName != "" : false}
                    disabled={editingName ? newName === name : true} >
                    <Text style={{ color: "white" }}>{language.keep}</Text>
                </RippleButton>
                <RippleButton onPress={() => { if (editingName) onDiscard(); else onEdit() }} style={styles.button}>
                    <Text style={{ color: "white" }}>{editingName ? language.discard : language.edit}</Text>
                </RippleButton>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: "column",
        padding: 5,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 10,
    },
    profileField: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 20,
    },
    icon: {
        marginLeft: "10%"
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        alignSelf: "center"
    },
    text: {
        marginLeft: "10%",
    },
    nameEdit: {
        marginLeft: "10%",
        padding: NAME_TEXT_PADDING,
        flex: 1,
        borderColor: "black",
        borderRadius: 3,
        borderWidth: 1
    },
    button: {
        alignItems: "center",
        margin: 5,
        marginTop: 10,
        backgroundColor: "royalblue",
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 15
    },
})