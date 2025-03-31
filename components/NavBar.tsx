import  {TouchableOpacity, View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
interface Props
{
  texto: string
}

export default function NavBar(props: Props)
{
  return(
    <View style={styles.container}>
    <TouchableOpacity>
    <Icon name='back'size={30} color='#ffff'/>
    </TouchableOpacity>
    <Text style={styles.texto}>{props.texto}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row',
    flexWrap: "nowrap", 
    height: '100%',
    alignItems: "center",
    backgroundColor: "#770e22",
  },
  texto: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 25
  },
});