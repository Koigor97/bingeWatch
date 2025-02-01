/**
 * GlobalProviderContext Explanation:
 *
 * 1. Import necessary React functions and custom hooks.
 *
 * 2. Define a "User" interface to structure user data (id, username, email, avatar).
 *
 * 3. Define a "GlobalContextType" interface that outlines the global state, including:
 *    - user: The current user's data (or null if not logged in).
 *    - isLoggedIn: A boolean indicating whether a user is logged in.
 *    - loading: A flag to indicate if the profile is being fetched.
 *    - refetch: A function to manually refresh user data.
 *
 * 4. Create a GlobalContext using React's createContext, with an undefined default.
 *
 * 5. Define the GlobalProvider component that:
 *    - Uses the useAppwrite hook to fetch the user profile (via getProfile).
 *    - Determines if the user is logged in by checking for user data.
 *    - Provides the context values (user, isLoggedIn, loading, refetch) to its children.
 *
 * 6. Export a custom hook, useGlobalContext, which retrieves the context value and throws
 *    an error if used outside a GlobalProvider.
 *
 * Description:
 * This file sets up a global state to hold user information. The GlobalProvider wraps parts of your app
 * and makes user data, login status, and loading state available anywhere. The useGlobalContext hook
 * allows you to easily access this information in any component.
 */

import { createContext, useContext, ReactNode } from 'react';
import { useAppwrite } from "@/hooks/useAppwrite";
import { getProfile } from "@/lib/appwrite";

// Define the structure of a user object.
interface User {
    $id: string;
    username: string;
    email: string;
    avatar: string;
}

// Define the structure for our global context.
interface GlobalContextType {
    user: User | null; // Holds the current user data (null if not logged in).
    isLoggedIn: boolean; // Indicates if a user is logged in.
    loading: boolean; // Indicates whether user data is currently being fetched.
    refetch: (params?: Record<string, string | null>) => Promise<void>; // Function to refresh user data.
}

// Create the GlobalContext with an undefined default value.
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

/**
 * GlobalProvider Component
 *
 * Wraps child components and provides global state related to user authentication.
 */
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    // Use the useAppwrite hook to fetch the user's profile.
    const { data: user, loading, refetch } = useAppwrite({
        fn: getProfile
    });

    // Determine if the user is logged in based on the presence of user data.
    const isLoggedIn = !!user;

    // Log user data for debugging purposes.
    // console.log(JSON.stringify(user, null, 2));

    return (
        // Provide the global context values to all child components.
        // @ts-ignore
        <GlobalContext.Provider value={{ user, isLoggedIn, loading, refetch }}>
            {children}
        </GlobalContext.Provider>
    );
};

/**
 * useGlobalContext Hook
 *
 * A helper hook to easily access the global context.
 * Throws an error if used outside a GlobalProvider.
 *
 * @returns {GlobalContextType} The global context value.
 */
export const useGlobalContext = (): GlobalContextType => {
    // Retrieve the context value.
    const context = useContext(GlobalContext);

    // If no context is found, it means the hook is used outside GlobalProvider.
    if (!context) {
        throw new Error("useGlobalContext must be used within GlobalProvider");
    }

    return context;
};

export default GlobalProvider;
