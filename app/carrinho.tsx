import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

// Estrutura para os itens do carrinho (exemplo)
const initialCartItems = [
  { name: 'X-Burguer', price: 'R$ 10,00', quantity: 1, image: require('../assets/x-burguer.png') },
  { name: 'Coca-Cola', price: 'R$ 5,00', quantity: 2, image: require('../assets/coca-cola.png') }
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Função para remover um item do carrinho
  const removeItem = (itemName) => {
    setCartItems(cartItems.filter(item => item.name !== itemName));
  };

  // Função para aumentar a quantidade de um item
  const increaseQuantity = (itemName) => {
    setCartItems(cartItems.map(item =>
      item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Função para diminuir a quantidade de um item
  const decreaseQuantity = (itemName) => {
    setCartItems(cartItems.map(item =>
      item.name === itemName && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  // Calcular o total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <TouchableOpacity style={styles.homeButton} onPress={() => { router.navigate("/cardapio") }}>
          <Text style={styles.homeButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Carrinho de Compras</Text>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => decreaseQuantity(item.name)}>
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => increaseQuantity(item.name)}>
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.name)}>
                    <Text style={styles.removeButtonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.placeholder}>Seu carrinho está vazio.</Text>
        )}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: R$ {calculateTotal()}</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={() => alert('Pedido Finalizado')}>
            <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  sidebar: { width: 100, backgroundColor: '#333', paddingVertical: 20, justifyContent: 'space-between', alignItems: 'center' },
  homeButton: { backgroundColor: '#d9534f', padding: 10, borderRadius: 5, marginBottom: 20 },
  homeButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  flatListContainer: { height: 250, justifyContent: 'center' },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, marginVertical: 10, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, alignItems: 'center' },
  itemImage: { width: 80, height: 80, borderRadius: 5, marginRight: 10 },
  cardContent: { flex: 1 },
  itemText: { fontSize: 18, fontWeight: 'bold' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#27ae60', marginTop: 5 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  quantityButton: { fontSize: 20, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#ccc', borderRadius: 5 },
  quantityText: { fontSize: 18, marginHorizontal: 10 },
  removeButton: { marginTop: 10 },
  removeButtonText: { color: 'red', fontWeight: 'bold' },
  totalContainer: { marginTop: 20, alignItems: 'center' },
  totalText: { fontSize: 22, fontWeight: 'bold', color: '#27ae60' },
  checkoutButton: { marginTop: 20, backgroundColor: '#27ae60', padding: 12, borderRadius: 5 },
  checkoutButtonText: { color: 'white', fontWeight: 'bold' },
  placeholder: { fontSize: 18, fontStyle: 'italic', color: '#888', textAlign: 'center' }
});
