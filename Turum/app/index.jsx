import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import {Link} from 'expo-router';
import {ThemedView, ThemedCard, ThemedText} from '../components/Themed';
import {Theme} from '../constants/colors';
import Logo from '../assets/img/logo.png';


const Home = () => {
  return (
    <ThemedView style = {[styles.container]}>
        <Image 
            source={Logo} 
            style = {styles.image}
            resizeMode= "contain"
        />
        <ThemedText style = {styles.title}>
            Turum
        </ThemedText>
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',  
        borderwidth: 5
    },
    title: {
        fontWeight: "bold",
        fontSize: 18
    },
    link: {
        marginVertical: 30
    },
    image: {
        width: 180,
        height: 180,
        marginBottom: 12,
      },
})