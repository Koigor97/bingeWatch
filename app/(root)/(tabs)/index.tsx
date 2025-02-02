import {Image, SafeAreaView, Text, View, TouchableOpacity, FlatList, ActivityIndicator} from "react-native";
import images from "@/constants/images";
import Search from "@/component/Search";
import {useEffect, useState} from "react";
import {fetchMovie} from "@/lib/tmdb";
import {Card} from "@/component/MovieCard";
import {useGlobalContext} from "@/context/globalProviderContext";
import {router} from "expo-router";

/**
 * Index Component - Displays a list of movies fetched from an API.
 * Uses React Native components to create a scrollable movie list with a search bar.
 */
export default function Index() {
    // State to store movies fetched from the API
    const [movies, setMovies] = useState([]);
    // Global context to get loading state and user details
    const {loading, user} = useGlobalContext()

    /**
     * Fetches movie data from the API and updates state.
     */
    useEffect(() => {
        async function movieData () {
            const {results} = await fetchMovie()
            setMovies(results)
        }

        movieData()
    }, [])

    /**
     * Handles navigation to the movie details page.
     * @param {string} id - The ID of the selected movie.
     */
    const handlePress = (id: string) => router.push(`/details/${id}`);

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={movies} // List of movies to display
                numColumns={2} // Display movies in 2 columns
                renderItem={({ item }) => (
                    // Renders each movie as a Card component
                    // @ts-ignore
                    <Card item={item} onPress={() => handlePress(item.id)} />
                )}
                // @ts-ignore
                keyExtractor={(item) => item.id.toString()} // Unique key for each movie
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex flex-row gap-4 item-center justify-center bg-primary"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        // Show loading spinner when data is being fetched
                        <ActivityIndicator size='large' className="text-secondary mt-5" />
                    ) : <Text> No Results </Text> // Display message when no movies are found
                }

                ListHeaderComponent={() => (
                    <View className="px-5">
                        <View className="flex flex-row items-center justify-between mt-5">
                            {/* Displays user avatar and name */}
                            <View className="flex flex-row items-center">
                                <Image source={{uri: user?.avatar}} className="size-12 rounded-full" />

                                <View className="ml-2">
                                    <Text className="text-white font-poppmedium text-base">{user?.name}</Text>
                                </View>
                            </View>

                            {/* App logo or icon */}
                            <Image source={images.imageIcon} className="size-12" />
                        </View>

                        {/* Search Bar Component */}
                        <Search />

                        {/* Header for movie section */}
                        <View className="my-5">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-xl font-poppsemibold text-gray-100">
                                    Movies
                                </Text>
                                <TouchableOpacity>
                                    <Text className="text-base font-poppsemibold text-gray-100">
                                        See all
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />

        </SafeAreaView>
    );
}
