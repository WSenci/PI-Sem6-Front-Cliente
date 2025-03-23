import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Button, StyleSheet } from "react-native";

type ItemCardProps = {
    item: {
        _id: string;
        image: string;
        nome: string;
        preco: number;
        tipo: string;
        desc: string;
    };
};

export default function ItemCard({ item }: ItemCardProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [observacao, setObservacao] = useState("");

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.name}>{item.nome}</Text>
                <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{item.nome}</Text>
                        <Text style={styles.modalDescription}>{item.desc}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Alguma observação?"
                            value={observacao}
                            onChangeText={setObservacao}
                        />
                        <Button title="Adicionar ao pedido" onPress={() => setModalVisible(false)} />
                        <Button title="Fechar" onPress={() => setModalVisible(false)} color="red" />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        margin: 10,
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
    },
    price: {
        fontSize: 14,
        color: "green",
        marginTop: 2,
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
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    modalDescription: {
        fontSize: 14,
        marginVertical: 10,
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});