/**
 * This file is responsible for fetching movie data from The Movie Database (TMDb) API.
 * It defines constants for the API URL and authentication, as well as a function to retrieve popular movies.
 */

export const API_BASE_URL = "https://api.themoviedb.org/3"; // Base URL for TMDb API

const API_KEY = "get your key";
// API Key for authentication (Use environment variables for security)

/**
 * Configuration object for API requests.
 * Specifies HTTP method (GET) and authentication headers.
 */
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`, // Authentication using Bearer Token
    }
};

/**
 * Fetches a list of popular movies from TMDb API.
 *
 * @returns {Promise<any>} - A promise that resolves to the JSON response containing movie data.
 *
 * Example Response Structure:
 * {
 *   "page": 1,
 *   "results": [
 *      {
 *          "id": 12345,
 *          "title": "Example Movie",
 *          "overview": "This is a movie description.",
 *          "release_date": "2024-01-01",
 *          "poster_path": "/path/to/image.jpg"
 *      }
 *   ],
 *   "total_pages": 100,
 *   "total_results": 1000
 * }
 */
export async function fetchMovie() {
    try {
        const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        // Endpoint to get popular movies

        const response = await fetch(endpoint, API_OPTIONS);
        // Fetching data from the API

        if (!response.ok) {
            // If response is not successful, throw an error
            throw new Error(`Failed to fetch movies from API: ${response.status}`);
        }

        return await response.json(); // Convert response to JSON and return it
    } catch (error) {
        console.error(`Error fetching movies: ${error}`); // Log error if fetching fails
    }
}
