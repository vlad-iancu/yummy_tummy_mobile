import React, { Component, ComponentClass, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import useAuthToken from '../utils/useAuthToken';
import { fetchRestaurantsThunk, RestaurantState } from './restaurantsReducer';
import RestaurantItem from './RestaurantItem';
import RestaurantSearch from './RestaurantSearch';
import * as Progress from 'react-native-progress'
import { LanguageContext } from '../GlobalContext';
import { RootState } from '../RootReducer';

interface HomeProps {
    navigation: DrawerNavigationProp<any, any>
}
export default function Home({ navigation }: HomeProps) {
    let [loading, setLoading] = useState(false)
    let dispatch = useDispatch()
    let [token, authError] = useAuthToken()
    let { restaurants, error, endReached } = useSelector((state: RootState) => state.restaurants)
    let { language } = useContext(LanguageContext)
    useEffect(() => {
        navigation.setOptions({ headerRight: () => <RestaurantSearch {...{ loading, setLoading }} /> })
    }, [])

    useEffect(() => {
        if (token && !error)
            dispatch(fetchRestaurantsThunk(token, setLoading, ""))
    }, [token, error])
    useEffect(() => {
        if (error)
            if (authError)
                Alert.alert("", `${language.authError}:${error}`)
            else
                Alert.alert("", `${language.error}:${error}`)
    }, [error, authError])

    const renderFooter = (props: any) => {
        if (!loading) return null
        return (
            <Progress.CircleSnail color={["#4169e1"]} spinDuration={500} duration={2500} style={{ alignSelf: "center" }} />
        )
    }
    return (
        <View>
            <FlatList
                style={{ marginBottom: 60 }}
                data={restaurants.map((page) => page.restaurants).reduce((arr, page) => {
                    return arr.concat(page)
                })}
                renderItem={({ item }) => {
                    return <RestaurantItem {...item} />
                }}
                keyExtractor={(restaurant) => restaurant.id.toString()}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.4}
                onEndReached={() => { if (!loading && !endReached) dispatch(fetchRestaurantsThunk(token, setLoading)) }} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5
    }
})