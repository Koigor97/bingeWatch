/**
 * useAppwrite is a custom hook that helps manage data fetching using Appwrite.
 *
 * Explanation:
 * 1. You provide a function (fn) that knows how to fetch data (from Appwrite or elsewhere),
 *    along with any parameters it needs.
 * 2. The hook manages three pieces of state: the fetched data, a loading flag, and an error message.
 * 3. When the component mounts, it automatically calls your fetching function (unless you set skip to true).
 * 4. While waiting for the data, it sets a loading state to true.
 * 5. If the fetch fails, it saves the error message and shows an alert.
 * 6. It also gives you a refetch function to manually trigger data fetching again with new parameters.
 *
 * This way, you can easily integrate Appwrite calls into your component without having to handle
 * all the boilerplate for loading and error states yourself.
 */

import { Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";

// Define the options that the hook accepts.
interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
    // The function to fetch data, which returns a promise that resolves with type T.
    fn: (params: P) => Promise<T>;
    // Optional parameters to be passed to the fetching function.
    params?: P;
    // Optional flag to skip the automatic fetching when the component mounts.
    skip?: boolean;
}

// Define what the hook returns.
interface UseAppwriteReturn<T, P> {
    // The fetched data; null if not yet fetched.
    data: T | null;
    // True when data is being fetched.
    loading: boolean;
    // Contains an error message if fetching fails; otherwise, null.
    error: string | null;
    // A function to manually trigger the fetch with new parameters.
    refetch: (newParams: P) => Promise<void>;
}

// The useAppwrite hook implementation.
export const useAppwrite = <T, P extends Record<string, string | number>>({
                                                                              fn,
                                                                              params = {} as P,
                                                                              skip = false,
                                                                          }: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
    // 1. Set up state to store data, loading status, and errors.
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(!skip);
    const [error, setError] = useState<string | null>(null);

    // 2. Define a function to fetch data using the provided function (fn).
    const fetchData = useCallback(
        async (fetchParams: P) => {
            // Indicate that the fetching process has started.
            setLoading(true);
            setError(null);

            try {
                // Try to fetch data with the provided parameters.
                const result = await fn(fetchParams);
                // Save the fetched result.
                setData(result);
            } catch (err: unknown) {
                // If an error occurs, extract a message and update the error state.
                const errorMessage =
                    err instanceof Error ? err.message : "An unknown error occurred";
                setError(errorMessage);
                // Show an alert with the error message.
                Alert.alert("Error", errorMessage);
            } finally {
                // In any case, stop the loading indicator.
                setLoading(false);
            }
        },
        [fn] // Only recreate fetchData if the fetching function changes.
    );

    // 3. Automatically call fetchData when the component mounts, unless skip is true.
    useEffect(() => {
        if (!skip) {
            fetchData(params);
        }
    }, []); // Run only once when the component mounts.

    // 4. Provide a refetch function that can be called with new parameters.
    const refetch = async (newParams: P) => await fetchData(newParams);

    // 5. Return the data, loading flag, error message, and refetch function.
    return { data, loading, error, refetch };
};
