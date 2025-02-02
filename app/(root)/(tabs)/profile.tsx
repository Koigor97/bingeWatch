/**
 * profile.tsx
 *
 * Overview:
 * 1. Presents user information (avatar, name) at the top.
 * 2. Lets users log out via a “Logout” button that calls Appwrite’s userLogout function.
 * 3. Displays a list of “settings” items (e.g., change password, notifications, etc.)
 *    by mapping over the settings array and rendering a SettingsItem for each entry.
 *
 * Summary:
 * - This screen is the “Profile” section of your app.
 * - The user’s avatar and name appear at the top.
 * - A “Logout” option logs the user out and refreshes the context so the app knows they’re logged out.
 * - The “SettingsItem” component displays each item in a simple, touchable row with an icon and text.
 */

import { View, Text, SafeAreaView, ScrollView, Image, ImageSourcePropType, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import icons from "@/constants/icons";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/context/globalProviderContext";
import { userLogout } from "@/lib/appwrite";

/**
 * Props for the SettingsItem component.
 */
interface SettingItemProps {
    icon: ImageSourcePropType;
    textStyle?: string;
    title: string;
    showIcon?: boolean;
    onPress?: () => void;
}

/**
 * SettingsItem
 * A reusable row component that shows:
 * - An icon on the left
 * - A title in the middle
 * - An optional arrow icon on the right
 * - A touchable area to respond to user presses
 */
const SettingsItem = ({ icon, title, onPress, textStyle, showIcon = true }: SettingItemProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-black-100 flex flex-row items-center justify-between p-3 rounded-md"
        >
            <View className="flex flex-row items-center gap-3">
                <Image source={icon} className="size-6" />
                <Text className={`${textStyle} text-lg font-poppmedium text-gray-100`}>
                    {title}
                </Text>
            </View>

            {showIcon && <Image source={icons.rightArrow} className="size-5" />}
        </TouchableOpacity>
    );
};

/**
 * Profile
 * The main profile screen:
 * 1. Shows the user’s avatar (from user?.avatar) and greets them by name.
 * 2. Has a Logout button that calls userLogout. On success, it shows an alert and refetches user data.
 * 3. Renders a list of setting items using the SettingsItem component.
 */
const Profile = () => {
    // Pull user data and a refetch function from global context
    const { user, refetch } = useGlobalContext();

    /**
     * handleLogout
     * - Calls the userLogout function from Appwrite.
     * - Displays an Alert on success or failure.
     * - On success, triggers refetch to update global state (setting user to null).
     */
    async function handleLogout() {
        const result = await userLogout();

        if (result) {
            Alert.alert("Success", "Your account has been logged out.");
            await refetch();
        } else {
            Alert.alert("Error", "An error occurred while logging out.");
        }
    }

    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >
                {/* Top row with avatar, greeting, and Logout button */}
                <View className="mt-5 flex flex-row items-center justify-between">
                    <View className="flex flex-row items-center gap-4">
                        <Image
                            source={{ uri: user?.avatar }}
                            resizeMode="contain"
                            style={{width: 40, height: 40}}
                            className="rounded-md"
                        />
                        <Text className="text-white text-xl">
                            Hello <Text className="font-poppmedium text-secondary">{user?.name?.split(" ")[0]}</Text>
                        </Text>
                    </View>

                    <TouchableOpacity
                        className="flex flex-row items-center gap-2"
                        onPress={handleLogout}
                    >
                        <Image
                            source={icons.logout}
                            resizeMode="contain"
                            className="size-9"
                        />
                        <Text className="text-gray-100">Logout</Text>
                    </TouchableOpacity>
                </View>

                {/* Settings list */}
                <View className="mt-5 pt-5 border-t-2 border-t-black-200 flex flex-col gap-4">
                    {settings.map((setting: SettingItemProps, index) => (
                        // Use index or a unique ID as the key
                        <SettingsItem
                            key={index}
                            icon={setting.icon}
                            title={setting.title}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
