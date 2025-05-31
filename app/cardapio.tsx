import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import api from "../helpers/axios";
import ItemCard from "../components/itemCard/itemCard";
import { StatusBar } from 'expo-status-bar';
import { router } from "expo-router";

interface IProduto {
  _id: string;
  image: string;
  nome: string;
  preco: number;
  tipo: string;
  desc: string;
}

export default function MenuScreen() {
  const [itens, setItens] = useState<IProduto[]>([]);
  const [loading, setLoading] = useState(true);
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);

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

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        {["Lanche", "Bebida", "Acompanhamento"].map((tipo) => (
          <TouchableOpacity key={tipo} onPress={() => setTipoSelecionado(tipo)} style={styles.filterButton}>
            <Text style={styles.filterText}>{tipo}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => { router.navigate("/chatbot") }}>
          <Text style={styles.filterText}>Tempo de preparo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        <FlatList
          data={itensFiltrados}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ItemCard item={item} />}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </ScrollView>

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
});