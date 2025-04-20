import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from "react";
// import { useCameraDevices, Camera, useCameraDevice } from 'react-native-vision-camera'
// import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
    useEffect(() => {
      async function changeScreenOrientation() {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
      changeScreenOrientation();
  }, []);
  // ctrl + k c -> comentar
  // ctrl + k u -> descomentar

  const [permission, setPermission] = useState(false)
  // const devices = useCameraDevices()
  // const device = devices

  return (
    <View style={styles.container}>
      <Text>APP PI 6º SEMESTRE ADS - CLIENTE</Text>
      <Button
        onPress={() => { router.navigate("/cardapio") }}
        title="Cardapio"
        color="#841584"
      />
      <Button
        onPress={() => { router.navigate("/carrinho") }}
        title="Carrinho"
        color="#841584"
      />

      <View>
        qr-code
      </View>

      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
