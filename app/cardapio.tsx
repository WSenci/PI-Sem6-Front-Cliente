import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Text, ScrollView, TouchableWithoutFeedback, Button } from "react-native";
import api from "../helpers/axios";
import ItemCard from "../components/itemCard/itemCard";
import { StatusBar } from 'expo-status-bar';
import { router } from "expo-router";

interface IProduto {
  _id: string;
  img: string;
  nome: string;
  preco: number;
  tipo: string;
  desc: string;
}

export interface ItemCardPropsComm {
  _id: string
  nome: string
  preco: number
  tipo: string
  desc: string
  comment?: string
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function MenuScreen() {
  const [itens, setItens] = useState<IProduto[]>([]);
  const [loading, setLoading] = useState(true);
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);
  const [pedidoCarrinho, setPedidoCarrinho] = useState<ItemCardPropsComm[] | null>(null)
  const [modalCarrinhoVisivel, setModalCarrinhoVisivel] = useState(false)

  useEffect(() => {
    async function fetchCardapio() {
      try {
        const response = await api.get("/product");
        setItens(response.data);
      } catch (error) {
        console.error("Erro ao buscar cardápio:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCardapio();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const itensFiltrados = tipoSelecionado
    ? itens.filter((item) => item.tipo === tipoSelecionado)
    : itens;

  function createOrder() {

    console.log(pedidoCarrinho)
  }

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        {["Lanche", "Bebida", "Acompanhamento"].map((tipo) => (
          <TouchableOpacity key={tipo} onPress={() => setTipoSelecionado(tipo)} style={styles.filterButton}>
            <Text style={styles.filterText}>{tipo}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => { router.navigate("/chatbot") }} style={styles.filterButton}>
          <Text style={styles.filterText}>Tempo de preparo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {chunkArray(itensFiltrados, 2).map((group, index) => (
          <View key={index} style={styles.cardColumn}>
            {group.map((item) => (
              <ItemCard key={item._id} item={item} pedidoCarrinho={pedidoCarrinho} setPedidoCarrinho={setPedidoCarrinho} />
            ))}
          </View>
        ))}
      </ScrollView>

      {modalCarrinhoVisivel && (
        <TouchableWithoutFeedback onPress={() => setModalCarrinhoVisivel(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.modalCarrinho}>
                <View style={styles.botaoSairCarrinho}>
                  <Button title=" X " onPress={() => setModalCarrinhoVisivel(false)} color="red" />
                </View>
                <Text style={styles.modalTitulo}>Pedido</Text>
                {pedidoCarrinho === null ? (
                  <Text>Pedido vazio</Text>
                ) : (
                  pedidoCarrinho.map((item, index) => (
                    <Text key={index}>
                      {item.nome} - R$ {item.preco.toFixed(2)}
                    </Text>
                  ))
                )}

                <TouchableOpacity onPress={() => {createOrder()}} style={styles.fecharBtn}>
                  <Text style={{ color: "#fff" }}>Finalizar pedido</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}

      <TouchableOpacity
        onPress={() => setModalCarrinhoVisivel(true)}
        style={styles.botaoCarrinho}
      >
        <Text style={styles.textoCarrinho}>🛒</Text>
      </TouchableOpacity>

      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
  }, sidebar: {
    width: 190,
    backgroundColor: "#7d7d7d",
    paddingVertical: 20,
    alignItems: "center",
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#7d7d7d",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  filterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  list: {
    padding: 5,
    flexDirection: "row",
  },
  scrollContent: {
    padding: 10,
  },
  cardColumn: {
    flexDirection: "column",
    marginRight: 16,
  },
  botaoSairCarrinho: {
    alignSelf: "flex-end",
  },
  botaoCarrinho: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 30,
    elevation: 5,
    zIndex: 10,
  },
  textoCarrinho: {
    color: '#fff',
    fontSize: 20,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  modalCarrinho: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fecharBtn: {
    marginTop: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});