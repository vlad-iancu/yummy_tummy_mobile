import React, { useContext, useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import EncryptedStorage from 'react-native-encrypted-storage'
import { Alert, Button, FlatList, ListRenderItemInfo } from 'react-native';
import { Text } from 'react-native';
import { ProgressBarContext } from '../../App';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import useRestaurants from './useRestaurants';

interface HomeProps {
    navigation: DrawerNavigationProp<any, any>
}

export default function Home({ navigation }: HomeProps) {
    let [restaurants, error, loading] = useRestaurants()
    let progressBarContext = useContext(ProgressBarContext)
    useEffect(() => {
        progressBarContext.setLoading(loading)
    },[loading])

    return (
        <FlatList 
            data={restaurants}
            renderItem={({item: {name}}) => {
                return <Text>{name}</Text>
            } }
            keyExtractor = {(restaurant) => restaurant.id.toString()}/>
    )
}