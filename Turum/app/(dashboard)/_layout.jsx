import { Tabs } from "expo-router";
import { Text, View, useColorScheme, Image } from "react-native";
import { Theme } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardLayout() {
  return (
        <Tabs screenOptions={{ 
                headerTransparent: true,
                headerTitleAlign: 'left',
                headerShadowVisible: false,
                headerTitle: () => (
                    <View style={{
                            flexDirection: "row", 
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            source={require("../../assets/img/logo.png")}
                            style={{ width: 50, height: 50, resizeMode: "contain", marginRight: 10}}
                        />
                        <Text style = {{color: Theme.primary, fontSize: 18, fontWeight: 'bold'}}>
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
                name="profile" 
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
                name="tools" 
                options={{ title: "Tools",
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