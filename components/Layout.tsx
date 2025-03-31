import {View, StyleSheet} from 'react-native'
import { ReactNode } from "react";

interface Props{
  children: ReactNode,
  children2: ReactNode,
  children3: ReactNode
}

export default function Layout(props: Props)
{
  return(
    <View style={styles.container}>
    <View style={styles.row}>
    {props.children}
    </View>
    <View style={styles.roww}>
    {props.children2}
    </View>
    <View style={styles.rowww}>
    {props.children3}
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  flexDirection: 'column',
  },
  row: {
    flex: 1,
    height: 20,
  },
  roww: {
    flex: 1,
    height: 10
  },
  rowww: {
    flex: 1,
    height: 10
  }

})