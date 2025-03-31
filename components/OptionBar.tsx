import {TouchableOpacity, View, Text, StyleSheet} from 'react-native'

interface Props{
  text1: String,
  text2: String,
  text3: String,
}

export default function OptionBar(props: Props)
{
return(
  <View style={styles.container}>
  <TouchableOpacity style={styles.option}><Text style={styles.text}>{props.text1}</Text></TouchableOpacity>
    <TouchableOpacity style={styles.option}><Text style={styles.text}>{props.text2}</Text></TouchableOpacity>
  <TouchableOpacity style={styles.option}><Text style={styles.text}>{props.text3}</Text></TouchableOpacity>
  </View>
)
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  option: {backgroundColor:'#f15511', flex: 1, alignItems: "center"},
  text: {color: 'white'}
})