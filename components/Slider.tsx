import React, { ReactNode } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

interface Props
{
  children: ReactNode
}

export default function Scroll(props: Props) {
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        {props.children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
});
