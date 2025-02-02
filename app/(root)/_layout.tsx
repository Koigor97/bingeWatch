import { SafeAreaView, ActivityIndicator } from 'react-native';
import React from 'react';
import { useGlobalContext } from '@/context/globalProviderContext';
import { Redirect, Slot } from 'expo-router';

/**
 * AppLayout Component
 *
 * This component serves as the layout wrapper for the application.
 * It:
 * - Displays a loading indicator while authentication status is being determined.
 * - Redirects unauthenticated users to the sign-in page.
 * - Renders the child components dynamically based on the current route.
 */
const AppLayout = () => {
    // Retrieve global state values (loading and authentication status)
    const { loading, isLoggedIn } = useGlobalContext();

    /**
     * Display a loading indicator while the authentication status is being determined.
     * Prevents rendering of other components until the check is complete.
     */
    if (loading) {
        return (
            <SafeAreaView className="bg-black-100 h-full justify-center items-center">
                <ActivityIndicator size="large" className="text-secondary" />
            </SafeAreaView>
        );
    }

    /**
     * If the user is not logged in, redirect them to the sign-in page.
     * Ensures that only authenticated users can access the application.
     */
    if (!isLoggedIn) return <Redirect href={'/sign-in'} />;

    /**
     * Render the current route's content dynamically.
     * The <Slot /> component acts as a placeholder for nested routes.
     */
    return <Slot />;
}

export default AppLayout;
