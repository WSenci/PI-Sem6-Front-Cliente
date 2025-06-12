import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Platform } from 'react-native';
import { useEffect, useState } from "react";
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
  // useEffect(() => {
  //   async function changeScreenOrientation() {
  //     if (Platform.OS !== 'web') {
  //       await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  //     }
  //   }
  //   changeScreenOrientation();
  // }, []);
  // ctrl + k c -> comentar
  // ctrl + k u -> descomentar

  const [scanned, setScanned] = useState(false)
  const [perm, reqPerm] = useCameraPermissions()

  useEffect(()=> {
    reqPerm()
  }, [])

  const handledQRCodeScanned = ({data}: any) => {
    setScanned(true)
    router.navigate("/cardapio")
    console.log(`${data}`)
  }

  if(!perm?.granted){
    return(
      <View>
        <Text>Permissão da câmera não concedida.</Text>
      </View>
    )
  }

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
        <CameraView style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handledQRCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        facing='front'
        />
        {
          scanned && (
            <Text style={styles.rescan} onPress={()=> setScanned(false)}>
              Toque para escanear novamente.
            </Text>
          )
        }
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
  camera:{
    width: 200,
    height: 200
  },
  rescan:{
    margin: 20,
    textAlign: 'center',
    color: 'blue',
  }
});
