import {Account, Avatars, Client, OAuthProvider} from "react-native-appwrite";
import * as Linking from "expo-linking";
import {openAuthSessionAsync} from "expo-web-browser";


/**

 In-Depth Explanation:

 ** Setup and Initialization:
 ••• Imports necessary modules from "react-native-appwrite" for account
    management and avatar generation, as well as modules from "expo-linking"
    and "expo-web-browser" for handling URL redirection and in-app browser sessions.

 ••• Defines a configuration object containing the platform identifier,
    Appwrite endpoint, and project ID (sourced from environment variables).

 ••• Creates an Appwrite client instance and configures it using the
    provided project ID, endpoint, and platform.

 ••• Instantiates services for managing avatars and user accounts using the
    configured client.

 ** Function: userLogin
 ••• Generates a redirect URI using expo-linking. This URI acts as
    the callback URL for the OAuth process.

 ••• Requests an OAuth2 token from Appwrite's Account service by
    specifying Google as the provider and providing the redirect URI.

 ••• Opens an authentication session in the mobile browser using
    the obtained OAuth URL, allowing the user to sign in via Google.

 ••• After the session, parses the resulting URL to extract required
    query parameters ("userId" and "secret").

 ••• Uses these parameters to create a new user session through
    the Appwrite Account service.

 ••• Returns the session object on success; if any step fails,
    logs the error and returns false.

 ** Function: userLogout
 ••• Deletes the current user session by calling the deleteSession
    method on the Account service.

 ••• Returns true if the session is successfully deleted,
    otherwise logs the error and returns false.

 ** Function: getProfile
 ••• Retrieves the current user's profile data from Appwrite's Account service.

 ••• If the user data is successfully obtained, calculates the user's
    avatar initials using the Avatars service.

 ••• Combines and returns the user data with the computed avatar as an object.

 ••• Returns null if user data retrieval fails.

 */


export const config = {
    platform: "com.koirah_technologies.bingewatch",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();
console.log(config.endpoint, "\n", config.projectId)


client
    .setProject(config.projectId!)
    .setEndpoint(config.endpoint!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);

/**
 * Initiates the login process using Google's OAuth2.
 *
 * Flow:
 * 1. Generate a redirect URI that will be used as the callback after authentication.
 * 2. Request an OAuth2 token from the Account service using Google as the provider.
 * 3. Open an in-app browser session with the OAuth URL for user authentication.
 * 4. Parse the returned URL from the session to extract "userId" and "secret".
 * 5. Create a user session with these parameters.
 * 6. Return the session if successful; otherwise, log the error and return false.
 *
 * @returns {Promise<object|boolean>} Session object on success, or false on failure.
 */
export async function userLogin() {
    try {
        // Step 1: Create a redirect URI for OAuth callback
        const redirectUri = Linking.createURL("/")

        // Step 2: Request an OAuth2 token using Google as the provider
        const response = account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri,
        )

        if (!response) {
            throw new Error("Could not authenticate with Google");
        }

        // Step 3: Open an in-app browser session for authentication
        const mobileBrowserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri,
        )

        if (mobileBrowserResult.type !== "success") {
            throw new Error("Could not authenticate with Google");
        }

        // Step 4: Parse the callback URL to extract query parameters
        const url = new URL(mobileBrowserResult.url)
        const userId = url.searchParams.get("userId")?.toString();
        const secret = url.searchParams.get("secret")?.toString();

        if (!userId || !secret) {
            throw new Error("Could not authenticate with Google");
        }

        // Step 5: Create a user session with the extracted parameters
        const session = await account.createSession(userId, secret);

        if (!session) {
            throw new Error("Failed to create session with Google");
        }

        // Step 6: Return the session object
        return session;

    } catch (error) {
        console.log(error);
        return false;
    }
}


/**
 * Logs out the current user by deleting the active session.
 *
 * Flow:
 * 1. Delete the "current" session via the Account service.
 * 2. Return true if successful; if an error occurs, log it and return false.
 *
 * @returns {Promise<boolean>} True on successful logout, or false on failure.
 */
export async function userLogout() {
    try {
        // Step 1: Delete the current session
        await account.deleteSession("current")
        // Step 2: Return success status
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


/**
 * Retrieves the current user's profile data, including a computed avatar.
 *
 * Flow:
 * 1. Fetch user data from the Account service.
 * 2. If valid user data is returned, compute the avatar initials using the user's name.
 * 3. Combine the user data with the computed avatar and return the resulting object.
 * 4. If an error occurs or user data is invalid, log the error and return null.
 *
 * @returns {Promise<object|null>} An object containing user data and avatar string, or null on failure.
 */
export async function getProfile() {
    try {
        // Step 1: Retrieve user data
        const userData = await account.get()

        if (userData.$id) {
            // Step 2: Compute the user's avatar initials
            const userAvatar = avatar.getInitials(userData.name)
            // Step 3: Return user data along with the computed avatar
            return {...userData, avatar: userAvatar.toString()}
        }

    } catch (error) {
        console.error(error);
        return null;
    }
}
