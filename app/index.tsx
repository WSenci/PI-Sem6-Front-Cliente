import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';

export default function App() {
  const [numeroMesa, setNumeroMesa] = useState('');

  const iniciarPedido = () => {
    if (numeroMesa.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira o número da mesa.');
      return;
    }
    // Aqui você pode salvar o número da mesa globalmente se quiser
    console.log('Número da mesa:', numeroMesa);
    router.navigate('/cardapio');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.label}>Digite o número da mesa:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 12"
        keyboardType="numeric"
        value={numeroMesa}
        onChangeText={setNumeroMesa}
      />
      <Button
        onPress={iniciarPedido}
        title="Iniciar Pedido"
        color="#27ae60"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});
