import React, { useContext, useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import EncryptedStorage from 'react-native-encrypted-storage'
import { Alert, Button } from 'react-native';
import { Text } from 'react-native';
import { ProgressBarContext } from '../../App';

interface HomeProps {
    navigation: StackNavigationProp<any, any>
}

export default function Home({ navigation }: HomeProps) {
    return (
        <Button title="Go back to login" onPress={() => navigation.navigate("Login")} />
    )
}