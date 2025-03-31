import React, { useState } from 'react';
import { View, Modal, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  id: string;
  nome: string;
  preco: number;
  tipo: string;
  desc: string;
  img: string;
}

export default function Cards(props: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal} style={styles.card}>
        {/* Imagem do Card */}
        {props.img ? (
          <Image source={{ uri: props.img }} style={styles.cardImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>Sem Imagem</Text>
          </View>
        )}
        {/* Títulos e Preço */}
        <Text style={styles.cardTitle}>{props.nome}</Text>
        <Text style={styles.cardPrice}>R${props.preco.toFixed(2)}</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        onRequestClose={toggleModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
            <Image source={{ uri: props.img }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{props.tipo}</Text>
            <Text style={styles.modalDescription}>{props.desc}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  
  card: {
    backgroundColor: 'orange',
    borderRadius: 12,
    padding: 15,
    width: 220, // Ajustei a largura do card para ser mais proporcionada
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    margin: 10,
  },
  cardImage: {
    width: '100%',
    height: 120, // Ajustei a altura para ser proporcional à largura
    resizeMode: 'cover',
    borderRadius: 8,
  },
  imagePlaceholder: {
    backgroundColor: '#dcdcdc',
    width: '100%',
    height: 120, // Mesmo tamanho que a imagem
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  imageText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center', // Centraliza o título
  },
  cardPrice: {
    fontSize: 16,
    color: '#FF5722', // Cor de preço mais vibrante
    marginTop: 5,
    textAlign: 'center', // Centraliza o preço
  },
  button: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo do modal mais escuro
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF5733', // Cor vibrante para o botão de fechar
    borderRadius: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
});
