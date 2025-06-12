import { Slot } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Layout() {
    useEffect(() => {
    async function changeScreenOrientation() {
      if (Platform.OS !== 'web') {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
    }
    changeScreenOrientation();
  }, []);
    return (
        <>
            <Slot />
        </>
    )
}