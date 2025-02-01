import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native'
import React from 'react'
import {useGlobalContext} from "@/context/globalProviderContext";
import {Redirect, Slot} from "expo-router";

const AppLayout = () => {
    const { loading, isLoggedIn } = useGlobalContext()

    if (loading) {
        return (
            <SafeAreaView
                className="bg-black-100 h-full justify-center items-center"
            >
                <ActivityIndicator size="large" className="text-secondary" />
            </SafeAreaView>
        )
    }

    if (!isLoggedIn) return <Redirect href={'/sign-in'} />

    return <Slot />
}
export default AppLayout
