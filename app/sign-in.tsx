import {View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import images from "@/constants/images";
import icons from "@/constants/icons";
import {userLogin} from "@/lib/appwrite";
import {useGlobalContext} from "@/context/globalProviderContext";
import {Redirect} from "expo-router";


/**

 This file uses several core React Native components:
 * View: A basic container for building UI layouts, similar to a web page's div.
 *
 * Text: Renders displayable text content.
 *
 * SafeAreaView: Ensures content is rendered within the safe display boundaries of a device, avoiding areas like notches.
 *
 * ScrollView: Provides a scrollable container for content that may exceed the screen size.
 *
 * Image: Displays images with options for resizing and scaling.
 *
 * TouchableOpacity: Creates a touchable element that visually responds (fades) when pressed.

 */


export default function SignIn(){
    // getting the needed data to check if the user
    // is logged in, the data is being fetched and
    // the refetch function to automatically refetch the data
    const {isLoggedIn, loading, refetch} = useGlobalContext()

    // if logged in successfully, take user to home screen
    if (!loading && isLoggedIn) return  <Redirect href={"/"} />

    // the OAuth sign in function
    async function handleSignIn() {
        const result = await userLogin();

        if(result) {
            console.log("Login Successfully")
            await refetch();
        } else {
            Alert.alert("Error", "Error logging in");
        }
    }

    return (
        <SafeAreaView className="bg-black-100">
            <ScrollView contentContainerClassName="h-full">

                <View className="mt-16 px-3">
                    <Image
                        source={images.auth_bg2}
                        resizeMode="contain"
                        className="w-full"
                    />
                </View>

                <View className="flex flex-col items-center justify-center gap-1">
                    <Text className="text-white font-popplight uppercase">
                        Get the Popcorn Ready
                    </Text>

                    <Text className="text-white text-center leading-[1.3] text-4xl capitalize font-poppextrabold">
                        Your
                        {" "}
                        <Text className="text-secondary">Movie Journey</Text> {"\n"}
                        Starts Here
                    </Text>
                </View>

                <View className="mt-3 flex flex-col gap-3 p-10">
                    <Text className="text-white text-center font-poppregular">
                        Login to BingeWatch with Google
                    </Text>

                    <TouchableOpacity
                        onPress={handleSignIn}
                        className="flex flex-row items-center justify-center gap-4 bg-secondary shadow-zinc-300 rounded-md py-4"
                    >
                        <Image
                            source={icons.google}
                            resizeMode="contain"
                            className="w-6 h-6"
                        />
                        <Text className="text-lg font-bold">
                            Sign In with Google
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
