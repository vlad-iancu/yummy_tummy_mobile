import React, { useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, TextInput, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { ProgressBarContext } from '../../App'
import useAuthToken from '../utils/useAuthToken'
import { fetchRestaurantsThunk } from './restaurantsReducer'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { LanguageContext } from '../GlobalContext'
interface RestaurantSearchProps {
    loading: boolean,
    setLoading: (loading: boolean) => void
}
export default function RestaurantSearch({loading, setLoading}: RestaurantSearchProps) {
    let dispatch = useDispatch()
    let [token, _] = useAuthToken()
    let [query, setQuery] = useState("")
    const searchRestaurants = () => { if (!loading) dispatch(fetchRestaurantsThunk(token, setLoading, query)) }
    let { language } = useContext(LanguageContext)
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBox}
                placeholder={`${language.search}...`}
                onChangeText={setQuery} />
            <TouchableOpacity onPress={searchRestaurants} style={styles.button}>
                <EvilIcon name="search" size={25} color="white" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",

    },
    button: {
        backgroundColor: "royalblue",
        borderRadius: 3,
        marginRight: 10,
        padding: 5
    },
    searchBox: {
        minWidth: 100,
        width: "30%",
        overflow: "hidden",
        height: 30,
        borderRadius: 5,
        color: "black",
        borderWidth: 1,
        borderColor: "black",
        marginRight: 10,
        paddingVertical: 5,
    },
})