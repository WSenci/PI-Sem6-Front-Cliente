import WebView from "react-native-webview";
import { View, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default function Chatbot() {
    return (
        <View style={{flex: 1}}>
            <WebView
                source={{ uri: 'https://chatbot.getmindpal.com/tempo-de-preparo' }}
                style={{ width: '100%', height: height }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                originWhitelist={['*']}
                startInLoadingState={true}
            />
        </View>
    )
}
