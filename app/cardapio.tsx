import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import api from "axios";
import ItemCard from "../components/itemCard/itemCard";

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

    return (
        <View style={styles.container}>
            <FlatList
                data={itens}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <ItemCard item={item} />}
                numColumns={2}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 10,
    },
    list: {
        justifyContent: "center",
    },
});