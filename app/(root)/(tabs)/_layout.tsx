/**
 * _layout.tsx Explanation:
 *
 * This file sets up the tab-based navigation layout using Expo Router’s <Tabs> component.
 *
 * 1. The TabIcon component:
 *    - Receives props for whether the tab is currently focused, an icon image, and a title.
 *    - Renders the icon with a different tint color if it's focused, along with a small text label.
 *
 * 2. The TabsLayout component:
 *    - Wraps your screens (like "Home", "Search", and "Profile") inside a tab navigator.
 *    - Sets global visual styles for the tab bar (background color, border, height).
 *    - For each screen, defines how the tab icon and title are displayed.
 *    - When users tap on a tab, it shows the corresponding screen (e.g., "index" → Home).
 *    - The "headerShown: false" option hides the default top bar to give you a custom UI.
 *
 * In simpler terms, this file:
 * - Creates a bottom navigation bar with multiple tabs.
 * - Each tab is a "Screen" that leads to a different part of your app (Home, Search, Profile).
 * - The TabIcon component updates colors and labels to indicate which tab is active.
 *
 * Summary:
 * - The <Tabs> component is from Expo Router, and it controls the tab-based navigation.
 * - Each <Tabs.Screen> is a section of your app, like a page. You give it a name, an icon, and
 *   any special options (like hiding the header).
 * - TabIcon just styles the icon and label for each tab.
 */

import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import icons from '@/constants/icons';

/**
 * Renders a single tab icon with label, changing color if focused.
 */
function TabIcon({ focused, icon, title }: { focused: boolean; icon: any; title: string }) {
    return (
        <View className="flex flex-col flex-1 mt-3 items-center">
            <Image
                source={icon}
                resizeMode={"contain"}
                tintColor={focused ? "#FF9C01" : "#CDCDE0"}
                className="size-6"
            />

            <Text
                className={`text-xs w-full text-center mt-1 ${
                    focused ? "text-secondary font-poppmedium" : "text-gray-100 font-poppregular"
                }`}
            >
                {title}
            </Text>
        </View>
    );
}

/**
 * Defines the main tab navigator layout, specifying each screen and its tab icon.
 */
const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#161622',
                    position: 'absolute',
                    borderTopColor: "#232533",
                    borderTopWidth: 2,
                    minHeight: 70,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home" />
                    ),
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.send} title="Search" />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.people} title="Profile" />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
