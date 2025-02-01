import {SplashScreen, Stack} from "expo-router";
import { useFonts } from "expo-font";
import "../global.css"
import {useEffect} from "react";
import GlobalProvider from "@/context/globalProviderContext";


// Prevent the splash screen from auto-hiding before
// asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  // Loading the fonts the app would use from the fonts
  // folder in the asset folder
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {

    // if the fonts failed to load, throw an error
   if(error) throw error;

   // if the fonts loaded successfully, hide the splash screen
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // if there's fontLoaded is empty return nothing
  if (!fontsLoaded) return null;

  return (
      <GlobalProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </GlobalProvider>
  )
}
