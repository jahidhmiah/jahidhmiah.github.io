import { StyleSheet, TextInput, ScrollView } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'
import {ThemedView, ThemedCard, ThemedText} from '../../components/Themed';

const Tools = () => {
  return (
    <ThemedView style = {styles.container} safe = {true}>
        <ScrollView>
          <ThemedText style = {styles.title}>Tools</ThemedText>
        </ScrollView>
    </ThemedView>
  )
}

export default Tools

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