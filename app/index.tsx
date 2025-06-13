import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Platform, Modal, TextInput, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from "react";
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ScreenOrientation from "expo-screen-orientation";
import { useFocusEffect } from '@react-navigation/native';
import { useInstance } from '../helpers/instanceContext';

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
  const { instance, setInstance } = useInstance()
  const [modalVisible, setModalVisible] = useState(false)
  const [qrCodeVisible, setQrCodeVisible] = useState(false)
  const [numeroMesa, setNumeroMesa] = useState('')

  useFocusEffect(
    useCallback(() => {
      if (instance === null) {
        setModalVisible(true)
      }
    }, [])
  )

  function addMesa() {
    setInstance({ cod_mesa: numeroMesa, cod_comanda: null })
    setModalVisible(false)
  }

  useEffect(() => {
    reqPerm()
  }, [])

  const handledQRCodeScanned = ({ data }: any) => {
    if (modalVisible == false && instance !== null && data !== undefined) {
      setScanned(true)
      setInstance({ cod_mesa: instance.cod_mesa, cod_comanda: data })
      router.navigate("/cardapio")
      console.log(`${data}`)
    }
    setQrCodeVisible(false)
  }

  if (!perm?.granted) {
    return (
      <View>
        <Text>Permissão da câmera não concedida.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {!qrCodeVisible ?
        (
          <TouchableOpacity onPress={() => setQrCodeVisible(true)} style={styles.lerComanda}>
            <Text style={{ color: "#fff" }}>Ler comanda</Text>
          </TouchableOpacity>
        )
        :
        (
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
                <Text style={styles.rescan} onPress={() => setScanned(false)}>
                  Toque para escanear novamente.
                </Text>
              )
            }
            <TouchableOpacity onPress={() => setQrCodeVisible(false)} style={[styles.lerComanda, {backgroundColor: 'red'}]}>
            <Text style={{ color: "#fff" }}>Cancelar</Text>
          </TouchableOpacity>
          </View>
        )
      }
      <Modal visible={modalVisible} animationType="fade" transparent={false} >
        <View style={styles.modalContainer} >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>Digite o número da mesa</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            placeholder="Nº Mesa"
            value={numeroMesa}
            onChangeText={setNumeroMesa}
          />
          <Button title="ADD MESA" onPress={() => addMesa()} color="green" />
        </View>
      </Modal>


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
  camera: {
    width: 200,
    height: 200
  },
  rescan: {
    margin: 20,
    textAlign: 'center',
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: "40%",
    height: 100,
    fontSize: 70,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  lerComanda: {
    width: 200,
    marginTop: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: "center",
  },
});
