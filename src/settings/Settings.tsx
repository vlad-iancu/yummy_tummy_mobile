import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import en from '../locales/en'
import ro from '../locales/ro'
import EncryptedStorage from 'react-native-encrypted-storage'
import { Language } from '../locales/Language';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { UiActions } from '../UISlice';

interface SettingsProps {
    navigation: DrawerNavigationProp<any, any>
}
export default function Settings({ navigation }: SettingsProps) {
    let language = useSelector<RootState, Language>(state => state.ui.language)
    let dispatch = useDispatch()
    const saveLanguage = (lang: Language) => {
        EncryptedStorage.setItem("lang", lang.code)
        .then(() => {
            //Alert.alert("Language changed to" + lang.code)
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{language.language}</Text>
            <DropDownPicker items={[
                { label: "English", value: en },
                { label: "Română", value: ro },
            ]}
                style={[styles.dropdown, { minHeight: 50, padding: 5 }]}
                defaultValue={language}
                dropDownStyle={{ width: "50%" }}
                onChangeItem={({ value }: any) => {
                    dispatch(UiActions.language(value))
                    saveLanguage(value)
                }}>

            </DropDownPicker>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    header: {
        fontSize: 20,
    },
    dropdown: {
        width: "50%",
    }
})