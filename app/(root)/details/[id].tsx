import {View, Text} from 'react-native'
import React from 'react'
import {useLocalSearchParams} from "expo-router";

const MovieShowDetails = () => {
    const {id} = useLocalSearchParams()

    return (
        <View>
            <Text>MovieShowDetails: {id}</Text>
        </View>
    )
}
    export default MovieShowDetails
