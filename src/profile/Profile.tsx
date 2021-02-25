import { DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import { ProgressBarContext } from '../../App'
import PasswordConfirmModal from './PasswordConfirmModal'
import { ImagePickerResponse } from 'react-native-image-picker'
import ProfileData from './ProfileData'
import ProfilePicture from './ProfilePicture'
import { useDispatch, useSelector } from 'react-redux'
import useAuthToken from '../utils/useAuthToken'
import { Profile as UserProfile } from './profileReducer'
import { fetchProfileThunk, updateProfileThunk } from './profileReducer'
import { LanguageContext } from '../GlobalContext'

interface ProfileProps {
    navigation: DrawerNavigationProp<any, any>
}
type Photo = ImagePickerResponse
const NAME_TEXT_PADDING = 4
export default function Profile({ navigation }: ProfileProps) {
    let [modalVisible, setModalVisible] = useState(false)
    let [newName, setNewName] = useState<string>()
    let [newPhoto, setNewPhoto] = useState<Photo>()
    let [token, error] = useAuthToken()
    let progressBarContext = useContext(ProgressBarContext)
    let profile: UserProfile = useSelector((state: any) => state.profile)
    let { language } = useContext(LanguageContext)
    let dispatch = useDispatch()
    useEffect(() => {
        if (!error && token) {
            if (!profile || !profile.loaded)
                dispatch(fetchProfileThunk(token, progressBarContext.setLoading))
        }
        else {
            Alert.prompt("", error)
        }
    }, [token, error, profile])
    useEffect(() => {
        if (profile && !profile.error) {
            navigation.setOptions({ headerTitle: profile.name, headerTitleAlign: "center" })
            setModalVisible(false)
        }
        else {
            Alert.alert("", profile.error)
        }
    }, [profile])
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Text style={styles.headerText} onPress={() => { setModalVisible(true) }}>
                        {(newName || newPhoto) && language.save}
                    </Text>)
            }
        })

    }, [newName, newPhoto])
    const onModalCancel = () => {
        setNewName(undefined)
        setModalVisible(false)
    }
    const updateProfile = (password: string) => {
        dispatch(updateProfileThunk(password, { ...profile, newPhoto, newName }, progressBarContext.setLoading))
    }
    return (
        <View style={styles.container}>
            <PasswordConfirmModal visible={modalVisible} onConfirm={updateProfile} onCancel={onModalCancel} />
            <ProfilePicture uri={newPhoto?.uri ?? profile?.photoUrl} onImageChange={setNewPhoto} />
            {profile &&
                <ProfileData
                    {...profile} name={newName ?? profile.name ?? ""}
                    onNameChanged={setNewName}
                    onCancel={() => setNewName(undefined)} />}
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