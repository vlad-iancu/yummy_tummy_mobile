import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

interface EllipsisTextProps {
    text?: string,
    length: number,
    style: StyleProp<TextStyle>
}
export default function EllipsisText({length, text, style}: EllipsisTextProps) {
    if(!text) {
        return (<Text></Text>)
    }
    return (
        <Text style={style}>
            {text.length > length ? text.substring(0, length).concat("...") : text}
        </Text>
    )
}