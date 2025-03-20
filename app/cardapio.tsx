import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, BackHandler, TextInput }
from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function CardapioScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('lanches');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showObservation, setShowObservation] = useState(false);
  const [observationText, setObservationText] = useState('');
  const [observationItem, setObservationItem] = useState(null);

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    lockOrientation();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  const MENU_CATEGORIES = [
    {
      id: 'lanches',
      title: 'Lanches',
      items: [
        {
          name: 'X-Burguer',
          price: 'R$ 10,00',
          description: 'Pão, hambúrguer, queijo e molho especial.',
          image: require('../assets/x-burguer.png'),
        },
        {
          name: 'X-Salada',
          price: 'R$ 12,00',
          description: 'Pão, hambúrguer, queijo, alface, tomate e maionese.',
          image: require('../assets/x-salada.png'),
        },
        {
          name: 'X-Bacon',
          price: 'R$ 14,00',
          description: 'Pão, hambúrguer, queijo, bacon e molho especial.',
          image: require('../assets/x-bacon.png'),
        },
        {
          name: 'X-Tudo',
          price: 'R$ 18,00',
          description:
            'Pão, hambúrguer, queijo, bacon, ovo, alface, tomate e maionese.',
          image: require('../assets/x-tudo.png'),
        },
      ],
    },
    {
      id: 'bebidas',
      title: 'Bebidas',
      items: [
        { name: 'Coca-Cola', price: 'R$ 5,00', image: require('../assets/coca-cola.png') },
        { name: 'Guaraná', price: 'R$ 5,00', image: require('../assets/guarana.png') },
        { name: 'Suco de Laranja', price: 'R$ 7,00', image: require('../assets/suco-laranja.png') },
        { name: 'Água', price: 'R$ 3,00', image: require('../assets/agua.png') },
      ],
    },
    {
      id: 'acompanhamentos',
      title: 'Acompanhamentos',
      items: [
        { name: 'Batata Frita', price: 'R$ 8,00', image: require('../assets/batata-frita.png') },
        { name: 'Onion Rings', price: 'R$ 10,00', image: require('../assets/onion-rings.png') },
        { name: 'Nuggets', price: 'R$ 12,00', image: require('../assets/nuggets.png') },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        {MENU_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.menuButton, selectedCategory === category.id && styles.menuButtonActive]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={styles.menuText}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {selectedCategory ? (
          <>
            <Text style={styles.title}>{MENU_CATEGORIES.find((cat) => cat.id === selectedCategory).title}</Text>
            <View style={styles.flatListContainer}>
              <FlatList
                data={MENU_CATEGORIES.find((cat) => cat.id === selectedCategory).items}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => setSelectedItem(item.name === selectedItem ? null : item.name)}>
                    <View style={[styles.card, selectedItem === item.name && styles.cardExpanded]}>
                      <Image source={item.image} style={styles.itemImage} />
                      <View style={styles.cardContent}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        {item.description && <Text style={styles.itemDescription}>{item.description}</Text>}
                        <Text style={styles.itemPrice}>{item.price}</Text>
                        {selectedItem === item.name && (
                          <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => {
                              if (selectedCategory === 'lanches') {
                                setObservationItem(item);
                                setShowObservation(true);
                              } else {
                                console.log('Item adicionado ao pedido:', item.name);
                              }
                            }}
                          >
                            <Text style={styles.addButtonText}>Adicionar ao Pedido</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </>
        ) : (
          <Text style={styles.placeholder}>Selecione uma categoria</Text>
        )}
      </View>

      <TouchableOpacity style={styles.cartButton} onPress={() => router.navigate('/carrinho')}>
        <Text style={styles.cartButtonText}>Carrinho</Text>
      </TouchableOpacity>

      {showObservation && (
        <View style={styles.observationContainer}>
          <Text style={styles.observationTitle}>Observações para {observationItem?.name}</Text>
          <TextInput
            style={styles.observationInput}
            placeholder="Ex: Tirar cebola, ponto da carne, etc."
            value={observationText}
            onChangeText={setObservationText}
            multiline
          />
          <View style={styles.observationButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setShowObservation(false);
                setObservationText('');
                setObservationItem(null);
              }}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                console.log('Item confirmado:', observationItem.name);
                console.log('Observação:', observationText);
                setShowObservation(false);
                setObservationText('');
                setObservationItem(null);
              }}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  sidebar: { width: 150, backgroundColor: '#333', paddingVertical: 10, justifyContent: 'space-around', alignItems: 'center' },
  menuButton: { padding: 15 },
  menuButtonActive: { backgroundColor: '#555' },
  menuText: { color: 'white', textAlign: 'center' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  flatListContainer: { height: 250, justifyContent: 'center' },
  flatListContent: { alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 15, marginHorizontal: 10, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, width: 200, alignItems: 'center', height: 200, justifyContent: 'center' },
  cardExpanded: { height: 250, width: 220 },
  itemImage: { width: 80, height: 80, borderRadius: 5, marginBottom: 10 },
  cardContent: { alignItems: 'center' },
  itemText: { fontSize: 18, fontWeight: 'bold' },
  itemDescription: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 5 },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#27ae60', marginTop: 5 },
  addButton: { marginTop: 10, backgroundColor: '#27ae60', padding: 10, borderRadius: 5 },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  placeholder: { fontSize: 18, fontStyle: 'italic', color: '#888', textAlign: 'center' },
  cartButton: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#f39c12', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 50, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3 },
  cartButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  observationContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, elevation: 10 },
  observationTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  observationInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, minHeight: 60, textAlignVertical: 'top', fontSize: 16, marginBottom: 15 },
  observationButtons: { flexDirection: 'row', justifyContent: 'space-between', color: 'white' },
  cancelButton: { backgroundColor: '#e74c3c', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5},
  confirmButton: { backgroundColor: '#27ae60', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' }
});
