import { Double } from "mongodb"
import React, { useEffect, useState } from "react"
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from "react-native"

type ItemCardProps = {
    item: {
        _id: string
        img: string
        nome: string
        preco: number
        tipo: string
        desc: string
    }
    carrinho: ItemCardPropsComm
    setCarrinho: React.Dispatch<React.SetStateAction<ItemCardPropsComm | null>>
}

type ItemCardPropsComm = {
    _id: string
    nome: string
    preco: number
    tipo: string
    desc: string
    comment?: string
}

function convertDriveLinkToDirect(url?: string): string {
    if (!url) return ''
    const match = url.match(/\/file\/d\/([^/]+)\//)
    if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`
    }
    return url
}

export default function ItemCard({ item }: ItemCardProps) {

    const imageUrl = convertDriveLinkToDirect(item.img)

    const [modalVisible, setModalVisible] = useState(false)
    const [observacao, setObservacao] = useState("")

    function addItemToCart() {

        setModalVisible(false)
    }

    return (
        <TouchableOpacity onPress={() => { setModalVisible(true) }}>
            <View style={styles.card}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                ) : (
                    <Text>Imagem não disponível</Text>
                )}
                <Text style={styles.name}>{item.nome}</Text>
                <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>

                <Modal visible={modalVisible} animationType="fade" transparent={true} >
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)} >
                        <View style={styles.modalContainer} >
                            <TouchableWithoutFeedback onPress={() => { }} >
                                <View style={styles.modalContent}>
                                    <View style={styles.button}>
                                        <Button title=" X " onPress={() => setModalVisible(false)} color="red" />
                                    </View>
                                    {imageUrl ? (
                                        <Image source={{ uri: imageUrl }} style={styles.image} />
                                    ) : (
                                        <Text>Imagem não disponível</Text>
                                    )}
                                    <Text style={styles.modalTitle}>{item.nome}</Text>
                                    <Text style={styles.modalDescription}>{item.desc}</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Alguma observação?"
                                        value={observacao}
                                        onChangeText={setObservacao}
                                    />
                                    <Text style={styles.modalPrice}>R$ {item.preco.toFixed(2)}</Text>
                                    <Button title="Adicionar" onPress={() => addItemToCart()} color={"green"} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal >
            </View >
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "flex-end",
    },
    card: {
        width: 180,
        height: 150,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        margin: 10,
        elevation: 3,
    },
    image: {
        width: 70,
        height: 70,
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
        fontSize: 24,
        fontWeight: "bold",
    },
    modalDescription: {
        fontSize: 19,
        marginVertical: 10,
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 45,
        fontSize: 15,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 6,
    },
    modalPrice: {
        fontSize: 16,
        color: "green",
        marginBottom: 10,
    },
})