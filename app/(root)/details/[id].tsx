import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { fetchMovie } from "@/lib/tmdb";
import icons from "@/constants/icons";

/**
 * MovieDetail Component
 *
 * This component fetches and displays detailed information about a specific movie.
 * It:
 * - Retrieves the movie ID from the URL parameters.
 * - Fetches movie details from the API.
 * - Displays a loading indicator while fetching.
 * - Shows movie details once the data is available.
 * - Handles errors and missing movie data.
 */
const MovieDetail = () => {
    // Extract the movie ID from the search parameters
    const { id } = useLocalSearchParams();

    // State to hold the movie details
    const [movie, setMovie] = useState(null);
    // State to manage the loading status
    const [loading, setLoading] = useState(true);

    console.log(typeof id); // Debugging: Log the type of `id`

    /**
     * Function to find a movie by its ID from a list of movies.
     * @param {Array} movies - The array of movies fetched from the API.
     * @param {string | string[]} id - The ID of the movie to search for.
     * @returns {Object | undefined} - The movie object if found, otherwise undefined.
     */
    const filterMovieById = (movies: any[], id: string | string[]) => {
        return movies.find((movie) => movie.id.toString() === id);
    };

    useEffect(() => {
        /**
         * Function to fetch movie details from the API.
         * Uses the movie ID to get specific movie data.
         */
        const fetchMovieDetails = async () => {
            if (!id) return; // Ensure the ID exists before making the API call

            try {
                // Fetch movies from the API
                const { results } = await fetchMovie();
                // Find the movie that matches the ID
                const filteredMovie = filterMovieById(results, id);
                // Store the movie data in state
                setMovie(filteredMovie);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching completes
            }
        };

        fetchMovieDetails();
    }, [id]); // Re-run the effect when the ID changes

    // Show a loading spinner while fetching movie data
    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-[#1a1a2e]">
                <ActivityIndicator size="large" color="#9b59b6" />
            </View>
        );
    }

    // Display a message if no movie is found
    if (!movie) {
        return (
            <View className="flex-1 justify-center items-center bg-[#1a1a2e]">
                <Text className="text-white text-lg">Movie details not available.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="flex-1 px-4 py-6">
                <View className="flex flex-col">
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.push('/')}
                        className="mb-4 flex flex-row items-center"
                    >
                        <Image source={icons.backArrow} className="w-6 h-6" />
                        <Text className="text-secondary text-lg font-poppbold">Back</Text>
                    </TouchableOpacity>

                    {/* Movie Title */}
                    <Text className="text-3xl font-poppbold font-bold text-white">
                        {movie?.title || "Unknown Title"}
                    </Text>

                    {/* Release Year */}
                    <View className="flex-row items-center mt-2">
                        <Text className="text-gray-400 text-lg">
                            {movie?.release_date?.split('-')[0] || "N/A"}
                        </Text>
                    </View>
                </View>

                {/* Movie Poster */}
                <View className="flex-row mt-6">
                    <Image
                        source={{
                            uri: movie?.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://via.placeholder.com/150",
                        }}
                        className="w-full h-80 rounded-lg"
                        resizeMode="cover"
                    />
                </View>

                {/* Movie Overview */}
                <View className="mt-6">
                    <Text className="text-gray-300 text-lg font-poppmedium">Overview</Text>
                    <Text className="text-gray-200 mt-2 font-poppregular">
                        {movie?.overview || "No overview available."}
                    </Text>
                </View>

                {/* Additional Movie Details */}
                <View className="mt-6 space-y-4">
                    <Text className="text-gray-200 text-lg font-poppmedium">Release Date</Text>
                    <Text className="text-gray-400 font-poppmedium">
                        {movie?.release_date || "N/A"}
                    </Text>
                    <Text className="text-gray-200 text-lg font-poppmedium">Languages</Text>
                    <Text className="text-gray-400">
                        {movie?.original_language}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MovieDetail;
