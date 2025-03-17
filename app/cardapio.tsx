import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

const MENU_CATEGORIES = [
  { id: 'lanches', title: 'Lanches', items: [
    { name: 'X-Burguer', price: 'R$ 10,00', description: 'Pão, hambúrguer, queijo e molho especial.', image: require('../assets/x-burguer.png') },
    { name: 'X-Salada', price: 'R$ 12,00', description: 'Pão, hambúrguer, queijo, alface, tomate e maionese.', image: require('../assets/x-salada.png') },
    { name: 'X-Bacon', price: 'R$ 14,00', description: 'Pão, hambúrguer, queijo, bacon e molho especial.', image: require('../assets/x-bacon.png') },
    { name: 'X-Tudo', price: 'R$ 18,00', description: 'Pão, hambúrguer, queijo, bacon, ovo, alface, tomate e maionese.', image: require('../assets/x-tudo.png') }
  ] },
  { id: 'bebidas', title: 'Bebidas', items: [
    { name: 'Coca-Cola', price: 'R$ 5,00', image: require('../assets/coca-cola.png') },
    { name: 'Guaraná', price: 'R$ 5,00', image: require('../assets/guarana.png') },
    { name: 'Suco de Laranja', price: 'R$ 7,00', image: require('../assets/suco-laranja.png') },
    { name: 'Água', price: 'R$ 3,00', image: require('../assets/agua.png') }
  ] },
  { id: 'acompanhamentos', title: 'Acompanhamentos', items: [
    { name: 'Batata Frita', price: 'R$ 8,00', image: require('../assets/batata-frita.png') },
    { name: 'Onion Rings', price: 'R$ 10,00', image: require('../assets/onion-rings.png') },
    { name: 'Nuggets', price: 'R$ 12,00', image: require('../assets/nuggets.png') }
  ] }
];

export default function CardapioScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('lanches');
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <View style={styles.container}>
      {/* Sidebar */}
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
        <TouchableOpacity style={styles.homeButton} onPress={() => { router.navigate("/") }}>
          <Text style={styles.homeButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        {selectedCategory ? (
          <>
            <Text style={styles.title}>{MENU_CATEGORIES.find(cat => cat.id === selectedCategory).title}</Text>
            <View style={styles.flatListContainer}>
              <FlatList
                data={MENU_CATEGORIES.find(cat => cat.id === selectedCategory).items}
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
                          <TouchableOpacity style={styles.addButton}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  sidebar: { width: 100, backgroundColor: '#333', paddingVertical: 20, justifyContent: 'space-between', alignItems: 'center' },
  menuButton: { padding: 15 },
  menuButtonActive: { backgroundColor: '#555' },
  menuText: { color: 'white', textAlign: 'center' },
  homeButton: { backgroundColor: '#d9534f', padding: 10, borderRadius: 5, marginBottom: 20 },
  homeButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
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
  placeholder: { fontSize: 18, fontStyle: 'italic', color: '#888', textAlign: 'center' }
});