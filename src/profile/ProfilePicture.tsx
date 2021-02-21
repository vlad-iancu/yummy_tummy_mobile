import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import RippleButton from '../utils/RippleButton'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { } from 'react-native-device-info'
type Photo = {
    uri?: string
    fileName?: string,
    type?: string
}

interface ProfilePictureProps {
    uri?: string,
    onImageChange
    : (photo: Photo) => void
}

export default function ProfilePicture({ uri, onImageChange }: ProfilePictureProps) {
    const pickFromGallery = () => {
        launchImageLibrary({ mediaType: "photo" }, response => {
            if (!response.didCancel)
                onImageChange(response)

        })
    }
    const pickFromCamera = () => {
        launchCamera({ mediaType: "photo" }, response => {
            if(response.errorCode) {
                console.log(console.log("Camera error:" + response.errorMessage))
            }
            if (!response.didCancel) {
                onImageChange(response)
            }
        })
    }
    return (
        <>
            <FastImage source={{
                uri: uri,
                priority: "normal",
                cache: "web"
            }} style={styles.photo} />
            <View style={styles.container}>
                <RippleButton duration={300} rippleColor="#DDDDDD" onPress={pickFromGallery} style={styles.button}>
                    <View style={styles.centeredView}>
                        <FontAwesomeIcon name="image" color="white" size={20} />
                        <Text style={styles.text}>Gallery</Text>
                    </View>
                </RippleButton>
                <RippleButton duration={300} rippleColor="#DDDDDD" onPress={pickFromCamera} style={styles.button}>
                    <View style={styles.centeredView}>
                        <AntIcon name="camera" color="white" size={20} />
                        <Text style={styles.text}>Camera</Text>
                    </View>
                </RippleButton>
            </View>
        </>
    )

}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
    },
    photo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        shadowColor: "#444444",
        shadowRadius: 50,
        elevation: 5,
        margin: 15,
    },
    button: {
        alignItems: "center",
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: "royalblue",
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 10,
    },
    text: {
        color: "white",
    },
})