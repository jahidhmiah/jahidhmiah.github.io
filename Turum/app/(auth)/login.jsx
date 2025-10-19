import {StyleSheet, Image, TextInput, Text,Pressable} from 'react-native';
import { ThemedText, ThemedView } from '../../components/Themed';
import React from 'react';
import {useRouter} from 'expo-router';
import { useTheme } from '../../constants/colors';



const login = () => {
  const Theme = useTheme();
  const router = useRouter();
  return (
    
      <ThemedView style = {styles.container}>
        <Image
          source={require("../../assets/img/logo.png")}
          style={{ width: 200, height: 200, resizeMode: "contain"}}
        />

        <Text style = {{
          color: Theme.accent, 
          fontSize: 40, 
          fontWeight: 'bold', 
          textShadowColor: Theme.accent,
          marginBottom: 10
          }}>
          Turum
        </Text>

        <ThemedText style = {{
          textAlign: 'left',
          width: '80%',
          marginLeft: 20,
          fontWeight: 'bold'
        }}>
          Email
        </ThemedText>

        <TextInput 
          style = {[{
              backgroundColor: Theme.secondary,
              borderRadius: 20, 
              borderColor: Theme.primary, 
              borderBottomWidth: 1,
              borderRightWidth: 1,
              padding: 10,
              width: '80%',
              marginVertical: 10
            }]}
          autoComplete='email' 
          placeholder='garam@useturum.com'
          placeholderTextColor='rgba(74, 74, 74, 0.4)'>
          </TextInput>

          <ThemedText style = {{
          textAlign: 'left',
          width: '80%',
          marginLeft: 20,
          fontWeight: 'bold'
        }}>
          Password
        </ThemedText>
        <TextInput 
          style = {[{
              backgroundColor: Theme.secondary,
              borderRadius: 20, 
              borderColor: Theme.primary, 
              borderBottomWidth: 1,
              borderRightWidth: 1,
              padding: 10,
              width: '80%',
              marginVertical: 10,
            }]}
          secureTextEntry
          autoComplete='password' 
          placeholder='password'
          placeholderTextColor='rgba(74, 74, 74, 0.4)'>
            
          </TextInput>
        
          <Pressable
            onPress={() => router.push('/profile')} // 👈 navigate like the Link
            style={({ pressed }) => [
              { opacity: pressed ? 0.6 : 1, 
                padding: 10,
                backgroundColor: Theme.primary,
                width: '40%',
                borderRadius: 20,
                
              },
            ]}
          >
          <ThemedText style = {{
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            Login</ThemedText>
        </Pressable>
      </ThemedView>
  )
}

export default login

const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '15%'
    },
    writingArea: {
      
    }


})