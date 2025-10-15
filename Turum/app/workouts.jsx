import { StyleSheet, TextInput } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'
import {ThemedView, ThemedCard, ThemedText} from '../components/Themed';

const Workouts = () => {
  return (
    <ThemedView style = {styles.container}>
      <ThemedText style = {styles.title}>Workouts</ThemedText>
      <ThemedText>Tester</ThemedText>
    </ThemedView>
  )
}

export default Workouts

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',  
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
    },
    link: {
        marginVertical: 10,
        backgroundColor: "A8E6CF"
    }
})