import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
  useEffect(() => {
    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    changeScreenOrientation();
}, []);

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
