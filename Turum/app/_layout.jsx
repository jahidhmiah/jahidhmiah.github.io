import { Tabs } from "expo-router";
import { Text, View, useColorScheme, Image } from "react-native";
import { Theme } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
        <Tabs screenOptions={{ 
                headerStyle: { 
                    backgroundColor: Theme.background 
                },
                headerTitleAlign: 'left',
                headerShadowVisible: false,
                headerTitle: () => (
                    <View style={{
                            flexDirection: "row", 
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            source={require("../assets/img/logo.png")}
                            style={{ width: 40, height: 40, resizeMode: "contain", marginRight: 10}}
                        />
                        <Text style = {{color: Theme.text, fontSize: 18, fontWeight: 'bold'}}>
                            Turum
                        </Text>
                    </View>
                  ),
                tabBarStyle: { 
                    backgroundColor: Theme.primary
                },
                tabBarActiveTintColor: Theme.background,
                tabBarInactiveTintColor: Theme.text, 
            }} > 

            <Tabs.Screen 
                name="index" 
                options={{ title: "Profile",
                tabBarIcon: ({color , size}) => (
                    <Ionicons 
                        name="person" 
                        size={size} 
                        color={color}
                     />
                 ), 

                }}
            />
            <Tabs.Screen 
                name="workouts" 
                options={{ title: "Workouts",
                tabBarIcon: ({ color, size}) => (
                    <Ionicons 
                        name="barbell" 
                        size={size} 
                        color={color}
                     />
                 ),
                }}
            /> 
        </Tabs>

  );
}