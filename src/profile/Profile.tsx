import { DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import PasswordConfirmModal from './PasswordConfirmModal'
import { ImagePickerResponse } from 'react-native-image-picker'
import ProfileData from './ProfileData'
import ProfilePicture from './ProfilePicture'
import { useDispatch, useSelector } from 'react-redux'
import useAuthToken from '../utils/useAuthToken'
import { ProfileState as UserProfile } from './ProfileTypes'
import { fetchProfileAsyncThunk } from './ProfileThunks'
import { LanguageContext } from '../GlobalContext'
import { updateProfileAsyncThunk } from './ProfileThunks'
import { RootState } from '../Store'
import { Language } from '../locales/Language'

interface ProfileProps {
    navigation: DrawerNavigationProp<any, any>
}
type Photo = ImagePickerResponse
export default function Profile({ navigation }: ProfileProps) {
    let [modalVisible, setModalVisible] = useState(false)
    let [newName, setNewName] = useState<string>()
    let [newPhoto, setNewPhoto] = useState<Photo>()
    let [token, error] = useAuthToken()
    let profile: UserProfile = useSelector((state: any) => state.profile)
    let language = useSelector<RootState,Language>(state => state.ui.language)
    let dispatch = useDispatch()
    useEffect(() => {
        if (!error && token) {
            if (!profile || !profile.loaded)
                dispatch(fetchProfileAsyncThunk(token))
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
        dispatch(updateProfileAsyncThunk({password, ...profile, newPhoto, newName }))
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