import { StyleSheet} from 'react-native'
import { ThemedText, ThemedView } from '../../components/Themed'
import React from 'react'
import {Link} from 'expo-router';

const login = () => {
  return (
    <ThemedView style = {styles.container}>
      <ThemedText>
        Login here
      </ThemedText>

      <Link href="/profile" style={styles.link}>
          <ThemedText>Profile</ThemedText>
      </Link>
    </ThemedView>
  )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },


})