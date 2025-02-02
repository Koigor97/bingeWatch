import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";

/**
 * Search Component
 *
 * This component allows users to search for movies or shows. It includes:
 * - A text input field for entering search queries
 * - A debounce function to prevent unnecessary API calls on every keystroke
 * - A filter button (currently non-functional) for future enhancements
 */
const Search = () => {
    // Retrieve search query parameter from the URL (if available)
    const params = useLocalSearchParams<{ query?: string }>();

    // State to store the search input value
    const [search, setSearch] = useState(params.query);

    /**
     * Debounced function to delay search execution by 500ms
     * Helps to prevent excessive re-renders or API calls on every keystroke
     */
    const debouncedSearch = useDebouncedCallback((text: string) => {
        router.setParams({ query: text }); // Update URL parameters with the search text
    }, 500);

    /**
     * Handles user input in the search bar
     * Updates the state and triggers the debounced search function
     *
     * @param {string} text - The search input text
     */
    function handleSearch(text: string) {
        setSearch(text); // Update the state with the new search text
        debouncedSearch(text); // Call the debounced search function
    }

    return (
        // Search bar container with a border, padding, and rounded edges
        <View className="border border-gray-100 flex flex-row items-center justify-between w-full px-5 rounded-lg mt-5 py-4">

            {/* Left side: Search icon and input field */}
            <View className="flex-1 flex flex-row items-center justify-start z-50">
                {/* Search icon */}
                <Image source={icons.search} className="size-5" />

                {/* Search input field */}
                <TextInput
                    value={search} // Controlled input value
                    onChangeText={handleSearch} // Handles user input
                    placeholder="Search for movie/show" // Placeholder text
                    className="text-sm font-poppregular text-white ml-2 flex-1 "
                />
            </View>

            {/* Right side: Filter button (currently unused, placeholder for future feature) */}
            <TouchableOpacity>
                <Image source={icons.filter} className="size-5" />
            </TouchableOpacity>
        </View>
    );
}

export default Search;
