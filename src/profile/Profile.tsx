import { DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import { ProgressBarContext } from '../../App'
import useProfile from './useProfile'
import UserIcon from '../../assets/user.svg'
import EmailIcon from '../../assets/email.svg'
import PhoneIcon from '../../assets/phone.svg'
import FastImage from 'react-native-fast-image'
import AntIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import RippleButton from '../utils/RippleButton'
import axios from 'axios'
import PasswordConfirmModal from './PasswordConfirmModal'
import { launchImageLibrary } from 'react-native-image-picker'
import ProfileData from './ProfileData'
import ProfilePicture from './ProfilePicture'

interface ProfileProps {
    navigation: DrawerNavigationProp<any, any>
}
type Photo = {
    uri?: string
    fileName?: string,
    type?: string
}
const NAME_TEXT_PADDING = 4
export default function Profile({ navigation }: ProfileProps) {
    let [profile, profileLoading, refresh, error] = useProfile()
    let [modalVisible, setModalVisible] = useState(false)
    let [newName, setNewName] = useState<string | null>(null)
    let [newPhoto, setNewPhoto] = useState<Photo | null>(null)
    let progressBarContext = useContext(ProgressBarContext)

    useEffect(() => {
        progressBarContext.setLoading(profileLoading)
        if (error) {
            console.log("error is:" + error)
            Alert.alert("", "Could not fetch the your profile")
        } else {
            if (profile) {
                console.log("We are refreshing the profile")
                navigation.setOptions({ headerTitle: profile.name, headerTitleAlign: "center" })
                setModalVisible(false)
                setNewPhoto(null)
                setNewName(null)
            }
        }
    }, [profile, profileLoading, error])
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Text style={styles.headerText} onPress={() => { setModalVisible(true) }}>
                        {(newName || newPhoto) && "Save"}
                    </Text>)
            }
        })

    }, [newName, newPhoto])

    const onModalCancel = () => {
        setNewName(null)
        setModalVisible(false)
    }
    const updateProfile = (password: string) => {
        let body = new FormData()
        body.append("password", password)
        body.append("email", profile?.email)
        body.append("phone", profile?.phone)
        if (newName)
            body.append("name", newName)
        if (newPhoto)
            body.append("profilePicture", {
                uri: newPhoto?.uri,
                name: newPhoto?.type,
                type: newPhoto?.type,
            })
        axios.put("/user_profile", body)
            .then(result => {
                refresh()
            })
            .catch(err => {
                Alert.alert("", "An error has occured while trying to refresh your profile with the new data")
            })
            .finally(() => {
                progressBarContext.setLoading(false)
            })
        setModalVisible(false)
        progressBarContext.setLoading(true)
    }
    console.log("photo:" + profile?.photoUrl)
    return (
        <View style={styles.container}>
            <PasswordConfirmModal visible={modalVisible} onConfirm={updateProfile} onCancel={onModalCancel} />
            <ProfilePicture uri={newPhoto?.uri ?? profile?.photoUrl} onImageChange={setNewPhoto} />
            {profile &&
                <ProfileData
                    {...profile} name={newName ?? profile.name}
                    onNameChanged={setNewName}
                    onCancel={() => setNewName(null)} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        fontWeight: "bold",
        textTransform: "uppercase",
        margin: 5,
        letterSpacing: 3,
    },
})