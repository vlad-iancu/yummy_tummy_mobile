import React from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import EllipsisText from '../utils/EllipsisText'

interface RestaurantItemProps {
    name: string,
    thumbnailUrl?: string
}
export default function RestaurantItem({ name, thumbnailUrl }: RestaurantItemProps) {
    return (
        <View style={styles.itemContainer}>
            <FastImage source={{ uri: thumbnailUrl, cache: "web" }} style={styles.thumbnail} />
            <View style={styles.fieldContainer}>
                <EllipsisText style={styles.textLarge} length={20} text={name} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        margin: 5,
        shadowColor: "#DDDDDD",
        elevation: 2,
        shadowOpacity: 0.3,
        backgroundColor: "white"
    },
    fieldContainer: {

    },
    thumbnail: {
        width: 128,
        height: 128,
        borderRadius: 8,
        margin: 10,
        shadowColor: "#DDDDDD",
        elevation: 2,
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    textLarge: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        marginTop: 10,
    },
})