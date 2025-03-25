import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Layout from './components/Layout';
import NavBar from './components/NavBar';
import OptionBar from './components/OptionBar';

export default function App() {
  return (
    <View style={styles.container}>
      <Layout>
        <NavBar texto={'Cardápio'}></NavBar>
        <OptionBar text1={'Lanche'} text2={'Bebidas'} text3={'Acompanhamentos'}></OptionBar>
        <NavBar texto={'Cardápio'}></NavBar>
      </Layout>
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
