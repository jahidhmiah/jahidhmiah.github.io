import { Tabs } from "expo-router";
import { Text, View, useColorScheme, Image } from "react-native";
import { useTheme } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardLayout() {
    const Theme = useTheme()
    
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
                tabBarActiveTintColor: Theme.text,
                tabBarInactiveTintColor: Theme.text, 
            }} > 

            <Tabs.Screen 
                name="profile" 
                options={{ title: "Profile",
                tabBarIcon: ({focused, color , size}) => (
                    <Ionicons 
                        name={focused ? 'person' : 'person-outline'}
                        size={size} 
                        color={color}
                     />
                 ), 

                }}
            />
            <Tabs.Screen 
                name="tools" 
                options={{ title: "Tools",
                tabBarIcon: ({focused, color, size}) => (
                    <Ionicons 
                        name={focused ? 'barbell' : 'barbell-outline'}
                        size={size} 
                        color={color}
                     />
                 ),
                }}
            /> 
        </Tabs>

  );
}