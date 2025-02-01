import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-xl text-green-800 font-bold mb-3 font-poppbold">Links to the different Pages</Text>
        <Link href={'/sign-in'}>Sign In</Link>
        <Link href={'/search'}>Search</Link>
        <Link href={'/details/1'}>Details</Link>
        {/*<Link href={'/sign-in'}>Sign In</Link>*/}
    </View>
  );
}
