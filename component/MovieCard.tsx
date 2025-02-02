import icons from "@/constants/icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

/**
 * TrendingCard Component
 *
 * This component represents a movie card for trending movies.
 * It displays the movie's poster, title, and rating.
 *
 * @param {Object} item - Component properties
 * @param {Function} [onPress] - Callback function triggered when the card is pressed
 */
export const TrendingCard = ({ onPress, item }: any) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex flex-col items-start w-60 h-80 relative"
        >
            {/* Container for the movie poster and title */}
            <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
                {/* Display movie poster if available, otherwise fallback to a default */}
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item?.poster_path}` }}
                    className="size-full"
                />
                {/* Display movie title */}
                <Text
                    className="text-xl font-poppextrabold text-white"
                    numberOfLines={1}
                >
                    {item?.title}
                </Text>
            </View>

            {/* Movie rating badge displayed in the top-right corner */}
            <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
                <Image source={icons.star} className="size-3.5" />
                <Text className="text-xs font-poppbold text-primary-300 ml-1">
                    {item?.vote_average?.toFixed(1)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

/**
 * Card Component
 *
 * This component represents a general-purpose movie card.
 * It displays the movie poster, title, and rating.
 *
 * @param {Function} [onPress] - Callback function triggered when the card is pressed
 * @param {Object} item - Movie data object

 */
export const Card = ({ item, onPress }: any) => {
    return (
        <TouchableOpacity
            className="flex flex-col gap-2 flex-1 w-full mt-5 py-4 rounded-md items-center bg-black-200"
            onPress={onPress}
        >
            {/* Container for the movie poster */}
            <View className="flex flex-col gap-2">
                {/* Display movie poster if available */}
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item?.poster_path}` }}
                    className="rounded-md"
                    style={{ width: 150, height: 200 }}
                    resizeMode="contain"
                />

                {/* Display movie title */}
                <View className="flex flex-col mt-2">
                    <Text className="text-base font-poppbold text-gray-100">
                        {item?.title}
                    </Text>
                </View>
            </View>

            {/* Display movie rating if available */}
            <View className="flex flex-row items-center px-2 p-1 gap-1">
                <Image source={icons.star} style={{ width: 15, height: 15 }} />
                <Text className="text-sm font-poppbold text-gray-100 ml-0.5">
                    {item?.vote_average?.toFixed(1)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
