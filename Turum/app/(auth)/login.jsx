import {StyleSheet, Image, TextInput, Text, Pressable} from 'react-native';
import { ThemedText, ThemedView } from '../../components/Themed';
import React, { useState } from 'react';
import {useRouter} from 'expo-router';
import { useTheme } from '../../constants/colors';
import { Ionicons } from "@expo/vector-icons";

const login = () => {
  const Theme = useTheme();
  const router = useRouter();
  const [secure, setSecure] = useState(true);

  // Track password input position to place the icon without adding wrappers
  const [pwPos, setPwPos] = useState({ y: 0, height: 0 });

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("../../assets/img/logo.png")}
        style={{ width: 200, height: 200, resizeMode: "contain"}}
      />

      <Text style={{
        color: Theme.accent, 
        fontSize: 40, 
        fontWeight: 'bold', 
        textShadowColor: Theme.accent,
        marginBottom: 10
      }}>
        Turum
      </Text>

      <ThemedText style={styles.loginInputLabel}>Email</ThemedText>

      <TextInput 
        style={[styles.loginInput, {
          backgroundColor: Theme.secondary,
          borderColor: Theme.primary, 
        }]}
        autoComplete='email' 
        placeholder='Email or Username'
        placeholderTextColor='rgba(74, 74, 74, 0.4)'
      />

      <ThemedText style={styles.loginInputLabel}>Password</ThemedText>
      
      <TextInput 
        style={[
          styles.loginInput,
          {
            backgroundColor: Theme.secondary,
            borderColor: Theme.primary,
            paddingRight: 44, // space for the icon inside the input
          }
        ]}
        onLayout={(e) => {
          const { y, height } = e.nativeEvent.layout;
          setPwPos({ y, height });
        }}
        secureTextEntry={secure}
        autoComplete='password' 
        placeholder='Password'
        placeholderTextColor='rgba(74, 74, 74, 0.4)'
      />
        
      <Pressable
        onPress={() => setSecure(!secure)}
        style={[
          styles.secureIcon,
          { top: pwPos.y + pwPos.height / 2 - 14 } // center icon vertically in the password input
        ]}
      >
        <Ionicons 
          name={secure ? "eye-off" : "eye"}
          size={22}
          color={Theme.accent}
        />
      </Pressable>
      
      <Pressable
        onPress={() => router.push('/profile')}
        style={({ pressed }) => [
          { opacity: pressed ? 0.6 : 1, backgroundColor: Theme.primary, marginBottom: 40 },
          styles.loginOptions
        ]}
      >
        <ThemedText style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Login
        </ThemedText>
      </Pressable>

      <Pressable
        onPress={() => router.push('/profile')}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
            backgroundColor: "#F4A7A2",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            borderRadius: 8,
            position: "relative", // needed for absolute positioning
          },
          styles.loginOptions,
        ]}
      >
        {/* Left-aligned logo */}
        <Image
          source={require("../../assets/img/googleLogo.png")}
          style={{
            width: 24,
            height: 24,
            resizeMode: "contain",
            position: "absolute",  // ✅ keeps it at the far left
            left: 16,              // adjust horizontal padding
          }}
        />

        {/* Centered text */}
        <ThemedText style={{ fontWeight: "bold", textAlign: "center" }}>
          Sign In with Google
        </ThemedText>
      </Pressable>

      <Pressable
        onPress={() => router.push('/profile')}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
            backgroundColor: "#A7D8F0",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            borderRadius: 8,
            position: "relative", 
          },
          styles.loginOptions,
        ]}
      >
  
        <Image
          source={require("../../assets/img/fbLogo.png")}
          style={{
            width: 30,
            height: 30,
            resizeMode: "contain",
            position: "absolute",  
            left: 12,           
          }}
        />

        <ThemedText style={{ fontWeight: "bold", textAlign: "center" }}>
        Sign In with Facebook
        </ThemedText>
      </Pressable>

      <Pressable
        onPress={() => router.push('/profile')}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
            backgroundColor: "#E8E8E6",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            borderRadius: 8,
            position: "relative", // needed for absolute positioning
          },
          styles.loginOptions,
        ]}
      >
        {/* Left-aligned logo */}
        <Image
          source={require("../../assets/img/appleLogo.png")}
          style={{
            width: 24,
            height: 24,
            resizeMode: "contain",
            position: "absolute",  // ✅ keeps it at the far left
            left: 16,              // adjust horizontal padding
          }}
        />

        {/* Centered text */}
        <ThemedText style={{ fontWeight: "bold", textAlign: "center" }}>
        Sign In with Apple
        </ThemedText>
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
    paddingTop: '15%',
    position: 'relative', // so the absolute icon is anchored to this screen
  },
  loginInput: {
    borderRadius: 20, 
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 10,
    width: '85%',
    marginVertical: 10,
  },
  loginInputLabel: {
    textAlign: 'left',
    width: '85%',
    marginLeft: 20,
    fontWeight: 'bold'
  },
  loginOptions: {
    padding: 10,
    width: '70%',
    borderRadius: 20,
    marginTop: 20
  },
  secureIcon: {
    position: 'absolute',
    right: 40,
    zIndex: 1,
    padding: 4,
  },
});
