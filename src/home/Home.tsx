import React, { useContext, useEffect } from 'react'
import { Alert, FlatList, Text } from 'react-native';
import { ProgressBarContext } from '../../App';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import useRestaurants from './useRestaurants';
import { useDispatch } from 'react-redux';
import { SET_RESTAURANTS } from '../Constants';

interface HomeProps {
    navigation: DrawerNavigationProp<any, any>
}

export default function Home({ }: HomeProps) {
    let [restaurants, error, loading] = useRestaurants()
    let progressBarContext = useContext(ProgressBarContext)
    let dispatch = useDispatch()
    useEffect(() => {
        progressBarContext.setLoading(loading)
    }, [loading])
    useEffect(() => {
        if (restaurants.length) {
            dispatch({ type: SET_RESTAURANTS, payload: { restaurants } })
        }
    }, [restaurants])
    useEffect(() => {
        if (error)
            Alert.alert("", `We have encountered an error:${error}`)
    }, [error])
    return (
        <FlatList
            data={restaurants}
            renderItem={({ item: { name } }) => {
                return <Text>{name}</Text>
            }}
            keyExtractor={(restaurant) => restaurant.id.toString()} />
    )
}