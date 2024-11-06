import {  Stack } from "expo-router";
import UserProvider from "../context/GlobalProvider"

import "../global.css";

const RootLayout = () => { 

    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}} />
                <Stack.Screen name="(auth)" options={{headerShown: false}} />
                <Stack.Screen name="(tabs)" options={{headerShown: false}} />
            </Stack>
        </UserProvider>
    )
}

export default RootLayout;